<script setup>
import { ref } from "vue";
import { useScrollStore } from "@/stores/scroll";
import { useRoute } from "vue-router";
import Navlink from "@/components/Navlink.vue";

const { isScrolled } = useScrollStore();
const route = useRoute();
const isHoveringAbout = ref(false);
const isHoveringProduct = ref(false);
const isHoveringTechnology = ref(false);

const products = [
  {
    url: "/",
    name: "Seleris Lifins",
  },
  {
    url: "/",
    name: "Seleris Medins",
  },
  {
    url: "/",
    name: "Seleris Credit Cover",
  },
  {
    url: "/",
    name: "Seleris Care",
  },
  {
    url: "/",
    name: "Flexa Asia",
  },
  {
    url: "/",
    name: "Auto Claim",
  },
];
</script>

<template>
  <ul
    :class="[
      'flex items-center text-md font-[400] text-[#374151] ',
      isScrolled
        ? 'lg:gap-[20px] xl:gap-[50px] dark:text-[#989898] '
        : 'lg:gap-[25px] 2lg:gap-[45px] xl:gap-[63px] 2xl:gap-[70px] justify-center dark:text-[#989898]',
    ]"
  >
    <li>
      <Navlink class="text-[11pt]" href="/"> Home </Navlink>
    </li>
    <li
      class="relative list-none cursor-pointer"
      @mouseenter="isHoveringAbout = true"
      @mouseleave="isHoveringAbout = false"
    >
      <span
        class="relative inline-block text-animate-hover dark:dark-text-animate-hover hover:font-bold text-[11pt]"
      >
        About ▾
      </span>
    </li>

    <!-- Dropdown bebas posisi -->
    <div
      v-if="isHoveringAbout"
      @mouseenter="isHoveringAbout = true"
      @mouseleave="isHoveringAbout = false"
      :class="[
        'absolute z-50 w-auto h-auto lg:left-[200px] xl:left-[300px] top-[70px] ',
        isScrolled ? 'mt-2 lg:-mt-6 xl:-mt-5 pt-10' : 'mt-0 lg:-mt-2 pt-5 ',
      ]"
    >
      <div
        class="flex flex-col w-auto bg-white p-4 rounded-2xl shadow-lg gap-5 dark:bg-[#2C2C2C80] dark:bg-clip-padding dark:backdrop-filter dark:backdrop-blur-sm dark:bg-opacity-10 dark:border-[0.2px] dark:shadow-none"
      >
        <Navlink
          href="/about"
          class="flex justify-center items-center w-[300px]"
        >
          <span>Company</span>
        </Navlink>
        <Navlink href="#" class="flex justify-center items-center w-[300px]">
          <span>Innovations</span>
        </Navlink>
      </div>
    </div>

    <li
      class="relative list-none cursor-pointer"
      @mouseenter="isHoveringProduct = true"
      @mouseleave="isHoveringProduct = false"
    >
      <span
        class="relative inline-block text-animate-hover dark:dark-text-animate-hover hover:font-bold text-[11pt]"
      >
        Products ▾
      </span>
    </li>

    <!-- Dropdown bebas posisi -->
    <div
      v-if="isHoveringProduct"
      @mouseenter="isHoveringProduct = true"
      @mouseleave="isHoveringProduct = false"
      :class="[
        'absolute z-50 w-auto h-auto lg:left-[300px] xl:left-[400px] top-[70px]',
        isScrolled ? 'mt-2 lg:-mt-6 xl:-mt-5 pt-10' : 'mt-0 lg:-mt-2 pt-5 ',
      ]"
    >
      <div
        class="w-full h-auto flex flex-col bg-white p-8 rounded-2xl shadow-lg dark:bg-[#2C2C2C80] dark:bg-clip-padding dark:backdrop-filter dark:backdrop-blur-sm dark:bg-opacity-10 dark:border-[0.2px] dark:shadow-none"
      >
        <div class="w-full h-auto flex mb-6">
          <p class="text-[#4B5563] dark:text-white font-[500] lg:text-[18px]">
            Seleris Products
          </p>
        </div>
        <div class="grid grid-cols-3 w-auto gap-5">
          <Navlink
            v-for="(product, index) in products"
            :key="index"
            :href="product.url"
            class="flex justify-center items-center w-[170px]"
          >
            <span class="text-[#9CA3AF] dark:text-[#FAFAFA] font-[400]">{{
              product.name
            }}</span>
          </Navlink>
        </div>
      </div>
    </div>

    <li
      class="relative list-none cursor-pointer"
      @mouseenter="isHoveringTechnology = true"
      @mouseleave="isHoveringTechnology = false"
    >
      <span
        class="relative inline-block text-animate-hover dark:dark-text-animate-hover hover:font-bold text-[11pt]"
      >
        Technology ▾
      </span>
    </li>

    <!-- Dropdown bebas posisi -->
    <div
      v-if="isHoveringTechnology"
      @mouseenter="isHoveringTechnology = true"
      @mouseleave="isHoveringTechnology = false"
      :class="[
        'absolute z-50 w-auto h-auto left-[560px] lg:left-[380px] xl:left-[500px] top-[70px] ',
        isScrolled ? 'mt-2 lg:-mt-6 xl:-mt-5 pt-10' : 'mt-0 lg:-mt-2 pt-5 ',
      ]"
    >
      <div
        class="flex flex-col w-auto bg-white p-4 rounded-2xl shadow-lg gap-5 dark:bg-[#2C2C2C80] dark:bg-clip-padding dark:backdrop-filter dark:backdrop-blur-sm dark:bg-opacity-10 dark:border-[0.2px] dark:shadow-none"
      >
        <Navlink
          href="/seleris-chromatic-imaging"
          class="flex justify-center items-center w-[300px]"
        >
          <span>Seleris Chromatic Imaging</span>
        </Navlink>
        <Navlink
          href="/seleris-deep-vitals"
          class="flex justify-center items-center w-[300px]"
        >
          <span>Seleris DeepVitals</span>
        </Navlink>
        <Navlink
          href="/seleris-deep-risk"
          class="flex justify-center items-center w-[300px]"
        >
          <span>Seleris DeepRisk</span>
        </Navlink>
      </div>
    </div>

    <!-- Tambahan menu lainnya -->
    <li>
      <Navlink class="text-[11pt]" href="/teams"> Our Team </Navlink>
    </li>
    <li>
      <Navlink class="text-[11pt]" href="/blogs"> Blogs </Navlink>
    </li>
    <li>
      <Navlink class="text-[11pt]" href="/services"> Services </Navlink>
    </li>
    <li>
      <Navlink class="text-[11pt]" href="/contact"> Contact </Navlink>
    </li>
  </ul>
</template>
