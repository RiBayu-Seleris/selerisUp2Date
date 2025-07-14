<script setup>
import { useRoute } from "vue-router";
import { onMounted, onUnmounted } from "vue";
import { useScrollStore } from "@/stores/scroll";
import { useThemeStore } from "@/stores/theme";

import Navbar from "@/components/Navbar.vue";
import NavbarScroll from "@/components/NavbarScroll.vue";
import Sidebar from "@/components/Sidebar.vue";
import Touch from "@/components/Touch.vue";
import Footer from "@/components/Footer.vue";

// Import Swiper CSS
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const themeStore = useThemeStore();
const route = useRoute();
const scrollStore = useScrollStore();

const handleScroll = () => {
  scrollStore.updateScroll();
};

onMounted(() => {
  themeStore.loadTheme(); // <== Penting untuk dark mode
  window.addEventListener("scroll", handleScroll);
  document.body.style.overflow = ""; // pastikan tidak terkunci

  AOS.init({
    duration: 800,
    once: true,
    disable: false, // <- Ini memaksa AOS aktif di semua device
  });
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
  <div
    class="relative w-full h-auto font-poppins overflow-x-hidden mx-auto bg-[#f9fafb] dark:bg-[#17181A] dark:text-white"
  >
    <!-- Navbar -->
    <!-- pt-5 lg:pt-6 xl:pt-5 -->

    <main class="relative w-full max-w-[1440px] mx-auto">
      <div class="flex fixed w-full h-auto z-10">
        <component :is="scrollStore.isScrolled ? NavbarScroll : Navbar" />
      </div>

      <!-- Sidebar (hanya 1 instance) -->
      <Sidebar />
      <router-view />

      <section class="flex flex-col relative w-full mx-auto h-auto mt-16 px-8">
        <Touch />
      </section>
    </main>

    <footer class="w-full max-w-[1440px] h-auto px-8 mt-20 mx-auto">
      <Footer />
    </footer>
  </div>
</template>
