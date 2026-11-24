<script setup>
import { computed, inject } from "vue";
import { useI18n } from "vue-i18n";
import { useLocalizedList } from "@/utils/i18nList";
import { useWorkshopInfo } from "@/composables/useWorkshopInfo";
import { useContentReady } from "@/components/Products/Shield/useContentReady";
import { scrollToSection } from "@/utils/scrollToSection";
import CurriculumDial from "./CurriculumDial.vue";
import shieldMark from "@/assets/Products/images/Shield/v2/shield-mark.webp";
import { WORKSHOP_LIST_PATH } from "@/Data/workshops";

const props = defineProps({
  workshop: { type: Object, required: true },
});

const { t, tm, rt } = useI18n();
const NS = "workshop.healthpricing360";
const openRegistration = inject("hpOpenRegistration", () => {});

const modules = useLocalizedList(
  `${NS}.modules`,
  Array.from({ length: props.workshop.moduleCount }, (_, i) => ({
    day: i < props.workshop.moduleCount / 2 ? 1 : 2,
  })),
  ["title", "scope"],
);

const days = useLocalizedList(
  `${NS}.days`,
  [{ color: "#3DDC84" }, { color: "#4AA8FF" }],
  ["title"],
);

const PILL_ICONS = [
  [
    "M4 7.5A1.5 1.5 0 0 1 5.5 6h13A1.5 1.5 0 0 1 20 7.5v11a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 18.5v-11Z",
    "M8 3.5V8M16 3.5V8M4 11h16",
  ],
  ["m12 3 9 4.5-9 4.5-9-4.5L12 3Z", "m3 12 9 4.5 9-4.5", "m3 16.5 9 4.5 9-4.5"],
  [
    "M12 3 5 6v5.5c0 4.3 2.9 8.2 7 9.5 4.1-1.3 7-5.2 7-9.5V6l-7-3Z",
    "m9 12 2 2 4-4",
  ],
  ["M12 15a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z", "M8.5 13.9 7 21l5-3 5 3-1.5-7.1"],
];

const pills = computed(() =>
  tm(`${NS}.hero.pills`).map((m, i) => ({
    label: rt(m),
    icon: PILL_ICONS[i],
    blue: i === 2,
  })),
);

const { items } = useWorkshopInfo(props.workshop);
const ready = useContentReady();
</script>

<template>
  <section
    class="relative w-full px-4 sm:px-8 xls:px-8 pt-[92px] md:pt-[100px] xl:pt-[108px]"
  >
    <nav
      :aria-label="t(`${NS}.hero.breadcrumb.workshops`)"
      class="mb-4 sm:mb-5 flex flex-wrap items-center gap-x-2 gap-y-1 px-1 font-mono text-[11px] sm:text-[12px] font-[500] uppercase tracking-[0.08em] text-[#667085] dark:text-[#A3A3A3]"
    >
      <router-link
        to="/"
        class="transition-colors hover:text-[#138A3D] dark:hover:text-[#5EE38F]"
        >{{ t(`${NS}.hero.breadcrumb.home`) }}</router-link
      >
      <span aria-hidden="true" class="text-[#D0D5DD] dark:text-white/20"
        >/</span
      >
      <span>{{ t(`${NS}.hero.breadcrumb.resources`) }}</span>
      <span aria-hidden="true" class="text-[#D0D5DD] dark:text-white/20"
        >/</span
      >
      <router-link
        :to="WORKSHOP_LIST_PATH"
        class="transition-colors hover:text-[#138A3D] dark:hover:text-[#5EE38F]"
        >{{ t(`${NS}.hero.breadcrumb.workshops`) }}</router-link
      >
      <span aria-hidden="true" class="text-[#D0D5DD] dark:text-white/20"
        >/</span
      >
      <span
        aria-current="page"
        class="font-[700] text-[#138A3D] dark:text-[#5EE38F]"
        >{{ workshop.name }}</span
      >
    </nav>

    <div
      :class="{ 'is-ready': ready }"
      class="hp-hero relative isolate overflow-hidden rounded-[24px] md:rounded-[32px] text-white"
    >
      <div aria-hidden="true" class="hp-hero-grid absolute inset-0 -z-10"></div>
      <div
        aria-hidden="true"
        class="absolute -z-10 left-[18%] -top-[30%] w-[48%] aspect-square rounded-full bg-[#1AB24F]/20 blur-[120px]"
      ></div>
      <div
        aria-hidden="true"
        class="absolute -z-10 -right-[8%] -bottom-[35%] w-[52%] aspect-square rounded-full bg-[#0071E7]/25 blur-[130px]"
      ></div>

      <div
        class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 px-6 pt-8 pb-8 sm:px-10 sm:pt-12 lg:px-12 lg:pt-12 xl:px-16 xl:pt-14"
      >
        <div class="lg:col-span-7 flex flex-col items-start">
          <span
            class="hp-rise inline-flex flex-wrap items-center gap-x-2.5 gap-y-1 rounded-full border border-white/15 bg-white/[0.06] py-1.5 pl-1.5 pr-3.5 backdrop-blur-md"
          >
            <span
              class="w-6 h-6 rounded-full bg-white flex items-center justify-center"
            >
              <img
                :src="shieldMark"
                alt=""
                width="16"
                height="16"
                class="w-4 h-4 object-contain"
              />
            </span>
            <span class="text-[12px] sm:text-[12.5px] font-[600] text-white/90">
              {{ t(`${NS}.hero.eyebrow`) }}
            </span>
            <span
              v-if="workshop.registration.isOpen"
              class="inline-flex items-center gap-1.5 font-mono text-[10.5px] sm:text-[11px] font-[600] uppercase tracking-[0.12em] text-[#3DDC84]"
            >
              <span class="relative flex w-2 h-2">
                <span
                  class="hp-ping absolute inset-0 rounded-full bg-[#3DDC84]"
                ></span>
                <span class="relative w-2 h-2 rounded-full bg-[#3DDC84]"></span>
              </span>
              {{ t(`${NS}.hero.status`) }}
            </span>
          </span>

          <h1
            class="hp-rise mt-6 sm:mt-7 font-[700] leading-[0.95] tracking-[-0.03em]"
            style="animation-delay: 80ms"
          >
            <span
              class="block text-[30px] sm:text-[48px] lg:text-[52px] xl:text-[64px] 2xls:text-[72px]"
              >HEALTHPRICING</span
            >
            <span
              class="mt-2 sm:mt-3 flex flex-wrap items-end gap-x-4 gap-y-2 sm:gap-x-5"
            >
              <span
                class="hp-gradient-text text-[56px] sm:text-[88px] lg:text-[92px] xl:text-[112px] 2xls:text-[124px] leading-[0.85]"
                >360°</span
              >
              <span
                class="pb-1 sm:pb-2 xl:pb-3 font-mono text-[10.5px] sm:text-[12px] xl:text-[13px] font-[600] uppercase tracking-[0.16em] leading-[1.6] text-[#9BE8B8]"
              >
                {{ t(`${NS}.hero.subtitle`) }}
              </span>
            </span>
          </h1>

          <p
            class="hp-rise mt-6 sm:mt-7 max-w-[600px] text-[18px] sm:text-[22px] xl:text-[24px] font-[500] leading-[1.35] tracking-[-0.01em] text-white"
            style="animation-delay: 160ms"
          >
            {{ t(`${NS}.hero.headline`) }}
          </p>

          <p
            class="hp-rise mt-4 max-w-[580px] text-[14px] sm:text-[16px] leading-[1.7] text-white/70"
            style="animation-delay: 220ms"
          >
            {{ t(`${NS}.hero.lead`) }}
          </p>

          <ul
            class="hp-rise mt-6 flex flex-wrap gap-2"
            style="animation-delay: 260ms"
          >
            <li
              v-for="pill in pills"
              :key="pill.label"
              class="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.06] px-3 py-2 text-[12px] sm:text-[12.5px] font-[600] text-white/85"
            >
              <svg
                viewBox="0 0 24 24"
                class="w-4 h-4"
                :class="pill.blue ? 'text-[#4AA8FF]' : 'text-[#3DDC84]'"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <path v-for="(d, k) in pill.icon" :key="k" :d="d" />
              </svg>
              {{ pill.label }}
            </li>
          </ul>

          <div
            class="hp-rise mt-8 flex flex-col sm:flex-row gap-3 w-full sm:w-auto"
            style="animation-delay: 300ms"
          >
            <button
              type="button"
              class="group inline-flex h-12 sm:h-[52px] items-center justify-center gap-2 rounded-2xl bg-[#1AB24F] px-6 sm:px-7 text-[15px] font-[600] text-white shadow-[0_12px_32px_-12px_rgba(26,178,79,0.9)] transition-all hover:bg-[#16A046] active:scale-[0.98]"
              @click="openRegistration()"
            >
              {{ t(`${NS}.hero.ctaPrimary`) }}
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
            <button
              type="button"
              class="group inline-flex h-12 sm:h-[52px] items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/[0.04] px-6 sm:px-7 text-[15px] font-[600] text-white transition-colors hover:bg-white/10"
              @click="scrollToSection('kurikulum')"
            >
              {{ t(`${NS}.hero.ctaSecondary`) }}
              <svg
                viewBox="0 0 24 24"
                class="w-4 h-4 text-[#3DDC84] transition-transform duration-200 group-hover:translate-y-0.5"
                fill="none"
                stroke="currentColor"
                stroke-width="2.2"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
          </div>
        </div>

        <div
          class="hp-rise lg:col-span-5 flex flex-col items-center justify-center"
          style="animation-delay: 200ms"
        >
          <CurriculumDial :modules="modules" />
          <ul
            class="mt-4 flex flex-col sm:flex-row sm:flex-wrap justify-center gap-x-5 gap-y-1.5 text-[12px] sm:text-[12.5px] text-white/70"
          >
            <li
              v-for="(day, i) in days"
              :key="i"
              class="flex items-start gap-2"
            >
              <span
                class="w-2 h-2 mt-[5px] shrink-0 rounded-full"
                :style="{ backgroundColor: day.color }"
              ></span>
              <span
                class="shrink-0 whitespace-nowrap font-[600] text-white/90"
                >{{ t(`${NS}.hero.dial.day`, { n: i + 1 }) }}</span
              >
              {{ day.title }}
            </li>
          </ul>
        </div>
      </div>

      <div class="px-3 pb-3 sm:px-4 sm:pb-4 lg:mt-2">
        <dl
          class="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-px overflow-hidden rounded-[18px] md:rounded-[22px] border border-white/10 bg-white/10"
        >
          <div
            v-for="item in items"
            :key="item.key"
            class="bg-[#071427] px-4 py-4 sm:px-5 sm:py-5"
          >
            <dt
              class="font-mono text-[10.5px] sm:text-[11px] font-[600] uppercase tracking-[0.14em] text-white/45"
            >
              {{ item.label }}
            </dt>
            <dd
              class="mt-1.5 text-[13.5px] sm:text-[15px] leading-snug"
              :class="
                item.isSet
                  ? 'font-[600] text-white'
                  : 'font-[500] text-white/45'
              "
            >
              {{ item.display }}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hp-hero {
  background:
    radial-gradient(
      110% 80% at 0% 0%,
      rgba(26, 178, 79, 0.16) 0%,
      rgba(26, 178, 79, 0) 55%
    ),
    linear-gradient(160deg, #0a1b36 0%, #071427 50%, #040c1a 100%);
}

.hp-hero-grid {
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

.hp-gradient-text {
  background: linear-gradient(100deg, #5ee38f 0%, #3ddc84 35%, #4aa8ff 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.hp-ping {
  animation: hp-ping 1.6s cubic-bezier(0, 0, 0.2, 1) infinite;
}

@keyframes hp-ping {
  75%,
  100% {
    transform: scale(2.2);
    opacity: 0;
  }
}

.hp-rise {
  opacity: 0;
}
.is-ready .hp-rise {
  animation: hp-rise 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
}

@keyframes hp-rise {
  from {
    opacity: 0;
    transform: translateY(18px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .hp-rise,
  .is-ready .hp-rise {
    opacity: 1;
    animation: none;
  }
  .hp-ping {
    animation: none;
  }
}
</style>
