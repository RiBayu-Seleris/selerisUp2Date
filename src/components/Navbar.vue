<script setup>
import Logo from "@/assets/images/logo.png";
import DarkLogo from "@/assets/images/darklogo.png";
import MenuNav from "@/components/MenuNav.vue";
import MenuIcon from "@/components/icons/MenuIcon.vue";
import ThemeToggle from "@/components/reusable/ThemeToggle.vue";

import { useSidebarStore } from "@/stores/sidebar";

const sidebarStore = useSidebarStore();
</script>

<template>
  <div
    class="relative flex justify-center w-full h-auto items-center max-w-[1440px] px-8 pt-6"
  >
    <!-- Desktop Navbar -->
    <div class="hidden lg:grid grid-cols-12 w-full h-auto">
      <div class="col-span-1 h-auto">
        <div class="flex w-full items-center">
          <!-- Logo terang (light mode) -->
          <img
            :src="Logo"
            alt="Logo"
            class="w-[117px] h-[56px] object-contain dark:hidden"
          />

          <!-- Logo gelap (dark mode) -->
          <img
            :src="DarkLogo"
            alt="Dark Logo"
            class="w-[117px] h-[56px] object-contain hidden dark:block"
          />
        </div>
      </div>
      <div class="flex items-center col-span-10 h-auto">
        <div class="flex w-full">
          <!-- rounded-full border shadow-[1px_19px_33px_-14px_rgba(0,_0,_0,_0.08)] bg-white z-[999] -->
          <nav
            class="hidden lg:flex items-center w-full justify-center content-center"
          >
            <MenuNav />
          </nav>
        </div>
      </div>
      <div class="col-span-1 h-auto">
        <div class="flex w-full h-full items-center justify-center">
          <ThemeToggle />
        </div>
      </div>
    </div>

    <!-- Mobile Navbar -->
    <div class="w-full h-auto flex lg:hidden flex-row justify-between">
      <div class="w-[40%] h-auto flex">
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
      </div>
      <div class="w-[60%] h-auto flex items-center flex-row justify-end">
        <div class="w-[70%] h-10 flex items-center justify-end">
          <ThemeToggle />
        </div>
        <div class="w-[30%] md:w-[15%] h-auto flex items-center justify-end">
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
</template>
