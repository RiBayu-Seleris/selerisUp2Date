<script setup>
import LineRoadmap from "@/components/icons/LineRoadmap.vue";
import Wave from "@/components/icons/Wave.vue";

import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination } from "swiper/modules";

const modules = [Navigation, Pagination];

import { roadmapData } from "@/Data/RoadmapData";

const paginationOptions = {
  el: ".custom-pagination2",
  clickable: true,
  renderBullet: (index, className) => {
    const item = roadmapData[index];
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
          class="text-2xl md:text-[27px] lg:text-[27px] font-[500] text-[#1DC457] dark:text-[#1AB24F] text-center"
        >
          Innovation
        </p>
      </div>
      <div
        class="flex lg:w-[50%] mx-auto h-auto justify-center items-center text-center"
      >
        <p
          class="text-xl md:text-[32px] lg:text-[32px] font-[400] text-[#195279] dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-br dark:from-[#FAFAFA] dark:via-[#D4D4D4] dark:to-[#AAAAAA] md:leading-relaxed"
        >
          Roadmap Seleris Meditekno Internasional
        </p>
      </div>
    </div>

    <div
      class="relative w-full h-[500px] flex flex-row overflow-x-auto snap-x snap-mandatory hide-scrollbar mt-10"
    >
      <div class="relative w-full h-full snap-start shrink-0">
        <div class="w-full h-[50%] absolute bottom-0">
          <Wave />
        </div>
        <div class="w-full h-[50%] absolute top-0"></div>
      </div>
      <div class="relative w-full h-full snap-start shrink-0">
        <div class="w-full h-[50%] absolute bottom-0">
          <Wave class="scale-x-[-1]" />
        </div>
        <div class="w-full h-[50%] absolute top-0"></div>
      </div>
      <div class="relative w-full h-full snap-start shrink-0">
        <div class="w-full h-[50%] absolute bottom-0">
          <Wave />
        </div>
        <div class="w-full h-[50%] absolute top-0"></div>
      </div>
    </div>
  </div>
</template>
