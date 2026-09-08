<script setup>
import loadingAnimation from "@/assets/images/loading.webm";
import { useRoute } from "vue-router";
import { onMounted, onUnmounted, ref, computed, watch, nextTick } from "vue";
import AOS from "aos";
import { useScrollStore } from "@/stores/scroll";
import { useThemeStore } from "@/stores/theme";
import { useLanguageStore } from "@/stores/language";
import { usePageLoadingStore } from "@/stores/pageLoading";
import {
  pasangSmoothScroll,
  hentikanSmoothScroll,
  jalankanSmoothScroll,
} from "@/utils/smoothScroll";
import { useSidebarStore } from "@/stores/sidebar";

import Navbar from "@/components/Navbar.vue";
import GestureScroll from "@/components/GestureScroll.vue";
// import NavbarScroll from "@/components/NavbarScroll.vue";
import Sidebar from "@/components/Sidebar.vue";
import Touch from "@/components/Touch.vue";
import Footer from "@/components/Footer.vue";
import ScrollTopButton from "@/components/reusable/ScrollTopButton.vue";

// Import Swiper CSS
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import axios from "axios";

// Store & route
const dotLazyLoading = 4;
const themeStore = useThemeStore();
const languageStore = useLanguageStore();
const pageLoading = usePageLoadingStore();
const route = useRoute();
const scrollStore = useScrollStore();

const isTooltipOpen = ref(false);
const sidebarStore = useSidebarStore();

// Loading control
const isLoad = ref(false);

// Berkas animasi loading (webm ±700 KB) perlu waktu untuk diunduh. Tanpa
// penanda ini, kotak videonya kosong dulu lalu animasinya muncul mendadak.
// Jadi videonya kita munculkan perlahan begitu benar-benar siap diputar.
const animasiLoadingSiap = ref(false);
const tandaiAnimasiSiap = () => {
  animasiLoadingSiap.value = true;
};
// Pengaman: kalau kejadian "siap diputar" tidak pernah terkirim (mis. browser
// menolak memutar otomatis), videonya tetap ditampilkan setelah 1,2 detik.
setTimeout(tandaiAnimasiSiap, 1200);

/* ------------------------------------------------------------
   Gerbang loading

   Layar loading berbentuk dua daun gerbang yang menutupi layar. Saat konten
   siap, keduanya BERGESER ke tepi (sliding), bukan berayun seperti pintu yang
   didorong: daun kiri ke kiri, daun kanan ke kanan.

   Lingkaran di tengah sengaja ditempel pada daun KIRI — bukan dibelah dua —
   supaya bentuknya tetap utuh dan ikut bergeser penuh mengikuti daun kiri.

   Dua penanda dipakai karena tugasnya berbeda:
   - gerbangTampil  : daun gerbangnya masih terpasang di halaman atau tidak.
                      Harus tetap terpasang selama animasi geser berjalan,
                      jadi belum boleh dilepas begitu konten siap.
   - gerbangMembuka : sedang bergeser ke tepi atau belum. Ini yang memicu
                      animasinya.
------------------------------------------------------------ */
const DURASI_GERBANG_MS = 1100; // samakan dengan duration-[1100ms] di template
const gerbangTampil = ref(true);
const gerbangMembuka = ref(false);
let penghitungGerbang = null;

let scrollRafId = null;
const handleScroll = () => {
  if (scrollRafId) return;
  scrollRafId = requestAnimationFrame(() => {
    scrollStore.updateScroll();
    scrollRafId = null;
  });
};

const toggleTooltip = () => {
  isTooltipOpen.value = !isTooltipOpen.value;
};

// Dark mode exception
function updateDarkMode() {
  const html = document.documentElement;
  const isLightOnlyPage = route.path.startsWith("/product");
  if (isLightOnlyPage) html.classList.remove("dark");
}

// Halaman standalone (tanpa navbar, footer, touch, loading)
const standaloneRoutes = [
  "/test-embed",
  "/chatbot",
  "/chatbot2",
  "/face-tracking",
];

const isStandaloneRoute = computed(() => standaloneRoutes.includes(route.path));

/* ============================================================
   Layar loading

   Menutup hanya kalau DUA syarat terpenuhi:
     1. waktu minimum sudah lewat, DAN
     2. semua pengambilan data halaman sudah selesai
   Jadi yang menentukan adalah mana yang lebih lama.

   Dulu layar ini hanya menghitung waktu. Kalau data halaman baru datang
   setelah hitungan habis, halaman tampil kosong sebentar dan footer melompat
   ke atas sebelum isinya muncul.
============================================================ */
const MIN_LOADING_MS = 2000; // durasi minimum, seperti sebelumnya
const MAX_LOADING_MS = 10000; // pengaman: jangan sampai tertahan selamanya

const waktuMinimumLewat = ref(false);
let penghitungMinimum = null;
let penghitungMaksimum = null;

const cobaTutupLayarLoading = () => {
  if (waktuMinimumLewat.value && pageLoading.pending === 0) {
    clearTimeout(penghitungMaksimum);
    isLoad.value = true;
  }
};

const mulaiLayarLoading = () => {
  clearTimeout(penghitungMinimum);
  clearTimeout(penghitungMaksimum);

  clearTimeout(penghitungGerbang);

  isLoad.value = false;
  waktuMinimumLewat.value = false;
  gerbangTampil.value = true; // gerbang dipasang lagi, dalam keadaan tertutup
  gerbangMembuka.value = false;
  pageLoading.reset(); // pengambilan data halaman sebelumnya tidak relevan lagi

  penghitungMinimum = setTimeout(() => {
    waktuMinimumLewat.value = true;
    cobaTutupLayarLoading();
  }, MIN_LOADING_MS);

  // Kalau ada pengambilan data yang menggantung (server tidak menjawab),
  // layar loading tetap menutup daripada pengunjung terjebak selamanya.
  penghitungMaksimum = setTimeout(() => {
    isLoad.value = true;
  }, MAX_LOADING_MS);
};

// Dijalankan langsung saat komponen disiapkan — sebelum halaman di dalamnya
// sempat mengambil data — supaya hitungannya tidak saling menimpa.
if (isStandaloneRoute.value) {
  isLoad.value = true;
} else {
  mulaiLayarLoading();
}

/**
 * Smooth scroll hanya boleh jalan kalau DUA syarat terpenuhi:
 *   1. layar loading sudah menutup, DAN
 *   2. halaman ini bukan halaman standalone (chatbot, face-tracking, dsb.)
 *      yang punya area gulirnya sendiri.
 * Di luar itu ditahan.
 */
const perbaruiSmoothScroll = () => {
  if (isLoad.value && !isStandaloneRoute.value) {
    jalankanSmoothScroll();
  } else {
    hentikanSmoothScroll();
  }
};

// Kunci scroll selama layar loading tampil, supaya konten di baliknya tidak
// ikut tergeser oleh pengunjung.
watch(
  isLoad,
  (siap) => {
    document.body.style.overflow = siap ? "" : "hidden";
    perbaruiSmoothScroll();
    if (!siap) return;

    // Layar loading baru saja menutup, konten kini benar-benar terlihat.
    // Di sinilah animasi scroll (AOS) diberi aba-aba untuk mulai, supaya
    // isinya masuk dengan animasi, bukan muncul mendadak.
    // nextTick menunggu Vue selesai menggambar dulu.
    // Aba-aba gerbang bergeser ke tepi. Daunnya baru dilepas dari halaman
    // setelah geserannya selesai — kalau dilepas sekarang, animasinya
    // terpotong dan konten muncul mendadak seperti sebelumnya.
    gerbangMembuka.value = true;
    penghitungGerbang = setTimeout(() => {
      gerbangTampil.value = false;
    }, DURASI_GERBANG_MS);

    nextTick(() => {
      document.dispatchEvent(new Event("seleris:content-ready"));
      AOS.refreshHard(); // pindah halaman berarti elemen baru, perlu dipindai ulang
    });
  },
  { immediate: true },
);

// Setiap kali pengambilan data selesai, cek apakah layar sudah boleh ditutup
watch(() => pageLoading.pending, cobaTutupLayarLoading);

onMounted(() => {
  themeStore.loadTheme();
  languageStore.loadLanguage();
  window.addEventListener("scroll", handleScroll, { passive: true });

  // Smooth scroll dipasang sekali untuk seluruh situs. Semua kodenya ada di
  // src/utils/smoothScroll.js — komponen lain tidak perlu tahu apa-apa.
  pasangSmoothScroll();
  perbaruiSmoothScroll();
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
  if (scrollRafId) cancelAnimationFrame(scrollRafId);
});

watch(
  () => route.fullPath,
  (newPath, oldPath) => {
    updateDarkMode();

    if (newPath !== oldPath) {
      // Standalone routes tidak perlu loading screen
      if (standaloneRoutes.includes(newPath)) {
        isLoad.value = true;
        perbaruiSmoothScroll(); // halaman standalone: smooth scroll ditahan
        return;
      }
      mulaiLayarLoading();
    }
  },
);

// Conditional route
const isProductRoute = computed(() => route.path.startsWith("/product"));
const isTermsRoute = computed(() => route.path === "/terms");
const isSecurityRoute = computed(() => route.path === "/security");
const isPrivacyRoute = computed(() => route.path === "/privacy");
const isBookDemoRoute = computed(() => route.path === "/book-a-demo");
const isCompanyRoute = computed(() => route.path === "/about/company");
const isBlogDetail = computed(() => route.path.startsWith("/blog/"));

const BASE_URL = import.meta.env.VITE_API_URL;
const headerApi = {
  headers: {
    Accept: "application/json",
  },
};

const getTracking = async () => {
  try {
    const getGuestData = await axios.get(
      `${BASE_URL}/v1/app/visitors/track/`,
      headerApi,
    );
  } catch (error) {
    console.error("Error:", error);
  }
};

watch(
  () => scrollStore.isScrolled,
  (isScrolled) => {
    if (!isScrolled) {
      isTooltipOpen.value = false;
    }
  },
);

onMounted(() => {
  getTracking();
});
</script>

<template>
  <!-- Standalone routes: langsung render tanpa loading/navbar/footer -->
  <template v-if="isStandaloneRoute">
    <div class="w-full h-auto !bg-[#F4F4F4]">
      <router-view />
    </div>
  </template>

  <!-- Normal routes -->
  <template v-else>
    <!-- ⏳ Layar loading.
         Tampilannya polos seperti sebelumnya — yang berubah hanya cara
         menghilangnya: layarnya terbelah dua lalu BERGESER ke tepi (kiri ke
         kiri, kanan ke kanan), bukan sekadar memudar.

         "overflow-hidden" menahan belahan yang sudah keluar layar supaya
         tidak memunculkan batang gulir mendatar. -->
    <div
      v-if="gerbangTampil"
      :class="[
        'fixed inset-0 z-[9999] overflow-hidden',
        gerbangMembuka ? 'pointer-events-none' : '',
      ]"
    >
      <!-- Belahan kanan -->
      <div
        :class="[
          'absolute top-0 right-0 w-1/2 h-full bg-[#F9F9F9] dark:bg-[#17181A] transition-transform ease-[cubic-bezier(.7,0,.2,1)] duration-[1100ms]',
          gerbangMembuka ? 'translate-x-full' : 'translate-x-0',
        ]"
      ></div>

      <!-- Belahan kiri.
           Digeser lebih jauh dari lebarnya sendiri (tambahan 11rem = 176px)
           supaya lingkaran yang menempel di tepi kanannya ikut keluar layar
           sepenuhnya. Angkanya HARUS lebih besar dari jari-jari lingkaran
           terbesar (280px : 2 = 140px) — kalau tidak, tepi lingkarannya masih
           menyembul di sisi kiri layar. Jadi kalau ukuran lingkaran di bawah
           diubah, angka ini ikut disesuaikan.
           z-20 supaya lingkarannya lewat DI ATAS belahan kanan. -->
      <div
        :class="[
          'absolute top-0 left-0 w-1/2 h-full z-20 bg-[#F9F9F9] dark:bg-[#17181A] transition-transform ease-[cubic-bezier(.7,0,.2,1)] duration-[1100ms]',
          gerbangMembuka
            ? 'translate-x-[calc(-100%_-_11rem)]'
            : 'translate-x-0',
        ]"
      >
        <!-- Lingkaran tengah.
             Titik tengahnya pas di garis belah (right-0 + translate-x-1/2),
             jadi terlihat di tengah layar — tapi badannya milik belahan KIRI,
             bukan elemen berdiri sendiri. Itu sebabnya dia tetap utuh (tidak
             ikut terbelah) dan bergeser penuh mengikuti belahan kiri.

             Dua tugasnya:
             1. Jadi ALAS bagi animasi webm yang latarnya transparan — tanpa
                ini, begitu kedua belahan menjauh animasinya terlihat melayang
                di atas konten.
             2. Membingkai animasinya supaya rapi, lewat garis tepi tipis
                (ring) dan bayangan lembut. Tidak ada hiasan lain: belahan
                gerbangnya sengaja dibiarkan polos, tanpa garis apa pun. -->
        <div
          class="absolute top-1/2 right-0 flex items-center justify-center w-[170px] h-[170px] md:w-[240px] md:h-[240px] lg:w-[280px] lg:h-[280px] rounded-full bg-[#F9F9F9] dark:bg-[#17181A] ring-1 ring-black/10 dark:ring-white/15 shadow-2xl translate-x-1/2 -translate-y-1/2"
        >
          <!-- Animasi loading. WebM ini punya kanal alpha (transparan), jadi
               satu berkas cocok untuk mode terang maupun gelap.

               Lebarnya 78% dari garis tengah lingkaran. Logonya melebar
               (848 x 318 piksel), jadi batas amannya bukan lebar lingkaran
               melainkan sudut-sudutnya: pada 78% sudut logo berhenti di 83%
               jari-jari, masih menyisakan jarak ke tepi. Di atas ~93% sudutnya
               mulai menabrak garis lingkaran. -->
          <video
            autoplay
            loop
            muted
            playsinline
            aria-hidden="true"
            @contextmenu.prevent
            @loadeddata="tandaiAnimasiSiap"
            @canplay="tandaiAnimasiSiap"
            :class="[
              'w-[132px] md:w-[186px] lg:w-[218px] h-auto object-contain transition-opacity duration-500 ease-out',
              animasiLoadingSiap ? 'opacity-100' : 'opacity-0',
            ]"
          >
            <source :src="loadingAnimation" type="video/webm" />
          </video>
        </div>
      </div>
    </div>
    <!-- ✅ Main App Content
         Sengaja TIDAK memakai v-else, supaya konten dibuat sejak awal dan bisa
         memuat datanya di balik layar loading (yang menutupinya penuh karena
         posisinya fixed inset-0). Dulu konten baru dibuat setelah layar loading
         menutup, sehingga footer sempat melompat sebelum isinya datang.

         CATATAN: jangan bungkus bagian ini dengan <template> polos tanpa
         direktif. Vue hanya memperlakukan <template> sebagai pembungkus tak
         terlihat kalau ada v-if / v-else / v-for padanya. Tanpa itu, Vue
         membuat elemen <template> HTML sungguhan — dan isi elemen <template>
         tidak pernah ditampilkan browser, jadi seluruh halaman jadi kosong. -->
    <template v-if="!isProductRoute">
      <div
        :class="[
          'relative w-full h-auto font-poppins dark:bg-[#17181A] dark:text-white',
          isTermsRoute || isSecurityRoute || isPrivacyRoute
            ? 'bg-[#FFFFFF]'
            : 'bg-[#f9fafb]',
          isBookDemoRoute
            ? 'min-h-[100dvh] w-full dark:lg:bg-[radial-gradient(circle_at_0%_30%,_#3CFF7A_-70%,_#17181A_30%)]'
            : '',
          isCompanyRoute
            ? 'min-h-[100dvh] w-full dark:bg-[radial-gradient(circle_at_120%_0%,_#3CFF7A_-50%,_#17181A_10%)] dark:md:bg-[radial-gradient(circle_at_120%_0%,_#3CFF7A_-50%,_#17181A_15%)] dark:lg:bg-[radial-gradient(circle_at_120%_0%,_#3CFF7A_-40%,_#17181A_30%)]'
            : '',
          !isBlogDetail ? 'overflow-x-hidden' : '',
        ]"
      >
        <!-- Kelas animasi sengaja baru dipasang saat isLoad bernilai true.
             Animasi CSS berjalan sekali, tepat ketika kelasnya menempel.
             Kalau ditulis langsung, animasinya habis di balik layar loading dan
             konten muncul begitu saja tanpa transisi.

             Dipakai "faster" (0,5 detik), bukan "slower" (3 detik), supaya
             konten sudah pekat sebelum gerbang terbuka separuh. Kalau memudarnya
             lebih lama dari gerbangnya, konten terlihat pucat menerawang saat
             gerbang sudah menyingkir. -->
        <main
          :class="[
            'relative w-full max-w-[1440px] mx-auto z-10',
            isLoad ? 'animate__animated animate__fadeIn animate__faster' : '',
          ]"
        >
          <!-- Navbar -->
          <div
            class="flex fixed top-0 w-full h-auto z-50 transition-all duration-300 ease-in-out"
          >
            <Navbar />
          </div>

          <!-- Tombol kembali ke atas (dengan cincin kemajuan gulir) -->
          <ScrollTopButton />

          <!-- Sidebar -->
          <Sidebar />

          <!-- Page content -->
          <router-view />

          <!-- Touch Section -->
          <section
            class="flex flex-col relative w-full mx-auto h-auto mt-32 px-8 xls:px-8 2xls:px-0"
            v-if="route.path !== '/blogs' && !route.path.startsWith('/blog/')"
          >
            <Touch />
          </section>
        </main>

        <!-- Footer -->
        <footer
          :class="[
            'w-full max-w-[1440px] h-auto px-8 mt-20 mx-auto z-10 dark:bg-[#17181A]/70',
            isLoad ? 'animate__animated animate__fadeIn animate__faster' : '',
          ]"
        >
          <Footer />
        </footer>
      </div>
    </template>

    <!-- Khusus layout product.
         Kelas di sini diteruskan ke elemen terluar ProductLayout.vue, jadi
         halaman product ikut mendapat animasi masuk yang sama saat layar
         loading menutup. -->
    <template v-else>
      <router-view
        :class="[
          'bg-[#FAFAFA]',
          isLoad ? 'animate__animated animate__fadeIn animate__faster' : '',
        ]"
      />
    </template>
  </template>
</template>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition:
    opacity 0.4s ease,
    transform 0.4s ease;
}
.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
.fade-slide-enter-to,
.fade-slide-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.bouncing-loader {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
}
.bouncing-loader > div {
  animation: bounce 0.6s infinite alternate;
}
@keyframes bounce {
  to {
    transform: translateY(-16px);
    opacity: 0.5;
  }
}
</style>
