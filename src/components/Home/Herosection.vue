<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import SliderDescription from "@/components/SliderDescription.vue";

import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
// import { ref, onMounted, onUnmounted, watch } from "vue"; // ← Tambahkan ini!
// import { useScrollStore } from "@/stores/scroll";
import { useSidebarStore } from "@/stores/sidebar";
import { bannerLists } from "@/Data/BannerLists";

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
  <div class="relative w-full h-auto rounded-b-3xl mt-28">
    <div
      class="relative w-full h-auto flex justify-center items-center lg:bg-hero2 dark:lg:bg-herodark bg-no-repeat bg-cover lg:bg-center dark:lg:bg-center xl:bg-top dark:xl:bg-top lg:pt-16 rounded-3xl"
    >
      <div
        class="relative flex flex-col w-full mx-auto h-auto text-center justify-center items-center pt-8 lg:pt-0 z-30 bg-[#F3F4F6] shadow-[inset_0px_0px_20px_5px_rgba(0,_0,_0,_0.1)] lg:shadow-none dark:shadow-none dark:bg-[#1a1b1f] dark:lg:bg-transparent lg:bg-transparent rounded-3xl"
      >
        <div
          class="absolute lg:hidden w-full h-[150px] sm:h-[300px] z-10 top-0 rounded-3xl dark:bg-[radial-gradient(circle_at_50%_-100%,_#3CFF7A_-40%,_#1a1b1f_80%)]"
        />
        <div class="w-full pb-2 sml:pb-2 sml:pt-4 md:pt-0 z-20">
          <p
            class="text-[22px] sm:text-[22px] md:text-[22px] lg:text-[26px] xl:text-[32px] text-[#1AB24F] font-[500]"
          >
            AI Innovation
          </p>
        </div>
        <div class="w-full pb-2 sml:pb-2 z-20">
          <p
            class="text-[#195279] text-[21px] sm:text-[38px] md:text-[36px] lg:text-[36px] xl:text-[60px] font-[500] leading-tight -tracking-[1px] dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-br dark:from-[#FAFAFA] dark:via-[#D4D4D4] dark:to-[#AAAAAA]"
          >
            The Future of Life <br />
            Technology
          </p>
        </div>
        <!-- Swipe caption -->
        <div
          class="cursor-pointer flex flex-row items-center mb-0 sm:mb-5 lg:mb-5 mt-4 lg:mt-6 bg-[#195279] dark:bg-[#2B2E32] border-[1px] dark:border-[1px] dark:border-[#2AB857] px-5 py-2 rounded-full dark:shadow-[0px_4px_18.8px_0px_rgba(0,255,59,0.25)] z-30 transition-all duration-300 
          hover:shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.4),inset_0px_-4px_0px_0px_rgba(0,0,0,0.2),0px_0px_0px_2px_rgba(255,255,255,0.2),0px_0px_180px_0px_#2AB857] 
          dark:hover:shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.4),inset_0px_-4px_0px_0px_rgba(0,0,0,0.2),0px_0px_0px_2px_rgba(0,255,59,0.25),0px_0px_180px_0px_#2AB857] 
          hover:translate-y-[-2px]"
        >
          <router-link to="/book-a-demo">
            <p class="text-[12px] xl:text-[14px] font-[400] text-[#FAFAFA]">
              Book a Demo
            </p>
          </router-link>
          <div class="ml-1 text-[#FAFAFA] dark:text-[#FAFAFA]">
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
        <div class="w-full sml:h-auto lg:h-auto lg:px-0 z-30">
          <Swiper
            :modules="[Navigation, Autoplay]"
            :navigation="false"
            :pagination="false"
            :autoplay="{ delay: 3000, disableOnInteraction: false }"
            loop
            @slideChange="onSlideChange"
            class="w-full h-full lg:h-[310px] flex justify-center items-center group"
          >
            <SwiperSlide
              v-for="(data, index) in bannerLists"
              :key="index"
              class="w-full h-full flex items-center justify-center"
            >
              <img
                :src="`/assets/images/hero-image/${data.banner}`"
                alt="Banner"
                class="w-full h-[180px] sm:h-[300px] lg:h-full object-contain object-bottom lg:px-10"
              />
              <SliderDescription
                :key="activeIndex + '-' + index"
                class="animate__animated animate__fadeIn lg:animate-none"
                :style="screenIsSmall ? 'animation-delay: 500ms' : ''"
                :logo="data.logo"
                :darklogo="data.darklogo"
                :logoWidth="data.logoWidth"
                :logoHeight="data.logoHeight"
                :descriptions="data.description"
                :linelightcolor="data.linelightcolor"
                :href="data.url"
              />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  </div>
</template>
