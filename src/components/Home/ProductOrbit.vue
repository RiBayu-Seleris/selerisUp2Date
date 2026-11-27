<script setup>
import {
  nextTick,
  onBeforeUnmount,
  onMounted,
  reactive,
  ref,
  watch,
} from "vue";
import { useI18n } from "vue-i18n";
import Logo from "@/assets/images/logo.png";
import DarkLogo from "@/assets/images/darklogo.png";
import { productOrbit } from "@/Data/ProductOrbit.js";

const { t, locale } = useI18n();

const items = productOrbit;
const N = items.length;
const TAU = Math.PI * 2;
const KN = Math.min(1, Math.max(0.7, Math.pow(9 / N, 0.35)));
const compactNav = N > 12;
const CARD_W = 196;
const CARD_H = 84;
const POLE = 26;
const BOB = 12;
const DOT = 10;
const GAP = 24;
const MIN_SCALE = 0.56;
const FOG = 0.62;
const STEP = Math.max(3.5, Math.min(5, 45 / N));
const HOLD = 5000;
const VISIBLE = 9;
const HALF = Math.min(200, (VISIBLE / N) * 180);
const PHONE_HALF = 65;
const TABLET_HALF = 105;
const GRAY = N > 12 ? 0.9 : 0;

const smooth = (v) => {
  const x = Math.min(1, Math.max(0, v));
  return x * x * (3 - 2 * x);
};

const showAt = (deg, half = HALF) => smooth((half + 15 - deg) / 40);

const scaleAt = (cos) => MIN_SCALE + (1 - MIN_SCALE) * ((cos + 1) / 2);

const fitRx = (width, s, half) => {
  let rx = Math.min(540, (width / 2 - 2) / 1.08);
  for (let deg = 3; deg <= 180; deg += 3) {
    const show = showAt(deg, half);
    const sin = Math.sin((deg * Math.PI) / 180);
    if (show < 0.15 || sin < 0.05) continue;
    const cos = Math.cos((deg * Math.PI) / 180);
    const halfWidth = (CARD_W * s * scaleAt(cos) * (0.6 + 0.4 * show)) / 2;
    rx = Math.min(rx, (width / 2 - 4 - halfWidth) / sin);
  }
  return rx;
};

const root = ref(null);
const stage = ref(null);
const hub = ref(null);
const dashRing = ref(null);
const captionBox = ref(null);
const active = ref(0);
const lines = ref(3);
const descs = [];
const ring = reactive({
  ready: false,
  kn: KN,
  cx: 0,
  cy: 0,
  rx: 0,
  ry: 0,
  dash: "2 7",
  hubX: 0,
  hubY: 0,
});
const nodes = [];

let geo = null;
let pos = 0;
let speed = 0;
let tween = null;
let holdUntil = 0;
let linkHover = false;
let focused = false;
let drag = null;
let suppressClick = false;
let raf = 0;
let last = 0;
let inView = false;
let reduce = false;
let lastWidth = -1;
let dashUnit = 0;
let resizeObserver = null;
let intersectionObserver = null;
let motionQuery = null;
let tabletQuery = null;
let phoneQuery = null;

const easeInOut = (p) =>
  p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;

const pad2 = (n) => String(n).padStart(2, "0");

const logoSize = (item) => ({
  width: `calc(${item.logoWidth}px * var(--ks))`,
  height: `calc(${item.logoHeight}px * var(--ks))`,
});

const measureLines = () => {
  const box = captionBox.value;
  if (!box) return;
  const max =
    parseFloat(getComputedStyle(box).getPropertyValue("--max-lines")) || 3;
  let fewest = Infinity;
  for (const el of descs) {
    if (!el) continue;
    const lineHeight = parseFloat(getComputedStyle(el).lineHeight);
    if (lineHeight) {
      fewest = Math.min(fewest, Math.round(el.scrollHeight / lineHeight));
    }
  }
  if (Number.isFinite(fewest)) {
    lines.value = Math.max(2, Math.min(max, fewest));
  }
};

const renderOrbit = (time) => {
  const { cx, cy, rx, ry, pole, bob, half } = geo;
  for (let i = 0; i < N; i++) {
    const el = nodes[i];
    if (!el) continue;
    const angle = ((i - pos) / N) * TAU;
    const cos = Math.cos(angle);
    const depth = (cos + 1) / 2;
    const scale = MIN_SCALE + (1 - MIN_SCALE) * depth;
    const deg = (Math.acos(Math.max(-1, Math.min(1, cos))) * 180) / Math.PI;
    const show = showAt(deg, half);
    const lift = reduce ? 0 : ((Math.sin(time * 1.9 + i * 2.1) + 1) / 2) * bob;
    const rise = (pole + lift) * show;
    const x = cx + Math.sin(angle) * rx;
    const y = cy + cos * ry;
    el.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0) scale(${scale.toFixed(4)})`;
    el.style.zIndex = String(10 + Math.round(depth * 100));
    el.style.setProperty("--fog", ((1 - depth) * FOG).toFixed(3));
    el.style.setProperty("--py", `${rise.toFixed(2)}px`);
    el.style.setProperty("--ps", (rise / (pole + bob)).toFixed(4));
    el.style.setProperty("--cs", (0.6 + 0.4 * show).toFixed(4));
    el.style.setProperty("--co", show.toFixed(3));
    el.style.setProperty("--vis", show < 0.03 ? "hidden" : "visible");
    el.style.setProperty(
      "--gs",
      (Math.min(1, Math.max(0, (deg - 12) / 40)) * GRAY).toFixed(3),
    );
  }
};

const render = (now) => {
  if (!geo) return;
  renderOrbit(now / 1000);
  if (dashRing.value) {
    dashRing.value.style.strokeDashoffset = (-pos * dashUnit).toFixed(2);
  }
  const index = ((Math.round(pos) % N) + N) % N;
  if (index !== active.value) active.value = index;
};

const layoutOrbit = (el, k) => {
  el.style.width = "";
  const width = el.clientWidth;
  if (!width) return false;
  const hubR = (hub.value?.offsetWidth || 160 * k) / 2;
  const compact = !!phoneQuery?.matches;
  const half = compact
    ? Math.min(HALF, PHONE_HALF)
    : tabletQuery?.matches
      ? Math.min(HALF, TABLET_HALF)
      : HALF;
  let kn = KN;
  let rx = fitRx(width, k * kn, half);
  if (compact) {
    const stepSin = Math.sin(TAU / N);
    const side = scaleAt(Math.cos(TAU / N));
    for (let f = 1; f >= 0.7; f -= 0.02) {
      kn = KN * f;
      rx = fitRx(width, k * kn, half);
      if (rx * stepSin >= (CARD_W * k * kn * (side + 1)) / 2 + 8 * k) break;
    }
  }
  const s = k * kn;
  const cardH = CARD_H * s;
  const pole = POLE * s;
  const bob = BOB * s;
  const ry = rx * Math.min(0.48, Math.max(0.3, 0.3 + (900 - width) * 0.0003));
  const hubLift = Math.max(
    (pole + cardH / 2) * 0.95,
    pole + bob + cardH + GAP * k + hubR - ry,
  );
  let reach = ry + DOT * s;
  for (let deg = 0; deg <= 180; deg += 3) {
    const show = showAt(deg, half);
    if (show < 0.03) continue;
    const c = Math.cos((deg * Math.PI) / 180);
    const scale = MIN_SCALE + (1 - MIN_SCALE) * ((c + 1) / 2);
    const height = ((pole + bob) * show + cardH * (0.6 + 0.4 * show)) * scale;
    reach = Math.max(reach, height - ry * c);
  }
  const pad = 20 * k;
  const cy = pad + Math.max(reach, hubLift + hubR);
  const cx = width / 2;
  el.style.height = `${Math.ceil(cy + ry + DOT * s + pad)}px`;
  geo = { cx, cy, rx, ry, pole, bob, half };
  const a = rx * 1.08;
  const b = ry * 1.08;
  const perimeter =
    Math.PI * (3 * (a + b) - Math.sqrt((3 * a + b) * (a + 3 * b)));
  const repeats = Math.max(1, Math.round(perimeter / 9));
  dashUnit = perimeter / N;
  Object.assign(ring, {
    ready: true,
    kn,
    cx,
    cy,
    rx,
    ry,
    dash: `2 ${(perimeter / repeats - 2).toFixed(3)}`,
    hubX: cx,
    hubY: cy - hubLift,
  });
  return true;
};

const layout = () => {
  const el = stage.value;
  if (!el || !root.value) return;
  lastWidth = root.value.clientWidth;
  const k = parseFloat(getComputedStyle(el).getPropertyValue("--k")) || 1;
  if (layoutOrbit(el, k)) render(performance.now());
  measureLines();
};

watch(locale, () => nextTick(measureLines));

const advance = (now, dt) => {
  if (tween) {
    const p = tween.duration
      ? Math.min(1, Math.max(0, (now - tween.start) / tween.duration))
      : 1;
    pos = tween.from + (tween.to - tween.from) * easeInOut(p);
    if (p >= 1) {
      pos = tween.to;
      tween = null;
      speed = 0;
      holdUntil = now + HOLD;
    }
    return;
  }
  if (drag?.moved) return;
  const target =
    reduce || linkHover || focused || now < holdUntil ? 0 : 1 / STEP;
  const rate = target > speed ? 1.5 : 5;
  speed += (target - speed) * Math.min(1, dt * rate);
  pos += speed * dt;
};

const tick = (now) => {
  raf = 0;
  const dt = last ? Math.min(0.05, (now - last) / 1000) : 0;
  last = now;
  advance(now, dt);
  render(now);
  if (inView && (!reduce || tween || drag)) {
    raf = requestAnimationFrame(tick);
  }
};

const start = () => {
  if (raf || !inView) return;
  last = 0;
  raf = requestAnimationFrame(tick);
};

const stop = () => {
  if (raf) cancelAnimationFrame(raf);
  raf = 0;
};

const goTo = (target) => {
  const duration = reduce
    ? 0
    : Math.min(1300, 520 + Math.abs(target - pos) * 260);
  tween = { from: pos, to: target, start: performance.now(), duration };
  start();
};

const baseIndex = () => (tween ? tween.to : Math.round(pos));

const select = (index) => {
  const base = baseIndex();
  let diff = (((index - base) % N) + N) % N;
  if (diff > N / 2) diff -= N;
  goTo(base + diff);
};

const shift = (delta) => goTo(baseIndex() + delta);

const onCardClick = (index) => {
  if (suppressClick) return;
  if (index === active.value && !tween) {
    window.open(items[index].url, "_blank", "noopener");
    return;
  }
  select(index);
};

const onPointerDown = (e) => {
  suppressClick = false;
  if (e.pointerType === "mouse" && e.button !== 0) return;
  drag = {
    id: e.pointerId,
    x: e.clientX,
    from: pos,
    moved: false,
    lastX: e.clientX,
    lastT: e.timeStamp,
    v: 0,
  };
};

const onPointerMove = (e) => {
  if (!drag || e.pointerId !== drag.id) return;
  if (!drag.moved) {
    if (Math.abs(e.clientX - drag.x) < 6) return;
    drag.moved = true;
    drag.from = pos;
    drag.x = e.clientX;
    drag.lastX = e.clientX;
    drag.lastT = e.timeStamp;
    tween = null;
    speed = 0;
    stage.value?.setPointerCapture?.(e.pointerId);
    start();
    return;
  }
  const perItem = Math.max(120, geo?.rx ? geo.rx * (TAU / N) * 0.9 : 300);
  pos = drag.from - (e.clientX - drag.x) / perItem;
  const dt = e.timeStamp - drag.lastT;
  if (dt > 0) {
    const v = (((drag.lastX - e.clientX) / perItem) * 1000) / dt;
    drag.v = 0.8 * v + 0.2 * drag.v;
  }
  drag.lastX = e.clientX;
  drag.lastT = e.timeStamp;
};

const endDrag = (e) => {
  if (!drag || e.pointerId !== drag.id) return;
  const { moved } = drag;
  const v = e.timeStamp - drag.lastT > 120 ? 0 : drag.v;
  drag = null;
  if (!moved) return;
  suppressClick = true;
  goTo(Math.round(pos + Math.max(-1.5, Math.min(1.5, v * 0.22))));
};

const onLinkEnter = (e) => {
  if (e.pointerType === "mouse") linkHover = true;
};

const onLinkLeave = () => {
  linkHover = false;
};

const onFocusIn = (e) => {
  if (e.target?.matches?.(":focus-visible")) focused = true;
};

const onFocusOut = (e) => {
  if (!root.value?.contains(e.relatedTarget)) focused = false;
};

const onKeydown = (e) => {
  if (e.key === "ArrowRight") {
    e.preventDefault();
    shift(1);
  } else if (e.key === "ArrowLeft") {
    e.preventDefault();
    shift(-1);
  }
};

const onMotionChange = () => {
  reduce = motionQuery.matches;
  render(performance.now());
  start();
};

onMounted(() => {
  motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  reduce = motionQuery.matches;
  motionQuery.addEventListener("change", onMotionChange);
  tabletQuery = window.matchMedia(
    "(min-width: 768px) and (max-width: 1023.98px)",
  );
  tabletQuery.addEventListener("change", layout);
  phoneQuery = window.matchMedia("(max-width: 767.98px)");
  phoneQuery.addEventListener("change", layout);
  layout();
  document.fonts?.ready?.then(measureLines);
  resizeObserver = new ResizeObserver(() => {
    if (root.value && root.value.clientWidth !== lastWidth) layout();
  });
  resizeObserver.observe(root.value);
  intersectionObserver = new IntersectionObserver(
    ([entry]) => {
      inView = entry.isIntersecting;
      if (inView) start();
      else stop();
    },
    { rootMargin: "120px 0px" },
  );
  intersectionObserver.observe(stage.value);
});

onBeforeUnmount(() => {
  stop();
  resizeObserver?.disconnect();
  intersectionObserver?.disconnect();
  motionQuery?.removeEventListener("change", onMotionChange);
  tabletQuery?.removeEventListener("change", layout);
  phoneQuery?.removeEventListener("change", layout);
});
</script>

<template>
  <div
    ref="root"
    role="region"
    aria-roledescription="carousel"
    :aria-label="t('home.productOrbit.title')"
    class="relative z-10 flex flex-col w-full h-auto px-8 lg:px-12 xl:px-16 dark:bg-[#17181A]"
    @pointerleave="onLinkLeave"
    @focusin="onFocusIn"
    @focusout="onFocusOut"
    @keydown="onKeydown"
  >
    <div class="flex flex-col items-center gap-y-1.5 text-center">
      <p class="text-[#2AB857] font-[500] text-[18px] lg:text-[20px]">
        {{ t("home.productOrbit.eyebrow") }}
      </p>
      <h2
        class="text-[#195279] font-[500] text-[20px] lg:text-[34px] dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-br dark:from-[#FAFAFA] dark:via-[#D4D4D4] dark:to-[#AAAAAA]"
      >
        {{ t("home.productOrbit.title") }}
      </h2>
    </div>

    <div class="relative flex flex-col mt-4 md:mt-5 lg:mt-6">
      <div
        ref="stage"
        aria-hidden="true"
        class="orbit-stage relative shrink-0 -mx-8 w-[calc(100%+4rem)] h-[200px] md:mx-0 md:w-full md:h-[270px] lg:h-[334px] xl:h-[407px] select-none touch-pan-y cursor-grab active:cursor-grabbing [--k:0.66] sm:[--k:0.76] lg:[--k:0.9] xl:[--k:1]"
        :class="{ 'is-ready': ring.ready }"
        :style="{ '--kn': ring.kn }"
        @pointerdown="onPointerDown"
        @pointermove="onPointerMove"
        @pointerup="endDrag"
        @pointercancel="endDrag"
      >
        <svg
          class="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
        >
          <defs>
            <radialGradient id="po-floor">
              <stop offset="0" class="po-floor-in" />
              <stop offset="1" class="po-floor-out" />
            </radialGradient>
            <linearGradient
              id="po-track"
              gradientUnits="userSpaceOnUse"
              x1="0"
              x2="0"
              :y1="ring.cy - ring.ry"
              :y2="ring.cy + ring.ry"
            >
              <stop offset="0" class="po-track-back" />
              <stop offset="1" class="po-track-front" />
            </linearGradient>
          </defs>
          <template v-if="ring.ready">
            <ellipse
              :cx="ring.cx"
              :cy="ring.cy"
              :rx="ring.rx"
              :ry="ring.ry"
              fill="url(#po-floor)"
            />
            <ellipse
              class="po-ring-inner"
              :cx="ring.cx"
              :cy="ring.cy"
              :rx="ring.rx * 0.62"
              :ry="ring.ry * 0.62"
              fill="none"
              stroke-width="1"
            />
            <ellipse
              :cx="ring.cx"
              :cy="ring.cy"
              :rx="ring.rx"
              :ry="ring.ry"
              fill="none"
              stroke="url(#po-track)"
              stroke-width="1.5"
            />
            <ellipse
              ref="dashRing"
              class="po-ring-outer"
              :cx="ring.cx"
              :cy="ring.cy"
              :rx="ring.rx * 1.08"
              :ry="ring.ry * 1.08"
              fill="none"
              stroke-width="1.5"
              stroke-linecap="round"
              :stroke-dasharray="ring.dash"
            />
          </template>
        </svg>

        <div
          ref="hub"
          class="absolute z-[60] rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 w-[88px] h-[88px] sm:w-[104px] sm:h-[104px] md:w-[120px] md:h-[120px] lg:w-[140px] lg:h-[140px] xl:w-[160px] xl:h-[160px]"
          :style="{
            left: `${ring.hubX}px`,
            top: `${ring.hubY}px`,
            opacity: ring.ready ? 1 : 0,
          }"
        >
          <span class="orbit-hub-glow absolute rounded-full"></span>
          <span
            class="absolute inset-0 rounded-full bg-white dark:bg-[#1D1F23] border border-[#E3EEE9] dark:border-white/10 shadow-[0_24px_60px_-28px_rgba(25,82,121,0.45)] dark:shadow-[0_24px_60px_-28px_rgba(0,0,0,0.85)]"
          ></span>
          <span class="orbit-hub-ring absolute rounded-full"></span>
          <img
            :src="Logo"
            alt=""
            draggable="false"
            class="absolute left-1/2 top-1/2 w-[70%] lg:w-[66%] h-auto -translate-x-1/2 -translate-y-1/2 dark:hidden"
          />
          <img
            :src="DarkLogo"
            alt=""
            draggable="false"
            class="absolute left-1/2 top-1/2 w-[70%] lg:w-[66%] h-auto -translate-x-1/2 -translate-y-1/2 hidden dark:block"
          />
        </div>

        <div
          v-for="(item, i) in items"
          :key="`${item.key}-${i}`"
          :ref="(el) => (nodes[i] = el)"
          class="orbit-item absolute left-0 top-0 w-0 h-0"
          :class="{ 'is-active': i === active }"
          :style="{ '--c': item.color }"
        >
          <span class="orbit-pole absolute"></span>
          <span class="orbit-dot absolute"></span>
          <div class="orbit-float absolute">
            <div
              class="orbit-card relative flex items-center justify-center bg-white dark:bg-[#1D1F23]"
              :class="{ 'is-active': i === active }"
              @click="onCardClick(i)"
            >
              <img
                :src="`/assets/images/product-logo/light/${item.logo}`"
                alt=""
                draggable="false"
                class="object-contain dark:hidden"
                :style="logoSize(item)"
              />
              <img
                :src="`/assets/images/product-logo/dark/${item.darkLogo}`"
                alt=""
                draggable="false"
                class="object-contain hidden dark:block"
                :style="logoSize(item)"
              />
            </div>
          </div>
        </div>
      </div>

      <div
        ref="captionBox"
        class="grid w-full max-w-[560px] mx-auto mt-4 lg:max-w-[640px] lg:mt-5 [--max-lines:3] lg:[--max-lines:2]"
        :style="{ '--lines': lines }"
      >
        <div
          v-for="(item, i) in items"
          :key="`${item.key}-${i}`"
          class="orbit-caption flex flex-col items-center text-center gap-y-1.5 lg:gap-y-2"
          :class="{ 'is-active': i === active }"
          :style="{ '--c': item.color }"
          :aria-hidden="i === active ? undefined : 'true'"
        >
          <p
            class="text-[16px] sm:text-[18px] lg:text-[22px] font-[600] text-[#195279] dark:text-[#FAFAFA]"
          >
            {{ item.name }}
          </p>
          <p
            :ref="(el) => (descs[i] = el)"
            class="orbit-desc mb-2 lg:mb-3 text-[13px] sm:text-[14px] lg:text-[16px] leading-normal lg:leading-relaxed text-[#6B7280] dark:text-[#A1A1AA]"
          >
            {{ t(`home.banners.${item.key}`) }}
          </p>
          <a
            :href="item.url"
            target="_blank"
            rel="noopener noreferrer"
            :tabindex="i === active ? undefined : -1"
            class="orbit-link mt-auto inline-flex items-center justify-center gap-x-1.5 px-4 sm:px-5 py-2 rounded-full border border-[#195279] bg-[#195279] text-[#FAFAFA] text-[12px] sm:text-[13px] lg:text-[14px] font-[500] whitespace-nowrap dark:bg-[#2B2E32] dark:border-[#2AB857]"
            @pointerenter="onLinkEnter"
            @pointerleave="onLinkLeave"
          >
            {{ t("home.productOrbit.viewProduct") }}
            <svg
              class="w-4 h-4 lg:w-[1.1rem] lg:h-[1.1rem]"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M14.43 18.07L20.5 12L14.43 5.93"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M3.5 12H20.33"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>

    <div
      class="flex items-center justify-center gap-x-3 sm:gap-x-4 mt-5 lg:mt-6"
    >
      <button
        type="button"
        class="flex items-center justify-center w-10 h-10 rounded-full border border-[#DCE5EA] text-[#195279] hover:bg-[#195279] hover:border-[#195279] hover:text-white dark:border-white/15 dark:text-[#FAFAFA] dark:hover:bg-[#2AB857] dark:hover:border-[#2AB857] transition-colors duration-200"
        :aria-label="t('home.productOrbit.previous')"
        @click="shift(-1)"
      >
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none">
          <path
            d="M15 18L9 12L15 6"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
      <div v-if="!compactNav" class="flex items-center">
        <button
          v-for="(item, i) in items"
          :key="`${item.key}-${i}`"
          type="button"
          class="orbit-pip flex items-center h-6 px-[3px]"
          :class="{ 'is-active': i === active }"
          :style="{ '--c': item.color }"
          :aria-label="t('home.productOrbit.show', { name: item.name })"
          :aria-current="i === active ? 'true' : undefined"
          @click="select(i)"
        >
          <span class="block h-2 rounded-full"></span>
        </button>
      </div>
      <p
        v-else
        class="min-w-[76px] text-center text-[14px] lg:text-[15px] font-[500] tabular-nums text-[#195279] dark:text-[#FAFAFA]"
      >
        {{ pad2(active + 1) }}
        <span class="text-[#9CA3AF]">/ {{ pad2(N) }}</span>
      </p>
      <button
        type="button"
        class="flex items-center justify-center w-10 h-10 rounded-full border border-[#DCE5EA] text-[#195279] hover:bg-[#195279] hover:border-[#195279] hover:text-white dark:border-white/15 dark:text-[#FAFAFA] dark:hover:bg-[#2AB857] dark:hover:border-[#2AB857] transition-colors duration-200"
        :aria-label="t('home.productOrbit.next')"
        @click="shift(1)"
      >
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none">
          <path
            d="M9 18L15 12L9 6"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<style scoped>
.orbit-stage {
  --ks: calc(var(--k) * var(--kn, 1));
}

.orbit-stage:not(.is-ready) .orbit-item {
  visibility: hidden;
}

.orbit-item {
  transform-origin: 0 0;
  will-change: transform;
}

.orbit-dot {
  left: 0;
  top: 0;
  width: calc(10px * var(--ks));
  height: calc(10px * var(--ks));
  border-radius: 9999px;
  background: var(--c);
  transform: translate(-50%, -50%);
  box-shadow: 0 0 0 calc(4px * var(--ks))
    color-mix(in srgb, var(--c) 22%, transparent);
  opacity: calc(1 - var(--fog, 0) * 0.6);
}

.orbit-dot::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: var(--c);
  opacity: 0;
}

.orbit-item.is-active .orbit-dot::after {
  animation: orbit-ping 2.4s cubic-bezier(0, 0, 0.2, 1) infinite;
}

.orbit-pole {
  left: -0.75px;
  bottom: 0;
  width: 1.5px;
  height: calc(38px * var(--ks));
  transform-origin: 50% 100%;
  transform: scaleY(var(--ps, 0.7));
  background: linear-gradient(
    to top,
    var(--c),
    color-mix(in srgb, var(--c) 10%, transparent)
  );
  opacity: calc(0.65 * (1 - var(--fog, 0)));
}

.orbit-float {
  left: 0;
  bottom: 0;
  transform-origin: 50% 100%;
  transform: translate(-50%, calc(var(--py, 0px) * -1)) scale(var(--cs, 1));
  opacity: var(--co, 1);
  visibility: var(--vis, visible);
}

.orbit-card img {
  filter: grayscale(var(--gs, 0));
}

.orbit-card {
  width: calc(196px * var(--ks));
  height: calc(84px * var(--ks));
  border-radius: calc(20px * var(--ks));
  border: 1px solid #e3ecef;
  box-shadow: 0 12px 30px -16px rgba(25, 82, 121, 0.35);
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  transition:
    border-color 0.35s ease,
    box-shadow 0.35s ease;
}

.orbit-card::after {
  content: "";
  position: absolute;
  inset: -1px;
  border-radius: inherit;
  background: #ffffff;
  opacity: var(--fog, 0);
  pointer-events: none;
}

.orbit-card.is-active {
  border-color: var(--c);
  box-shadow:
    0 18px 40px -18px color-mix(in srgb, var(--c) 70%, transparent),
    0 0 0 calc(4px * var(--ks)) color-mix(in srgb, var(--c) 14%, transparent);
}

@media (hover: hover) {
  .orbit-card:hover {
    --gs: 0;
    border-color: color-mix(in srgb, var(--c) 60%, #e3ecef);
  }
}

.dark .orbit-card {
  border-color: rgba(255, 255, 255, 0.08);
  box-shadow: 0 12px 30px -16px rgba(0, 0, 0, 0.75);
}

.dark .orbit-card::after {
  background: #17181a;
}

.dark .orbit-card.is-active {
  border-color: var(--c);
  box-shadow:
    0 18px 40px -18px color-mix(in srgb, var(--c) 55%, transparent),
    0 0 0 calc(4px * var(--ks)) color-mix(in srgb, var(--c) 18%, transparent);
}

.orbit-hub-glow {
  inset: -38%;
  background: radial-gradient(
    circle,
    rgba(42, 184, 87, 0.2) 0%,
    rgba(53, 126, 175, 0.1) 38%,
    transparent 68%
  );
  animation: orbit-breathe 6s ease-in-out infinite;
}

.orbit-hub-ring {
  inset: 9%;
  border: 1px dashed rgba(42, 184, 87, 0.38);
  animation: orbit-spin 40s linear infinite;
}

.dark .orbit-hub-ring {
  border-color: rgba(255, 255, 255, 0.16);
}

.po-floor-in {
  stop-color: #2ab857;
  stop-opacity: 0.08;
}

.po-floor-out {
  stop-color: #2ab857;
  stop-opacity: 0;
}

.dark .po-floor-in {
  stop-opacity: 0.12;
}

.po-track-back {
  stop-color: #357eaf;
  stop-opacity: 0.22;
}

.po-track-front {
  stop-color: #2ab857;
  stop-opacity: 0.85;
}

.dark .po-track-back {
  stop-color: #ffffff;
  stop-opacity: 0.1;
}

.dark .po-track-front {
  stop-opacity: 0.75;
}

.po-ring-inner {
  stroke: #195279;
  stroke-opacity: 0.1;
}

.dark .po-ring-inner {
  stroke: #ffffff;
  stroke-opacity: 0.08;
}

.po-ring-outer {
  stroke: #2ab857;
  stroke-opacity: 0.45;
}

.dark .po-ring-outer {
  stroke: #ffffff;
  stroke-opacity: 0.22;
}

.orbit-caption {
  grid-area: 1 / 1;
  opacity: 0;
  visibility: hidden;
  transform: translateY(8px);
  transition:
    opacity 0.18s ease,
    transform 0.3s ease,
    visibility 0s linear 0.18s;
}

.orbit-caption.is-active {
  opacity: 1;
  visibility: visible;
  transform: none;
  transition:
    opacity 0.4s ease 0.1s,
    transform 0.5s cubic-bezier(0.2, 0.7, 0.2, 1) 0.1s,
    visibility 0s;
}

.orbit-desc {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: var(--lines, 3);
  overflow: hidden;
}

.orbit-link {
  box-shadow: 0 10px 22px -14px rgba(25, 82, 121, 0.75);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.orbit-link svg {
  transition: transform 0.3s ease;
}

.dark .orbit-link {
  box-shadow: 0 4px 18.8px 0 rgba(0, 255, 59, 0.25);
}

@media (hover: hover) {
  .orbit-link:hover {
    transform: translateY(-2px);
    box-shadow: 0 14px 28px -12px color-mix(in srgb, var(--c) 80%, transparent);
  }

  .dark .orbit-link:hover {
    box-shadow: 0 14px 28px -12px color-mix(in srgb, var(--c) 70%, transparent);
  }

  .orbit-link:hover svg {
    transform: translateX(3px);
  }
}

.orbit-pip span {
  width: 8px;
  background: #d5dee3;
  transition:
    width 0.35s ease,
    background-color 0.35s ease;
}

.orbit-pip.is-active span {
  width: 22px;
  background: var(--c);
}

.dark .orbit-pip span {
  background: rgba(255, 255, 255, 0.18);
}

.dark .orbit-pip.is-active span {
  background: var(--c);
}

@keyframes orbit-breathe {
  0%,
  100% {
    transform: scale(0.94);
    opacity: 0.75;
  }
  50% {
    transform: scale(1.04);
    opacity: 1;
  }
}

@keyframes orbit-spin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes orbit-ping {
  0% {
    transform: scale(1);
    opacity: 0.55;
  }
  80%,
  100% {
    transform: scale(3.2);
    opacity: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .orbit-hub-glow,
  .orbit-hub-ring,
  .orbit-item.is-active .orbit-dot::after {
    animation: none;
  }

  .orbit-caption,
  .orbit-caption.is-active,
  .orbit-link,
  .orbit-link svg {
    transition: none;
  }
}
</style>
