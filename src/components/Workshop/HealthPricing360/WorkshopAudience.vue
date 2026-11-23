<script setup>
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import WorkshopEyebrow from "./WorkshopEyebrow.vue";

const NS = "workshop.healthpricing360.audience";
const { t, tm, rt } = useI18n();

const GROUPS = [
  { roles: [0, 1, 2], icon: ["M18 5H6l6 7-6 7h12"] },
  {
    roles: [3, 4, 5],
    icon: [
      "M4 21V5.5A1.5 1.5 0 0 1 5.5 4h8A1.5 1.5 0 0 1 15 5.5V21",
      "M15 9h3.5A1.5 1.5 0 0 1 20 10.5V21",
      "M3 21h18",
      "M8 8h3M8 12h3M8 16h3",
    ],
  },
  {
    roles: [6, 7, 8],
    icon: [
      "M3.5 8.5A1.5 1.5 0 0 1 5 7h14a1.5 1.5 0 0 1 1.5 1.5v10A1.5 1.5 0 0 1 19 20H5a1.5 1.5 0 0 1-1.5-1.5v-10Z",
      "M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7",
      "M3.5 12.5h17",
    ],
  },
];

const groups = computed(() => {
  const roles = tm(`${NS}.roles`).map((m) => rt(m));
  const titles = tm(`${NS}.groups`).map((m) => rt(m));
  return GROUPS.map((group, i) => ({
    title: titles[i],
    icon: group.icon,
    roles: group.roles.map((r) => roles[r]),
  }));
});
</script>

<template>
  <section
    id="peserta"
    class="relative w-full px-4 sm:px-8 mt-20 lg:mt-32 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start"
  >
    <div data-aos="fade-up" class="lg:col-span-4">
      <WorkshopEyebrow index="05" :label="t(`${NS}.eyebrow`)" />
      <h2
        class="mt-6 text-[26px] sm:text-[34px] xl:text-[42px] font-[700] leading-[1.15] tracking-[-0.02em] text-[#0B1324] dark:text-white"
      >
        {{ t(`${NS}.title`) }}
      </h2>
      <p
        class="mt-4 text-[15px] sm:text-[17px] leading-[1.7] text-[#475467] dark:text-[#A3A3A3]"
      >
        {{ t(`${NS}.desc`) }}
      </p>
    </div>

    <ul class="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
      <li
        v-for="(group, i) in groups"
        :key="group.title"
        data-aos="fade-up"
        :data-aos-delay="i * 90"
      >
        <div
          class="group flex h-full flex-col rounded-[22px] border p-6 transition-all duration-300 hover:-translate-y-0.5"
          :class="
            i === 0
              ? 'border-transparent bg-[#071427] text-white shadow-[0_24px_50px_-30px_rgba(7,20,39,0.9)]'
              : 'border-[#E4E7EC] bg-white hover:border-[#1AB24F]/40 dark:border-white/10 dark:bg-[#1D2426]'
          "
        >
          <span
            class="inline-flex w-11 h-11 items-center justify-center rounded-xl"
            :class="
              i === 0
                ? 'bg-white/10 text-[#3DDC84]'
                : 'bg-[#1AB24F]/10 text-[#138A3D] dark:text-[#5EE38F]'
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
              <path v-for="(d, k) in group.icon" :key="k" :d="d" />
            </svg>
          </span>
          <p
            class="mt-5 font-mono text-[11px] font-[600] uppercase tracking-[0.14em]"
            :class="i === 0 ? 'text-[#3DDC84]' : 'text-[#98A2B3]'"
          >
            {{ group.title }}
          </p>
          <ul class="mt-3 flex flex-col">
            <li
              v-for="role in group.roles"
              :key="role"
              class="flex items-center gap-2.5 border-t py-3 text-[15px] sm:text-[15.5px] font-[600] leading-snug first:border-t-0 first:pt-1"
              :class="
                i === 0
                  ? 'border-white/10 text-white'
                  : 'border-[#F2F4F7] text-[#0B1324] dark:border-white/10 dark:text-white'
              "
            >
              <svg
                viewBox="0 0 24 24"
                class="w-4 h-4 shrink-0"
                :class="i === 0 ? 'text-[#3DDC84]' : 'text-[#1AB24F]'"
                fill="none"
                stroke="currentColor"
                stroke-width="2.4"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <path d="m5 12.5 4.5 4.5L19 7.5" />
              </svg>
              {{ role }}
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </section>
</template>
