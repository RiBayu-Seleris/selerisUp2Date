<script setup>
import { ref, computed, nextTick, onMounted, onUnmounted } from "vue";
import { useLocalizedList } from "@/utils/i18nList";
import StepLine from "@/components/About/StepLine.vue";

import Innovation from "@/assets/icons/innovation.svg";
import Vision from "@/assets/icons/vision.svg";
import TeamWork from "@/assets/icons/team-work.svg";
import Integrity from "@/assets/icons/integrity.svg";
import Focus from "@/assets/icons/focus.svg";
import OptimalPerformance from "@/assets/icons/performance.svg";

const StepsContent = [
  { icon: Innovation },
  { icon: OptimalPerformance },
  { icon: TeamWork },
  { icon: Integrity },
  { icon: Focus },
  { icon: Vision },
];

// Teks diambil dari file locale
const localizedSteps = useLocalizedList("about.values.items", StepsContent, [
  "title",
  "description",
]);

const pembungkus = ref(null);
const panel = ref(null);
const kemajuan = ref(0); // 0 saat paku dipasang .. 1 saat paku mau lepas

// Ruang vertikalnya harus cukup: panel dipaku setinggi layar, dan di dalamnya
// masih ada judul, enam butir, serta grafik yang rasionya hampir persegi.
const mqRuang = window.matchMedia("(min-width: 768px) and (min-height: 800px)");

// Di bawah lg grafiknya membentang dua baris grid, jadi tingginya diurus grid
// sendiri. Pengukuran di JS hanya dipakai mulai lg.
const mqLg = window.matchMedia("(min-width: 1024px)");
const lebarLg = ref(false);
const mqGerak = window.matchMedia("(prefers-reduced-motion: reduce)");
const pinAktif = ref(false);

// Diisi StepLine setelah jalurnya terukur; urut menaik.
const patokan = ref([]);
const terimaPatokan = (nilai) => {
  patokan.value = nilai;
};

// Tinggi grafik mengikuti tinggi kolom kiri; lebarnya menyesuaikan sendiri
// lewat rasio viewBox. Diukur di JS, bukan CSS, karena lebar grafik ikut
// menentukan lebar kolom kiri — kalau dibiarkan saling menghitung di CSS,
// hasilnya tidak menentu.
const kolomKiri = ref(null);
const tinggiKiri = ref(0);
let pengamatKiri = null;

const ukurKiri = () => {
  const el = kolomKiri.value;
  if (!el) return;
  const t = Math.round(el.offsetHeight);
  // Ambang 2px supaya keduanya tidak saling kejar tiap frame.
  if (Math.abs(t - tinggiKiri.value) > 2) tinggiKiri.value = t;
};

const gayaGrafik = computed(() =>
  pinAktif.value && lebarLg.value && tinggiKiri.value
    ? { height: `${tinggiKiri.value}px` }
    : null,
);

const hitungKemajuan = () => {
  if (!pinAktif.value || !pembungkus.value || !panel.value) return;
  const jarak = pembungkus.value.offsetHeight - panel.value.offsetHeight;
  if (jarak <= 0) {
    kemajuan.value = 0;
    return;
  }
  const terlewat = -pembungkus.value.getBoundingClientRect().top;
  kemajuan.value = Math.min(1, Math.max(0, terlewat / jarak));
};

let idFrame = null;
const tanganiGulir = () => {
  if (idFrame) return;
  idFrame = requestAnimationFrame(() => {
    hitungKemajuan();
    idFrame = null;
  });
};

const perbaruiMode = () => {
  pinAktif.value = mqRuang.matches && !mqGerak.matches;
  lebarLg.value = mqLg.matches;
  if (pinAktif.value) hentikanPutar();
  else mulaiPutar();
  // Tinggi pembungkus baru berubah setelah kelasnya ikut berganti.
  nextTick(hitungKemajuan);
};

// Saat tidak dipaku (ponsel / kurangi-animasi) rodanya berputar sendiri.
const indeksOtomatis = ref(0);
let idPutar = null;

const hentikanPutar = () => {
  if (idPutar) clearInterval(idPutar);
  idPutar = null;
};

const mulaiPutar = () => {
  hentikanPutar();
  idPutar = setInterval(() => {
    indeksOtomatis.value = (indeksOtomatis.value + 1) % StepsContent.length;
  }, 2600);
};

// Ikon terakhir duduk di ujung jalur (pecahan 0,998). Kalau garisnya penuh
// tepat saat paku lepas, butir terakhir hanya menyala di 0,2% gulir terakhir.
// Jadi garisnya diselesaikan lebih awal, dan sisa gulir ini jadi jeda supaya
// butir terakhir sempat terbaca.
const EKOR = 0.15;

const progresGaris = computed(() => {
  if (!pinAktif.value) {
    const p = patokan.value;
    return p.length ? p[Math.min(indeksOtomatis.value, p.length - 1)] : 0;
  }
  return Math.min(1, kemajuan.value / (1 - EKOR));
});

// Butir ke-i menyala tepat saat garisnya sampai ke ikon ke-i.
const indeksAktif = computed(() => {
  if (!pinAktif.value) return indeksOtomatis.value;
  const p = patokan.value;
  if (p.length !== StepsContent.length) {
    return Math.min(
      StepsContent.length - 1,
      Math.floor(progresGaris.value * StepsContent.length),
    );
  }
  let i = 0;
  while (i < p.length - 1 && progresGaris.value >= p[i + 1]) i++;
  return i;
});

onMounted(() => {
  perbaruiMode();
  if (typeof ResizeObserver !== "undefined" && kolomKiri.value) {
    pengamatKiri = new ResizeObserver(ukurKiri);
    pengamatKiri.observe(kolomKiri.value);
  }
  window.addEventListener("scroll", tanganiGulir, { passive: true });
  window.addEventListener("resize", tanganiGulir, { passive: true });
  mqRuang.addEventListener("change", perbaruiMode);
  mqLg.addEventListener("change", perbaruiMode);
  mqGerak.addEventListener("change", perbaruiMode);
});

onUnmounted(() => {
  hentikanPutar();
  pengamatKiri?.disconnect();
  window.removeEventListener("scroll", tanganiGulir);
  window.removeEventListener("resize", tanganiGulir);
  mqRuang.removeEventListener("change", perbaruiMode);
  mqLg.removeEventListener("change", perbaruiMode);
  mqGerak.removeEventListener("change", perbaruiMode);
  if (idFrame) cancelAnimationFrame(idFrame);
});
</script>

<template>
  <div
    ref="pembungkus"
    class="w-full dark:bg-[#17181A]"
    :class="pinAktif ? 'pembungkus-pin' : 'h-full'"
    :style="{ '--jarak-pin': `${StepsContent.length * 40}vh` }"
  >
    <div ref="panel" :class="pinAktif ? 'panel-pin' : 'h-full'">
      <div class="isi-nilai relative w-full h-auto">
        <div
          class="area-judul w-full lg:max-w-3xl h-auto flex flex-col gap-y-1.5 sm:gap-y-3 xl:gap-y-3"
        >
          <div class="flex w-full h-auto justify-center md:justify-start">
            <p
              class="text-[17px] sm:text-[22px] md:text-[17px] lg:text-[21px] xl:text-[30px] text-[#1AB24F]"
            >
              {{ $t("about.values.eyebrow") }}
            </p>
          </div>
          <div
            class="flex w-full h-auto lg:pr-16 xl:pr-20 justify-center md:justify-start"
          >
            <p
              class="text-[18px] sm:text-[28px] lg:text-[26px] xl:text-[46px] text-[#195279] leading-[30px] lg:leading-normal xl:leading-[55px] dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-br dark:from-[#FAFAFA] dark:via-[#D4D4D4] dark:to-[#AAAAAA]"
            >
              {{ $t("about.values.title1") }}
              <span class="inline md:block">{{
                $t("about.values.visionTagline")
              }}</span>
            </p>
          </div>
          <div class="flex w-full h-auto justify-center md:justify-start">
            <p
              class="text-center md:text-start text-[12px] sm:text-[16px] lg:text-[14px] xl:text-[17px] text-[#89A6BA] xl:leading-relaxed lg:pr-20 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-br dark:from-[#FAFAFA] dark:via-[#D4D4D4] dark:to-[#AAAAAA]"
            >
              {{ $t("about.values.title2") }}
              <br class="hidden md:block xl:hidden" />
              {{ $t("about.values.title3") }}
              <br class="hidden xl:block" />
              {{ $t("about.values.humanFocused") }}
            </p>
          </div>
        </div>

        <div
          ref="kolomKiri"
          class="area-butir w-full h-auto flex flex-col justify-center"
        >
          <ul v-if="pinAktif && lebarLg" class="flex flex-col w-full">
            <li
              v-for="(step, index) in localizedSteps"
              :key="index"
              class="flex flex-row gap-x-4 lg:py-4 xl:py-5"
            >
              <span
                class="shrink-0 flex justify-center items-center w-[42px] h-[42px] xl:w-[52px] xl:h-[52px] rounded-full bg-white dark:bg-[#323232] shadow-md p-1.5 xl:p-2.5 transition-all duration-500"
                :class="
                  index === indeksAktif ? 'opacity-100' : 'opacity-40 grayscale'
                "
              >
                <img
                  :src="step.icon"
                  alt=""
                  class="w-full h-full object-contain"
                />
              </span>
              <div class="flex flex-col min-w-0">
                <p
                  class="text-[16px] xl:text-[20px] transition-colors duration-500"
                  :class="
                    index === indeksAktif
                      ? 'text-[#1AB24F] font-[500]'
                      : 'text-[#9CA3AF] dark:text-[#6F6F6F]'
                  "
                >
                  {{ step.title }}
                </p>
                <div
                  class="grid transition-[grid-template-rows] duration-500 ease-out"
                  :style="{
                    gridTemplateRows: index === indeksAktif ? '1fr' : '0fr',
                  }"
                >
                  <p
                    class="overflow-hidden text-[12px] lg:text-[14px] xl:text-[16px] leading-relaxed text-[#195279] dark:text-[#D4D4D4]"
                  >
                    <span class="block pt-1">{{ step.description }}</span>
                  </p>
                </div>
              </div>
            </li>
          </ul>
          <div v-else class="roda w-full">
            <div
              class="roda-jalur"
              :style="{
                transform: `translateY(calc(var(--tinggi-slot) * -${indeksAktif}))`,
              }"
            >
              <div
                v-for="(step, index) in localizedSteps"
                :key="index"
                class="roda-slot flex flex-row items-center gap-x-5"
              >
                <div
                  class="shrink-0 flex bg-white dark:bg-[#323232] rounded-full shadow-md p-1.5 sm:p-2 w-[50px] h-[50px] md:w-[56px] md:h-[56px] justify-center items-center"
                >
                  <img
                    :src="step.icon"
                    alt=""
                    class="w-full h-full object-contain object-center"
                  />
                </div>
                <div class="flex flex-col min-w-0 gap-y-1 md:gap-y-2">
                  <p
                    class="text-[#195279] dark:text-white text-[14px] sm:text-[16px] md:text-[20px] font-[500]"
                  >
                    {{ step.title }}
                  </p>
                  <p
                    class="text-[#195279] dark:text-[#D4D4D4] text-[10px] sm:text-[14px] md:text-[15px] leading-relaxed"
                  >
                    {{ step.description }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="area-grafik w-full h-auto flex items-center lg:items-start justify-center lg:justify-start"
          :style="gayaGrafik"
        >
          <StepLine :progres="progresGaris" @terukur="terimaPatokan" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Roda: jendela setinggi satu slot, isinya digeser ke atas satu slot per
   butir. Semua slot sama tinggi supaya geserannya cukup satu angka. */
.roda {
  --tinggi-slot: 140px;
  height: var(--tinggi-slot);
  overflow: hidden;
}

.roda-jalur {
  transition: transform 600ms cubic-bezier(0.22, 1, 0.36, 1);
}

.roda-slot {
  height: var(--tinggi-slot);
}

@media (min-width: 768px) {
  .roda {
    --tinggi-slot: 170px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .roda-jalur {
    transition: none;
  }
}

/* Tiga susunan, satu per rentang layar.
   < md  : satu kolom bertumpuk.
   md-lg : S-Line sejajar dengan judul — ia membentang dua baris, jadi judul
           dan daftar butirnya duduk berdampingan dengannya di kolom kiri.
   lg+   : judul kembali melintang penuh, S-Line hanya sebaris dengan butir. */
.isi-nilai {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-areas:
    "judul"
    "grafik"
    "butir";
  row-gap: 1.25rem;
}

.area-judul {
  grid-area: judul;
}
.area-butir {
  grid-area: butir;
}
.area-grafik {
  grid-area: grafik;
}

@media (min-width: 768px) {
  .isi-nilai {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto;
    grid-template-areas:
      "judul grafik"
      "butir grafik";
    column-gap: 1.25rem;
    row-gap: 1.25rem;
  }
}

@media (min-width: 1024px) {
  .isi-nilai {
    grid-template-areas:
      "judul judul"
      "butir grafik";
  }
}

/* Jarak tempuh paku: 40vh per butir, ditetapkan lewat --jarak-pin di template. */
.pembungkus-pin {
  height: calc(100svh + var(--jarak-pin));
}

.panel-pin {
  position: sticky;
  top: 0;
  height: 100svh;
  display: flex;
  align-items: center;
  /* Isinya ditengahkan di dalam kotak padding, jadi selisih atas-bawah inilah
     yang menentukan tinggi dudukannya: bawah lebih besar = kartu naik.
     Atas tetap 96px sebagai ruang bebas navbar. */
  padding-top: 96px;
  padding-bottom: 140px;
}

/* Mulai lg tinggi grafik disetel dari tinggi kolom kiri (lihat gayaGrafik),
   jadi lebarnya yang menyesuaikan. Di bawah lg grafiknya membentang dua baris
   dan mengisi lebar kolomnya seperti biasa. */
@media (min-width: 1024px) and (min-height: 800px) {
  .area-grafik > svg {
    height: 100%;
    width: auto;
    max-width: 100%;
  }
}
</style>
