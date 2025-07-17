<script setup>
import { ref } from "vue";
import { useScrollStore } from "@/stores/scroll";
import { useRoute } from "vue-router";
import Navlink from "@/components/Navlink.vue";

const { isScrolled } = useScrollStore();
const route = useRoute();
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
        ? 'lg:gap-[20px] xl:gap-[50px] dark:text-white '
        : 'lg:gap-[25px] 2lg:gap-[45px] xl:gap-[63px] 2xl:gap-[70px] justify-center dark:text-white',
    ]"
  >
    <li>
      <Navlink class="text-[11pt]" href="/"> Home </Navlink>
    </li>
    <li>
      <Navlink class="text-[11pt]" href="/about"> About </Navlink>
    </li>

    <li
      class="relative list-none cursor-pointer"
      @mouseenter="isHoveringProduct = true"
      @mouseleave="isHoveringProduct = false"
    >
      <span
        class="relative inline-block text-animate-hover hover:font-bold text-[11pt]"
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
        'absolute z-50 w-auto h-auto xl:left-[350px] lg:left-[200px] top-[70px]',
        isScrolled ? 'mt-2 lg:-mt-6 xl:-mt-5 pt-10' : 'mt-0 lg:-mt-2 pt-5 ',
      ]"
    >
      <div
        class="w-full h-auto flex flex-col bg-white p-8 rounded-2xl shadow-lg dark:bg-green-300 dark:bg-clip-padding dark:backdrop-filter dark:backdrop-blur-sm dark:bg-opacity-10 dark:border-[0.2px] dark:shadow-none"
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
            <span class="text-[#9CA3AF]">{{ product.name }}</span>
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
        class="relative inline-block text-animate-hover hover:font-bold text-[11pt]"
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
        'absolute z-50 w-auto h-auto left-[560px] lg:left-[360px] xl:left-[500px] top-[70px] ',
        isScrolled ? 'mt-2 lg:-mt-6 xl:-mt-5 pt-10' : 'mt-0 lg:-mt-2 pt-5 ',
      ]"
    >
      <div
        class="flex flex-col w-auto bg-white p-4 rounded-2xl shadow-lg gap-5 dark:bg-green-300 dark:bg-clip-padding dark:backdrop-filter dark:backdrop-blur-sm dark:bg-opacity-10 dark:border-[0.2px] dark:shadow-none"
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
<style scoped>
.text-animate-hover {
  position: relative;
  display: inline-block;
  background-image: linear-gradient(to right, #18ab53 0%, #18ab53 100%);
  background-size: 0% 100%;
  background-repeat: no-repeat;
  background-position: left;
  -webkit-background-clip: text;
  background-clip: text;
  transition: background-size 0.5s ease, -webkit-text-fill-color 0.5s ease;
}

.text-animate-hover:hover {
  background-size: 100% 100%;
  -webkit-text-fill-color: transparent;
}
</style>
