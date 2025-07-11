<script setup>
import { ref } from "vue";
import { useScrollStore } from "@/stores/scroll";
import { useRoute } from "vue-router";
import Navlink from "@/components/Navlink.vue";

const { isScrolled } = useScrollStore();
const route = useRoute();
const isHoveringProduct = ref(false);
const isHoveringTechnology = ref(false);
</script>

<template>
  <ul
    :class="[
      'flex items-center text-md font-[400] text-[#374151]',
      isScrolled
        ? 'lg:gap-[20px] xl:gap-[50px] '
        : 'lg:gap-[20px] 2lg:gap-[30px] xl:gap-[40px] 2xl:gap-[60px] justify-center',
    ]"
  >
    <li class="">
      <Navlink class="text-[11pt]" href="/"> Home </Navlink>
    </li>
    <li class="">
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
        isScrolled ? '-mt-4 pt-8 ' : 'mt-0 lg:-mt-1 pt-5  ',
      ]"
    >
      <div
        class="grid grid-cols-3 w-auto bg-white p-4 rounded-2xl shadow-lg gap-5"
      >
        <Navlink href="#" class="flex justify-center items-center w-[170px]">
          <span> Seleris Lifins</span>
        </Navlink>
        <Navlink href="#" class="flex justify-center items-center w-[170px]">
          <span> Seleris Medins</span>
        </Navlink>
        <Navlink href="#" class="flex justify-center items-center w-[170px]">
          <span> Seleris Credit Cover</span>
        </Navlink>
        <Navlink href="#" class="flex justify-center items-center w-[170px]">
          <span> Seleris Care</span>
        </Navlink>
        <Navlink href="#" class="flex justify-center items-center w-[170px]">
          <span> Flexa Asia</span>
        </Navlink>
        <Navlink href="#" class="flex justify-center items-center w-[170px]">
          <span> Auto Claim</span>
        </Navlink>
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
        'absolute z-50 w-auto h-auto left-[580px] top-[70px] ',
        isScrolled ? '-mt-4 pt-8 ' : 'mt-0 lg:-mt-1 pt-5 ',
      ]"
    >
      <div
        class="flex flex-col w-auto bg-white p-4 rounded-2xl shadow-lg gap-5"
      >
        <Navlink href="#" class="flex justify-center items-center w-[300px]">
          <span>Seleris Chromatic Imaging</span>
        </Navlink>
        <Navlink href="#" class="flex justify-center items-center w-[300px]">
          <span>Seleris DeepVitals</span>
        </Navlink>
        <Navlink href="#" class="flex justify-center items-center w-[300px]">
          <span>Seleris DeepRisk</span>
        </Navlink>
      </div>
    </div>

    <!-- Tambahan menu lainnya -->
    <li class="">
      <Navlink class="text-[11pt]" href="/teams"> Our Team </Navlink>
    </li>
    <li class="">
      <Navlink class="text-[11pt]" href="/blogs"> Blogs </Navlink>
    </li>
    <li class="">
      <Navlink class="text-[11pt]" href="/services"> Services </Navlink>
    </li>
    <li class="">
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
