<script setup>
import { ref, onMounted, onUnmounted, computed } from "vue";

const props = defineProps({
  descriptions: {
    type: String,
  },
  logo: {
    type: String,
    required: true,
  },
  darklogo: {
    type: String,
    required: true,
  },
  linelightcolor: {
    type: String,
    required: true,
  },
  href: {
    type: String,
    required: true,
  },
  logoWidth: {
    type: Object,
    required: true,
  },
  logoHeight: {
    type: Object,
    required: true,
  },
});

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
  const length = props.descriptions.length;

  if (windowWidth.value >= 1024) {
    // ukuran lg ke atas → tampilkan 170 karakter
    return length > 100
      ? props.descriptions.substring(0, 100) + "..."
      : props.descriptions;
  } else if (windowWidth.value >= 768 && windowWidth.value < 1024) {
    // ukuran md → tampilkan 90 karakter
    return length > 90
      ? props.descriptions.substring(0, 90) + "..."
      : props.descriptions;
  } else if (windowWidth.value >= 640 && windowWidth.value < 768) {
    // ukuran sm → tampilkan 90 karakter
    return length > 90
      ? props.descriptions.substring(0, 90) + "..."
      : props.descriptions;
  } else {
    // ukuran sm dan di bawahnya → tampilkan 45 karakter
    return length > 80
      ? props.descriptions.substring(0, 80) + "..."
      : props.descriptions;
  }
});

function getLogoSize(width, height) {
  const w = windowWidth.value; // pakai reactive value

  if (w >= 1024 && width.lg && height.lg)
    return { width: width.lg + "px", height: height.lg + "px" };

  if (w >= 768 && width.md && height.md)
    return { width: width.md + "px", height: height.md + "px" };

  if (w >= 640 && width.sm && height.sm)
    return { width: width.sm + "px", height: height.sm + "px" };

  // < sm → BASE
  return {
    width: width.base + "px",
    height: height.base + "px",
  };
}
</script>

<template>
  <div
    class="absolute inset-0 flex items-center justify-end opacity-100 lg:opacity-0 lg:group-hover:opacity-100 mt-5 sm:mt-14 md:mt-10 lg:mt-0 transition-opacity duration-300 z-40"
  >
    <!-- Bubble wrapper -->
    <div
      class="relative w-[220px] h-[130px] sm:w-[300px] sm:h-[180px] md:w-[340px] md:h-[200px] lg:w-[440px] lg:h-[270px] mr-2.5 sm:mr-10 md:mr-5 lg:mr-44"
    >
      <!-- SVG as background -->
      <!-- text-white dark:text-[#363636] -->
      <svg
        class="absolute inset-0 w-full h-full drop-shadow-md z-0 text-white dark:text-[#363636]"
        viewBox="0 0 409 228"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <!-- stroke="#48C97C" -->
        <path
          class="dark:hidden"
          d="M1 30.5731V197.292C1 213.624 14.2403 226.865 30.5731 226.865H378.427C394.76 226.865 408 213.624 408 197.292V79.3688C408 63.036 394.76 49.7956 378.427 49.7956H227.234C213.76 49.7956 202.837 38.8724 202.837 25.3978C202.837 11.9233 191.913 1 178.439 1H30.5731C14.2403 1 1 14.2403 1 30.5731Z"
          fill="currentColor"
          :stroke="`${linelightcolor}`"
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
        class="relative z-10 flex flex-col px-5 sm:px-5 md:px-6 lg:px-7 pt-3 sm:pt-4 md:pt-5 lg:pt-8 w-full h-full space-y-0.5 sm:space-y-1.5 md:space-y-1 lg:space-y-4"
      >
        <div
          class="w-auto h-[40px] sm:h-[60px] flex items-center pb-1.5 md:pb-3 xl:pb-4"
        >
          <img
            :src="`/assets/images/product-logo/light/${logo}`"
            alt="LightLogo"
            class="object-contain object-left dark:hidden"
            :style="getLogoSize(props.logoWidth, props.logoHeight)"
          />
          <img
            :src="`/assets/images/product-logo/dark/${darklogo}`"
            alt="DarkLogo"
            class="object-contain object-left hidden dark:block"
            :style="getLogoSize(props.logoWidth, props.logoHeight)"
          />
        </div>
        <div
          class="flex flex-col space-y-1.5 sm:space-y-2.5 md:space-y-2 lg:space-y-7"
        >
          <div
            class="text-start text-[10px] sm:text-[12px] md:text-[14px] lg:text-[17px] leading-snug text-black dark:text-[#FAFAFA]"
          >
            {{ description }}
          </div>
          <a
            :href="href"
            target="_blank"
            class="flex flex-row dark:text-[#FAFAFA] font-medium items-center"
            :style="{ color: linelightcolor }"
          >
            <span
              class="text-[10px] sm:text-[12px] md:text-[14px] lg:text-[17px]"
              >View product</span
            >
            <svg
              class="w-[0.9rem] h-[0.9rem] sm:w-[1.1rem] sm:h-[1.1rem] md:w-[1.2rem] md:h-[1.2rem] lg:w-[1.4rem] lg:h-[1.4rem] ml-1 self-center"
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
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
