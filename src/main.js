// main.js
import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "./router";
import i18n from "./i18n";
import "./style.css";
import AOS from "aos";
import "aos/dist/aos.css";
import VueApexCharts from "vue3-apexcharts";

import App from "./App.vue";
import { useSidebarStore } from "@/stores/sidebar"; // ✅ import store

const app = createApp(App);

const pinia = createPinia();
app.use(pinia);
app.use(router);
app.use(i18n);
app.component("apexchart", VueApexCharts);

// ✅ Set title per halaman
router.beforeEach((to, from, next) => {
  // meta.title boleh string atau function(route) untuk halaman dinamis
  const title =
    typeof to.meta.title === "function" ? to.meta.title(to) : to.meta.title;
  document.title = "Seleris | " + (title || "Seleris");
  next();
});

// ✅ Inisialisasi router guard dari sidebar store
useSidebarStore().initRouterGuard(router); // << PENTING

AOS.init({
  duration: 700, // lama animasi (milidetik)
  easing: "ease-out-cubic",
  once: true, // animasi jalan sekali saja, tidak berulang saat scroll balik
  offset: 60, // mulai animasi 60px sebelum elemen masuk layar

  // AOS sengaja TIDAK mulai sendiri. Konten sekarang dimuat di balik layar
  // loading, jadi kalau AOS langsung jalan, animasinya habis sebelum sempat
  // dilihat pengunjung — begitu layar loading menutup, isinya sudah tampil
  // begitu saja tanpa animasi.
  //
  // Aba-abanya diberikan App.vue tepat setelah layar loading menutup.
  startEvent: "seleris:content-ready",

  // Pengawas perubahan DOM dimatikan supaya AOS tidak diam-diam menganimasikan
  // elemen baru di balik layar loading. Yang menentukan kapan animasi jalan
  // cukup satu tempat saja: App.vue.
  disableMutationObserver: true,
});

// Pengaman: kalau karena suatu hal aba-aba dari App.vue tidak pernah sampai,
// elemen ber-data-aos akan tetap tak terlihat (AOS menyetelnya opacity 0).
// Setelah 12 detik animasinya dijalankan paksa, supaya kontennya tidak pernah
// hilang permanen hanya gara-gara animasi.
setTimeout(() => {
  document.dispatchEvent(new Event("seleris:content-ready"));
}, 12000);

app.mount("#app");
