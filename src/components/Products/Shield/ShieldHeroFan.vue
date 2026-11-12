<script setup>
import { onMounted, onBeforeUnmount, ref } from "vue";

const BASE_Y = 236.93;
const START_X = 1832.37;
const END_X = 32.37;
const PERIOD = 7;

const BLADES = [
  {
    c1: [1053.37, -60.57],
    c2: [712.37, 353.43],
    width: 46,
    alpha: 1,
    paint: "url(#shf-paint0)",
  },
  {
    c1: [1028.87, 33.43],
    c2: [752.87, 553.93],
    width: 46,
    alpha: 1,
    paint: "url(#shf-paint1)",
  },
  {
    c1: [1254.37, -64.57],
    c2: [760.87, -0.57],
    width: 22,
    alpha: 0.9,
    paint: "url(#shf-paint2)",
  },
  {
    c1: [1254.37, -64.57],
    c2: [803.37, 141.93],
    width: 22,
    alpha: 0.9,
    paint: "url(#shf-paint3)",
  },
];

const ART_W = 1864;
const MIN_WIDTH = 900;
const EDGE = 60;

function peakOffset(blade) {
  let peak = 0;
  for (let k = 0; k <= 60; k++) {
    const t = k / 60;
    const m = 1 - t;
    const y =
      m * m * m * BASE_Y +
      3 * m * m * t * blade.c1[1] +
      3 * m * t * t * blade.c2[1] +
      t * t * t * BASE_Y;
    peak = Math.max(peak, Math.abs(y - BASE_Y));
  }
  return peak;
}

const PEAK = Math.max(...BLADES.map(peakOffset));

const root = ref(null);
const svg = ref(null);
const group = ref(null);
const paths = ref([]);

let reach = 1;
let resizeObserver = null;

function fit() {
  const el = root.value;
  const box = svg.value;
  if (!el || !box) return;
  const w = el.clientWidth;
  const h = el.clientHeight;
  const drawn = Math.max(w, MIN_WIDTH);
  const viewH = (ART_W * h) / drawn;
  box.setAttribute("viewBox", `0 ${BASE_Y - viewH / 2} ${ART_W} ${viewH}`);
  box.style.width = `${drawn}px`;
  box.style.height = `${h}px`;
  reach = Math.max(1, (viewH / 2 - EDGE) / PEAK);
}

let raf = 0;
let observer = null;
let visible = true;
let reduced = false;
let start = 0;

function pathFor(blade, lift) {
  const y1 = BASE_Y + (blade.c1[1] - BASE_Y) * lift;
  const y2 = BASE_Y + (blade.c2[1] - BASE_Y) * lift;
  return `M${START_X} ${BASE_Y}C${blade.c1[0]} ${y1} ${blade.c2[0]} ${y2} ${END_X} ${BASE_Y}`;
}

function render(now) {
  const t = (now - start) / 1000;
  const turn = (t / PERIOD) * Math.PI * 2;
  const order = BLADES.map((blade, i) => {
    const theta = turn + (i * Math.PI * 2) / BLADES.length;
    const lift = Math.sin(theta) * reach;
    const depth = Math.cos(theta);
    const facing = (depth + 1) / 2;
    const el = paths.value[i];
    el.setAttribute("d", pathFor(blade, lift));
    el.setAttribute(
      "stroke-width",
      (blade.width * (0.55 + 0.45 * facing)).toFixed(2),
    );
    el.setAttribute(
      "opacity",
      ((0.35 + 0.65 * facing) * blade.alpha).toFixed(3),
    );
    return { el, depth };
  });
  order.sort((a, b) => a.depth - b.depth);
  for (const { el } of order) {
    if (group.value.lastElementChild !== el) group.value.appendChild(el);
  }
}

function renderStatic() {
  BLADES.forEach((blade, i) => {
    const el = paths.value[i];
    el.setAttribute("d", pathFor(blade, reach));
    el.setAttribute("stroke-width", blade.width);
    el.setAttribute("opacity", blade.alpha);
  });
}

function loop(now) {
  raf = requestAnimationFrame(loop);
  render(now);
}

function play() {
  if (raf || reduced || !visible || document.hidden) return;
  raf = requestAnimationFrame(loop);
}

function pause() {
  if (raf) cancelAnimationFrame(raf);
  raf = 0;
}

function onVisibility() {
  if (document.hidden) pause();
  else play();
}

onMounted(() => {
  reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  start = performance.now() - (PERIOD * 1000) / 8;
  fit();
  resizeObserver = new ResizeObserver(() => {
    fit();
    if (reduced) renderStatic();
    else if (!raf) render(performance.now());
  });
  resizeObserver.observe(root.value);
  if (reduced) {
    renderStatic();
    return;
  }
  render(performance.now());
  observer = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) play();
    else pause();
  });
  observer.observe(root.value);
  document.addEventListener("visibilitychange", onVisibility);
  play();
});

onBeforeUnmount(() => {
  pause();
  observer?.disconnect();
  resizeObserver?.disconnect();
  document.removeEventListener("visibilitychange", onVisibility);
});
</script>

<template>
  <div ref="root" class="hero-fan" aria-hidden="true">
    <svg
      ref="svg"
      class="hero-fan__svg"
      viewBox="0 7 1864 460"
      preserveAspectRatio="xMidYMid meet"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient
          id="shf-paint0"
          x1="1832.37"
          y1="191.933"
          x2="32.3672"
          y2="191.933"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="white" stop-opacity="0.15" />
          <stop offset="0.17309" stop-color="#93FDEA" stop-opacity="0.5" />
          <stop offset="0.341381" stop-color="#6ED7E7" stop-opacity="0.65" />
          <stop offset="0.58" stop-color="#47B7FD" />
          <stop offset="0.8" stop-color="#A5F0FC" stop-opacity="0.45" />
          <stop offset="1" stop-color="#D5EFFF" stop-opacity="0.15" />
        </linearGradient>
        <linearGradient
          id="shf-paint1"
          x1="1832.37"
          y1="191.933"
          x2="32.3672"
          y2="191.933"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="white" stop-opacity="0.15" />
          <stop offset="0.17309" stop-color="#93FDEA" stop-opacity="0.5" />
          <stop offset="0.341381" stop-color="#6ED7E7" stop-opacity="0.65" />
          <stop offset="0.58" stop-color="#47B7FD" />
          <stop offset="0.8" stop-color="#A5F0FC" stop-opacity="0.45" />
          <stop offset="1" stop-color="#D5EFFF" stop-opacity="0.15" />
        </linearGradient>
        <linearGradient
          id="shf-paint2"
          x1="1832.37"
          y1="191.933"
          x2="32.3672"
          y2="191.933"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="white" stop-opacity="0.15" />
          <stop offset="0.2" stop-color="#93FDEA" stop-opacity="0.5" />
          <stop offset="0.4" stop-color="#6ED7E7" stop-opacity="0.65" />
          <stop offset="0.58" stop-color="#47B7FD" />
          <stop offset="0.8" stop-color="#A5F0FC" stop-opacity="0.45" />
          <stop offset="1" stop-color="#D5EFFF" stop-opacity="0.15" />
        </linearGradient>
        <linearGradient
          id="shf-paint3"
          x1="1832.37"
          y1="191.933"
          x2="32.3672"
          y2="191.933"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="white" stop-opacity="0.15" />
          <stop offset="0.2" stop-color="#93FDEA" stop-opacity="0.5" />
          <stop offset="0.4" stop-color="#6ED7E7" stop-opacity="0.65" />
          <stop offset="0.58" stop-color="#47B7FD" />
          <stop offset="0.8" stop-color="#A5F0FC" stop-opacity="0.45" />
          <stop offset="1" stop-color="#D5EFFF" stop-opacity="0.15" />
        </linearGradient>
      </defs>
      <g ref="group">
        <path
          v-for="(blade, i) in BLADES"
          :key="i"
          :ref="(el) => (paths[i] = el)"
          :stroke="blade.paint"
          :stroke-width="blade.width"
        />
      </g>
    </svg>
  </div>
</template>

<style scoped>
.hero-fan {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.hero-fan__svg {
  position: absolute;
  left: 50%;
  top: 0;
  display: block;
  width: max(100%, 900px);
  height: 100%;
  overflow: visible;
  filter: blur(9px);
  transform: translate3d(-50%, 0, 0);
}
</style>
