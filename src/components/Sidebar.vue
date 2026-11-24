<script setup>
import { computed, onUnmounted, ref, watch } from "vue";
import { useSidebarStore } from "@/stores/sidebar";
import { useRoute } from "vue-router";
import MenuIconClose from "@/components/icons/CloseIcon.vue";
import Navlink from "@/components/Navlink.vue";
import Logo from "@/assets/images/logo.png";
import DarkLogo from "@/assets/images/darklogo.png";

import { aboutList } from "@/Data/AboutList";
import { productList } from "@/Data/ProductList";
import { technologyList } from "@/Data/TechnologyList";
import { SolutionLists } from "@/Data/SolutionLists";
import { resourceList } from "@/Data/ResourceList";
import { WORKSHOP_DYNAMIC } from "@/Data/workshops";
import { loadWorkshopList } from "@/consumeAPI/workshopsApi";
import { onMounted } from "vue";
import ArrowRight from "@/components/icons/ArrowRight.vue";

const sidebar = useSidebarStore();
const route = useRoute();

// Di dalam setup() atau <script setup>
const isHovered = ref(null);

const isDark = ref(document.documentElement.classList.contains("dark"));

const observer = new MutationObserver(() => {
  isDark.value = document.documentElement.classList.contains("dark");
});

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

const hasNewResource = computed(() =>
  resourceList.value.some((resource) => resource.isNew),
);
const isResourceOpen = ref(false);
watch(
  hasNewResource,
  (isNew) => {
    if (isNew) isResourceOpen.value = true;
  },
  { immediate: true },
);
const toggleResource = () => {
  isResourceOpen.value = !isResourceOpen.value;
};

onMounted(() => {
  if (WORKSHOP_DYNAMIC) loadWorkshopList().catch(() => {});
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
});

onUnmounted(() => {
  observer.disconnect();
});
</script>

<template>
  <transition name="fade">
    <div
      v-if="sidebar.isOpen"
      class="fixed inset-0 z-50 flex flex-col transition-all duration-300 overflow-y-auto bg-black/50"
    >
      <!-- <div class="absolute inset-0 bg-black/50"></div> -->

      <transition name="slide" appear>
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

                <img
                  :src="DarkLogo"
                  alt="Dark Logo"
                  class="w-[117px] h-[56px] sm:w-[80px] sm:h-[56px] object-contain hidden dark:block"
                />
              </router-link>
              <div class="w-[20%] h-auto flex justify-end">
                <button
                  type="button"
                  :aria-label="$t('common.closeMenu')"
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
                    {{ $t("nav.home") }}
                  </p>
                </Navlink>
              </div>

              <div class="w-full h-auto flex flex-col">
                <button
                  id="buttonAboutListMenu"
                  :aria-label="$t('nav.about')"
                  @click.stop="toggleAbout"
                  class="w-full h-auto flex flex-row justify-between pr-1"
                >
                  <div class="w-full h-auto flex items-center">
                    <p
                      class="text-[#374151] dark:text-[#FAFAFA] text-[16px] sm:text-[18px] font-[500]"
                    >
                      {{ $t("nav.about") }}
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
                          {{ $t("nav.about_items." + about.key) }}
                        </p>
                      </Navlink>
                    </div>
                  </div>
                </transition>
              </div>

              <div class="w-full h-auto flex flex-col">
                <button
                  id="buttonProductListMenu"
                  :aria-label="$t('nav.products')"
                  @click.stop="toggleProduct"
                  class="w-full h-auto flex flex-row justify-between pr-1"
                >
                  <div class="w-full h-auto flex items-center">
                    <p
                      class="text-[#374151] dark:text-[#FAFAFA] text-[16px] sm:text-[18px] font-[500]"
                    >
                      {{ $t("nav.products") }}
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

              <div class="w-full h-auto flex flex-col">
                <button
                  id="buttonTechnologyListMenu"
                  :aria-label="$t('nav.technology')"
                  @click.stop="toggleTechnology"
                  class="w-full h-auto flex flex-row justify-between pr-1"
                >
                  <div class="w-full h-auto flex items-center">
                    <p
                      class="text-[#374151] dark:text-[#FAFAFA] text-[16px] sm:text-[18px] font-[500]"
                    >
                      {{ $t("nav.technology") }}
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

              <div class="w-full h-auto flex flex-col gap-y-2 sm:gap-y-4">
                <button
                  id="buttonSolutionsListMenu"
                  :aria-label="$t('nav.solutions')"
                  @click.stop="toggleSolution"
                  class="w-full h-auto flex flex-row justify-between pr-1"
                >
                  <div class="w-full h-auto flex items-center">
                    <p
                      class="text-[#374151] dark:text-[#FAFAFA] text-[16px] sm:text-[18px] font-[500]"
                    >
                      {{ $t("nav.solutions") }}
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

                <transition name="fade">
                  <div
                    v-if="isSolutionOpen"
                    class="w-full flex flex-col gap-y-4"
                  >
                    <Navlink
                      v-for="(solution, index) in SolutionLists"
                      :key="index"
                      :href="solution.url"
                      class="flex justify-start items-start group transition-all duration-300 cursor-pointer"
                    >
                      <!-- <div
                        class="w-full h-auto flex flex-row gap-x-3 justify-center items-center group-hover:bg-[#55FC8A]/10 p-1.5 sm:p-2 rounded-md"
                      > -->
                      <div
                        class="w-full h-auto flex flex-row gap-x-3 justify-center items-center p-1.5 sm:p-2 rounded-md transition-colors duration-200"
                        :style="{
                          backgroundColor:
                            isHovered === index ? solution.bgColor + '40' : '',
                        }"
                        @mouseenter="isHovered = index"
                        @mouseleave="isHovered = null"
                      >
                        <div
                          class="w-fit h-auto flex justify-center items-start"
                        >
                          <div
                            class="w-8 h-8 rounded-md flex justify-center items-center p-2"
                            :style="{
                              backgroundColor: isDark
                                ? solution.darkBgColor
                                : solution.bgColor,
                              color: isDark
                                ? solution.darkIconColor
                                : solution.iconColor,
                            }"
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
                            >{{
                              $t("solutions." + solution.slug + ".title")
                            }}</span
                          >
                          <span
                            class="text-[10px] sm:text-[12px] font-[500] solution-text-animate"
                            :class="{ 'is-hovered': isHovered === index }"
                            :style="{
                              '--solution-color': solution.iconColor,
                            }"
                            >{{
                              $t("solutions." + solution.slug + ".subtitle")
                            }}</span
                          >
                        </div>
                        <div
                          class="w-fit h-auto flex justify-center items-start"
                        >
                          <div
                            class="w-9 h-auto rounded-md flex justify-center items-center p-2"
                          >
                            <span
                              class="w-full h-full transition-colors duration-200"
                              :style="{
                                color:
                                  isHovered === index
                                    ? solution.iconColor
                                    : '#C9C9C9',
                              }"
                            >
                              <ArrowRight class="w-full h-full" />
                            </span>
                          </div>
                        </div>
                      </div>
                    </Navlink>
                  </div>
                </transition>

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

              <div class="w-full h-auto flex flex-col">
                <button
                  id="buttonResourceListMenu"
                  :aria-label="$t('nav.resources')"
                  :aria-expanded="isResourceOpen"
                  @click.stop="toggleResource"
                  class="w-full h-auto flex flex-row justify-between pr-1"
                >
                  <div class="w-full h-auto flex items-center gap-2">
                    <span
                      v-if="hasNewResource"
                      class="relative flex w-2 h-2 shrink-0"
                      aria-hidden="true"
                    >
                      <span
                        class="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#1AB24F] opacity-75 motion-reduce:animate-none dark:bg-[#3DDC84]"
                      ></span>
                      <span
                        class="relative inline-flex w-2 h-2 rounded-full bg-[#1AB24F] dark:bg-[#3DDC84]"
                      ></span>
                    </span>
                    <p
                      class="text-[#374151] dark:text-[#FAFAFA] text-[16px] sm:text-[18px] font-[500]"
                    >
                      {{ $t("nav.resources") }}
                    </p>
                    <span
                      v-if="hasNewResource"
                      class="rounded-full bg-[#1AB24F] px-2 py-[2px] text-[9px] sm:text-[10px] font-[700] tracking-[0.06em] text-white"
                      >{{ $t("nav.newBadge") }}</span
                    >
                  </div>
                  <div class="text-[#374151] dark:text-[#FAFAFA]">
                    <svg
                      class="w-4 sm:w-5 h-auto transition-transform duration-200 transform"
                      :class="{ 'rotate-90': isResourceOpen }"
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
                    v-if="isResourceOpen"
                    class="w-full h-auto flex flex-col mt-2 sm:mt-3 gap-1"
                  >
                    <Navlink
                      v-for="resource in resourceList"
                      :key="resource.key"
                      :href="resource.url"
                      class="w-full"
                    >
                      <div class="flex items-center gap-3 w-full py-1.5">
                        <span
                          class="w-8 h-8 sm:w-9 sm:h-9 shrink-0 rounded-lg p-1.5 sm:p-2 flex items-center justify-center"
                          :class="
                            resource.isNew
                              ? 'bg-[#1AB24F]/[0.12] text-[#159447] dark:bg-[#1AB24F]/20 dark:text-[#5EE38F]'
                              : 'bg-[#F3F4F6] text-[#6B7280] dark:bg-white/[0.06] dark:text-[#C9C9C9]'
                          "
                        >
                          <component :is="resource.icon" />
                        </span>
                        <span class="flex flex-col min-w-0 flex-1">
                          <span
                            class="flex items-center gap-2 text-[13px] sm:text-[16px] font-[500] text-[#4B5563] dark:text-[#E5E7EB]"
                          >
                            {{ $t(`nav.resource_items.${resource.key}.title`) }}
                            <span
                              v-if="resource.isNew"
                              class="rounded-full bg-[#1AB24F] px-1.5 py-[1px] text-[9px] font-[700] tracking-[0.06em] text-white"
                              >{{ $t("nav.newBadge") }}</span
                            >
                          </span>
                          <span
                            class="text-[11px] sm:text-[13px] text-[#8E98A8] leading-snug"
                            >{{
                              $t(`nav.resource_items.${resource.key}.desc`)
                            }}</span
                          >
                        </span>
                      </div>
                    </Navlink>
                  </div>
                </transition>
              </div>

              <div class="w-full h-auto">
                <Navlink href="/services">
                  <p
                    class="text-[#374151] dark:text-[#FAFAFA] font-[500] text-[16px] sm:text-[18px]"
                  >
                    {{ $t("nav.services") }}
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
          <div
            class="w-16 h-16 rounded-full bg-[#ADF9C5] dark:bg-[#2AB857]/20 flex items-center justify-center text-4xl"
          >
            🚧
          </div>

          <h2 class="text-[20px] font-[700] text-[#374151] dark:text-white">
            {{ $t("underConstruction.title") }}
          </h2>
          <p class="text-[14px] text-[#9CA3AF] text-center dark:text-[#D1D5DB]">
            {{ $t("underConstruction.description") }}
          </p>

          <button
            @click="showUnderConstructionModal = false"
            class="mt-2 px-6 py-2 bg-[#2AB857] hover:bg-[#22a04a] text-white text-[14px] font-[600] rounded-xl transition-colors duration-200"
          >
            {{ $t("underConstruction.close") }}
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
