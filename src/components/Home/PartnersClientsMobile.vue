<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from "vue";

const showPartners = ref(true);
const intervalTime = 3000;
const progress = ref(0);
const isHovered = ref(false);
let progressInterval = null;

// Logo list
const partnerLogos = [
  new URL("@/assets/images/clients-and-partners/rynest.png", import.meta.url)
    .href,
  new URL("@/assets/images/clients-and-partners/boa.png", import.meta.url).href,
  new URL("@/assets/images/clients-and-partners/grm.png", import.meta.url).href,
  new URL("@/assets/images/clients-and-partners/cc.png", import.meta.url).href,
  new URL("@/assets/images/clients-and-partners/bc.png", import.meta.url).href,
  new URL("@/assets/images/clients-and-partners/dsc.png", import.meta.url).href,
  new URL("@/assets/images/clients-and-partners/hunting.png", import.meta.url)
    .href,
  new URL(
    "@/assets/images/clients-and-partners/math-faculty.png",
    import.meta.url
  ).href,
  new URL("@/assets/images/clients-and-partners/data-ai.png", import.meta.url)
    .href,
  new URL("@/assets/images/clients-and-partners/idpay.png", import.meta.url)
    .href,
];

const partnerLogosDark = [
  new URL(
    "@/assets/images/clients-and-partners/rynest-dark.png",
    import.meta.url
  ).href,
  new URL("@/assets/images/clients-and-partners/boa-dark.png", import.meta.url)
    .href,
  new URL("@/assets/images/clients-and-partners/grm-dark.png", import.meta.url)
    .href,
  new URL("@/assets/images/clients-and-partners/cc-dark.png", import.meta.url)
    .href,
  new URL("@/assets/images/clients-and-partners/bc-dark.png", import.meta.url)
    .href,
  new URL("@/assets/images/clients-and-partners/dsc-dark.png", import.meta.url)
    .href,
  new URL(
    "@/assets/images/clients-and-partners/hunting-dark.png",
    import.meta.url
  ).href,
  new URL(
    "@/assets/images/clients-and-partners/math-faculty-dark.png",
    import.meta.url
  ).href,
  new URL(
    "@/assets/images/clients-and-partners/data-ai-dark.png",
    import.meta.url
  ).href,
  new URL(
    "@/assets/images/clients-and-partners/idpay-dark.png",
    import.meta.url
  ).href,
];

const clientLogos = [
  new URL("@/assets/images/clients-and-partners/boa.png", import.meta.url).href,
  new URL("@/assets/images/clients-and-partners/grm.png", import.meta.url).href,
  new URL("@/assets/images/clients-and-partners/chubb.png", import.meta.url)
    .href,
  new URL("@/assets/images/clients-and-partners/fpg.png", import.meta.url).href,
  new URL("@/assets/images/clients-and-partners/heksa.png", import.meta.url)
    .href,
  new URL("@/assets/images/clients-and-partners/equity.png", import.meta.url)
    .href,
];

const clientLogosDark = [
  new URL("@/assets/images/clients-and-partners/boa-dark.png", import.meta.url)
    .href,
  new URL("@/assets/images/clients-and-partners/grm-dark.png", import.meta.url)
    .href,
  new URL(
    "@/assets/images/clients-and-partners/chubb-dark.png",
    import.meta.url
  ).href,
  new URL("@/assets/images/clients-and-partners/fpg-dark.png", import.meta.url)
    .href,
  new URL(
    "@/assets/images/clients-and-partners/heksa-dark.png",
    import.meta.url
  ).href,
  new URL(
    "@/assets/images/clients-and-partners/equity-dark.png",
    import.meta.url
  ).href,
];

// ✅ Sinkron ke Tailwind darkMode (pakai class “dark”)
const isDark = ref(document.documentElement.classList.contains("dark"));

let observer;

onMounted(() => {
  // observe perubahan class di <html>
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

// computed pilih logo sesuai mode
const currentLogos = computed(() => {
  if (showPartners.value) {
    return isDark.value ? partnerLogosDark : partnerLogos;
  } else {
    return isDark.value ? clientLogosDark : clientLogos;
  }
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
          @click="(showPartners = true), (progress = 0)"
          :class="showPartners ? 'text-[#2AB857] dark:text-[#FAFAFA]' : ''"
        >
          Partners
        </span>
        <span>&</span>
        <span
          class="cursor-pointer"
          @click="(showPartners = false), (progress = 0)"
          :class="!showPartners ? 'text-[#2AB857] dark:text-[#FAFAFA]' : ''"
        >
          Clients
        </span>
      </div>
    </div>

    <!-- LOGO GRID -->
    <!-- LOGO GRID -->
    <transition name="fade" mode="out-in">
      <div
        :key="showPartners + (isDark ? '-dark' : '-light')"
        class="flex flex-wrap justify-center gap-6 mt-4 h-[500px] sm:h-[350px] md:h-[300px] content-start transition-all duration-300"
      >
        <div
          v-for="(logo, i) in currentLogos"
          :key="i"
          class="group w-[45%] sm:w-[30%] md:w-[22%] lg:w-[18%] h-[80px] p-[1px] rounded-xl bg-[#D9D9D9] dark:bg-gradient-to-tr dark:from-[#17181A] dark:from-45% dark:to-[#565656] hover:dark:bg-none hover:dark:bg-[#D9D9D9] transition-all duration-300 ease-out"
        >
          <div
            class="flex w-full h-full rounded-xl justify-center items-center bg-[#F9FAFB] hover:bg-white dark:bg-[#1D1F23] dark:border-[#FAFAFA]/25"
          >
            <img
              :src="logo"
              alt="partner logo"
              class="w-[184px] h-full object-contain filter transition duration-300"
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
