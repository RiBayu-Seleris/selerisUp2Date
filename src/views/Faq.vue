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
      <HeroText
        title="FAQ"
        subtitle="Frequently Asked Questions"
        description="Find answers to frequently asked questions about the seleris app below."
      />
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
