<script setup>
import { computed } from "vue";
import { useI18n } from "vue-i18n";

import HeartRate from "@/assets/icons/facetracker/heart-rate.svg";
import Heart from "@/assets/icons/facetracker/heart.svg";
import Blood from "@/assets/icons/facetracker/blood.svg";
import BMI from "@/assets/icons/facetracker/body-mass.svg";
import StressLevel from "@/assets/icons/facetracker/stress-level.svg";

const props = defineProps({
  result: { type: Object, required: true },
});
defineEmits(["rescan"]);

const { t } = useI18n();

// Lima metric, dalam urutan yang ditetapkan dokumen.
const daftar = computed(() => {
  const m = props.result?.metrics || {};
  return [
    {
      kunci: "heartRate",
      label: t("scanSdk.heartRate"),
      ikon: HeartRate,
      data: m.heartRate,
    },
    {
      kunci: "breathingRate",
      label: t("scanSdk.breathingRate"),
      ikon: Heart,
      data: m.breathingRate,
    },
    { kunci: "hrv", label: t("scanSdk.hrv"), ikon: Blood, data: m.hrv },
    {
      kunci: "systolic",
      label: t("scanSdk.systolic"),
      ikon: BMI,
      data: m.systolic,
    },
    {
      kunci: "diastolic",
      label: t("scanSdk.diastolic"),
      ikon: StressLevel,
      data: m.diastolic,
    },
  ];
});

// SDK mengunci satuannya sebagai teks tetap, dan "napas/menit" berbahasa
// Indonesia apa pun `language` yang diminta. Hanya yang itu perlu dialihkan.
const labelSatuan = (satuan) =>
  satuan === "napas/menit" ? t("scanSdk.unitBreaths") : satuan;

const nilaiTampil = (data) =>
  data && data.value !== null && data.value !== undefined
    ? String(Math.round(Number(data.value)))
    : null;
</script>

<template>
  <div class="w-full mx-auto flex flex-col gap-6">
    <h2
      data-aos="fade-up"
      class="text-[22px] md:text-[26px] font-semibold text-[#195279] dark:text-[#FAFAFA] text-center"
    >
      {{ t("scanSdk.resultTitle") }}
    </h2>

    <div class="grid grid-cols-2 gap-3 sm:gap-4">
      <div
        v-for="(item, index) in daftar"
        :key="item.kunci"
        data-aos="fade-up"
        :data-aos-delay="80 + index * 70"
        class="rounded-2xl border border-[#DEDEDE] dark:border-[#3A3B3D] bg-white dark:bg-[#1D1F23] px-4 py-3 sm:px-5 sm:py-4 flex flex-row items-center justify-between gap-2 sm:gap-3"
      >
        <div class="min-w-0 flex flex-col gap-0.5 sm:gap-1">
          <span class="text-[12px] sm:text-[13px] text-[#8E98A8]">{{
            item.label
          }}</span>

          <div class="flex items-baseline gap-1.5">
            <template v-if="nilaiTampil(item.data) !== null">
              <span
                class="text-[26px] sm:text-[28px] font-semibold leading-none text-[#195279] dark:text-[#FAFAFA]"
              >
                {{ nilaiTampil(item.data) }}
              </span>
              <span
                class="text-[12px] sm:text-[13px] text-[#6F6F6F] dark:text-[#AAAAAA]"
              >
                {{ labelSatuan(item.data.unit) }}
              </span>
            </template>
            <span v-else class="text-[16px] text-[#8E98A8]">
              {{ t("scanSdk.unavailable") }}
            </span>
          </div>
        </div>

        <img
          :src="item.ikon"
          alt=""
          aria-hidden="true"
          class="w-7 h-7 sm:w-9 sm:h-9 shrink-0 object-contain"
        />
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
