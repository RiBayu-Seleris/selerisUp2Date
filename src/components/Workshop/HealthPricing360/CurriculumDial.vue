<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";

const props = defineProps({
  modules: { type: Array, required: true },
  autoplay: { type: Boolean, default: true },
});

const { t } = useI18n();

const SIZE = 400;
const C = SIZE / 2;
const R_SEGMENT = 158;
const R_TICKS = 190;
const R_LABEL = 118;
const GAP = 4;
const DAY_COLORS = ["#3DDC84", "#4AA8FF"];
const INTERVAL_MS = 2800;

const active = ref(0);
const paused = ref(false);
const reduceMotion = ref(false);
let timer = null;

const point = (r, deg) => {
  const a = (deg * Math.PI) / 180;
  return [C + r * Math.sin(a), C - r * Math.cos(a)];
};

const arc = (r, a0, a1) => {
  const [x0, y0] = point(r, a0);
  const [x1, y1] = point(r, a1);
  const large = a1 - a0 > 180 ? 1 : 0;
  return `M ${x0.toFixed(2)} ${y0.toFixed(2)} A ${r} ${r} 0 ${large} 1 ${x1.toFixed(2)} ${y1.toFixed(2)}`;
};

const step = computed(() => 360 / props.modules.length);

const segments = computed(() =>
  props.modules.map((module, i) => {
    const a0 = i * step.value + GAP / 2;
    const a1 = (i + 1) * step.value - GAP / 2;
    const mid = (a0 + a1) / 2;
    const [lx, ly] = point(R_LABEL, mid);
    const day = module.day ?? (i < props.modules.length / 2 ? 1 : 2);
    return {
      i,
      d: arc(R_SEGMENT, a0, a1),
      lx,
      ly,
      color: DAY_COLORS[day - 1],
      day,
      number: String(i + 1).padStart(2, "0"),
    };
  }),
);

const ticks = computed(() =>
  Array.from({ length: 72 }, (_, i) => {
    const deg = i * 5;
    const major = deg % 36 === 0;
    const [x0, y0] = point(R_TICKS, deg);
    const [x1, y1] = point(R_TICKS - (major ? 12 : 6), deg);
    return { x0, y0, x1, y1, major };
  }),
);

const current = computed(() => segments.value[active.value]);
const currentModule = computed(() => props.modules[active.value]);

const pointer = computed(() => {
  const mid = (active.value + 0.5) * step.value;
  return { rotate: mid };
});

const next = () => {
  active.value = (active.value + 1) % props.modules.length;
};

const start = () => {
  stop();
  if (!props.autoplay || reduceMotion.value) return;
  timer = setInterval(() => {
    if (!paused.value && !document.hidden) next();
  }, INTERVAL_MS);
};

const stop = () => {
  if (timer) clearInterval(timer);
  timer = null;
};

const select = (i) => {
  active.value = i;
  start();
};

const onKey = (e, i) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    select(i);
  } else if (e.key === "ArrowRight" || e.key === "ArrowDown") {
    e.preventDefault();
    select((i + 1) % props.modules.length);
    document
      .getElementById(`dial-seg-${(i + 1) % props.modules.length}`)
      ?.focus();
  } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
    e.preventDefault();
    const prev = (i - 1 + props.modules.length) % props.modules.length;
    select(prev);
    document.getElementById(`dial-seg-${prev}`)?.focus();
  }
};

onMounted(() => {
  reduceMotion.value = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  start();
});

onBeforeUnmount(stop);
</script>

<template>
  <div
    class="flex flex-col items-center w-full"
    @mouseenter="paused = true"
    @mouseleave="paused = false"
    @focusin="paused = true"
    @focusout="paused = false"
  >
    <div
      class="relative w-full max-w-[300px] sm:max-w-[380px] xl:max-w-[370px] 2xls:max-w-[430px] aspect-square"
    >
      <div
        aria-hidden="true"
        class="absolute inset-[14%] rounded-full blur-[48px] opacity-60 transition-colors duration-700"
        :style="{ backgroundColor: current.color + '55' }"
      ></div>

      <svg
        :viewBox="`0 0 ${SIZE} ${SIZE}`"
        class="relative w-full h-full overflow-visible"
        role="group"
        :aria-label="t('workshop.healthpricing360.hero.dial.label')"
      >
        <g class="dial-ticks">
          <line
            v-for="(tick, i) in ticks"
            :key="i"
            :x1="tick.x0"
            :y1="tick.y0"
            :x2="tick.x1"
            :y2="tick.y1"
            :stroke="
              tick.major ? 'rgba(255,255,255,0.45)' : 'rgba(255,255,255,0.16)'
            "
            :stroke-width="tick.major ? 1.6 : 1"
            stroke-linecap="round"
          />
        </g>

        <circle
          :cx="C"
          :cy="C"
          :r="R_SEGMENT"
          fill="none"
          stroke="rgba(255,255,255,0.05)"
          stroke-width="30"
        />

        <g>
          <path
            v-for="seg in segments"
            :id="`dial-seg-${seg.i}`"
            :key="seg.i"
            :d="seg.d"
            fill="none"
            :stroke="seg.color"
            :style="{ color: seg.color }"
            stroke-linecap="round"
            class="dial-seg cursor-pointer outline-none"
            :class="{ 'is-active': seg.i === active }"
            :stroke-width="seg.i === active ? 26 : 18"
            :stroke-opacity="seg.i === active ? 1 : 0.32"
            tabindex="0"
            role="button"
            :aria-pressed="seg.i === active"
            :aria-label="`${t('workshop.healthpricing360.hero.dial.module')} ${seg.number}: ${modules[seg.i].title}`"
            @click="select(seg.i)"
            @mouseenter="select(seg.i)"
            @keydown="onKey($event, seg.i)"
          />
        </g>

        <g aria-hidden="true">
          <text
            v-for="seg in segments"
            :key="`l-${seg.i}`"
            :x="seg.lx"
            :y="seg.ly"
            text-anchor="middle"
            dominant-baseline="central"
            class="dial-label"
            :fill="seg.i === active ? '#FFFFFF' : 'rgba(255,255,255,0.42)'"
            :font-weight="seg.i === active ? 700 : 500"
          >
            {{ seg.number }}
          </text>
        </g>

        <g
          aria-hidden="true"
          class="dial-pointer"
          :style="{ transform: `rotate(${pointer.rotate}deg)` }"
        >
          <circle
            :cx="C"
            :cy="C - R_SEGMENT - 22"
            r="4"
            :fill="current.color"
          />
        </g>

        <circle
          :cx="C"
          :cy="C"
          r="92"
          fill="rgba(4,12,26,0.62)"
          stroke="rgba(255,255,255,0.12)"
        />
        <circle
          :cx="C"
          :cy="C"
          r="80"
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          stroke-dasharray="2 6"
        />
      </svg>

      <div
        aria-hidden="true"
        class="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center"
      >
        <span
          class="text-[10px] sm:text-[11px] font-[600] uppercase tracking-[0.2em] text-white/55"
        >
          {{ t("workshop.healthpricing360.hero.dial.module") }}
        </span>
        <span class="mt-0.5 flex items-baseline gap-1 text-white">
          <span
            :key="current.number"
            class="dial-number text-[40px] sm:text-[52px] xl:text-[58px] font-[700] leading-none tracking-tight"
            >{{ current.number }}</span
          >
          <span class="text-[13px] sm:text-[15px] font-[500] text-white/45"
            >/{{ modules.length }}</span
          >
        </span>
        <span
          class="mt-2 sm:mt-2.5 rounded-full px-2.5 py-[3px] text-[10px] sm:text-[11px] font-[600] tracking-[0.04em] transition-colors duration-500"
          :style="{
            backgroundColor: current.color + '26',
            color: current.color,
          }"
        >
          {{ t("workshop.healthpricing360.hero.dial.day", { n: current.day }) }}
        </span>
      </div>
    </div>

    <div
      class="relative mt-4 sm:mt-5 w-full max-w-[440px] min-h-[104px] sm:min-h-[96px] rounded-2xl border border-white/10 bg-white/[0.06] backdrop-blur-sm px-4 py-3.5 sm:px-5 sm:py-4"
      aria-live="polite"
    >
      <span
        aria-hidden="true"
        class="absolute left-0 top-4 bottom-4 w-[3px] rounded-full transition-colors duration-500"
        :style="{ backgroundColor: current.color }"
      ></span>
      <Transition name="dial-caption" mode="out-in">
        <div :key="active">
          <p
            class="text-[14px] sm:text-[15px] font-[600] leading-snug text-white"
          >
            {{ currentModule.title }}
          </p>
          <p
            class="mt-1 text-[12.5px] sm:text-[13px] leading-relaxed text-white/65"
          >
            {{ currentModule.scope }}
          </p>
        </div>
      </Transition>
    </div>
  </div>
</template>

<style scoped>
.dial-seg {
  transition:
    stroke-width 0.45s cubic-bezier(0.16, 1, 0.3, 1),
    stroke-opacity 0.45s ease,
    filter 0.45s ease;
}
.dial-seg.is-active {
  filter: drop-shadow(0 0 10px currentColor);
}
.dial-seg:focus-visible {
  stroke-opacity: 1;
  stroke-width: 26;
}
.dial-label {
  font-size: 13px;
  font-family: Poppins, sans-serif;
  letter-spacing: 0.04em;
  transition: fill 0.4s ease;
}
.dial-pointer {
  transform-origin: 200px 200px;
  transform-box: view-box;
  transition: transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
}
.dial-ticks {
  transform-origin: 200px 200px;
  transform-box: view-box;
  animation: dial-spin 90s linear infinite;
}
.dial-number {
  animation: dial-number-in 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}
.dial-caption-enter-active,
.dial-caption-leave-active {
  transition:
    opacity 0.25s ease,
    transform 0.3s ease;
}
.dial-caption-enter-from {
  opacity: 0;
  transform: translateY(6px);
}
.dial-caption-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}

@keyframes dial-spin {
  to {
    transform: rotate(360deg);
  }
}
@keyframes dial-number-in {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .dial-ticks,
  .dial-number {
    animation: none;
  }
  .dial-pointer,
  .dial-seg {
    transition: none;
  }
}
</style>
