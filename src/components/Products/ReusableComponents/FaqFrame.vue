<script setup>
import { ref } from "vue";

const props = defineProps({
  medinsFaq: {
    type: Array,
    required: true,
  },
});

const openedIndex = ref(null);
const toggle = (index) => {
  openedIndex.value = openedIndex.value === index ? null : index;
};
</script>

<template>
  <div
    class="w-full h-auto lg:max-w-6xl mx-auto grid md:grid-cols-2 px-8 lg:px-0 gap-y-5 gap-x-10 items-start"
  >
    <div
      v-for="(faq, index) in props.medinsFaq"
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
                ? 'text-[#2AB857] font-[500] '
                : 'text-[#195279] dark:text-[#FAFAFA] font-[500] text-[14px] md:text-[17px] text-start'
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
</template>
