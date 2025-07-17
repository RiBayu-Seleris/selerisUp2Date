<script setup>
import Banner from "@/assets/images/Hero2.png";
import SliderDescription from "@/components/SliderDescription.vue";

import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { ref, onMounted, onUnmounted, watch } from "vue"; // ← Tambahkan ini!
// import { useScrollStore } from "@/stores/scroll";
import { useSidebarStore } from "@/stores/sidebar";
</script>

<template>
  <!-- px-10 -->
  <!-- xl:bg-cover lg:bg-hero bg-no-repeat lg:bg-cover -->
  <div class="relative w-full h-auto rounded-b-3xl mt-28">
    <div
      class="w-full h-auto xl:bg-cover lg:bg-hero2 dark:lg:bg-herodark bg-no-repeat bg-cover lg:bg-center xl:bg-top lg:pt-16 rounded-3xl"
    >
      <div
        class="flex flex-col w-full h-auto text-center justify-center items-center z-30 bg-[#F3F4F6] dark:bg-black dark:lg:bg-transparent lg:bg-transparent rounded-3xl animate__animated animate__fadeIn animate__slower"
      >
        <div class="w-full pb-2 sml:pb-2 sml:pt-4 md:pt-5">
          <p
            class="text-[24px] sml:text-[21px] lg:text-[26px] xl:text-[32px] text-[#1AB24F] font-[500]"
          >
            AI Inovation
          </p>
        </div>
        <div class="w-full pb-2 sml:pb-2">
          <p
            class="text-[#195279] sml:text-[21px] sml:tracking-[0.5px] md:text-[32px] lg:text-[36px] xl:text-[48px] font-[500] sml:leading-[27px] md:leading-[37px] lg:leading-[45px] xl:leading-[70px] dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-br dark:from-[#FAFAFA] dark:via-[#D4D4D4] dark:to-[#AAAAAA]"
          >
            The Future of Life <br />
            Technology
          </p>
        </div>
        <!-- Swipe caption -->
        <div class="flex flex-row items-center mb-4 sml:mb-0 lg:mb-5">
          <p
            class="text-lg sml:text-[10px] xl:text-[20px] font-medium dark:text-[#686868] bg-gradient-to-r from-[#B9CAD5] to-[#195279] bg-clip-text text-transparent cursor-pointer"
          >
            Swipe to view product
          </p>
          <div class="ml-1 text-[#13405E] dark:text-[#696969]">
            <svg
              class="w-5 h-5 sml:w-3 sml:h-3 xl:w-5 xl:h-5"
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
        <div class="w-full sml:h-auto sml:mt-5 lg:h-auto lg:px-0">
          <Swiper
            :modules="[Navigation, Autoplay]"
            :navigation="false"
            :pagination="false"
            :autoplay="{ delay: 3000, disableOnInteraction: false }"
            loop
            class="w-full h-full lg:h-[310px] group"
          >
            <SwiperSlide>
              <img
                :src="Banner"
                alt="Logo Besar"
                class="w-full h-auto lg:h-full object-contain object-top lg:px-10"
              />
              <SliderDescription />
            </SwiperSlide>
            <SwiperSlide>
              <img
                :src="Banner"
                alt="Logo Besar"
                class="w-full h-auto lg:h-full object-contain object-top lg:px-10"
              />
              <SliderDescription />
            </SwiperSlide>
            <SwiperSlide>
              <img
                :src="Banner"
                alt="Logo Besar"
                class="w-full h-auto lg:h-full object-contain object-top lg:px-10"
              />
              <SliderDescription />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  </div>
</template>
