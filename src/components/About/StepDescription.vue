<script setup>
import { useIsDark } from "@/utils/useIsDark";
import { useLocalizedList } from "@/utils/i18nList";

import Innovation from "@/assets/icons/innovation.svg";
import Vision from "@/assets/icons/vision.svg";
import TeamWork from "@/assets/icons/team-work.svg";
import Integrity from "@/assets/icons/integrity.svg";
import Focus from "@/assets/icons/focus.svg";
import OptimalPerformance from "@/assets/icons/performance.svg";

import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { ref, onMounted, onUnmounted, watch } from "vue"; // ← Tambahkan ini!

const StepsContent = [
  { icon: Innovation },
  { icon: OptimalPerformance },
  { icon: TeamWork },
  { icon: Integrity },
  { icon: Focus },
  { icon: Vision },
];

// Teks diambil dari file locale
const localizedSteps = useLocalizedList("about.values.items", StepsContent, [
  "title",
  "description",
]);

onMounted(() => {
  const video = document.querySelector("video");
  if (video) {
    video.addEventListener("contextmenu", (e) => e.preventDefault());
  }
});

// Dipakai di template: video mode terang pakai v-if="!isDark", yang gelap
// pakai v-else. Tujuannya supaya cuma satu video yang benar-benar dibuat
// dan diunduh browser. Penjelasan lengkap ada di src/utils/useIsDark.js
const isDark = useIsDark();
</script>

<template>
  <div class="w-full h-full dark:bg-[#17181A]">
    <div
      class="flex flex-col-reverse md:flex-row w-full h-auto gap-x-10 relative"
    >
      <div class="flex flex-col w-full h-auto gap-y-7 lg:gap-y-4 xl:gap-y-10">
        <div
          class="w-full h-auto flex flex-col gap-y-1.5 sm:gap-y-3 xl:gap-y-3"
        >
          <div class="flex w-full h-auto justify-center md:justify-start">
            <p
              class="text-[17px] sm:text-[22px] md:text-[17px] lg:text-[21px] xl:text-[30px] text-[#1AB24F]"
            >
              {{ $t("about.values.eyebrow") }}
            </p>
          </div>
          <div
            class="flex w-full h-auto lg:pr-16 xl:pr-20 justify-center md:justify-start"
          >
            <p
              class="text-[18px] sm:text-[28px] lg:text-[26px] xl:text-[46px] text-[#195279] leading-[30px] lg:leading-normal xl:leading-[55px] dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-br dark:from-[#FAFAFA] dark:via-[#D4D4D4] dark:to-[#AAAAAA]"
            >
              {{ $t("about.values.title1") }}
              <span class="inline md:block">{{
                $t("about.values.visionTagline")
              }}</span>
            </p>
          </div>
          <div class="flex w-full h-auto justify-center md:justify-start">
            <p
              class="text-center md:text-start text-[12px] sm:text-[16px] lg:text-[14px] xl:text-[17px] text-[#89A6BA] xl:leading-relaxed lg:pr-20 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-br dark:from-[#FAFAFA] dark:via-[#D4D4D4] dark:to-[#AAAAAA]"
            >
              {{ $t("about.values.title2") }}
              <br class="hidden md:block xl:hidden" />
              {{ $t("about.values.title3") }}
              <br class="hidden xl:block" />
              {{ $t("about.values.humanFocused") }}
            </p>
          </div>
        </div>
        <div class="h-[120px] lg:h-[170px] w-full flex items-center">
          <Swiper
            :modules="[Navigation, Autoplay, Pagination]"
            :direction="'vertical'"
            :navigation="false"
            :pagination="false"
            :autoplay="{ delay: 2000, disableOnInteraction: false }"
            loop
            class="w-full h-full rounded-xl overflow-hidden custom-swiper cursor-grab active:cursor-grabbing"
          >
            <SwiperSlide v-for="(step, index) in localizedSteps" :key="index">
              <div
                class="w-full h-full flex flex-row items-center text-white text-xl"
              >
                <div class="flex flex-row text-white text-xl space-x-5">
                  <div class="flex lg:[15%] xl:w-[10%]">
                    <div
                      class="flex bg-white dark:bg-[#323232] rounded-full shadow-md p-1.5 sm:p-2 md:p-1 xl:p-2 w-[50px] h-[50px] md:w-[45px] md:h-[45px] lg:w-[45px] lg:h-[45px] xl:w-[60px] xl:h-[60px] justify-center md:mt-2 lg:mt-0"
                    >
                      <img
                        :src="step.icon"
                        alt="Icon"
                        class="w-full lg:h-full xl:h-full object-contain object-center"
                      />
                    </div>
                  </div>
                  <div
                    class="flex flex-col lg:w-[85%] xl:w-[90%] h-auto gap-y-1 lg:gap-y-2 xl:gap-y-3"
                  >
                    <div class="w-full h-auto">
                      <p
                        class="text-[#195279] dark:text-white text-[14px] sm:text-[16px] lg:text-[18px] xl:text-[22px]"
                      >
                        {{ step.title }}
                      </p>
                    </div>
                    <div class="w-full h-auto leading-relaxed">
                      <p
                        class="text-[#195279] dark:text-white text-[10px] sm:text-[14px] lg:text-[14px] xl:text-[19px]"
                      >
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

      <div class="w-full h-full flex mb-6 md:mb-0">
        <video
          v-if="!isDark"
          autoplay
          loop
          muted
          playsinline
          @contextmenu.prevent
          class="w-full h-full sm:w-full sm:h-[400px] md:w-full md:h-full object-contain lg:object-cover object-center rounded-3xl"
        >
          <source src="@/assets/videos/Step.mp4" type="video/mp4" />
        </video>
        <video
          v-else
          autoplay
          loop
          muted
          playsinline
          @contextmenu.prevent
          class="w-full h-full sm:w-full sm:h-[400px] md:w-full md:h-full object-contain lg:object-cover object-center rounded-3xl"
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
  margin: 16px 0 !important;
}
</style>
