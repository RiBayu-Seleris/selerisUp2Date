<script setup>
import { ref, onMounted, onUnmounted } from "vue";

import Logo from "@/assets/images/logo.png";
import DarkLogo from "@/assets/images/darklogo.png";
import MenuNav from "@/components/MenuNav.vue";
import MenuIcon from "@/components/icons/MenuIcon.vue";
import ThemeToggle from "@/components/reusable/ThemeToggle.vue";
import { useSidebarStore } from "@/stores/sidebar";

const sidebarStore = useSidebarStore();
const isScrolled = ref(false);

const handleScroll = () => {
  isScrolled.value = window.scrollY > 0;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
  <div
    :class="[
      'fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in flex justify-center',
      isScrolled ? 'pt-8 px-8 ' : 'bg-transparent py-6',
    ]"
  >
    <!-- Desktop Navbar -->
    <div
      class="hidden lg:grid grid-cols-12 w-full max-w-[1440px] h-auto px-8 lg:px-6 xl:px-8 xls:px-8 2xls:px-0 transition-all duration-500 ease-in"
      :class="[
        isScrolled
          ? 'bg-white py-2 xls:px-8 2xls:px-8 rounded-[10px] dark:bg-[#17181A]/50 dark:backdrop-blur-sm dark:border-[0.5px] border-[0.5px] border-[#DEDEDE] dark:border-[#FAFAFA]/30'
          : 'bg-transparent',
      ]"
    >
      <div class="col-span-1">
        <router-link to="/">
          <div class="flex w-full items-center">
            <img
              :src="Logo"
              alt="Logo"
              class="w-[117px] h-[56px] object-contain dark:hidden"
            />
            <img
              :src="DarkLogo"
              alt="Dark Logo"
              class="w-[117px] h-[56px] object-contain hidden dark:block"
            />
          </div>
        </router-link>
      </div>

      <div class="flex items-center col-span-10">
        <nav class="hidden lg:flex items-center w-full justify-center">
          <MenuNav />
        </nav>
      </div>

      <div class="col-span-1 flex justify-center items-center">
        <ThemeToggle />
      </div>
    </div>

    <!-- Mobile Navbar -->
    <div
      class="flex lg:hidden flex-row w-full h-auto justify-between transition-all duration-500 ease-in"
      :class="[
        isScrolled
          ? 'px-4 md:px-10 bg-white py-2 rounded-[10px] dark:bg-[#17181A] dark:backdrop-blur-3xl dark:border border-[0.5px] border-[#DEDEDE] dark:border-[#FAFAFA]/30'
          : 'px-6 sm:px-8 bg-transparent',
      ]"
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
      <div class="w-[60%] h-auto flex items-center flex-row justify-end">
        <div class="w-[70%] h-10 flex items-center justify-end">
          <ThemeToggle />
        </div>
        <div
          class="w-auto h-auto ml-4 sm:ml-8 lg:ml-0 flex items-center justify-end p-[1px] dark:bg-gradient-to-r dark:from-[#17181A] dark:from-45% dark:to-[#565656] rounded-lg"
        >
          <button
            type="button"
            id="sidebar-button"
            class="bg-white dark:bg-[#323232] p-2 rounded-lg shadow-md text-[#1AB24F] dark:text-[#FAFAFA]"
            @click="sidebarStore.open"
          >
            <MenuIcon />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
