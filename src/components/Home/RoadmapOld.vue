<script setup>
import LineRoadmap from "@/components/icons/LineRoadmap.vue";

import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination } from "swiper/modules";

const modules = [Navigation, Pagination];

const timelineData = [
  {
    year: 2023,
    quarter: "full",
    title: "Seleris Lifins",
    subtitle: "Individual life insurance, group policies",
    logo: new URL(
      "@/assets/images/RoadmapLogo/Lifins-Logo.png",
      import.meta.url
    ).href,
  },
  {
    year: 2024,
    quarter: "Q-1",
    title: "Seleris Credit Cover",
    subtitle: "Credit life insurance, loan protection",
    logo: new URL("@/assets/images/RoadmapLogo/cc-Logo.png", import.meta.url)
      .href,
  },
  {
    year: 2024,
    quarter: "Q-2",
    title: "Seleris Medins",
    subtitle: "Health insurance, corporate benefits",
    logo: new URL(
      "@/assets/images/RoadmapLogo/Medins-Logo.png",
      import.meta.url
    ).href,
  },
  {
    year: 2025,
    quarter: "Q-1",
    title: "Seleris Care",
    subtitle: "Corporate health screening, wellness programs",
    logo: new URL("@/assets/images/RoadmapLogo/Care-Logo.png", import.meta.url)
      .href,
  },
  {
    year: 2025,
    quarter: "Q-2",
    title: "Seleris Cough",
    subtitle: "COVID screening, TB detection, workplace safety",
    logo: new URL("@/assets/images/RoadmapLogo/cc.png", import.meta.url).href,
  },
  {
    year: 2025,
    quarter: "Q-3",
    title: "Seleris Auto Claim",
    subtitle: "Credit life insurance, loan protection",
    logo: new URL("@/assets/images/RoadmapLogo/cc.png", import.meta.url).href,
  },
];

const paginationOptions = {
  el: ".custom-pagination2",
  clickable: true,
  renderBullet: (index, className) => {
    const item = timelineData[index];
    return `
      <span class="${className} custom-bullet">
        ${item.year}
      </span>
    `;
  },
};
</script>
<template>
  <div class="flex flex-col relative w-full py-10 mb-10">
    <div class="flex flex-col gap-3">
      <div class="flex w-full h-auto justify-center items-center">
        <p
          class="sml:text-2xl md:text-[27px] lg:text-[27px] font-[500] text-[#1DC457] dark:text-[#1AB24F] text-center"
        >
          Innovation
        </p>
      </div>
      <div
        class="flex lg:w-[50%] mx-auto h-auto justify-center items-center text-center"
      >
        <p
          class="sml:text-xl md:text-[32px] lg:text-[32px] font-[400] text-[#195279] dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-br dark:from-[#FAFAFA] dark:via-[#D4D4D4] dark:to-[#AAAAAA] md:leading-relaxed"
        >
          Roadmap Seleris Meditekno Internasional
        </p>
      </div>
    </div>

    <div class="relative w-full h-auto overflow-x-auto mt-10">
      <!-- Custom pagination -->
      <img
        src="@/assets/images/frame-wave.png"
        alt=""
        srcset=""
        class="absolute bottom-0"
      />
      <Swiper
        :modules="modules"
        :navigation="false"
        :pagination="paginationOptions"
        :slidesPerView="3"
        :spaceBetween="150"
        :centeredSlides="false"
        class="w-full absolute mb-[0px] xl:mb-[80px]"
      >
        <SwiperSlide v-for="(timeline, index) in timelineData" :key="index">
          <div
            class="flex flex-col items-center cursor-grab active:cursor-grabbing"
          >
            <!-- Logo -->
            <!-- <img
              :src="timeline.logo"
              alt="logo"
              class="w-[150px] h-full object-contain mb-4"
            /> -->

            <!-- Title & Subtitle -->
            <div class="w-full h-auto flex flex-col mb-5">
              <h3 class="lg:text-[27px] font-[500] text-center">
                {{ timeline.title }}
              </h3>
              <p class="lg:text-[17px] text-center text-gray-500 px-10">
                {{ timeline.subtitle }}
              </p>
            </div>

            <!-- Line Vertical -->
            <LineRoadmap />

            <div
              class="w-12 h-12 flex rounded-full justify-center items-center mt-2 bg-gradient-to-r from-[#2C43B7] to-[#50B6EE] mb-4"
            >
              <p class="text-sm text-center text-white">
                {{ timeline.quarter }}
              </p>
            </div>
          </div>
        </SwiperSlide>
        <!-- masukkan tahun pada nav pagination -->
        <div
          class="flex flex-row custom-pagination2 mt-20 justify-center gap-x-10"
        />
      </Swiper>
    </div>
  </div>
</template>
