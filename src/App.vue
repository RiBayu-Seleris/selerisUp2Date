<script setup>
import loadingAnimation from "@/assets/images/loading.webm";

import loadingAnimationSafari from "@/assets/images/loading.mov";
import { useRoute, useRouter } from "vue-router";
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
const router = useRouter();
const scrollStore = useScrollStore();

const isTooltipOpen = ref(false);
const sidebarStore = useSidebarStore();

// Loading control
const isLoad = ref(false);

const KUNCI_VIDEO_PERNAH_DIMUAT = "seleris:loading-video-pernah-dimuat";

const pernahDimuat = (() => {
  try {
    return localStorage.getItem(KUNCI_VIDEO_PERNAH_DIMUAT) === "1";
  } catch {
    return false; // localStorage diblokir (mode penyamaran)
  }
})();

// Kunjungan berulang: langsung true, jadi gambar PERTAMA sudah tampil penuh.
const animasiLoadingSiap = ref(pernahDimuat);

const tandaiAnimasiSiap = () => {
  animasiLoadingSiap.value = true;
  try {
    localStorage.setItem(KUNCI_VIDEO_PERNAH_DIMUAT, "1");
  } catch {}
};

// Pengaman: kalau kejadian "siap diputar" tidak pernah terkirim (mis. browser
// menolak memutar otomatis), videonya tetap ditampilkan setelah 0,6 detik.
setTimeout(tandaiAnimasiSiap, 600);

// Membuka dibuat lebih lambat daripada menutup: menutup terasa seperti
// keputusan (cepat, tegas), membuka terasa seperti persembahan (perlahan).
// Angka-angka ini HARUS sama dengan duration-[...] di template.

const garisTumbuh = ref(false);

const sisiSirkuit = ref(0);
const jariLingkaran = ref(85);

const hitungSirkuit = () => {
  sisiSirkuit.value = Math.max(window.innerWidth, window.innerHeight);
  const lebar = window.innerWidth;
  // Harus sama dengan setengah ukuran piringan logo: 170 / 240 / 280 px
  jariLingkaran.value = lebar >= 1024 ? 140 : lebar >= 768 ? 120 : 85;
};

const lintasanSirkuit = computed(() => {
  const sisi = sisiSirkuit.value;
  const t = sisi / 2;
  const r = jariLingkaran.value;
  return [
    `M ${t} 0 L ${t} ${t - r}`,
    `M ${t} ${t + r} L ${t} ${sisi}`,
    `M ${t} ${t - r} A ${r} ${r} 0 1 1 ${t} ${t + r} A ${r} ${r} 0 1 1 ${t} ${t - r}`,
  ].join(" ");
});

const jalurCahaya = computed(() => {
  const sisi = sisiSirkuit.value;
  const t = sisi / 2;
  const r = jariLingkaran.value;
  const masuk = `M ${t} 0 L ${t} ${t - r}`;
  const keluar = `L ${t} ${sisi}`;
  return [
    `${masuk} A ${r} ${r} 0 0 1 ${t} ${t + r} ${keluar}`,
    `${masuk} A ${r} ${r} 0 0 0 ${t} ${t + r} ${keluar}`,
  ];
});

const cahayaJalan = ref(false);

const mulaiCahaya = () => {
  cahayaJalan.value = false;
  // Dua langkah: lepas kelasnya dulu sampai benar-benar tergambar, baru
  // pasang lagi. Kalau langsung diubah false lalu true dalam satu tarikan,
  // browser tidak pernah melihat keadaan "tanpa kelas" dan animasinya
  // meneruskan yang lama, bukan mengulang.
  nextTick(() => {
    requestAnimationFrame(() => {
      cahayaJalan.value = true;
    });
  });
};

const JEDA_DAUN_MS = 70;
const DURASI_BUKA_MS = 1100 + JEDA_DAUN_MS;
const DURASI_TUTUP_MS = 700 + JEDA_DAUN_MS;
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

// Waktu minimum layar loading tampil.
// Saat pindah halaman angkanya jauh lebih pendek, karena gerbangnya sudah
// terlihat lebih dulu selama 0,7 detik saat menutup. Kalau tetap 2 detik,
// satu perpindahan halaman jadi 2,8 detik hanya untuk menunggu.
const MIN_LOADING_MS = 2000; // muat pertama / refresh
// Pindah halaman. Angkanya harus cukup supaya keadaan TERKUNCI sempat
// terbaca: palang selesai melintang pada 400 + 300 = 700 ms, jadi 1200 ms
// menyisakan setengah detik dalam keadaan terkunci sebelum dibuka lagi.
const MIN_LOADING_PINDAH_MS = 1200;

// Menandai bahwa gerbang baru saja ditutup oleh perpindahan halaman, supaya
// mulaiLayarLoading() tahu harus memakai waktu minimum yang mana.
let baruDitutupUntukPindah = false;
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

  // Dipanggil di sini karena pada titik ini gerbangnya SUDAH tertutup — baik
  // saat refresh (terpasang langsung tertutup) maupun saat pindah halaman
  // (fungsi ini berjalan setelah animasi menutup selesai).
  mulaiCahaya();

  const waktuMinimum = baruDitutupUntukPindah
    ? MIN_LOADING_PINDAH_MS
    : MIN_LOADING_MS;
  baruDitutupUntukPindah = false;

  penghitungMinimum = setTimeout(() => {
    waktuMinimumLewat.value = true;
    cobaTutupLayarLoading();
  }, waktuMinimum);

  // Kalau ada pengambilan data yang menggantung (server tidak menjawab),
  // layar loading tetap menutup daripada pengunjung terjebak selamanya.
  penghitungMaksimum = setTimeout(() => {
    isLoad.value = true;
  }, MAX_LOADING_MS);
};

const tutupGerbang = () =>
  new Promise((selesai) => {
    clearTimeout(penghitungGerbang);

    // Sudah terpasang dan tertutup: tidak ada yang perlu dianimasikan.
    if (gerbangTampil.value && !gerbangMembuka.value) {
      selesai();
      return;
    }

    // Kunci gulir selama peralihan, supaya halaman lama tidak ikut tergeser.
    document.body.style.overflow = "hidden";
    hentikanSmoothScroll();

    cahayaJalan.value = false; // cahaya diam selama gerbang menutup

    gerbangTampil.value = true;
    gerbangMembuka.value = true; // posisi awal: terbuka (di luar layar)

    nextTick(() => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          gerbangMembuka.value = false; // -> menutup
          setTimeout(selesai, DURASI_TUTUP_MS);
        });
      });
    });
  });

const lepasPenjagaRute = router.beforeEach(async (to, from) => {
  if (!from.name) return true;
  if (to.path === from.path) return true;
  if (
    standaloneRoutes.includes(to.path) ||
    standaloneRoutes.includes(from.path)
  ) {
    return true;
  }

  await tutupGerbang();
  baruDitutupUntukPindah = true;
  return true;
});

let sedangMuatUlang = false;

const tanganiTombolRefresh = (e) => {
  if (sedangMuatUlang) return; // sudah berjalan, jangan dipicu dua kali
  if (isStandaloneRoute.value) return; // halaman standalone tanpa gerbang

  const F5 =
    e.key === "F5" && !e.ctrlKey && !e.metaKey && !e.shiftKey && !e.altKey;
  const ctrlR =
    (e.ctrlKey || e.metaKey) &&
    !e.shiftKey &&
    !e.altKey &&
    (e.key === "r" || e.key === "R");

  // Ctrl+Shift+R / Ctrl+F5 = muat ulang paksa (abaikan cache). Sengaja
  // dibiarkan apa adanya, karena itu dipakai justru saat menelusuri masalah —
  // menggantinya dengan muat ulang biasa malah menghalangi.
  if (!F5 && !ctrlR) return;

  e.preventDefault();
  sedangMuatUlang = true;

  tutupGerbang().then(() => {
    window.location.reload();
  });
};

// Dijalankan langsung saat komponen disiapkan — sebelum halaman di dalamnya
// sempat mengambil data — supaya hitungannya tidak saling menimpa.
if (isStandaloneRoute.value) {
  isLoad.value = true;
} else {
  mulaiLayarLoading();
}

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
    cahayaJalan.value = false; // cahaya berhenti saat gerbang membuka
    gerbangMembuka.value = true;
    penghitungGerbang = setTimeout(() => {
      gerbangTampil.value = false;
    }, DURASI_BUKA_MS);

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

  window.addEventListener("keydown", tanganiTombolRefresh);

  hitungSirkuit();
  window.addEventListener("resize", hitungSirkuit, { passive: true });

  // Satu gambar layar setelah terpasang, supaya tinggi nol-nya sempat
  // tergambar dulu dan pertumbuhannya benar-benar terlihat.
  requestAnimationFrame(() => {
    garisTumbuh.value = true;
  });
});

onUnmounted(() => {
  lepasPenjagaRute();
  window.removeEventListener("keydown", tanganiTombolRefresh);
  window.removeEventListener("resize", hitungSirkuit);
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
  <template v-if="isStandaloneRoute">
    <div class="w-full h-auto !bg-[#F4F4F4]">
      <router-view />
    </div>
  </template>

  <template v-else>
    <div
      v-if="gerbangTampil"
      :class="[
        'fixed inset-0 z-[9999] overflow-hidden',
        gerbangMembuka ? 'pointer-events-none' : '',
      ]"
    >
      <div
        :class="[
          'absolute bottom-0 left-0 w-full h-1/2 lg:bottom-auto lg:left-auto lg:top-0 lg:right-0 lg:w-1/2 lg:h-full bg-[#F9F9F9] dark:bg-[#17181A] transition-transform',
          gerbangMembuka ? 'duration-[1100ms]' : 'duration-[700ms]',
          gerbangMembuka
            ? 'ease-[cubic-bezier(.16,1,.3,1)]'
            : 'ease-[cubic-bezier(.6,0,.15,1)]',
          'delay-[70ms]',
          gerbangMembuka
            ? 'translate-y-full lg:translate-y-0 lg:translate-x-full'
            : 'translate-x-0 translate-y-0',
        ]"
      ></div>

      <div
        :class="[
          'absolute top-0 left-0 w-full h-1/2 lg:w-1/2 lg:h-full z-20 bg-[#F9F9F9] dark:bg-[#17181A] transition-transform',
          gerbangMembuka ? 'duration-[1100ms]' : 'duration-[700ms]',
          gerbangMembuka
            ? 'ease-[cubic-bezier(.16,1,.3,1)]'
            : 'ease-[cubic-bezier(.6,0,.15,1)]',
          gerbangMembuka
            ? 'translate-y-[calc(-100%_-_11rem)] lg:translate-y-0 lg:translate-x-[calc(-100%_-_11rem)]'
            : 'translate-x-0 translate-y-0',
        ]"
      >
        <div
          :class="[
            'absolute left-1/2 bottom-0 lg:left-auto lg:bottom-auto lg:top-1/2 lg:right-0 flex items-center justify-center w-[170px] h-[170px] md:w-[240px] md:h-[240px] lg:w-[280px] lg:h-[280px] rounded-full bg-[#F9F9F9] dark:bg-[#17181A] shadow-2xl -translate-x-1/2 translate-y-1/2 lg:translate-x-1/2 lg:-translate-y-1/2 transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)]',
            garisTumbuh && !gerbangMembuka ? 'scale-100' : 'scale-95',
          ]"
        >
          <video
            autoplay
            loop
            muted
            playsinline
            preload="auto"
            aria-hidden="true"
            @contextmenu.prevent
            @loadeddata="tandaiAnimasiSiap"
            @canplay="tandaiAnimasiSiap"
            :class="[
              'w-[132px] md:w-[186px] lg:w-[218px] h-auto object-contain transition-opacity duration-200 ease-out',
              animasiLoadingSiap ? 'opacity-100' : 'opacity-0',
            ]"
          >
            <source :src="loadingAnimationSafari" type="video/quicktime" />
            <source :src="loadingAnimation" type="video/webm" />
          </video>
        </div>

        <svg
          aria-hidden="true"
          :width="sisiSirkuit"
          :height="sisiSirkuit"
          :class="[
            'absolute left-1/2 bottom-0 lg:left-auto lg:bottom-auto lg:top-1/2 lg:right-0 pointer-events-none -translate-x-1/2 translate-y-1/2 lg:translate-x-1/2 lg:-translate-y-1/2 origin-center',
            // Arahnya TETAP, tidak pernah berputar. Di bawah lg sumbu
            // gerbangnya mendatar, jadi sirkuitnya diputar 90 derajat sebagai
            // posisi dasar; di lg ke atas kembali tegak.
            'rotate-90 lg:rotate-0',
          ]"
        >
          <path
            :d="lintasanSirkuit"
            fill="none"
            stroke="currentColor"
            stroke-width="1"
            class="text-black/10 dark:text-white/15"
          />

          <g opacity="0.85">
            <path
              v-for="(jalur, i) in jalurCahaya"
              :key="i"
              :d="jalur"
              pathLength="100"
              fill="none"
              stroke="#1AB24F"
              stroke-width="2"
              stroke-linecap="round"
              :class="[
                'sirkuit-cahaya',
                cahayaJalan ? 'sirkuit-cahaya-jalan' : '',
              ]"
            />
          </g>
        </svg>
      </div>
    </div>

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
          !isBlogDetail ? 'overflow-x-clip' : '',
        ]"
      >
        <main
          :class="[
            'relative w-full max-w-[1440px] mx-auto z-10',
            isLoad ? 'animate__animated animate__fadeIn animate__faster' : '',
          ]"
        >
          <div
            class="flex fixed top-0 w-full h-auto z-50 transition-all duration-300 ease-in-out"
          >
            <Navbar />
          </div>

          <ScrollTopButton />

          <Sidebar />

          <router-view />

          <section
            class="flex flex-col relative w-full mx-auto h-auto mt-32 px-8 xls:px-8 2xls:px-0"
            v-if="route.path !== '/blogs' && !route.path.startsWith('/blog/')"
          >
            <Touch />
          </section>
        </main>

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
