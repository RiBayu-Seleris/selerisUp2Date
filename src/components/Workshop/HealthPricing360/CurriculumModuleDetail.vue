<script setup>
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const props = defineProps({
  module: { type: Object, required: true },
  total: { type: Number, required: true },
  modules: { type: Array, required: true },
  compact: { type: Boolean, default: false },
});

const emit = defineEmits(["prev", "next", "select"]);

const NS = "workshop.healthpricing360";
const { t } = useI18n();

const accent = computed(() => (props.module.day === 1 ? "#3DDC84" : "#4AA8FF"));

const segmentStyle = (m) => {
  const color = m.day === 1 ? "#3DDC84" : "#4AA8FF";
  if (m.index === props.module.index)
    return { backgroundColor: color, boxShadow: `0 0 14px ${color}` };
  return {
    backgroundColor: color,
    opacity: m.index < props.module.index ? 0.45 : 0.14,
  };
};
</script>

<template>
  <div
    class="cm-panel relative isolate overflow-hidden text-white"
    :class="
      compact
        ? 'rounded-[18px] p-5'
        : 'rounded-[28px] p-7 sm:p-9 xl:p-10 min-h-[520px] flex flex-col'
    "
  >
    <div
      aria-hidden="true"
      class="absolute -z-10 -right-20 -top-24 w-80 h-80 rounded-full blur-[100px] opacity-40 transition-colors duration-700"
      :style="{ backgroundColor: accent }"
    ></div>
    <Transition name="cm-fade">
      <span
        v-if="!compact"
        :key="module.number"
        aria-hidden="true"
        class="cm-watermark pointer-events-none absolute -right-3 -top-8 select-none font-[700] leading-none tracking-[-0.06em]"
        >{{ module.number }}</span
      >
    </Transition>

    <div class="cm-stack relative grid">
      <Transition name="cm-swap">
        <div :key="module.index" class="relative flex flex-col">
          <div class="flex flex-wrap items-center gap-2">
            <span
              class="rounded-full px-2.5 py-1 font-mono text-[10.5px] font-[600] uppercase tracking-[0.12em]"
              :style="{ backgroundColor: accent + '22', color: accent }"
            >
              {{
                t(`${NS}.curriculum.sessionOf`, {
                  day: module.day,
                  n: module.session,
                })
              }}<template v-if="module.time"> · {{ module.time }}</template>
            </span>
            <span
              v-if="module.type !== 'lecture'"
              class="rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-[10.5px] font-[700] uppercase tracking-[0.08em] text-white"
            >
              {{ t(`${NS}.curriculum.types.${module.type}`) }}
            </span>
            <span
              class="ml-auto font-mono text-[11px] font-[500] uppercase tracking-[0.12em] text-white/45"
            >
              {{
                t(`${NS}.curriculum.position`, {
                  n: module.number,
                  total: total,
                })
              }}
            </span>
          </div>

          <div
            class="flex items-start gap-4"
            :class="compact ? 'mt-4' : 'mt-6'"
          >
            <span
              v-if="!compact"
              class="shrink-0 inline-flex w-14 h-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06]"
              :style="{ color: accent }"
            >
              <svg
                viewBox="0 0 24 24"
                class="w-7 h-7"
                fill="none"
                stroke="currentColor"
                stroke-width="1.6"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <path v-for="(d, k) in module.icon" :key="k" :d="d" />
              </svg>
            </span>
            <h3
              class="font-[700] leading-[1.25] tracking-[-0.015em]"
              :class="
                compact
                  ? 'text-[18px]'
                  : 'text-[22px] sm:text-[26px] xl:text-[28px]'
              "
            >
              {{ module.title }}
            </h3>
          </div>

          <p
            class="font-mono text-[10.5px] font-[600] uppercase tracking-[0.16em] text-white/45"
            :class="compact ? 'mt-4' : 'mt-7'"
          >
            {{ t(`${NS}.curriculum.scope`) }}
          </p>
          <p
            class="mt-2 leading-[1.7] text-white/80"
            :class="compact ? 'text-[14px]' : 'text-[15.5px] sm:text-[17px]'"
          >
            {{ module.scope }}
          </p>

          <p
            class="font-mono text-[10.5px] font-[600] uppercase tracking-[0.16em] text-white/45"
            :class="compact ? 'mt-4' : 'mt-6'"
          >
            {{ t(`${NS}.curriculum.topics`) }}
          </p>
          <ul class="mt-2.5 flex flex-wrap gap-2">
            <li
              v-for="topic in module.topics"
              :key="topic"
              class="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.06] px-2.5 py-1.5 text-[12.5px] sm:text-[13px] font-[500] text-white/85"
            >
              <span
                class="w-1.5 h-1.5 rounded-full"
                :style="{ backgroundColor: accent }"
              ></span>
              {{ topic }}
            </li>
          </ul>
        </div>
      </Transition>
    </div>

    <div v-if="!compact" class="mt-auto pt-10">
      <ol class="flex gap-1.5">
        <li v-for="m in modules" :key="m.index" class="flex-1">
          <button
            type="button"
            :aria-label="`${t(`${NS}.curriculum.module`)} ${m.number}: ${m.title}`"
            :aria-current="m.index === module.index ? 'step' : undefined"
            class="block h-1.5 w-full rounded-full transition-all duration-500 hover:!opacity-100"
            :style="segmentStyle(m)"
            @click="emit('select', m.index)"
          ></button>
        </li>
      </ol>
      <div
        class="mt-2.5 flex justify-between font-mono text-[10.5px] uppercase tracking-[0.14em] text-white/40"
      >
        <span>{{ t(`${NS}.hero.dial.day`, { n: 1 }) }}</span>
        <span>{{ t(`${NS}.hero.dial.day`, { n: 2 }) }}</span>
      </div>

      <div class="mt-6 flex items-center justify-between gap-3">
        <button
          type="button"
          class="inline-flex h-11 items-center gap-2 rounded-xl border border-white/15 px-4 text-[13.5px] font-[600] text-white/85 transition-colors hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent"
          :disabled="module.index === 0"
          @click="emit('prev')"
        >
          <svg
            viewBox="0 0 24 24"
            class="w-4 h-4"
            fill="none"
            stroke="currentColor"
            stroke-width="2.2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="M19 12H5M11 18l-6-6 6-6" />
          </svg>
          {{ t(`${NS}.curriculum.prev`) }}
        </button>
        <button
          type="button"
          class="inline-flex h-11 items-center gap-2 rounded-xl px-4 text-[13.5px] font-[700] text-[#041B12] transition-transform active:scale-[0.97] disabled:opacity-30"
          :style="{ backgroundColor: accent }"
          :disabled="module.index === total - 1"
          @click="emit('next')"
        >
          {{ t(`${NS}.curriculum.next`) }}
          <svg
            viewBox="0 0 24 24"
            class="w-4 h-4"
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
      </div>
    </div>
  </div>
</template>

<style scoped>
.cm-panel {
  background: linear-gradient(155deg, #0a1b36 0%, #071427 55%, #040c1a 100%);
}

.cm-watermark {
  font-size: 200px;
  color: transparent;
  -webkit-text-stroke: 1.5px rgba(255, 255, 255, 0.08);
}

.cm-stack > * {
  grid-area: 1 / 1;
}
.cm-swap-enter-active {
  transition:
    opacity 0.3s ease 0.08s,
    transform 0.45s cubic-bezier(0.16, 1, 0.3, 1) 0.08s;
}
.cm-swap-leave-active {
  transition: opacity 0.16s ease;
}
.cm-swap-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
.cm-swap-leave-to {
  opacity: 0;
}
.cm-fade-enter-active,
.cm-fade-leave-active {
  transition: opacity 0.35s ease;
}
.cm-fade-enter-from,
.cm-fade-leave-to {
  opacity: 0;
}

@media (prefers-reduced-motion: reduce) {
  .cm-swap-enter-active,
  .cm-swap-leave-active {
    transition: opacity 0.15s ease;
  }
  .cm-swap-enter-from {
    transform: none;
  }
}
</style>
