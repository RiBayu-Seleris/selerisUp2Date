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
const isAboutOpen = ref(false);
const isProductOpen = ref(false);
const isTechnologyOpen = ref(false);
const isSolutionOpen = ref(false);

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
                  class="w-[117px] h-[56px] sml:w-[80px] sml:h-[56px] object-contain dark:hidden"
                />

                <!-- Logo gelap (dark mode) -->
                <img
                  :src="DarkLogo"
                  alt="Dark Logo"
                  class="w-[117px] h-[56px] sml:w-[80px] sml:h-[56px] object-contain hidden dark:block"
                />
              </router-link>
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
              class="w-full flex flex-col mt-8 text-lg font-semibold text-gray-800 gap-y-5"
            >
              <div class="w-full h-auto">
                <Navlink href="/">
                  <p class="text-[#374151] font-[500] text-[16px]">Home</p>
                </Navlink>
              </div>

              <!-- About -->
              <div class="w-full h-auto flex flex-col">
                <button
                  @click.stop="toggleAbout"
                  class="w-full h-auto flex flex-row justify-between pr-2"
                >
                  <div class="w-full h-auto flex items-center">
                    <p class="text-[#374151] text-[16px] font-[500]">About</p>
                  </div>
                  <div class="text-[#374151]">
                    <svg
                      class="w-5 h-auto transition-transform duration-200 transform"
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
                    class="w-full h-auto grid grid-cols-2"
                  >
                    <div
                      v-for="(about, index) in aboutList"
                      :key="index"
                      class="w-auto h-auto"
                    >
                      <Navlink :href="about.url">
                        <p
                          class="text-[12px] sm:text-[16px] font-[500] text-[#8E98A8] dark:text-[#FAFAFA]"
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
                  @click.stop="toggleProduct"
                  class="w-full h-auto flex flex-row justify-between pr-2"
                >
                  <div class="w-full h-auto flex items-center">
                    <p class="text-[#374151] text-[16px] font-[500]">
                      Products
                    </p>
                  </div>
                  <div class="text-[#374151]">
                    <svg
                      class="w-5 h-auto transition-transform duration-200 transform"
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
                    class="w-full h-auto grid grid-cols-2"
                  >
                    <div
                      v-for="(product, index) in productList"
                      :key="index"
                      class="w-auto h-auto"
                    >
                      <Navlink :href="product.url">
                        <p
                          class="text-[12px] sm:text-[16px] font-[500] text-[#8E98A8] dark:text-[#FAFAFA]"
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
                  @click.stop="toggleTechnology"
                  class="w-full h-auto flex flex-row justify-between pr-2"
                >
                  <div class="w-full h-auto flex items-center">
                    <p class="text-[#374151] text-[16px] font-[500]">
                      Technology
                    </p>
                  </div>
                  <div class="text-[#374151]">
                    <svg
                      class="w-5 h-auto transition-transform duration-200 transform"
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
                    class="w-full h-auto grid grid-cols-2"
                  >
                    <div
                      v-for="(technology, index) in technologyList"
                      :key="index"
                      class="w-auto h-auto"
                    >
                      <Navlink :href="technology.url">
                        <p
                          class="text-[12px] sm:text-[16px] font-[500] text-[#8E98A8] dark:text-[#FAFAFA]"
                        >
                          {{ technology.name }}
                        </p>
                      </Navlink>
                    </div>
                  </div>
                </transition>
              </div>

              <!-- Technology -->
              <div class="w-full h-auto flex flex-col">
                <button
                  @click.stop="toggleSolution"
                  class="w-full h-auto flex flex-row justify-between pr-2"
                >
                  <div class="w-full h-auto flex items-center">
                    <p class="text-[#374151] text-[16px] font-[500]">
                      Solutions
                    </p>
                  </div>
                  <div class="text-[#374151]">
                    <svg
                      class="w-5 h-auto transition-transform duration-200 transform"
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
                <transition name="fade">
                  <div v-if="isSolutionOpen" class="w-full flex flex-row">
                    <div class="w-full h-auto flex flex-col">
                      <p class="text-[#374151] text-[16px] font-[500] mt-2">
                        Use Case
                      </p>
                      <div
                        v-for="(technology, index) in technologyList"
                        :key="index"
                        class="w-auto h-auto"
                      >
                        <Navlink :href="technology.url">
                          <p
                            class="text-[12px] sm:text-[16px] font-[500] text-[#8E98A8] dark:text-[#FAFAFA]"
                          >
                            {{ technology.name }}
                          </p>
                        </Navlink>
                      </div>
                    </div>
                    <div class="w-full h-auto flex flex-col">
                      <p class="text-[#374151] text-[16px] font-[500] mt-2">
                        Industries
                      </p>
                      <div
                        v-for="(industry, index) in industryList"
                        :key="index"
                        class="w-auto h-auto"
                      >
                        <Navlink :href="industry.url">
                          <p
                            class="text-[12px] sm:text-[16px] font-[500] text-[#8E98A8] dark:text-[#FAFAFA]"
                          >
                            {{ industry.name }}
                          </p>
                        </Navlink>
                      </div>
                    </div>
                  </div>
                </transition>
              </div>

              <!-- Blogs -->
              <div class="w-full h-auto">
                <Navlink href="/blogs">
                  <p class="text-[#374151] font-[500] text-[16px]">Blogs</p>
                </Navlink>
              </div>

              <!-- Services -->
              <div class="w-full h-auto">
                <Navlink href="/services">
                  <p class="text-[#374151] font-[500] text-[16px]">Services</p>
                </Navlink>
              </div>

              <!-- Careers -->
              <div class="w-full h-auto">
                <Navlink href="/careers">
                  <p class="text-[#374151] font-[500] text-[16px]">Careers</p>
                </Navlink>
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
