<script setup>
import { ref, watch } from "vue";
import { useSidebarStore } from "@/stores/sidebar";
import { useRoute } from "vue-router";
import MenuIconClose from "@/components/icons/CloseIcon.vue";
import Navlink from "@productComponents/Navlink.vue";

import { aboutList } from "@/Data/aboutList";
import { productList } from "@/Data/productList";
import { technologyList } from "@/Data/technologyList";
import { usecaseList } from "@/Data/usecaseList";
import { industryList } from "@/Data/industryList";

const sidebar = useSidebarStore();
const route = useRoute();

// Tutup saat pindah halaman
watch(
  () => route.fullPath,
  () => {
    sidebar.close();
  }
);

// Dropdown toggle
const isProductOpen = ref(false);
const isTechnologyOpen = ref(false);

const handleProduct = () => {
  isProductOpen.value = !isProductOpen.value;
  isTechnologyOpen.value = false;
};
const handleTechnology = () => {
  isTechnologyOpen.value = !isTechnologyOpen.value;
  isProductOpen.value = false;
};

const titleSidebar = () => {
  if (route.path === "/product/lifins") {
    return "Lifins";
  }
  if (route.path === "/product/credit-cover") {
    return "Credit Cover";
  }
  if (route.path === "/product/medins") {
    return "Medins";
  }
  if (route.path === "/product/health-care") {
    return "Care";
  }
  if (route.path === "/product/seleris-credit") {
    return "Credit";
  }
};
</script>

<template>
  <transition name="fade">
    <div
      v-if="sidebar.isOpen"
      class="fixed inset-0 z-50 flex flex-col transition-all duration-300 overflow-y-auto"
    >
      <!-- Overlay -->
      <div class="absolute inset-0 bg-black/50" @click="sidebar.close"></div>

      <!-- Sidebar -->
      <transition name="slide">
        <div class="ml-auto w-full h-auto px-4 pt-6">
          <div
            class="w-full h-full bg-white dark:bg-[#17181A] relative z-50 flex flex-col items-center py-6 px-5 rounded-xl"
          >
            <div
              class="flex flex-row w-full h-auto justify-between items-center"
            >
              <div class="w-[80%] h-auto">
                <p
                  class="text-[#195279] dark:text-[#FAFAFA] font-semibold sml:text-md md:text-[1.7rem]"
                >
                  Seleris {{ titleSidebar() }}
                </p>
              </div>
              <div class="w-[20%] h-auto flex justify-end">
                <button
                  type="button"
                  id="sidebar-button"
                  @click="sidebar.close"
                  class="ml-auto text-2xl font-bold text-gray-700 hover:text-black dark:text-[#FAFAFA]"
                >
                  <MenuIconClose />
                </button>
              </div>
            </div>
            <nav
              class="w-full flex flex-wrap mt-8 text-lg font-semibold text-gray-800 gap-y-2"
            >
              <div class="w-full h-auto">
                <Navlink class="text-[11pt]" href="#hero"> Home </Navlink>
              </div>
              <div class="w-full h-auto">
                <Navlink class="text-[11pt]" href="#about"> About </Navlink>
              </div>
              <div class="w-full h-auto">
                <Navlink class="text-[11pt]" href="#testimonial">
                  Testimonial
                </Navlink>
              </div>
              <div class="w-full h-auto">
                <Navlink class="text-[11pt]" href="#faq"> FAQ </Navlink>
              </div>
              <div class="w-full h-auto">
                <Navlink class="text-[11pt]" href="/contact"> Contact </Navlink>
              </div>
            </nav>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease-in-out;
}
.slide-enter-from {
  transform: translateX(100%);
}
.slide-enter-to {
  transform: translateX(0%);
}
.slide-leave-from {
  transform: translateX(0%);
}
.slide-leave-to {
  transform: translateX(100%);
}
</style>
