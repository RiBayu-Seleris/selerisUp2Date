<script setup>
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

import SdkScanner from "@/components/FaceScan/SdkScanner.vue";
import SdkResult from "@/components/FaceScan/SdkResult.vue";
import CardIconLeft from "@/components/reusable/CardIconLeft.vue";
import ArrowLeft from "@/components/icons/ArrowLeft.vue";

import Logo from "@/assets/images/logo.png";
import playstore from "@/assets/images/playstore.png";
import appstore from "@/assets/images/appstore.png";

import Sun from "@/assets/icons/facetracker/sun.svg";
import Contact from "@/assets/icons/facetracker/contact.svg";
import Timer from "@/assets/icons/facetracker/timer.svg";
import HeartRate from "@/assets/icons/facetracker/heart-rate.svg";
import Heart from "@/assets/icons/facetracker/heart.svg";
import StressLevel from "@/assets/icons/facetracker/stress-level.svg";
import Blood from "@/assets/icons/facetracker/blood.svg";
import BMI from "@/assets/icons/facetracker/body-mass.svg";

const { t } = useI18n();
const router = useRouter();

const KUNCI_PROFIL = "seleris:scan-profile";

const bacaProfil = () => {
  try {
    const mentah = sessionStorage.getItem(KUNCI_PROFIL);
    return mentah ? JSON.parse(mentah) : null;
  } catch {
    // Penyimpanan diblokir atau isinya rusak — perlakukan sebagai tidak ada.
    return null;
  }
};

const profil = ref(bacaProfil());
const hasil = ref(null);
const scannerRef = ref(null);

const keHasil = (hasilScan) => {
  hasil.value = hasilScan;
};

const scanUlang = () => {
  hasil.value = null;
  scannerRef.value?.ulangiScan();
};

const keBeranda = () => router.push("/");

// Ikon saja; judul dan keterangannya dari berkas bahasa (scanSdk.sideRules).
const ikonAturan = [Sun, Contact, Timer];

// Lima keluaran resmi SDK. Label memakai kunci hasil yang sudah ada.
const indikator = [
  { icon: HeartRate, kunci: "heartRate" },
  { icon: Heart, kunci: "breathingRate" },
  { icon: Blood, kunci: "hrv" },
  { icon: BMI, kunci: "systolic" },
  { icon: StressLevel, kunci: "diastolic" },
];

const sertifikat = [
  "Cert1.png",
  "Cert2.png",
  "Cert5.png",
  "Cert3.png",
  "Cert4.png",
  "dscui.svg",
];
</script>

<template>
  <div
    class="w-full min-h-[100dvh] lg:h-[100dvh] lg:overflow-hidden p-3 sm:p-4 lg:p-5 bg-[#F1F4F5] dark:bg-[#17181A] dark:text-[#FAFAFA]"
  >
    <div class="w-full max-w-[1440px] h-full mx-auto flex flex-col">
      <div
        class="w-full flex-1 min-h-0 grid gap-3 sm:gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_minmax(500px,600px)_1fr]"
      >
        <aside
          data-lenis-prevent
          class="order-2 lg:order-1 flex flex-col gap-y-4 lg:overflow-y-auto hide-scrollbar"
        >
          <button
            type="button"
            class="w-full flex flex-row gap-x-4 justify-start items-center bg-white dark:bg-[#232427] rounded-full text-[#000000] dark:text-[#FAFAFA] border border-[#E5E7EB] dark:border-[#3A3B3D]"
            @click="keBeranda"
          >
            <span
              class="w-10 h-10 shrink-0 flex justify-center items-center bg-[#F7F7F7] dark:bg-[#2F3033] rounded-full p-1.5 border border-[#E5E7EB] dark:border-[#3A3B3D] [&_svg]:w-full [&_svg]:h-full"
            >
              <ArrowLeft />
            </span>
            <span class="text-[16px] font-[400]">{{
              t("scanSdk.backSite")
            }}</span>
          </button>

          <div
            class="w-full flex flex-col gap-y-5 sm:gap-y-6 px-4 py-5 sm:py-6 bg-white dark:bg-[#232427] rounded-lg"
          >
            <CardIconLeft
              v-for="(ikon, index) in ikonAturan"
              :key="index"
              :icon="ikon"
              :title="t(`scanSdk.sideRules.${index}.title`)"
              :description="t(`scanSdk.sideRules.${index}.description`)"
            />
          </div>

          <div class="w-full p-4 sm:p-6 bg-white dark:bg-[#232427] rounded-lg">
            <p class="text-[#5A6062] dark:text-[#AAAAAA] text-[16px]">
              <span class="font-[600]">{{ t("scanSdk.proTipLabel") }}</span>
              {{ t("scanSdk.proTip") }}
            </p>
          </div>

          <div
            class="w-full flex flex-col gap-y-4 items-center bg-white dark:bg-[#232427] rounded-xl px-4 sm:px-6 py-4"
          >
            <p class="text-[17px] sm:text-[20px] text-center">
              {{ t("scanSdk.certificates") }}
            </p>
            <div class="flex flex-wrap justify-center gap-5">
              <div
                v-for="berkas in sertifikat"
                :key="berkas"
                class="w-[60px] h-[60px] flex justify-center items-center"
              >
                <img
                  :src="`/assets/images/certificate-icon/${berkas}`"
                  alt=""
                  class="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
        </aside>

        <section
          data-lenis-prevent
          class="order-1 md:col-span-2 lg:col-span-1 lg:order-2 min-w-0 flex flex-col lg:overflow-y-auto hide-scrollbar"
        >
          <div
            v-if="!profil"
            class="w-full max-w-md mx-auto flex flex-col items-center gap-4 text-center py-16"
          >
            <p class="text-[15px] text-[#6F6F6F] dark:text-[#AAAAAA]">
              {{ t("scanSdk.needProfile") }}
            </p>
            <button
              type="button"
              class="h-12 px-6 rounded-xl bg-gradient-to-tr from-[#1E6493] to-[#2E97DF] text-white font-medium"
              @click="keBeranda"
            >
              {{ t("scanSdk.backHome") }}
            </button>
          </div>

          <div v-else class="flex flex-col gap-10">
            <SdkScanner ref="scannerRef" :profile="profil" @result="keHasil" />
            <SdkResult v-if="hasil" :result="hasil" @rescan="scanUlang" />
          </div>
        </section>

        <aside
          data-lenis-prevent
          class="order-3 flex flex-col gap-y-4 lg:overflow-y-auto hide-scrollbar"
        >
          <div
            class="w-full flex flex-col gap-y-2 bg-white dark:bg-[#232427] rounded-lg border border-[#E5E7EB] dark:border-[#3A3B3D] p-4"
          >
            <p
              class="text-[16px] sm:text-[18px] text-[#195279] dark:text-[#FAFAFA] font-[600]"
            >
              {{ t("scanSdk.metricsTitle") }}
            </p>
            <p class="text-[14px] text-[#5A6062] dark:text-[#AAAAAA]">
              {{ t("scanSdk.metricsDesc") }}
            </p>
          </div>

          <div class="w-full grid grid-cols-2 max-smallest:grid-cols-1 gap-3 sm:gap-4">
            <div
              v-for="item in indikator"
              :key="item.kunci"
              class="w-full flex flex-col gap-y-1 items-start bg-white dark:bg-[#232427] p-4 sm:p-6 rounded-lg"
            >
              <span class="w-8 h-8 flex justify-center items-center p-1">
                <img
                  :src="item.icon"
                  alt=""
                  class="w-full h-full object-contain"
                />
              </span>
              <p>{{ t(`scanSdk.${item.kunci}`) }}</p>
            </div>
          </div>

          <div
            class="w-full flex flex-col gap-y-5 items-center p-5 sm:p-8 bg-white dark:bg-[#232427] rounded-lg"
          >
            <p class="text-[#A7A7A7]">{{ t("scanSdk.getApps") }}</p>
            <div class="flex flex-row gap-5 w-full max-w-[320px]">
              <a
                href="https://play.google.com/store/apps/developer?id=PT.+Seleris+Meditekno+Internasional"
                target="_blank"
                rel="noopener noreferrer"
                class="flex w-1/2 justify-center items-center"
              >
                <img
                  :src="playstore"
                  alt="Playstore"
                  class="w-full h-full object-contain object-center"
                />
              </a>
              <div class="relative group w-1/2">
                <img
                  :src="appstore"
                  alt="Appstore"
                  class="w-full h-full object-contain object-center"
                />
                <div
                  class="absolute inset-0 flex items-center justify-center bg-[#FDFDFD]/60 text-[#195279] opacity-0 group-hover:opacity-100 transition duration-300 cursor-pointer"
                >
                  <span>{{ t("scanSdk.comingSoon") }}</span>
                </div>
              </div>
            </div>
            <div class="w-full flex justify-center items-center gap-x-4">
              <p class="text-[#A9A9A9] font-[500] text-[18px]">
                {{ t("scanSdk.poweredBy") }}
              </p>
              <img
                :src="Logo"
                alt="Seleris"
                class="h-[40px] w-auto object-contain"
              />
            </div>
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>
