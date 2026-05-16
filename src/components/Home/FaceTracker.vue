<script setup>
import { ref, onMounted } from "vue";

import gridFaceTracker from "@/assets/images/facetracker/grid-face-tracker2.svg";
import Person from "@/assets/images/facetracker/person3.png";
import FaceMask from "@/assets/images/facetracker/MaskingFace2.vue";
import FaceIcon from "@/assets/icons/facetracker/face-icon.svg";
import CardTracker from "@/components/CardTracker.vue";
import { useRouter } from "vue-router";

import Time from "@/assets/icons/facetracker/Time.vue";
import Rate from "@/assets/icons/facetracker/Rate.vue";
import UserScan from "@/assets/icons/facetracker/UserScan.vue";
import MedicalNote from "@/assets/icons/facetracker/MedicalNote.vue";

const router = useRouter();

// =========================
// Modal State
// =========================
const isModalOpen = ref(false);
const isBlocked = ref(false);

// =========================
// Device & Cookie Tracking
// =========================
const COOKIE_DEVICE_ID_KEY = "lp_facetracker_device";
const COOKIE_SCAN_COUNT_KEY = "lp_facetracker_count";
const MAX_SCAN_ATTEMPTS = Infinity;
const COOKIE_EXPIRE_DAYS = 30;

const deviceId = ref("");
const scanCount = ref(0);

const cards = [
  {
    icon: Time,
    title: "Vital Signs in 15 Seconds",
    description:
      "Measures heart rate, blood pressure, SpO₂, HRV, and more. no wearables or devices required.",
  },
  {
    icon: UserScan,
    title: "Micro-Movement Detection",
    description:
      "AI uses rPPG to detect blood flow and pulse changes through facial skin via camera.",
  },
  {
    icon: Rate,
    title: "39 AI-Powered Health Parameters",
    description:
      "Instantly measures health and risk indicators for smarter insurance assessments.",
  },
  {
    icon: MedicalNote,
    title: "Instant Health Report",
    description:
      "Creates unique 3D model of your face for accurate health measurements.",
  },
];

function getCookie(name) {
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(name + "="));
  return match ? decodeURIComponent(match.split("=")[1]) : null;
}

function setCookie(name, value, days) {
  const expires = new Date();
  expires.setDate(expires.getDate() + days);
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;
}

function generateDeviceId() {
  return "dev_" + crypto.randomUUID();
}

onMounted(() => {
  // Init deviceId
  let storedId = getCookie(COOKIE_DEVICE_ID_KEY);
  if (!storedId) {
    storedId = generateDeviceId();
    setCookie(COOKIE_DEVICE_ID_KEY, storedId, COOKIE_EXPIRE_DAYS);
  }
  deviceId.value = storedId;

  // Init scan count
  const count = parseInt(getCookie(COOKIE_SCAN_COUNT_KEY) || "0", 10);
  scanCount.value = count;
  isBlocked.value = count >= MAX_SCAN_ATTEMPTS;
});

// =========================
// Form State
// =========================
const form = ref({
  firstName: "",
  businessEmail: "",
  companyName: "",
  goals: "",
  deviceId: "",
  agreeMarketing: false,
});

const openModal = () => {
  if (isBlocked.value) return;
  form.value.deviceId = deviceId.value;
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

const submitForm = () => {
  // HAPUS bagian ini
  // const newCount = scanCount.value + 1;
  // scanCount.value = newCount;
  // setCookie(COOKIE_SCAN_COUNT_KEY, newCount, COOKIE_EXPIRE_DAYS);
  // if (newCount >= MAX_SCAN_ATTEMPTS) isBlocked.value = true;

  console.log("Form Submitted:", form.value);
  // TODO: Integrasi API submit di sini

  closeModal();
  router.push("/face-tracking");
};
</script>

<template>
  <div
    class="relative w-full h-auto flex flex-col gap-y-14 bg-[#F9FAFB] dark:bg-[#17181A]"
  >
    <div class="absolute w-full h-auto"></div>

    <!-- Title -->
    <div
      class="w-full h-auto flex flex-col gap-y-1.5 text-center justify-center items-center xl:px-8"
    >
      <p class="text-[20px] text-[#2AB857] font-[500]">Request Demo</p>

      <p
        class="text-[16px] md:text-[32px] lg:text-[34px] xl:text-[46px] leading-snug text-[#195279] dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-br dark:from-[#FAFAFA] dark:via-[#D4D4D4] dark:to-[#AAAAAA] font-[500]"
      >
        Apa yang anda dapatkan <br />
        jika melakukan demo Scan
      </p>
    </div>

    <!-- Main Section -->
    <div class="relative w-full h-auto">
      <div class="relative w-full h-full">
        <img :src="gridFaceTracker" alt="" />
      </div>

      <div class="absolute inset-0 w-full h-auto">
        <!-- Person -->
        <div
          class="absolute z-10 inset-0 w-auto h-auto bottom-0 left-1/2 -translate-x-1/2"
        >
          <div class="relative w-full h-auto">
            <div
              class="absolute w-auto h-auto top-[9.5%] xl:top-[9%] left-1/2 -translate-x-1/2"
            >
              <div
                class="w-[50%] md:w-[70%] xl:w-[85%] h-auto object-contain object-center ml-[17%] xl:ml-[10.5%]"
              >
                <FaceMask />
              </div>
            </div>

            <img :src="Person" alt="" class="w-full h-full object-cover" />
          </div>
        </div>

        <!-- Cards -->
        <div class="absolute z-20 w-full h-full">
          <!-- Kiri atas -->
          <div class="absolute left-[10%] top-[20%] card-float-left">
            <card-tracker
              :icon="cards[0].icon"
              :title="cards[0].title"
              :description="cards[0].description"
            />
          </div>

          <!-- Kiri bawah -->
          <div
            class="absolute left-[14%] bottom-[20%] lg:bottom-[25%] xl:bottom-[20%] card-float-left-delay"
          >
            <card-tracker
              :icon="cards[1].icon"
              :title="cards[1].title"
              :description="cards[1].description"
            />
          </div>

          <!-- Kanan atas -->
          <div class="absolute right-[10%] top-[20%] card-float-right">
            <card-tracker
              :icon="cards[2].icon"
              :title="cards[2].title"
              :description="cards[2].description"
            />
          </div>

          <!-- Kanan bawah -->
          <div
            class="absolute right-[14%] bottom-[20%] lg:bottom-[25%] xl:bottom-[20%] card-float-right-delay"
          >
            <card-tracker
              :icon="cards[3].icon"
              :title="cards[3].title"
              :description="cards[3].description"
            />
          </div>
        </div>

        <!-- Button Scan Now -->
        <div
          @click="openModal"
          :class="[
            'absolute z-30 w-fit h-auto flex flex-row gap-x-5 justify-center items-center left-1/2 -translate-x-1/2 bottom-0 lg:bottom-6 xl:bottom-10 px-10 py-2.5 rounded-xl transition-all duration-300 ease-in-out',
            isBlocked
              ? 'bg-gray-400 cursor-not-allowed opacity-60'
              : 'bg-gradient-to-tr from-[#1E6493] from-[20%] to-[#2E97DF] to-[100%] shadow-[0_20px_20px_0_rgba(39,128,188,0.16)] hover:scale-[1.1] cursor-pointer',
          ]"
        >
          <div class="w-6 h-6 shrink-0 flex justify-center items-center">
            <img :src="FaceIcon" alt="" class="w-full h-full" />
          </div>

          <div class="w-fit h-auto flex justify-center items-center">
            <p class="text-white font-medium">
              {{
                isBlocked
                  ? `Batas scan tercapai (${MAX_SCAN_ATTEMPTS}x)`
                  : "Scan Yourself"
              }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- =========================
      MODAL
    ========================== -->
    <transition name="fade">
      <div
        v-if="isModalOpen"
        class="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
      >
        <div
          class="relative w-full max-w-[500px] rounded-3xl bg-white dark:bg-[#1E1F22] p-6 md:p-8 shadow-2xl"
        >
          <!-- Close -->
          <button
            @click="closeModal"
            class="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#F3F4F6] dark:bg-[#2A2B2F] flex items-center justify-center hover:scale-110 transition"
          >
            ✕
          </button>

          <!-- Header -->
          <div class="flex flex-col gap-y-2 mb-6">
            <p class="text-[28px] font-semibold text-[#195279] dark:text-white">
              Request Demo
            </p>

            <p class="text-[#6B7280] dark:text-[#A1A1AA]">
              Isi data berikut untuk mencoba fitur scan.
            </p>

            <!-- Scan counter info -->
            <p class="text-sm text-[#9CA3AF]">
              Sisa percobaan: {{ MAX_SCAN_ATTEMPTS - scanCount }}x
            </p>
          </div>

          <form class="flex flex-col gap-y-4" @submit.prevent="submitForm">
            <!-- Hidden deviceId -->
            <input
              required
              type="hidden"
              v-model="form.deviceId"
              name="deviceId"
            />

            <!-- First Name -->
            <div class="flex flex-col gap-y-2">
              <label class="text-sm font-medium text-[#374151] dark:text-white">
                First name
              </label>

              <input
                required
                v-model="form.firstName"
                type="text"
                placeholder="Enter your first name"
                class="w-full rounded-xl border border-[#D1D5DB] dark:border-[#3F3F46] bg-white dark:bg-[#27272A] px-4 py-3 outline-none focus:ring-2 focus:ring-[#2E97DF] text-black dark:text-white"
              />
            </div>

            <!-- Business Email -->
            <div class="flex flex-col gap-y-2">
              <label class="text-sm font-medium text-[#374151] dark:text-white">
                Business email
              </label>

              <input
                required
                v-model="form.businessEmail"
                type="email"
                placeholder="Enter your business email"
                class="w-full rounded-xl border border-[#D1D5DB] dark:border-[#3F3F46] bg-white dark:bg-[#27272A] px-4 py-3 outline-none focus:ring-2 focus:ring-[#2E97DF] text-black dark:text-white"
              />
            </div>

            <!-- Company Name -->
            <div class="flex flex-col gap-y-2">
              <label class="text-sm font-medium text-[#374151] dark:text-white">
                Company name
              </label>

              <input
                required
                v-model="form.companyName"
                type="text"
                placeholder="Enter your company name"
                class="w-full rounded-xl border border-[#D1D5DB] dark:border-[#3F3F46] bg-white dark:bg-[#27272A] px-4 py-3 outline-none focus:ring-2 focus:ring-[#2E97DF] text-black dark:text-white"
              />
            </div>

            <!-- Goals -->
            <div class="flex flex-col gap-y-2">
              <label class="text-sm font-medium text-[#374151] dark:text-white">
                What would you like to achieve with Seleris AI
              </label>

              <textarea
                v-model="form.goals"
                rows="4"
                placeholder="Tell us your goals..."
                class="w-full rounded-xl border border-[#D1D5DB] dark:border-[#3F3F46] bg-white dark:bg-[#27272A] px-4 py-3 outline-none focus:ring-2 focus:ring-[#2E97DF] text-black dark:text-white resize-none"
              />
            </div>

            <div class="flex flex-row gap-x-3 items-start">
              <input
                required
                v-model="form.agreeMarketing"
                type="checkbox"
                id="agreeMarketing"
                class="mt-1 w-4 h-4 shrink-0 accent-[#2E97DF] cursor-pointer"
              />
              <label
                for="agreeMarketing"
                class="text-sm text-[#6B7280] dark:text-[#A1A1AA] leading-relaxed cursor-pointer"
              >
                Saya menyetujui untuk menerima informasi produk dan layanan dari
                <span class="text-[#195279] dark:text-white font-medium"
                  >Seleris AI</span
                >
                melalui email. Data pribadi yang diberikan akan diproses sesuai
                dengan
                <span class="text-[#2E97DF] hover:underline cursor-pointer"
                  >Kebijakan Privasi</span
                >
                kami. Anda dapat mencabut persetujuan ini kapan saja
                <span class="text-red-400">*</span>
              </label>
            </div>

            <!-- Submit -->
            <button
              type="submit"
              :disabled="!form.agreeMarketing"
              :class="[
                'mt-4 w-full rounded-xl py-3 text-white font-medium transition',
                form.agreeMarketing
                  ? 'bg-gradient-to-r from-[#1E6493] to-[#2E97DF] hover:scale-[1.02] cursor-pointer'
                  : 'bg-gray-300 dark:bg-gray-600 cursor-not-allowed opacity-60',
              ]"
            >
              Submit Demo Request
            </button>
          </form>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.card-float-left {
  animation: floatLeft 3s ease-in-out infinite;
}

.card-float-left-delay {
  animation: floatLeft 3s ease-in-out infinite 2s;
}

.card-float-right {
  animation: floatRight 3s ease-in-out infinite;
}

.card-float-right-delay {
  animation: floatRight 3s ease-in-out infinite 2s;
}

@keyframes floatLeft {
  0%,
  100% {
    transform: translateX(0px);
  }

  50% {
    transform: translateX(-50px);
  }
}

@keyframes floatRight {
  0%,
  100% {
    transform: translateX(0px);
  }

  50% {
    transform: translateX(50px);
  }
}

/* Modal Animation */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
