<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import FacilitatorGlassCard from "./FacilitatorGlassCard.vue";

const props = defineProps({
  people: { type: Array, required: true },
});

const NS = "workshop.healthpricing360.facilitators";
const { t } = useI18n();

const XS = [0, 190, 345, 470, 570];
const SCALES = [1, 0.86, 0.74, 0.64, 0.56];

const active = ref(0);
const stage = ref(null);
const width = ref(1296);
let resizeObserver = null;
let startX = null;
let swiped = false;

const config = computed(() => {
  const w = width.value;
  if (w >= 1100) return { card: 300, f: 1, visible: 4 };
  if (w >= 700) return { card: 260, f: 0.78, visible: 3 };
  return { card: 230, f: 0.5, visible: 2 };
});

const offsetOf = (i) => {
  const n = props.people.length;
  const half = Math.floor(n / 2);
  return ((((i - active.value) % n) + n + half) % n) - half;
};

const visibilityOf = (i) => {
  const d = Math.abs(offsetOf(i));
  const { visible } = config.value;
  if (d < visible) return 1;
  if (d === visible) return 0.45;
  return 0;
};

const styleFor = (i) => {
  const o = offsetOf(i);
  const d = Math.abs(o);
  const { f, card } = config.value;
  const base = XS[Math.min(d, 4)] + Math.max(0, d - 4) * 40;
  const opacity = visibilityOf(i);
  return {
    width: `${card}px`,
    transform: `translateX(${Math.sign(o) * base * f}px) scale(${SCALES[Math.min(d, 4)]}) rotateY(${Math.max(-24, Math.min(24, o * 6))}deg)`,
    zIndex: 50 - d,
    opacity,
    pointerEvents: opacity === 0 ? "none" : undefined,
  };
};

const dimFor = (i) => Math.min(Math.abs(offsetOf(i)) * 0.16, 0.6);

const go = (delta) => {
  const n = props.people.length;
  active.value = (active.value + delta + n) % n;
};

const focus = (i) => {
  if (swiped) {
    swiped = false;
    return;
  }
  active.value = i;
};

const onKeydown = (e) => {
  if (e.key === "ArrowRight") {
    e.preventDefault();
    go(1);
  } else if (e.key === "ArrowLeft") {
    e.preventDefault();
    go(-1);
  }
};

const onPointerDown = (e) => {
  startX = e.clientX;
  swiped = false;
};

const onPointerUp = (e) => {
  if (startX === null) return;
  const dx = e.clientX - startX;
  startX = null;
  if (Math.abs(dx) > 40) {
    swiped = true;
    go(dx < 0 ? 1 : -1);
  }
};

watch(
  () => props.people.length,
  () => {
    active.value = 0;
  },
);

onMounted(() => {
  resizeObserver = new ResizeObserver(([entry]) => {
    width.value = entry.contentRect.width;
  });
  if (stage.value) resizeObserver.observe(stage.value);
});

onBeforeUnmount(() => resizeObserver?.disconnect());
</script>

<template>
  <div
    role="region"
    aria-roledescription="carousel"
    :aria-label="t(`${NS}.title`)"
    @keydown="onKeydown"
  >
    <div
      ref="stage"
      class="cf-stage relative w-full select-none py-4"
      @pointerdown="onPointerDown"
      @pointerup="onPointerUp"
      @pointercancel="startX = null"
      @pointerleave="startX = null"
    >
      <ul class="grid">
        <li
          v-for="(person, i) in people"
          :key="person.name"
          class="cf-item relative col-start-1 row-start-1 justify-self-center"
          :style="styleFor(i)"
          :aria-hidden="visibilityOf(i) === 0 ? 'true' : undefined"
          :aria-current="offsetOf(i) === 0 ? 'true' : undefined"
        >
          <span
            v-if="offsetOf(i) === 0"
            aria-hidden="true"
            class="absolute -inset-4 -z-10 rounded-[40px] bg-[#3DDC84]/25 blur-2xl"
          ></span>
          <FacilitatorGlassCard :person="person" variant="cover" :index="i" />
          <span
            aria-hidden="true"
            class="pointer-events-none absolute inset-0 z-[3] rounded-[28px] bg-[#040c1a] transition-opacity duration-500"
            :style="{ opacity: dimFor(i) }"
          ></span>
          <button
            v-if="offsetOf(i) !== 0"
            type="button"
            class="absolute inset-0 z-[4] cursor-pointer rounded-[28px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3DDC84]"
            :tabindex="Math.abs(offsetOf(i)) === 1 ? 0 : -1"
            :aria-label="t(`${NS}.focus`, { name: person.name })"
            @click="focus(i)"
          ></button>
        </li>
      </ul>
    </div>

    <div class="mt-5 flex items-center justify-center gap-4">
      <button
        type="button"
        :aria-label="t(`${NS}.prev`)"
        class="inline-flex w-11 h-11 items-center justify-center rounded-full border border-white/20 bg-white/[0.06] text-white backdrop-blur-md transition-colors hover:bg-white/15"
        @click="go(-1)"
      >
        <svg
          viewBox="0 0 24 24"
          class="w-5 h-5"
          fill="none"
          stroke="currentColor"
          stroke-width="2.2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="m15 18-6-6 6-6" />
        </svg>
      </button>
      <div class="flex flex-col items-center gap-2">
        <div class="flex items-center gap-1.5">
          <button
            v-for="(person, i) in people"
            :key="person.name"
            type="button"
            :aria-label="t(`${NS}.focus`, { name: person.name })"
            :aria-current="active === i ? 'true' : undefined"
            class="h-2 rounded-full transition-all duration-300"
            :class="
              active === i
                ? 'w-6 bg-[#3DDC84]'
                : 'w-2 bg-white/30 hover:bg-white/60'
            "
            @click="active = i"
          ></button>
        </div>
        <p
          class="font-mono text-[11px] font-[600] uppercase tracking-[0.14em] text-white/45"
          aria-live="polite"
        >
          {{ t(`${NS}.counter`, { n: active + 1, total: people.length }) }}
        </p>
      </div>
      <button
        type="button"
        :aria-label="t(`${NS}.next`)"
        class="inline-flex w-11 h-11 items-center justify-center rounded-full border border-white/20 bg-white/[0.06] text-white backdrop-blur-md transition-colors hover:bg-white/15"
        @click="go(1)"
      >
        <svg
          viewBox="0 0 24 24"
          class="w-5 h-5"
          fill="none"
          stroke="currentColor"
          stroke-width="2.2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
      </button>
    </div>
  </div>
</template>

<style scoped>
.cf-stage {
  perspective: 1600px;
  touch-action: pan-y;
}

.cf-item {
  transform-origin: center center;
  transition:
    transform 0.65s cubic-bezier(0.16, 1, 0.3, 1),
    opacity 0.45s ease;
  will-change: transform;
}

@media (prefers-reduced-motion: reduce) {
  .cf-item {
    transition: opacity 0.2s ease;
  }
}
</style>
