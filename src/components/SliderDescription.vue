<script setup>
import { ref, onMounted, onUnmounted, computed } from "vue";

import Logo from "@/assets/images/seleris-logo.svg";
import DarkLogo from "@/assets/images/seleris-logo-dark.svg";

const descriptions = `Seleris is a technology company that develops a facial video-based life underwriting application. The application allows companies to assess the`;
const windowWidth = ref(window.innerWidth);

const updateWidth = () => {
  windowWidth.value = window.innerWidth;
};

onMounted(() => {
  window.addEventListener("resize", updateWidth);
});

onUnmounted(() => {
  window.removeEventListener("resize", updateWidth);
});

const description = computed(() => {
  const length = descriptions.length;

  if (windowWidth.value >= 1024) {
    // ukuran lg ke atas → tampilkan 170 karakter
    return length > 120 ? descriptions.substring(0, 120) + "..." : descriptions;
  } else if (windowWidth.value > 425 && windowWidth.value < 1024) {
    // ukuran md → tampilkan 100 karakter
    return length > 90 ? descriptions.substring(0, 90) + "..." : descriptions;
  } else {
    // ukuran sm dan di bawahnya → tampilkan 45 karakter
    return length > 45 ? descriptions.substring(0, 45) + "..." : descriptions;
  }
});
</script>

<template>
  <div
    class="absolute inset-0 flex items-center justify-end opacity-100 lg:opacity-0 lg:group-hover:opacity-100 sml:mt-0 -mt-2 lg:mt-0 transition-opacity duration-300 z-[999]"
  >
    <!-- Bubble wrapper -->
    <div
      class="relative w-[240px] h-[150px] sml:w-[200px] sml:h-[110px] md:w-[340px] md:h-[200px] lg:w-[440px] lg:h-[270px] sml:mr-10 md:mr-5 lg:mr-44"
    >
      <!-- SVG as background -->
      <svg
        class="absolute inset-0 w-full h-full drop-shadow-md z-0 text-white dark:text-[#363636]"
        viewBox="0 0 409 228"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <path
          class="dark:hidden"
          d="M1 30.5731V197.292C1 213.624 14.2403 226.865 30.5731 226.865H378.427C394.76 226.865 408 213.624 408 197.292V79.3688C408 63.036 394.76 49.7956 378.427 49.7956H227.234C213.76 49.7956 202.837 38.8724 202.837 25.3978C202.837 11.9233 191.913 1 178.439 1H30.5731C14.2403 1 1 14.2403 1 30.5731Z"
          fill="currentColor"
          stroke="#48C97C"
          stroke-width="0.739328"
        />
        <path
          class="hidden dark:block"
          d="M1 30.5731V197.292C1 213.624 14.2403 226.865 30.5731 226.865H378.427C394.76 226.865 408 213.624 408 197.292V79.3688C408 63.036 394.76 49.7956 378.427 49.7956H227.234C213.76 49.7956 202.837 38.8724 202.837 25.3978C202.837 11.9233 191.913 1 178.439 1H30.5731C14.2403 1 1 14.2403 1 30.5731Z"
          fill="currentColor"
          stroke=""
          stroke-width="0.739328"
        />
      </svg>

      <!-- Konten di dalam bubble -->
      <div
        class="relative z-10 flex flex-col px-5 lg:px-8 pt-5 sml:pt-3 md:pt-5 lg:py-6 w-full h-full"
      >
        <img
          :src="Logo"
          alt="Logo"
          class="w-[70px] sml:w-[50px] md:w-[90px] lg:w-[130px] h-auto object-contain mb-3 dark:hidden"
        />
        <img
          :src="DarkLogo"
          alt="Logo"
          class="w-[70px] sml:w-[50px] md:w-[90px] lg:w-[130px] h-auto object-contain mb-3 hidden dark:block"
        />
        <div
          class="text-start sml:text-[12px] md:text-[16px] lg:text-[17px] xl:pt-3 leading-snug text-black dark:text-[#FAFAFA]"
        >
          {{ description }}
        </div>
        <div
          class="flex flex-row text-[#2AB857] dark:text-[#FAFAFA] mt-2 lg:mt-4 font-medium items-center"
        >
          <span class="sml:text-[12px] md:text-[16px] lg:text-[17px]"
            >View product</span
          >
          <svg
            class="w-[1.1rem] h-[1.1rem] md:w-[1.4rem] md:h-[1.4rem] lg:w-[1.4rem] lg:h-[1.4rem] ml-1 self-center"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.43 18.07L20.5 12L14.43 5.92999"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M3.50002 12L20.33 12"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>
