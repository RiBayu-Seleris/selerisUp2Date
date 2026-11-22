<script setup>
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import { facilitatorExamples } from "@/Data/workshops/facilitatorExamples";
import FacilitatorGlassCard from "./FacilitatorGlassCard.vue";
import FacilitatorCoverflow from "./FacilitatorCoverflow.vue";

const props = defineProps({
  workshop: { type: Object, required: true },
});

const NS = "workshop.healthpricing360";
const { t, tm, rt, locale } = useI18n();
const route = useRoute();

const COVERFLOW_FROM = 5;

const previewEnabled = computed(
  () => import.meta.env.DEV || route.query["contoh-fasilitator"] !== undefined,
);

const COUNT_OPTIONS = [0, 1, 2, 3, 4, 5, facilitatorExamples.length];

const previewCount = ref(0);

const isExample = computed(
  () => previewEnabled.value && previewCount.value > 0,
);

const moduleTitles = computed(() =>
  tm(`${NS}.modules`).map((m) => rt(m.title)),
);

const dayOf = (moduleNumber) =>
  props.workshop.agenda.find((day) =>
    day.sessions.some((s) => s.module === moduleNumber),
  )?.day ?? 1;

const people = computed(() => {
  const source = isExample.value
    ? facilitatorExamples.slice(0, previewCount.value)
    : props.workshop.facilitators;
  return source.map((person) => ({
    ...person,
    initials: String(person.name || "")
      .replace(/^(dr|drg|prof|ir)\.?\s+/i, "")
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0].toUpperCase())
      .join(""),
    bioText: person.bio?.[locale.value] || person.bio?.id || "",
    moduleChips: (person.modules || []).map((n) => ({
      number: String(n).padStart(2, "0"),
      day: dayOf(n),
      title: moduleTitles.value[n - 1],
    })),
  }));
});

const variant = computed(() => {
  const n = people.value.length;
  if (n >= COVERFLOW_FROM) return "coverflow";
  if (n === 1) return "feature";
  if (n === 2) return "wide";
  if (n === 3) return "column";
  return "compact";
});
</script>

<template>
  <div>
    <div
      v-if="previewEnabled"
      class="mb-6 flex flex-col gap-3 rounded-2xl border border-dashed border-[#F79009]/50 bg-[#FFFAEB] px-4 py-3.5 dark:border-[#F79009]/40 dark:bg-[#F79009]/[0.06]"
    >
      <div class="flex flex-wrap items-center gap-x-3 gap-y-2">
        <span
          class="rounded-md bg-[#F79009] px-2 py-0.5 font-mono text-[10px] font-[700] uppercase tracking-[0.12em] text-white"
          >{{ t(`${NS}.facilitators.preview.badge`) }}</span
        >
        <span
          class="text-[13.5px] font-[600] text-[#7A2E0E] dark:text-[#FEC84B]"
          >{{ t(`${NS}.facilitators.preview.label`) }}</span
        >
        <div class="sm:ml-auto flex flex-wrap items-center gap-2">
          <span
            class="font-mono text-[11px] font-[600] uppercase tracking-[0.12em] text-[#93370D] dark:text-[#FEC84B]/80"
            >{{ t(`${NS}.facilitators.preview.count`) }}</span
          >
          <div
            role="group"
            :aria-label="t(`${NS}.facilitators.preview.count`)"
            class="inline-flex flex-wrap gap-1 rounded-xl border border-[#FEDF89] bg-white p-1 dark:border-white/10 dark:bg-[#1D2426]"
          >
            <button
              v-for="option in COUNT_OPTIONS"
              :key="option"
              type="button"
              :aria-pressed="previewCount === option"
              :aria-label="
                option
                  ? t(`${NS}.facilitators.preview.show`, { n: option })
                  : undefined
              "
              class="min-w-[40px] rounded-lg px-3 py-1.5 text-[13px] font-[700] transition-colors"
              :class="
                previewCount === option
                  ? 'bg-[#071427] text-white dark:bg-[#F79009]'
                  : 'text-[#7A2E0E] hover:bg-[#FEF0C7] dark:text-[#FEC84B] dark:hover:bg-white/5'
              "
              @click="previewCount = option"
            >
              {{ option || t(`${NS}.facilitators.preview.actual`) }}
            </button>
          </div>
        </div>
      </div>
      <p
        class="text-[12px] leading-[1.6] text-[#93370D] dark:text-[#FEC84B]/80"
      >
        {{ t(`${NS}.facilitators.preview.note`) }}
      </p>
    </div>

    <div
      class="fg-panel relative isolate overflow-hidden rounded-[28px] md:rounded-[36px] px-4 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12"
    >
      <div
        aria-hidden="true"
        class="absolute -z-10 -left-[8%] -top-[25%] w-[45%] aspect-square rounded-full bg-[#1AB24F]/30 blur-[110px]"
      ></div>
      <div
        aria-hidden="true"
        class="absolute -z-10 -right-[10%] -bottom-[30%] w-[50%] aspect-square rounded-full bg-[#0071E7]/35 blur-[120px]"
      ></div>
      <div
        aria-hidden="true"
        class="absolute -z-10 left-[40%] top-[30%] w-[25%] aspect-square rounded-full bg-[#4AA8FF]/15 blur-[90px]"
      ></div>
      <div aria-hidden="true" class="fg-grid absolute inset-0 -z-10"></div>

      <h3
        class="text-[20px] sm:text-[24px] font-[700] tracking-[-0.01em] text-white"
        :class="variant === 'coverflow' ? 'text-center' : ''"
      >
        {{ t(`${NS}.facilitators.title`) }}
      </h3>

      <div v-if="people.length" class="mt-6 sm:mt-8">
        <FacilitatorCoverflow
          v-if="variant === 'coverflow'"
          :people="people"
          :example="isExample"
        />

        <FacilitatorGlassCard
          v-else-if="variant === 'feature'"
          :person="people[0]"
          variant="feature"
          :index="0"
          :example="isExample"
        />

        <ul
          v-else-if="variant === 'wide'"
          class="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5"
        >
          <li v-for="(person, i) in people" :key="person.name">
            <FacilitatorGlassCard
              :person="person"
              variant="wide"
              :index="i"
              :example="isExample"
            />
          </li>
        </ul>

        <ul
          v-else-if="variant === 'column'"
          class="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5"
        >
          <li v-for="(person, i) in people" :key="person.name">
            <FacilitatorGlassCard
              :person="person"
              variant="column"
              :index="i"
              :example="isExample"
            />
          </li>
        </ul>

        <ul v-else class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <li v-for="(person, i) in people" :key="person.name">
            <FacilitatorGlassCard
              :person="person"
              variant="compact"
              :index="i"
              :example="isExample"
            />
          </li>
        </ul>
      </div>

      <div v-else class="mt-8">
        <div
          class="mx-auto grid max-w-[560px] grid-cols-3 gap-3 sm:gap-5"
          aria-hidden="true"
        >
          <div
            v-for="n in 3"
            :key="n"
            class="relative aspect-[4/5] rounded-[20px] border border-white/15 bg-white/[0.05] backdrop-blur-xl"
          >
            <span
              class="absolute left-2.5 top-2.5 w-4 h-4 rounded-tl-[8px] border-l-2 border-t-2 border-white/40"
            ></span>
            <span
              class="absolute right-2.5 top-2.5 w-4 h-4 rounded-tr-[8px] border-r-2 border-t-2 border-white/40"
            ></span>
            <span
              class="absolute bottom-2.5 left-2.5 w-4 h-4 rounded-bl-[8px] border-b-2 border-l-2 border-white/40"
            ></span>
            <span
              class="absolute bottom-2.5 right-2.5 w-4 h-4 rounded-br-[8px] border-b-2 border-r-2 border-white/40"
            ></span>
            <svg
              viewBox="0 0 24 24"
              class="absolute left-1/2 top-1/2 w-1/3 h-1/3 -translate-x-1/2 -translate-y-1/2 text-white/25"
              fill="none"
              stroke="currentColor"
              stroke-width="1.4"
              stroke-linecap="round"
            >
              <circle cx="12" cy="8.5" r="3.5" />
              <path d="M5 20c1.2-3.5 3.8-5.5 7-5.5s5.8 2 7 5.5" />
            </svg>
          </div>
        </div>
        <p
          class="mt-6 text-center text-[15px] sm:text-[16px] font-[500] text-white/70"
        >
          {{ t(`${NS}.facilitators.tba`) }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fg-panel {
  background: linear-gradient(155deg, #0a1b36 0%, #071427 50%, #040c1a 100%);
}

.fg-grid {
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.04) 1px, transparent 1px);
  background-size: 48px 48px;
  mask-image: radial-gradient(
    ellipse 70% 70% at 50% 40%,
    #000 0%,
    transparent 75%
  );
  -webkit-mask-image: radial-gradient(
    ellipse 70% 70% at 50% 40%,
    #000 0%,
    transparent 75%
  );
}
</style>
