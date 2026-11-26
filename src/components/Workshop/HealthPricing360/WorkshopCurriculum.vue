<script setup>
import {
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  reactive,
  ref,
  watch,
} from "vue";
import { useI18n } from "vue-i18n";
import WorkshopEyebrow from "./WorkshopEyebrow.vue";
import CurriculumModuleDetail from "./CurriculumModuleDetail.vue";
import { useHpModules } from "@/composables/useHpModules";
import { useHpDays } from "@/composables/useHpDays";
import { useWorkshopContent } from "@/composables/useWorkshopContent";

const props = defineProps({
  workshop: { type: Object, required: true },
});

const NS = "workshop.healthpricing360";
const { t } = useI18n();

const ICONS = [
  ["m12 3 9 4.5-9 4.5-9-4.5L12 3Z", "m3 12 9 4.5 9-4.5", "m3 16.5 9 4.5 9-4.5"],
  ["M3 19.5h18", "M4 19.5c3.2 0 4.3-12 8-12s4.8 12 8 12", "M12 7.5v12"],
  ["M3 20.5h18", "M6 17v-5", "M10.5 17V6", "M15 17V9.5", "M19.5 17v-3"],
  ["M18 5H6l6 7-6 7h12"],
  ["M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z"],
  ["M3 12h4l2-5 4 10 2-5h6"],
  [
    "M12 4v16",
    "M7.5 20h9",
    "M5 7h14",
    "M5 7 2 13a3 3 0 0 0 6 0L5 7Z",
    "m19 7-3 6a3 3 0 0 0 6 0l-3-6Z",
  ],
  [
    "M12 3 5 6v5.5c0 4.3 2.9 8.2 7 9.5 4.1-1.3 7-5.2 7-9.5V6l-7-3Z",
    "m9 12 2 2 4-4",
  ],
  [
    "M4 7h9",
    "M17 7h3",
    "M15 5v4",
    "M4 12h3",
    "M11 12h9",
    "M9 10v4",
    "M4 17h11",
    "M19 17h1",
    "M17 15v4",
  ],
  [
    "M9 3.5h6v3H9z",
    "M7 5H5.5A1.5 1.5 0 0 0 4 6.5v13A1.5 1.5 0 0 0 5.5 21h13a1.5 1.5 0 0 0 1.5-1.5v-13A1.5 1.5 0 0 0 18.5 5H17",
    "m9 13.5 2 2 4-4",
  ],
];

const sessionOf = (moduleNumber) => {
  for (const day of props.workshop.agenda) {
    const idx = day.sessions.findIndex((s) => s.module === moduleNumber);
    if (idx !== -1)
      return { day: day.day, session: idx + 1, time: day.sessions[idx].time };
  }
  return null;
};

const typeOf = (moduleNumber) => {
  if (moduleNumber === props.workshop.handsOnModule) return "handsOn";
  if (moduleNumber === props.workshop.handsOnModule + 1) return "simulation";
  return "lecture";
};

const hpModules = useHpModules(props.workshop);

const modules = computed(() =>
  hpModules.value.map((m, index) => {
    const where = sessionOf(m.number);
    return {
      index,
      number: String(m.number).padStart(2, "0"),
      title: m.title,
      scope: m.scope,
      topics: m.topics,
      icon: ICONS[(m.number - 1) % ICONS.length],
      type: m.type || typeOf(m.number),
      day: where?.day ?? m.day ?? 1,
      session: where?.session ?? m.number,
      time: where?.time ?? null,
    };
  }),
);

const dayNumbers = computed(() =>
  [...new Set(modules.value.map((m) => m.day))].sort((a, b) => a - b),
);

const hpDays = useHpDays(props.workshop);
const content = useWorkshopContent(props.workshop);

const filter = ref(0);
const active = ref(0);
const mobileOpen = ref(true);

const filters = computed(() => [
  { value: 0, label: t(`${NS}.curriculum.all`), meta: modules.value.length },
  ...dayNumbers.value.map((day) => {
    const list = modules.value.filter((m) => m.day === day);
    return {
      value: day,
      label: t(`${NS}.hero.dial.day`, { n: day }),
      meta: `${list[0]?.number}–${list[list.length - 1]?.number}`,
    };
  }),
]);

const groups = computed(() =>
  dayNumbers.value
    .filter((day) => filter.value === 0 || filter.value === day)
    .map((day) => ({
      day,
      title: hpDays.title(day),
      modules: modules.value.filter((m) => m.day === day),
    })),
);

const current = computed(() => modules.value[active.value]);

watch(filter, (value) => {
  if (value !== 0 && current.value.day !== value) {
    const first = modules.value.find((m) => m.day === value);
    if (first) active.value = first.index;
  }
  mobileOpen.value = true;
});

const select = (index) => {
  if (index === active.value) {
    mobileOpen.value = !mobileOpen.value;
    return;
  }
  active.value = index;
  mobileOpen.value = true;
  if (filter.value !== 0 && modules.value[index].day !== filter.value) {
    filter.value = 0;
  }
};

const step = (delta) => {
  const next = Math.min(
    modules.value.length - 1,
    Math.max(0, active.value + delta),
  );
  active.value = next;
  if (filter.value !== 0 && modules.value[next].day !== filter.value) {
    filter.value = modules.value[next].day;
  }
};

const jump = (index) => {
  active.value = index;
  if (filter.value !== 0 && modules.value[index].day !== filter.value) {
    filter.value = 0;
  }
};

const filterGroup = ref(null);
const pill = reactive({ x: 0, width: 0, animate: false });
let pillObserver = null;

const placePill = () => {
  const button = filterGroup.value?.querySelector('[aria-pressed="true"]');
  if (!button) return;
  pill.x = button.offsetLeft;
  pill.width = button.offsetWidth;
  if (!pill.animate) {
    requestAnimationFrame(() => {
      pill.animate = true;
    });
  }
};

watch([filter, filters], () => nextTick(placePill));

onMounted(() => {
  placePill();
  if (typeof ResizeObserver === "undefined" || !filterGroup.value) return;
  pillObserver = new ResizeObserver(placePill);
  pillObserver.observe(filterGroup.value);
});

onBeforeUnmount(() => pillObserver?.disconnect());
</script>

<template>
  <section
    id="kurikulum"
    class="relative w-full px-4 sm:px-8 mt-20 lg:mt-32 scroll-mt-24"
  >
    <div
      data-aos="fade-up"
      class="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 lg:gap-12"
    >
      <div class="max-w-[720px]">
        <WorkshopEyebrow index="02" :label="t(`${NS}.curriculum.eyebrow`)" />
        <h2
          class="mt-6 text-[26px] sm:text-[34px] xl:text-[44px] font-[700] leading-[1.15] tracking-[-0.02em] text-[#0B1324] dark:text-white"
        >
          {{ content.text("curriculumTitle", `${NS}.curriculum.title`) }}
        </h2>
        <p
          class="mt-4 text-[15px] sm:text-[17px] leading-[1.7] text-[#475467] dark:text-[#A3A3A3]"
        >
          {{ content.text("curriculumDescription", `${NS}.curriculum.desc`) }}
        </p>
      </div>

      <div
        ref="filterGroup"
        role="group"
        :aria-label="t(`${NS}.curriculum.eyebrow`)"
        class="relative grid grid-cols-3 sm:inline-flex self-stretch sm:self-start lg:self-auto shrink-0 gap-1 rounded-2xl border border-[#E4E7EC] bg-white p-1.5 shadow-[0_1px_2px_rgba(16,24,40,0.05)] dark:border-white/10 dark:bg-[#1D2426]"
      >
        <span
          v-if="pill.width"
          aria-hidden="true"
          class="cm-pill absolute left-0 top-1.5 bottom-1.5 rounded-xl bg-[#071427] dark:bg-[#1AB24F]"
          :class="{ 'is-animated': pill.animate }"
          :style="{
            width: `${pill.width}px`,
            transform: `translateX(${pill.x}px)`,
          }"
        ></span>
        <button
          v-for="option in filters"
          :key="option.value"
          type="button"
          :aria-pressed="filter === option.value"
          class="relative flex flex-col sm:flex-row items-center justify-center gap-x-2 rounded-xl px-3 sm:px-4 py-2 text-[13px] sm:text-[14px] font-[600] transition-colors duration-300"
          :class="
            filter === option.value
              ? pill.width
                ? 'text-white'
                : 'bg-[#071427] text-white dark:bg-[#1AB24F]'
              : 'text-[#475467] hover:bg-[#F2F4F7] dark:text-[#A3A3A3] dark:hover:bg-white/5'
          "
          @click="filter = option.value"
        >
          {{ option.label }}
          <span
            class="font-mono text-[11px] font-[500] transition-colors duration-300"
            :class="
              filter === option.value
                ? 'text-[#3DDC84] dark:text-white/80'
                : 'text-[#98A2B3]'
            "
            >{{ option.meta }}</span
          >
        </button>
      </div>
    </div>

    <div
      data-aos="fade-up"
      class="mt-10 lg:mt-12 grid grid-cols-1 lg:grid-cols-12 gap-6 xl:gap-8 items-start"
    >
      <div class="lg:col-span-5 flex flex-col gap-6">
        <p
          class="hidden lg:block text-[13.5px] text-[#667085] dark:text-[#A3A3A3]"
        >
          {{ t(`${NS}.curriculum.hint`) }}
        </p>
        <TransitionGroup tag="div" name="cm-group" class="relative -mt-6">
          <div v-for="group in groups" :key="group.day" class="mt-6">
            <div class="flex items-center gap-3 px-1">
              <span
                class="w-2 h-2 rounded-full"
                :class="group.day === 1 ? 'bg-[#1AB24F]' : 'bg-[#0071E7]'"
              ></span>
              <span
                class="font-mono text-[11px] font-[600] uppercase tracking-[0.14em]"
                :class="
                  group.day === 1
                    ? 'text-[#138A3D] dark:text-[#5EE38F]'
                    : 'text-[#0059B8] dark:text-[#4AA8FF]'
                "
                >{{ t(`${NS}.hero.dial.day`, { n: group.day }) }}</span
              >
              <span
                class="truncate text-[13px] font-[500] text-[#667085] dark:text-[#A3A3A3]"
                >{{ group.title }}</span
              >
            </div>

            <ol class="mt-3 flex flex-col gap-2">
              <li v-for="m in group.modules" :key="m.index">
                <button
                  type="button"
                  :aria-expanded="active === m.index && mobileOpen"
                  :aria-controls="`cm-detail-${m.index}`"
                  class="group flex w-full items-center gap-4 rounded-2xl border px-4 py-3.5 text-left transition-all duration-300"
                  :class="
                    active === m.index
                      ? m.day === 1
                        ? 'border-[#1AB24F]/50 bg-white shadow-[0_14px_34px_-22px_rgba(26,178,79,0.8)] dark:bg-[#1D2426]'
                        : 'border-[#0071E7]/45 bg-white shadow-[0_14px_34px_-22px_rgba(0,113,231,0.8)] dark:bg-[#1D2426]'
                      : 'border-transparent hover:border-[#E4E7EC] hover:bg-white dark:hover:border-white/10 dark:hover:bg-white/[0.03]'
                  "
                  @click="select(m.index)"
                >
                  <span
                    class="shrink-0 inline-flex w-11 h-11 items-center justify-center rounded-xl font-mono text-[14px] font-[700] transition-colors"
                    :class="
                      active === m.index
                        ? m.day === 1
                          ? 'bg-[#1AB24F] text-white'
                          : 'bg-[#0071E7] text-white'
                        : 'bg-[#F2F4F7] text-[#475467] group-hover:text-[#0B1324] dark:bg-white/[0.06] dark:text-[#C9C9C9]'
                    "
                    >{{ m.number }}</span
                  >
                  <span class="min-w-0 flex-1">
                    <span
                      class="block text-[14.5px] sm:text-[15px] font-[600] leading-[1.35]"
                      :class="
                        active === m.index
                          ? 'text-[#0B1324] dark:text-white'
                          : 'text-[#344054] dark:text-[#D1D5DB]'
                      "
                      >{{ m.title }}</span
                    >
                    <span
                      v-if="m.type !== 'lecture'"
                      class="mt-1 inline-block font-mono text-[10.5px] font-[600] uppercase tracking-[0.1em]"
                      :class="
                        m.type === 'handsOn'
                          ? 'text-[#0071E7] dark:text-[#4AA8FF]'
                          : 'text-[#138A3D] dark:text-[#5EE38F]'
                      "
                      >{{ t(`${NS}.curriculum.types.${m.type}`) }}</span
                    >
                  </span>
                  <svg
                    viewBox="0 0 24 24"
                    class="shrink-0 w-4 h-4 transition-transform duration-300"
                    :class="[
                      active === m.index
                        ? 'text-[#0B1324] dark:text-white lg:translate-x-0.5'
                        : 'text-[#98A2B3]',
                      active === m.index && mobileOpen
                        ? 'rotate-90 lg:rotate-0'
                        : '',
                    ]"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2.2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    aria-hidden="true"
                  >
                    <path d="m9 6 6 6-6 6" />
                  </svg>
                </button>

                <div
                  v-if="active === m.index && mobileOpen"
                  :id="`cm-detail-${m.index}`"
                  class="lg:hidden mt-2"
                >
                  <CurriculumModuleDetail
                    :module="m"
                    :modules="modules"
                    :total="modules.length"
                    compact
                  />
                </div>
              </li>
            </ol>
          </div>
        </TransitionGroup>
      </div>

      <div class="hidden lg:block lg:col-span-7 lg:sticky lg:top-28">
        <CurriculumModuleDetail
          :module="current"
          :modules="modules"
          :total="modules.length"
          @prev="step(-1)"
          @next="step(1)"
          @select="jump"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.cm-pill.is-animated {
  transition:
    transform 0.45s cubic-bezier(0.16, 1, 0.3, 1),
    width 0.45s cubic-bezier(0.16, 1, 0.3, 1);
}

.cm-group-move {
  transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1);
}
.cm-group-enter-active {
  transition:
    opacity 0.35s ease 0.08s,
    transform 0.45s cubic-bezier(0.16, 1, 0.3, 1) 0.08s;
}
.cm-group-enter-from {
  opacity: 0;
  transform: translateY(12px);
}
.cm-group-leave-active {
  position: absolute;
  left: 0;
  right: 0;
  transition: opacity 0.15s ease;
}
.cm-group-leave-to {
  opacity: 0;
}

@media (prefers-reduced-motion: reduce) {
  .cm-pill.is-animated,
  .cm-group-move,
  .cm-group-enter-active,
  .cm-group-leave-active {
    transition: none;
  }
}
</style>
