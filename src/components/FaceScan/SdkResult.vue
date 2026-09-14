<script setup>
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const props = defineProps({
  result: { type: Object, required: true },
});
defineEmits(["rescan"]);

const { t } = useI18n();

// Lima metric, dalam urutan yang ditetapkan dokumen.
const daftar = computed(() => {
  const m = props.result?.metrics || {};
  return [
    { kunci: "heartRate", label: t("scanSdk.heartRate"), data: m.heartRate },
    {
      kunci: "breathingRate",
      label: t("scanSdk.breathingRate"),
      data: m.breathingRate,
    },
    { kunci: "hrv", label: t("scanSdk.hrv"), data: m.hrv },
    { kunci: "systolic", label: t("scanSdk.systolic"), data: m.systolic },
    { kunci: "diastolic", label: t("scanSdk.diastolic"), data: m.diastolic },
  ];
});

const labelSumber = (kode) => {
  if (kode === "formula_estimate") return t("scanSdk.sourceFormula");
  if (kode === "camera_experimental") return t("scanSdk.sourceExperimental");
  return kode || "";
};

const nilaiTampil = (data) =>
  data && data.value !== null && data.value !== undefined
    ? String(Math.round(Number(data.value)))
    : null;
</script>

<template>
  <div class="w-full max-w-2xl mx-auto flex flex-col gap-6">
    <h2
      class="text-[22px] md:text-[26px] font-semibold text-[#195279] dark:text-[#FAFAFA] text-center"
    >
      {{ t("scanSdk.resultTitle") }}
    </h2>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div
        v-for="item in daftar"
        :key="item.kunci"
        class="rounded-2xl border border-[#DEDEDE] dark:border-[#3A3B3D] bg-white dark:bg-[#1D1F23] px-5 py-4 flex flex-col gap-1"
      >
        <span class="text-[13px] text-[#8E98A8]">{{ item.label }}</span>

        <div class="flex items-baseline gap-1.5">
          <template v-if="nilaiTampil(item.data) !== null">
            <span
              class="text-[28px] font-semibold text-[#195279] dark:text-[#FAFAFA]"
            >
              {{ nilaiTampil(item.data) }}
            </span>
            <span class="text-[13px] text-[#6F6F6F] dark:text-[#AAAAAA]">
              {{ item.data.unit }}
            </span>
          </template>
          <span v-else class="text-[16px] text-[#8E98A8]">
            {{ t("scanSdk.unavailable") }}
          </span>
        </div>

        <span v-if="item.data?.source" class="text-[11px] text-[#8E98A8]">
          {{ t("scanSdk.sourceLabel") }}: {{ labelSumber(item.data.source) }}
        </span>
        <span v-if="item.data?.availability" class="text-[11px] text-[#8E98A8]">
          {{ t("scanSdk.availabilityLabel") }}: {{ item.data.availability }}
        </span>
      </div>
    </div>

    <button
      type="button"
      class="w-full h-12 rounded-xl border border-[#DEDEDE] dark:border-[#3A3B3D] font-medium"
      @click="$emit('rescan')"
    >
      {{ t("scanSdk.rescan") }}
    </button>
  </div>
</template>
