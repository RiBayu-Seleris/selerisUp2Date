<script setup>
import { useIsDark } from "@/utils/useIsDark";
import { ref, computed, nextTick, onMounted, onUnmounted } from "vue";

const steps = [{ key: "rppg" }, { key: "ai" }, { key: "security" }];

const pembungkus = ref(null);
const panel = ref(null);
const kemajuan = ref(0); // 0 saat paku dipasang .. 1 saat paku mau lepas

const mqRuang = window.matchMedia(
  "(min-width: 1024px) and (min-height: 740px)",
);
const mqGerak = window.matchMedia("(prefers-reduced-motion: reduce)");
const pinAktif = ref(false);

const hitungKemajuan = () => {
  if (!pinAktif.value || !pembungkus.value || !panel.value) return;
  // Jarak tempuh selama dipaku = selisih tinggi pembungkus dengan panelnya.
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

const tanganiUbahUkuran = () => {
  tanganiGulir();
  ukurUlang();
};

const perbaruiMode = () => {
  pinAktif.value = mqRuang.matches && !mqGerak.matches;
  // Tinggi pembungkus dan letak tiap langkah baru berubah setelah kelasnya
  // ikut berganti, jadi keduanya diukur ulang setelah Vue selesai menggambar.
  nextTick(() => {
    hitungKemajuan();
    ukurUlang();
  });
};

const daftar = ref(null);

const ukuran = ref([]);

const ukurUlang = () => {
  const el = daftar.value;
  if (!el) return;
  ukuran.value = [...el.querySelectorAll("li")].map((li) => {
    const isi = li.firstElementChild;
    const judul = isi.querySelector("h3");
    const ket = isi.querySelector("p");
    return {
      judul: judul.offsetHeight,
      ket: ket.offsetHeight + parseFloat(getComputedStyle(ket).marginTop),
      pb: parseFloat(getComputedStyle(li).paddingBottom),
    };
  });
};

const MULAI_TUKAR = 0.5;
const SELESAI_TUKAR = 0.95;

const patokan = computed(() => {
  const u = ukuran.value;
  if (!u.length) return null;
  const akhir = u.length - 1;

  // Tengah langkah ke-j; langkah sebelumnya pasti tertutup, karena cuma satu
  // yang boleh terbuka.
  const titik = u.map((_, j) => {
    let atas = 0;
    for (let k = 0; k < j; k++) atas += u[k].judul + u[k].pb;
    return atas + (u[j].judul + u[j].ket) / 2;
  });

  // Patokan terakhir: ujung jalur abu-abu. Jalurnya setinggi seluruh daftar,
  // dan langkah terakhir tanpa jarak bawah (last:pb-0), jadi ujungnya = bawah
  // isi langkah terakhir.
  let penuh = 0;
  for (let k = 0; k < akhir; k++) penuh += u[k].judul + u[k].pb;
  titik.push(penuh + u[akhir].judul + u[akhir].ket);

  return titik;
});

const AYUN = 0.55;

const perjalanan = computed(() => {
  const p = patokan.value;
  if (!p) return null;
  const akhir = steps.length - 1;
  const panjang = p[p.length - 1] - p[0];
  if (panjang <= 0) return null;

  const q = Math.min(1, Math.max(0, kemajuan.value));
  let i = 0;
  while (i < akhir && q >= (p[i + 1] - p[0]) / panjang) i++;

  const mulai = (p[i] - p[0]) / panjang;
  const usai = (p[i + 1] - p[0]) / panjang;
  const d = usai > mulai ? (q - mulai) / (usai - mulai) : 1;

  // Integral dari laju (1 - AYUN*cos 2πd): pelan di kedua ujung ruas, cepat di
  // tengahnya, dan tetap naik terus karena AYUN < 1.
  const e = d - (AYUN * Math.sin(2 * Math.PI * d)) / (2 * Math.PI);

  return { i, d: e, posisi: p[i] + (p[i + 1] - p[i]) * e };
});

const posisiTitik = computed(() => {
  // Susunan daftar: semuanya terbuka sekaligus dan tidak ada yang bergerak,
  // jadi letaknya dibaca dari tata letak sebenarnya.
  if (!pinAktif.value) {
    const u = ukuran.value;
    if (!u.length) return 0;
    const akhir = u.length - 1;
    let atas = 0;
    for (let k = 0; k < akhir; k++) atas += u[k].judul + u[k].ket + u[k].pb;
    return atas + (u[akhir].judul + u[akhir].ket) / 2;
  }
  return perjalanan.value?.posisi ?? 0;
});

const terbuka = computed(() => {
  if (!pinAktif.value) return steps.map(() => 1); // daftar: semua terbuka

  const jalan = perjalanan.value;
  const akhir = steps.length - 1;
  if (!jalan) return steps.map((_, j) => (j === 0 ? 1 : 0));

  // Langkah terakhir tidak punya pengganti, jadi ia tidak pernah menutup.
  if (jalan.i === akhir) return steps.map((_, j) => (j === akhir ? 1 : 0));

  const t = Math.min(
    1,
    Math.max(0, (jalan.d - MULAI_TUKAR) / (SELESAI_TUKAR - MULAI_TUKAR)),
  );
  const m = t * t * (3 - 2 * t); // smoothstep: bertukarnya tidak menyentak

  return steps.map((_, j) =>
    j === jalan.i ? 1 - m : j === jalan.i + 1 ? m : 0,
  );
});

// Judul mana yang dihijaukan. Bertukar di tengah-tengah pergantian, jadi
// warnanya berganti bersamaan dengan keterangannya.
const indeksAktif = computed(() => {
  const t = terbuka.value;
  let pilih = 0;
  for (let j = 1; j < t.length; j++) if (t[j] > t[pilih]) pilih = j;
  return pilih;
});

const langkahAktif = (index) => !pinAktif.value || index === indeksAktif.value;

let pengawasUkuran = null;

const pasangPengawasUkuran = () => {
  if (!daftar.value || typeof ResizeObserver === "undefined") return;
  pengawasUkuran?.disconnect();
  pengawasUkuran = new ResizeObserver(ukurUlang);
  daftar.value
    .querySelectorAll("h3, p")
    .forEach((el) => pengawasUkuran.observe(el));
};

onMounted(() => {
  perbaruiMode();
  nextTick(() => {
    ukurUlang();
    pasangPengawasUkuran();
  });
  mqRuang.addEventListener("change", perbaruiMode);
  mqGerak.addEventListener("change", perbaruiMode);
  window.addEventListener("scroll", tanganiGulir, { passive: true });
  window.addEventListener("resize", tanganiUbahUkuran, { passive: true });
});

onUnmounted(() => {
  mqRuang.removeEventListener("change", perbaruiMode);
  mqGerak.removeEventListener("change", perbaruiMode);
  window.removeEventListener("scroll", tanganiGulir);
  window.removeEventListener("resize", tanganiUbahUkuran);
  if (idFrame) cancelAnimationFrame(idFrame);
  pengawasUkuran?.disconnect();
});

// Dipakai di template: video mode terang pakai v-if="!isDark", yang gelap
// pakai v-else. Tujuannya supaya cuma satu video yang benar-benar dibuat
// dan diunduh browser. Penjelasan lengkap ada di src/utils/useIsDark.js
const isDark = useIsDark();
</script>

<template>
  <div
    ref="pembungkus"
    class="pembungkus-pin relative w-full"
    :style="{ '--jarak-pin': `${steps.length * 50}vh` }"
  >
    <div
      ref="panel"
      class="panel-pin flex flex-col-reverse lg:flex-row px-0 lg:px-6 lg:justify-between dark:bg-[#17181A]"
    >
      <div class="flex flex-col w-full h-full justify-center dark:bg-[#17181A]">
        <div class="w-full pb-0 sm:pb-2 md:pb-0 xl:pb-6">
          <p
            class="text-[20px] md:text-[24px] text-[#1AB24F] font-[500] dark:text-[#FAFAFA]"
          >
            {{ $t("home.howItWorks.eyebrow") }}
          </p>
        </div>
        <div
          class="w-full h-auto flex flex-col lg:-space-y-2 xl:-space-y-4 pb-4 md:pb-5 lg:pb-0 xl:pb-0 text-[#195279]"
        >
          <p
            class="text-[26px] sm:text-[34px] md:text-[40px] lg:text-[44px] xl:text-[48px] font-[500] dark:text-[#FAFAFA]"
          >
            {{ $t("home.howItWorks.titleLine1") }}
            <span class="inline-flex lg:hidden dark:text-[#FAFAFA]">
              {{ $t("home.howItWorks.titleLine2") }}</span
            >
          </p>
          <p
            class="hidden lg:block text-[26px] sm:text-[34px] md:text-[40px] lg:text-[44px] xl:text-[48px] font-[500] dark:text-[#FAFAFA]"
          >
            {{ $t("home.howItWorks.titleLine2") }}
          </p>
        </div>

        <div
          class="w-full mt-5"
          :class="pinAktif ? 'h-[390px] xl:h-[380px]' : ''"
        >
          <ol ref="daftar" class="relative w-full flex flex-col">
            <span
              class="absolute left-3 -translate-x-1/2 top-0 bottom-0 w-[3px] bg-gray-200 dark:bg-[#FAFAFA]/15"
            ></span>

            <span
              class="absolute left-3 -translate-x-1/2 top-0 w-[3px] bg-green-500"
              :style="{ height: `${posisiTitik}px` }"
            ></span>

            <span
              v-if="pinAktif"
              class="absolute left-3 -translate-x-1/2 w-4 h-4 rounded-full bg-green-500"
              :style="{ top: `${posisiTitik - 8}px` }"
            ></span>

            <li
              v-for="(step, index) in steps"
              :key="step.key"
              class="relative pb-7 xl:pb-12 last:pb-0"
            >
              <div class="relative pl-10 xl:pl-16">
                <span
                  v-if="!pinAktif"
                  class="absolute left-3 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-green-500"
                ></span>

                <h3
                  class="text-[16px] sm:text-[20px] md:text-[24px] leading-[20px] sm:leading-normal font-[500] transition-colors duration-500 ease-out"
                  :class="
                    langkahAktif(index)
                      ? 'text-green-600'
                      : 'text-gray-400 dark:text-[#FAFAFA]/30'
                  "
                >
                  {{ $t(`home.howItWorks.steps.${step.key}.title`) }}
                </h3>

                <div
                  class="grid"
                  :style="{
                    gridTemplateRows: `${terbuka[index]}fr`,
                    opacity: terbuka[index],
                  }"
                >
                  <div class="overflow-hidden">
                    <p
                      class="mt-3.5 md:mt-4 text-[12px] sm:text-[14px] leading-relaxed text-[#195279] dark:text-[#FAFAFA] max-w-xl"
                    >
                      {{ $t(`home.howItWorks.steps.${step.key}.description`) }}
                    </p>
                  </div>
                </div>
              </div>
            </li>
          </ol>
        </div>
      </div>

      <div
        class="flex w-full h-full md:h-[500px] lg:h-full xl:h-[425px] justify-center items-center mb-12 md:mb-20 lg:mb-0"
      >
        <video
          v-if="!isDark"
          aria-hidden="true"
          autoplay
          loop
          muted
          playsinline
          @contextmenu.prevent
          class="w-full h-full md:w-auto md:h-[500px] lg:w-[400px] lg:h-[400px] xl:w-[500px] xl:h-[500px] object-fill lg:object-contain lg:ml-20 xl:pl-0"
        >
          <source
            src="@/assets/videos/Design-Vector-Web2.mp4"
            type="video/mp4"
          />
        </video>
        <video
          v-else
          aria-hidden="true"
          autoplay
          loop
          muted
          playsinline
          @contextmenu.prevent
          class="w-full h-full md:w-auto md:h-[500px] lg:w-[400px] lg:h-[400px] xl:w-[500px] xl:h-[500px] object-fill lg:object-contain rounded-[20px] bg-[#FFFFFF] dark:bg-[#151819] border-[0.1px] dark:border-[#FAFAFA]/25 lg:ml-20 xl:pl-0"
        >
          <source
            src="@/assets/videos/Design-Dark-Vector-Web2.mp4"
            type="video/mp4"
          />
        </video>
      </div>
    </div>
  </div>
</template>

<style scoped>
@media (min-width: 1024px) and (min-height: 740px) {
  .pembungkus-pin {
    height: calc(100svh + var(--jarak-pin));
  }

  .panel-pin {
    position: sticky;
    top: 0;
    height: 100svh;
    align-items: center;

    padding-top: 96px;
    padding-bottom: 24px;
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
