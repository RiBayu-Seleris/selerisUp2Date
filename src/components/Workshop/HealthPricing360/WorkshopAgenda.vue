<script setup>
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import WorkshopEyebrow from "./WorkshopEyebrow.vue";
import { useHpModules } from "@/composables/useHpModules";
import { useHpDays } from "@/composables/useHpDays";
import { useWorkshopContent } from "@/composables/useWorkshopContent";

const props = defineProps({
  workshop: { type: Object, required: true },
});

const NS = "workshop.healthpricing360";
const { t, tm, rt, locale } = useI18n();
const content = useWorkshopContent(props.workshop);

const METHOD_ICONS = [
  [
    "M4 6.5A2.5 2.5 0 0 1 6.5 4H20v13H6.5A2.5 2.5 0 0 0 4 19.5v-13Z",
    "M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5",
  ],
  [
    "M14 3H6.5A1.5 1.5 0 0 0 5 4.5v15A1.5 1.5 0 0 0 6.5 21h11a1.5 1.5 0 0 0 1.5-1.5V8l-5-5Z",
    "M14 3v5h5",
    "M8.5 13h7M8.5 16.5h5",
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
];

const methods = computed(() =>
  content.list("learningMethods", `${NS}.agenda.methods`).map((label, i) => ({
    label,
    icon: METHOD_ICONS[i % METHOD_ICONS.length],
  })),
);

const dayDate = (dayNumber) => {
  const start = props.workshop.event.startDate;
  if (!start) return null;
  const [y, m, d] = String(start).split("-").map(Number);
  if (!y || !m || !d) return null;
  const date = new Date(y, m - 1, d + dayNumber - 1);
  return new Intl.DateTimeFormat(locale.value === "id" ? "id-ID" : "en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
};

const typeOf = (moduleNumber) => {
  if (moduleNumber === props.workshop.handsOnModule) return "handsOn";
  if (moduleNumber === props.workshop.handsOnModule + 1) return "simulation";
  return "lecture";
};

const hpModules = useHpModules(props.workshop);
const hpDays = useHpDays(props.workshop);

const days = computed(() => {
  const sessions = tm(`${NS}.agenda.sessions`).map((m) => rt(m));
  const fromSentris = (props.workshop.modules || []).length > 0;
  const byNumber = new Map(hpModules.value.map((m) => [m.number, m]));
  const titleOf = (n) =>
    (fromSentris && byNumber.get(n)?.title) ||
    sessions[n - 1] ||
    byNumber.get(n)?.title ||
    "";
  return props.workshop.agenda.map((day) => {
    const numbers = day.sessions.map((s) => s.module);
    return {
      day: day.day,
      title: hpDays.title(day.day),
      summary: hpDays.summary(day.day),
      date: dayDate(day.day),
      from: String(Math.min(...numbers)).padStart(2, "0"),
      to: String(Math.max(...numbers)).padStart(2, "0"),
      sessions: day.sessions.map((session, j) => ({
        n: j + 1,
        time: session.time,
        title: titleOf(session.module),
        scope: byNumber.get(session.module)?.scope || "",
        module: String(session.module).padStart(2, "0"),
        type: byNumber.get(session.module)?.type || typeOf(session.module),
      })),
    };
  });
});

const activeDay = ref(1);
const current = computed(
  () => days.value.find((d) => d.day === activeDay.value) || days.value[0],
);

const tone = (day) =>
  day === 1
    ? {
        ring: "border-[#1AB24F] bg-[#1AB24F]/[0.06] shadow-[0_18px_40px_-28px_rgba(26,178,79,0.9)]",
        chip: "bg-[#1AB24F] text-white",
      }
    : {
        ring: "border-[#0071E7] bg-[#0071E7]/[0.05] shadow-[0_18px_40px_-28px_rgba(0,113,231,0.9)]",
        chip: "bg-[#0071E7] text-white",
      };
</script>

<template>
  <section
    id="agenda"
    class="relative w-full px-4 sm:px-8 mt-20 lg:mt-32 scroll-mt-24"
  >
    <div
      data-aos="fade-up"
      class="mx-auto max-w-[820px] text-center flex flex-col items-center"
    >
      <WorkshopEyebrow index="03" :label="t(`${NS}.agenda.eyebrow`)" />
      <h2
        class="mt-6 text-[26px] sm:text-[34px] xl:text-[44px] font-[700] leading-[1.15] tracking-[-0.02em] text-[#0B1324] dark:text-white"
      >
        {{ content.text("agendaTitle", `${NS}.agenda.title`) }}
      </h2>
      <p
        class="mt-4 text-[14.5px] sm:text-[16px] text-[#475467] dark:text-[#A3A3A3]"
      >
        {{ t(`${NS}.agenda.format`) }}
      </p>
    </div>

    <div
      data-aos="fade-up"
      role="tablist"
      :aria-label="t(`${NS}.agenda.eyebrow`)"
      class="mx-auto mt-10 grid max-w-[1100px] grid-cols-2 gap-3 sm:gap-4"
    >
      <button
        v-for="day in days"
        :id="`agenda-tab-${day.day}`"
        :key="day.day"
        type="button"
        role="tab"
        :aria-selected="activeDay === day.day"
        :aria-controls="`agenda-panel-${day.day}`"
        class="group relative overflow-hidden rounded-[20px] border-2 p-4 sm:p-6 text-left transition-all duration-300"
        :class="
          activeDay === day.day
            ? tone(day.day).ring
            : 'border-[#E4E7EC] bg-white hover:border-[#D0D5DD] dark:border-white/10 dark:bg-[#1D2426] dark:hover:border-white/20'
        "
        @click="activeDay = day.day"
      >
        <span
          aria-hidden="true"
          class="pointer-events-none absolute -right-2 -top-6 font-[700] leading-none tracking-[-0.06em] text-[96px] sm:text-[128px] transition-colors"
          :class="
            activeDay === day.day
              ? day.day === 1
                ? 'text-[#1AB24F]/[0.09]'
                : 'text-[#0071E7]/[0.09]'
              : 'text-[#0B1324]/[0.04] dark:text-white/[0.04]'
          "
          >0{{ day.day }}</span
        >
        <span class="relative flex flex-wrap items-center gap-2">
          <span
            class="rounded-md px-2 py-0.5 font-mono text-[10.5px] sm:text-[11px] font-[700] uppercase tracking-[0.12em]"
            :class="
              activeDay === day.day
                ? tone(day.day).chip
                : 'bg-[#F2F4F7] text-[#475467] dark:bg-white/[0.06] dark:text-[#C9C9C9]'
            "
            >{{ t(`${NS}.hero.dial.day`, { n: day.day }) }}</span
          >
          <span
            class="hidden sm:inline font-mono text-[11px] font-[500] uppercase tracking-[0.1em] text-[#98A2B3]"
            >{{ day.date || t(`${NS}.agenda.dateTba`) }}</span
          >
        </span>
        <span
          class="relative mt-3 block text-[14.5px] sm:text-[18px] xl:text-[20px] font-[700] leading-[1.3] text-[#0B1324] dark:text-white"
          >{{ day.title }}</span
        >
        <span
          class="relative mt-2 block font-mono text-[11px] sm:text-[12px] font-[500] text-[#667085] dark:text-[#A3A3A3]"
          >{{
            t(`${NS}.agenda.dayModules`, {
              from: day.from,
              to: day.to,
              n: day.sessions.length,
            })
          }}</span
        >
      </button>
    </div>

    <div class="ag-stack mx-auto mt-6 grid max-w-[1100px]">
      <div
        v-for="panel in days"
        :id="`agenda-panel-${panel.day}`"
        :key="panel.day"
        role="tabpanel"
        :aria-labelledby="`agenda-tab-${panel.day}`"
        class="ag-panel grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6"
        :class="{ 'is-active': panel.day === current.day }"
      >
        <aside
          class="ag-overview relative isolate overflow-hidden lg:col-span-4 rounded-[24px] p-6 sm:p-7 text-white self-start"
        >
          <div
            aria-hidden="true"
            class="absolute -z-10 -right-16 -top-16 w-56 h-56 rounded-full blur-[80px]"
            :class="panel.day === 1 ? 'bg-[#1AB24F]/35' : 'bg-[#0071E7]/40'"
          ></div>
          <p
            class="font-mono text-[11px] font-[600] uppercase tracking-[0.16em]"
            :class="panel.day === 1 ? 'text-[#3DDC84]' : 'text-[#4AA8FF]'"
          >
            {{ t(`${NS}.agenda.overviewTitle`) }}
          </p>
          <p
            class="mt-3 text-[15px] sm:text-[16px] leading-[1.65] text-white/85"
          >
            {{ panel.summary }}
          </p>
          <p
            class="sm:hidden mt-4 font-mono text-[11px] uppercase tracking-[0.1em] text-white/50"
          >
            {{ panel.date || t(`${NS}.agenda.dateTba`) }}
          </p>
          <div class="mt-6 border-t border-white/10 pt-5">
            <ul class="flex flex-col gap-3">
              <li
                v-for="method in methods"
                :key="method.label"
                class="flex items-center gap-3 text-[13.5px] font-[500] text-white/85"
              >
                <span
                  class="inline-flex w-8 h-8 shrink-0 items-center justify-center rounded-lg bg-white/[0.08]"
                  :class="panel.day === 1 ? 'text-[#3DDC84]' : 'text-[#4AA8FF]'"
                >
                  <svg
                    viewBox="0 0 24 24"
                    class="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.8"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    aria-hidden="true"
                  >
                    <path v-for="(d, k) in method.icon" :key="k" :d="d" />
                  </svg>
                </span>
                {{ method.label }}
              </li>
            </ul>
          </div>
        </aside>

        <ol class="relative lg:col-span-8">
          <span
            aria-hidden="true"
            class="absolute left-[19px] sm:left-[111px] top-6 bottom-6 w-px bg-gradient-to-b"
            :class="
              panel.day === 1
                ? 'from-[#1AB24F]/50 via-[#1AB24F]/20 to-transparent'
                : 'from-[#0071E7]/50 via-[#0071E7]/20 to-transparent'
            "
          ></span>
          <li
            v-for="session in panel.sessions"
            :key="session.n"
            class="relative flex items-stretch gap-4 sm:gap-0 pb-3 last:pb-0"
          >
            <div
              class="hidden sm:flex w-[92px] shrink-0 flex-col items-end pr-5 pt-5 text-right"
            >
              <span
                class="font-mono text-[12.5px] font-[700] text-[#0B1324] dark:text-white"
                >{{
                  session.time || t(`${NS}.agenda.session`, { n: session.n })
                }}</span
              >
              <span
                v-if="!session.time"
                class="mt-1 text-[11px] leading-tight text-[#98A2B3]"
                >{{ t(`${NS}.agenda.timeTba`) }}</span
              >
            </div>

            <span
              class="relative z-10 mt-4 sm:mt-5 shrink-0 flex w-10 h-10 sm:w-10 sm:h-10 items-center justify-center rounded-full border-4 border-[#F9FAFB] font-mono text-[11.5px] font-[700] text-white dark:border-[#17181A]"
              :class="
                session.type === 'handsOn'
                  ? 'bg-[#0071E7]'
                  : panel.day === 1
                    ? 'bg-[#1AB24F]'
                    : 'bg-[#0B2D5C]'
              "
              >{{ session.module }}</span
            >

            <div
              class="min-w-0 flex-1 sm:ml-4 rounded-[18px] border p-4 sm:p-5 transition-colors"
              :class="
                session.type === 'handsOn'
                  ? 'border-[#0071E7]/30 bg-gradient-to-br from-[#0071E7]/[0.07] to-white dark:to-[#1D2426]'
                  : 'border-[#E4E7EC] bg-white hover:border-[#D0D5DD] dark:border-white/10 dark:bg-[#1D2426]'
              "
            >
              <div class="flex flex-wrap items-center gap-2">
                <span
                  class="sm:hidden font-mono text-[11px] font-[700] text-[#0B1324] dark:text-white"
                  >{{
                    session.time || t(`${NS}.agenda.session`, { n: session.n })
                  }}</span
                >
                <span
                  class="rounded-full px-2 py-0.5 font-mono text-[10px] font-[700] uppercase tracking-[0.1em]"
                  :class="
                    session.type === 'handsOn'
                      ? 'bg-[#0071E7] text-white'
                      : session.type === 'simulation'
                        ? 'bg-[#071427] text-[#3DDC84] dark:bg-white/10'
                        : 'bg-[#F2F4F7] text-[#475467] dark:bg-white/[0.06] dark:text-[#C9C9C9]'
                  "
                  >{{ t(`${NS}.curriculum.types.${session.type}`) }}</span
                >
              </div>
              <p
                class="mt-2 text-[15.5px] sm:text-[17px] font-[600] leading-[1.35] text-[#0B1324] dark:text-white"
              >
                {{ session.title }}
              </p>
              <p
                class="mt-1.5 text-[13.5px] sm:text-[14px] leading-[1.6] text-[#667085] dark:text-[#A3A3A3]"
              >
                {{ session.scope }}
              </p>
            </div>
          </li>
        </ol>
      </div>
    </div>
  </section>
</template>

<style scoped>
.ag-overview {
  background: linear-gradient(155deg, #0a1b36 0%, #071427 60%, #040c1a 100%);
}

.ag-stack > .ag-panel {
  grid-area: 1 / 1;
}
.ag-panel {
  opacity: 0;
  transform: translateY(10px);
  visibility: hidden;
  transition:
    opacity 0.18s ease,
    transform 0.18s ease,
    visibility 0s linear 0.18s;
}
.ag-panel.is-active {
  opacity: 1;
  transform: none;
  visibility: visible;
  transition:
    opacity 0.35s ease 0.1s,
    transform 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.1s,
    visibility 0s;
}

@media (prefers-reduced-motion: reduce) {
  .ag-panel {
    transform: none;
    transition:
      opacity 0.15s ease,
      visibility 0s linear 0.15s;
  }
  .ag-panel.is-active {
    transition:
      opacity 0.15s ease,
      visibility 0s;
  }
}
</style>
