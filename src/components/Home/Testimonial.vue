<script setup>
import TestimonialCard from "@/components/reusable/TestimonialCard.vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

const modules = [Navigation, Pagination, Autoplay];

const testimonials = [
  {
    name: "Michael Tan",
    position: "Vice President, Digital Innovation at Chubb Life",
    text: `Seleris has significantly streamlined our customer risk assessment process.
    With facial video analysis powered by AI, we’re able to evaluate applications faster,
    more accurately, and with far less friction especially for life insurance products.
    It’s a game-changer in digital transformation.`,
  },
  {
    name: "Ari Wibowo",
    position: "Head of Digital Services - Jamkrida Banten",
    text: `Seleris has helped us modernize the way we evaluate individuals.
    The facial video-based system is fast, accurate, and easy to integrate with our existing workflows.
    What we value most is how seamless the process is no manual steps, no lengthy interviews.
    It's a reliable solution that supports our digital transformation goals.`,
  },
  {
    name: "Dewi Lestari",
    position: "VP of Operations - FPG Insurance Indonesia",
    text: `Partnering with Seleris has significantly improved our customer evaluation process.
    The AI-driven facial video technology gives us a faster, smarter way to assess individuals with minimal friction.
    Integration was smooth, and the support team has been responsive and professional.`,
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
  <div class="flex flex-col">
    <div class="relative flex flex-col w-full h-auto px-8 lg:px-16 gap-y-3">
      <div class="flex w-full h-auto">
        <p
          class="text-[#2AB857] font-[500] text-[21px] sml:text-[19px] lg:text-[21px]"
        >
          Client Feedback
        </p>
      </div>
      <div class="flex w-full h-auto">
        <p
          class="text-[#195279] font-[500] text-[24px] sml:text-[20px] lg:text-[34px] dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-br dark:from-[#FAFAFA] dark:via-[#D4D4D4] dark:to-[#AAAAAA]"
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
          class="px-8 lg:px-16"
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
