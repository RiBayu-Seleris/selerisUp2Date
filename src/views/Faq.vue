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
    <div class="w-full max-w-[1024px] mx-auto mt-20">
      <div class="grid md:grid-cols-2 gap-6 items-start">
        <div
          v-for="(faq, index) in faqList"
          :key="index"
          class="border rounded-lg shadow-sm transition-all"
        >
          <button
            class="w-full flex flex-row gap-x-5 items-center px-6 py-4"
            @click="toggle(index)"
          >
            <span class="text-xl">
              <span v-if="openedIndex === index" class="text-green-600">−</span>
              <span v-else class="text-blue-600">+</span>
            </span>
            <span
              :class="
                openedIndex === index
                  ? 'text-green-600 font-medium'
                  : 'text-gray-700 font-medium'
              "
            >
              {{ faq.question }}
            </span>
          </button>
          <div
            v-if="openedIndex === index"
            class="px-6 pb-4 text-gray-500 text-sm"
          >
            {{ faq.answer }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
