<script setup>
import { ref, onMounted, onUnmounted, computed } from "vue";

// import Logo from "@/assets/images/seleris-logo.svg";
// import DarkLogo from "@/assets/images/seleris-logo-dark.svg";

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
  widthSml: {
    type: Number,
  },
  heightSml: {
    type: Number,
  },
  widthSm: {
    type: Number,
  },
  heightSm: {
    type: Number,
  },
  widthMd: {
    type: Number,
  },
  heightMd: {
    type: Number,
  },
  widthLg: {
    type: Number,
  },
  heightLg: {
    type: Number,
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
  } else if (windowWidth.value > 425 && windowWidth.value < 1024) {
    // ukuran md → tampilkan 100 karakter
    return length > 90
      ? props.descriptions.substring(0, 90) + "..."
      : props.descriptions;
  } else {
    // ukuran sm dan di bawahnya → tampilkan 45 karakter
    return length > 45
      ? props.descriptions.substring(0, 45) + "..."
      : props.descriptions;
  }
});
</script>

<template>
  <div
    class="absolute inset-0 flex items-center justify-end opacity-100 lg:opacity-0 lg:group-hover:opacity-100 mt-0 sm:mt-20 md:mt-10 lg:mt-0 transition-opacity duration-300 z-[999]"
  >
    <!-- Bubble wrapper -->
    <div
      class="relative w-[200px] h-[110px] sm:w-[300px] sm:h-[180px] md:w-[340px] md:h-[200px] lg:w-[440px] lg:h-[270px] sml:mr-10 md:mr-5 lg:mr-44"
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
        class="relative z-10 flex flex-col px-6 md:px-6 lg:px-7 pt-5 sml:pt-3 sm:pt-6 md:pt-5 lg:pt-8 w-full h-full sm:space-y-1.5 md:space-y-1 lg:space-y-4"
      >
        <div
          class="w-auto md:max-h-[55px] lg:max-h-[70px] flex items-center sml:pb-3.5 md:pb-3 xl:pb-4"
        >
          <img
            :src="`/assets/images/product-logo/light/${logo}`"
            alt="LightLogo"
            class="object-contain object-left dark:hidden"
            :class="`w-[${widthSml}px] h-[${heightSml}px]
            sm:w-[${widthSm}px] sm:h-[${heightSm}px]
            md:w-[${widthMd}px] md:h-[${heightMd}px]
            lg:w-[${widthLg}px] lg:h-[${heightLg}px]`"
          />
          <img
            :src="`/assets/images/product-logo/dark/${darklogo}`"
            alt="DarkLogo"
            class="object-contain object-left hidden dark:block"
            :class="`w-[${widthSml}px] h-[${heightSml}px]
            sm:w-[${widthSm}px] sm:h-[${heightSm}px]
            md:w-[${widthMd}px] md:h-[${heightMd}px]
            lg:w-[${widthLg}px] lg:h-[${heightLg}px]`"
          />
        </div>
        <div class="flex flex-col sm:space-y-2.5 md:space-y-2 lg:space-y-7">
          <div
            class="text-start sml:text-[12px] md:text-[16px] lg:text-[17px] leading-snug text-black dark:text-[#FAFAFA]"
          >
            {{ description }}
          </div>
          <a
            :href="href"
            target="_blank"
            class="flex flex-row dark:text-[#FAFAFA] font-medium items-center"
            :style="{ color: linelightcolor }"
          >
            <span class="sml:text-[11px] md:text-[16px] lg:text-[17px]"
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
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
