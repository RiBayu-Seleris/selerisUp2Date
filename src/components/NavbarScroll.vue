<script setup>
import Logo from "@/assets/images/logo.png";
import DarkLogo from "@/assets/images/darklogo.png";
import MenuNav from "@/components/MenuNav.vue";
import MenuIcon from "@/components/icons/MenuIcon.vue";
import ThemeToggle from "@/components/reusable/ThemeToggle.vue";
import { ref, onMounted, onUnmounted } from "vue";
import { useScrollStore } from "@/stores/scroll";
import { useSidebarStore } from "@/stores/sidebar";

const scrollStore = useScrollStore();
const sidebarStore = useSidebarStore();

const isDark = ref(false); // Untuk toggle tema

const toggleTheme = () => {
  isDark.value = !isDark.value;
};

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
    <nav class="fixed top-0 left-0 w-full transition-all duration-300 z-50">
      <div class="w-full h-auto mt-8">
        <div class="max-w-[1440px] mx-auto px-8">
          <div
            class="w-full flex items-center justify-between bg-white dark:bg-black dark:bg-clip-padding dark:backdrop-filter dark:backdrop-blur-3xl dark:bg-opacity-10 rounded-[18px] lg:px-8 py-2 border-[0.5px] border-[#DEDEDE] dark:border-[#FAFAFA]/30"
          >
            <div class="hidden lg:grid grid-cols-12 w-full h-auto">
              <router-link to="/" class="col-span-1 h-auto">
                <div class="flex w-full items-center">
                  <img
                    :src="Logo"
                    alt="Logo"
                    class="w-[117px] h-[56px] object-contain dark:hidden"
                  />
                </div>
                <div class="flex w-full items-center">
                  <img
                    :src="DarkLogo"
                    alt="Logo"
                    class="w-[117px] h-[56px] object-contain hidden dark:block"
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
              <div class="hidden lg:flex col-span-1 h-auto">
                <div class="flex w-full h-full items-center justify-center">
                  <ThemeToggle />
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

                <!-- Logo gelap (dark mode) -->
                <img
                  :src="DarkLogo"
                  alt="Dark Logo"
                  class="w-[117px] h-[56px] sml:w-[80px] sml:h-[56px] object-contain hidden dark:block"
                />
              </router-link>
              <div
                class="w-[60%] h-auto flex items-center flex-row justify-end"
              >
                <div class="w-[70%] h-10 flex items-center justify-end">
                  <ThemeToggle />
                </div>
                <div
                  class="w-auto h-auto ml-4 sm:ml-8 lg:ml-0 flex items-center justify-end"
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
