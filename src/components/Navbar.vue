<script setup>
import Logo from "@/assets/images/logo.png";
import MenuNav from "@/components/MenuNav.vue";
import Blur from "@/assets/images/green-blur.svg";
import MenuIcon from "@/components/icons/MenuIcon.vue";
import { useSidebarStore } from "@/stores/sidebar";

import { ref, onMounted, onUnmounted } from "vue";

const isScrolled = ref(false);

const sidebar = useSidebarStore();

const toggleSidebar = () => {
  sidebar.toggle();
};

const handleScroll = () => {
  isScrolled.value = window.scrollY > 10;
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
    class="flex flex-col relative w-full h-[100px] sml:items-center md:items-center pt-2"
  >
    <div
      class="flex flex-row bg-[#F9F9FB] sml:px-12 md:px-12 lg:px-9 fixed w-full sml:items-center md:items-center z-50"
    >
      <!-- Div Navbar Kiri (Logo) -->
      <div class="lg:bg-[#F3F4F6] sml:w-[60%] md:w-[25%] lg:w-[15%]">
        <div
          class="flex h-[75px] w-full sml:items-center md:items-center lg:justify-center rounded-br-3xl z-50 md:bg-transparent lg:bg-[#F9F9FB]"
        >
          <img
            :src="Logo"
            alt="Logo"
            class="sml:w-[100px] h-[70px] sml:h-[70px] object-contain"
          />
        </div>
      </div>
      <!-- Div Navbar -->
      <div
        class="hidden lg:flex h-[75px] md:w-[75%] lg:w-[75%] items-center justify-center px-5 rounded-t-[1.7rem] bg-[#F3F4F6] bg-radial-green bg-opacity-20 z-[999]"
      >
        <nav
          class="hidden lg:flex w-full rounded-full border py-3 justify-center content-center shadow-md bg-white z-[999]"
        >
          <MenuNav />
        </nav>
      </div>
      <div class="lg:bg-[#F3F4F6] sml:w-[60%] md:w-[25%] lg:w-[15%]">
        <div
          class="flex h-[75px] w-full sml:items-center md:items-center rounded-bl-3xl z-50 md:bg-transparent lg:bg-[#F9F9FB]"
        ></div>
      </div>
      <!-- Mobile Nav Menu -->
      <div
        class="flex lg:hidden h-[75px] sml:w-[55%] md:w-[75%] items-center justify-end"
      >
        <button
          type="button"
          id="sidebar-button"
          class="bg-white p-2 rounded-lg shadow-md text-[#1AB24F]"
          @click="toggleSidebar"
        >
          <MenuIcon />
        </button>
      </div>
    </div>
  </div>
</template>
