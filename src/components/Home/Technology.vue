<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import TechnologyStack from "@/components/Home/TechnologyStack.vue";

const technologyItems = [
  { key: "what-is-rppg" },
  { key: "how-it-works" },
  { key: "machine-learning" },
  { key: "telemedicine" },
];

// Keadaan pembuka: keempat judul abu-abu semua, dirapatkan di tengah kolom,
// dan tumpukan pelat di kanan belum ada yang ditarik keluar — lurus semua.
// Sengaja -1, jadi putarannya tinggal menambah satu seperti butir biasa.
const PEMBUKA = -1;

const currentIndex = ref(PEMBUKA);
const pembuka = computed(() => currentIndex.value === PEMBUKA);

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
  pembuka.value
    ? "none"
    : `blur(${Math.abs(index - currentIndex.value) * BLUR_PER_LANGKAH}px)`;

// Jarak antar judul saat pembuka, dalam persen tinggi kolom — bukan piksel,
// supaya ikut menyesuaikan diri: kolomnya melar mengikuti grafik di sebelah,
// sementara judulnya ada yang satu baris dan ada yang dua.
//
// Bandingkan dengan 25% saat daftar terbuka (satu pita per butir): serapat
// ini judulnya masih punya sela, tidak menempel.
const RAPAT_PEMBUKA = 17; // %

const PITA = 100 / technologyItems.length; // % tinggi satu pita butir

// Butirnya dipasang absolut terhadap kolom, bukan mengalir, supaya
// perpindahan antar tiga keadaan ini cuma soal `top` — dan karenanya bisa
// digeser mulus oleh transisi, bukan meloncat.
const letakButir = (index) => {
  if (pembuka.value) {
    const tengah = (technologyItems.length - 1) / 2;
    return {
      top: `${50 + (index - tengah) * RAPAT_PEMBUKA}%`,
      transform: "translateY(-50%)",
    };
  }

  // Butir aktif naik ke puncak pitanya, memberi ruang bagi keterangan yang
  // muncul di bawahnya; sisanya duduk di tengah pitanya masing-masing.
  return index === currentIndex.value
    ? { top: `${index * PITA}%`, transform: "none" }
    : { top: `${(index + 0.5) * PITA}%`, transform: "translateY(-50%)" };
};

// ⏱️ berapa lama satu butir bertahan sebelum berganti sendiri. Pelatnya butuh
// 600ms untuk selesai bergeser, jadi angka ini bukan waktu baca: sisanya yang
// benar-benar diam kira-kira 1,9 detik.
const SLIDE_DURATION = 2500;

// Pembuka sedikit lebih panjang: yang terbaca di situ empat judul sekaligus,
// bukan satu.
const DURASI_PEMBUKA = 3000;

// Rantai setTimeout, bukan setInterval, justru karena kedua jatah waktu itu
// berbeda — tiap langkah menjadwalkan langkah berikutnya menurut apa yang
// sedang tampil.
let jam = null;

const hentikanPutaran = () => {
  clearTimeout(jam);
  jam = null;
};

const jadwalkanLangkah = () => {
  jam = setTimeout(
    () => {
      currentIndex.value =
        currentIndex.value === technologyItems.length - 1
          ? PEMBUKA
          : currentIndex.value + 1;
      jadwalkanLangkah();
    },
    pembuka.value ? DURASI_PEMBUKA : SLIDE_DURATION,
  );
};

const jalankanPutaran = () => {
  if (jam) return;
  jadwalkanLangkah();
};

const mqSorot = window.matchMedia("(hover: hover)");
const terlihat = ref(false);
const disorot = ref(false);

// Kursor menunjuk satu butir — lewat judulnya atau lewat pelatnya di grafik —
// maka putaran berhenti dan penjelasannya pindah ke situ.
//
// Layar sentuh tidak punya kursor: di sana "hover" cuma ketukan yang akan
// membekukan putaran sampai ada ketukan lain, jadi dilewati.
const sorotButir = (index) => {
  if (!mqSorot.matches) return;
  disorot.value = true;
  hentikanPutaran();
  currentIndex.value = index;
};

// Kursor pergi: putaran lanjut dari butir yang barusan disorot, tidak
// mengulang dari awal.
const lepasSorot = () => {
  if (!mqSorot.matches) return;
  disorot.value = false;
  if (terlihat.value) jalankanPutaran();
};

// Putarannya baru jalan saat sectionnya kelihatan, dan berhenti lagi begitu
// lewat — kalau dibiarkan jalan sejak halaman dibuka, pembaca yang menggulir
// ke sini akan tiba di tengah putaran, entah butir yang mana.
const pembungkus = ref(null);
let pengamat = null;

onMounted(() => {
  pengamat = new IntersectionObserver(
    ([entri]) => {
      terlihat.value = entri.isIntersecting;
      // Kursor yang masih menempel tetap menahan putaran, termasuk saat
      // sectionnya balik kelihatan.
      if (entri.isIntersecting && !disorot.value) jalankanPutaran();
      else if (!entri.isIntersecting) {
        hentikanPutaran();
        // Balik ke pembuka, supaya sectionnya selalu memperkenalkan diri dulu
        // saat pembaca kembali ke sini.
        if (!disorot.value) currentIndex.value = PEMBUKA;
      }
    },
    { threshold: 0.35 },
  );
  pengamat.observe(pembungkus.value);
});

onBeforeUnmount(() => {
  pengamat?.disconnect();
  hentikanPutaran();
});
</script>

<template>
  <div ref="pembungkus" class="w-full h-auto sm:px-10">
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
                class="text-[#195279] font-[400] text-[16px] md:text-[24px] lg:text-[26px] xl:text-[36px] leading-normal tracking-wide dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-br dark:from-[#FAFAFA] dark:via-[#D4D4D4] dark:to-[#AAAAAA]"
              >
                {{ $t("home.technology.titleLine1") }}
                <br class="hidden sm:block" />
                {{ $t("home.technology.titleLine2") }}
              </p>
            </div>
          </div>

          <div class="area-grafik w-full">
            <TechnologyStack
              :aktif="currentIndex"
              class="grafik-tumpuk"
              @sorot="sorotButir"
              @lepas="lepasSorot"
            />
          </div>

          <div
            class="area-butir relative w-full h-[410px] lg:min-w-0 lg:pr-5"
            @mouseleave="lepasSorot"
          >
            <div
              v-for="(technology, index) in technologyItems"
              :key="index"
              class="absolute left-0 w-full transition-all duration-500 ease-out"
              :class="{ 'z-10': index === currentIndex }"
              :style="[letakButir(index), { filter: kaburButir(index) }]"
              @mouseenter="sorotButir(index)"
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
                      $t(`home.technology.items.${technology.key}.description`)
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
</style>
