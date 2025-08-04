<script setup>
import { computed, ref } from "vue";

const props = defineProps({
  medinsFaq: {
    type: Array,
    required: true,
  },
});

const leftFaqs = computed(() => props.medinsFaq.filter((_, i) => i % 2 === 0));
const rightFaqs = computed(() => props.medinsFaq.filter((_, i) => i % 2 !== 0));

const openedIndex = ref([]);
const toggle = (key) => {
  if (openedIndex.value.includes(key)) {
    openedIndex.value = openedIndex.value.filter((item) => item !== key);
  } else {
    openedIndex.value.push(key);
  }
};

// Transition hooks
function beforeEnter(el) {
  el.style.height = "0";
  el.style.opacity = "0";
  el.style.paddingTop = "0";
  el.style.paddingBottom = "0";
}
function enter(el) {
  el.style.transition = "all 0.4s ease";
  el.style.height = el.scrollHeight + "px";
  el.style.opacity = "1";
  el.style.paddingTop = "0";
  el.style.paddingBottom = "5rem";
}
function leave(el) {
  el.style.transition = "all 0.4s ease";
  el.style.height = "0";
  el.style.opacity = "0";
  el.style.paddingTop = "0";
  el.style.paddingBottom = "0";
}

function afterEnter(el) {
  el.style.height = "full";
}
function afterLeave(el) {
  el.style.height = "0";
}
</script>

<template>
  <div
    class="w-full h-auto lg:max-w-6xl mx-auto grid md:grid-cols-2 gap-y-5 gap-x-10 px-8 lg:px-0 items-start"
  >
    <!-- Kolom Kiri -->
    <div class="flex flex-col gap-y-5">
      <div
        v-for="(faq, index) in leftFaqs"
        :key="`left-${index}`"
        class="w-full h-auto p-[0.7px] rounded-lg dark:bg-gradient-to-tr dark:from-[#565656] dark:to-[#BCBCBC]"
      >
        <div
          class="w-full rounded-lg shadow-md transition-all bg-[#FFFFFF] dark:bg-[#323232] overflow-visible"
        >
          <button
            class="w-full flex flex-row gap-x-5 items-center px-6 py-4"
            @click="toggle(`left-${index}`)"
          >
            <span class="text-xl">
              <span
                v-if="openedIndex.includes(`left-${index}`)"
                class="text-[#2AB857] dark:text-[#52BD95]"
                >−</span
              >
              <span v-else class="text-[#195279] dark:text-[#FAFAFA]">+</span>
            </span>
            <span
              :class="[
                'font-[500] text-start',
                openedIndex === `left-${index}`
                  ? 'text-[#2AB857]'
                  : 'text-[#195279] dark:text-[#FAFAFA] text-[14px] md:text-[17px]',
              ]"
            >
              {{ faq.question }}
            </span>
          </button>

          <Transition
            @before-enter="beforeEnter"
            @enter="enter"
            @after-enter="afterEnter"
            @leave="leave"
            @after-leave="afterLeave"
          >
            <div
              v-if="openedIndex.includes(`left-${index}`)"
              class="overflow-hidden px-6 text-[#363049] dark:text-[#FFFFFF] text-sm"
              v-html="faq.answer"
            />
          </Transition>
        </div>
      </div>
    </div>

    <!-- Kolom Kanan -->
    <div class="flex flex-col gap-y-5">
      <div
        v-for="(faq, index) in rightFaqs"
        :key="`right-${index}`"
        class="w-full h-auto p-[0.7px] rounded-lg dark:bg-gradient-to-tr dark:from-[#565656] dark:to-[#BCBCBC]"
      >
        <div
          class="w-full rounded-lg shadow-md transition-all bg-[#FFFFFF] dark:bg-[#323232] overflow-visible"
        >
          <button
            class="w-full flex flex-row gap-x-5 items-center px-6 py-4"
            @click="toggle(`right-${index}`)"
          >
            <span class="text-xl">
              <span
                v-if="openedIndex.includes(`right-${index}`)"
                class="text-[#2AB857] dark:text-[#52BD95]"
                >−</span
              >
              <span v-else class="text-[#195279] dark:text-[#FAFAFA]">+</span>
            </span>
            <span
              :class="[
                'font-[500] text-start',
                openedIndex === `right-${index}`
                  ? 'text-[#2AB857]'
                  : 'text-[#195279] dark:text-[#FAFAFA] text-[14px] md:text-[17px]',
              ]"
            >
              {{ faq.question }}
            </span>
          </button>

          <Transition
            @before-enter="beforeEnter"
            @enter="enter"
            @after-enter="afterEnter"
            @leave="leave"
            @after-leave="afterLeave"
          >
            <div
              v-if="openedIndex.includes(`right-${index}`)"
              class="overflow-hidden px-6 text-[#363049] dark:text-[#FFFFFF] text-sm"
              v-html="faq.answer"
            />
          </Transition>
        </div>
      </div>
    </div>
  </div>
</template>
