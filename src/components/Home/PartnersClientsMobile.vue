<script setup>
import {
  ref,
  onMounted,
  onBeforeUnmount,
  computed,
  watch,
  nextTick,
} from "vue";

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

// 🧩 untuk menyimpan tinggi maksimal
const maxHeight = ref(0);
const logoContainer = ref(null);

// ✅ Sinkron ke Tailwind darkMode (pakai class “dark”)
const isDark = ref(document.documentElement.classList.contains("dark"));

// computed pilih logo sesuai mode
const currentLogos = computed(() => {
  if (showPartners.value) {
    return isDark.value ? partnerLogosDark : partnerLogos;
  } else {
    return isDark.value ? clientLogosDark : clientLogos;
  }
});

// 🧮 Hitung tinggi maksimum dari kontainer
const updateMaxHeight = async () => {
  await nextTick();
  if (logoContainer.value) {
    const currentHeight = logoContainer.value.scrollHeight;
    if (currentHeight > maxHeight.value) {
      maxHeight.value = currentHeight;
    }
  }
};

// Saat berganti partner/client → cek apakah tinggi perlu di-update
watch(showPartners, async () => {
  await updateMaxHeight();
});

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

  nextTick(() => updateMaxHeight());

  // ✅ Tambahkan ini
  window.addEventListener("resize", updateMaxHeight);
});

onBeforeUnmount(() => {
  stopProgress();
  if (observer) observer.disconnect();

  // ✅ Jangan lupa hapus listener-nya agar tidak memory leak
  window.removeEventListener("resize", updateMaxHeight);
});
</script>

<template>
  <div class="flex flex-col w-full px-8 py-10 dark:bg-[#17181A] duration-300">
    <!-- Title -->
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
          Partners
        </span>
        <span>&</span>
        <span
          class="cursor-pointer"
          @click="((showPartners = false), (progress = 0))"
          :class="!showPartners ? 'text-[#2AB857] dark:text-[#FAFAFA]' : ''"
        >
          Clients
        </span>
      </div>
    </div>

    <!-- LOGO GRID -->
    <transition name="fade" mode="out-in">
      <div
        ref="logoContainer"
        :key="showPartners + (isDark ? '-dark' : '-light')"
        class="flex flex-wrap justify-center gap-3 sm:gap-6 mt-4 content-start transition-all duration-300"
        :style="{ minHeight: maxHeight + 'px' }"
      >
        <div
          v-for="(logo, i) in currentLogos"
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
    </transition>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
