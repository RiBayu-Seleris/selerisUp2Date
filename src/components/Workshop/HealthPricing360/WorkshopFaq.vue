<script setup>
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import WorkshopEyebrow from "./WorkshopEyebrow.vue";

const props = defineProps({
  workshop: { type: Object, required: true },
});

const NS = "workshop.healthpricing360.faq";
const { t, tm, rt, locale } = useI18n();

const items = computed(() => {
  const fromSentris = props.workshop.faq || [];
  if (fromSentris.length) {
    const lang = locale.value;
    return fromSentris.map((item) => ({
      question: item.question[lang] || item.question.id,
      answer: item.answer[lang] || item.answer.id,
    }));
  }
  return tm(`${NS}.items`).map((m) => ({
    question: rt(m.question),
    answer: rt(m.answer),
  }));
});

const open = ref(0);

const toggle = (i) => {
  open.value = open.value === i ? -1 : i;
};
</script>

<template>
  <section
    id="faq"
    class="relative w-full px-4 sm:px-8 mt-20 lg:mt-32 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14"
  >
    <div data-aos="fade-up" class="lg:col-span-4">
      <div class="lg:sticky lg:top-28">
        <WorkshopEyebrow index="08" :label="t(`${NS}.eyebrow`)" />
        <h2
          class="mt-6 text-[26px] sm:text-[34px] xl:text-[42px] font-[700] leading-[1.15] tracking-[-0.02em] text-[#0B1324] dark:text-white"
        >
          {{ t(`${NS}.title`) }}
        </h2>
      </div>
    </div>

    <ul
      data-aos="fade-up"
      data-aos-delay="100"
      class="lg:col-span-8 flex flex-col gap-3"
    >
      <li
        v-for="(item, i) in items"
        :key="i"
        class="overflow-hidden rounded-[20px] border transition-colors duration-300"
        :class="
          open === i
            ? 'border-[#1AB24F]/50 bg-white shadow-[0_18px_40px_-30px_rgba(26,178,79,0.9)] dark:bg-[#1D2426]'
            : 'border-[#E4E7EC] bg-white hover:border-[#D0D5DD] dark:border-white/10 dark:bg-[#1D2426]'
        "
      >
        <h3>
          <button
            :id="`faq-q-${i}`"
            type="button"
            :aria-expanded="open === i"
            :aria-controls="`faq-a-${i}`"
            class="flex w-full items-center justify-between gap-5 px-5 py-4 sm:px-6 sm:py-5 text-left"
            @click="toggle(i)"
          >
            <span class="flex items-start gap-4">
              <span
                class="mt-0.5 font-mono text-[12px] font-[600]"
                :class="open === i ? 'text-[#1AB24F]' : 'text-[#98A2B3]'"
                >{{ String(i + 1).padStart(2, "0") }}</span
              >
              <span
                class="text-[15.5px] sm:text-[17px] font-[600] leading-[1.45] text-[#0B1324] dark:text-white"
                >{{ item.question }}</span
              >
            </span>
            <span
              aria-hidden="true"
              class="shrink-0 inline-flex w-8 h-8 items-center justify-center rounded-xl transition-all duration-300"
              :class="
                open === i
                  ? 'rotate-180 bg-[#1AB24F] text-white'
                  : 'bg-[#F2F4F7] text-[#475467] dark:bg-white/[0.06] dark:text-[#C9C9C9]'
              "
            >
              <svg
                viewBox="0 0 24 24"
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                stroke-width="2.2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </span>
          </button>
        </h3>
        <div
          :id="`faq-a-${i}`"
          role="region"
          :aria-labelledby="`faq-q-${i}`"
          class="grid transition-[grid-template-rows] duration-300 ease-out"
          :class="open === i ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'"
        >
          <div class="overflow-hidden">
            <p
              class="px-5 pb-5 pl-[52px] sm:px-6 sm:pb-6 sm:pl-[60px] text-[14.5px] sm:text-[15.5px] leading-[1.75] text-[#475467] dark:text-[#A3A3A3]"
            >
              {{ item.answer }}
            </p>
          </div>
        </div>
      </li>
    </ul>
  </section>
</template>
