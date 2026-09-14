<script setup>
import { ref, reactive, computed, nextTick } from "vue";
import { useI18n } from "vue-i18n";
import { validateProfile } from "@seleris/rppg-vue";

import SdkSelect from "@/components/FaceScan/SdkSelect.vue";
import SdkFieldError from "@/components/FaceScan/SdkFieldError.vue";

const { t } = useI18n();
const emit = defineEmits(["submit"]);

// Semua mulai KOSONG. null berarti "belum dijawab" — berbeda dari false.
const form = reactive({
  age: "",
  sex: null,
  heightCm: "",
  weightKg: "",
  lifestyle: { smoking: null, alcohol: null, motorcycle: null },
});

// Persetujuan kamera. Ini BUKAN bagian dari 7 field SDK dan tidak dikirim
// di dalam profil — dokumen menyebutnya sebagai elemen alur UI milik host.
const setuju = ref(false);

const galat = reactive({});
const sudahDisubmit = ref(false);

const keAngka = (teks) => {
  if (typeof teks !== "string") teks = String(teks ?? "");
  const bersih = teks.trim().replace(",", "."); // "68,5" -> "68.5"
  if (bersih === "") return null; // jangan biarkan jadi 0
  const angka = Number(bersih);
  return Number.isFinite(angka) ? angka : null;
};

const bentukProfil = () => ({
  age: keAngka(form.age),
  sex: form.sex,
  heightCm: keAngka(form.heightCm),
  weightKg: keAngka(form.weightKg),
  lifestyle: {
    smoking: form.lifestyle.smoking,
    alcohol: form.lifestyle.alcohol,
    motorcycle: form.lifestyle.motorcycle,
  },
});

const periksaTampilan = () => {
  Object.keys(galat).forEach((k) => delete galat[k]);

  const usia = keAngka(form.age);
  if (usia === null || !Number.isInteger(usia) || usia < 17 || usia > 100)
    galat.age = t("scanSdk.errAge");

  if (form.sex !== "Male" && form.sex !== "Female")
    galat.sex = t("scanSdk.errSex");

  const tinggi = keAngka(form.heightCm);
  if (tinggi === null || tinggi < 100 || tinggi > 250)
    galat.heightCm = t("scanSdk.errHeight");

  const berat = keAngka(form.weightKg);
  if (berat === null || berat < 20 || berat > 400)
    galat.weightKg = t("scanSdk.errWeight");

  // Perhatikan: dibandingkan dengan null, BUKAN `if (!nilai)`.
  // Kalau memakai `!nilai`, jawaban "Tidak" (false) ikut dianggap kosong.
  if (form.lifestyle.smoking === null) galat.smoking = t("scanSdk.errSmoking");
  if (form.lifestyle.alcohol === null) galat.alcohol = t("scanSdk.errAlcohol");
  if (form.lifestyle.motorcycle === null)
    galat.motorcycle = t("scanSdk.errMotorcycle");

  if (!setuju.value) galat.consent = t("scanSdk.errConsent");

  return Object.keys(galat).length === 0;
};

const adaGalat = computed(() => Object.keys(galat).length > 0);

const fokuskanGalatPertama = async () => {
  await nextTick();
  const el = document.querySelector("[data-galat='true']");
  el?.focus?.();
  el?.scrollIntoView?.({ block: "center" });
};

const kirim = async () => {
  sudahDisubmit.value = true;

  if (!periksaTampilan()) {
    await fokuskanGalatPertama();
    return;
  }

  // Validator resmi SDK. Dokumen mewajibkan ini dijalankan sebelum scanner
  // dipasang; hasil [] berarti profilnya sah.
  const profil = bentukProfil();
  const masalah = validateProfile(profil);
  if (masalah.length) {
    // Pesan dari SDK dipetakan ke kolomnya masing-masing supaya tetap
    // muncul di tempat yang tepat, bukan sebagai satu pesan umum.
    masalah.forEach((m) => {
      const kunci = String(m.field).split(".").pop();
      galat[kunci] = m.message;
    });
    await fokuskanGalatPertama();
    return;
  }

  emit("submit", profil);
};

// Dipakai untuk menandai input bermasalah tanpa menulis ulang logikanya.
const tandaGalat = (kunci) =>
  sudahDisubmit.value && galat[kunci] ? "true" : null;

const salah = (kunci) => sudahDisubmit.value && !!galat[kunci];

const pesanGalat = (kunci) => (sudahDisubmit.value && galat[kunci]) || "";

const KELAS_KOLOM =
  "w-full h-12 pl-4 pr-14 rounded-xl border bg-white dark:bg-[#27272A] text-[15px] text-black dark:text-white outline-none transition-colors duration-200 placeholder:text-[#9CA3AF] dark:placeholder:text-[#71717A] focus-visible:ring-2 focus-visible:ring-[#2E97DF]/50";
const TEPI_BIASA =
  "border-[#D1D5DB] dark:border-[#3F3F46] hover:border-[#2E97DF]/60 focus:border-[#2E97DF]";
const TEPI_SALAH = "border-red-400 dark:border-red-500/70";

const kolomDasar = computed(() => [
  {
    kunci: "age",
    jenis: "angka",
    label: t("scanSdk.age"),
    satuan: t("scanSdk.ageUnit"),
    contoh: t("scanSdk.agePlaceholder"),
    langkah: "1", // usia selalu bilangan bulat
    modeKetik: "numeric",
  },
  {
    kunci: "sex",
    jenis: "pilihan",
    label: t("scanSdk.sex"),
  },
  {
    kunci: "heightCm",
    jenis: "angka",
    label: t("scanSdk.height"),
    satuan: t("scanSdk.heightUnit"),
    contoh: t("scanSdk.heightPlaceholder"),
    langkah: "0.1", // tinggi & berat boleh pecahan
    modeKetik: "decimal",
  },
  {
    kunci: "weightKg",
    jenis: "angka",
    label: t("scanSdk.weight"),
    satuan: t("scanSdk.weightUnit"),
    contoh: t("scanSdk.weightPlaceholder"),
    langkah: "0.1",
    modeKetik: "decimal",
  },
]);

const pertanyaanGayaHidup = computed(() => [
  { kunci: "smoking", label: t("scanSdk.smoking") },
  { kunci: "alcohol", label: t("scanSdk.alcohol") },
  { kunci: "motorcycle", label: t("scanSdk.motorcycle") },
]);
</script>

<template>
  <form class="w-full flex flex-col gap-7" @submit.prevent="kirim">
    <header class="flex flex-col gap-3">
      <div class="flex items-center gap-3">
        <span
          class="w-10 h-10 shrink-0 rounded-xl bg-[#2E97DF]/10 text-[#2E97DF] flex items-center justify-center"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="w-5 h-5"
          >
            <path d="M3 8V5a2 2 0 0 1 2-2h3" />
            <path d="M16 3h3a2 2 0 0 1 2 2v3" />
            <path d="M21 16v3a2 2 0 0 1-2 2h-3" />
            <path d="M8 21H5a2 2 0 0 1-2-2v-3" />
            <path d="M9 10h.01M15 10h.01M9 15c.8.7 1.9 1 3 1s2.2-.3 3-1" />
          </svg>
        </span>

        <h2
          class="text-[22px] md:text-[26px] font-semibold text-[#195279] dark:text-white leading-tight"
        >
          {{ t("scanSdk.title") }}
        </h2>
      </div>

      <p class="text-[14px] leading-relaxed text-[#6B7280] dark:text-[#A1A1AA]">
        {{ t("scanSdk.intro") }}
      </p>

      <span
        class="w-fit px-2.5 py-1 rounded-full bg-[#F3F4F6] dark:bg-[#27272A] text-[12px] text-[#6B7280] dark:text-[#A1A1AA]"
      >
        {{ t("scanSdk.allRequired") }}
      </span>
    </header>

    <fieldset class="flex flex-col gap-4">
      <legend class="flex items-center gap-2 mb-1">
        <span
          class="w-7 h-7 rounded-lg bg-[#2E97DF]/10 text-[#2E97DF] flex items-center justify-center"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="w-4 h-4"
          >
            <circle cx="12" cy="8" r="4" />
            <path d="M20 21v-1a6 6 0 0 0-6-6h-4a6 6 0 0 0-6 6v1" />
          </svg>
        </span>
        <span class="text-[15px] font-semibold text-[#374151] dark:text-white">
          {{ t("scanSdk.groupBasic") }}
        </span>
      </legend>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div
          v-for="kolom in kolomDasar"
          :key="kolom.kunci"
          class="flex flex-col gap-2"
        >
          <label
            :for="`sdk-${kolom.kunci}`"
            class="text-[14px] font-medium text-[#374151] dark:text-white"
          >
            {{ kolom.label }}
          </label>

          <SdkSelect
            v-if="kolom.jenis === 'pilihan'"
            :id="`sdk-${kolom.kunci}`"
            v-model="form.sex"
            :options="[
              { value: 'Male', label: t('scanSdk.male') },
              { value: 'Female', label: t('scanSdk.female') },
            ]"
            :placeholder="t('scanSdk.sexPlaceholder')"
            :invalid="salah('sex')"
          />

          <span v-else class="relative block">
            <input
              :id="`sdk-${kolom.kunci}`"
              v-model="form[kolom.kunci]"
              type="number"
              :step="kolom.langkah"
              :inputmode="kolom.modeKetik"
              :placeholder="kolom.contoh"
              :data-galat="tandaGalat(kolom.kunci)"
              :aria-invalid="salah(kolom.kunci)"
              :class="[
                KELAS_KOLOM,
                salah(kolom.kunci) ? TEPI_SALAH : TEPI_BIASA,
              ]"
            />
            <span
              class="absolute right-4 top-1/2 -translate-y-1/2 text-[13px] text-[#9CA3AF] pointer-events-none"
            >
              {{ kolom.satuan }}
            </span>
          </span>

          <SdkFieldError :pesan="pesanGalat(kolom.kunci)" />
        </div>
      </div>
    </fieldset>

    <fieldset class="flex flex-col gap-5">
      <legend class="flex items-center gap-2 mb-1">
        <span
          class="w-7 h-7 rounded-lg bg-[#2AB857]/10 text-[#2AB857] flex items-center justify-center"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="w-4 h-4"
          >
            <path d="M22 12h-4l-3 8L9 4l-3 8H2" />
          </svg>
        </span>
        <span class="text-[15px] font-semibold text-[#374151] dark:text-white">
          {{ t("scanSdk.groupLifestyle") }}
        </span>
      </legend>

      <fieldset
        v-for="tanya in pertanyaanGayaHidup"
        :key="tanya.kunci"
        class="flex flex-col gap-2.5"
      >
        <legend class="text-[14px] font-medium text-[#374151] dark:text-white">
          {{ tanya.label }}
        </legend>

        <div class="grid grid-cols-2 gap-3">
          <label
            v-for="pilihan in [
              { nilai: true, teks: t('scanSdk.yes') },
              { nilai: false, teks: t('scanSdk.no') },
            ]"
            :key="String(pilihan.nilai)"
            class="relative block cursor-pointer"
          >
            <input
              v-model="form.lifestyle[tanya.kunci]"
              type="radio"
              :name="tanya.kunci"
              :value="pilihan.nilai"
              :data-galat="tandaGalat(tanya.kunci)"
              class="peer sr-only"
            />

            <span
              class="flex items-center justify-center gap-2.5 h-12 rounded-xl border transition-all duration-200 peer-focus-visible:ring-2 peer-focus-visible:ring-[#2E97DF]/50"
              :class="
                form.lifestyle[tanya.kunci] === pilihan.nilai
                  ? 'border-[#2E97DF] bg-[#2E97DF]/10 text-[#195279] dark:text-white font-medium'
                  : 'border-[#D1D5DB] dark:border-[#3F3F46] text-[#374151] dark:text-[#D4D4D4] hover:border-[#2E97DF]/60'
              "
            >
              <span
                class="w-[18px] h-[18px] shrink-0 rounded-full border-2 flex items-center justify-center transition-colors duration-200"
                :class="
                  form.lifestyle[tanya.kunci] === pilihan.nilai
                    ? 'border-[#2E97DF]'
                    : 'border-[#D1D5DB] dark:border-[#52525B]'
                "
              >
                <span
                  v-if="form.lifestyle[tanya.kunci] === pilihan.nilai"
                  class="w-2 h-2 rounded-full bg-[#2E97DF]"
                ></span>
              </span>
              <span class="text-[15px]">{{ pilihan.teks }}</span>
            </span>
          </label>
        </div>

        <SdkFieldError :pesan="pesanGalat(tanya.kunci)" />
      </fieldset>
    </fieldset>

    <div class="flex flex-col gap-2">
      <label
        class="relative flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-colors duration-200"
        :class="
          setuju
            ? 'border-[#2E97DF] bg-[#2E97DF]/5'
            : 'border-[#D1D5DB] dark:border-[#3F3F46] hover:border-[#2E97DF]/60'
        "
      >
        <input
          v-model="setuju"
          type="checkbox"
          :data-galat="tandaGalat('consent')"
          class="peer sr-only"
        />
        <span
          class="mt-0.5 w-5 h-5 shrink-0 rounded-md border-2 flex items-center justify-center transition-colors duration-200 peer-focus-visible:ring-2 peer-focus-visible:ring-[#2E97DF]/50"
          :class="
            setuju
              ? 'bg-[#2E97DF] border-[#2E97DF]'
              : 'border-[#D1D5DB] dark:border-[#52525B]'
          "
        >
          <svg
            v-if="setuju"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="w-3 h-3 text-white"
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </span>
        <span
          class="text-[13px] leading-relaxed text-[#6B7280] dark:text-[#A1A1AA]"
        >
          {{ t("scanSdk.consent") }}
        </span>
      </label>

      <SdkFieldError :pesan="pesanGalat('consent')" />
    </div>

    <div class="flex flex-col gap-3">
      <button
        type="submit"
        class="group w-full h-12 rounded-xl bg-gradient-to-r from-[#1E6493] to-[#2E97DF] text-white font-medium flex items-center justify-center gap-2 shadow-lg shadow-[#2E97DF]/20 transition-all duration-300 hover:scale-[1.02] active:scale-[0.99]"
      >
        {{ t("scanSdk.continue") }}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
        >
          <path d="M5 12h14M13 5l7 7-7 7" />
        </svg>
      </button>

      <p
        v-if="sudahDisubmit && adaGalat"
        class="text-[13px] text-center text-red-600 dark:text-red-400"
      >
        {{ t("scanSdk.allRequired") }}
      </p>
    </div>
  </form>
</template>

<style scoped>
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type="number"] {
  -moz-appearance: textfield;
  appearance: textfield;
}
</style>
