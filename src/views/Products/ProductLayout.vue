<!-- views/product/ProductLayout.vue -->
<script setup>
import Navbar from "@productComponents/Navbar.vue";
import NavbarScroll from "@productComponents/NavbarScroll.vue";
import Footer from "@productComponents/Footer.vue";
import Sidebar from "@productComponents/Sidebar.vue";
import { useScrollStore } from "@/stores/scroll";
const scrollStore = useScrollStore();
</script>

<template>
  <div class="relative w-full mx-auto font-poppins">
    <main class="relative w-full mx-auto">
      <header class="fixed flex top-3 w-full h-auto z-50">
        <component :is="scrollStore.isScrolled ? NavbarScroll : Navbar" />
      </header>

      <Sidebar />
      <router-view />
    </main>
    <footer class="w-full max-w-[1440px] h-auto px-8 mx-auto mt-20">
      <Footer />
    </footer>
  </div>
</template>
