<script setup>
import Logo from "@/assets/images/logo.png";
import MenuNav from "@/components/MenuNav.vue";
import MenuIcon from "@/components/icons/MenuIcon.vue";

import { useSidebarStore } from "@/stores/sidebar";

const sidebarStore = useSidebarStore();
</script>

<template>
  <div
    class="relative flex justify-center w-full h-auto items-center sml:pt-3 md:pt-5 lg:pt-5 xl:pt-5"
  >
    <div class="grid grid-cols-12 w-full h-auto">
      <div class="col-span-1 h-auto">
        <div class="flex w-full items-center">
          <img
            :src="Logo"
            alt="Logo"
            class="w-[117px] h-[56px] object-contain"
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
        <div class="flex w-full items-center">c</div>
      </div>
    </div>
  </div>
</template>
