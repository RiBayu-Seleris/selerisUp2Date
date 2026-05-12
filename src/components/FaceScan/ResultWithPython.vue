<script setup>
import { computed } from "vue";

import CsIcon from "@/assets/icons/FaceTracker/cs-icon.svg";
import ChevronLeft from "@/assets/icons/chevron-left.svg";

// =========================
// Props
// =========================
const props = defineProps({
  data: {
    type: Object,
    default: null,
  },
  isLastResult: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["back"]);

// =========================
// Safe Data
// =========================
const data = computed(() => props.data ?? null);

// =========================
// Status Helpers
// =========================
function getStatus(metric, val) {
  if (val == null) return "No Data";

  switch (metric) {
    case "heart_rate":
      if (val < 60) return "Low (Bradycardia)";
      if (val <= 100) return "Normal";
      return "High (Tachycardia)";

    case "breath_rate":
      if (val < 12) return "Low";
      if (val <= 20) return "Normal";
      return "High";

    case "hrv":
      if (val < 20) return "Low";
      if (val <= 60) return "Moderate";
      return "Good";

    case "systole":
      if (val < 90) return "Low";
      if (val <= 120) return "Normal";
      if (val <= 129) return "Elevated";
      if (val <= 139) return "High Stage 1";
      return "High Stage 2";

    case "diastole":
      if (val < 60) return "Low";
      if (val <= 80) return "Normal";
      if (val <= 89) return "High Stage 1";
      return "High Stage 2";

    default:
      return "–";
  }
}

function statusColor(status) {
  if (!status || status === "–" || status === "No Data") {
    return "text-[#6B7280]";
  }

  if (
    status.toLowerCase().includes("normal") ||
    status.toLowerCase().includes("good")
  ) {
    return "text-[#22C55E]";
  }

  if (
    status.toLowerCase().includes("moderate") ||
    status.toLowerCase().includes("elevated")
  ) {
    return "text-[#F59E0B]";
  }

  return "text-[#EF4444]";
}

// =========================
// Metric Cards
// =========================
const metricCards = computed(() => {
  const d = data.value;

  if (!d) return [];

  return [
    {
      id: "heart_rate",
      title: "Heart Rate",
      value: d.heart_rate != null ? d.heart_rate.toFixed(1) : "–",
      unit: "bpm",
      description:
        "Heart rate indicates how many times your heart beats per minute. Normal resting range is 60–100 bpm.",
      status: getStatus("heart_rate", d.heart_rate),
    },

    {
      id: "breath_rate",
      title: "Breath Rate",
      value: d.breath_rate != null ? d.breath_rate.toFixed(1) : "–",
      unit: "brpm",
      description:
        "Respiratory rate is the number of breaths taken per minute. Normal range is 12–20 brpm.",
      status: getStatus("breath_rate", d.breath_rate),
    },

    {
      id: "hrv",
      title: "Heart Rate Variability",
      value: d.hrv != null ? d.hrv.toFixed(1) : "–",
      unit: "ms",
      description:
        "HRV measures the variation in time between heartbeats. Higher HRV generally indicates better cardiovascular fitness.",
      status: getStatus("hrv", d.hrv),
    },

    {
      id: "systole",
      title: "Systolic Pressure",
      value: d.systole != null ? d.systole.toFixed(0) : "–",
      unit: "mmHg",
      description:
        "Systolic pressure measures the force of blood against artery walls when the heart beats.",
      status: getStatus("systole", d.systole),
    },

    {
      id: "diastole",
      title: "Diastolic Pressure",
      value: d.diastole != null ? d.diastole.toFixed(0) : "–",
      unit: "mmHg",
      description:
        "Diastolic pressure measures artery pressure when the heart is resting between beats.",
      status: getStatus("diastole", d.diastole),
    },
  ];
});
</script>

<template>
  <div
    class="w-full h-full flex flex-col gap-y-5 rounded-t-2xl rounded-b-xl overflow-hidden bg-white"
  >
    <!-- Header -->
    <div class="w-full flex flex-row justify-between items-center py-6 px-8">
      <button
        type="button"
        @click="!isLastResult && emit('back')"
        class="w-10 h-10 shrink-0 flex justify-center items-center p-1 transition-opacity"
        :class="
          isLastResult
            ? 'opacity-30 cursor-not-allowed'
            : 'cursor-pointer hover:opacity-70'
        "
      >
        <img :src="ChevronLeft" alt="Back" class="w-full h-full" />
      </button>

      <div class="flex-1 h-full flex justify-center items-center p-1">
        <img src="/seleris-logo.svg" alt="Logo" class="w-auto h-full" />
      </div>

      <a
        href="/contact"
        target="_self"
        class="w-10 h-10 shrink-0 flex justify-center items-center p-1 cursor-pointer"
      >
        <img :src="CsIcon" alt="Contact" class="w-full h-full" />
      </a>
    </div>

    <!-- Title -->
    <div
      class="w-full flex flex-col gap-y-1 justify-center items-center text-center px-4"
    >
      <p class="text-[20px] text-[#374151] font-[600]">Health Score</p>

      <p class="text-[14px] font-[400] text-[#6B7280]">
        The measured indicators are correct for medical use
      </p>
    </div>

    <!-- Last Result Notice -->
    <div
      v-if="isLastResult"
      class="mx-4 px-4 py-2.5 rounded-xl bg-[#FFF7ED] border border-[#FED7AA] flex flex-row gap-x-2 items-center"
    >
      <svg
        class="w-4 h-4 shrink-0 text-[#F97316]"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>

      <p class="text-[13px] text-[#C2410C]">
        Ini adalah hasil scan terakhir Anda. Batas scan telah tercapai.
      </p>
    </div>

    <!-- Error State -->
    <template v-if="!data">
      <div
        class="flex-1 flex flex-col items-center justify-center gap-y-3 px-8"
      >
        <div
          class="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center"
        >
          <svg
            class="w-6 h-6 text-red-400"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
            />
          </svg>
        </div>

        <p class="text-[15px] font-[500] text-[#374151]">Gagal memuat hasil</p>

        <p class="text-[13px] text-[#6B7280] text-center">
          Hasil scan tidak dapat diproses. Silakan coba scan ulang.
        </p>
      </div>
    </template>

    <!-- Cards -->
    <template v-else>
      <div class="flex-1 min-h-0 overflow-y-auto px-4 py-4">
        <div class="flex flex-col gap-y-4">
          <div
            v-for="card in metricCards"
            :key="card.id"
            class="w-full rounded-xl border border-[#D1D5DB] bg-white p-5 shadow-[2px_4px_4px_0_rgba(0,0,0,0.05)]"
          >
            <div class="flex flex-col gap-y-3">
              <!-- Title + Value -->
              <div class="flex flex-row justify-between items-start">
                <div class="flex flex-col gap-y-0.5">
                  <p class="text-[#2AB857] font-[500] text-[16px]">
                    {{ card.title }}
                  </p>

                  <p
                    class="text-[22px] font-[600] text-[#374151] flex items-end gap-x-1"
                  >
                    {{ card.value }}

                    <span class="text-[11px] font-[300] text-[#6B7280] mb-1">
                      {{ card.unit }}
                    </span>
                  </p>
                </div>
              </div>

              <!-- Description -->
              <p class="text-[13px] font-[300] text-[#4B5563] leading-relaxed">
                {{ card.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
