// main.js
import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "./router";
import i18n from "./i18n";
import "./style.css";
// import AOS from "aos";
// import "aos/dist/aos.css";
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

app.mount("#app");
// Aos.init();
