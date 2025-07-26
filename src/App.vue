<script setup>
import { useRoute } from "vue-router";
import { onMounted, onUnmounted, ref, computed } from "vue";
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
const showTooltip = computed(() => scrollStore.isScrolled);

const handleScroll = () => {
  scrollStore.updateScroll();
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
  // scrollStore.isScrolled = false; // Paksa hilangkan tooltip
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
      <div class="flex fixed w-full h-auto z-50">
        <component :is="scrollStore.isScrolled ? NavbarScroll : Navbar" />
      </div>

      <transition name="fade-slide">
        <div
          v-if="showTooltip"
          @click="scrollToTop"
          class="flex fixed justify-center cursor-pointer items-center bottom-10 right-20 w-14 h-14 z-50 bg-green-400 border-1 border-black rounded-full shadow-sm"
        >
          Tooltip
        </div>
      </transition>

      <!-- Sidebar (hanya 1 instance) -->
      <Sidebar />
      <router-view />

      <section
        class="flex flex-col relative w-full mx-auto h-auto mt-32 px-8"
        v-if="!['/blogs'].includes(route.path)"
      >
        <Touch />
      </section>
    </main>

    <footer class="w-full max-w-[1440px] h-auto px-8 mt-20 mx-auto">
      <Footer />
    </footer>
  </div>
</template>
<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
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
</style>
