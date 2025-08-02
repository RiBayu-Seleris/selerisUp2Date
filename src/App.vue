<script setup>
import { useRoute } from "vue-router";
import { onMounted, onUnmounted, ref, computed, watch } from "vue";
import { useScrollStore } from "@/stores/scroll";
import { useThemeStore } from "@/stores/theme";

import Navbar from "@/components/Navbar.vue";
import NavbarScroll from "@/components/NavbarScroll.vue";
import Sidebar from "@/components/Sidebar.vue";
import Touch from "@/components/Touch.vue";
import Footer from "@/components/Footer.vue";
// Icon
import Tooltip from "@/assets/images/tooltip.png";

// Import Swiper CSS
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const themeStore = useThemeStore();
const route = useRoute();
const scrollStore = useScrollStore();
const showTooltip = computed(() => scrollStore.isScrolled);
const isLoad = ref(false);
const isLoaded = ref(false);

const handleScroll = () => {
  scrollStore.updateScroll();
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
  // scrollStore.isScrolled = false; // Paksa hilangkan tooltip
};

function updateDarkMode() {
  const html = document.documentElement;
  const isLightOnlyPage = route.path.startsWith("/product");

  if (isLightOnlyPage) {
    html.classList.remove("dark");
  }
}

onMounted((updateDarkMode) => {
  themeStore.loadTheme(); // <== Penting untuk dark mode
  window.addEventListener("scroll", handleScroll);
  document.body.style.overflow = ""; // pastikan tidak terkunci

  setTimeout(() => {
    isLoad.value = true;
  }, 3000); // 3 detik loading palsu
  AOS.init({
    duration: 800,
    once: true,
    disable: false, // <- Ini memaksa AOS aktif di semua device
  });
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

watch(() => route.path, updateDarkMode);

const scrollProgress = computed(() => {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const docHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  return docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
});

const isProductRoute = computed(() => route.path.startsWith("/product"));
const isTermsRoute = computed(() => route.path === "/terms");
const isSecurityRoute = computed(() => route.path === "/security");
const isPrivacyRoute = computed(() => route.path === "/privacy");
const isBookDemoRoute = computed(() => route.path === "/book-a-demo");
</script>

<template>
  <template v-if="!isProductRoute">
    <div
      :class="[
        `relative w-full h-auto font-poppins overflow-x-hidden mx-auto  dark:bg-[#17181A] dark:text-white`,
        isTermsRoute || isSecurityRoute || isPrivacyRoute
          ? 'bg-[#FFFFFF]'
          : 'bg-[#f9fafb]',
        isBookDemoRoute
          ? 'min-h-screen w-full dark:bg-[radial-gradient(circle_at_0%_30%,_#3CFF7A_-70%,_#17181A_30%)]'
          : '',
      ]"
    >
      <main class="relative w-full max-w-[1440px] mx-auto">
        <div class="flex fixed w-full h-auto top-0 z-50">
          <component :is="scrollStore.isScrolled ? NavbarScroll : Navbar" />
        </div>
        <transition name="fade-slide">
          <div
            v-if="showTooltip"
            @click="scrollToTop"
            class="flex fixed justify-center cursor-pointer items-center bottom-5 right-5 lg:right-10 w-9 h-9 lg:w-16 lg:h-16 z-30 bg-white shadow-md border-[0.5px] text-white rounded-full p-1 md:p-2"
          >
            <img :src="Tooltip" alt="Tooltip" class="w-full h-full" />
          </div>
        </transition>

        <!-- Sidebar (hanya 1 instance) -->
        <Sidebar />

        <!-- Tampilan berdasarkan route -->
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
  <template v-else>
    <!-- Layout khusus product -->
    <router-view />
  </template>
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
.cls-1 {
  fill: none;
  stroke: currentColor;
  stroke-linecap: round;
  stroke-linejoin: bevel;
  stroke-width: 1.5px;
}
</style>
