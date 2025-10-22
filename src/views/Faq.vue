<script setup>
import HeroText from "@/components/reusable/HeroText.vue";

import { ref } from "vue";
import { faqList } from "@/Data/faqList.js";

import FaqFrame from "@productComponents/FaqFrame.vue";

const openedIndex = ref(null);

const toggle = (index) => {
  openedIndex.value = openedIndex.value === index ? null : index;
};
</script>

<template>
  <section
    class="flex relative w-full h-auto md:px-12 xl:px-14 bg-[radial-gradient(ellipse_at_top,_#3CFF7A_-70%,_#FAFAFA_60%)] dark:bg-[radial-gradient(ellipse_at_top,_#3CFF7A_-70%,_#17181A_40%)]"
  >
    <div class="flex w-full h-auto xl:pt-[160px] md:pt-[100px] sml:pt-[90px]">
      <div
        class="flex flex-col w-full h-auto space-y-2 sm:space-y-0 md:space-y-0 lg:space-y-3 xl:space-y-2 justify-center items-center"
      >
        <p
          class="text-[24px] sm:text-[24px] md:text-[34px] lg:text-[38px] xl:text-[40px] font-[500] tracking-tight text-[#1AB24F] text-center"
        >
          FAQ
        </p>
        <p
          class="text-[20px] sm:text-[22px] md:text-[36px] lg:text-[44px] xl:text-[52px] font-[500] lg:tracking-wide xl:tracking-normal text-[#195279] text-center dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-br dark:from-[#FAFAFA] dark:via-[#D4D4D4] dark:to-[#AAAAAA]"
        >
          Frequently Asked Questions
        </p>
        <p
          class="text-[14px] md:text-[18px] lg:text-[18px] xl:text-[18px] font-[400] tracking-wider text-[#89A6BA] dark:text-[#6F6F6F] sml:px-8 md:px-0 lg:px-32 xl:px-52 text-center"
        >
          Find answers to frequently asked questions about the seleris app
          below.
        </p>
      </div>
    </div>
  </section>
  <section>
    <div class="w-full mx-auto mt-20">
      <FaqFrame
        :Faq="faqList"
        opencolortext="text-[#2AB857]"
        class="lg:!max-w-4xl xl:!max-w-7xl"
      />
    </div>
  </section>
</template>
