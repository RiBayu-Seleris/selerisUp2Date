<script setup>
import { useRoute } from "vue-router";
import { onMounted, onUnmounted, ref, computed, watch } from "vue";
import { useScrollStore } from "@/stores/scroll";
import { useThemeStore } from "@/stores/theme";

import Navbar from "@/components/Navbar.vue";
// import NavbarScroll from "@/components/NavbarScroll.vue";
import Sidebar from "@/components/Sidebar.vue";
import Touch from "@/components/Touch.vue";
import Footer from "@/components/Footer.vue";

// Icon
import Tooltip from "@/assets/images/tooltip.png";

// Import Swiper CSS
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Store & route
const dotLazyLoading = 4;
const themeStore = useThemeStore();
const route = useRoute();
const scrollStore = useScrollStore();

// Loading control
const isLoad = ref(false);

// Tooltip (scroll to top)
const showTooltip = computed(() => scrollStore.isScrolled);

const handleScroll = () => {
  scrollStore.updateScroll();
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

// Dark mode exception
function updateDarkMode() {
  const html = document.documentElement;
  const isLightOnlyPage = route.path.startsWith("/product");
  if (isLightOnlyPage) html.classList.remove("dark");
}

onMounted(() => {
  themeStore.loadTheme();
  window.addEventListener("scroll", handleScroll);
  document.body.style.overflow = "";

  // Loading hanya jika user ada di halaman awal (misalnya "/")
  if (route.path === "/") {
    isLoad.value = false;
    setTimeout(() => {
      isLoad.value = true;
    }, 2000);
  }

  AOS.init({
    duration: 800,
    once: true,
    disable: false,
  });
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

watch(
  () => route.fullPath,
  (newPath, oldPath) => {
    updateDarkMode();

    // Jika route ke /blogs, trigger loading
    if (newPath !== oldPath) {
      isLoad.value = false;
      setTimeout(() => {
        isLoad.value = true;
      }, 2000);
    }
  }
);

// Helpers
const scrollProgress = computed(() => {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const docHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  return docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
});

// Conditional route
const isProductRoute = computed(() => route.path.startsWith("/product"));
const isTermsRoute = computed(() => route.path === "/terms");
const isSecurityRoute = computed(() => route.path === "/security");
const isPrivacyRoute = computed(() => route.path === "/privacy");
const isBookDemoRoute = computed(() => route.path === "/book-a-demo");
const isCompanyRoute = computed(() => route.path === "/about/company");
const isBlogDetail = computed(() => route.path === "/blog/details");
</script>

<template>
  <!-- ⏳ Initial Loading Screen -->
  <div
    v-if="!isLoad"
    class="fixed inset-0 flex flex-col items-center justify-center bg-[#F9F9F9] dark:bg-[#17181A] z-[9999]"
  >
    <!-- Loader Frame -->
    <video
      autoplay
      loop
      muted
      playsinline
      @contextmenu.prevent
      class="w-[250px] h-[250px] md:w-[300px] md:h-[300px] lg:w-[400px] lg:h-[400px] object-cover object-center dark:hidden"
    >
      <source src="@/assets/videos/loading.mp4" type="video/mp4" />
    </video>
    <!-- Loader Frame -->
    <video
      autoplay
      loop
      muted
      playsinline
      @contextmenu.prevent
      class="w-[250px] h-[250px] md:w-[300px] md:h-[300px] lg:w-[400px] lg:h-[400px] object-cover object-center hidden dark:flex"
    >
      <source src="@/assets/videos/dark-loading.mp4" type="video/mp4" />
    </video>
  </div>

  <!-- ✅ Main App Content -->
  <template v-else>
    <template v-if="!isProductRoute">
      <!-- overflow-x-hidden -->
      <div
        :class="[
          'relative w-full h-auto font-poppins dark:bg-[#17181A] dark:text-white',
          isTermsRoute || isSecurityRoute || isPrivacyRoute
            ? 'bg-[#FFFFFF]'
            : 'bg-[#f9fafb]',
          isBookDemoRoute
            ? 'min-h-[100dvh] w-full dark:lg:bg-[radial-gradient(circle_at_0%_30%,_#3CFF7A_-70%,_#17181A_30%)]'
            : '',
          isCompanyRoute
            ? 'min-h-[100dvh] w-full dark:bg-[radial-gradient(circle_at_120%_0%,_#3CFF7A_-50%,_#17181A_10%)] dark:md:bg-[radial-gradient(circle_at_120%_0%,_#3CFF7A_-50%,_#17181A_15%)] dark:lg:bg-[radial-gradient(circle_at_120%_0%,_#3CFF7A_-40%,_#17181A_30%)]'
            : '',
          !isBlogDetail ? 'overflow-x-hidden' : '',
        ]"
      >
        <main
          class="relative w-full max-w-[1440px] mx-auto animate__animated animate__fadeIn animate__slower z-10"
        >
          <!-- Navbar -->
          <div
            class="flex fixed top-0 w-full h-auto z-50 transition-all duration-300 ease-in-out"
            v-if="!['/test-embed'].includes(route.path)"
          >
            <Navbar v-if="!['/test-embed'].includes(route.path)" />
          </div>

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

          <!-- Sidebar -->
          <Sidebar />

          <!-- Page content -->
          <router-view />

          <!-- Touch Section (kecuali di /blogs) -->
          <section
            class="flex flex-col relative w-full mx-auto h-auto mt-32 px-8"
            v-if="
              ![
                '/blogs',
                '/blogs/:slug',
                '/blog/details',
                '/test-embed',
              ].includes(route.path)
            "
          >
            <Touch />
          </section>
        </main>

        <!-- Footer -->
        <footer
          class="w-full max-w-[1440px] h-auto px-8 mt-20 mx-auto z-10 dark:bg-[#17181A]/70 animate__animated animate__fadeIn animate__slower"
          v-if="!['/test-embed'].includes(route.path)"
        >
          <Footer />
        </footer>
      </div>
    </template>

    <!-- Khusus layout product -->
    <template v-else>
      <router-view />
    </template>
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
