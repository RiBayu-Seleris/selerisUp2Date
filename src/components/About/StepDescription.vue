<script setup>
import ImgLinear from "@/assets/images/about-linear.png";
import DarkImgLinear from "@/assets/images/dark-about-linear.png";

import Innovation from "@/assets/icons/innovation.svg";
import Vision from "@/assets/icons/vision.svg";
import TeamWork from "@/assets/icons/team-work.svg";
import Integrity from "@/assets/icons/integrity.svg";
import Focus from "@/assets/icons/focus.svg";
import OptimalPerformance from "@/assets/icons/innovation.svg";

import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { ref, onMounted, onUnmounted, watch } from "vue"; // ← Tambahkan ini!

const StepsContent = [
  {
    icon: Innovation,
    title: "Innovation",
    description:
      "Seleris develops smart, effective solutions for insurance and underwriting industry challenges.",
  },
  {
    icon: Vision,
    title: "Our Vision",
    description:
      "Seleris envisions accessible, affordable life and medical insurance for everyone.",
  },
  {
    icon: OptimalPerformance,
    title: "Optimal Performance",
    description:
      "We use advanced technology to ensure fast, smooth, reliable service delivery.",
  },
  {
    icon: Focus,
    title: "Customer Focus",
    description:
      "We prioritize delivering the best possible experience to every customer.",
  },
  {
    icon: Integrity,
    title: "Integrity",
    description:
      "Seleris values honesty and full transparency in all business interactions.",
  },
  {
    icon: TeamWork,
    title: "Team Work",
    description:
      "We believe great results come through strong teamwork and shared collaboration.",
  },
];

onMounted(() => {
  const video = document.querySelector("video");
  if (video) {
    video.addEventListener("contextmenu", (e) => e.preventDefault());
  }
});
</script>

<template>
  <div class="w-full h-full">
    <div
      class="flex md:flex-row sml:flex-col-reverse w-full h-auto gap-x-10 relative"
    >
      <div class="flex flex-col w-full h-auto gap-y-10">
        <div class="w-full h-auto flex flex-col gap-y-3">
          <div class="flex w-full h-auto">
            <p class="text-2xl lg:text-3xl xl:text-[30px] text-[#1AB24F]">
              App Features
            </p>
          </div>
          <div class="flex w-full h-auto md:pr-16 lg:pr-16 xl:pr-20">
            <p
              class="text-3xl lg:text-4xl xl:text-[47px] text-[#195279] lg:leading-[50px] xl:leading-[55px] dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-br dark:from-[#FAFAFA] dark:via-[#D4D4D4] dark:to-[#AAAAAA]"
            >
              We're company <br />
              with a vision.
            </p>
          </div>
          <div class="flex w-full h-auto">
            <p
              class="lg:text-xl xl:text-[17px] text-[#89A6BA] xl:leading-relaxed pr-20 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-br dark:from-[#FAFAFA] dark:via-[#D4D4D4] dark:to-[#AAAAAA]"
            >
              Empowering smarter decisions through AI-driven, human-focused
              technology.
            </p>
          </div>
        </div>
        <div class="h-[170px] w-full flex items-center">
          <Swiper
            :modules="[Navigation, Autoplay, Pagination]"
            :direction="'vertical'"
            :navigation="false"
            :pagination="false"
            :autoplay="{ delay: 2000, disableOnInteraction: false }"
            loop
            class="w-full h-full rounded-xl overflow-hidden custom-swiper"
          >
            <SwiperSlide v-for="(step, index) in StepsContent" :key="index">
              <div
                class="w-full h-full flex flex-row items-center text-white text-xl"
              >
                <div class="flex flex-row text-white text-xl gap-x-5">
                  <div class="flex w-[10%]">
                    <div
                      class="flex bg-white dark:bg-[#323232] rounded-full shadow-md p-2 sml:w-[50px] sml:h-[50px] md:w-[50px] md:h-[50px] lg:w-[55px] lg:h-[55px] xl:w-[60px] xl:h-[60px] justify-center md:mt-2 lg:mt-0"
                    >
                      <img
                        :src="step.icon"
                        alt="Icon"
                        class="w-full lg:h-full xl:h-full object-contain object-top"
                      />
                    </div>
                  </div>
                  <div class="flex flex-col w-[90%] h-auto gap-y-3">
                    <div class="w-full h-auto">
                      <p class="text-[#195279] dark:text-white xl:text-[21px]">
                        {{ step.title }}
                      </p>
                    </div>
                    <div class="w-full h-auto leading-relaxed">
                      <p class="text-[#195279] dark:text-white xl:text-[19px]">
                        {{ step.description }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>

      <div class="w-full h-auto sml:h-[350px] lg:w-full lg:h-full flex">
        <video
          autoplay
          loop
          muted
          playsinline
          @contextmenu.prevent
          class="w-full h-full object-cover object-center rounded-3xl dark:hidden"
        >
          <source src="@/assets/videos/Step.mp4" type="video/mp4" />
        </video>
        <video
          autoplay
          loop
          muted
          playsinline
          @contextmenu.prevent
          class="w-full h-full object-cover object-center rounded-3xl hidden dark:block"
        >
          <source src="@/assets/videos/Dark_Step.mp4" type="video/mp4" />
        </video>
        <!-- <NetworkDiagram /> -->
      </div>
    </div>
  </div>
</template>
<style scoped>
:deep(.custom-swiper .swiper-pagination-vertical) {
  left: 0px !important;
  right: auto !important;
}

:deep(.swiper-pagination-bullet) {
  margin: 16px 0 !important; /* Atur jarak antar bullet */
}
</style>
