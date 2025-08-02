<script setup>
import { ref } from "vue";
import { useScrollStore } from "@/stores/scroll";
import { useRoute } from "vue-router";
import Navlink from "@/components/Navlink.vue";

const { isScrolled } = useScrollStore();
const route = useRoute();
</script>

<template>
  <ul
    :class="[
      'flex items-center text-md font-[400]  ',
      isScrolled
        ? 'lg:gap-[20px] xl:gap-[50px] text-[#374151] font-semibold '
        : 'lg:gap-[25px] 2lg:gap-[45px] xl:gap-[63px] 2xl:gap-[70px] justify-center text-[#FAFAFA]',
    ]"
  >
    <li>
      <Navlink class="text-[11pt]" href="/"> Home </Navlink>
    </li>
    <!-- Tambahan menu lainnya -->
    <li>
      <Navlink class="text-[11pt]" href="#"> About </Navlink>
    </li>
    <li>
      <Navlink class="text-[11pt]" href="#"> Testimonial </Navlink>
    </li>
    <li>
      <Navlink class="text-[11pt]" href="#"> FAQ </Navlink>
    </li>
    <li>
      <Navlink class="text-[11pt]" href="#"> Contact </Navlink>
    </li>
  </ul>
</template>
