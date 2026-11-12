<script setup>
import { computed, onMounted, onBeforeUnmount, ref } from "vue";
import { useLocalizedList } from "@/utils/i18nList";
import { shieldTestimonials } from "@/Data/Products/Shield/ShieldTestimonials";

const reviews = useLocalizedList(
  "products.shared.testimonialsB2B",
  shieldTestimonials,
  ["comment", "authorName", "authorPosition"],
);

const DURATION = 6500;

const root = ref(null);
const active = ref(0);
const direction = ref(1);
const visible = ref(false);
const resting = ref(false);
const reduced = ref(false);
const cycleKey = ref(0);

let observer = null;
let restTimer = null;
let drag = null;

const total = computed(() => reviews.value.length);
const paused = computed(() => resting.value || !visible.value || reduced.value);
const current = computed(() => reviews.value[active.value] || {});

function wrap(i) {
  return (i + total.value) % total.value;
}

function offsetOf(i) {
  let d = i - active.value;
  const half = total.value / 2;
  if (d > half) d -= total.value;
  if (d < -half) d += total.value;
  return d;
}

function go(i, dir) {
  if (!total.value) return;
  direction.value = dir ?? (offsetOf(wrap(i)) >= 0 ? 1 : -1);
  active.value = wrap(i);
  cycleKey.value++;
}

function rest() {
  resting.value = true;
  clearTimeout(restTimer);
  restTimer = setTimeout(() => {
    resting.value = false;
    cycleKey.value++;
  }, 4000);
}

function userGo(i, dir) {
  go(i, dir);
  rest();
}

function next() {
  go(active.value + 1, 1);
}

function onPointerDown(e) {
  if (e.pointerType === "mouse" && e.button !== 0) return;
  drag = { x: e.clientX, y: e.clientY, id: e.pointerId, moved: false };
}

function onPointerMove(e) {
  if (!drag || drag.id !== e.pointerId) return;
  const dx = e.clientX - drag.x;
  const dy = e.clientY - drag.y;
  if (!drag.moved && Math.abs(dx) > 8 && Math.abs(dx) > Math.abs(dy)) {
    drag.moved = true;
    e.currentTarget.setPointerCapture?.(e.pointerId);
  }
  if (drag.moved) drag.dx = dx;
}

function onPointerUp(e) {
  if (!drag || drag.id !== e.pointerId) return;
  const dx = drag.dx || 0;
  drag = null;
  if (Math.abs(dx) < 50) return;
  if (dx < 0) userGo(active.value + 1, 1);
  else userGo(active.value - 1, -1);
}

function onKey(e) {
  if (e.key === "ArrowRight" || e.key === "ArrowDown") {
    e.preventDefault();
    userGo(active.value + 1, 1);
  } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
    e.preventDefault();
    userGo(active.value - 1, -1);
  }
}

onMounted(() => {
  reduced.value = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  observer = new IntersectionObserver(
    ([entry]) => {
      visible.value = entry.isIntersecting;
    },
    { threshold: 0.35 },
  );
  observer.observe(root.value);
});

onBeforeUnmount(() => {
  observer?.disconnect();
  clearTimeout(restTimer);
});
</script>

<template>
  <section
    id="testimonial"
    ref="root"
    class="relative w-full bg-[#F8FAFC] px-8 lg:px-[29px] pt-[22px] pb-[72px] md:pb-[101px]"
  >
    <div class="mx-auto max-w-[1130px]">
      <h2
        data-aos="fade-up"
        class="text-[#0B2C5D] font-medium tracking-[-0.01em] text-[23px] md:text-[27px] xl:text-[31px] leading-tight"
      >
        {{ $t("products.shield.landing.reviews.title") }}
      </h2>

      <div
        class="mt-[36px] md:mt-[50px] grid grid-cols-1 lg:grid-cols-[minmax(0,450px)_1fr] gap-[36px] lg:gap-[58px] items-center"
        role="region"
        aria-roledescription="carousel"
        :aria-label="$t('products.shield.landing.reviews.title')"
        tabindex="0"
        @keydown="onKey"
      >
        <div
          class="rv-names relative hidden lg:block h-[297px] overflow-hidden"
          aria-hidden="true"
        >
          <button
            v-for="(review, i) in reviews"
            :key="i"
            type="button"
            tabindex="-1"
            class="rv-name absolute left-0 right-0 top-1/2 flex items-start gap-[18px] pl-[54px] text-left"
            :class="{
              'is-active': i === active,
              'is-near': Math.abs(offsetOf(i)) === 1,
            }"
            :style="{
              transform: `translateY(calc(-50% + ${offsetOf(i) * 99}px)) scale(${i === active ? 1 : 0.94})`,
            }"
            @click="userGo(i)"
          >
            <span
              class="rv-dot mt-[9px] h-[10px] w-[10px] shrink-0 rounded-full"
            ></span>
            <span>
              <span
                class="rv-name__title block text-[17px] xl:text-[21px] font-normal leading-snug"
              >
                {{ review.authorName }}
              </span>
              <span
                class="mt-[4px] block text-[#434750] text-[13px] leading-snug"
              >
                {{ review.authorPosition }}
              </span>
            </span>
          </button>
        </div>

        <div
          class="rv-stage relative select-none touch-pan-y"
          @pointerdown="onPointerDown"
          @pointermove="onPointerMove"
          @pointerup="onPointerUp"
          @pointercancel="onPointerUp"
        >
          <svg
            class="h-[20px] w-[25px] text-[#0B2C5D]"
            viewBox="0 0 28 22"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              d="M5.2 22 0 22l6.4-22h7.1L5.2 22Zm14 0H14l6.4-22h7.1l-8.3 22Z"
            />
          </svg>

          <div
            class="relative mt-[22px] min-h-[207px] md:min-h-[180px]"
            aria-live="polite"
          >
            <Transition
              :name="direction > 0 ? 'rv-next' : 'rv-prev'"
              mode="out-in"
            >
              <figure :key="active" class="m-0">
                <blockquote
                  class="text-[#0B2C5D] italic text-[18px] md:text-[21px] xl:text-[22px] leading-[1.55] font-normal"
                >
                  {{ current.comment }}
                </blockquote>
                <figcaption
                  class="mt-[29px] flex flex-wrap items-baseline gap-x-[7px] gap-y-[4px]"
                >
                  <span class="text-[#0B2C5D] text-[15px] xl:text-[18px]">
                    {{ current.authorName }}
                  </span>
                  <span class="text-[#434750] text-[12px] xl:text-[13px]">
                    • {{ current.authorPosition }}
                  </span>
                </figcaption>
              </figure>
            </Transition>
          </div>

          <div class="mt-[29px] flex items-center gap-[14px]">
            <button
              type="button"
              class="rv-arrow"
              :aria-label="$t('products.shield.landing.reviews.previous')"
              @click="userGo(active - 1, -1)"
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
              class="rv-arrow"
              :aria-label="$t('products.shield.landing.reviews.next')"
              @click="userGo(active + 1, 1)"
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
            <div class="flex flex-1 items-center gap-[5px] max-w-[234px]">
              <button
                v-for="(review, i) in reviews"
                :key="i"
                type="button"
                class="rv-seg relative h-[3px] flex-1 overflow-hidden rounded-full"
                :aria-label="review.authorName"
                :aria-current="i === active"
                @click="userGo(i)"
              >
                <span
                  v-if="i === active"
                  :key="cycleKey"
                  class="rv-seg__fill absolute inset-0 rounded-full"
                  :class="{ 'is-paused': paused }"
                  :style="{ animationDuration: `${DURATION}ms` }"
                  @animationend="next"
                ></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.rv-name {
  opacity: 0;
  color: #b4b8bf;
  transition:
    transform 0.8s cubic-bezier(0.22, 0.7, 0.1, 1),
    opacity 0.6s ease,
    color 0.6s ease;
}

.rv-name:not(.is-active):not(.is-near) {
  pointer-events: none;
}

.rv-name.is-near {
  opacity: 1;
}

.rv-name.is-active {
  opacity: 1;
}

.rv-name.is-active .rv-name__title {
  color: #0b2c5d;
}

.rv-name__title {
  color: #a8adb5;
  transition: color 0.6s ease;
}

.rv-dot {
  background: #e2e4e8;
  transition:
    background-color 0.6s ease,
    box-shadow 0.6s ease;
}

.rv-name.is-active .rv-dot {
  background: #0071e7;
  box-shadow: 0 0 0 5px rgba(0, 113, 231, 0.12);
}

.rv-stage {
  cursor: grab;
}

.rv-stage:active {
  cursor: grabbing;
}

.rv-arrow {
  display: inline-flex;
  width: 36px;
  height: 36px;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  border: 1px solid #d7dde6;
  color: #0b2c5d;
  background: #fff;
  transition:
    background-color 0.3s ease,
    color 0.3s ease,
    border-color 0.3s ease;
}

.rv-arrow svg {
  width: 16px;
  height: 16px;
}

@media (hover: hover) {
  .rv-arrow:hover {
    background: #0b2c5d;
    border-color: #0b2c5d;
    color: #fff;
  }
}

.rv-seg {
  background: #e3e8ef;
}

.rv-seg__fill {
  background: #0071e7;
  transform-origin: left center;
  animation-name: rv-progress;
  animation-timing-function: linear;
  animation-fill-mode: forwards;
}

.rv-seg__fill.is-paused {
  animation-play-state: paused;
}

.rv-next-enter-active,
.rv-next-leave-active,
.rv-prev-enter-active,
.rv-prev-leave-active {
  transition:
    opacity 0.45s ease,
    transform 0.45s cubic-bezier(0.22, 0.7, 0.1, 1),
    filter 0.45s ease;
}

.rv-next-enter-from,
.rv-prev-leave-to {
  opacity: 0;
  transform: translateX(28px);
  filter: blur(4px);
}

.rv-next-leave-to,
.rv-prev-enter-from {
  opacity: 0;
  transform: translateX(-28px);
  filter: blur(4px);
}

@keyframes rv-progress {
  from {
    transform: scaleX(0);
  }
  to {
    transform: scaleX(1);
  }
}

@media (prefers-reduced-motion: reduce) {
  .rv-name,
  .rv-next-enter-active,
  .rv-next-leave-active,
  .rv-prev-enter-active,
  .rv-prev-leave-active {
    transition: none;
  }
}
</style>
