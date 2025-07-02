<script setup>
import { useRoute } from "vue-router";

import Navbar from "@/components/Navbar.vue";
import NavbarScroll from "@/components/NavbarScroll.vue";
import Footer from "@/components/Footer.vue";
import Sidebar from "@/components/Sidebar.vue";

import { useScrollStore } from "@/stores/scroll";
import { onMounted, onUnmounted } from "vue";

// Import Swiper CSS
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const route = useRoute();
const scrollStore = useScrollStore();

const handleScroll = () => {
  scrollStore.updateScroll();
};

onMounted(() => {
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
  <div class="relative w-full h-auto font-poppins overflow-x-hidden">
    <!-- Navbar -->
    <div class="flex fixed w-full h-auto px-7 pb-5 z-10">
      <component :is="scrollStore.isScrolled ? NavbarScroll : Navbar" />
    </div>

    <!-- Sidebar (hanya 1 instance) -->
    <Sidebar />

    <main class="relative lg:pt-5 sml:pt-0 md:pt-0">
      <div class="relative">
        <router-view />
      </div>
    </main>
    <!-- bg-white rounded-t-[2rem] pt-5 shadow-[0px_-4px_20px_rgba(0,0,0,0.1)] -->
    <footer class="w-full h-auto px-8 mt-20">
      <Footer />
    </footer>
  </div>
</template>
