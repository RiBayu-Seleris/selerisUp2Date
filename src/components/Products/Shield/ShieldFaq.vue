<script setup>
import { ref } from "vue";
import { bersihkanHtml } from "@/utils/sanitizeHtml";
import { useLocalizedList } from "@/utils/i18nList";
import { shieldFaq } from "@/Data/Products/Shield/ShieldFaq.js";

const faqs = useLocalizedList("products.shield.faq", shieldFaq, [
  "question",
  "answer",
]);

const open = ref(0);

function toggle(i) {
  open.value = open.value === i ? -1 : i;
}
</script>

<template>
  <section id="faq" class="relative w-full px-0 md:px-0">
    <div
      class="faq-panel relative rounded-[25px] md:rounded-[36px] bg-[#253F65] px-8 py-[58px] lg:px-[36px] md:py-[86px] xl:py-[115px]"
    >
      <div class="faq-glow" aria-hidden="true"></div>
      <div
        class="relative mx-auto grid max-w-[1130px] grid-cols-1 gap-[36px] lg:grid-cols-[minmax(0,414px)_1fr] lg:gap-[58px] xl:px-0"
      >
        <h2
          data-aos="fade-up"
          class="text-white font-normal tracking-[-0.015em] text-[31px] md:text-[40px] xl:text-[50px] leading-[1.25] lg:sticky lg:top-[126px] lg:self-start"
        >
          <span class="block">{{
            $t("products.shield.landing.faq.titleLine1")
          }}</span>
          <span class="block">{{
            $t("products.shield.landing.faq.titleLine2")
          }}</span>
          <span class="block">{{
            $t("products.shield.landing.faq.titleLine3")
          }}</span>
        </h2>

        <ul class="lg:max-w-[540px]">
          <li
            v-for="(faq, i) in faqs"
            :key="i"
            class="faq-item"
            :class="{ 'is-open': open === i }"
          >
            <h3 class="m-0">
              <button
                :id="`faq-q-${i}`"
                type="button"
                class="faq-q flex w-full items-center justify-between gap-[22px] py-[14px] md:py-[18px] text-left"
                :aria-expanded="open === i"
                :aria-controls="`faq-a-${i}`"
                @click="toggle(i)"
              >
                <span
                  class="text-white text-[16px] md:text-[19px] xl:text-[22px] leading-snug tracking-[-0.01em]"
                >
                  {{ faq.question }}
                </span>
                <span
                  class="faq-icon flex h-[29px] w-[29px] md:h-[32px] md:w-[32px] shrink-0 items-center justify-center rounded-full bg-white text-[#253F65]"
                  aria-hidden="true"
                >
                  <svg
                    viewBox="0 0 20 20"
                    fill="none"
                    class="h-[14px] w-[14px]"
                  >
                    <path
                      d="M4 10h12m0 0-4.5-4.5M16 10l-4.5 4.5"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </span>
              </button>
            </h3>
            <div
              :id="`faq-a-${i}`"
              role="region"
              :aria-labelledby="`faq-q-${i}`"
              :inert="open !== i"
              class="faq-a"
            >
              <div class="overflow-hidden">
                <div
                  class="faq-a__body pb-[18px] pr-[43px] text-[#B9C6D8] text-[13px] md:text-[14px] xl:text-[15px] leading-[1.8]"
                  v-html="bersihkanHtml(faq.answer)"
                ></div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
.faq-panel {
  overflow: clip;
}

.faq-glow {
  position: absolute;
  right: -10%;
  top: -30%;
  width: 60%;
  aspect-ratio: 1;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(71, 183, 253, 0.16) 0%,
    rgba(71, 183, 253, 0) 65%
  );
  pointer-events: none;
}

.faq-item {
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.faq-q:focus-visible {
  outline: 2px solid #47b7fd;
  outline-offset: 4px;
  border-radius: 8px;
}

.faq-icon {
  transition:
    transform 0.45s cubic-bezier(0.22, 0.7, 0.1, 1),
    background-color 0.3s ease;
}

.faq-item.is-open .faq-icon {
  transform: rotate(-45deg);
}

@media (hover: hover) {
  .faq-q:hover .faq-icon {
    background: #d6f4ff;
  }
}

.faq-a {
  display: grid;
  grid-template-rows: 0fr;
  opacity: 0;
  transition:
    grid-template-rows 0.5s cubic-bezier(0.22, 0.7, 0.1, 1),
    opacity 0.4s ease;
}

.faq-item.is-open .faq-a {
  grid-template-rows: 1fr;
  opacity: 1;
}

.faq-a__body :deep(a) {
  color: #8fd3ff;
  text-decoration: underline;
}

@media (prefers-reduced-motion: reduce) {
  .faq-a,
  .faq-icon {
    transition: none;
  }
}
</style>
