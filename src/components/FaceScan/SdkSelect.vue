<script setup>
import { ref, computed, onBeforeUnmount } from "vue";

const props = defineProps({
  // null berarti belum dijawab — bukan jawaban kosong.
  modelValue: { type: [String, Number], default: null },
  // Bentuknya [{ value, label }]
  options: { type: Array, required: true },
  placeholder: { type: String, default: "" },
  invalid: { type: Boolean, default: false },
  // Dipasang di tombol supaya <label for="..."> di form bisa menunjuk ke sini.
  // <button> termasuk elemen yang boleh dilabeli, jadi mengklik labelnya
  // langsung memindahkan fokus ke tombol ini.
  id: { type: String, default: null },
});
const emit = defineEmits(["update:modelValue"]);

const terbuka = ref(false);
const sorot = ref(-1); // pilihan yang sedang disorot papan ketik
const akar = ref(null);
const tombol = ref(null);

// Id unik supaya aria-activedescendant menunjuk ke baris yang benar walaupun
// nanti ada lebih dari satu dropdown dalam satu halaman.
const idDaftar = `sdk-select-${Math.random().toString(36).slice(2, 8)}`;
const idBaris = (i) => `${idDaftar}-${i}`;

const terpilih = computed(
  () => props.options.find((o) => o.value === props.modelValue) || null,
);

const tanganiKlikLuar = (e) => {
  if (!akar.value?.contains(e.target)) tutup();
};

const buka = () => {
  if (terbuka.value) return;
  terbuka.value = true;
  // Sorotan dimulai dari pilihan yang sedang aktif; kalau belum ada, dari atas.
  const i = props.options.findIndex((o) => o.value === props.modelValue);
  sorot.value = i < 0 ? 0 : i;
  // Dipasang saat terbuka saja, dan dilepas saat tertutup — bukan dibiarkan
  // menempel di document sepanjang umur halaman.
  document.addEventListener("pointerdown", tanganiKlikLuar, true);
};

const tutup = () => {
  if (!terbuka.value) return;
  terbuka.value = false;
  document.removeEventListener("pointerdown", tanganiKlikLuar, true);
};

// Jaring pengaman: kalau komponen dilepas saat daftarnya masih terbuka,
// pendengarnya ikut dilepas supaya tidak menumpuk.
onBeforeUnmount(() =>
  document.removeEventListener("pointerdown", tanganiKlikLuar, true),
);

const pilih = (i) => {
  const opsi = props.options[i];
  if (!opsi) return;
  emit("update:modelValue", opsi.value);
  tutup();
  tombol.value?.focus();
};

const tanganiPapanKetik = (e) => {
  const k = e.key;

  if (k === "Escape") {
    tutup();
    return;
  }

  if (!terbuka.value) {
    if (k === "ArrowDown" || k === "ArrowUp" || k === "Enter" || k === " ") {
      e.preventDefault();
      buka();
    }
    return;
  }

  const jumlah = props.options.length;
  if (k === "ArrowDown") {
    e.preventDefault();
    sorot.value = (sorot.value + 1) % jumlah;
  } else if (k === "ArrowUp") {
    e.preventDefault();
    sorot.value = (sorot.value - 1 + jumlah) % jumlah;
  } else if (k === "Home") {
    e.preventDefault();
    sorot.value = 0;
  } else if (k === "End") {
    e.preventDefault();
    sorot.value = jumlah - 1;
  } else if (k === "Enter" || k === " ") {
    e.preventDefault();
    pilih(sorot.value);
  } else if (k === "Tab") {
    tutup(); // pindah kolom = batal memilih
  }
};
</script>

<template>
  <div ref="akar" class="relative">
    <button
      :id="id"
      ref="tombol"
      type="button"
      role="combobox"
      aria-haspopup="listbox"
      :aria-expanded="terbuka"
      :aria-controls="idDaftar"
      :aria-activedescendant="
        terbuka && sorot >= 0 ? idBaris(sorot) : undefined
      "
      :aria-invalid="invalid"
      :data-galat="invalid ? 'true' : null"
      class="w-full h-12 pl-4 pr-11 rounded-xl border bg-white dark:bg-[#27272A] text-left outline-none transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-[#2E97DF]/50"
      :class="[
        invalid
          ? 'border-red-400 dark:border-red-500/70'
          : 'border-[#D1D5DB] dark:border-[#3F3F46] hover:border-[#2E97DF]/60',
        terbuka ? 'border-[#2E97DF]' : '',
      ]"
      @click="terbuka ? tutup() : buka()"
      @keydown="tanganiPapanKetik"
    >
      <span
        class="block truncate text-[15px]"
        :class="
          terpilih
            ? 'text-black dark:text-white'
            : 'text-[#9CA3AF] dark:text-[#71717A]'
        "
      >
        {{ terpilih ? terpilih.label : placeholder }}
      </span>

      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF] transition-transform duration-200"
        :class="terbuka ? 'rotate-180' : ''"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </button>

    <transition name="turun">
      <ul
        v-if="terbuka"
        :id="idDaftar"
        role="listbox"
        class="absolute z-30 left-0 right-0 top-[calc(100%+6px)] py-1 rounded-xl border border-[#D1D5DB] dark:border-[#3F3F46] bg-white dark:bg-[#27272A] shadow-xl shadow-black/10 overflow-hidden"
      >
        <li
          v-for="(opsi, i) in options"
          :id="idBaris(i)"
          :key="String(opsi.value)"
          role="option"
          :aria-selected="opsi.value === modelValue"
          class="flex items-center justify-between gap-2 mx-1 px-3 h-10 rounded-lg cursor-pointer text-[15px] transition-colors duration-150"
          :class="
            i === sorot
              ? 'bg-[#2E97DF]/10 text-[#195279] dark:text-white'
              : 'text-[#374151] dark:text-[#D4D4D4]'
          "
          @pointerenter="sorot = i"
          @click="pilih(i)"
        >
          <span>{{ opsi.label }}</span>
          <svg
            v-if="opsi.value === modelValue"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="w-4 h-4 text-[#2E97DF]"
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </li>
      </ul>
    </transition>
  </div>
</template>

<style scoped>
.turun-enter-active,
.turun-leave-active {
  transition:
    opacity 0.15s ease,
    transform 0.15s ease;
}
.turun-enter-from,
.turun-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
