<script setup>
import TestimonialCard from "@/components/reusable/TestimonialCard.vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

const modules = [Navigation, Pagination, Autoplay];

const testimonials = [
  {
    name: "Edhie Mulyono",
    position: "Technical Director - PT Asuransi FPG Indonesia",
    text: `Seleris empowers FPG's technical team with health data insights that were previously inaccessible. 
    Its ability to process medical big data,  predict chronic claim patterns, 
    and identify high-risk exposures has optimized our health insurance underwriting. 
    This is the new foundation for sustainable growth in the industry's most dynamic segment`,
  },
  {
    name: "Edhie Mulyono",
    position: "Technical Director - PT Asuransi FPG Indonesia",
    text: `Seleris empowers FPG's technical team with health data insights that were previously inaccessible. 
    Its ability to process medical big data,  predict chronic claim patterns, 
    and identify high-risk exposures has optimized our health insurance underwriting. 
    This is the new foundation for sustainable growth in the industry's most dynamic segment`,
  },
  {
    name: "Edhie Mulyono",
    position: "Technical Director - PT Asuransi FPG Indonesia",
    text: `Seleris empowers FPG's technical team with health data insights that were previously inaccessible. 
    Its ability to process medical big data,  predict chronic claim patterns, 
    and identify high-risk exposures has optimized our health insurance underwriting. 
    This is the new foundation for sustainable growth in the industry's most dynamic segment`,
  },
];
</script>

<template>
  <div class="flex flex-col dark:bg-[#17181A]">
    <div
      class="relative flex flex-col w-full h-auto px-8 lg:px-12 xl:px-16 gap-y-3"
    >
      <div class="flex w-full h-auto">
        <p class="text-[#2AB857] font-[500] text-[18px] lg:text-[20px]">
          Client Feedback
        </p>
      </div>
      <div class="flex w-full h-auto">
        <p
          class="text-[#195279] font-[500] text-[20px] lg:text-[34px] dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-br dark:from-[#FAFAFA] dark:via-[#D4D4D4] dark:to-[#AAAAAA]"
        >
          What they say after using our product
        </p>
      </div>
    </div>
    <div class="relative w-full h-auto group mt-6">
      <Swiper
        :modules="modules"
        :navigation="false"
        :pagination="{ el: '.custom-pagination', clickable: true }"
        :autoplay="{ delay: 3000, disableOnInteraction: false }"
        loop
        class="w-full"
      >
        <SwiperSlide
          v-for="(item, index) in testimonials"
          :key="index"
          class="px-8 lg:px-12 xl:px-16"
        >
          <TestimonialCard
            :name="item.name"
            :position="item.position"
            :text="item.text"
            class="cursor-grab active:cursor-grabbing"
          />
        </SwiperSlide>
      </Swiper>

      <!-- Custom pagination -->
      <div class="custom-pagination mt-4 flex justify-center gap-2"></div>
    </div>
  </div>
</template>
