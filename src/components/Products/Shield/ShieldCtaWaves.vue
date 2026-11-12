<script setup>
import { onMounted, onBeforeUnmount, ref } from "vue";

const root = ref(null);
const canvas = ref(null);

const ART_W = 1464;
const ART_H = 850;
const SCALE = 0.35;
const TAU = Math.PI * 2;

const LAYERS = [
  {
    start: [-374, 742.705],
    curves: [
      [-205.25, 422.705, 76, 316.038, 391, 380.038],
      [694.75, 444.038, 919.75, 550.705, 1201, 444.038],
      [1426, 358.705, 1707.25, 401.372, 1876, 742.705],
    ],
    gradient: [362.31, 742.705],
    stops: [
      [0, "rgba(144,203,252,0.75)"],
      [0.5, "rgba(150,216,255,0.95)"],
      [1, "rgba(219,234,254,1)"],
    ],
    swell: [36, 820, 75],
    ripple: [12, 360, -120],
    bob: [9, 0.7, 0],
    depth: 0.4,
  },
  {
    start: [-261.5, 760.725],
    curves: [
      [19.75, 526.058, 301, 568.725, 582.25, 643.391],
      [919.75, 718.058, 1257.25, 568.725, 1538.5, 600.725],
      [1707.25, 622.058, 1819.75, 675.391, 1876, 760.725],
    ],
    gradient: [584.31, 760.725],
    stops: [
      [0, "rgba(107,193,250,0.8)"],
      [1, "rgba(185,215,253,0.95)"],
    ],
    swell: [31, 640, -120],
    ripple: [11, 300, 160],
    bob: [8, 0.9, 2.1],
    depth: 0.7,
  },
  {
    start: [-374, 870.933],
    curves: [
      [-92.75, 710.933, 188.5, 774.933, 526, 721.6],
      [863.5, 668.266, 1144.75, 796.266, 1482.25, 742.933],
      [1707.25, 710.933, 1819.75, 785.6, 1876, 870.933],
    ],
    gradient: [708.31, 870.933],
    stops: [
      [0, "rgba(66,178,247,0.85)"],
      [1, "rgba(142,193,252,0.95)"],
    ],
    swell: [29, 520, 160],
    ripple: [10, 250, -200],
    bob: [7, 1.1, 4.2],
    depth: 1,
  },
];

let raf = 0;
let observer = null;
let resizeObserver = null;
let visible = false;
let reduced = false;
let width = 0;
let height = 0;
let start = 0;
let profiles = [];

function cubic(p0, p1, p2, p3, t) {
  const m = 1 - t;
  return (
    m * m * m * p0 + 3 * m * m * t * p1 + 3 * m * t * t * p2 + t * t * t * p3
  );
}

function sampleTop(layer) {
  const pts = [];
  let [x0, y0] = layer.start;
  for (const [c1x, c1y, c2x, c2y, x1, y1] of layer.curves) {
    for (let k = 0; k <= 40; k++) {
      const t = k / 40;
      pts.push([cubic(x0, c1x, c2x, x1, t), cubic(y0, c1y, c2y, y1, t)]);
    }
    x0 = x1;
    y0 = y1;
  }
  pts.sort((a, b) => a[0] - b[0]);
  return pts;
}

function topAt(pts, x) {
  if (x <= pts[0][0]) return pts[0][1];
  for (let i = 1; i < pts.length; i++) {
    if (pts[i][0] >= x) {
      const [ax, ay] = pts[i - 1];
      const [bx, by] = pts[i];
      const f = bx === ax ? 0 : (x - ax) / (bx - ax);
      return ay + (by - ay) * f;
    }
  }
  return pts[pts.length - 1][1];
}

function buildProfiles() {
  profiles = LAYERS.map((layer) => {
    const pts = sampleTop(layer);
    const columns = [];
    for (let x = -40; x <= ART_W + 40; x += 12)
      columns.push([x, topAt(pts, x)]);
    return columns;
  });
}

function parallax() {
  const r = root.value.getBoundingClientRect();
  const vh = window.innerHeight || 1;
  const p = (r.top + r.height / 2 - vh / 2) / vh;
  return Math.max(-1, Math.min(1, p));
}

function draw(now) {
  const t = (now - start) / 1000;
  const ctx = canvas.value.getContext("2d");
  const drawn = Math.max(width, 900);
  const s = drawn / ART_W;
  const offsetX = (width - drawn) / 2;
  const offsetY = height - ART_H * s;
  const p = reduced ? 0 : parallax();

  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, canvas.value.width, canvas.value.height);
  ctx.setTransform(
    SCALE * s,
    0,
    0,
    SCALE * s,
    SCALE * offsetX,
    SCALE * offsetY,
  );
  ctx.globalAlpha = 0.8;

  LAYERS.forEach((layer, li) => {
    const [sa, sl, sv] = layer.swell;
    const [ra, rl, rv] = layer.ripple;
    const [ba, bw, bp] = layer.bob;
    const lift = ba * Math.sin(t * bw + bp) + p * 40 * layer.depth;

    const g = ctx.createLinearGradient(
      0,
      layer.gradient[0],
      0,
      layer.gradient[1],
    );
    for (const [o, c] of layer.stops) g.addColorStop(o, c);

    ctx.beginPath();
    ctx.moveTo(-40, ART_H + 80);
    for (const [x, y] of profiles[li]) {
      const wave =
        sa * Math.sin((TAU * (x - sv * t)) / sl) +
        ra * Math.sin((TAU * (x - rv * t)) / rl + li);
      ctx.lineTo(x, y + wave + lift);
    }
    ctx.lineTo(ART_W + 40, ART_H + 80);
    ctx.closePath();
    ctx.fillStyle = g;
    ctx.fill();
  });
  ctx.globalAlpha = 1;
}

function resize() {
  const el = root.value;
  if (!el) return;
  width = el.clientWidth;
  height = el.clientHeight;
  canvas.value.width = Math.max(1, Math.round(width * SCALE));
  canvas.value.height = Math.max(1, Math.round(height * SCALE));
  if (reduced || !raf) draw(performance.now());
}

function loop(now) {
  raf = requestAnimationFrame(loop);
  draw(now);
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
  start = performance.now();
  buildProfiles();
  resize();

  resizeObserver = new ResizeObserver(() => resize());
  resizeObserver.observe(root.value);

  observer = new IntersectionObserver(
    ([entry]) => {
      visible = entry.isIntersecting;
      if (visible) play();
      else pause();
    },
    { rootMargin: "120px 0px" },
  );
  observer.observe(root.value);
  document.addEventListener("visibilitychange", onVisibility);
});

onBeforeUnmount(() => {
  pause();
  observer?.disconnect();
  resizeObserver?.disconnect();
  document.removeEventListener("visibilitychange", onVisibility);
});
</script>

<template>
  <div ref="root" class="cta-ocean" aria-hidden="true">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<style scoped>
.cta-ocean {
  position: absolute;
  inset: -30px;
  pointer-events: none;
}

.cta-ocean canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  filter: blur(18px);
  transform: translateZ(0);
}
</style>
