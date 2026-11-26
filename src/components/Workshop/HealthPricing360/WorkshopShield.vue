<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import WorkshopEyebrow from "./WorkshopEyebrow.vue";
import shieldMark from "@/assets/Products/images/Shield/v2/shield-mark.webp";
import faceScanning from "@/assets/Products/images/Shield/v2/face-scanning.webp";
import healthResult from "@/assets/Products/images/Shield/v2/health-result.webp";

const NS = "workshop.healthpricing360.shield";
const { t, tm, rt } = useI18n();

const IMAGES = [faceScanning, healthResult];
const INTERVAL_MS = 6500;

const steps = computed(() =>
  tm(`${NS}.steps`).map((m) => ({ title: rt(m.title), desc: rt(m.desc) })),
);
const imageAlts = computed(() => tm(`${NS}.imageAlt`).map((m) => rt(m)));

const active = ref(0);
const paused = ref(false);
const interacted = ref(false);
const autoplay = ref(false);
const inView = ref(false);
const panel = ref(null);
let observer = null;

const select = (i) => {
  active.value = i;
  interacted.value = true;
};

const advance = () => {
  if (interacted.value) return;
  active.value = (active.value + 1) % steps.value.length;
};

onMounted(() => {
  autoplay.value = !window.matchMedia("(prefers-reduced-motion: reduce)")
    .matches;
  observer = new IntersectionObserver(
    ([entry]) => {
      inView.value = entry.isIntersecting;
    },
    { threshold: 0.35 },
  );
  if (panel.value) observer.observe(panel.value);
});

onBeforeUnmount(() => observer?.disconnect());
</script>

<template>
  <section id="shield" class="relative w-full px-4 sm:px-8 mt-20 lg:mt-32">
    <div
      ref="panel"
      data-aos="fade-up"
      class="sh-panel relative isolate overflow-hidden rounded-[28px] md:rounded-[36px] text-white"
      @mouseenter="paused = true"
      @mouseleave="paused = false"
    >
      <div
        aria-hidden="true"
        class="absolute -z-10 -left-[10%] -top-[30%] w-[55%] aspect-square rounded-full bg-[#0071E7]/30 blur-[120px]"
      ></div>
      <div
        aria-hidden="true"
        class="absolute -z-10 right-[-15%] bottom-[-40%] w-[60%] aspect-square rounded-full bg-[#1AB24F]/15 blur-[120px]"
      ></div>
      <div aria-hidden="true" class="sh-grid absolute inset-0 -z-10"></div>

      <div
        class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 px-6 py-10 sm:px-10 sm:py-14 xl:px-16 xl:py-16"
      >
        <div class="lg:col-span-5 flex flex-col">
          <WorkshopEyebrow index="04" :label="t(`${NS}.eyebrow`)" dark />
          <h2
            class="mt-6 text-[26px] sm:text-[34px] xl:text-[40px] font-[700] leading-[1.15] tracking-[-0.02em]"
          >
            {{ t(`${NS}.title`) }}
          </h2>
          <p
            class="mt-5 text-[15px] sm:text-[16px] leading-[1.75] text-white/70"
          >
            {{ t(`${NS}.body`) }}
          </p>

          <ol class="mt-8 flex flex-col gap-2.5">
            <li v-for="(step, i) in steps" :key="i">
              <button
                type="button"
                :aria-pressed="active === i"
                class="group relative w-full overflow-hidden rounded-[18px] border p-4 sm:p-5 text-left transition-all duration-300"
                :class="
                  active === i
                    ? 'border-[#4AA8FF]/50 bg-white/[0.09] shadow-[0_16px_40px_-24px_rgba(74,168,255,0.8)]'
                    : 'border-white/10 bg-white/[0.03] hover:bg-white/[0.06]'
                "
                @click="select(i)"
              >
                <span class="flex items-center justify-between gap-3">
                  <span
                    class="text-[15px] sm:text-[16px] font-[600]"
                    :class="active === i ? 'text-white' : 'text-white/80'"
                    >{{ step.title }}</span
                  >
                  <span
                    class="font-mono text-[11px] font-[600]"
                    :class="active === i ? 'text-[#4AA8FF]' : 'text-white/35'"
                    >0{{ i + 1 }}</span
                  >
                </span>
                <span
                  class="mt-1.5 block text-[13px] sm:text-[13.5px] leading-[1.6]"
                  :class="active === i ? 'text-white/75' : 'text-white/50'"
                  >{{ step.desc }}</span
                >
                <span
                  v-if="autoplay && active === i && !interacted"
                  :key="`p-${active}`"
                  aria-hidden="true"
                  class="sh-progress absolute inset-x-0 bottom-0 h-[2px] bg-[#4AA8FF]"
                  :class="{ 'is-paused': paused || !inView }"
                  :style="{ animationDuration: `${INTERVAL_MS}ms` }"
                  @animationend="advance"
                ></span>
              </button>
            </li>
          </ol>

          <router-link
            to="/product/shield"
            class="group mt-7 inline-flex h-11 items-center gap-2 self-start rounded-xl bg-white px-5 text-[14px] font-[600] text-[#071427] transition-colors hover:bg-[#E8F2FF]"
          >
            <img
              :src="shieldMark"
              alt=""
              width="16"
              height="16"
              class="w-4 h-4 object-contain"
            />
            {{ t(`${NS}.cta`) }}
            <svg
              viewBox="0 0 24 24"
              class="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5"
              fill="none"
              stroke="currentColor"
              stroke-width="2.2"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </router-link>
        </div>

        <div class="lg:col-span-7">
          <div
            class="relative flex h-full min-h-[440px] sm:min-h-[500px] flex-col overflow-hidden rounded-[24px] border border-white/10 bg-[#050E1E]/70 backdrop-blur-xl"
          >
            <div
              class="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3 sm:px-5"
            >
              <div class="flex items-center gap-2">
                <span class="w-2.5 h-2.5 rounded-full bg-white/15"></span>
                <span class="w-2.5 h-2.5 rounded-full bg-white/15"></span>
                <span class="w-2.5 h-2.5 rounded-full bg-white/15"></span>
                <span
                  class="ml-2 font-mono text-[11px] sm:text-[12px] text-white/45"
                  >shield.seleris.ai</span
                >
              </div>
              <span
                class="rounded-md border border-[#4AA8FF]/30 bg-[#4AA8FF]/10 px-2 py-0.5 font-mono text-[10px] font-[600] uppercase tracking-[0.12em] text-[#9CCBFF]"
                >{{ t(`${NS}.previewLabel`) }}</span
              >
            </div>

            <div
              class="relative flex flex-1 items-center justify-center p-5 sm:p-8"
            >
              <div
                aria-hidden="true"
                class="absolute left-1/2 top-1/2 w-[70%] aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0071E7]/20 blur-[80px]"
              ></div>
              <div class="sh-stack relative grid w-full place-items-center">
                <div
                  v-for="(image, i) in IMAGES"
                  :key="image"
                  class="sh-visual relative flex w-full items-end justify-center"
                  :class="{ 'is-active': active === i }"
                >
                  <img
                    :src="image"
                    :alt="imageAlts[i]"
                    width="606"
                    height="808"
                    loading="lazy"
                    class="sh-phone relative w-[240px] sm:w-[290px] xl:w-[310px] h-auto"
                  />
                  <span
                    class="absolute left-0 sm:left-4 top-4 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 font-mono text-[10.5px] font-[600] uppercase tracking-[0.12em] text-white/80 backdrop-blur-md"
                    >{{ t(`${NS}.stepLabel`, { n: i + 1 }) }}</span
                  >
                </div>

                <div
                  class="sh-visual relative flex w-full max-w-[460px] flex-col items-center"
                  :class="{ 'is-active': active >= IMAGES.length }"
                >
                  <span
                    class="self-start mb-5 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 font-mono text-[10.5px] font-[600] uppercase tracking-[0.12em] text-white/80"
                    >{{ t(`${NS}.stepLabel`, { n: 3 }) }}</span
                  >
                  <div class="grid w-full grid-cols-2 gap-3">
                    <div
                      class="rounded-2xl border border-[#4AA8FF]/35 bg-[#4AA8FF]/10 p-3.5 sm:p-4"
                    >
                      <img
                        :src="shieldMark"
                        alt=""
                        width="18"
                        height="18"
                        class="w-[18px] h-[18px] object-contain"
                      />
                      <p
                        class="mt-2 text-[12.5px] sm:text-[13.5px] font-[600] leading-snug"
                      >
                        {{ t(`${NS}.flow.input`) }}
                      </p>
                    </div>
                    <div
                      class="rounded-2xl border border-white/15 bg-white/[0.06] p-3.5 sm:p-4"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        class="w-[18px] h-[18px] text-[#3DDC84]"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="1.8"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        aria-hidden="true"
                      >
                        <path
                          d="M5 7c0-1.4 3.1-2.5 7-2.5s7 1.1 7 2.5-3.1 2.5-7 2.5S5 8.4 5 7Z"
                        />
                        <path d="M5 7v5c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5V7" />
                        <path d="M5 12v5c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5v-5" />
                      </svg>
                      <p
                        class="mt-2 text-[12.5px] sm:text-[13.5px] font-[600] leading-snug"
                      >
                        {{ t(`${NS}.flow.data`) }}
                      </p>
                    </div>
                  </div>

                  <svg
                    viewBox="0 0 200 40"
                    class="w-1/2 h-10 text-white/30"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.5"
                    aria-hidden="true"
                  >
                    <path
                      d="M10 0v10a10 10 0 0 0 10 10h70a10 10 0 0 1 10 10v10"
                    />
                    <path
                      d="M190 0v10a10 10 0 0 1-10 10h-70a10 10 0 0 0-10 10v10"
                    />
                  </svg>

                  <div
                    class="w-full rounded-2xl border border-white/15 bg-white/[0.08] px-4 py-4 text-center"
                  >
                    <p class="text-[14px] sm:text-[15px] font-[700]">
                      {{ t(`${NS}.flow.model`) }}
                    </p>
                  </div>

                  <span aria-hidden="true" class="h-6 w-px bg-white/25"></span>

                  <span
                    class="inline-flex items-center gap-2 rounded-full border border-[#FCD34D]/35 bg-[#FCD34D]/10 px-3.5 py-1.5 text-[12px] sm:text-[12.5px] font-[600] text-[#FDE68A]"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      class="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      aria-hidden="true"
                    >
                      <path
                        d="M12 3 5 6v5.5c0 4.3 2.9 8.2 7 9.5 4.1-1.3 7-5.2 7-9.5V6l-7-3Z"
                      />
                      <path d="m9 12 2 2 4-4" />
                    </svg>
                    {{ t(`${NS}.flow.gate`) }}
                  </span>

                  <span aria-hidden="true" class="h-6 w-px bg-white/25"></span>

                  <div
                    class="w-full rounded-2xl bg-[#3DDC84] px-4 py-4 text-center text-[#041B12]"
                  >
                    <p class="text-[14px] sm:text-[15px] font-[700]">
                      {{ t(`${NS}.flow.output`) }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="px-3 pb-3 sm:px-4 sm:pb-4">
        <aside
          class="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 rounded-[18px] md:rounded-[24px] border border-[#FCD34D]/25 bg-[#FCD34D]/[0.07] px-5 py-4 sm:px-6 sm:py-5"
        >
          <svg
            viewBox="0 0 24 24"
            class="shrink-0 w-6 h-6 text-[#FCD34D]"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="9" />
            <path d="M12 11v5" />
            <path d="M12 7.5h.01" />
          </svg>
          <p
            class="text-[13.5px] sm:text-[14.5px] leading-[1.65] text-white/85"
          >
            <strong class="font-[600] text-[#FDE68A]"
              >{{ t(`${NS}.disclaimerTitle`) }}.</strong
            >
            {{ t(`${NS}.disclaimer`) }}
          </p>
        </aside>
      </div>
    </div>
  </section>
</template>

<style scoped>
.sh-panel {
  background: linear-gradient(150deg, #040f22 0%, #06204a 55%, #073a7a 115%);
}

.sh-grid {
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.04) 1px, transparent 1px);
  background-size: 48px 48px;
  mask-image: radial-gradient(
    ellipse 60% 70% at 75% 45%,
    #000 0%,
    transparent 75%
  );
  -webkit-mask-image: radial-gradient(
    ellipse 60% 70% at 75% 45%,
    #000 0%,
    transparent 75%
  );
}

.sh-phone {
  filter: drop-shadow(0 30px 50px rgba(0, 0, 0, 0.5));
  mask-image: linear-gradient(to bottom, #000 78%, transparent);
  -webkit-mask-image: linear-gradient(to bottom, #000 78%, transparent);
}

.sh-progress {
  transform: scaleX(0);
  transform-origin: left center;
  animation-name: sh-progress;
  animation-timing-function: linear;
  animation-fill-mode: forwards;
}
.sh-progress.is-paused {
  animation-play-state: paused;
}

@keyframes sh-progress {
  to {
    transform: scaleX(1);
  }
}

.sh-stack > .sh-visual {
  grid-area: 1 / 1;
}
.sh-visual {
  opacity: 0;
  transform: translateY(14px);
  visibility: hidden;
  will-change: opacity, transform;
  transition:
    opacity 0.2s ease,
    transform 0.2s ease,
    visibility 0s linear 0.2s;
}
.sh-visual.is-active {
  opacity: 1;
  transform: none;
  visibility: visible;
  transition:
    opacity 0.4s ease 0.12s,
    transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.12s,
    visibility 0s;
}

@media (prefers-reduced-motion: reduce) {
  .sh-visual {
    transform: none;
    transition:
      opacity 0.15s ease,
      visibility 0s linear 0.15s;
  }
  .sh-visual.is-active {
    transition:
      opacity 0.15s ease,
      visibility 0s;
  }
}
</style>
