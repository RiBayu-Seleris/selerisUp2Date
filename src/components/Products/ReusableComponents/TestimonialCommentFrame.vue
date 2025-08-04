<script setup>
import TestimonialCard from "@productComponents/TestimonialCard.vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const modules = [Navigation, Pagination, Autoplay];

defineProps({
  Testimonials: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <div class="w-full h-auto hidden lg:flex lg:flex-col">
    <Swiper
      :modules="modules"
      :navigation="false"
      :pagination="{ el: '.custom-pagination', clickable: true }"
      :autoplay="{ delay: 3000, disableOnInteraction: false }"
      loop
      :slides-per-view="1"
      class="w-full h-auto mt-8 cursor-grab active:cursor-grabbing"
    >
      <!-- Bagi data menjadi grup 4 per slide -->
      <SwiperSlide
        v-for="(group, i) in Math.ceil(Testimonials.length / 4)"
        :key="i"
      >
        <div class="grid grid-cols-2 gap-x-10 gap-y-8 px-8">
          <TestimonialCard
            v-for="(testimonial, j) in Testimonials.slice(i * 4, i * 4 + 4)"
            :key="j"
            :comment="testimonial.comment"
            :authorName="testimonial.authorName"
            :authorPosition="testimonial.authorPosition"
          />
        </div>
      </SwiperSlide>
      <!-- Custom pagination -->
      <div class="custom-pagination md:mt-8 flex justify-center gap-2" />
    </Swiper>
  </div>
  <!-- Mobile Testimonials -->
  <div class="w-full h-auto flex flex-col lg:hidden">
    <!-- :pagination="{ el: '.custom-pagination', clickable: true }" -->
    <Swiper
      :modules="modules"
      :navigation="false"
      :slides-per-view="1"
      :pagination="{ el: '.custom-pagination', clickable: true }"
      :autoplay="{ delay: 3000, disableOnInteraction: false }"
      loop
      class="w-full h-auto cursor-grab active:cursor-grabbing mt-4 md:mt-8"
    >
      <SwiperSlide
        v-for="(testimonial, index) in Testimonials"
        :key="index"
        class="px-8 py-5"
      >
        <TestimonialCard
          :comment="testimonial.comment"
          :authorName="testimonial.authorName"
          :authorPosition="testimonial.authorPosition"
        />
      </SwiperSlide>
      <!-- Custom pagination -->
      <div class="custom-pagination mt-4 flex justify-center gap-2" />
    </Swiper>
  </div>
</template>
