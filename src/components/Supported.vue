<script setup>
import { ref, onMounted, onUnmounted } from "vue";

import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
// import { ref, onMounted, onUnmounted, watch } from "vue"; // ← Tambahkan ini!
// import { useScrollStore } from "@/stores/scroll";
import { useSidebarStore } from "@/stores/sidebar";
import { supportedLists } from "@/Data/SupportedLists.js";

const activeIndex = ref(0);

const screenIsSmall = ref(window.innerWidth < 1023);

function onSlideChange(swiper) {
  // pakai realIndex biar tidak bingung dengan duplicate slide
  activeIndex.value = swiper.realIndex;
}

function handleResize() {
  screenIsSmall.value = window.innerWidth < 1023;
}

onMounted(() => window.addEventListener("resize", handleResize));
onUnmounted(() => window.removeEventListener("resize", handleResize));
</script>
<template>
  <div class="relative w-full h-auto px-8 sm:px-0">
    <div
      class="flex flex-col gap-y-7 md:gap-y-10 lg:gap-y-10 xl:gap-y-20 py-10 w-full max-w-sm md:max-w-2xl lg:max-w-3xl xl:max-w-5xl mx-auto h-auto dark:bg-[#17181A] border-2 rounded-xl"
    >
      <!-- Heading -->
      <div class="flex flex-col w-full gap-y-3 items-center text-center">
        <p
          class="text-[12px] sm:text-[18px] md:text-[22px] lg:text-[24px] xl:text-[24px] font-medium text-[#2AB857] dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-br dark:from-[#FAFAFA] dark:via-[#D4D4D4] dark:to-[#AAAAAA]"
        >
          Sertifikasi
        </p>
        <p
          class="text-[14px] sm:text-[16px] md:text-[20px] lg:text-[32] xl:text-[32px] font-[500] tracking-wide text-[#195279] dark:text-[#6A6A6A]"
        >
          Telah di dukung secara resmi
        </p>
        <p
          class="px-8 sm:px-0 text-[10px] sm:text-[12px] md:text-[12px] lg:text-[14px] xl:text-[14px] font-medium text-[#3D6986] dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-br dark:from-[#FAFAFA] dark:via-[#D4D4D4] dark:to-[#AAAAAA]"
        >
          Seleris Care diklasifikasikan sebagai Alat Kesehatan berbasis AI
          sesuai regulasi <br class="hidden sm:block" />
          Kementerian Kesehatan RI dan mengikuti ketentuan Permenkes No.14 Tahun
          2021
        </p>
      </div>
      <Swiper
        :modules="[Navigation, Autoplay]"
        :navigation="false"
        :pagination="false"
        :autoplay="{ delay: 3000, disableOnInteraction: false }"
        loop
        @slideChange="onSlideChange"
        class="w-full h-auto flex justify-center items-center"
      >
        <SwiperSlide
          v-for="(data, index) in supportedLists"
          :key="index"
          class="w-full h-auto flex items-center justify-center"
        >
          <div
            class="w-full h-auto flex flex-col gap-y-8 md:gap-y-10 lg:gap-y-10 xl:gap-y-20 justify-center items-center"
          >
            <div class="w-full h-auto flex justify-center items-center">
              <img
                :src="`/assets/images/certificate-icon/${data.logo}`"
                alt="Banner"
                class="w-full h-[50px] sm:h-[90px] lg:h-[100px] xl:h-[150px] object-contain"
              />
            </div>
            <div
              class="w-full h-auto flex flex-col gap-y-4 md:gap-y-4 lg:gap-y-4 xl:gap-y-5 justify-center items-center"
            >
              <div
                class="w-full h-auto flex justify-center items-center text-center"
              >
                <span
                  class="text-[#195279] font-[600] text-[14px] lg:text-[20px] xl:text-[24px]"
                >
                  {{ data.certificate_number }}
                </span>
              </div>
              <div
                class="w-full h-auto flex justify-center items-center text-center"
              >
                <span
                  class="text-[#195279] font-[500] text-[12px] md:text-[16px] xl:text-[16px]"
                >
                  {{ data.name }}
                </span>
              </div>
              <div
                class="w-full h-auto flex justify-center items-center text-center px-4 sm:px-10 lg:px-14 xl:px-32"
              >
                <span
                  class="text-[#AEA9B1] font-[400] text-[10px] sm:text-[12px] lg:text-[16px] xl:text-[16px]"
                >
                  {{ data.description }}
                </span>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  </div>
</template>
