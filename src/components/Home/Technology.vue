<script setup>
import { ref, computed, nextTick, onMounted, onBeforeUnmount } from "vue";
import TechnologyStack from "@/components/Home/TechnologyStack.vue";

const technologyItems = [
  { key: "what-is-rppg" },
  { key: "how-it-works" },
  { key: "machine-learning" },
  { key: "telemedicine" },
];

const currentIndex = ref(0);

// Butir yang belum gilirannya dikaburkan menurut JARAKNYA ke butir aktif —
// pola yang sama seperti di Description.vue, supaya urutannya ikut terbaca:
// mana yang sebentar lagi, mana yang masih jauh.
//
// Angkanya lebih kecil daripada di sana (1,1 lawan 2) karena di sini ada
// EMPAT butir, bukan tiga. Jarak terjauh jadi 3, dan memakai angka yang sama
// akan membuat butir terakhir kabur 6px — hilang, bukan mundur.
const BLUR_PER_LANGKAH = 1.1; // px

// Sengaja TANPA pemudaran, berbeda dari Description.vue. Di sana kedua butir
// tak aktif berbagi satu warna, jadi opasitas yang memberi kedalaman. Di sini
// warnanya sudah #D6D6D6 — nyaris putih sejak awal — dan menambah pudar di
// atasnya akan menghapusnya, bukan memundurkannya.
const kaburButir = (index) =>
  `blur(${Math.abs(index - currentIndex.value) * BLUR_PER_LANGKAH}px)`;

const pembungkus = ref(null);
const panel = ref(null);
const kemajuan = ref(0); // 0 saat paku dipasang .. 1 saat paku mau lepas

const mqRuang = window.matchMedia(
  "(min-width: 1024px) and (min-height: 800px)",
);
const mqGerak = window.matchMedia("(prefers-reduced-motion: reduce)");
const pinAktif = ref(false);

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
    if (pinAktif.value) {
      const jumlah = technologyItems.length;
      currentIndex.value = Math.min(
        jumlah - 1,
        Math.floor(kemajuan.value * jumlah),
      );
    }
    idFrame = null;
  });
};

const AYUN = 0.55;

// Patokan titik: tengah tiap butir, lalu ujung jalur. Butirnya berbagi tinggi
// sama rata, jadi cukup pecahan — tidak perlu mengukur DOM.
const patokan = technologyItems
  .map((_, i) => (i + 0.5) / technologyItems.length)
  .concat(1);

// Pecahan tinggi daftar, 0..1. Lajunya diayun seperti di Description.vue:
// pelan saat pas di sebuah butir, cepat saat menyeberang, tidak pernah berhenti.
const posisiTitik = computed(() => {
  if (!pinAktif.value) return patokan[currentIndex.value];

  const p = patokan;
  const akhir = technologyItems.length - 1;
  const panjang = p[p.length - 1] - p[0];
  const q = Math.min(1, Math.max(0, kemajuan.value));

  let i = 0;
  while (i < akhir && q >= (p[i + 1] - p[0]) / panjang) i++;

  const mulai = (p[i] - p[0]) / panjang;
  const usai = (p[i + 1] - p[0]) / panjang;
  const d = usai > mulai ? (q - mulai) / (usai - mulai) : 1;
  const e = d - (AYUN * Math.sin(2 * Math.PI * d)) / (2 * Math.PI);

  return p[i] + (p[i + 1] - p[i]) * e;
});

let interval = null;

// ⏱️ konfigurasi timing untuk mode berputar sendiri (saat paku tidak dipasang)
const SLIDE_DURATION = 4000;

const hentikanPutaran = () => {
  clearInterval(interval);
  interval = null;
};

const jalankanPutaran = () => {
  if (interval) return;
  interval = setInterval(() => {
    currentIndex.value =
      currentIndex.value === technologyItems.length - 1
        ? 0
        : currentIndex.value + 1;
  }, SLIDE_DURATION);
};

const perbaruiMode = () => {
  pinAktif.value = mqRuang.matches && !mqGerak.matches;
  if (pinAktif.value) hentikanPutaran();
  else jalankanPutaran();
  nextTick(hitungKemajuan);
};

// Keterangan disembunyikan sekejap tiap ganti butir supaya ia muncul dengan
// memudar, bukan berganti teks begitu saja di tempat. Ditaruh di watch, bukan
// di dalam pemutarnya, supaya berlaku untuk kedua cara berpindah — digulir
// maupun berputar sendiri.
onMounted(() => {
  perbaruiMode();
  mqRuang.addEventListener("change", perbaruiMode);
  mqGerak.addEventListener("change", perbaruiMode);
  window.addEventListener("scroll", tanganiGulir, { passive: true });
  window.addEventListener("resize", tanganiGulir, { passive: true });
});

onBeforeUnmount(() => {
  mqRuang.removeEventListener("change", perbaruiMode);
  mqGerak.removeEventListener("change", perbaruiMode);
  window.removeEventListener("scroll", tanganiGulir);
  window.removeEventListener("resize", tanganiGulir);
  hentikanPutaran();
  if (idFrame) cancelAnimationFrame(idFrame);
});
</script>

<template>
  <div
    ref="pembungkus"
    class="pembungkus-pin w-full h-auto sm:px-10"
    :style="{ '--jarak-pin': `${technologyItems.length * 45}vh` }"
  >
    <div ref="panel" class="panel-pin">
      <div
        class="w-full h-auto p-[1px] bg-[#D9D9D9] dark:bg-gradient-to-r dark:from-[#17181A] dark:from-45% dark:to-[#565656] shadow-lg rounded-2xl"
      >
        <div
          class="kartu-teknologi w-full h-auto flex flex-col bg-[#FFFFFF] dark:bg-[#1D1F23] pt-14 pb-14 sm:pb-16 px-8 md:px-12 lg:px-10 xl:px-12 rounded-2xl gap-y-3"
        >
          <div class="isi-teknologi w-full h-auto">
            <div class="area-judul w-full h-auto flex flex-col gap-y-3">
              <div class="w-full h-auto">
                <p class="text-[#2AB857] font-[500] text-[18px] sm:text-[24px]">
                  {{ $t("home.technology.eyebrow") }}
                </p>
              </div>
              <div class="w-full h-auto lg:pr-20">
                <p
                  class="text-[#195279] font-[500] text-[16px] md:text-[24px] lg:text-[26px] xl:text-[36px] leading-normal tracking-wide dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-br dark:from-[#FAFAFA] dark:via-[#D4D4D4] dark:to-[#AAAAAA]"
                >
                  {{ $t("home.technology.titleLine1") }}
                  <br class="hidden sm:block" />
                  {{ $t("home.technology.titleLine2") }}
                </p>
              </div>
            </div>

            <div class="area-grafik w-full">
              <TechnologyStack :aktif="currentIndex" class="grafik-tumpuk" />
            </div>

            <div
              class="area-butir relative flex flex-col w-full h-[410px] lg:min-w-0 lg:pl-8 lg:pr-5 xl:pl-10 transition-all duration-500 ease-out"
            >
              <span
                class="hidden lg:block absolute left-3 -translate-x-1/2 top-0 bottom-0 w-[3px] bg-gray-200 dark:bg-[#FAFAFA]/15"
              ></span>

              <span
                class="hidden lg:block absolute left-3 -translate-x-1/2 top-0 w-[3px] bg-green-500"
                :style="{ height: `${posisiTitik * 100}%` }"
              ></span>

              <span
                class="hidden lg:block absolute left-3 -translate-x-1/2 w-4 h-4 rounded-full bg-green-500"
                :style="{ top: `calc(${posisiTitik * 100}% - 8px)` }"
              ></span>
              <div
                v-for="(technology, index) in technologyItems"
                :key="index"
                class="relative w-full min-h-0 flex-1 flex flex-col items-center transition-all duration-500 ease-out"
              >
                <div
                  class="absolute left-0 w-full transition-all duration-500 ease-out"
                  :class="
                    index === currentIndex
                      ? 'top-0'
                      : 'top-1/2 -translate-y-1/2'
                  "
                  :style="{ filter: kaburButir(index) }"
                >
                  <p
                    class="font-[500] leading-snug tracking-normal transition-all duration-500 ease-out text-[16px] sm:text-[20px] lg:text-[16px] xl:text-[24px] max-[321px]:!text-[14px] max-[376px]:!text-[14px]"
                    :class="
                      index === currentIndex
                        ? 'text-[#195279] dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-br dark:from-[#FAFAFA] dark:via-[#D4D4D4] dark:to-[#AAAAAA]'
                        : 'text-[#D6D6D6] dark:text-[#565656] '
                    "
                  >
                    {{ $t(`home.technology.items.${technology.key}.title`) }}
                  </p>

                  <Transition
                    enter-active-class="transition-all duration-300 ease-out"
                    enter-from-class="opacity-0 translate-y-1"
                  >
                    <div
                      v-if="index === currentIndex"
                      class="absolute left-0 top-full w-full mt-2"
                    >
                      <p
                        class="font-[500] text-[#195279] dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-br dark:from-[#FAFAFA] dark:via-[#D4D4D4] dark:to-[#AAAAAA] text-[12px] sm:text-[16px] lg:text-[12px] xl:text-[16px] xls:text-[18px] max-[321px]:!text-[10px] leading-snug tracking-wide"
                      >
                        {{
                          $t(
                            `home.technology.items.${technology.key}.description`,
                          )
                        }}
                      </p>
                    </div>
                  </Transition>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.isi-teknologi {
  display: grid;

  row-gap: 2.5rem;
  column-gap: 1.25rem;
  grid-template-areas:
    "judul"
    "grafik"
    "butir";
}

.area-judul {
  grid-area: judul;
}

.area-grafik {
  grid-area: grafik;

  display: flex;
  align-items: center;
  justify-content: center;
}

.area-butir {
  grid-area: butir;
}

.grafik-tumpuk {
  width: 100%;
  max-width: 400px;
}

@media (min-width: 1024px) {
  .isi-teknologi {
    grid-template-columns: 1fr 1fr;

    grid-template-areas:
      "judul judul"
      "butir grafik";
    grid-template-rows: auto 1fr;
    column-gap: 1.5rem;
  }

  /* Grafik mengisi penuh kolomnya; tingginya ikut rasio gambar */
  .grafik-tumpuk {
    width: 100%;
    max-width: none;
    height: auto;
  }

  /* Tinggi kolom kiri mengikuti kolom kanan. min-height cuma lantai pengaman:
     di bawah ~1300px kolomnya terlalu sempit sehingga tinggi dari grafik tidak
     cukup untuk teksnya dan butirnya bertabrakan. */
  .area-butir {
    height: auto;
    min-height: 480px;
  }
}

@media (min-width: 1024px) and (min-height: 800px) {
  .pembungkus-pin {
    height: calc(100svh + var(--jarak-pin));
  }

  .panel-pin {
    position: sticky;
    top: 0;
    height: 100svh;
    display: flex;
    align-items: center;

    /* Jumlah atas+bawah tetap 80px seperti semula, hanya dibagi ulang supaya
       kartunya naik sedikit. 56 adalah batasnya: lebih kecil dari itu, eyebrow
       "Technology" mulai masuk ke bawah navbar. */
    padding-top: 56px;
    padding-bottom: 24px;
  }

  .kartu-teknologi {
    padding-top: 2rem;
    padding-bottom: 5rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .pembungkus-pin {
    height: auto;
  }

  .panel-pin {
    position: static;
    height: auto;
    padding-top: 0;
    padding-bottom: 0;
  }
}
</style>
