<script setup>
import Navbar from "@productComponents/Navbar.vue";
import Navbar3 from "@productComponents/Navbar3.vue";
import NavbarScroll from "@productComponents/NavbarScroll.vue";
import Footer from "@productComponents/Footer.vue";
import Sidebar from "@productComponents/Sidebar.vue";
// Dipakai bersama App.vue — letaknya di @/components, bukan
// @productComponents, karena tampilannya sama di semua halaman.
import ScrollTopButton from "@/components/reusable/ScrollTopButton.vue";

import { onMounted, onUnmounted, computed, nextTick, watch } from "vue";
import { useScrollStore } from "@/stores/scroll";
import { useRoute } from "vue-router";

const scrollStore = useScrollStore();
const route = useRoute();

// Tooltip scroll ke atas
// Diredam dengan requestAnimationFrame supaya pembaruannya paling banyak
// sekali per gambar layar. Ini penting sejak situs memakai smooth scroll:
// halaman digeser tiap frame, jadi kejadian gulir datang jauh lebih sering
// daripada saat memakai gulir biasa.
let idFrame = null;
const handleScroll = () => {
  if (idFrame) return;
  idFrame = requestAnimationFrame(() => {
    scrollStore.updateScroll();
    idFrame = null;
  });
};

const isSelerisCredit = computed(
  () => route.path === "/product/seleris-credit",
);

// Fungsi scroll ke hash (dengan retry)
const scrollToHash = async (hash) => {
  if (!hash) return;
  let attempt = 0;
  const maxAttempt = 20;

  const tryScroll = () => {
    const el = document.querySelector(hash);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else if (attempt < maxAttempt) {
      attempt++;
      setTimeout(tryScroll, 200);
    }
  };

  await nextTick();
  setTimeout(tryScroll, 400);
};

// Saat halaman dimount
onMounted(() => {
  window.addEventListener("scroll", handleScroll, { passive: true });
  document.body.style.overflow = "";

  // 🔥 Cek hash saat pertama kali masuk ke halaman produk
  if (route.hash) scrollToHash(route.hash);
});

// Pantau perubahan route agar hash juga bekerja setelah navigasi
watch(
  () => route.fullPath,
  (newPath) => {
    const hashIndex = newPath.indexOf("#");
    if (hashIndex !== -1) {
      const hash = newPath.substring(hashIndex);
      scrollToHash(hash);
    }
  },
);

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
  if (idFrame) cancelAnimationFrame(idFrame);
});
</script>

<template>
  <!-- Animasi masuk halaman diatur dari App.vue lewat <router-view>, supaya
       jalannya tepat saat layar loading menutup. -->
  <div class="relative w-full mx-auto font-poppins">
    <main class="relative w-full mx-auto">
      <header v-if="!isSelerisCredit" class="fixed top-0 w-full z-50">
        <transition name="slide-down" mode="out-in">
          <component :is="scrollStore.isScrolled ? NavbarScroll : Navbar" />
        </transition>
      </header>
      <header v-else class="fixed top-0 w-full z-50">
        <transition name="slide-down" mode="out-in">
          <component :is="scrollStore.isScrolled ? NavbarScroll : Navbar3" />
        </transition>
      </header>

      <!-- Tombol kembali ke atas (dengan cincin kemajuan gulir) -->
      <ScrollTopButton />

      <Sidebar />
      <!-- router-view produk -->
      <router-view />
    </main>

    <footer class="w-full max-w-[1440px] h-auto px-8 mx-auto mt-20 lg:mt-40">
      <Footer />
    </footer>
  </div>
</template>

<style scoped>
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
}
.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
.slide-down-enter-to,
.slide-down-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition:
    opacity 0.4s ease,
    transform 0.4s ease;
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

.bouncing-loader {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
}
.bouncing-loader > div {
  animation: bounce 0.6s infinite alternate;
}
@keyframes bounce {
  to {
    transform: translateY(-16px);
    opacity: 0.5;
  }
}
</style>
