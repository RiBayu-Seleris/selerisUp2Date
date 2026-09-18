<script setup>
import lapis1 from "@/assets/images/technology/layer-1.png";
import lapis2 from "@/assets/images/technology/layer-2.png";
import lapis3 from "@/assets/images/technology/layer-3.png";
import lapis4 from "@/assets/images/technology/layer-4.png";

defineProps({
  aktif: { type: Number, default: 0 },
});

const emit = defineEmits(["sorot", "lepas"]);

const lapisan = [lapis1, lapis2, lapis3, lapis4];

// Kanvas tiap berkas, dalam satuan desain. Kanvas layer-1.png sudah diberi
// bantalan kiri 202px & atas 146px agar sejajar dengan tiga lainnya.
const KANVAS_LEBAR = 731;
const KANVAS_TINGGI = 424;
const JARAK = 100;

const TINGGI_TOTAL = KANVAS_TINGGI + (lapisan.length - 1) * JARAK;

// Pelat teratas tidak mulai dari tepi atas kanvasnya: ada 145px transparan di
// sana (9,92% lebar), sementara sisi bawah pas tanpa sisa. Tanpa ini grafiknya
// terlihat turun sendiri di dalam bingkainya.
const KOSONG_ATAS = 0.0991792 * KANVAS_LEBAR;
const TINGGI_TAMPAK = TINGGI_TOTAL - KOSONG_ATAS;

// Tiap pelat ditumpuk dengan margin negatif, bukan posisi absolut, supaya
// tinggi tumpukannya wajar mengikuti isinya dan bisa ditengahkan bingkainya.
// Semua ukuran diturunkan dari LEBAR, jadi pelatnya tidak bisa melar.
const TINDIH = `${(((JARAK - KANVAS_TINGGI) / KANVAS_LEBAR) * 100).toFixed(4)}%`;

const gayaPelat = (index) => ({
  marginTop: index === 0 ? "0" : TINDIH,
  zIndex: lapisan.length - index,
});

// Siluet satu pelat dalam persen kotak gambarnya: puncak, dua sudut kanan,
// dasar, dua sudut kiri. Diukur dari alpha layer-1.png.
//
// Perlu karena kotak <img>-nya jauh lebih lebar daripada pelat di dalamnya dan
// keempatnya saling menumpuk: tanpa potongan ini, tepi transparan pelat
// teratas menadah kursor di atas pelat-pelat yang terlihat di bawahnya.
const SILUET =
  "polygon(49.4% 16.7%, 85.3% 52.9%, 85.3% 64.6%, 49.4% 99.8%, 13.5% 64.6%, 13.5% 52.9%)";
</script>

<template>
  <div
    class="tumpukan flex items-center justify-center"
    :style="{ aspectRatio: `${KANVAS_LEBAR} / ${TINGGI_TAMPAK}` }"
    @mouseleave="emit('lepas')"
  >
    <div
      class="relative w-full"
      :style="{ marginTop: `${(-KOSONG_ATAS / KANVAS_LEBAR) * 100}%` }"
    >
      <img
        v-for="(sumber, index) in lapisan"
        :key="index"
        :src="sumber"
        alt=""
        aria-hidden="true"
        class="pelat relative block w-full"
        :class="{ nyala: aktif === index }"
        :style="gayaPelat(index)"
      />

      <!-- Bayangan tiap pelat jatuh di luar siluetnya, jadi yang dipotong
           bukan gambarnya melainkan lapisan penadah kursor ini — bentuk dan
           urutan tumpuknya sama, gambarnya tetap utuh. -->
      <div class="zona-sorot absolute inset-0" aria-hidden="true">
        <div
          v-for="(_, index) in lapisan"
          :key="`zona-${index}`"
          class="zona"
          :class="{ nyala: aktif === index }"
          :style="[
            gayaPelat(index),
            { aspectRatio: `${KANVAS_LEBAR} / ${KANVAS_TINGGI}` },
          ]"
          @mouseenter="emit('sorot', index)"
        ></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Di atas pelat-pelatnya (z-index 1..4), dan tembus kursor kecuali di zonanya. */
.zona-sorot {
  z-index: 10;
  pointer-events: none;
}

.zona {
  position: relative;
  width: 100%;
  clip-path: v-bind(SILUET);
  pointer-events: auto;
}

/* Zona ikut bergeser bersama pelatnya — kalau tidak, penadah kursornya
   tertinggal 8% di belakang pelat yang sedang menyala. */
.pelat,
.zona {
  transition: transform 600ms cubic-bezier(0.22, 1, 0.36, 1);
}

.pelat.nyala,
.zona.nyala {
  transform: translateX(-8%);
}

@media (prefers-reduced-motion: reduce) {
  .pelat,
  .zona {
    transition: none;
  }

  .pelat.nyala,
  .zona.nyala {
    transform: none;
  }
}
</style>
