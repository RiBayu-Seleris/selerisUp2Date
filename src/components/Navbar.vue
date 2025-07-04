<script setup>
import Logo from "@/assets/images/logo.png";
import MenuNav from "@/components/MenuNav.vue";
import MenuIcon from "@/components/icons/MenuIcon.vue";

import { useSidebarStore } from "@/stores/sidebar";

const sidebarStore = useSidebarStore();
</script>

<template>
  <div class="flex flex-row w-full h-auto items-center pt-5 lg:pt-5">
    <div class="sml:w-[50%] md:w-[50%] lg:w-[13%] h-auto">
      <img
        :src="Logo"
        alt="Logo"
        class="h-[86px] sml:w-[100px] sml:h-[70px] md:h-[70px] lg:h-[80px] object-contain"
      />
    </div>
    <div class="sml:hidden md:hidden lg:flex w-[87%] h-full items-center">
      <div class="flex w-[86%] h-auto ml-[3.5%]">
        <nav
          class="hidden lg:flex w-full rounded-full border py-3 justify-center content-center shadow-md bg-white z-[999]"
        >
          <MenuNav />
        </nav>
      </div>
    </div>

    <!-- Mobile -->
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
</template>
