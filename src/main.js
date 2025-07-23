import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "./router";
import "./style.css";
import AOS from "aos";
import "aos/dist/aos.css";

import App from "./App.vue";

router.beforeEach((to, from, next) => {
  document.title = "Seleris | " + to.meta.title || "Seleris";
  next();
});

createApp(App).use(createPinia()).use(router).mount("#app");
AOS.init();
