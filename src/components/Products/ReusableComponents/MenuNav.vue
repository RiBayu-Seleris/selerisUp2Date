<script setup>
import { ref } from "vue";
import { useScrollStore } from "@/stores/scroll";
import { useRoute } from "vue-router";
import Navlink from "@productComponents/Navlink.vue";

const { isScrolled } = useScrollStore();
const route = useRoute();

const isSelerisCredit = ref(route.path === "/product/seleris-credit");
</script>

<template>
  <ul
    :class="[
      'flex items-center text-md font-[400]  ',
      isScrolled
        ? 'lg:gap-[20px] xl:gap-[50px] text-[#717171] font-[500] '
        : isSelerisCredit
        ? 'lg:gap-[25px] 2lg:gap-[45px] xl:gap-[63px] 2xl:gap-[70px] justify-center text-[#374151]'
        : 'lg:gap-[25px] 2lg:gap-[45px] xl:gap-[63px] 2xl:gap-[70px] justify-center text-[#FAFAFA]',
    ]"
  >
    <li>
      <Navlink class="text-[11pt]" href="#hero"> Home </Navlink>
    </li>
    <!-- Tambahan menu lainnya -->
    <li>
      <Navlink class="text-[11pt]" href="#about"> About </Navlink>
    </li>
    <li>
      <Navlink class="text-[11pt]" href="#testimonial"> Testimonial </Navlink>
    </li>
    <li>
      <Navlink class="text-[11pt]" href="#faq"> FAQ </Navlink>
    </li>
    <li>
      <Navlink class="text-[11pt]" href="/contact"> Contact </Navlink>
    </li>
  </ul>
</template>
