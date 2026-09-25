<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from "vue";

import gridFaceTracker from "@/assets/images/facetracker/grid-face-tracker2.svg";
import Person from "@/assets/images/facetracker/person3.png";
import FaceMask from "@/assets/images/facetracker/MaskingFace2.vue";
import FaceIcon from "@/assets/icons/facetracker/face-icon.svg";
import CardTracker from "@/components/CardTracker.vue";
import SdkProfileForm from "@/components/FaceScan/SdkProfileForm.vue";
import { useRouter } from "vue-router";
import { kunciGulirLatar, bukaKunciGulirLatar } from "@/utils/kunciGulir";

import Time from "@/assets/icons/facetracker/Time.vue";
import Rate from "@/assets/icons/facetracker/Rate.vue";
import UserScan from "@/assets/icons/facetracker/UserScan.vue";
import MedicalNote from "@/assets/icons/facetracker/MedicalNote.vue";
import { useScanDemoForm } from "@/composables/useScanDemoForm";

const router = useRouter();

const kartu3D = ref(null);
const kemajuan = ref(0); // -1 (di bawah layar) .. 0 (tengah) .. 1 (di atas)

const hitungKedalaman = () => {
  const el = kartu3D.value;
  if (!el) return;
  const kotak = el.getBoundingClientRect();
  const tengahKartu = kotak.top + kotak.height / 2;
  const tengahLayar = window.innerHeight / 2;
  // dibagi tinggi layar supaya rentangnya seragam di semua ukuran perangkat
  const n = (tengahLayar - tengahKartu) / window.innerHeight;
  kemajuan.value = Math.max(-1, Math.min(1, n * 2));
};

let idFrame3D = null;
const tanganiGulir3D = () => {
  if (idFrame3D) return;
  idFrame3D = requestAnimationFrame(() => {
    hitungKedalaman();
    idFrame3D = null;
  });
};

// Pengunjung yang menyalakan "kurangi animasi" tidak mendapat efek ini.
const kurangiGerak =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const gayaKartu = computed(() => ({
  transform: kurangiGerak
    ? "none"
    : `perspective(900px) rotateX(${(-kemajuan.value * 3).toFixed(2)}deg)`,
}));
const gayaPetak = computed(() => ({
  transform: kurangiGerak
    ? "none"
    : `translate3d(0, ${(kemajuan.value * 10).toFixed(1)}px, 0) scale(1.08)`,
}));
const gayaOrang = computed(() => ({
  transform: kurangiGerak
    ? "translateX(-50%)"
    : `translate3d(-50%, ${(-kemajuan.value * 18).toFixed(1)}px, 0)`,
}));

onMounted(() => {
  hitungKedalaman();
  window.addEventListener("scroll", tanganiGulir3D, { passive: true });
  window.addEventListener("resize", tanganiGulir3D, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener("scroll", tanganiGulir3D);
  window.removeEventListener("resize", tanganiGulir3D);
  if (idFrame3D) cancelAnimationFrame(idFrame3D);
  // Kalau komponen ini dilepas sementara modalnya masih terbuka, kuncinya
  // harus ikut dilepas — kalau tidak, halaman berikutnya tidak bisa digulir.
  if (isModalOpen.value) bukaKunciGulirLatar();
});

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
  { icon: Time, key: "vital-signs" },
  { icon: UserScan, key: "micro-movement" },
  { icon: Rate, key: "parameters" },
  { icon: MedicalNote, key: "report" },
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

const langkahModal = ref("lead");

const openModal = () => {
  if (isBlocked.value) return;
  form.value.deviceId = deviceId.value;
  langkahModal.value = "lead";
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

watch(isModalOpen, (terbuka) => {
  if (terbuka) kunciGulirLatar();
  else bukaKunciGulirLatar();
});

const KUNCI_PROFIL = "seleris:scan-profile";

const lanjutKeScan = (profil) => {
  try {
    sessionStorage.setItem(KUNCI_PROFIL, JSON.stringify(profil));
  } catch {
    // Penyimpanan diblokir (mode penyamaran). Biarkan halaman scan yang
    // menangani ketiadaan profil, jangan menggagalkan alur di sini.
  }
  closeModal();
  localStorage.removeItem("lp_facetracker_last_result");
  router.push("/face-tracking");
};

const { mengirim, kirim } = useScanDemoForm();

const submitForm = async () => {
  // Data lead dikirim ke CMS lebih dulu. kirim() menghasilkan false hanya
  // kalau isiannya memang perlu diperbaiki pengunjung (422/429); gangguan di
  // pihak server tidak menahannya — yang ia cari adalah mencoba fitur scan,
  // bukan mengirim formulir.
  const bolehLanjut = await kirim(form.value);

  if (!bolehLanjut) return;

  langkahModal.value = "profil";
};
</script>

<template>
  <div
    class="relative w-full h-auto flex flex-col gap-y-14 bg-[#F9FAFB] dark:bg-[#17181A]"
  >
    <div class="absolute w-full h-auto"></div>

    <div
      class="w-full h-auto flex flex-col gap-y-1.5 text-center justify-center items-center px-6 sm:px-8"
    >
      <p class="text-[20px] text-[#2AB857] font-[500]">
        {{ $t("home.faceTracker.eyebrow") }}
      </p>

      <p
        class="max-w-[22rem] sm:max-w-none text-[22px] max-smallest:text-[20px] sm:text-[28px] md:text-[32px] lg:text-[34px] xl:text-[46px] leading-snug text-[#195279] dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-br dark:from-[#FAFAFA] dark:via-[#D4D4D4] dark:to-[#AAAAAA] font-[500]"
      >
        {{ $t("home.faceTracker.titleLine1") }}
        <br class="hidden sm:block" />
        {{ $t("home.faceTracker.titleLine2") }}
      </p>
    </div>

    <div class="relative w-full h-auto hidden lg:block">
      <div class="relative w-full h-full">
        <img :src="gridFaceTracker" alt="" />
      </div>

      <div class="absolute inset-0 w-full h-auto">
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

        <div class="hidden lg:block absolute z-20 w-full h-full">
          <div class="absolute left-[10%] top-[20%] card-float-left">
            <card-tracker
              :icon="cards[0].icon"
              :title="$t(`home.faceTracker.cards.${cards[0].key}.title`)"
              :description="
                $t(`home.faceTracker.cards.${cards[0].key}.description`)
              "
            />
          </div>

          <div
            class="absolute left-[14%] bottom-[20%] lg:bottom-[25%] xl:bottom-[20%] card-float-left-delay"
          >
            <card-tracker
              :icon="cards[1].icon"
              :title="$t(`home.faceTracker.cards.${cards[1].key}.title`)"
              :description="
                $t(`home.faceTracker.cards.${cards[1].key}.description`)
              "
            />
          </div>

          <div class="absolute right-[10%] top-[20%] card-float-right">
            <card-tracker
              :icon="cards[2].icon"
              :title="$t(`home.faceTracker.cards.${cards[2].key}.title`)"
              :description="
                $t(`home.faceTracker.cards.${cards[2].key}.description`)
              "
            />
          </div>

          <div
            class="absolute right-[14%] bottom-[20%] lg:bottom-[25%] xl:bottom-[20%] card-float-right-delay"
          >
            <card-tracker
              :icon="cards[3].icon"
              :title="$t(`home.faceTracker.cards.${cards[3].key}.title`)"
              :description="
                $t(`home.faceTracker.cards.${cards[3].key}.description`)
              "
            />
          </div>
        </div>
      </div>

      <div
        @click="openModal"
        :class="[
          'absolute z-30 w-fit h-auto flex flex-row gap-x-5 justify-center items-center left-1/2 -translate-x-1/2 bottom-6 xl:bottom-10 px-10 py-2.5 rounded-xl transition-all duration-300 ease-in-out',
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
                ? $t("home.faceTracker.scanLimit", {
                    count: MAX_SCAN_ATTEMPTS,
                  })
                : $t("home.faceTracker.scanButton")
            }}
          </p>
        </div>
      </div>
    </div>

    <div class="lg:hidden flex flex-col md:flex-row gap-6 px-8 sm:px-8">
      <div
        ref="kartu3D"
        :style="gayaKartu"
        class="relative w-full max-w-[420px] mx-auto aspect-[4/5] sm:aspect-[1/1] rounded-3xl overflow-hidden bg-[#EEF3F2] dark:bg-[#1D1F23] transition-transform duration-300 ease-out will-change-transform"
      >
        <img
          :src="gridFaceTracker"
          alt=""
          :style="gayaPetak"
          class="absolute inset-0 w-full h-full object-cover opacity-70 dark:opacity-20 will-change-transform"
        />

        <div
          class="absolute left-1/2 -translate-x-1/2 bottom-[18%] w-[70%] aspect-square rounded-full bg-[#2AB857]/10 blur-2xl dark:bg-[#63FD94]/10"
        ></div>

        <img
          :src="Person"
          alt=""
          :style="gayaOrang"
          class="absolute bottom-0 left-1/2 h-[92%] w-auto max-w-none object-contain object-bottom will-change-transform"
        />
      </div>

      <div
        class="w-full md:w-[62%] min-w-0 shrink-0 flex flex-col-reverse gap-4 md:gap-5"
      >
        <div
          @click="openModal"
          :class="[
            'w-full flex flex-row gap-x-3 justify-center items-center px-6 py-3.5 rounded-xl transition-all duration-300 ease-in-out',
            isBlocked
              ? 'bg-gray-400 cursor-not-allowed opacity-60'
              : 'bg-gradient-to-tr from-[#1E6493] from-[20%] to-[#2E97DF] to-[100%] shadow-[0_12px_20px_0_rgba(39,128,188,0.20)] active:scale-[0.98] cursor-pointer',
          ]"
        >
          <div class="w-6 h-6 shrink-0 flex justify-center items-center">
            <img :src="FaceIcon" alt="" class="w-full h-full" />
          </div>
          <p class="text-white font-medium">
            {{
              isBlocked
                ? $t("home.faceTracker.scanLimit", { count: MAX_SCAN_ATTEMPTS })
                : $t("home.faceTracker.scanButton")
            }}
          </p>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <card-tracker
            v-for="kartu in cards"
            :key="kartu.key"
            :icon="kartu.icon"
            :title="$t(`home.faceTracker.cards.${kartu.key}.title`)"
            :description="$t(`home.faceTracker.cards.${kartu.key}.description`)"
          />
        </div>
      </div>
    </div>

    <transition name="fade">
      <div
        v-if="isModalOpen"
        class="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
      >
        <div
          data-lenis-prevent
          :class="[
            'relative w-full rounded-3xl bg-white dark:bg-[#1E1F22] p-6 md:p-8 shadow-2xl max-h-[90dvh] overflow-y-auto',
            langkahModal === 'profil' ? 'max-w-[640px]' : 'max-w-[500px]',
          ]"
        >
          <button
            @click="closeModal"
            class="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#F3F4F6] dark:bg-[#2A2B2F] flex items-center justify-center hover:scale-110 transition"
          >
            ✕
          </button>

          <div
            v-if="langkahModal === 'lead'"
            class="flex flex-col gap-y-2 mb-6"
          >
            <p class="text-[28px] font-semibold text-[#195279] dark:text-white">
              {{ $t("home.faceTracker.modal.title") }}
            </p>

            <p class="text-[#6B7280] dark:text-[#A1A1AA]">
              {{ $t("home.faceTracker.modal.description") }}
            </p>

            <!-- <p class="text-sm text-[#9CA3AF]">
              Sisa percobaan: {{ MAX_SCAN_ATTEMPTS - scanCount }}
            </p> -->
          </div>

          <form
            v-if="langkahModal === 'lead'"
            class="flex flex-col gap-y-4"
            @submit.prevent="submitForm"
          >
            <input
              required
              type="hidden"
              v-model="form.deviceId"
              name="deviceId"
            />

            <div class="flex flex-col gap-y-2">
              <label class="text-sm font-medium text-[#374151] dark:text-white">
                {{ $t("home.faceTracker.modal.firstName") }}
              </label>

              <input
                required
                v-model="form.firstName"
                type="text"
                :placeholder="$t('home.faceTracker.modal.firstNamePlaceholder')"
                class="w-full rounded-xl border border-[#D1D5DB] dark:border-[#3F3F46] bg-white dark:bg-[#27272A] px-4 py-3 outline-none focus:ring-2 focus:ring-[#2E97DF] text-black dark:text-white"
              />
            </div>

            <div
              class="w-full h-auto flex flex-row justify-between items-center gap-x-5"
            >
              <div class="w-full h-auto flex flex-col gap-y-2">
                <label
                  class="text-sm font-medium text-[#374151] dark:text-white"
                >
                  {{ $t("home.faceTracker.modal.businessEmail") }}
                </label>
                <input
                  required
                  v-model="form.businessEmail"
                  type="email"
                  :placeholder="
                    $t('home.faceTracker.modal.businessEmailPlaceholder')
                  "
                  class="w-full rounded-xl border border-[#D1D5DB] dark:border-[#3F3F46] bg-white dark:bg-[#27272A] px-4 py-3 outline-none focus:ring-2 focus:ring-[#2E97DF] text-black dark:text-white"
                />
              </div>

              <div class="w-full h-auto flex flex-col gap-y-2">
                <label
                  class="text-sm font-medium text-[#374151] dark:text-white"
                >
                  {{ $t("home.faceTracker.modal.companyName") }}
                </label>
                <input
                  required
                  v-model="form.companyName"
                  type="text"
                  :placeholder="
                    $t('home.faceTracker.modal.companyNamePlaceholder')
                  "
                  class="w-full rounded-xl border border-[#D1D5DB] dark:border-[#3F3F46] bg-white dark:bg-[#27272A] px-4 py-3 outline-none focus:ring-2 focus:ring-[#2E97DF] text-black dark:text-white"
                />
              </div>
            </div>

            <div class="flex flex-col gap-y-2">
              <label class="text-sm font-medium text-[#374151] dark:text-white">
                {{ $t("home.faceTracker.modal.goals") }}
              </label>

              <textarea
                required
                v-model="form.goals"
                rows="4"
                :placeholder="$t('home.faceTracker.modal.goalsPlaceholder')"
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
                {{ $t("home.faceTracker.modal.consentBefore") }}
                <span class="text-[#195279] dark:text-white font-medium"
                  >Seleris AI</span
                >
                {{ $t("home.faceTracker.modal.consentAfter") }}
                <a
                  href="/privacy"
                  class="text-[#2E97DF] hover:underline cursor-pointer"
                >
                  {{ $t("home.faceTracker.modal.privacyPolicy") }}</a
                >
                {{ $t("home.faceTracker.modal.consentWithdraw") }}
                <span class="text-red-400">*</span>
              </label>
            </div>

            <button
              type="submit"
              :disabled="!form.agreeMarketing || mengirim"
              :class="[
                'mt-4 w-full rounded-xl py-3 text-white font-medium transition',
                form.agreeMarketing
                  ? 'bg-gradient-to-r from-[#1E6493] to-[#2E97DF] hover:scale-[1.02] cursor-pointer'
                  : 'bg-gray-300 dark:bg-gray-600 cursor-not-allowed opacity-60',
              ]"
            >
              {{ $t("home.faceTracker.modal.submit") }}
            </button>
          </form>

          <SdkProfileForm v-else @submit="lanjutKeScan" />
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
