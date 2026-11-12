<script setup>
import { computed, onMounted, onBeforeUnmount, ref } from "vue";
import { useI18n } from "vue-i18n";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import rppg from "@/assets/Products/images/Shield/v2/ilustrasi-rppg.webp";
import ai from "@/assets/Products/images/Shield/v2/ilustrasi-ai.webp";
import ml from "@/assets/Products/images/Shield/v2/ilustrasi-ml.webp";
import security from "@/assets/Products/images/Shield/v2/ilustrasi-security.webp";
import mark from "@/assets/Products/images/Shield/v2/shield-mark.webp";

gsap.registerPlugin(ScrollTrigger);

const { t } = useI18n();

const images = [rppg, ai, ml, security];
const corners = ["is-tl", "is-tr", "is-br", "is-bl"];
const lineEnds = [
  [24, 23.3],
  [76, 23.3],
  [76, 72.7],
  [24, 72.7],
];
const buttonY = [35, 125, 215, 305];

const steps = computed(() =>
  images.map((image, i) => ({
    image,
    corner: corners[i],
    title: t(`products.shield.landing.how.steps.${i}.title`),
    description: t(`products.shield.landing.how.steps.${i}.description`),
  })),
);

const root = ref(null);
const stage = ref(null);
const active = ref(0);
const revealed = ref(0);
const complete = ref(false);

let ctx = null;
let tl = null;
let cycle = null;
let picked = false;

function stopCycle() {
  clearInterval(cycle);
  cycle = null;
}

function startCycle() {
  stopCycle();
  if (picked) return;
  cycle = setInterval(() => {
    active.value = (active.value + 1) % images.length;
  }, 3800);
}

function finish() {
  revealed.value = images.length;
  complete.value = true;
  startCycle();
}

function pick(i) {
  picked = true;
  stopCycle();
  if (tl && tl.progress() < 1) tl.progress(1);
  active.value = i;
}

function offsetToCenter(el) {
  const box = stage.value;
  return {
    x: box.clientWidth / 2 - (el.offsetLeft + el.offsetWidth / 2),
    y: box.clientHeight / 2 - (el.offsetTop + el.offsetHeight / 2),
  };
}

onMounted(() => {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced) {
    finish();
    return;
  }

  ctx = gsap.context(() => {
    const items = gsap.utils.toArray(".hw-illus");
    const lines = gsap.utils.toArray(".hw-line");
    const logo = stage.value.querySelector(".hw-logo");
    const orbit = stage.value.querySelector(".hw-orbit");

    gsap.set(items, { autoAlpha: 0 });
    gsap.set(lines, { strokeDashoffset: 1 });
    gsap.set(logo, { autoAlpha: 0, scale: 0.4 });
    gsap.set(orbit, { autoAlpha: 0, scale: 0.85, transformOrigin: "50% 50%" });

    tl = gsap.timeline({ paused: true, onComplete: finish });

    items.forEach((el, i) => {
      tl.call(
        () => {
          active.value = i;
          revealed.value = i + 1;
        },
        null,
        i === 0 ? 0 : ">-0.15",
      );
      tl.fromTo(
        el,
        {
          x: () => offsetToCenter(el).x,
          y: () => offsetToCenter(el).y,
          scale: 0.55,
          autoAlpha: 0,
        },
        {
          x: () => offsetToCenter(el).x,
          y: () => offsetToCenter(el).y,
          scale: 1.12,
          autoAlpha: 1,
          duration: 0.55,
          ease: "power2.out",
          immediateRender: false,
        },
      );
      tl.to(
        el,
        { x: 0, y: 0, scale: 1, duration: 0.75, ease: "power3.inOut" },
        "+=0.4",
      );
      tl.to(
        lines[i],
        { strokeDashoffset: 0, duration: 0.5, ease: "power1.out" },
        "<0.4",
      );
    });

    tl.to(
      orbit,
      { autoAlpha: 1, scale: 1, duration: 0.9, ease: "power2.out" },
      "+=0.05",
    );
    tl.to(
      logo,
      { autoAlpha: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)" },
      "<0.15",
    );

    ScrollTrigger.create({
      trigger: stage.value,
      start: "top 72%",
      once: true,
      onEnter: () => tl.play(),
    });
  }, root.value);
});

onBeforeUnmount(() => {
  stopCycle();
  ctx?.revert();
});
</script>

<template>
  <section
    id="how-it-works"
    class="relative w-full bg-[#F8FAFC] px-8 lg:px-[29px] pb-[58px] md:pb-[86px]"
  >
    <div
      ref="root"
      class="hw-panel mx-auto max-w-[1125px] rounded-[25px] lg:rounded-[32px] border border-[#E7EDF4] bg-[#FCFDFF] px-[18px] py-[36px] md:px-[36px] md:py-[43px] xl:px-[101px] xl:py-[50px]"
      :class="{ 'is-complete': complete }"
    >
      <p class="text-[#0071E7] text-[13px] lg:text-[13px] font-medium">
        {{ $t("products.shield.landing.how.eyebrow") }}
      </p>
      <h2
        class="mt-[7px] text-[#0B2C5D] font-medium tracking-[-0.01em] text-[25px] md:text-[31px] xl:text-[36px] leading-tight"
      >
        {{ $t("products.shield.landing.how.title") }}
      </h2>
      <p
        class="mt-[14px] max-w-[576px] text-[#434750] text-[13px] md:text-[14px] xl:text-[15px] leading-[1.7]"
      >
        {{ $t("products.shield.landing.how.description") }}
      </p>

      <div
        class="mt-[29px] xl:mt-[36px] flex items-center justify-between gap-[14px]"
      >
        <h3 class="text-[#0B2C5D] text-[14px] xl:text-[16px] font-medium">
          {{ $t("products.shield.landing.how.aggregation") }}
        </h3>
        <span
          class="shrink-0 rounded-md bg-[#0071E7] px-[9px] py-[4px] text-white text-[12px] xl:text-[13px]"
        >
          {{ $t("products.shield.landing.how.preview") }}
        </span>
      </div>

      <div
        class="mt-[22px] xl:mt-[29px] grid grid-cols-1 lg:grid-cols-[216px_minmax(54px,1fr)_minmax(0,432px)] xl:grid-cols-[245px_minmax(72px,1fr)_minmax(0,450px)] items-center gap-y-[22px]"
      >
        <div
          class="grid grid-cols-2 gap-[11px] lg:flex lg:flex-col lg:gap-[18px]"
          role="tablist"
          :aria-label="$t('products.shield.landing.how.aggregation')"
        >
          <button
            v-for="(step, i) in steps"
            :key="i"
            type="button"
            role="tab"
            :aria-selected="active === i"
            class="hw-step h-[47px] lg:h-[63px] rounded-[9px] border px-[11px] text-[13px] md:text-[13px] lg:text-[15px] xl:text-[17px] font-medium"
            :class="[
              active === i && revealed > i ? 'is-active' : '',
              revealed > i ? 'is-revealed' : '',
            ]"
            @click="pick(i)"
          >
            {{ step.title }}
          </button>
        </div>

        <svg
          class="hidden lg:block w-full h-[306px] overflow-visible"
          viewBox="0 0 100 340"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            v-for="(y, i) in buttonY"
            :key="i"
            :d="`M0 ${y} H38 C72 ${y} 64 170 100 170`"
            class="hw-wire"
            :class="[
              revealed > i ? 'is-on' : '',
              complete && active === i ? 'is-flow' : '',
            ]"
            vector-effect="non-scaling-stroke"
          />
        </svg>

        <div class="relative w-full max-w-[396px] lg:max-w-none mx-auto">
          <span
            class="hw-node hidden lg:block"
            :class="{ 'is-on': revealed > 0 }"
          ></span>
          <div
            ref="stage"
            class="hw-stage relative w-full aspect-[25/24] overflow-hidden rounded-[22px]"
          >
            <svg
              class="absolute inset-0 w-full h-full"
              viewBox="0 0 100 96"
              aria-hidden="true"
            >
              <defs>
                <radialGradient id="hw-glow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stop-color="#47B7FD" stop-opacity="0.28" />
                  <stop offset="100%" stop-color="#47B7FD" stop-opacity="0" />
                </radialGradient>
              </defs>
              <g class="hw-orbit">
                <circle cx="50" cy="48" r="20" fill="url(#hw-glow)" />
                <circle
                  cx="50"
                  cy="48"
                  r="35.9"
                  class="hw-ring"
                  vector-effect="non-scaling-stroke"
                />
                <circle
                  cx="50"
                  cy="48"
                  r="24"
                  class="hw-ring hw-ring--inner"
                  vector-effect="non-scaling-stroke"
                />
              </g>
              <line
                v-for="(end, i) in lineEnds"
                :key="i"
                x1="50"
                y1="48"
                :x2="end[0]"
                :y2="end[1]"
                pathLength="1"
                class="hw-line"
                :class="{ 'is-focus': complete && active === i }"
                vector-effect="non-scaling-stroke"
              />
            </svg>

            <div
              v-for="(step, i) in steps"
              :key="i"
              class="hw-illus absolute w-[36%]"
              :class="step.corner"
            >
              <div
                class="hw-illus__inner"
                :class="{
                  'is-focus': active === i,
                  'is-dim': complete && active !== i,
                }"
              >
                <img
                  :src="step.image"
                  :alt="step.title"
                  width="220"
                  height="236"
                  loading="lazy"
                  decoding="async"
                  class="block w-full h-auto"
                />
              </div>
            </div>

            <div
              class="hw-logo absolute left-1/2 top-1/2 w-[19%] aspect-square -translate-x-1/2 -translate-y-1/2"
            >
              <div
                class="hw-logo__disc flex w-full h-full items-center justify-center rounded-full bg-white"
              >
                <img
                  :src="mark"
                  alt="Shield"
                  width="268"
                  height="320"
                  class="w-[46%] h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        class="mt-[29px] xl:mt-[36px] grid grid-cols-1 lg:grid-cols-[216px_1fr] xl:grid-cols-[245px_1fr] gap-x-[36px] gap-y-[14px] items-start"
      >
        <div class="flex items-center gap-[11px]">
          <span
            class="text-[#0071E7] text-[13px] font-medium tabular-nums tracking-wide"
          >
            {{ String(Math.max(1, revealed && active + 1)).padStart(2, "0") }}
            / 04
          </span>
          <div class="flex flex-1 gap-[5px]">
            <span
              v-for="i in 4"
              :key="i"
              class="hw-seg h-[3px] flex-1 rounded-full"
              :class="{
                'is-on': revealed >= i,
                'is-current': revealed >= i && active === i - 1,
              }"
            ></span>
          </div>
        </div>
        <div class="min-h-[86px] md:min-h-[65px]" aria-live="polite">
          <Transition name="hw-caption" mode="out-in">
            <div :key="active">
              <p class="text-[#0B2C5D] text-[14px] xl:text-[15px] font-medium">
                {{ steps[active].title }}
              </p>
              <p
                class="mt-[5px] max-w-[648px] text-[#434750] text-[13px] md:text-[13px] xl:text-[14px] leading-[1.65]"
              >
                {{ steps[active].description }}
              </p>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hw-step {
  background: #fff;
  border-color: #e3e8ef;
  color: #434750;
  box-shadow: 0 1px 2px rgba(11, 44, 93, 0.04);
  transition:
    background-color 0.45s ease,
    color 0.45s ease,
    border-color 0.45s ease,
    box-shadow 0.45s ease,
    transform 0.45s ease;
}

.hw-step.is-revealed {
  color: #0b2c5d;
  border-color: #cfe3fb;
}

.hw-step.is-active {
  background: #0071e7;
  border-color: #0071e7;
  color: #fff;
  box-shadow: 0 12px 26px -14px rgba(0, 113, 231, 0.75);
}

@media (hover: hover) {
  .hw-step:not(.is-active):hover {
    border-color: #9cc8f6;
    transform: translateX(3px);
  }
}

.hw-step:focus-visible {
  outline: 2px solid #47b7fd;
  outline-offset: 3px;
}

.hw-wire {
  fill: none;
  stroke: #c3c9d2;
  stroke-width: 1.4;
  stroke-dasharray: 6 6;
  transition: stroke 0.5s ease;
}

.hw-wire.is-on {
  stroke: #9cc8f6;
}

.hw-wire.is-flow {
  stroke: #4a9bf0;
  stroke-width: 1.8;
  animation: hw-flow 1.2s linear infinite;
}

.hw-node {
  position: absolute;
  left: -8px;
  top: 50%;
  z-index: 2;
  width: 16px;
  height: 16px;
  border-radius: 999px;
  background: #c9d7e8;
  transform: translateY(-50%);
  transition:
    background-color 0.5s ease,
    box-shadow 0.5s ease;
}

.hw-node.is-on {
  background: #4a9bf0;
  box-shadow: 0 0 0 6px rgba(74, 155, 240, 0.18);
}

.hw-stage {
  border: 1px solid #cfe6ff;
  background:
    radial-gradient(circle at 50% 50%, #eef7ff 0%, rgba(238, 247, 255, 0) 60%),
    #fff;
  box-shadow:
    0 0 0 6px rgba(207, 230, 255, 0.25),
    0 30px 60px -36px rgba(0, 113, 231, 0.45);
}

.hw-ring {
  fill: none;
  stroke: #9cc8f6;
  stroke-width: 1;
  stroke-dasharray: 3 5;
  transform-origin: 50px 48px;
  animation: hw-spin 40s linear infinite;
}

.hw-ring--inner {
  stroke: #cfe6ff;
  animation-direction: reverse;
  animation-duration: 28s;
}

.hw-line {
  stroke: #7fbaf5;
  stroke-width: 1.2;
  stroke-dasharray: 1;
  transition:
    stroke 0.4s ease,
    stroke-width 0.4s ease;
}

.is-complete .hw-line {
  stroke-dasharray: 0.04 0.05;
  animation: hw-dash 2.4s linear infinite;
}

.is-complete .hw-line.is-focus {
  stroke: #0071e7;
  stroke-width: 1.8;
}

.hw-illus.is-tl {
  left: 6%;
  top: 4%;
}

.hw-illus.is-tr {
  right: 6%;
  top: 4%;
}

.hw-illus.is-br {
  right: 6%;
  bottom: 4%;
}

.hw-illus.is-bl {
  left: 6%;
  bottom: 4%;
}

.hw-illus {
  z-index: 1;
}

.hw-illus__inner {
  transition:
    transform 0.6s cubic-bezier(0.2, 0.7, 0.1, 1),
    opacity 0.6s ease,
    filter 0.6s ease;
}

.is-complete .hw-illus__inner.is-focus {
  transform: scale(1.07) translateY(-4px);
  filter: drop-shadow(0 14px 22px rgba(0, 113, 231, 0.28));
}

.hw-illus__inner.is-dim {
  opacity: 0.62;
  filter: saturate(0.75);
}

.hw-logo {
  z-index: 2;
}

.hw-logo__disc {
  box-shadow:
    0 0 0 6px rgba(207, 230, 255, 0.55),
    0 10px 30px -6px rgba(0, 113, 231, 0.45);
}

.is-complete .hw-logo__disc {
  animation: hw-pulse 3.2s ease-in-out infinite;
}

.hw-seg {
  background: #e3e8ef;
  transition: background-color 0.5s ease;
}

.hw-seg.is-on {
  background: #9cc8f6;
}

.hw-seg.is-current {
  background: #0071e7;
}

.hw-caption-enter-active,
.hw-caption-leave-active {
  transition:
    opacity 0.35s ease,
    transform 0.35s ease;
}

.hw-caption-enter-from {
  opacity: 0;
  transform: translateY(8px);
}

.hw-caption-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

@keyframes hw-flow {
  to {
    stroke-dashoffset: -24;
  }
}

@keyframes hw-dash {
  to {
    stroke-dashoffset: -0.18;
  }
}

@keyframes hw-spin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes hw-pulse {
  0%,
  100% {
    box-shadow:
      0 0 0 6px rgba(207, 230, 255, 0.55),
      0 10px 30px -6px rgba(0, 113, 231, 0.45);
  }
  50% {
    box-shadow:
      0 0 0 12px rgba(207, 230, 255, 0.35),
      0 10px 40px -4px rgba(0, 113, 231, 0.6);
  }
}

@media (prefers-reduced-motion: reduce) {
  .hw-ring,
  .hw-wire.is-flow,
  .is-complete .hw-line,
  .is-complete .hw-logo__disc {
    animation: none;
  }
}
</style>
