<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from "vue";

import {
  partnerLogos,
  partnerLogosDark,
} from "@/Data/Partners-Clients/PartnerList.js";
import {
  clientLogos,
  clientLogosDark,
} from "@/Data/Partners-Clients/ClientList.js";

const showPartners = ref(true);
const intervalTime = 4000;
const progress = ref(0);
const isHovered = ref(false);
let progressInterval = null;
let observer = null;

// ✅ Sinkron ke Tailwind darkMode (pakai class “dark”)
const isDark = ref(document.documentElement.classList.contains("dark"));

// Dua daftarnya dirender berbarengan dan ditumpuk di satu sel grid, jadi
// tingginya otomatis ikut yang paling banyak tanpa perlu diukur.
const logoPartner = computed(() =>
  isDark.value ? partnerLogosDark : partnerLogos,
);
const logoClient = computed(() =>
  isDark.value ? clientLogosDark : clientLogos,
);

// progress auto switch
const startProgress = () => {
  const step = 100 / (intervalTime / 100);
  progressInterval = setInterval(() => {
    if (!isHovered.value) {
      progress.value += step;
      if (progress.value >= 100) {
        progress.value = 0;
        showPartners.value = !showPartners.value;
      }
    }
  }, 100);
};
const stopProgress = () => clearInterval(progressInterval);

onMounted(() => {
  observer = new MutationObserver(() => {
    isDark.value = document.documentElement.classList.contains("dark");
  });
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });

  startProgress();
});

onBeforeUnmount(() => {
  stopProgress();
  if (observer) observer.disconnect();
});
</script>

<template>
  <div class="flex flex-col w-full px-8 py-10 dark:bg-[#17181A] duration-300">
    <div class="text-center mb-4">
      <div
        class="inline-flex gap-2 items-end text-[20px] font-[400] text-[#89A6BA] dark:text-[#6A6A6A]"
      >
        <span>Seleris</span>
        <span
          class="cursor-pointer"
          @click="((showPartners = true), (progress = 0))"
          :class="showPartners ? 'text-[#2AB857] dark:text-[#FAFAFA]' : ''"
        >
          {{ $t("home.partners.partners") }}
        </span>
        <span>&</span>
        <span
          class="cursor-pointer"
          @click="((showPartners = false), (progress = 0))"
          :class="!showPartners ? 'text-[#2AB857] dark:text-[#FAFAFA]' : ''"
        >
          {{ $t("home.partners.clients") }}
        </span>
      </div>
    </div>

    <!-- Kedua daftar ditumpuk di satu sel grid, jadi tinggi kotaknya
         mengikuti yang paling banyak dan tidak melompat saat berganti. -->
    <div class="grid mt-4">
      <div
        :class="[
          'col-start-1 row-start-1 flex flex-wrap justify-center gap-3 sm:gap-6 content-start transition-opacity duration-500',
          showPartners
            ? 'opacity-100 delay-500'
            : 'opacity-0 pointer-events-none',
        ]"
        :aria-hidden="!showPartners"
      >
        <div
          v-for="(logo, i) in logoPartner"
          :key="i"
          class="group w-[30%] sm:w-[30%] md:w-[22.4%] lg:w-[18%] h-[65px] sm:h-[80px] p-[1px] rounded-xl bg-[#D9D9D9] dark:bg-gradient-to-tr dark:from-[#17181A] dark:from-45% dark:to-[#565656] hover:dark:bg-none hover:dark:bg-[#D9D9D9] transition-all duration-300 ease-out"
        >
          <div
            class="flex w-full h-full rounded-xl justify-center items-center bg-[#F9FAFB] hover:bg-white dark:bg-[#1D1F23] dark:border-[#FAFAFA]/25"
          >
            <img
              :src="logo"
              alt="partner logo"
              class="w-auto h-full object-contain filter transition duration-300"
            />
          </div>
        </div>
      </div>

      <div
        :class="[
          'col-start-1 row-start-1 flex flex-wrap justify-center gap-3 sm:gap-6 content-start transition-opacity duration-500',
          !showPartners
            ? 'opacity-100 delay-500'
            : 'opacity-0 pointer-events-none',
        ]"
        :aria-hidden="!!showPartners"
      >
        <div
          v-for="(logo, i) in logoClient"
          :key="i"
          class="group w-[30%] sm:w-[30%] md:w-[22.4%] lg:w-[18%] h-[65px] sm:h-[80px] p-[1px] rounded-xl bg-[#D9D9D9] dark:bg-gradient-to-tr dark:from-[#17181A] dark:from-45% dark:to-[#565656] hover:dark:bg-none hover:dark:bg-[#D9D9D9] transition-all duration-300 ease-out"
        >
          <div
            class="flex w-full h-full rounded-xl justify-center items-center bg-[#F9FAFB] hover:bg-white dark:bg-[#1D1F23] dark:border-[#FAFAFA]/25"
          >
            <img
              :src="logo"
              alt="partner logo"
              class="w-auto h-full object-contain filter transition duration-300"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
