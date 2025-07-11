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
  <div
    class="relative w-full h-auto xl:bg-cover lg:bg-hero bg-no-repeat lg:bg-cover rounded-b-3xl"
  >
    <div
      class="w-full h-auto sml:pt-[90px] md:pt-[100px] lg:pt-[60px] xl:pt-[100px]"
    >
      <div
        class="flex flex-col w-full h-auto mt-5 sml:mt-4 md:mt-0 text-center sml:pt-5 md:pt-8 justify-center items-center z-30 bg-[#F3F4F6] lg:bg-transparent rounded-3xl animate__animated animate__fadeIn animate__slower"
      >
        <div class="w-full pb-2 sml:pb-2 sml:pt-4">
          <p class="sml:text-[21px] xl:text-[26px] text-[#1AB24F] font-[500]">
            AI Inovation
          </p>
        </div>
        <div class="w-full pb-2 sml:pb-2 text-[#195279]">
          <p
            class="sml:text-[21px] sml:tracking-[0.5px] md:text-4xl lg:text-4xl xl:text-[48px] font-[500] sml:leading-[27px] xl:leading-[70px]"
          >
            The Future of Life
          </p>
          <p
            class="sml:text-[21px] sml:tracking-[0.5px] md:text-4xl lg:text-4xl xl:text-[48px] font-[500] sml:leading-[27px] xl:leading-[70px]"
          >
            Insurance Underwriting
          </p>
        </div>
        <!-- Swipe caption -->
        <div class="flex flex-row items-center mb-4 sml:mb-0 lg:mb-5">
          <p
            class="text-lg sml:text-[12px] font-medium bg-gradient-to-r from-[#B9CAD5] to-[#195279] bg-clip-text text-transparent cursor-pointer"
          >
            Swipe to view product
          </p>
          <div class="ml-1">
            <svg
              class="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.43 18.07L20.5 12L14.43 5.92999"
                stroke="#13405E"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M3.50002 12L20.33 12"
                stroke="#13405E"
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
            class="w-full h-full sml:h-[160px] lg:h-[310px] group"
          >
            <SwiperSlide>
              <img
                :src="Banner"
                alt="Logo Besar"
                class="w-full sml:h-full h-[170px] md:h-full lg:h-full lg:object-contain object-bottom lg:px-10"
              />
              <SliderDescription />
            </SwiperSlide>
            <SwiperSlide>
              <img
                :src="Banner"
                alt="Logo Besar"
                class="w-full sml:h-full h-[170px] md:h-full lg:h-full lg:object-contain object-bottom lg:px-10"
              />
              <SliderDescription />
            </SwiperSlide>
            <SwiperSlide>
              <img
                :src="Banner"
                alt="Logo Besar"
                class="w-full sml:h-full h-[170px] md:h-full lg:h-full lg:object-contain object-bottom lg:px-10"
              />
              <SliderDescription />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  </div>
</template>
