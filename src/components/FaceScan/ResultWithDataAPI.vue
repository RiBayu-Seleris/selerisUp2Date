<script setup>
import { ref, computed, onMounted, watch } from "vue";
import CsIcon from "@/assets/icons/FaceTracker/cs-icon.svg";
import ChevronLeft from "@/assets/icons/chevron-left.svg";

import { tabs, overviewCards, detailContent } from "@/data/Results";

// =========================
// Props
// =========================
const props = defineProps({
  healthScore: { type: Number, default: 90 },
});

// =========================
// Gauge Logic
// =========================
const targetScore = computed(() =>
  Math.min(Math.max(props.healthScore, 0), 100),
);

const score = ref(0);

const S = 80;
const R = 62;
const SA = Math.PI * 0.72;
const EA = Math.PI * 2.28;
const TOTAL = EA - SA;

function pt(a) {
  return {
    x: +(S + R * Math.cos(a)).toFixed(3),
    y: +(S + R * Math.sin(a)).toFixed(3),
  };
}

function arc(a1, a2) {
  const s = pt(a1);
  const e = pt(a2);
  const lg = a2 - a1 > Math.PI ? 1 : 0;

  return `M${s.x},${s.y}A${R},${R},0,${lg},1,${e.x},${e.y}`;
}

const arcStart = pt(SA);
const arcEnd = pt(EA);

const trackPath = computed(() => arc(SA, EA));

const activePath = computed(() => {
  if (score.value <= 0) return "";

  return arc(SA, SA + TOTAL * (score.value / 100));
});

const colorStops = [
  { pos: 0, r: 240, g: 64, b: 64 },
  { pos: 0.35, r: 239, g: 139, b: 34 },
  { pos: 0.55, r: 240, g: 192, b: 32 },
  { pos: 0.75, r: 128, g: 192, b: 48 },
  { pos: 1, r: 48, g: 192, b: 128 },
];

function lerpColor(t) {
  t = Math.max(0, Math.min(1, t));

  let lo = colorStops[0];
  let hi = colorStops[colorStops.length - 1];

  for (let i = 0; i < colorStops.length - 1; i++) {
    if (t >= colorStops[i].pos && t <= colorStops[i + 1].pos) {
      lo = colorStops[i];
      hi = colorStops[i + 1];
      break;
    }
  }

  const f = lo.pos === hi.pos ? 0 : (t - lo.pos) / (hi.pos - lo.pos);
  return `rgb(
    ${Math.round(lo.r + (hi.r - lo.r) * f)},
    ${Math.round(lo.g + (hi.g - lo.g) * f)},
    ${Math.round(lo.b + (hi.b - lo.b) * f)}
  )`;
}

const scoreColor = computed(() => lerpColor(score.value / 100));

const scoreLabel = computed(() => {
  const v = score.value;

  if (v <= 20) return "Poor";
  if (v <= 40) return "Fair";
  if (v <= 60) return "Good";
  if (v <= 80) return "Very Good";

  return "Excellent";
});

function runAnimation() {
  score.value = 0;

  const dur = 1400;
  const t0 = performance.now();

  const ease = (t) => 1 - Math.pow(1 - t, 3);

  function animate(now) {
    const t = Math.min((now - t0) / dur, 1);

    score.value = Math.round(ease(t) * targetScore.value);

    if (t < 1) requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
}

onMounted(() => runAnimation());

watch(
  () => props.healthScore,
  () => runAnimation(),
);

const activeTab = ref("overall");

function selectTab(tabId) {
  activeTab.value = tabId;
}

// detailContent[tabId] is now an array of items
const activeDetailList = computed(() => detailContent[activeTab.value] ?? []);

// Selected detail item for expanded view
const selectedItem = ref(null);

function selectItem(item) {
  selectedItem.value = item;
}

function clearItem() {
  selectedItem.value = null;
}

// Reset selected item when switching tabs
watch(activeTab, () => {
  selectedItem.value = null;
});
</script>

<template>
  <div
    class="w-full h-full flex flex-col justify-between gap-y-5 rounded-t-2xl rounded-b-xl overflow-hidden bg-white"
  >
    <!-- Header -->
    <div class="w-full flex flex-row justify-between items-center py-6 px-8">
      <div class="w-10 h-10 shrink-0 flex justify-center items-center p-1">
        <img :src="ChevronLeft" alt="" class="w-full h-full" />
      </div>

      <div class="flex-1 h-full flex justify-center items-center p-1">
        <img src="/seleris-logo.svg" alt="" class="w-auto h-full" />
      </div>

      <div class="w-10 h-10 shrink-0 flex justify-center items-center p-1">
        <img :src="CsIcon" alt="" class="w-full h-full" />
      </div>
    </div>

    <!-- Title -->
    <div
      class="w-full flex flex-col gap-y-1 justify-center items-center text-center"
    >
      <p class="text-[20px] text-[#374151] font-[600]">Health Score</p>

      <p class="text-[14px] font-[400] text-[#6B7280]">
        The measured indicators are correct for medical use
      </p>
    </div>

    <!-- Gauge -->
    <div class="w-full flex flex-row px-8 items-center">
      <div class="relative w-auto h-full shrink-0">
        <svg
          viewBox="0 0 160 160"
          width="160"
          height="160"
          xmlns="http://www.w3.org/2000/svg"
          style="overflow: visible"
        >
          <defs>
            <linearGradient
              id="gaugeGrad"
              gradientUnits="userSpaceOnUse"
              :x1="arcStart.x"
              :y1="arcStart.y"
              :x2="arcEnd.x"
              :y2="arcEnd.y"
            >
              <stop offset="0%" stop-color="#f04040" />
              <stop offset="33%" stop-color="#EF8B22" />
              <stop offset="55%" stop-color="#f0c020" />
              <stop offset="78%" stop-color="#80c030" />
              <stop offset="100%" stop-color="#30c080" />
            </linearGradient>
          </defs>

          <path
            :d="trackPath"
            fill="none"
            stroke="#E5E7EB"
            stroke-width="13"
            stroke-linecap="round"
          />

          <path
            v-if="score > 0"
            :d="activePath"
            fill="none"
            stroke="url(#gaugeGrad)"
            stroke-width="13"
            stroke-linecap="round"
          />
        </svg>

        <div class="absolute inset-0 flex flex-col items-center justify-center">
          <div
            class="w-[85px] h-[85px] flex flex-col gap-y-1 justify-center items-center bg-white rounded-full shadow-[0_0_10px_2px_rgba(0,0,0,0.2)]"
          >
            <p
              class="text-[20px] font-[600] leading-none transition-colors duration-150"
              :style="{ color: scoreColor }"
            >
              {{ score }}
            </p>

            <p
              class="text-[12px] font-[400] transition-colors duration-150 text-nowrap"
              :style="{ color: scoreColor }"
            >
              {{ scoreLabel }}
            </p>
          </div>
        </div>
      </div>

      <!-- User Info -->
      <div class="flex-1 flex flex-col gap-y-3 pl-4">
        <div class="flex flex-col">
          <p class="text-[13px] font-[400] text-[#6B7280]">Name</p>

          <p class="text-[15px] font-[500] text-[#374151]">Dania Savina</p>
        </div>

        <div class="flex flex-row gap-x-6">
          <div class="flex flex-col">
            <p class="text-[13px] font-[400] text-[#6B7280]">Gender</p>

            <p class="text-[15px] font-[500] text-[#374151]">Female</p>
          </div>

          <div class="flex flex-col">
            <p class="text-[13px] font-[400] text-[#6B7280]">Age</p>

            <p class="text-[15px] font-[500] text-[#374151]">24 Years</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom -->
    <div class="flex-1 min-h-0 w-full flex flex-col">
      <!-- Tabs -->
      <div
        class="shrink-0 flex overflow-x-auto scroll-smooth hide-scrollbar border-b border-[#E5E7EB]"
      >
        <button
          v-for="tab in tabs"
          :key="tab.id"
          @click="selectTab(tab.id)"
          class="relative shrink-0 px-6 py-4 text-[14px] font-semibold transition-all duration-200"
          :class="activeTab === tab.id ? 'text-[#22C55E]' : 'text-[#9CA3AF]'"
        >
          {{ tab.label }}

          <div
            v-if="activeTab === tab.id"
            class="absolute bottom-0 left-0 w-full h-[3px] rounded-full bg-[#22C55E]"
          />
        </button>
      </div>

      <!-- Content -->
      <div class="flex-1 min-h-0 overflow-y-auto px-4 py-4">
        <!-- OVERALL -->
        <template v-if="activeTab === 'overall'">
          <div class="flex flex-col gap-y-4">
            <div
              v-for="card in overviewCards"
              :key="card.id"
              class="w-full h-auto rounded-xl border-[1px] border-[#D1D5DB] bg-white p-4 shadow-[2px_4px_4px_0_rgba(0,0,0,0.05)]"
            >
              <div
                class="w-full h-auto flex flex-row justify-between items-center gap-x-4"
              >
                <div
                  class="w-[15%] h-auto shrink-0 flex flex-col gap-y-2.5 justify-center items-center"
                >
                  <div class="w-8 h-8 flex justify-center items-center">
                    <img
                      :src="card.icon"
                      alt=""
                      srcset=""
                      class="w-full h-full"
                    />
                  </div>
                  <div
                    class="w-full h-auto flex flex-col gap-y-0.5 justify-center items-center"
                  >
                    <div class="w-full h-auto flex justify-center items-center">
                      <p class="text-[#374151] text-[14px] font-[500]">
                        {{ card.value }}
                      </p>
                    </div>
                    <div class="w-full h-auto flex justify-center items-center">
                      <p class="text-[#6B7280] text-[14px] font-[500]">
                        {{ card.unit }}
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  class="w-full h-auto flex flex-col gap-y-3 justify-center items-center"
                >
                  <div class="w-full h-auto flex">
                    <p class="text-[#2AB857] font-[600] text-[16px]">
                      {{ card.title }}
                    </p>
                  </div>
                  <div class="w-full h-auto flex flex-col gap-y-1.5">
                    <div class="w-full h-auto flex">
                      <p class="text-[#2158EF] font-[500] text-[14px]">
                        Your Result:
                        <span class="text-[#374151]">{{ card.status }}</span>
                      </p>
                    </div>
                    <div class="w-full line-clamp-2">
                      <p class="text-[#4B5563] text-[14px] font-[300]">
                        {{ card.description }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>

        <!-- DETAIL — list of cards per category -->
        <template v-else-if="activeDetailList.length > 0">
          <!-- Expanded single item view -->
          <template v-if="selectedItem">
            <div
              class="w-full h-auto rounded-xl border-[1px] border-[#D1D5DB] bg-white p-5 shadow-[2px_4px_4px_0_rgba(0,0,0,0.05)]"
            >
              <!-- Back button -->
              <button
                @click="clearItem"
                class="mb-4 flex flex-row items-center gap-x-1 text-[#2158EF] text-[13px] font-[500]"
              >
                ← Back
              </button>

              <div
                class="w-full h-auto flex flex-col gap-y-5 justify-center items-center"
              >
                <div
                  class="w-full flex flex-row gap-x-5 justify-between items-stretch"
                >
                  <div class="w-auto shrink-0 flex justify-center items-center">
                    <div class="w-14 h-14 flex justify-center items-center">
                      <img :src="selectedItem.icon" alt="" />
                    </div>
                  </div>

                  <div
                    class="w-full flex flex-col gap-y-1 justify-center items-start"
                  >
                    <div class="w-full h-auto flex justify-start items-center">
                      <p class="text-[#2AB857] font-[500] text-[16px]">
                        {{ selectedItem.title }}
                      </p>
                    </div>
                    <div class="w-full h-auto flex justify-start items-center">
                      <p
                        class="text-[20px] flex items-center gap-x-1 font-[500] text-[#374151]"
                      >
                        {{ selectedItem.value }}
                        <span
                          class="text-[10px] font-[300] text-[#6B7280] inline-flex items-center"
                        >
                          {{ selectedItem.unit }}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  class="w-full h-auto flex flex-col gap-y-4 justify-between items-center"
                >
                  <div class="w-full h-auto flex">
                    <p class="text-[14px] font-[300] text-[#4B5563]">
                      {{ selectedItem.description }}
                    </p>
                  </div>
                  <div
                    class="w-full h-auto flex flex-col justify-between items-center gap-y-1"
                  >
                    <div class="w-full h-auto flex">
                      <p class="text-[#2158EF] font-[600] text-[14px]">
                        Your Result:
                        <span class="text-[#374151]">{{
                          selectedItem.status
                        }}</span>
                      </p>
                    </div>
                    <p class="text-[14px] font-[400] text-[#4B5563]">
                      {{ selectedItem.result }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </template>

          <!-- List of cards in category -->
          <template v-else>
            <div class="flex flex-col gap-y-4">
              <div
                v-for="item in activeDetailList"
                :key="item.id"
                @click="selectItem(item)"
                class="w-full h-auto rounded-xl border-[1px] border-[#D1D5DB] bg-white p-4 shadow-[2px_4px_4px_0_rgba(0,0,0,0.05)] cursor-pointer"
              >
                <div
                  class="w-full h-auto flex flex-row justify-between items-center gap-x-4"
                >
                  <div
                    class="w-[15%] h-auto shrink-0 flex flex-col gap-y-2.5 justify-center items-center"
                  >
                    <div class="w-8 h-8 flex justify-center items-center">
                      <img
                        :src="item.icon"
                        alt=""
                        srcset=""
                        class="w-full h-full"
                      />
                    </div>
                    <div
                      class="w-full h-auto flex flex-col gap-y-0.5 justify-center items-center"
                    >
                      <div
                        class="w-full h-auto flex justify-center items-center"
                      >
                        <p class="text-[#374151] text-[14px] font-[500]">
                          {{ item.value }}
                        </p>
                      </div>
                      <div
                        class="w-full h-auto flex justify-center items-center"
                      >
                        <p class="text-[#6B7280] text-[14px] font-[500]">
                          {{ item.unit }}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div
                    class="w-full h-auto flex flex-col gap-y-3 justify-center items-center"
                  >
                    <div class="w-full h-auto flex">
                      <p class="text-[#2AB857] font-[600] text-[16px]">
                        {{ item.title }}
                      </p>
                    </div>
                    <div class="w-full h-auto flex flex-col gap-y-1.5">
                      <div class="w-full h-auto flex">
                        <p class="text-[#2158EF] font-[500] text-[14px]">
                          Your Result:
                          <span class="text-[#374151]">{{ item.status }}</span>
                        </p>
                      </div>
                      <div class="w-full line-clamp-2">
                        <p class="text-[#4B5563] text-[14px] font-[300]">
                          {{ item.description }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </template>
      </div>
    </div>
  </div>
</template>
