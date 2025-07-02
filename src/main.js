import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "./router";
import "./style.css";
import AOS from "aos";
import "aos/dist/aos.css";

import App from "./App.vue";

createApp(App).use(createPinia()).use(router).mount("#app");
AOS.init();
