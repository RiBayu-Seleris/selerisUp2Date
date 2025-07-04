<script setup>
import SliderDescription from "@/components/SliderDescription.vue";
import StepDescription from "@/components/About/StepDescription.vue";

import Hero from "@/components/About/Hero.vue";

import DescImage from "@/assets/images/about-images.png";
import ImgLinear from "@/assets/images/about-linear.png";

import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { ref, onMounted, onUnmounted, watch } from "vue"; // ← Tambahkan ini!
// import { useScrollStore } from "@/stores/scroll";
import { useSidebarStore } from "@/stores/sidebar";
</script>

<template>
  <section class="md:px-12 lg:px-14">
    <Hero />
  </section>
  <div class="flex flex-col relative w-full h-auto lg:px-14 md:px-10">
    <!-- Section Description 1 -->
    <section class="flex w-full h-auto sml:mt-5">
      <p class="text-xl lg:text-2xl text-justify text-[#195279]">
        Seleris is a technology company that develops a facial video-based life
        insurance underwriting application. The application allows insurance
        companies to assess the risk of potential customers more quickly and
        accurately, without the need for face-to-face interviews.
      </p>
    </section>
    <!-- Section Description 2 -->
    <section class="flex w-full h-auto mt-10">
      <div class="flex flex-row w-full h-auto justify-between gap-8">
        <div
          class="flex w-full h-full md:w-[70%] lg:w-[55%] justify-center items-center sml:pt-10"
        >
          <img
            :src="DescImage"
            alt="About Banner"
            class="w-full h-full object-cover"
          />
        </div>
        <div class="flex w-full items-center">
          <p class="lg:text-2xl text-[#195279] text-justify">
            Seleris was founded in 2019 by a team of experienced entrepreneurs
            and technologists with a passion for transforming the insurance
            industry. The company believes that everyone deserves access to
            affordable and accessible life insurance, and that technology can
            play a vital role in making this a reality
          </p>
        </div>
      </div>
    </section>
    <!-- Section Description 1 -->
    <section class="flex w-full h-auto lg:mt-5 sml:mt-5">
      <p class="text-xl lg:text-2xl text-justify text-[#195279]">
        Seleris's underwriting platform is powered by artificial intelligence
        (AI) and machine learning (ML) algorithms that have been trained on a
        massive dataset of facial video data and underwriting data. This allows
        the platform to assess the risk of potential customers with a high
        degree of accuracy, even if they have limited or no medical history
      </p>
    </section>

    <section class="flex w-full h-auto mt-10"></section>
    <!-- Section Step -->
    <section class="flex w-full h-auto mt-10">
      <div class="flex flex-row w-full h-auto justify-between">
        <div class="w-full h-full flex flex-col justify-between gap-3 snap-y">
          <StepDescription />
          <StepDescription />
          <StepDescription />
          <StepDescription />
          <StepDescription />
          <StepDescription />
        </div>
        <div class="w-full h-full flex">
          <img
            :src="ImgLinear"
            alt="About Banner"
            class="w-full lg:h-[700px] object-contain"
          />
          <!-- <NetworkDiagram /> -->
        </div>
      </div>
    </section>
  </div>
</template>
