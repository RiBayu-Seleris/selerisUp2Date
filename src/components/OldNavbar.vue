<script setup>
import Logo from "@/assets/images/logo.png";
import MenuNav from "@/components/MenuNav.vue";
import MenuIcon from "@/components/icons/MenuIcon.vue";

import { useSidebarStore } from "@/stores/sidebar";

const sidebarStore = useSidebarStore();
</script>

<template>
  <div
    class="flex justify-center w-full h-auto items-center sml:pt-3 md:pt-5 lg:pt-5 xl:pt-5"
  >
    <div class="flex flex-row w-full max-w-[1440px] mx-auto items-center">
      <!-- Logo -->
      <div class="sml:w-[50%] md:w-[50%] lg:w-[13%] h-auto">
        <img
          :src="Logo"
          alt="Logo"
          class="h-[50px] md:h-[60px] lg:h-[60px] xl:h-[80px] 2xl:h-[90px] 3xl:h-[80px] 2xl:ml-[-70px] 3xl:ml-[40px] object-contain"
        />
      </div>

      <!-- Desktop Menu -->
      <div class="sml:hidden md:hidden lg:flex w-[87%] h-full items-center">
        <div
          class="flex lg:w-[90%] xl:w-[85%] h-auto lg:ml-[2%] xl:ml-[4%] xl:mt-3 3xl:mt-0"
        >
          <nav
            class="hidden lg:flex w-full rounded-full border py-3 lg:py-2 2xl:py-3 3xl:py-3 justify-center content-center shadow-[1px_19px_33px_-14px_rgba(0,_0,_0,_0.08)] bg-white z-[999]"
          >
            <MenuNav />
          </nav>
        </div>
      </div>

      <!-- Mobile Menu -->
      <div
        class="flex lg:hidden h-[75px] sml:w-[50%] md:w-[50%] items-center justify-end"
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
</template>
