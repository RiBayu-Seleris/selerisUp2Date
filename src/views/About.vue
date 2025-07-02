<script setup>
import SliderDescription from "@/components/SliderDescription.vue";
import StepDescription from "@/components/StepDescription.vue";

import AboutHero from "@/assets/images/About-hero-image.png";
import DescImage from "@/assets/images/about-images.png";
import ImgLinear from "@/assets/images/about-linear.png";

import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { ref, onMounted, onUnmounted, watch } from "vue"; // ← Tambahkan ini!
// import { useScrollStore } from "@/stores/scroll";
import { useSidebarStore } from "@/stores/sidebar";
</script>

<template>
  <div class="flex flex-col relative w-full h-auto lg:px-7">
    <section
      class="flex w-full h-auto lg:pt-[100px] md:pt-[100px] sml:pt-[90px]"
    >
      <div
        class="flex flex-row sml:flex-col w-full h-auto justify-between sml:bg-[#F3F4F6] sml:mt-3 sml:pt-4 sml:rounded-xl sml:shadow-md"
      >
        <div class="flex w-full md:w-[30%] lg:w-[45%] h-auto">
          <div
            class="flex flex-col w-full h-auto md:pt-[100px] lg:pt-[100px] gap-3 lg:gap-7 sml:text-center"
          >
            <div class="w-full h-auto">
              <p class="text-2xl lg:text-4xl text-[#1AB24F] font-semibold">
                About Us
              </p>
            </div>
            <div class="w-full h-auto">
              <p class="text-4xl lg:text-6xl text-[#195279]">
                Seleris Meditekno Internasional
              </p>
            </div>
            <div class="w-full h-auto">
              <p class="text-base lg:text-2xl text-[#89A6BA]">
                Seleris Is The Best Life Insurance Underwriting.
              </p>
            </div>
          </div>
        </div>
        <div
          class="flex w-full h-full md:w-[70%] lg:w-[55%] justify-center items-center sml:pt-10"
        >
          <img
            :src="AboutHero"
            alt="About Banner"
            class="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
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
