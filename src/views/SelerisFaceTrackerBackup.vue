<script setup>
import ArrowLeft from "@/components/icons/ArrowLeft.vue";
import CardIconLeft from "@/components/reusable/CardIconLeft.vue";
import TrustedImage from "@/assets/images/facetracker/trusted-list.svg";
import Sun from "@/assets/icons/facetracker/sun.svg";
import Contact from "@/assets/icons/facetracker/contact.svg";
import Timer from "@/assets/icons/facetracker/timer.svg";

import playstore from "@/assets/images/playstore.png";
import appstore from "@/assets/images/appstore.png";
import Logo from "@/assets/images/logo.png";

import HeartRate from "@/assets/icons/facetracker/heart-rate.svg";
import StressLevel from "@/assets/icons/facetracker/stress-level.svg";
import Blood from "@/assets/icons/facetracker/blood.svg";
import BMI from "@/assets/icons/facetracker/body-mass.svg";
import GenCell from "@/assets/icons/facetracker/gen-cell.svg";
import Heart from "@/assets/icons/facetracker/heart.svg";
import Lens from "@/assets/icons/facetracker/lens.svg";

import FaceTracker from "@/components/FaceScan/index.vue";
import Result from "@/components/FaceScan/Result.vue";
import { ref, computed } from "vue";

const currentView = ref("scan");
const scanResult = ref(null);
const uploadProgress = ref(0);
const uploadStep = ref("Mengirim ke server...");

// ─── Retry state ──────────────────────────────────────────────────────────────
const retryAttempt = ref(0);
const retryDelaySec = ref(0);
const isRetrying = ref(false);
let retryCountdownId = null;
const retryCountdown = ref(0); // countdown detik yang tersisa

const uploadSteps = [
  "Mengirim ke server...",
  "Mengekstrak rPPG signal...",
  "Menghitung detak jantung...",
  "Menganalisis HRV...",
  "Memproses hasil akhir...",
];

// Teks yang tampil di bawah spinner — prioritas retry info
const displayStep = computed(() => {
  if (isRetrying.value) {
    return `Mencoba ulang ke-${retryAttempt.value} dalam ${retryCountdown.value}s...`;
  }
  return uploadStep.value;
});

// Warna teks step — kuning saat retry
const displayStepColor = computed(() => {
  return isRetrying.value
    ? "rgba(250, 204, 21, 0.8)" // yellow-400
    : "rgba(74, 222, 128, 0.65)"; // green
});

let stepInterval = null;
let progressRaf = null;

function onScanComplete() {
  currentView.value = "uploading";
  uploadProgress.value = 0;
  retryAttempt.value = 0;
  isRetrying.value = false;

  let si = 0;
  stepInterval = setInterval(() => {
    if (isRetrying.value) return; // jangan ganti teks saat retry
    si = (si + 1) % uploadSteps.length;
    uploadStep.value = uploadSteps[si];
  }, 1300);

  // Progress simulasi berhenti di 94%, sisanya tunggu API
  let p = 0;
  const tick = () => {
    if (p >= 94) return;
    p += p < 40 ? 0.7 : p < 72 ? 0.4 : 0.18;
    uploadProgress.value = p;
    progressRaf = requestAnimationFrame(tick);
  };
  tick();
}

function onUploadRetry({ attempt, delayMs }) {
  isRetrying.value = true;
  retryAttempt.value = attempt;
  retryDelaySec.value = Math.round(delayMs / 1000);
  retryCountdown.value = retryDelaySec.value;

  // ← Turunkan progress sedikit supaya tidak terlihat frozen
  uploadProgress.value = Math.max(60, uploadProgress.value - 15);

  clearInterval(retryCountdownId);
  retryCountdownId = setInterval(() => {
    retryCountdown.value--;
    if (retryCountdown.value <= 0) {
      clearInterval(retryCountdownId);
      isRetrying.value = false;
      uploadStep.value = "Mengirim ulang ke server...";
      // Naik lagi ke 94% saat mulai retry berikutnya
      uploadProgress.value = 94;
    }
  }, 1000);
}

function onUploadDone(result) {
  clearInterval(stepInterval);
  clearInterval(retryCountdownId);
  cancelAnimationFrame(progressRaf);
  isRetrying.value = false;
  retryAttempt.value = 0;
  uploadProgress.value = 100;
  scanResult.value = result;
  setTimeout(() => {
    currentView.value = "result";
  }, 400);
}

const rules = [
  {
    icon: Sun,
    title: "Check Lighting",
    description:
      "Ensure your face is well-lit from the front. Avoid harsh backlighting or deep shadows.",
  },
  {
    icon: Contact,
    title: "Stay Centered",
    description:
      "Position your face within the red markers. Keep a neutral expression and remain still.",
  },
  {
    icon: Timer,
    title: "30 Seconds",
    description:
      "The scan takes approximately 30 seconds via rPPG technology. Please do not move or speak during the process",
  },
];

const indicators = [
  { icon: HeartRate, title: "Heart Rate" },
  { icon: StressLevel, title: "Stress Level" },
  { icon: Blood, title: "Blood Pressure" },
  { icon: BMI, title: "Body Mass Index" },
  { icon: GenCell, title: "Blood Glucose" },
  { icon: Heart, title: "Heart Health" },
];
</script>

<template>
  <div class="w-full h-screen p-5">
    <div
      class="w-full h-full flex flex-row justify-between items-center gap-x-4"
    >
      <!-- LEFT CONTENT -->
      <div class="w-full h-full flex flex-col justify-between">
        <div
          class="w-full h-auto flex flex-row gap-x-4 justify-start items-center bg-[#FFFFFF] rounded-full text-[#000000] border-[1px]"
        >
          <div
            class="w-10 h-10 flex justify-center items-center bg-[#F7F7F7] rounded-full p-1.5 border-[1px]"
          >
            <ArrowLeft />
          </div>
          <div class="w-full h-full flex items-center">
            <p class="text-[16px] font-[400]">Back to Site</p>
          </div>
        </div>
        <div
          class="w-full h-auto flex flex-col gap-y-6 justify-start items-center px-4 py-6 bg-[#FFFFFF] rounded-lg"
        >
          <div v-for="(rule, index) in rules" :key="index">
            <CardIconLeft
              :icon="rule.icon"
              :title="rule.title"
              :description="rule.description"
            />
          </div>
        </div>
        <div
          class="w-full h-auto flex justify-center items-center p-6 bg-[#FFFFFF] rounded-lg"
        >
          <p class="text-[#5A6062] text-[16px]">
            <span class="font-[600]">Professional Tip:</span> Taking three slow,
            measured breaths before initialization significantly improves HRV
            variability accuracy.
          </p>
        </div>
        <div class="w-full h-auto flex justify-start items-center">
          <div
            class="w-full h-auto flex flex-col gap-y-8 justify-center items-center bg-[#FFFFFF] rounded-lg p-6"
          >
            <div class="w-full h-auto flex justify-center items-center">
              <p>Trust By</p>
            </div>
            <div class="w-full h-auto flex justify-center items-center">
              <div class="flex-1 flex justify-center items-center">
                <img :src="TrustedImage" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- CENTER CONTENT -->
      <div
        class="w-[35%] h-full shrink-0 relative overflow-hidden flex justify-center items-start"
      >
        <Transition name="view-fade">
          <FaceTracker
            v-if="currentView === 'scan'"
            class="w-full h-full"
            @scan-complete="onScanComplete"
            @upload-done="onUploadDone"
            @upload-retry="onUploadRetry"
          />
        </Transition>

        <!-- UPLOADING STATE -->
        <Transition name="view-fade">
          <div
            v-if="currentView === 'uploading'"
            class="absolute inset-0 flex flex-col items-center justify-center bg-[#060a0f] rounded-t-2xl rounded-b-xl overflow-hidden"
          >
            <!-- Dot bg -->
            <div
              class="absolute inset-0 pointer-events-none"
              style="
                background-image: radial-gradient(
                  circle,
                  rgba(74, 222, 128, 0.07) 1px,
                  transparent 1px
                );
                background-size: 24px 24px;
              "
            />
            <div
              class="absolute inset-0 pointer-events-none"
              style="
                background: radial-gradient(
                  circle at center,
                  transparent 35%,
                  #060a0f 80%
                );
              "
            />

            <div class="relative z-10 flex flex-col items-center px-10 w-full">
              <!-- Spinner — kuning saat retry -->
              <div class="relative w-16 h-16 mb-7">
                <div
                  class="absolute inset-0 rounded-full animate-spin transition-colors duration-500"
                  :style="{
                    border: '1.5px solid transparent',
                    borderTopColor: isRetrying
                      ? 'rgba(250,204,21,0.85)'
                      : 'rgba(74,222,128,0.85)',
                    animationDuration: '1.1s',
                  }"
                />
                <div
                  class="absolute inset-[10px] rounded-full transition-colors duration-500"
                  :style="{
                    border: '1px solid transparent',
                    borderBottomColor: isRetrying
                      ? 'rgba(250,204,21,0.5)'
                      : 'rgba(74,222,128,0.5)',
                    animation: 'spin 1.8s linear infinite reverse',
                  }"
                />
                <div
                  class="absolute inset-[22px] rounded-full flex items-center justify-center transition-colors duration-500"
                  :style="{
                    background: isRetrying
                      ? 'rgba(250,204,21,0.06)'
                      : 'rgba(74,222,128,0.06)',
                    border: `1px solid ${isRetrying ? 'rgba(250,204,21,0.2)' : 'rgba(74,222,128,0.15)'}`,
                  }"
                >
                  <!-- Icon refresh saat retry, checkmark saat normal -->
                  <svg
                    v-if="isRetrying"
                    class="w-3.5 h-3.5"
                    fill="none"
                    stroke="rgba(250,204,21,0.7)"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  <svg
                    v-else
                    class="w-3.5 h-3.5"
                    fill="none"
                    stroke="rgba(74,222,128,0.7)"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                </div>
              </div>

              <p
                class="text-white/85 text-[15px] font-medium tracking-[0.01em] mb-1.5 font-mono"
              >
                {{
                  isRetrying ? "Menghubungkan ulang..." : "Memproses hasil scan"
                }}
              </p>

              <!-- Step / retry info -->
              <p
                class="text-[10px] uppercase tracking-[0.14em] mb-8 font-mono transition-colors duration-300"
                :style="{ color: displayStepColor }"
              >
                {{ displayStep }}
              </p>

              <!-- Dot wave -->
              <div class="flex gap-1.5 mb-8">
                <span
                  v-for="i in 5"
                  :key="i"
                  class="w-1 h-1 rounded-full dot-wave"
                  :class="isRetrying ? 'dot-wave-yellow' : 'dot-wave-green'"
                  :style="{ animationDelay: `${(i - 1) * 0.18}s` }"
                />
              </div>

              <!-- Progress bar -->
              <div class="w-full">
                <div class="flex justify-between mb-1.5">
                  <span
                    class="text-[10px] uppercase tracking-[0.1em] font-mono text-white/25"
                  >
                    {{ isRetrying ? "Retrying" : "Uploading" }}
                  </span>
                  <span
                    class="text-[10px] font-mono transition-colors duration-300"
                    :style="{
                      color: isRetrying
                        ? 'rgba(250,204,21,0.6)'
                        : 'rgba(74,222,128,0.6)',
                    }"
                  >
                    {{ Math.round(uploadProgress) }}%
                  </span>
                </div>
                <div
                  class="w-full h-[2px] rounded-full overflow-hidden"
                  style="background: rgba(255, 255, 255, 0.05)"
                >
                  <div
                    class="h-full rounded-full relative overflow-hidden transition-all duration-300"
                    :style="{
                      width: `${uploadProgress}%`,
                      background: isRetrying
                        ? 'linear-gradient(90deg, rgba(250,204,21,0.4), #facc15)'
                        : 'linear-gradient(90deg, rgba(74,222,128,0.4), #4ade80)',
                    }"
                  >
                    <div
                      class="absolute inset-y-0 w-8 shimmer-bar"
                      style="
                        background: linear-gradient(
                          90deg,
                          transparent,
                          rgba(255, 255, 255, 0.5),
                          transparent
                        );
                      "
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Transition>

        <Transition name="slide-up">
          <Result
            v-if="currentView === 'result'"
            :data="scanResult"
            class="absolute inset-0"
          />
        </Transition>
      </div>

      <!-- RIGHT CONTENT -->
      <div class="w-full h-full flex flex-col justify-between">
        <div
          class="w-full h-auto flex flex-col gap-y-2 justify-start items-center bg-[#FFFFFF] rounded-lg text-[#000000] border-[1px] p-4"
        >
          <div class="w-full h-auto flex justify-start items-center">
            <p class="text-[18px] text-[#195279] font-[600]">
              Monitor 39+ health metrics in just 30 seconds with a facial scan
            </p>
          </div>
          <div class="w-full h-auto flex justify-start items-center">
            <p class="text-[14px]">
              Measure health markers like blood pressure, BMI, Heart rate (HR),
              heart rate variability and more in just 30 seconds via face scan
            </p>
          </div>
        </div>
        <div
          class="w-full h-auto grid grid-cols-2 gap-3 justify-start items-center"
        >
          <div v-for="(indicator, index) in indicators" :key="index">
            <div
              class="w-full h-auto flex flex-col gap-y-1 justify-between items-start bg-[#FFFFFF] p-5 rounded-lg"
            >
              <div class="w-full h-auto flex justify-start items-start">
                <div class="w-8 h-8 flex justify-center items-center p-1">
                  <img :src="indicator.icon" alt="" />
                </div>
              </div>
              <div class="w-full h-auto flex">
                <p>{{ indicator.title }}</p>
              </div>
            </div>
          </div>
        </div>
        <div
          class="w-full h-auto flex flex-row justify-between items-center px-4 py-2 bg-[#FFFFFF] rounded-lg"
        >
          <div class="w-full h-auto flex justify-start items-center">
            <img :src="Lens" alt="" class="w-full h-full" />
          </div>
          <div class="w-full h-auto flex justify-end items-center">
            <p class="text-[#6A6A6A] font-[500] text-[14px]">
              +24 Parameters Makers
            </p>
          </div>
        </div>
        <div
          class="w-full h-auto flex flex-col gap-y-5 justify-center items-center p-8 bg-[#FFFFFF] rounded-lg"
        >
          <p class="text-[#A7A7A7]">Get the apps</p>
          <div class="flex flex-row gap-5 px-12">
            <a
              href="https://play.google.com/store/apps/developer?id=PT.+Seleris+Meditekno+Internasional"
              target="_blank"
              rel="noopener noreferrer"
              class="flex w-auto h-full justify-center items-center"
            >
              <img
                :src="playstore"
                alt="Playstore"
                class="w-full h-full object-contain"
              />
            </a>
            <div class="flex w-auto h-full justify-center items-center">
              <div class="relative group w-full h-full">
                <img
                  :src="appstore"
                  alt="Appstore"
                  class="w-full h-full object-contain"
                />
                <div
                  class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300"
                >
                  <div
                    class="w-full h-full bg-[#FDFDFD]/60 flex items-center justify-center text-white cursor-pointer"
                  >
                    <span>Coming Soon!</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="w-full h-auto flex justify-between items-center px-20">
            <p class="text-[#A9A9A9] font-[500] text-[18px]">Powered by</p>
            <img
              :src="Logo"
              alt=""
              class="w-full h-[75%] md:h-[50px] xl:h-[40px] object-contain object-center"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.view-fade-enter-active,
.view-fade-leave-active {
  transition: opacity 0.35s ease;
}
.view-fade-enter-from,
.view-fade-leave-to {
  opacity: 0;
}

.slide-up-enter-active {
  transition:
    transform 0.55s cubic-bezier(0.22, 1, 0.36, 1),
    opacity 0.4s ease;
}
.slide-up-enter-from {
  transform: translateY(40px);
  opacity: 0;
}

.dot-wave {
  animation: dot-wave 1.4s ease-in-out infinite;
}
.dot-wave-green {
  background: rgba(74, 222, 128, 0.25);
}
.dot-wave-yellow {
  background: rgba(250, 204, 21, 0.25);
}

@keyframes dot-wave {
  0%,
  60%,
  100% {
    transform: scaleY(1);
  }
  30% {
    transform: scaleY(2.2);
  }
}

.shimmer-bar {
  animation: shimmer 1.6s ease-in-out infinite;
}
@keyframes shimmer {
  0% {
    transform: translateX(-32px);
  }
  100% {
    transform: translateX(280px);
  }
}
</style>
