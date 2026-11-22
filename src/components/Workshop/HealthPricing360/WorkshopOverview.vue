<script setup>
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import WorkshopEyebrow from "./WorkshopEyebrow.vue";

const NS = "workshop.healthpricing360.overview";
const { t, tm, rt } = useI18n();

const ICONS = [
  [
    "M14 3H6.5A1.5 1.5 0 0 0 5 4.5v15A1.5 1.5 0 0 0 6.5 21H10",
    "M14 3l5 5v2",
    "M8.5 8h4M8.5 11.5h6",
    "M16 20a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM18.2 19.2 20.5 21.5",
  ],
  ["M4 19V5", "M4 19h16", "m8 15 3.5-4 3 2.5L19 8"],
  [
    "M5 7c0-1.4 3.1-2.5 7-2.5s7 1.1 7 2.5-3.1 2.5-7 2.5S5 8.4 5 7Z",
    "M5 7v5c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5V7",
    "M5 12v5c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5v-5",
  ],
  ["M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z"],
  ["M3 19.5h18", "M4 19.5c3.2 0 4.3-12 8-12s4.8 12 8 12", "M12 7.5v12"],
  ["M3 12h4l2-5 4 10 2-5h6"],
  [
    "M12 3 5 6v5.5c0 4.3 2.9 8.2 7 9.5 4.1-1.3 7-5.2 7-9.5V6l-7-3Z",
    "m9 12 2 2 4-4",
  ],
  [
    "M9 3.5h6v3H9z",
    "M7 5H5.5A1.5 1.5 0 0 0 4 6.5v13A1.5 1.5 0 0 0 5.5 21h13a1.5 1.5 0 0 0 1.5-1.5v-13A1.5 1.5 0 0 0 18.5 5H17",
    "m9 13.5 2 2 4-4",
  ],
];

const outcomes = computed(() =>
  tm(`${NS}.outcomes`).map((m, i) => ({
    text: rt(m),
    icon: ICONS[i],
    shield: i === 6,
  })),
);
</script>

<template>
  <section id="tentang" class="relative w-full px-4 sm:px-8 mt-20 lg:mt-32">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
      <div data-aos="fade-up" class="lg:col-span-6 xl:col-span-5">
        <WorkshopEyebrow index="01" :label="t(`${NS}.eyebrow`)" />
        <h2
          class="mt-6 text-[26px] sm:text-[34px] xl:text-[40px] font-[700] leading-[1.18] tracking-[-0.02em] text-[#0B1324] dark:text-white"
        >
          {{ t(`${NS}.question`) }}
        </h2>
        <p
          class="mt-6 text-[15px] sm:text-[17px] leading-[1.75] text-[#475467] dark:text-[#A3A3A3]"
        >
          {{ t(`${NS}.context`) }}
        </p>
      </div>

      <div
        data-aos="fade-up"
        data-aos-delay="100"
        class="lg:col-span-6 xl:col-span-7 flex flex-col gap-4 sm:gap-5"
      >
        <figure
          class="ov-quote relative isolate overflow-hidden rounded-[24px] px-6 py-7 sm:px-9 sm:py-9 text-white"
        >
          <div
            aria-hidden="true"
            class="absolute -z-10 -right-16 -top-20 w-72 h-72 rounded-full bg-[#1AB24F]/25 blur-[90px]"
          ></div>
          <svg
            aria-hidden="true"
            viewBox="0 0 64 48"
            class="absolute right-6 top-6 w-14 sm:w-16 text-[#3DDC84]/25"
            fill="currentColor"
          >
            <path
              d="M0 48V28C0 12.6 8.3 3.3 25 0l3 6.6C19.4 9.4 15 14.6 14.4 22H26v26H0Zm36 0V28C36 12.6 44.3 3.3 61 0l3 6.6C55.4 9.4 51 14.6 50.4 22H62v26H36Z"
            />
          </svg>
          <figcaption
            class="font-mono text-[11px] sm:text-[11.5px] font-[600] uppercase tracking-[0.16em] text-[#3DDC84]"
          >
            {{ t(`${NS}.principleLabel`) }}
          </figcaption>
          <blockquote
            class="relative mt-4 max-w-[640px] text-[19px] sm:text-[23px] xl:text-[25px] font-[600] leading-[1.42] tracking-[-0.01em]"
          >
            {{ t(`${NS}.principle`) }}
          </blockquote>
        </figure>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          <div
            class="rounded-[20px] border border-[#E4E7EC] bg-white p-6 sm:p-7 dark:border-white/10 dark:bg-[#1D2426]"
          >
            <span
              class="inline-flex w-10 h-10 items-center justify-center rounded-xl bg-[#1AB24F]/10 text-[#138A3D] dark:text-[#5EE38F]"
            >
              <svg
                viewBox="0 0 24 24"
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="8.5" />
                <circle cx="12" cy="12" r="4.5" />
                <circle cx="12" cy="12" r="1" fill="currentColor" />
              </svg>
            </span>
            <h3
              class="mt-4 text-[17px] font-[600] text-[#0B1324] dark:text-white"
            >
              {{ t(`${NS}.objectiveTitle`) }}
            </h3>
            <p
              class="mt-2 text-[14.5px] leading-[1.7] text-[#475467] dark:text-[#A3A3A3]"
            >
              {{ t(`${NS}.objective`) }}
            </p>
          </div>
          <div
            class="rounded-[20px] border border-[#E4E7EC] bg-white p-6 sm:p-7 dark:border-white/10 dark:bg-[#1D2426]"
          >
            <span
              class="inline-flex w-10 h-10 items-center justify-center rounded-xl bg-[#0071E7]/10 text-[#0071E7] dark:text-[#4AA8FF]"
            >
              <svg
                viewBox="0 0 24 24"
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="9" />
                <path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.6v.6" />
                <path d="M12 17h.01" />
              </svg>
            </span>
            <h3
              class="mt-4 text-[17px] font-[600] text-[#0B1324] dark:text-white"
            >
              {{ t(`${NS}.whyTitle`) }}
            </h3>
            <p
              class="mt-2 text-[14.5px] leading-[1.7] text-[#475467] dark:text-[#A3A3A3]"
            >
              {{ t(`${NS}.why`) }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-14 lg:mt-20">
      <div
        data-aos="fade-up"
        class="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3"
      >
        <h3
          class="text-[22px] sm:text-[28px] font-[700] tracking-[-0.02em] text-[#0B1324] dark:text-white"
        >
          {{ t(`${NS}.outcomesTitle`) }}
        </h3>
        <span
          class="font-mono text-[12px] font-[600] uppercase tracking-[0.14em] text-[#98A2B3]"
          >{{
            t(`${NS}.outcomesCount`, {
              n: String(outcomes.length).padStart(2, "0"),
            })
          }}</span
        >
      </div>
      <ol
        class="mt-6 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4"
      >
        <li
          v-for="(outcome, i) in outcomes"
          :key="i"
          data-aos="fade-up"
          :data-aos-delay="(i % 4) * 70"
        >
          <div
            class="group flex h-full flex-col rounded-[20px] border border-[#E4E7EC] bg-white p-5 sm:p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#1AB24F]/40 hover:shadow-[0_18px_40px_-26px_rgba(7,20,39,0.45)] dark:border-white/10 dark:bg-[#1D2426]"
          >
            <div class="flex items-center justify-between">
              <span
                class="inline-flex w-11 h-11 items-center justify-center rounded-xl transition-colors"
                :class="
                  outcome.shield
                    ? 'bg-[#0071E7]/10 text-[#0071E7] dark:text-[#4AA8FF]'
                    : 'bg-[#1AB24F]/10 text-[#138A3D] group-hover:bg-[#1AB24F] group-hover:text-white dark:text-[#5EE38F]'
                "
              >
                <svg
                  viewBox="0 0 24 24"
                  class="w-[22px] h-[22px]"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.7"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-hidden="true"
                >
                  <path v-for="(d, k) in outcome.icon" :key="k" :d="d" />
                </svg>
              </span>
              <span
                class="font-mono text-[12px] font-[600] text-[#98A2B3] dark:text-[#737373]"
                >{{ String(i + 1).padStart(2, "0") }}</span
              >
            </div>
            <p
              class="mt-5 text-[15px] leading-[1.6] text-[#1D2939] dark:text-[#E5E7EB]"
            >
              {{ outcome.text }}
            </p>
          </div>
        </li>
      </ol>
    </div>
  </section>
</template>

<style scoped>
.ov-quote {
  background: linear-gradient(150deg, #0a1b36 0%, #071427 60%, #040c1a 100%);
}
</style>
