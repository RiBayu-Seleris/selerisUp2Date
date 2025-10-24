<script setup>
import MenuNav from "@productComponents/MenuNav.vue";
import MenuIcon from "@/components/icons/MenuIcon.vue";
import { ref, onMounted, onUnmounted, computed } from "vue";
import { useScrollStore } from "@/stores/scroll";
import { useSidebarStore } from "@/stores/sidebar";
import { useRoute } from "vue-router"; // ✅ Tambahkan ini
import { useProductLogoColor } from "@/Data/Products/useProductLogoColor.js";

const scrollStore = useScrollStore();
const sidebarStore = useSidebarStore();
const route = useRoute(); // ✅ Ambil route saat ini

const { logo } = useProductLogoColor();

const LogoLink = computed(() => {
  if (route.path === "/product/credit-cover") {
    return "/product/credit-cover";
  }
  if (route.path === "/product/medins") {
    return "/product/medins";
  }
  if (route.path === "/product/lifins") {
    return "/product/lifins";
  }
  if (route.path === "/product/health-care") {
    return "/product/health-care";
  }
  return "";
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
      <div class="w-full h-auto mt-0">
        <div class="max-w-full mx-auto px-0">
          <div
            class="w-full flex items-center justify-between bg-[#FDFDFD] shadow-md px-4 lg:px-20 xl:px-20 xls:px-20 py-2 border-[0.5px] border-[#DEDEDE]"
          >
            <div
              class="hidden max-w-[1440px] mx-auto lg:grid grid-cols-12 w-full h-auto"
            >
              <router-link :to="LogoLink" class="col-span-1 h-auto">
                <div class="flex w-full h-auto items-center">
                  <img
                    v-if="logo"
                    :src="logo"
                    alt="Logo"
                    class="w-full h-[56px] object-contain dark:hidden"
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
                  v-if="logo"
                  :src="logo"
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
