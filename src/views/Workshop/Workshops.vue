<script setup>
import { computed, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import { usePageMeta } from "@/composables/usePageMeta";
import { useWorkshopList } from "@/composables/useWorkshopList";
import { WORKSHOP_LIST_PATH } from "@/Data/workshops";
import { workshopExamples } from "@/Data/workshops/workshopExamples";
import WorkshopEyebrow from "@/components/Workshop/HealthPricing360/WorkshopEyebrow.vue";
import WorkshopFeatured from "@/components/Workshop/List/WorkshopFeatured.vue";
import WorkshopCard from "@/components/Workshop/List/WorkshopCard.vue";

const NS = "workshop.list";
const FILTER_MIN = 4;
const STATUS_FILTERS = ["open", "full", "closed", "past"];

const { t } = useI18n();
const route = useRoute();

const previewEnabled = computed(
  () => import.meta.env.DEV || route.query["contoh-workshop"] !== undefined,
);
const showExamples = ref(false);

const { items, state, reload } = useWorkshopList({
  includeDrafts: import.meta.env.DEV,
  includeExamples: computed(() => previewEnabled.value && showExamples.value),
});

const query = ref("");
const statusFilter = ref("all");
const keyword = computed(() => query.value.trim().toLowerCase());
const isFiltering = computed(
  () => keyword.value !== "" || statusFilter.value !== "all",
);

const featured = computed(
  () =>
    items.value.find(
      (item) => item.featured && item.path && item.status !== "past",
    ) ||
    items.value.find((item) => item.path && item.status === "open") ||
    null,
);
const others = computed(() =>
  items.value.filter((item) => item.slug !== featured.value?.slug),
);

const showFilters = computed(() => items.value.length >= FILTER_MIN);
const statusOptions = computed(() => [
  "all",
  ...STATUS_FILTERS.filter((status) =>
    items.value.some((item) => item.status === status),
  ),
]);

watch(statusOptions, (options) => {
  if (!options.includes(statusFilter.value)) statusFilter.value = "all";
});
watch(showFilters, (visible) => {
  if (!visible) resetFilters();
});

const matches = (item) => {
  if (statusFilter.value !== "all" && item.status !== statusFilter.value)
    return false;
  if (!keyword.value) return true;
  return [item.name, item.subtitle, item.summary, item.organizer]
    .join(" ")
    .toLowerCase()
    .includes(keyword.value);
};

const results = computed(() =>
  isFiltering.value ? items.value.filter(matches) : others.value,
);

function resetFilters() {
  query.value = "";
  statusFilter.value = "all";
}

usePageMeta(() => ({
  title: t(`${NS}.seo.title`),
  description: t(`${NS}.seo.description`),
  path: WORKSHOP_LIST_PATH,
}));
</script>

<template>
  <div class="relative w-full pb-8">
    <section
      class="relative w-full px-4 sm:px-8 pt-[92px] md:pt-[100px] xl:pt-[108px]"
    >
      <nav
        :aria-label="t(`${NS}.breadcrumb.workshops`)"
        class="flex flex-wrap items-center gap-x-2 gap-y-1 px-1 font-mono text-[11px] sm:text-[12px] font-[500] uppercase tracking-[0.08em] text-[#667085] dark:text-[#A3A3A3]"
      >
        <router-link
          to="/"
          class="transition-colors hover:text-[#138A3D] dark:hover:text-[#5EE38F]"
          >{{ t(`${NS}.breadcrumb.home`) }}</router-link
        >
        <span aria-hidden="true" class="text-[#D0D5DD] dark:text-white/20"
          >/</span
        >
        <span>{{ t(`${NS}.breadcrumb.resources`) }}</span>
        <span aria-hidden="true" class="text-[#D0D5DD] dark:text-white/20"
          >/</span
        >
        <span
          aria-current="page"
          class="font-[700] text-[#138A3D] dark:text-[#5EE38F]"
          >{{ t(`${NS}.breadcrumb.workshops`) }}</span
        >
      </nav>

      <div data-aos="fade-up" class="mt-8 sm:mt-10 max-w-[860px] px-1">
        <WorkshopEyebrow index="01" :label="t(`${NS}.eyebrow`)" />
        <h1
          class="mt-6 text-[32px] sm:text-[46px] xl:text-[58px] font-[700] leading-[1.05] tracking-[-0.03em] text-[#0B1324] dark:text-white"
        >
          {{ t(`${NS}.title`) }}
          <span
            class="bg-gradient-to-r from-[#1AB24F] via-[#16A046] to-[#0071E7] bg-clip-text text-transparent dark:from-[#5EE38F] dark:via-[#3DDC84] dark:to-[#4AA8FF]"
            >{{ t(`${NS}.titleAccent`) }}</span
          >
        </h1>
        <p
          class="mt-5 max-w-[640px] text-[15px] sm:text-[17px] leading-[1.7] text-[#475467] dark:text-[#A3A3A3]"
        >
          {{ t(`${NS}.lead`) }}
        </p>
      </div>
    </section>

    <section
      v-if="featured"
      v-show="!isFiltering"
      class="relative w-full px-4 sm:px-8 mt-10 lg:mt-14"
    >
      <div data-aos="fade-up">
        <WorkshopFeatured :workshop="featured" />
      </div>
    </section>

    <section class="relative w-full px-4 sm:px-8 mt-20 lg:mt-28">
      <div
        data-aos="fade-up"
        class="flex flex-col gap-5 px-1 lg:flex-row lg:items-end lg:justify-between"
      >
        <div>
          <WorkshopEyebrow index="02" :label="t(`${NS}.directory.eyebrow`)" />
          <h2
            class="mt-6 text-[26px] sm:text-[34px] xl:text-[42px] font-[700] leading-[1.15] tracking-[-0.02em] text-[#0B1324] dark:text-white"
          >
            {{ t(`${NS}.directory.title`) }}
          </h2>
        </div>
        <p
          class="max-w-[440px] text-[15px] sm:text-[16px] leading-[1.7] text-[#475467] dark:text-[#A3A3A3]"
        >
          {{ t(`${NS}.directory.desc`) }}
        </p>
      </div>

      <div
        v-if="previewEnabled"
        class="mt-8 flex flex-col gap-3 rounded-2xl border border-dashed border-[#F79009]/50 bg-[#FFFAEB] px-4 py-3.5 dark:border-[#F79009]/40 dark:bg-[#F79009]/[0.06]"
      >
        <div class="flex flex-wrap items-center gap-x-3 gap-y-2">
          <span
            class="rounded-md bg-[#F79009] px-2 py-0.5 font-mono text-[10px] font-[700] uppercase tracking-[0.12em] text-white"
            >{{ t(`${NS}.preview.badge`) }}</span
          >
          <span
            class="text-[13.5px] font-[600] text-[#7A2E0E] dark:text-[#FEC84B]"
            >{{ t(`${NS}.preview.label`) }}</span
          >
          <div
            role="group"
            :aria-label="t(`${NS}.preview.label`)"
            class="sm:ml-auto inline-flex flex-wrap gap-1 rounded-xl border border-[#FEDF89] bg-white p-1 dark:border-white/10 dark:bg-[#1D2426]"
          >
            <button
              v-for="option in [false, true]"
              :key="String(option)"
              type="button"
              :aria-pressed="showExamples === option"
              class="rounded-lg px-3 py-1.5 text-[13px] font-[700] transition-colors"
              :class="
                showExamples === option
                  ? 'bg-[#071427] text-white dark:bg-[#F79009]'
                  : 'text-[#7A2E0E] hover:bg-[#FEF0C7] dark:text-[#FEC84B] dark:hover:bg-white/5'
              "
              @click="showExamples = option"
            >
              {{
                option
                  ? t(`${NS}.preview.examples`, { n: workshopExamples.length })
                  : t(`${NS}.preview.actual`)
              }}
            </button>
          </div>
        </div>
        <p
          class="text-[12px] leading-[1.6] text-[#93370D] dark:text-[#FEC84B]/80"
        >
          {{ t(`${NS}.preview.note`) }}
        </p>
      </div>

      <div
        v-if="showFilters && state === 'ready'"
        class="mt-8 rounded-[22px] border border-[#E4E7EC] bg-white p-3 sm:p-4 dark:border-white/10 dark:bg-[#1D2426]"
      >
        <div class="flex flex-col gap-3 md:flex-row md:items-center">
          <label class="relative block flex-1 md:max-w-[420px]">
            <span class="sr-only">{{ t(`${NS}.filter.search`) }}</span>
            <svg
              viewBox="0 0 24 24"
              class="pointer-events-none absolute left-4 top-1/2 w-4 h-4 -translate-y-1/2 text-[#98A2B3]"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path d="M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14ZM20 20l-4-4" />
            </svg>
            <input
              v-model="query"
              type="search"
              :placeholder="t(`${NS}.filter.searchPh`)"
              class="h-11 w-full rounded-xl border border-[#E4E7EC] bg-[#F9FAFB] pl-11 pr-4 text-[14px] text-[#0B1324] outline-none transition placeholder:text-[#98A2B3] focus:border-[#1AB24F]/60 focus:bg-white focus:ring-4 focus:ring-[#1AB24F]/10 dark:border-white/10 dark:bg-white/5 dark:text-white dark:focus:bg-white/[0.07]"
            />
          </label>
          <div
            role="group"
            :aria-label="t(`${NS}.filter.status`)"
            class="flex flex-wrap gap-1.5 md:ml-auto"
          >
            <button
              v-for="option in statusOptions"
              :key="option"
              type="button"
              :aria-pressed="statusFilter === option"
              class="rounded-xl px-3.5 py-2 text-[13px] font-[600] transition-colors"
              :class="
                statusFilter === option
                  ? 'bg-[#071427] text-white dark:bg-[#1AB24F]'
                  : 'text-[#475467] hover:bg-[#F2F4F7] dark:text-[#A3A3A3] dark:hover:bg-white/5'
              "
              @click="statusFilter = option"
            >
              {{
                option === "all"
                  ? t(`${NS}.filter.all`)
                  : t(`${NS}.status.${option}`)
              }}
            </button>
          </div>
        </div>
      </div>

      <div
        v-if="isFiltering"
        class="mt-5 flex flex-wrap items-center justify-between gap-3 px-1"
      >
        <p class="text-[13.5px] font-[600] text-[#475467] dark:text-[#A3A3A3]">
          {{
            t(`${NS}.filter.count`, { n: results.length, total: items.length })
          }}
        </p>
        <button
          type="button"
          class="text-[13px] font-[600] text-[#138A3D] hover:underline dark:text-[#5EE38F]"
          @click="resetFilters"
        >
          {{ t(`${NS}.filter.reset`) }}
        </button>
      </div>

      <ul
        v-if="state === 'loading'"
        aria-hidden="true"
        class="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"
      >
        <li
          v-for="n in 3"
          :key="n"
          class="h-[300px] animate-pulse rounded-[22px] border border-[#E4E7EC] bg-white motion-reduce:animate-none dark:border-white/10 dark:bg-[#1D2426]"
        ></li>
      </ul>

      <div
        v-else-if="state === 'error'"
        class="mt-6 flex flex-col items-center rounded-[22px] border border-dashed border-[#D0D5DD] px-6 py-12 text-center dark:border-white/15"
      >
        <p class="text-[16px] font-[700] text-[#0B1324] dark:text-white">
          {{ t(`${NS}.error.title`) }}
        </p>
        <button
          type="button"
          class="mt-5 inline-flex h-11 items-center rounded-xl bg-[#071427] px-5 text-[14px] font-[600] text-white transition-colors hover:bg-[#0A1B36] dark:bg-[#1AB24F] dark:hover:bg-[#16A046]"
          @click="reload"
        >
          {{ t(`${NS}.error.retry`) }}
        </button>
      </div>

      <template v-else>
        <ul
          v-if="results.length"
          class="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"
        >
          <li v-for="workshop in results" :key="workshop.slug">
            <WorkshopCard :workshop="workshop" />
          </li>
        </ul>

        <div
          v-else-if="isFiltering"
          class="mt-6 flex flex-col items-center rounded-[22px] border border-dashed border-[#D0D5DD] px-6 py-12 text-center dark:border-white/15"
        >
          <p class="text-[16px] font-[700] text-[#0B1324] dark:text-white">
            {{ t(`${NS}.filter.noResult`) }}
          </p>
          <p
            class="mt-2 max-w-[420px] text-[14px] leading-[1.65] text-[#475467] dark:text-[#A3A3A3]"
          >
            {{ t(`${NS}.filter.noResultHint`) }}
          </p>
          <button
            type="button"
            class="mt-5 inline-flex h-11 items-center rounded-xl bg-[#071427] px-5 text-[14px] font-[600] text-white transition-colors hover:bg-[#0A1B36] dark:bg-[#1AB24F] dark:hover:bg-[#16A046]"
            @click="resetFilters"
          >
            {{ t(`${NS}.filter.reset`) }}
          </button>
        </div>

        <div
          v-else
          class="mt-6 flex flex-col items-center rounded-[22px] border border-dashed border-[#D0D5DD] px-6 py-12 text-center dark:border-white/15"
        >
          <span
            class="inline-flex w-12 h-12 items-center justify-center rounded-2xl bg-[#1AB24F]/10 text-[#138A3D] dark:text-[#5EE38F]"
          >
            <svg
              viewBox="0 0 24 24"
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              stroke-width="1.7"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path
                d="M4 7.5A1.5 1.5 0 0 1 5.5 6h13A1.5 1.5 0 0 1 20 7.5v11a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 18.5v-11Z"
              />
              <path d="M8 3.5V8M16 3.5V8M4 11h16M12 14v4M10 16h4" />
            </svg>
          </span>
          <p
            class="mt-4 text-[16px] sm:text-[17px] font-[700] text-[#0B1324] dark:text-white"
          >
            {{ items.length ? t(`${NS}.next.title`) : t(`${NS}.empty.title`) }}
          </p>
          <p
            class="mt-2 max-w-[420px] text-[14px] leading-[1.65] text-[#475467] dark:text-[#A3A3A3]"
          >
            {{ items.length ? t(`${NS}.next.desc`) : t(`${NS}.empty.desc`) }}
          </p>
        </div>
      </template>
    </section>
  </div>
</template>
