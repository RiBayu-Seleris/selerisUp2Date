<script setup>
import { computed } from "vue";
import { RouterLink } from "vue-router";
import { useI18n } from "vue-i18n";
import { useWorkshopInfo } from "@/composables/useWorkshopInfo";
import WorkshopStatusBadge from "./WorkshopStatusBadge.vue";

const props = defineProps({
  workshop: { type: Object, required: true },
});

const { t } = useI18n();
const { dateLabel, formatLabel } = useWorkshopInfo(props.workshop);

const place = computed(() =>
  [formatLabel.value, props.workshop.event.venue].filter(Boolean).join(" · "),
);
</script>

<template>
  <component
    :is="workshop.path ? RouterLink : 'div'"
    :to="workshop.path || undefined"
    class="group flex h-full flex-col rounded-[22px] border border-[#E4E7EC] bg-white p-6 transition-all duration-300 dark:border-white/10 dark:bg-[#1D2426]"
    :class="
      workshop.path
        ? 'hover:-translate-y-0.5 hover:border-[#1AB24F]/40 hover:shadow-[0_24px_50px_-34px_rgba(7,20,39,0.45)] dark:hover:border-[#3DDC84]/30'
        : ''
    "
  >
    <div class="flex flex-wrap items-center justify-between gap-2">
      <WorkshopStatusBadge :status="workshop.status" />
      <span
        v-if="workshop.organizer"
        class="font-mono text-[10.5px] font-[600] uppercase tracking-[0.14em] text-[#98A2B3] dark:text-[#8A8A8A]"
        >{{ workshop.organizer }}</span
      >
    </div>

    <h3
      class="mt-5 text-[19px] sm:text-[20px] font-[700] leading-[1.25] tracking-[-0.01em] text-[#0B1324] dark:text-white"
    >
      {{ workshop.name }}
    </h3>
    <p
      v-if="workshop.subtitle"
      class="mt-2 font-mono text-[10.5px] sm:text-[11px] font-[600] uppercase tracking-[0.12em] leading-[1.6] text-[#138A3D] dark:text-[#5EE38F]"
    >
      {{ workshop.subtitle }}
    </p>
    <p
      v-if="workshop.summary"
      class="mt-3 line-clamp-3 text-[14px] leading-[1.65] text-[#475467] dark:text-[#A3A3A3]"
    >
      {{ workshop.summary }}
    </p>

    <ul
      class="mt-5 flex flex-col gap-2.5 border-t border-[#F2F4F7] pt-4 text-[13.5px] leading-snug dark:border-white/10"
    >
      <li class="flex items-start gap-2.5">
        <svg
          viewBox="0 0 24 24"
          class="mt-px w-4 h-4 shrink-0 text-[#98A2B3] dark:text-[#8A8A8A]"
          fill="none"
          stroke="currentColor"
          stroke-width="1.8"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path
            d="M4 7.5A1.5 1.5 0 0 1 5.5 6h13A1.5 1.5 0 0 1 20 7.5v11a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 18.5v-11Z"
          />
          <path d="M8 3.5V8M16 3.5V8M4 11h16" />
        </svg>
        <span
          :class="
            dateLabel
              ? 'font-[600] text-[#344054] dark:text-white/90'
              : 'text-[#98A2B3] dark:text-[#8A8A8A]'
          "
          >{{ dateLabel || t("workshop.list.scheduleTba") }}</span
        >
      </li>
      <li v-if="place" class="flex items-start gap-2.5">
        <svg
          viewBox="0 0 24 24"
          class="mt-px w-4 h-4 shrink-0 text-[#98A2B3] dark:text-[#8A8A8A]"
          fill="none"
          stroke="currentColor"
          stroke-width="1.8"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="M12 21s7-6.1 7-11.5A7 7 0 0 0 5 9.5C5 14.9 12 21 12 21Z" />
          <path d="M12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
        </svg>
        <span class="text-[#475467] dark:text-[#A3A3A3]">{{ place }}</span>
      </li>
    </ul>

    <div class="mt-auto pt-6">
      <span
        v-if="workshop.path"
        class="inline-flex items-center gap-1.5 text-[14px] font-[600] text-[#138A3D] dark:text-[#5EE38F]"
      >
        {{ t("workshop.list.viewDetail") }}
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
      </span>
      <span
        v-else
        class="font-mono text-[10.5px] font-[600] uppercase tracking-[0.12em] text-[#98A2B3] dark:text-[#8A8A8A]"
        >{{ t("workshop.list.detailSoon") }}</span
      >
    </div>
  </component>
</template>
