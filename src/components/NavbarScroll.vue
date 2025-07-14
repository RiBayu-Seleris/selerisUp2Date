<script setup>
import Logo from "@/assets/images/logo.png";
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
    <nav class="fixed top-0 left-0 w-full transition-all duration-300 z-40">
      <div class="w-full h-auto mt-8">
        <div class="max-w-[1440px] mx-auto px-8">
          <div
            class="w-full flex items-center justify-between bg-white rounded-[18px] px-8 py-2 border-[0.5px] border-[#DEDEDE]"
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
              <div class="hidden lg:flex items-center col-span-10 h-auto">
                <div class="flex w-full">
                  <!-- rounded-full border shadow-[1px_19px_33px_-14px_rgba(0,_0,_0,_0.08)] bg-white z-[999] -->
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
            <!-- Mobile Sidebar Button -->
            <div
              class="flex flex-row lg:hidden items-center justify-end h-[60px]"
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
    </nav>
  </div>
</template>
