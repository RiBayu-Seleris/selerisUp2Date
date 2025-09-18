<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import { useScrollStore } from "@/stores/scroll";
import { useRoute } from "vue-router";
import Navlink from "@/components/Navlink.vue";
import { productList } from "@/Data/productList";
import { aboutList } from "@/Data/aboutList";
import { technologyList } from "@/Data/technologyList";
import { usecaseList } from "@/Data/usecaseList";
import { industryList } from "@/Data/industryList";

// const { isScrolled } = useScrollStore();
const route = useRoute();
const isHoveringAbout = ref(false);
const isHoveringProduct = ref(false);
const isHoveringTechnology = ref(false);
const isHoveringSolution = ref(false);

const isScrolled = ref(false);

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
  <ul
    :class="[
      'flex items-center text-md font-[400] text-[#374151] transition-all duration-500 ease-in',
      isScrolled
        ? 'lg:gap-[25px] xl:gap-[45px] xls:gap-[55px] dark:text-[#DEDEDE] '
        : 'lg:gap-[35px] xl:gap-[55px] xls:gap-[70px] justify-center dark:text-[#DEDEDE]',
    ]"
  >
    <li>
      <Navlink class="text-[12pt] lg:text-[10pt] xl:text-[12pt]" href="/">
        Home
      </Navlink>
    </li>

    <!-- ABOUT MENU -->
    <li
      class="relative list-none cursor-pointer"
      @mouseenter="isHoveringAbout = true"
      @mouseleave="isHoveringAbout = false"
    >
      <!-- Trigger -->
      <span
        class="relative inline-block text-animate-hover dark:dark-text-animate-hover hover:font-bold text-[12pt] lg:text-[10pt] xl:text-[12pt]"
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
          class="flex flex-col w-auto bg-white p-4 rounded-2xl shadow-lg gap-5 dark:bg-black/40 dark:backdrop-blur-3xl dark:border-[0.1px] dark:border-[#FAFAFA]/25"
        >
          <Navlink
            v-for="(about, index) in aboutList"
            :key="index"
            :href="about.url"
            class="flex justify-center items-center w-[300px]"
          >
            <span class="text-[15px] font-[500]">{{ about.name }}</span>
          </Navlink>
        </div>
      </div>
    </li>

    <!-- PRODUCTS MENU -->
    <li
      class="relative list-none cursor-pointer"
      @mouseenter="isHoveringProduct = true"
      @mouseleave="isHoveringProduct = false"
    >
      <!-- Trigger -->
      <span
        class="relative inline-block text-animate-hover dark:dark-text-animate-hover hover:font-bold text-[12pt] lg:text-[10pt] xl:text-[12pt]"
      >
        Products ▾
      </span>

      <!-- Dropdown -->
      <div
        v-if="isHoveringProduct"
        @mouseenter="isHoveringProduct = true"
        @mouseleave="isHoveringProduct = false"
        :class="[
          `absolute left-0 top-full z-50 w-max h-auto`,
          isScrolled ? 'pt-8' : 'pt-8',
        ]"
      >
        <div
          class="w-full h-auto flex flex-col bg-white p-8 rounded-2xl shadow-lg dark:bg-[#2C2C2C80] dark:bg-clip-padding dark:backdrop-filter dark:backdrop-blur-sm dark:bg-opacity-20 dark:border-[0.1px] dark:border-[#FAFAFA]/25"
        >
          <!-- Title -->
          <div class="w-full h-auto flex mb-6">
            <p class="text-[#4B5563] dark:text-white font-[500] lg:text-[18px]">
              Seleris Products
            </p>
          </div>
          <div class="grid grid-cols-3 w-auto gap-5">
            <Navlink
              v-for="(product, index) in productList"
              :key="index"
              target="_blank"
              :href="product.url"
              class="flex justify-center items-center w-[170px]"
            >
              <span class="text-[#9CA3AF] dark:text-[#FAFAFA] font-[400]">
                {{ product.name }}
              </span>
            </Navlink>
          </div>
        </div>
      </div>
    </li>

    <!-- TECHNOLOGY MENU -->
    <li
      class="relative list-none cursor-pointer"
      @mouseenter="isHoveringTechnology = true"
      @mouseleave="isHoveringTechnology = false"
    >
      <!-- Trigger -->
      <span
        class="relative inline-block text-animate-hover dark:dark-text-animate-hover hover:font-bold text-[12pt] lg:text-[10pt] xl:text-[12pt]"
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
          class="flex flex-col w-auto bg-white p-4 rounded-2xl shadow-lg gap-5 dark:bg-[#2C2C2C80] dark:bg-clip-padding dark:backdrop-filter dark:backdrop-blur-sm dark:bg-opacity-20 dark:border-[0.1px] dark:border-[#FAFAFA]/25"
        >
          <Navlink
            v-for="(technology, index) in technologyList"
            :key="index"
            :href="technology.url"
            class="flex justify-center items-center w-[300px]"
          >
            <span class="text-[15px] font-[500]">{{ technology.name }}</span>
          </Navlink>
        </div>
      </div>
    </li>

    <!-- SOLUTIONS MENU -->
    <li
      class="relative list-none cursor-pointer"
      @mouseenter="isHoveringSolution = true"
      @mouseleave="isHoveringSolution = false"
    >
      <!-- Trigger -->
      <span
        class="relative inline-block text-animate-hover dark:dark-text-animate-hover hover:font-bold text-[12pt] lg:text-[10pt] xl:text-[12pt]"
      >
        Solutions ▾
      </span>

      <!-- Dropdown -->
      <div
        v-if="isHoveringSolution"
        @mouseenter="isHoveringSolution = true"
        @mouseleave="isHoveringSolution = false"
        :class="[`absolute left-0 top-full z-50`, isScrolled ? 'pt-8' : 'pt-8']"
      >
        <div
          class="flex flex-row w-full bg-white p-8 rounded-2xl shadow-lg dark:bg-[#2C2C2C80] dark:bg-clip-padding dark:backdrop-filter dark:backdrop-blur-sm dark:bg-opacity-20 dark:border-[0.1px] dark:border-[#FAFAFA]/25"
        >
          <div class="w-[250px] flex flex-col h-auto">
            <div class="w-full h-auto mb-3">
              <span
                class="lg:text-[18px] text-[#4B5563] dark:text-white font-[500]"
                >Use Case</span
              >
            </div>
            <div class="w-full h-auto flex flex-col gap-y-2">
              <Navlink
                v-for="(usecase, index) in usecaseList"
                :key="index"
                :href="usecase.url"
                class="flex justify-center items-center"
              >
                <span
                  class="text-[15px] text-[#9CA3AF] dark:text-[#FAFAFA] font-[400]"
                  >{{ usecase.name }}</span
                >
              </Navlink>
            </div>
          </div>
          <div class="w-[250px] flex flex-col h-auto">
            <div class="w-full h-auto mb-3">
              <span
                class="lg:text-[18px] text-[#4B5563] dark:text-white font-[500]"
                >Industries</span
              >
            </div>
            <div class="w-full h-auto flex flex-col gap-y-2">
              <Navlink
                v-for="(industry, index) in industryList"
                :key="index"
                :href="industry.url"
                class="flex justify-center items-center"
              >
                <span
                  class="text-[15px] text-[#9CA3AF] dark:text-[#FAFAFA] font-[400]"
                  >{{ industry.name }}</span
                >
              </Navlink>
            </div>
          </div>
        </div>
      </div>
    </li>

    <!-- Tambahan menu lainnya -->
    <li>
      <Navlink class="text-[12pt] lg:text-[10pt] xl:text-[12pt]" href="/blogs">
        Blogs
      </Navlink>
    </li>
    <li>
      <Navlink
        class="text-[12pt] lg:text-[10pt] xl:text-[12pt]"
        href="/services"
      >
        Services
      </Navlink>
    </li>
    <li>
      <Navlink
        class="text-[12pt] lg:text-[10pt] xl:text-[12pt]"
        href="/contact"
      >
        Contact
      </Navlink>
    </li>
  </ul>
</template>
