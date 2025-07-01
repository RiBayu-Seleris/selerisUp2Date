import { createApp } from "vue";
import { createPinia } from "pinia";
import "./style.css";
import "./assets/main.css";
import "swiper/css"; // optional karena sudah di `App.vue`

import App from "./App.vue";

createApp(App).use(createPinia()).mount("#app");
