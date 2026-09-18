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

// Dokumen INTEGRATION.md mewajibkan `source` tetap tampil dan MELARANG
// fallback formula disamarkan seolah diukur langsung, jadi keempatnya dibedakan
// dengan jelas. Sebelumnya hanya dua yang dipetakan, sehingga dua nilai yang
// paling sering muncul bocor ke layar sebagai kode mentah.
const SUMBER = {
  camera_measured: "scanSdk.sourceMeasured",
  camera_derived: "scanSdk.sourceDerived",
  camera_experimental: "scanSdk.sourceExperimental",
  formula_estimate: "scanSdk.sourceFormula",
};

const labelSumber = (kode) => (SUMBER[kode] ? t(SUMBER[kode]) : kode || "");

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
  <div class="w-full max-w-2xl mx-auto flex flex-col gap-6">
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
        class="rounded-2xl border border-[#DEDEDE] dark:border-[#3A3B3D] bg-white dark:bg-[#1D1F23] px-4 py-3 sm:px-5 sm:py-4 flex flex-col gap-0.5 sm:gap-1"
      >
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

        <span
          v-if="item.data?.source"
          class="text-[11px] leading-snug text-[#8E98A8]"
        >
          {{ labelSumber(item.data.source) }}
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
