<script setup>
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import WorkshopEyebrow from "./WorkshopEyebrow.vue";
import { useWorkshopInfo } from "@/composables/useWorkshopInfo";
import { useHpDays } from "@/composables/useHpDays";
import { useWorkshopContent } from "@/composables/useWorkshopContent";
import healthResult from "@/assets/Products/images/Shield/v2/health-result.webp";
import shieldMark from "@/assets/Products/images/Shield/v2/shield-mark.webp";

const props = defineProps({
  workshop: { type: Object, required: true },
});

const NS = "workshop.healthpricing360";
const { t, tm, rt } = useI18n();
const { dateLabel } = useWorkshopInfo(props.workshop);
const hpDays = useHpDays(props.workshop);
const content = useWorkshopContent(props.workshop);

const items = computed(() => {
  const own = props.workshop?.content?.benefits || [];
  return tm(`${NS}.benefits.items`).map((m, i) => ({
    title: content.pick(own[i]?.title) || rt(m.title),
    desc: content.pick(own[i]?.description) || rt(m.desc),
  }));
});

const days = computed(() => {
  return props.workshop.agenda.map((day) => {
    const numbers = day.sessions.map((s) => s.module);
    return {
      day: day.day,
      title: hpDays.title(day.day),
      sessions: day.sessions.length,
      from: String(Math.min(...numbers)).padStart(2, "0"),
      to: String(Math.max(...numbers)).padStart(2, "0"),
    };
  });
});

const datasetHeaders = computed(() =>
  tm(`${NS}.benefits.illus.dataset`).map((m) => rt(m)),
);

const DATASET_ROWS = [
  [72, 40, 88],
  [56, 64, 52],
  [84, 30, 70],
  [48, 76, 60],
];

const SHEET = [
  [1, 0, 1, 1],
  [1, 1, 0, 1],
  [0, 1, 1, 1],
];
</script>

<template>
  <section id="benefit" class="relative w-full px-4 sm:px-8 mt-20 lg:mt-32">
    <div
      data-aos="fade-up"
      class="mx-auto max-w-[760px] text-center flex flex-col items-center"
    >
      <WorkshopEyebrow index="06" :label="t(`${NS}.benefits.eyebrow`)" />
      <h2
        class="mt-6 text-[26px] sm:text-[34px] xl:text-[44px] font-[700] leading-[1.15] tracking-[-0.02em] text-[#0B1324] dark:text-white"
      >
        {{ t(`${NS}.benefits.title`) }}
      </h2>
      <p
        class="mt-4 text-[15px] sm:text-[17px] leading-[1.7] text-[#475467] dark:text-[#A3A3A3]"
      >
        {{ content.text("benefitsDescription", `${NS}.benefits.desc`) }}
      </p>
    </div>

    <div
      class="mt-10 lg:mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-3 sm:gap-4"
    >
      <article
        data-aos="fade-up"
        class="bn-card md:col-span-2 lg:col-span-4 flex flex-col"
      >
        <div class="grid grid-cols-2 gap-3 p-5 sm:p-6 pb-0 sm:pb-0">
          <div
            v-for="day in days"
            :key="day.day"
            class="rounded-2xl border p-4 sm:p-5"
            :class="
              day.day === 1
                ? 'border-[#1AB24F]/20 bg-[#1AB24F]/[0.06]'
                : 'border-[#0071E7]/20 bg-[#0071E7]/[0.05]'
            "
          >
            <span
              class="rounded-md px-2 py-0.5 font-mono text-[10.5px] font-[700] uppercase tracking-[0.12em] text-white"
              :class="day.day === 1 ? 'bg-[#1AB24F]' : 'bg-[#0071E7]'"
              >{{ t(`${NS}.benefits.illus.day`, { n: day.day }) }}</span
            >
            <p
              class="mt-3 text-[13px] sm:text-[14.5px] font-[600] leading-snug text-[#0B1324] dark:text-white"
            >
              {{ day.title }}
            </p>
            <div class="mt-4 flex gap-1">
              <span
                v-for="n in day.sessions"
                :key="n"
                class="h-1.5 flex-1 rounded-full"
                :class="day.day === 1 ? 'bg-[#1AB24F]' : 'bg-[#0071E7]'"
                :style="{ opacity: 0.35 + n * 0.13 }"
              ></span>
            </div>
            <p
              class="mt-2 font-mono text-[10.5px] sm:text-[11px] text-[#667085] dark:text-[#A3A3A3]"
            >
              {{
                t(`${NS}.curriculum.dayRange`, { from: day.from, to: day.to })
              }}
            </p>
          </div>
        </div>
        <div class="flex flex-1 flex-col justify-end p-5 sm:p-6">
          <p
            class="font-mono text-[11px] font-[600] uppercase tracking-[0.12em] text-[#98A2B3]"
          >
            {{ dateLabel || t("workshop.healthpricing360.popup.scheduleTba") }}
          </p>
          <h3 class="bn-title mt-2">{{ items[0].title }}</h3>
          <p class="bn-desc">{{ items[0].desc }}</p>
        </div>
      </article>

      <article
        data-aos="fade-up"
        data-aos-delay="80"
        class="bn-card bn-dark md:col-span-1 lg:col-span-2 lg:row-span-2 flex flex-col text-white"
      >
        <div class="relative z-10 p-5 sm:p-6">
          <span
            class="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 py-1 pl-1 pr-3 text-[11.5px] font-[600]"
          >
            <span
              class="w-6 h-6 rounded-full bg-white flex items-center justify-center"
            >
              <img
                :src="shieldMark"
                alt=""
                width="14"
                height="14"
                class="w-3.5 h-3.5 object-contain"
              />
            </span>
            Shield
          </span>
          <h3 class="mt-4 text-[18px] sm:text-[20px] font-[700] leading-snug">
            {{ items[4].title }}
          </h3>
          <p class="mt-2 text-[14px] leading-[1.6] text-white/70">
            {{ items[4].desc }}
          </p>
        </div>
        <div
          class="relative mt-auto flex min-h-[220px] flex-1 items-end justify-center overflow-hidden px-6"
        >
          <div
            aria-hidden="true"
            class="absolute left-1/2 bottom-0 w-[90%] aspect-square -translate-x-1/2 translate-y-1/3 rounded-full bg-[#0071E7]/40 blur-[70px]"
          ></div>
          <img
            :src="healthResult"
            alt=""
            width="606"
            height="808"
            loading="lazy"
            class="bn-phone relative w-[78%] max-w-[260px] h-auto translate-y-[12%]"
          />
        </div>
      </article>

      <article
        data-aos="fade-up"
        class="bn-card md:col-span-1 lg:col-span-2 flex flex-col"
      >
        <div class="p-5 sm:p-6 pb-0 sm:pb-0">
          <div
            class="overflow-hidden rounded-xl border border-[#E4E7EC] bg-[#FCFCFD] dark:border-white/10 dark:bg-white/[0.03]"
          >
            <div
              class="flex items-center gap-2 border-b border-[#E4E7EC] px-3 py-2 dark:border-white/10"
            >
              <span
                class="rounded bg-[#1AB24F]/15 px-1.5 py-0.5 font-mono text-[10px] font-[700] italic text-[#138A3D] dark:text-[#5EE38F]"
                >fx</span
              >
              <span
                class="truncate font-mono text-[10.5px] sm:text-[11px] text-[#344054] dark:text-[#D1D5DB]"
                >{{ t(`${NS}.benefits.illus.fx`) }}</span
              >
            </div>
            <div class="grid grid-cols-4">
              <template v-for="(row, r) in SHEET" :key="r">
                <span
                  v-for="(cell, c) in row"
                  :key="`${r}-${c}`"
                  class="flex h-7 items-center border-b border-r border-[#F2F4F7] px-2 last:border-r-0 dark:border-white/5"
                  :class="
                    r === 1 && c === 3
                      ? 'bg-[#1AB24F]/10 ring-1 ring-inset ring-[#1AB24F]'
                      : ''
                  "
                >
                  <span
                    v-if="cell"
                    class="h-1.5 rounded-full"
                    :class="
                      r === 1 && c === 3
                        ? 'w-3/4 bg-[#1AB24F]'
                        : 'w-2/3 bg-[#E4E7EC] dark:bg-white/10'
                    "
                  ></span>
                </span>
              </template>
            </div>
          </div>
        </div>
        <div class="flex flex-1 flex-col justify-end p-5 sm:p-6">
          <span class="bn-badge">{{ t(`${NS}.benefits.packageNote`) }}</span>
          <h3 class="bn-title mt-3">{{ items[3].title }}</h3>
          <p class="bn-desc">{{ items[3].desc }}</p>
        </div>
      </article>

      <article
        data-aos="fade-up"
        data-aos-delay="80"
        class="bn-card md:col-span-1 lg:col-span-2 flex flex-col"
      >
        <div class="p-5 sm:p-6 pb-0 sm:pb-0">
          <div
            class="overflow-hidden rounded-xl border border-[#E4E7EC] dark:border-white/10"
          >
            <div
              class="grid grid-cols-4 gap-2 bg-[#F2F4F7] px-3 py-2 dark:bg-white/[0.05]"
            >
              <span
                v-for="header in datasetHeaders"
                :key="header"
                class="truncate font-mono text-[9.5px] sm:text-[10px] font-[600] uppercase tracking-[0.08em] text-[#667085] dark:text-[#A3A3A3]"
                >{{ header }}</span
              >
            </div>
            <div
              v-for="(row, r) in DATASET_ROWS"
              :key="r"
              class="grid grid-cols-4 items-center gap-2 border-t border-[#F2F4F7] px-3 py-[7px] dark:border-white/5"
            >
              <span class="font-mono text-[10px] text-[#98A2B3]">{{
                `#${String(r + 1).padStart(3, "0")}`
              }}</span>
              <span
                v-for="(w, k) in row"
                :key="k"
                class="h-1.5 rounded-full"
                :class="
                  k === 1
                    ? 'bg-[#0071E7]/50'
                    : k === 2
                      ? 'bg-[#1AB24F]/60'
                      : 'bg-[#D0D5DD] dark:bg-white/15'
                "
                :style="{ width: `${w}%` }"
              ></span>
            </div>
          </div>
        </div>
        <div class="flex flex-1 flex-col justify-end p-5 sm:p-6">
          <h3 class="bn-title">{{ items[2].title }}</h3>
          <p class="bn-desc">{{ items[2].desc }}</p>
        </div>
      </article>

      <article
        data-aos="fade-up"
        class="bn-card md:col-span-1 lg:col-span-3 flex flex-col sm:flex-row"
      >
        <div
          class="relative flex h-[170px] sm:h-auto sm:w-[46%] shrink-0 items-center justify-center overflow-hidden bg-[#F9FAFB] dark:bg-white/[0.03]"
        >
          <span
            aria-hidden="true"
            class="absolute h-[118px] w-[88px] -rotate-[10deg] translate-x-[-26px] rounded-lg border border-[#E4E7EC] bg-white shadow-sm dark:border-white/10 dark:bg-[#22292B]"
          ></span>
          <span
            aria-hidden="true"
            class="absolute h-[118px] w-[88px] rotate-[8deg] translate-x-[24px] rounded-lg border border-[#E4E7EC] bg-white shadow-sm dark:border-white/10 dark:bg-[#22292B]"
          ></span>
          <span
            class="relative flex h-[128px] w-[96px] flex-col overflow-hidden rounded-lg bg-[#071427] p-2.5 text-white shadow-[0_18px_30px_-14px_rgba(7,20,39,0.8)]"
          >
            <span
              aria-hidden="true"
              class="absolute inset-y-0 left-0 w-1.5 bg-[#1AB24F]"
            ></span>
            <span
              class="pl-1.5 font-mono text-[7px] font-[600] uppercase tracking-[0.14em] text-[#3DDC84]"
              >{{ t(`${NS}.benefits.illus.handbook`) }}</span
            >
            <span class="mt-auto pl-1.5 text-[10px] font-[700] leading-tight"
              >HEALTHPRICING <span class="text-[#3DDC84]">360°</span></span
            >
          </span>
        </div>
        <div class="flex flex-1 flex-col justify-center p-5 sm:p-6">
          <span class="bn-badge">{{ t(`${NS}.benefits.packageNote`) }}</span>
          <h3 class="bn-title mt-3">{{ items[1].title }}</h3>
          <p class="bn-desc">{{ items[1].desc }}</p>
        </div>
      </article>

      <article
        data-aos="fade-up"
        data-aos-delay="80"
        class="bn-card md:col-span-1 lg:col-span-3 flex flex-col sm:flex-row"
      >
        <div
          class="relative flex h-[170px] sm:h-auto sm:w-[46%] shrink-0 items-center justify-center overflow-hidden bg-[#F2FBF5] dark:bg-[#1AB24F]/[0.06]"
        >
          <span
            class="relative flex h-[112px] w-[150px] flex-col items-center rounded-md border border-[#1AB24F]/30 bg-white p-1.5 shadow-[0_16px_30px_-16px_rgba(19,138,61,0.6)] dark:bg-[#22292B]"
          >
            <span
              class="flex h-full w-full flex-col items-center rounded-[3px] border border-[#1AB24F]/20 px-2 pt-2.5"
            >
              <span
                class="font-mono text-[6.5px] font-[700] uppercase tracking-[0.18em] text-[#138A3D] dark:text-[#5EE38F]"
                >{{ t(`${NS}.benefits.illus.certificate`) }}</span
              >
              <span
                class="mt-1.5 text-[8.5px] font-[700] text-[#0B1324] dark:text-white"
                >HEALTHPRICING 360°</span
              >
              <span
                class="mt-2.5 h-[3px] w-16 rounded-full bg-[#E4E7EC] dark:bg-white/15"
              ></span>
              <span
                class="mt-1.5 h-[3px] w-10 rounded-full bg-[#E4E7EC] dark:bg-white/15"
              ></span>
            </span>
            <span
              aria-hidden="true"
              class="absolute -bottom-3 -right-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#1AB24F] text-white ring-4 ring-[#F2FBF5] dark:ring-[#17181A]"
            >
              <svg
                viewBox="0 0 24 24"
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                stroke-width="2.4"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="m5 12.5 4.5 4.5L19 7.5" />
              </svg>
            </span>
          </span>
        </div>
        <div class="flex flex-1 flex-col justify-center p-5 sm:p-6">
          <h3 class="bn-title">{{ items[5].title }}</h3>
          <p class="bn-desc">{{ items[5].desc }}</p>
        </div>
      </article>
    </div>

    <p
      data-aos="fade-up"
      class="mt-5 text-center text-[12.5px] sm:text-[13px] text-[#667085] dark:text-[#A3A3A3]"
    >
      {{ t(`${NS}.benefits.packageInfo`) }}
    </p>
  </section>
</template>

<style scoped>
.bn-card {
  position: relative;
  overflow: hidden;
  border-radius: 24px;
  border: 1px solid #e4e7ec;
  background: #fff;
  transition:
    border-color 0.3s ease,
    box-shadow 0.3s ease,
    transform 0.3s ease;
}
.bn-card:hover {
  border-color: rgba(26, 178, 79, 0.4);
  box-shadow: 0 22px 48px -30px rgba(7, 20, 39, 0.5);
  transform: translateY(-2px);
}
.dark .bn-card {
  border-color: rgba(255, 255, 255, 0.1);
  background: #1d2426;
}
.bn-dark {
  border-color: transparent;
  background: linear-gradient(160deg, #0a1b36 0%, #071427 55%, #06204a 100%);
}
.dark .bn-dark {
  background: linear-gradient(160deg, #0a1b36 0%, #071427 55%, #06204a 100%);
}
.bn-title {
  font-size: 17px;
  font-weight: 700;
  line-height: 1.35;
  color: #0b1324;
}
.dark .bn-title {
  color: #fff;
}
.bn-desc {
  margin-top: 6px;
  font-size: 14px;
  line-height: 1.6;
  color: #667085;
}
.dark .bn-desc {
  color: #a3a3a3;
}
.bn-badge {
  align-self: flex-start;
  border-radius: 9999px;
  border: 1px dashed #d0d5dd;
  padding: 3px 10px;
  font-size: 10.5px;
  font-weight: 600;
  color: #667085;
}
.dark .bn-badge {
  border-color: rgba(255, 255, 255, 0.2);
  color: #a3a3a3;
}
.bn-phone {
  filter: drop-shadow(0 24px 40px rgba(0, 0, 0, 0.5));
  mask-image: linear-gradient(to bottom, #000 70%, transparent 96%);
  -webkit-mask-image: linear-gradient(to bottom, #000 70%, transparent 96%);
}
@media (min-width: 640px) {
  .bn-title {
    font-size: 18px;
  }
}
@media (prefers-reduced-motion: reduce) {
  .bn-card,
  .bn-card:hover {
    transform: none;
  }
}
</style>
