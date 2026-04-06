<script setup>
import { ref, watch } from "vue";
import { useSidebarStore } from "@/stores/sidebar";
import { useRoute } from "vue-router";
import MenuIconClose from "@/components/icons/CloseIcon.vue";
import Navlink from "@/components/Navlink.vue";
import Logo from "@/assets/images/logo.png";
import DarkLogo from "@/assets/images/darklogo.png";

import { aboutList } from "@/Data/aboutList";
import { productList } from "@/Data/productList";
import { technologyList } from "@/Data/technologyList";
import { SolutionLists } from "@/Data/SolutionLists";

const sidebar = useSidebarStore();
const route = useRoute();

// Tutup saat pindah halaman
watch(
  () => route.fullPath,
  () => {
    sidebar.close();
  },
);

// Dropdown toggle
const isAboutOpen = ref(false);
const isProductOpen = ref(false);
const isTechnologyOpen = ref(false);
const isSolutionOpen = ref(false);
const showUnderConstructionModal = ref(false);

const toggleAbout = () => {
  isAboutOpen.value = !isAboutOpen.value;
  // isProductOpen.value = false;
};

const toggleProduct = () => {
  isProductOpen.value = !isProductOpen.value;
  // isAboutOpen.value = false;
};
const toggleTechnology = () => {
  isTechnologyOpen.value = !isTechnologyOpen.value;
  // isProductOpen.value = false;
};

const toggleSolution = () => {
  isSolutionOpen.value = !isSolutionOpen.value;
  // isProductOpen.value = false;
};
</script>

<template>
  <transition name="fade">
    <div
      v-if="sidebar.isOpen"
      class="fixed inset-0 z-50 flex flex-col transition-all duration-300 overflow-y-auto bg-black/50"
    >
      <!-- Overlay -->
      <!-- <div class="absolute inset-0 bg-black/50"></div> -->

      <!-- Sidebar -->
      <transition name="slide">
        <div class="ml-auto w-full h-auto px-4 py-6 z-50">
          <div
            class="w-full h-full bg-white dark:bg-[#17181A] relative z-50 flex flex-col items-center py-6 px-5 rounded-xl"
          >
            <div
              class="flex flex-row w-full h-auto justify-between items-center"
            >
              <router-link to="/" class="w-[80%] h-auto">
                <img
                  :src="Logo"
                  alt="Logo"
                  class="w-[117px] h-[56px] sm:w-[80px] sm:h-[56px] object-contain dark:hidden"
                />

                <!-- Logo gelap (dark mode) -->
                <img
                  :src="DarkLogo"
                  alt="Dark Logo"
                  class="w-[117px] h-[56px] sm:w-[80px] sm:h-[56px] object-contain hidden dark:block"
                />
              </router-link>
              <div class="w-[20%] h-auto flex justify-end">
                <button
                  type="button"
                  aria-label="Open sidebar menu"
                  id="sidebarCloseButton"
                  @click="sidebar.close"
                  class="ml-auto text-2xl font-bold text-gray-700 hover:text-black dark:text-[#FAFAFA]"
                >
                  <MenuIconClose />
                </button>
              </div>
            </div>
            <nav class="w-full flex flex-col mt-8 gap-y-6 sm:gap-y-8">
              <div class="w-full h-auto">
                <Navlink href="/">
                  <p
                    class="text-[#374151] dark:text-[#FAFAFA] font-[500] text-[16px] sm:text-[18px]"
                  >
                    Home
                  </p>
                </Navlink>
              </div>

              <!-- About -->
              <div class="w-full h-auto flex flex-col">
                <button
                  id="buttonAboutListMenu"
                  aria-label="Open About menu"
                  @click.stop="toggleAbout"
                  class="w-full h-auto flex flex-row justify-between pr-1"
                >
                  <div class="w-full h-auto flex items-center">
                    <p
                      class="text-[#374151] dark:text-[#FAFAFA] text-[16px] sm:text-[18px] font-[500]"
                    >
                      About
                    </p>
                  </div>
                  <div class="text-[#374151] dark:text-[#FAFAFA]">
                    <svg
                      class="w-4 sm:w-5 h-auto transition-transform duration-200 transform"
                      :class="{ 'rotate-90': isAboutOpen }"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="3"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </button>
                <transition name="fade">
                  <div
                    v-if="isAboutOpen"
                    class="w-full h-auto grid grid-cols-2 mt-0.5 sm:mt-3 md:mt-2.5 gap-x-2 gap-y-1 sm:gap-y-2.5 md:gap-y-3"
                  >
                    <div
                      v-for="(about, index) in aboutList"
                      :key="index"
                      class="w-full h-auto"
                    >
                      <Navlink :href="about.url">
                        <p
                          class="text-[12px] sm:text-[16px] font-[500] text-[#8E98A8] dark:text-[#8E98A8]"
                        >
                          {{ about.name }}
                        </p>
                      </Navlink>
                    </div>
                  </div>
                </transition>
              </div>

              <!-- Products -->
              <div class="w-full h-auto flex flex-col">
                <button
                  id="buttonProductListMenu"
                  aria-label="Open Products menu"
                  @click.stop="toggleProduct"
                  class="w-full h-auto flex flex-row justify-between pr-1"
                >
                  <div class="w-full h-auto flex items-center">
                    <p
                      class="text-[#374151] dark:text-[#FAFAFA] text-[16px] sm:text-[18px] font-[500]"
                    >
                      Products
                    </p>
                  </div>
                  <div class="text-[#374151] dark:text-[#FAFAFA]">
                    <svg
                      class="w-4 sm:w-5 h-auto transition-transform duration-200 transform"
                      :class="{ 'rotate-90': isProductOpen }"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="3"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </button>
                <transition name="fade">
                  <div
                    v-if="isProductOpen"
                    class="w-full h-auto grid grid-cols-2 mt-0.5 sm:mt-3 md:mt-2.5 gap-x-2 gap-y-1 sm:gap-y-2.5 md:gap-y-3"
                  >
                    <div
                      v-for="(product, index) in productList"
                      :key="index"
                      class="w-full h-auto"
                    >
                      <Navlink :href="product.url">
                        <p
                          class="text-[12px] sm:text-[16px] font-[500] text-[#8E98A8] dark:text-[#8E98A8]"
                        >
                          {{ product.name }}
                        </p>
                      </Navlink>
                    </div>
                  </div>
                </transition>
              </div>

              <!-- Technology -->
              <div class="w-full h-auto flex flex-col">
                <button
                  id="buttonTechnologyListMenu"
                  aria-label="Open Technology menu"
                  @click.stop="toggleTechnology"
                  class="w-full h-auto flex flex-row justify-between pr-1"
                >
                  <div class="w-full h-auto flex items-center">
                    <p
                      class="text-[#374151] dark:text-[#FAFAFA] text-[16px] sm:text-[18px] font-[500]"
                    >
                      Technology
                    </p>
                  </div>
                  <div class="text-[#374151] dark:text-[#FAFAFA]">
                    <svg
                      class="w-4 sm:w-5 h-auto transition-transform duration-200 transform"
                      :class="{ 'rotate-90': isTechnologyOpen }"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="3"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </button>
                <transition name="fade">
                  <div
                    v-if="isTechnologyOpen"
                    class="w-full h-auto grid grid-cols-2 mt-0.5 sm:mt-3 md:mt-2.5 gap-x-2 gap-y-1 sm:gap-y-2.5 md:gap-y-3"
                  >
                    <div
                      v-for="(technology, index) in technologyList"
                      :key="index"
                      class="w-full h-auto"
                    >
                      <Navlink :href="technology.url">
                        <p
                          class="text-[12px] sm:text-[16px] font-[500] text-[#8E98A8] dark:text-[#8E98A8]"
                        >
                          {{ technology.name }}
                        </p>
                      </Navlink>
                    </div>
                  </div>
                </transition>
              </div>

              <!-- Technology -->
              <div class="w-full h-auto flex flex-col gap-y-2 sm:gap-y-4">
                <button
                  id="buttonSolutionsListMenu"
                  aria-label="Open Solutions menu"
                  @click.stop="toggleSolution"
                  class="w-full h-auto flex flex-row justify-between pr-1"
                >
                  <div class="w-full h-auto flex items-center">
                    <p
                      class="text-[#374151] dark:text-[#FAFAFA] text-[16px] sm:text-[18px] font-[500]"
                    >
                      Solutions
                    </p>
                  </div>
                  <div class="text-[#374151] dark:text-[#FAFAFA]">
                    <svg
                      class="w-4 sm:w-5 h-auto transition-transform duration-200 transform"
                      :class="{ 'rotate-90': isSolutionOpen }"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="3"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </button>

                <!-- Ini saat tidak underconstruction -->
                <div v-if="isSolutionOpen" class="w-full flex flex-col gap-y-4">
                  <Navlink
                    v-for="(solution, index) in SolutionLists"
                    :key="index"
                    :href="solution.url"
                    class="flex justify-start items-start group transition-all duration-300 cursor-pointer"
                  >
                    <div
                      class="w-full h-auto flex flex-row gap-x-3 justify-center items-center group-hover:bg-[#55FC8A]/10 p-2 rounded-md"
                    >
                      <div class="w-fit h-auto flex justify-center items-start">
                        <div
                          class="w-9 h-9 rounded-md flex justify-center items-center p-2 bg-[#ADF9C5] dark:bg-[#2AB857] text-[#2AB857] dark:text-[#AFFAC6]"
                        >
                          <component
                            :is="solution.icons"
                            class="w-full h-full"
                          />
                        </div>
                      </div>
                      <div
                        class="w-full h-auto flex flex-col justify-center items-start"
                      >
                        <span
                          class="text-[14px] font-[600] text-[#374151] dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-br dark:from-[#FAFAFA] dark:via-[#D4D4D4] dark:to-[#AAAAAA]"
                          >{{ solution.title }}</span
                        >
                        <span
                          class="text-[12px] text-[#9CA3AF] font-[500] group-hover:text-[#2AB857] group-hover:font-[500] dark:text-[#FAFAFA] text-animate-group-hover dark:dark-text-animate-group-hover"
                          >{{ solution.content }}</span
                        >
                      </div>
                      <div class="w-fit h-auto flex justify-center items-start">
                        <div
                          class="w-9 h-auto rounded-md flex justify-center items-center p-2 text-[#C9C9C9] group-hover:text-[#2AB857] dark:text-[#C9C9C9] group-hover:dark:text-[#2AB857]"
                        >
                          <ArrowRight class="w-full h-full" />
                        </div>
                      </div>
                    </div>
                  </Navlink>
                </div>

                <!-- <transition name="fade">
                  <div
                    v-if="isSolutionOpen"
                    class="w-full flex flex-col gap-y-2.5 sm:gap-y-4"
                  >
                    <div
                      v-for="(solution, index) in SolutionLists"
                      :key="index"
                      class="flex justify-start items-start group transition-all duration-300 cursor-pointer"
                      @click="showUnderConstructionModal = true"
                    >
                      <div
                        class="w-full h-auto flex flex-row gap-x-3 justify-center items-center group-hover:bg-[#55FC8A]/10 p-1.5 sm:p-2 rounded-md"
                      >
                        <div
                          class="w-fit h-auto flex justify-center items-start"
                        >
                          <div
                            class="w-8 h-8 rounded-md flex justify-center items-center p-2 bg-[#ADF9C5] dark:bg-[#2AB857] text-[#2AB857] dark:text-[#AFFAC6]"
                          >
                            <component
                              :is="solution.icons"
                              class="w-full h-full"
                            />
                          </div>
                        </div>
                        <div
                          class="w-full h-auto flex flex-col justify-center items-start"
                        >
                          <span
                            class="text-[12px] sm:text-[14px] font-[600] text-[#374151] dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-br dark:from-[#FAFAFA] dark:via-[#D4D4D4] dark:to-[#AAAAAA]"
                            >{{ solution.title }}</span
                          >
                          <span
                            class="text-[10px] sm:text-[12px] text-[#9CA3AF] font-[500] group-hover:text-[#2AB857] group-hover:font-[500] dark:text-[#FAFAFA] text-animate-group-hover dark:dark-text-animate-group-hover"
                            >{{ solution.content }}</span
                          >
                        </div>
                        <div
                          class="w-fit h-auto flex justify-center items-start"
                        >
                          <div
                            class="w-9 h-auto rounded-md flex justify-center items-center p-2 text-[#C9C9C9] group-hover:text-[#2AB857] dark:text-[#C9C9C9] group-hover:dark:text-[#2AB857]"
                          >
                            <ArrowRight class="w-full h-full" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </transition> -->
              </div>

              <!-- Blogs -->
              <div class="w-full h-auto">
                <Navlink href="/blogs">
                  <p
                    class="text-[#374151] dark:text-[#FAFAFA] font-[500] text-[16px] sm:text-[18px]"
                  >
                    Blogs
                  </p>
                </Navlink>
              </div>

              <!-- Services -->
              <div class="w-full h-auto">
                <Navlink href="/services">
                  <p
                    class="text-[#374151] dark:text-[#FAFAFA] font-[500] text-[16px] sm:text-[18px]"
                  >
                    Services
                  </p>
                </Navlink>
              </div>

              <!-- Careers -->
              <div class="w-full h-auto">
                <Navlink href="/careers">
                  <p
                    class="text-[#374151] dark:text-[#FAFAFA] font-[500] text-[16px] sm:text-[18px]"
                  >
                    Careers
                  </p>
                </Navlink>
              </div>
            </nav>
          </div>
        </div>
      </transition>
    </div>
  </transition>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-200 ease-out"
      leave-active-class="transition-opacity duration-150 ease-in"
      enter-from-class="opacity-0"
      leave-to-class="opacity-0"
    >
      <div
        v-if="showUnderConstructionModal"
        class="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm"
        @click.self="showUnderConstructionModal = false"
      >
        <div
          class="relative bg-white dark:bg-[#1D2426] rounded-2xl shadow-xl p-8 w-[90%] max-w-md flex flex-col items-center gap-4"
        >
          <!-- Icon -->
          <div
            class="w-16 h-16 rounded-full bg-[#ADF9C5] dark:bg-[#2AB857]/20 flex items-center justify-center text-4xl"
          >
            🚧
          </div>

          <!-- Text -->
          <h2 class="text-[20px] font-[700] text-[#374151] dark:text-white">
            Under Construction
          </h2>
          <p class="text-[14px] text-[#9CA3AF] text-center dark:text-[#D1D5DB]">
            Halaman ini sedang dalam pengembangan. Silakan kembali lagi nanti.
          </p>

          <!-- Close Button -->
          <button
            @click="showUnderConstructionModal = false"
            class="mt-2 px-6 py-2 bg-[#2AB857] hover:bg-[#22a04a] text-white text-[14px] font-[600] rounded-xl transition-colors duration-200"
          >
            Oke, Mengerti
          </button>
        </div>
      </div>
    </Transition>
  </Teleport>
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
