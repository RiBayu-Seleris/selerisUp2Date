<script setup>
import { computed, onMounted, onBeforeUnmount, ref } from "vue";
import { useI18n } from "vue-i18n";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import medical from "@/assets/Products/images/Shield/v2/medical-data-automation.webp";
import claims from "@/assets/Products/images/Shield/v2/claims-prediction.webp";
import fraud from "@/assets/Products/images/Shield/v2/fraud-detection.webp";
import regulatory from "@/assets/Products/images/Shield/v2/regulatory-compliance.webp";
import risk from "@/assets/Products/images/Shield/v2/risk-stratification.webp";
import scalable from "@/assets/Products/images/Shield/v2/scalable-integration.webp";

gsap.registerPlugin(ScrollTrigger);

const DESKTOP =
  "(min-width: 1024px) and (pointer: fine) and (prefers-reduced-motion: no-preference)";

const { t } = useI18n();

const images = [
  [medical, 241, 213],
  [claims, 271, 216],
  [fraud, 256, 221],
  [regulatory, 248, 214],
  [risk, 239, 207],
  [scalable, 239, 207],
];

const cards = computed(() =>
  images.map(([image, w, h], i) => ({
    image,
    w,
    h,
    title: t(`products.shield.healthCheck.${i}.title`),
    description: t(`products.shield.healthCheck.${i}.description`),
  })),
);

const section = ref(null);
const viewport = ref(null);
const track = ref(null);
const active = ref(0);
const progress = ref(0);

const TOLERANCE = 1.5;

let mm = null;
let raf = 0;
let lastOffsets = [];

function centerLine() {
  return document.documentElement.clientWidth / 2;
}

function detectCenter() {
  const items = track.value?.children;
  if (!items?.length) return;
  const mid = centerLine();
  const offsets = [];
  let hit = -1;
  for (let i = 0; i < items.length; i++) {
    const r = items[i].getBoundingClientRect();
    const off = r.left + r.width / 2 - mid;
    offsets.push(off);
    const prev = lastOffsets[i];
    const crossed = prev !== undefined && Math.sign(prev) !== Math.sign(off);
    if (Math.abs(off) <= TOLERANCE || crossed) {
      if (hit === -1 || Math.abs(off) < Math.abs(offsets[hit])) hit = i;
    }
  }
  lastOffsets = offsets;
  if (hit !== -1) active.value = hit;
}

function resetDetection() {
  lastOffsets = [];
  detectCenter();
}

function onNativeScroll() {
  if (raf) return;
  raf = requestAnimationFrame(() => {
    raf = 0;
    const el = viewport.value;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    progress.value = max > 0 ? el.scrollLeft / max : 0;
    detectCenter();
  });
}

function goTo(i) {
  const view = viewport.value;
  const card = track.value?.children[i];
  if (!view || !card) return;
  const v = view.getBoundingClientRect();
  const c = card.getBoundingClientRect();
  const left =
    view.scrollLeft + (c.left + c.width / 2) - (v.left + v.width / 2);
  const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  view.scrollTo({ left, behavior: smooth ? "smooth" : "auto" });
}

function refresh() {
  ScrollTrigger.refresh();
}

onMounted(() => {
  mm = gsap.matchMedia();
  mm.add(DESKTOP, () => {
    const centers = () => {
      const items = track.value.children;
      const base = viewport.value.getBoundingClientRect().left;
      const first = items[0].offsetLeft;
      const last = items[items.length - 1];
      return {
        first: base + items[0].offsetWidth / 2,
        last: base + (last.offsetLeft - first) + last.offsetWidth / 2,
      };
    };
    const startX = () => centerLine() - centers().first;
    const endX = () => centerLine() - centers().last;
    const distance = () => Math.max(0, startX() - endX());

    const sync = () => {
      const d = distance();
      const x = gsap.getProperty(track.value, "x");
      progress.value = d > 0 ? Math.min(1, Math.max(0, (startX() - x) / d)) : 0;
      detectCenter();
    };

    gsap.fromTo(
      track.value,
      { x: startX },
      {
        x: endX,
        ease: "none",
        onUpdate: sync,
        scrollTrigger: {
          trigger: section.value,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      },
    );

    const afterRefresh = () => {
      lastOffsets = [];
      sync();
    };
    ScrollTrigger.addEventListener("refresh", afterRefresh);
    resetDetection();

    return () => {
      ScrollTrigger.removeEventListener("refresh", afterRefresh);
      progress.value = 0;
      requestAnimationFrame(resetDetection);
    };
  });

  viewport.value.addEventListener("scroll", onNativeScroll, { passive: true });
  document.addEventListener("seleris:content-ready", refresh);
  window.addEventListener("load", refresh);
  requestAnimationFrame(resetDetection);
});

onBeforeUnmount(() => {
  mm?.revert();
  if (raf) cancelAnimationFrame(raf);
  viewport.value?.removeEventListener("scroll", onNativeScroll);
  document.removeEventListener("seleris:content-ready", refresh);
  window.removeEventListener("load", refresh);
});
</script>

<template>
  <section
    ref="section"
    id="automation"
    class="au-section relative w-full bg-[#F8FAFC]"
  >
    <div
      class="au-inner flex flex-col justify-center py-[58px] md:py-[72px] lg:pt-[99px] lg:pb-[50px]"
    >
      <div class="mx-auto w-full max-w-[1174px] px-8 lg:px-[22px]">
        <div>
          <h2
            class="text-[#0B2C5D] font-medium tracking-[-0.01em] text-[25px] md:text-[31px] xl:text-[38px] leading-[1.15]"
          >
            {{ $t("products.shared.easyQuickTitle") }}
            {{ $t("products.shared.easyQuickSubtitle") }}
          </h2>
          <p
            class="mt-[11px] md:mt-[14px] max-w-[558px] text-[#434750] text-[13px] md:text-[14px] xl:text-[15px] leading-[1.7]"
          >
            {{ $t("products.shield.landing.automation.description") }}
          </p>
        </div>

        <div class="relative">
          <div
            ref="viewport"
            class="au-viewport mt-[29px] md:mt-[36px] xl:mt-[50px] -mx-8 px-8 lg:mx-0 lg:px-0"
          >
            <ul ref="track" class="au-track flex w-max">
              <li
                v-for="(card, i) in cards"
                :key="i"
                class="au-card group relative flex flex-col overflow-hidden rounded-[22px]"
                :class="{ 'is-active': active === i }"
              >
                <div
                  class="au-card__media flex items-end justify-center h-[180px] md:h-[198px] xl:h-[236px] px-[22px] pt-[22px]"
                >
                  <img
                    :src="card.image"
                    :alt="card.title"
                    :width="card.w"
                    :height="card.h"
                    loading="lazy"
                    decoding="async"
                    class="au-card__img block h-auto max-h-full max-w-full object-contain"
                    :style="{ width: `${card.w}px` }"
                  />
                </div>
                <div
                  class="px-[22px] pt-[14px] pb-[25px] xl:px-[32px] xl:pb-[32px]"
                >
                  <h3
                    class="au-card__title text-[18px] xl:text-[22px] font-normal leading-snug"
                  >
                    {{ card.title }}
                  </h3>
                  <p
                    class="au-card__desc mt-[7px] text-[13px] xl:text-[15px] leading-[1.65]"
                  >
                    {{ card.description }}
                  </p>
                </div>
              </li>
            </ul>
          </div>
          <button
            type="button"
            class="au-arrow au-nav au-arrow--prev"
            :disabled="active === 0"
            :aria-label="$t('products.shield.landing.reviews.previous')"
            @click="goTo(active - 1)"
          >
            <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path
                d="M12 5l-5 5 5 5"
                stroke="currentColor"
                stroke-width="1.6"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
          <button
            type="button"
            class="au-arrow au-nav au-arrow--next"
            :disabled="active === cards.length - 1"
            :aria-label="$t('products.shield.landing.reviews.next')"
            @click="goTo(active + 1)"
          >
            <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path
                d="M8 5l5 5-5 5"
                stroke="currentColor"
                stroke-width="1.6"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>
        <div class="mt-[29px] xl:mt-[36px] flex items-center">
          <div
            class="ml-auto flex items-center gap-[11px] w-full max-w-[234px]"
            aria-hidden="true"
          >
            <span
              class="text-[#0071E7] text-[13px] font-medium tabular-nums tracking-wide"
            >
              {{ String(active + 1).padStart(2, "0") }} /
              {{ String(cards.length).padStart(2, "0") }}
            </span>
            <span
              class="relative h-[3px] flex-1 overflow-hidden rounded-full bg-[#E3E8EF]"
            >
              <span
                class="au-bar absolute inset-0 rounded-full bg-[#0071E7]"
                :style="{ transform: `scaleX(${Math.max(0.04, progress)})` }"
              ></span>
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.au-section {
  overflow-x: clip;
  --au-card: min(78vw, 320px);
  --au-gap: 14px;
}

@media (min-width: 768px) {
  .au-section {
    --au-card: 306px;
    --au-gap: 18px;
  }
}

@media (min-width: 1024px) {
  .au-section {
    --au-card: 324px;
  }
}

@media (min-width: 1280px) {
  .au-section {
    --au-card: 367px;
    --au-gap: 22px;
  }
}

.au-viewport {
  container-type: inline-size;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
  -webkit-overflow-scrolling: touch;
}

.au-viewport::-webkit-scrollbar {
  display: none;
}

.au-track {
  gap: var(--au-gap);
}

.au-track::before,
.au-track::after {
  content: "";
  flex: none;
  width: max(0px, calc(50cqw - var(--au-card) / 2 - var(--au-gap)));
}

.au-card {
  flex: none;
  width: var(--au-card);
  scroll-snap-align: center;
  background: #efefef;
  border: 1px solid rgba(0, 0, 0, 0.03);
  transition:
    background-color 0.6s ease,
    border-color 0.6s ease,
    box-shadow 0.6s ease;
}

.au-card__title {
  color: #8c9097;
  transition: color 0.6s ease;
}

.au-card__desc {
  color: #9a9ea5;
  transition: color 0.6s ease;
}

.au-card__img {
  filter: grayscale(1) contrast(0.9);
  opacity: 0.6;
  transition:
    filter 0.7s ease,
    transform 0.7s cubic-bezier(0.2, 0.7, 0.1, 1),
    opacity 0.7s ease;
}

.au-card.is-active {
  background: linear-gradient(180deg, #f5faff 0%, #dcebff 100%);
  border-color: #9cc8f6;
  box-shadow: 0 26px 50px -30px rgba(0, 113, 231, 0.5);
}

.au-card.is-active .au-card__title {
  color: #0071e7;
}

.au-card.is-active .au-card__desc {
  color: #434750;
}

.au-card.is-active .au-card__img {
  filter: none;
  opacity: 1;
  transform: translateY(-4px) scale(1.04);
}

@media (hover: hover) {
  .au-card:hover {
    background: linear-gradient(180deg, #f5faff 0%, #dcebff 100%);
    border-color: #9cc8f6;
    box-shadow: 0 26px 50px -30px rgba(0, 113, 231, 0.5);
  }

  .au-card:hover .au-card__title {
    color: #0071e7;
  }

  .au-card:hover .au-card__desc {
    color: #434750;
  }

  .au-card:hover .au-card__img {
    filter: none;
    opacity: 1;
    transform: translateY(-4px) scale(1.04);
  }
}

.au-arrow {
  display: inline-flex;
  width: 38px;
  height: 38px;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  border: 1px solid #d7dde6;
  color: #0b2c5d;
  background: #fff;
  transition:
    background-color 0.3s ease,
    color 0.3s ease,
    border-color 0.3s ease,
    opacity 0.3s ease;
}

.au-arrow--prev,
.au-arrow--next {
  position: absolute;
  top: 50%;
  z-index: 2;
  transform: translateY(-50%);
  box-shadow: 0 8px 20px -10px rgba(11, 44, 93, 0.45);
}

.au-arrow--prev {
  left: -18px;
}

.au-arrow--next {
  right: -18px;
}

.au-arrow:disabled.au-arrow--prev,
.au-arrow:disabled.au-arrow--next {
  opacity: 0;
  pointer-events: none;
}

.au-arrow svg {
  width: 17px;
  height: 17px;
}

.au-arrow:disabled {
  opacity: 0.35;
  cursor: default;
}

.au-arrow:not(:disabled):active {
  background: #0b2c5d;
  border-color: #0b2c5d;
  color: #fff;
}

.au-arrow:focus-visible {
  outline: 2px solid #47b7fd;
  outline-offset: 3px;
}

@media (hover: hover) {
  .au-arrow:not(:disabled):hover {
    background: #0b2c5d;
    border-color: #0b2c5d;
    color: #fff;
  }
}

.au-bar {
  transform-origin: left center;
  transition: transform 0.2s linear;
}

@media (min-width: 1024px) and (pointer: fine) and (prefers-reduced-motion: no-preference) {
  .au-inner {
    min-height: 100vh;
  }

  .au-viewport {
    overflow: visible;
    scroll-snap-type: none;
  }

  .au-track::before,
  .au-track::after {
    display: none;
  }

  .au-nav {
    display: none;
  }

  .au-track {
    will-change: transform;
  }
}

@media (prefers-reduced-motion: reduce) {
  .au-card,
  .au-card__img,
  .au-card__title,
  .au-card__desc,
  .au-bar {
    transition: none;
  }
}
</style>
