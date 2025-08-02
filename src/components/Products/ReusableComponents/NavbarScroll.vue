<script setup>
import MenuNav from "@productComponents/MenuNav.vue";
import MenuIcon from "@/components/icons/MenuIcon.vue";
import { ref, onMounted, onUnmounted, computed } from "vue";
import { useScrollStore } from "@/stores/scroll";
import { useSidebarStore } from "@/stores/sidebar";
import { useRoute } from "vue-router"; // ✅ Tambahkan ini

const scrollStore = useScrollStore();
const sidebarStore = useSidebarStore();

const route = useRoute(); // ✅ Ambil route saat ini

const Logo = computed(() => {
  if (route.path.startsWith("/product/credit-cover")) {
    return new URL(
      "@/assets/Products/images/Logo/CC-logo-color.png",
      import.meta.url
    ).href;
  }
  if (route.path.startsWith("/product/medins")) {
    return new URL(
      "@/assets/Products/images/Logo/medins-logo-color.png",
      import.meta.url
    ).href;
  }
});

const LogoLink = computed(() => {
  if (route.path.startsWith("/product/credit-cover")) {
    return "/product/credit-cover";
  }
  if (route.path.startsWith("/product/medins")) {
    return "/product/medins";
  }
});

const handleScroll = () => {
  scrollStore.updateScroll();
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});
onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
  <div class="relative w-full z-40">
    <nav class="fixed top-0 left-0 w-full transition-all duration-300 z-40">
      <div class="w-full h-auto mt-8">
        <div class="max-w-[1440px] mx-auto px-8">
          <div
            class="w-full flex items-center justify-between bg-[#FDFDFD] dark:bg-black dark:bg-clip-padding dark:backdrop-filter dark:backdrop-blur-xl dark:bg-opacity-10 rounded-[18px] lg:px-8 py-2 border-[0.5px] border-[#DEDEDE] dark:border-[#FAFAFA]/30"
          >
            <div class="hidden lg:grid grid-cols-12 w-full h-auto">
              <router-link :to="LogoLink" class="col-span-1 h-auto">
                <div class="flex w-full items-center">
                  <img
                    :src="Logo"
                    alt="Logo"
                    class="w-[117px] h-[56px] object-contain dark:hidden"
                  />
                </div>
              </router-link>
              <div class="hidden lg:flex items-center col-span-10 h-auto">
                <div class="flex w-full">
                  <nav
                    class="flex items-center w-full justify-center content-center"
                  >
                    <MenuNav />
                  </nav>
                </div>
              </div>
            </div>

            <!-- Mobile Navbar with Sidebar Button -->
            <div
              class="flex lg:hidden flex-row w-full h-auto justify-between md:px-8 sml:px-4"
            >
              <router-link to="/" class="w-[40%] h-auto flex">
                <!-- Logo terang (light mode) -->
                <img
                  :src="Logo"
                  alt="Logo"
                  class="w-[117px] h-[56px] sml:w-[80px] sml:h-[56px] object-contain dark:hidden"
                />
              </router-link>
              <div
                class="w-[60%] h-auto flex items-center flex-row justify-end"
              >
                <div
                  class="w-[30%] sml:w-[35%] md:w-[15%] h-auto flex items-center justify-end"
                >
                  <button
                    type="button"
                    id="sidebar-button"
                    class="bg-white p-2 rounded-lg shadow-md text-[#1AB24F]"
                    @click="sidebarStore.open"
                  >
                    <MenuIcon />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>
