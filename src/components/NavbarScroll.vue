<script setup>
import Logo from "@/assets/images/logo.png";
import MenuNav from "@/components/MenuNav.vue";
import Blur from "@/assets/images/green-blur.svg";
import MenuIcon from "@/components/icons/MenuIcon.vue";

import { ref, onMounted, onUnmounted } from "vue";

const isScrolled = ref(false);

import { useSidebarStore } from "@/stores/sidebar";

const sidebarStore = useSidebarStore();

function toggleSidebar() {
  sidebarStore.toggle();
}

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
  <div class="flex flex-col relative w-full h-[100px] items-center z-40">
    <nav
      class="flex flex-row px-12 md:px-12 fixed w-full items-center z-40 bg-white py-2 shadow-lg"
    >
      <!-- Div Navbar Kiri (Logo) -->
      <div
        class="flex h-[75px] sml:w-[60%] md:w-[25%] lg:w-[15%] items-center lg:pl-10 rounded-t-3xl z-50 md:bg-transparent"
      >
        <img
          :src="Logo"
          alt="Logo"
          class="sml:w-[100px] h-[70px] sml:h-[70px] object-contain"
        />
      </div>
      <!-- Div Navbar -->
      <div
        class="hidden lg:flex h-[75px] md:w-[75%] lg:w-[75%] items-center justify-center px-5"
      >
        <MenuNav />
      </div>
      <!-- Mobile Nav Menu -->
      <div
        class="flex lg:hidden h-[75px] sml:w-[55%] md:w-[75%] items-center justify-end"
      >
        <button
          type="button"
          class="bg-white p-2 rounded-lg shadow-md text-[#1AB24F]"
          @click="toggleSidebar"
        >
          <MenuIcon />
        </button>
      </div>
    </nav>
  </div>
</template>
