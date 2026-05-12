<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import { useScrollStore } from "@/stores/scroll";
import { useRoute } from "vue-router";
import Navlink from "@/components/Navlink.vue";
import { productList } from "@/Data/productList";
import { aboutList } from "@/Data/AboutList";
import { technologyList } from "@/Data/technologyList";
import { SolutionLists } from "@/Data/SolutionLists";
import ArrowRight from "@/components/icons/ArrowRight.vue";

// const { isScrolled } = useScrollStore();
const route = useRoute();
const isHoveringAbout = ref(false);
const isHoveringProduct = ref(false);
const isHoveringTechnology = ref(false);
const isHoveringSolution = ref(false);
const showUnderConstructionModal = ref(false);
const isScrolled = ref(false);

// Di dalam setup() atau <script setup>
const isHovered = ref(null);

const isDark = ref(document.documentElement.classList.contains("dark"));

const observer = new MutationObserver(() => {
  isDark.value = document.documentElement.classList.contains("dark");
});

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50;
};

onMounted(() => {
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  observer.disconnect();
  window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
  <ul
    :class="[
      'flex items-start text-md font-[400] text-[#374151] transition-all duration-500 ease-in',
      isScrolled
        ? 'lg:gap-[25px] xl:gap-[45px] xls:gap-[55px] dark:text-[#DEDEDE] '
        : 'lg:gap-[35px] xl:gap-[55px] xls:gap-[70px] justify-start dark:text-[#DEDEDE]',
    ]"
  >
    <li>
      <Navlink
        class="text-[12pt] lg:text-[10pt] xl:text-[12pt] font-[500] text-animate-hover dark:dark-text-animate-hover"
        href="/"
      >
        Home
      </Navlink>
    </li>

    <!-- ABOUT MENU -->
    <li
      class="relative list-none"
      @mouseenter="isHoveringAbout = true"
      @mouseleave="isHoveringAbout = false"
    >
      <!-- Trigger -->
      <span
        class="cursor-pointer relative inline-block text-animate-hover dark:dark-text-animate-hover font-[500] text-[12pt] lg:text-[10pt] xl:text-[12pt]"
      >
        About ▾
      </span>

      <!-- Dropdown -->
      <div
        v-if="isHoveringAbout"
        @mouseenter="isHoveringAbout = true"
        @mouseleave="isHoveringAbout = false"
        :class="[`absolute left-0 top-full z-50`, isScrolled ? 'pt-8' : 'pt-8']"
      >
        <div
          class="w-full h-auto p-[1px] dark:bg-gradient-to-r dark:from-[#565656]/0 dark:to-[#BCBCBC]/50 rounded-2xl shadow-lg"
        >
          <div
            class="flex flex-col w-auto bg-white p-4 rounded-2xl shadow-lg gap-5 dark:bg-[#1D2426]"
          >
            <Navlink
              v-for="(about, index) in aboutList"
              :key="index"
              :href="about.url"
              class="flex justify-start items-start text-start w-[300px] text-animate-hover dark:dark-text-animate-hover"
            >
              <span
                class="text-[15px] font-[500] text-[#9CA3AF] dark:text-[#FAFAFA]"
                >{{ about.name }}</span
              >
            </Navlink>
          </div>
        </div>
      </div>
    </li>

    <!-- PRODUCTS MENU -->
    <li
      class="relative list-none"
      @mouseenter="isHoveringProduct = true"
      @mouseleave="isHoveringProduct = false"
    >
      <!-- Trigger -->
      <span
        class="cursor-pointer relative inline-block text-animate-hover dark:dark-text-animate-hover font-[500] text-[12pt] lg:text-[10pt] xl:text-[12pt]"
      >
        Products ▾
      </span>

      <!-- Dropdown -->
      <div
        v-if="isHoveringProduct"
        @mouseenter="isHoveringProduct = true"
        @mouseleave="isHoveringProduct = false"
        :class="[`absolute left-0 top-full z-50`, isScrolled ? 'pt-8' : 'pt-8']"
      >
        <div
          class="w-full h-auto p-[1px] dark:bg-gradient-to-r dark:from-[#565656]/0 dark:to-[#BCBCBC]/50 rounded-2xl shadow-lg"
        >
          <div
            class="flex flex-col w-auto bg-white p-4 rounded-2xl shadow-lg gap-5 dark:bg-[#1D2426]"
          >
            <Navlink
              v-for="(product, index) in productList"
              :key="index"
              :href="product.url"
              class="flex justify-start items-start text-start w-[300px] text-animate-hover dark:dark-text-animate-hover"
            >
              <span
                class="text-[15px] font-[500] text-[#9CA3AF] dark:text-[#FAFAFA]"
                >{{ product.name }}</span
              >
            </Navlink>
          </div>
        </div>
      </div>
    </li>

    <!-- TECHNOLOGY MENU -->
    <li
      class="relative list-none"
      @mouseenter="isHoveringTechnology = true"
      @mouseleave="isHoveringTechnology = false"
    >
      <!-- Trigger -->
      <span
        class="cursor-pointer relative inline-block text-animate-hover dark:dark-text-animate-hover font-[500] text-[12pt] lg:text-[10pt] xl:text-[12pt]"
      >
        Technology ▾
      </span>

      <!-- Dropdown -->
      <div
        v-if="isHoveringTechnology"
        @mouseenter="isHoveringTechnology = true"
        @mouseleave="isHoveringTechnology = false"
        :class="[`absolute left-0 top-full z-50`, isScrolled ? 'pt-8' : 'pt-8']"
      >
        <div
          class="w-full h-auto p-[1px] dark:bg-gradient-to-r dark:from-[#565656]/0 dark:to-[#BCBCBC]/50 rounded-2xl shadow-lg"
        >
          <div
            class="flex flex-col w-auto bg-white p-4 rounded-2xl shadow-lg gap-5 dark:bg-[#1D2426]"
          >
            <Navlink
              v-for="(technology, index) in technologyList"
              :key="index"
              :href="technology.url"
              class="flex justify-start items-start text-start w-[300px] text-animate-hover dark:dark-text-animate-hover"
            >
              <span
                class="text-[15px] font-[500] text-[#9CA3AF] dark:text-[#FAFAFA]"
                >{{ technology.name }}</span
              >
            </Navlink>
          </div>
        </div>
      </div>
    </li>

    <!-- SOLUTIONS MENU -->
    <li
      class="relative list-none"
      @mouseenter="isHoveringSolution = true"
      @mouseleave="isHoveringSolution = false"
    >
      <!-- Trigger -->
      <span
        class="cursor-pointer relative inline-block text-animate-hover dark:dark-text-animate-hover font-[500] text-[12pt] lg:text-[10pt] xl:text-[12pt]"
      >
        Solutions ▾
      </span>

      <!-- Dropdown -->
      <div
        v-if="isHoveringSolution"
        @mouseenter="isHoveringSolution = true"
        @mouseleave="isHoveringSolution = false"
        :class="[
          `absolute lg:-left-[400px] xl:-left-[300px] top-full z-50 w-max h-auto`,
          isScrolled ? 'pt-8' : 'pt-8',
        ]"
      >
        <div
          class="w-full h-auto p-[1px] bg-gradient-to-r from-[#565656]/0 to-[#BCBCBC]/30 rounded-2xl shadow-lg"
        >
          <!-- Ini saat tidak underconstruction -->
          <div
            class="w-full h-auto flex flex-col bg-white py-6 px-5 rounded-2xl dark:bg-[#1D2426]"
          >
            <div class="w-full h-auto flex mb-4">
              <p
                class="text-[#4B5563] dark:text-white font-[500] lg:text-[18px]"
              >
                Solutions
              </p>
            </div>
            <div class="grid grid-cols-2 w-auto gap-3">
              <Navlink
                v-for="(solution, index) in SolutionLists"
                :key="index"
                :href="solution.url"
                class="flex justify-start items-start group transition-all duration-300"
              >
                <div
                  class="w-full h-auto flex flex-row gap-x-3 justify-center items-center p-2 rounded-md transition-colors duration-200"
                  :style="{
                    backgroundColor:
                      isHovered === index ? solution.bgColor + '40' : '',
                  }"
                  @mouseenter="isHovered = index"
                  @mouseleave="isHovered = null"
                >
                  <div class="w-fit h-auto flex justify-center items-start">
                    <div
                      class="w-9 h-9 rounded-md flex justify-center items-center p-2"
                      :style="{
                        backgroundColor: isDark
                          ? solution.darkBgColor
                          : solution.bgColor,
                        color: isDark
                          ? solution.darkIconColor
                          : solution.iconColor,
                      }"
                    >
                      <component :is="solution.icons" class="w-full h-full" />
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
                      class="text-[12px] font-[500] solution-text-animate"
                      :class="{ 'is-hovered': isHovered === index }"
                      :style="{
                        '--solution-color': solution.iconColor,
                      }"
                      >{{ solution.content }}</span
                    >
                  </div>
                  <div class="w-fit h-auto flex justify-center items-start">
                    <div
                      class="w-11 h-auto rounded-md flex justify-center items-center p-2"
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
                        <ArrowRight />
                      </span>
                    </div>
                  </div>
                </div>
              </Navlink>
            </div>
          </div>
        </div>
      </div>
    </li>

    <!-- Tambahan menu lainnya -->
    <li>
      <Navlink
        class="text-[12pt] lg:text-[10pt] xl:text-[12pt] text-animate-hover dark:dark-text-animate-hover font-[500]"
        href="/blogs"
      >
        Blogs
      </Navlink>
    </li>
    <li>
      <Navlink
        class="text-[12pt] lg:text-[10pt] xl:text-[12pt] text-animate-hover dark:dark-text-animate-hover font-[500]"
        href="/services"
      >
        Services
      </Navlink>
    </li>
    <li>
      <Navlink
        class="text-[12pt] lg:text-[10pt] xl:text-[12pt] text-animate-hover dark:dark-text-animate-hover font-[500]"
        href="/careers"
      >
        Careers
      </Navlink>
    </li>
  </ul>

  <!-- Under Construction Modal -->
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
