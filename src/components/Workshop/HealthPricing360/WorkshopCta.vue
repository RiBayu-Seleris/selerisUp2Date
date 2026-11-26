<script setup>
import { inject } from "vue";
import { useI18n } from "vue-i18n";
import { useWorkshopContent } from "@/composables/useWorkshopContent";

const props = defineProps({
  workshop: { type: Object, default: null },
});

const NS = "workshop.healthpricing360";
const { t } = useI18n();
const content = useWorkshopContent(props.workshop);
const openRegistration = inject("hpOpenRegistration", () => {});
</script>

<template>
  <section
    id="daftar"
    class="relative w-full px-4 sm:px-8 mt-20 lg:mt-28 scroll-mt-24"
  >
    <div
      data-aos="fade-up"
      class="cta-panel relative isolate overflow-hidden rounded-[28px] md:rounded-[36px] px-6 py-10 sm:px-12 sm:py-14 xl:px-16 text-white"
    >
      <div
        aria-hidden="true"
        class="absolute -z-10 -left-[10%] -bottom-[60%] w-[50%] aspect-square rounded-full bg-[#1AB24F]/25 blur-[110px]"
      ></div>
      <div
        aria-hidden="true"
        class="absolute -z-10 right-[5%] -top-[70%] w-[45%] aspect-square rounded-full bg-[#0071E7]/30 blur-[120px]"
      ></div>
      <svg
        aria-hidden="true"
        class="absolute -z-10 -right-24 top-1/2 w-[420px] h-[420px] -translate-y-1/2 opacity-[0.14]"
        viewBox="0 0 420 420"
        fill="none"
      >
        <circle cx="210" cy="210" r="208" stroke="white" />
        <circle
          cx="210"
          cy="210"
          r="160"
          stroke="white"
          stroke-dasharray="2 8"
        />
        <circle cx="210" cy="210" r="112" stroke="white" />
        <path
          d="M210 2a208 208 0 0 1 208 208"
          stroke="#3DDC84"
          stroke-width="3"
          stroke-linecap="round"
        />
      </svg>

      <div
        class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8"
      >
        <div class="max-w-[720px]">
          <p
            class="inline-flex items-center gap-2 font-mono text-[11px] sm:text-[12px] font-[600] uppercase tracking-[0.16em] text-[#3DDC84]"
          >
            <span class="w-1.5 h-1.5 rounded-full bg-[#3DDC84]"></span>
            {{ t(`${NS}.cta.kicker`) }}
          </p>
          <h2
            class="mt-4 text-[24px] sm:text-[32px] xl:text-[38px] font-[700] leading-[1.2] tracking-[-0.02em]"
          >
            {{ content.text("ctaTitle", `${NS}.register.title`) }}
          </h2>
          <p
            class="mt-4 text-[15px] sm:text-[16.5px] leading-[1.7] text-white/70"
          >
            {{ content.text("ctaDescription", `${NS}.register.desc`) }}
          </p>
        </div>
        <button
          type="button"
          class="group shrink-0 inline-flex h-14 items-center justify-center gap-2 rounded-2xl bg-[#1AB24F] px-8 text-[15.5px] font-[600] text-white shadow-[0_16px_40px_-14px_rgba(26,178,79,0.9)] transition-all hover:bg-[#16A046] active:scale-[0.98]"
          @click="openRegistration()"
        >
          {{ t(`${NS}.cta.button`) }}
          <svg
            viewBox="0 0 24 24"
            class="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5"
            fill="none"
            stroke="currentColor"
            stroke-width="2.2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cta-panel {
  background: linear-gradient(140deg, #071427 0%, #0a1b36 55%, #06204a 100%);
}
</style>
