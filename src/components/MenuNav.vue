<script setup>
import { ref } from "vue";
import { useScrollStore } from "@/stores/scroll";
import { useRoute } from "vue-router";
import Navlink from "@/components/Navlink.vue";

const { isScrolled } = useScrollStore();
const route = useRoute();
const isHoveringProduct = ref(false);
</script>

<template>
  <ul
    :class="[
      'flex items-center text-md font-medium text-[#374151]',
      isScrolled ? 'lg:gap-[60px]' : 'lg:gap-[45px] justify-center',
    ]"
  >
    <li>
      <Navlink href="/"> Home </Navlink>
    </li>
    <li>
      <Navlink href="/about"> About </Navlink>
    </li>

    <li
      class="relative list-none"
      @mouseenter="isHoveringProduct = true"
      @mouseleave="isHoveringProduct = false"
    >
      <span class="relative inline-block text-animate-hover hover:font-bold">
        Products ▾
      </span>
    </li>

    <!-- Dropdown bebas posisi -->
    <div
      v-if="isHoveringProduct"
      @mouseenter="isHoveringProduct = true"
      @mouseleave="isHoveringProduct = false"
      :class="[
        'absolute z-50 w-auto h-auto left-[350px] top-[70px]',
        isScrolled ? '-mt-4 pt-8 ' : 'mt-0 pt-5 ',
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
      class="relative list-none"
      @mouseenter="isHoveringProduct = true"
      @mouseleave="isHoveringProduct = false"
    >
      <span class="relative inline-block text-animate-hover hover:font-bold">
        Technology ▾
      </span>
    </li>

    <!-- Dropdown bebas posisi -->
    <div
      v-if="isHoveringProduct"
      @mouseenter="isHoveringProduct = true"
      @mouseleave="isHoveringProduct = false"
      :class="[
        'absolute z-50 w-auto h-auto left-[350px] top-[70px]',
        isScrolled ? '-mt-4 pt-8 ' : 'mt-0 pt-5 ',
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

    <!-- Tambahan menu lainnya -->
    <li>
      <Navlink href="#"> Teams </Navlink>
    </li>
    <li>
      <Navlink href="#"> Blogs </Navlink>
    </li>
    <li>
      <Navlink href="#"> Services </Navlink>
    </li>
    <li>
      <Navlink href="#"> Contact </Navlink>
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
