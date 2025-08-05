<!-- views/product/ProductLayout.vue -->
<script setup>
import Navbar from "@productComponents/Navbar.vue";
import NavbarScroll from "@productComponents/NavbarScroll.vue";
import Footer from "@productComponents/Footer.vue";
import Sidebar from "@productComponents/Sidebar.vue";

import { onMounted, onUnmounted, ref, computed, watch } from "vue";
import { useScrollStore } from "@/stores/scroll";

const scrollStore = useScrollStore();
// Tooltip (scroll to top)
const showTooltip = computed(() => scrollStore.isScrolled);
const handleScroll = () => {
  scrollStore.updateScroll();
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  document.body.style.overflow = "";

  AOS.init({
    duration: 800,
    once: true,
    disable: false,
  });
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
// Icon
import Tooltip from "@/assets/images/tooltip.png";
</script>

<template>
  <div
    class="relative w-full mx-auto font-poppins animate__animated animate__fadeIn animate__slower"
  >
    <main class="relative w-full mx-auto">
      <header class="fixed flex top-3 w-full h-auto z-50">
        <component :is="scrollStore.isScrolled ? NavbarScroll : Navbar" />
      </header>

      <!-- Scroll Tooltip -->
      <transition name="fade-slide">
        <div
          v-if="showTooltip"
          @click="scrollToTop"
          class="flex fixed justify-center cursor-pointer items-center bottom-5 right-5 lg:right-10 w-9 h-9 lg:w-16 lg:h-16 z-30 bg-white shadow-md border-[0.5px] text-white rounded-full p-1 md:p-2"
        >
          <img :src="Tooltip" alt="Tooltip" class="w-full h-full" />
        </div>
      </transition>

      <Sidebar />
      <router-view />
    </main>
    <footer class="w-full max-w-[1440px] h-auto px-8 mx-auto mt-20">
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
