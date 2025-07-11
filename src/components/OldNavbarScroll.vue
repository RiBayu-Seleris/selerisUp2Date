<script setup>
import Logo from "@/assets/images/logo.png";
import MenuNav from "@/components/MenuNav.vue";
import MenuIcon from "@/components/icons/MenuIcon.vue";

import { ref, onMounted, onUnmounted } from "vue";
import { useScrollStore } from "@/stores/scroll";
import { useSidebarStore } from "@/stores/sidebar";

const scrollStore = useScrollStore();
const sidebarStore = useSidebarStore();

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
  <div class="flex flex-col relative w-full h-auto items-center z-40">
    <nav
      :class="[
        'w-full fixed z-40 transition-all duration-300',
        scrollStore.isScrolled
          ? 'bg-white shadow-lg py-1 sml:px-2 sml:pr-4'
          : 'bg-transparent',
      ]"
    >
      <div
        class="flex flex-row w-full max-w-[1440px] mx-auto px-5 lg:px-14 items-center"
      >
        <!-- Logo -->
        <div
          class="flex h-[75px] sml:w-[60%] md:w-[50%] lg:w-[15%] items-center rounded-t-3xl z-50"
        >
          <img
            :src="Logo"
            alt="Logo"
            class="h-[70px] sml:w-[100px] sml:h-[70px] lg:h-[60px] object-contain"
          />
        </div>

        <!-- Desktop Menu -->
        <div
          class="hidden lg:flex h-[75px] md:w-[75%] lg:w-[80%] xl:w-[75%] items-center justify-center px-5"
        >
          <MenuNav />
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
    </nav>
  </div>
</template>
