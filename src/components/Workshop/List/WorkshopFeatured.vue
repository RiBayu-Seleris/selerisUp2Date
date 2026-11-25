<script setup>
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { useWorkshopInfo } from "@/composables/useWorkshopInfo";
import WorkshopStatusBadge from "./WorkshopStatusBadge.vue";

const props = defineProps({
  workshop: { type: Object, required: true },
});

const { t } = useI18n();
const { dateLabel, formatLabel } = useWorkshopInfo(() => props.workshop);

const facts = computed(() => {
  const place = [formatLabel.value, props.workshop.event.venue]
    .filter(Boolean)
    .join(" · ");
  return [
    { key: "date", value: dateLabel.value },
    { key: "format", value: place },
    { key: "organizer", value: props.workshop.organizer },
  ].map((fact) => ({
    ...fact,
    label: t(`workshop.info.${fact.key}`),
    isSet: Boolean(fact.value),
    display: fact.value || t("workshop.info.tba"),
  }));
});
</script>

<template>
  <article
    class="wl-featured relative isolate overflow-hidden rounded-[24px] md:rounded-[32px] text-white"
  >
    <div aria-hidden="true" class="wl-grid absolute inset-0 -z-10"></div>
    <div
      aria-hidden="true"
      class="absolute -z-10 left-[12%] -top-[45%] w-[46%] aspect-square rounded-full bg-[#1AB24F]/20 blur-[120px]"
    ></div>
    <div
      aria-hidden="true"
      class="absolute -z-10 -right-[10%] -bottom-[50%] w-[50%] aspect-square rounded-full bg-[#0071E7]/25 blur-[130px]"
    ></div>

    <div
      class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 px-6 py-8 sm:px-10 sm:py-10 lg:px-12 lg:py-12"
    >
      <div class="lg:col-span-7 xl:col-span-8 flex flex-col items-start">
        <div class="flex flex-wrap items-center gap-2">
          <span
            class="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.06] px-2.5 py-1 font-mono text-[10.5px] font-[600] uppercase tracking-[0.12em] text-white/80"
          >
            <svg
              viewBox="0 0 24 24"
              class="w-3.5 h-3.5 text-[#3DDC84]"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                d="m12 3 2.6 5.6 6.1.7-4.5 4.2 1.2 6L12 16.6 6.6 19.5l1.2-6-4.5-4.2 6.1-.7L12 3Z"
              />
            </svg>
            {{ t("workshop.list.featured") }}
          </span>
          <WorkshopStatusBadge :status="workshop.status" dark />
        </div>

        <h2
          class="mt-6 text-[32px] sm:text-[44px] xl:text-[52px] font-[700] leading-[1] tracking-[-0.03em]"
        >
          {{ workshop.name }}
        </h2>
        <p
          v-if="workshop.subtitle"
          class="mt-3 font-mono text-[11px] sm:text-[12px] font-[600] uppercase tracking-[0.16em] leading-[1.6] text-[#9BE8B8]"
        >
          {{ workshop.subtitle }}
        </p>
        <p
          v-if="workshop.summary"
          class="mt-5 max-w-[620px] text-[14px] sm:text-[16px] leading-[1.7] text-white/70"
        >
          {{ workshop.summary }}
        </p>

        <ul v-if="workshop.highlights.length" class="mt-6 flex flex-wrap gap-2">
          <li
            v-for="item in workshop.highlights"
            :key="item"
            class="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.06] px-3 py-2 text-[12px] sm:text-[12.5px] font-[600] text-white/85"
          >
            <svg
              viewBox="0 0 24 24"
              class="w-4 h-4 text-[#3DDC84]"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path d="m5 12.5 4.5 4.5L19 7.5" />
            </svg>
            {{ item }}
          </li>
        </ul>
      </div>

      <div class="lg:col-span-5 xl:col-span-4 flex flex-col justify-end gap-4">
        <dl
          class="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-px overflow-hidden rounded-[18px] border border-white/10 bg-white/10"
        >
          <div
            v-for="fact in facts"
            :key="fact.key"
            class="bg-[#071427] px-5 py-4"
          >
            <dt
              class="font-mono text-[10.5px] font-[600] uppercase tracking-[0.14em] text-white/45"
            >
              {{ fact.label }}
            </dt>
            <dd
              class="mt-1.5 text-[14px] sm:text-[15px] leading-snug"
              :class="
                fact.isSet
                  ? 'font-[600] text-white'
                  : 'font-[500] text-white/45'
              "
            >
              {{ fact.display }}
            </dd>
          </div>
        </dl>

        <div class="flex flex-col sm:flex-row lg:flex-col gap-3">
          <router-link
            :to="workshop.path"
            class="group inline-flex min-h-[48px] items-center justify-center gap-2.5 rounded-2xl border border-transparent bg-[#1AB24F] px-6 py-3 text-[15px] font-[600] leading-[1.4] tracking-[-0.01em] text-white shadow-[0_12px_32px_-12px_rgba(26,178,79,0.9)] transition-all duration-200 hover:bg-[#16A046] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3DDC84]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#071427] sm:flex-1 lg:flex-none"
          >
            <span>{{ t("workshop.list.viewDetail") }}</span>
            <svg
              viewBox="0 0 24 24"
              class="w-4 h-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
              fill="none"
              stroke="currentColor"
              stroke-width="2.2"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </router-link>
          <router-link
            v-if="workshop.status === 'open'"
            :to="`${workshop.path}#daftar`"
            class="inline-flex min-h-[48px] items-center justify-center rounded-2xl border border-white/20 bg-white/[0.04] px-6 py-3 text-[15px] font-[600] leading-[1.4] tracking-[-0.01em] text-white transition-all duration-200 hover:border-white/30 hover:bg-white/10 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#071427] sm:flex-1 lg:flex-none"
          >
            {{ t("workshop.list.register") }}
          </router-link>
        </div>
      </div>
    </div>
  </article>
</template>

<style scoped>
.wl-featured {
  background:
    radial-gradient(
      110% 80% at 0% 0%,
      rgba(26, 178, 79, 0.16) 0%,
      rgba(26, 178, 79, 0) 55%
    ),
    linear-gradient(160deg, #0a1b36 0%, #071427 50%, #040c1a 100%);
}

.wl-grid {
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.045) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.045) 1px, transparent 1px);
  background-size: 56px 56px;
  mask-image: radial-gradient(
    ellipse 70% 80% at 70% 40%,
    #000 0%,
    transparent 75%
  );
  -webkit-mask-image: radial-gradient(
    ellipse 70% 80% at 70% 40%,
    #000 0%,
    transparent 75%
  );
}
</style>
