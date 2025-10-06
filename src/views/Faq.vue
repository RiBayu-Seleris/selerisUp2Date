<script setup>
import HeroText from "@/components/reusable/HeroText.vue";

import { ref } from "vue";
import { faqList } from "@/Data/faqList.js";

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
      <div
        class="flex flex-col lg:grid lg:md:grid-cols-2 gap-6 items-start px-8 lg:px-8"
      >
        <div
          v-for="(faq, index) in faqList"
          :key="index"
          class="w-full h-auto p-[0.7px] rounded-lg dark:bg-gradient-to-tr dark:from-[#565656] from-0% dark:to-[#BCBCBC]"
        >
          <div
            class="w-full rounded-lg shadow-md transition-all bg-[#FFFFFF] dark:bg-[#323232]"
          >
            <button
              class="w-full flex flex-row gap-x-5 items-center px-6 py-4"
              @click="toggle(index)"
            >
              <span class="text-xl">
                <span
                  v-if="openedIndex === index"
                  class="text-[#2AB857] dark:text-[#52BD95]"
                  >−</span
                >
                <span v-else class="text-[#195279] dark:text-[#FAFAFA]">+</span>
              </span>
              <span
                :class="
                  openedIndex === index
                    ? 'text-[#2AB857] font-medium'
                    : 'text-[#195279] dark:text-[#FAFAFA] font-medium'
                "
              >
                {{ faq.question }}
              </span>
            </button>
            <div
              v-if="openedIndex === index"
              class="px-6 pb-4 text-[#363049] dark:text-[#FFFFFF] text-sm"
              v-html="faq.answer"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
