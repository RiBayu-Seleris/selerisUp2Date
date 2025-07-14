<script setup>
import TestimonialCard from "@/components/reusable/TestimonialCard.vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

const modules = [Navigation, Pagination, Autoplay];

const testimonials = [
  {
    name: "Dazzle Healer",
    position: "Head of Technology at CHUUB",
    text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ullamcorper mattis lorem non. Ultrices praesent amet ipsum justo massa. Eu dolor aliquet risus gravida nunc at feugiat consequat purus. Non massa enim vitae duis mattis. Vel in ultricies vel fringilla.`,
  },
  {
    name: "Jane Smith",
    position: "Design Lead at KREATIF",
    text: `Aliquam erat volutpat. Suspendisse potenti. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.`,
  },
  {
    name: "John Doe",
    position: "Product Manager at HALO",
    text: `Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.`,
  },
];
</script>

<template>
  <div class="flex flex-col">
    <div class="relative flex flex-col w-full h-auto px-8 gap-y-3">
      <div class="flex w-full h-auto">
        <p class="text-[#2AB857] font-[500] text-[21px]">Client Feedback</p>
      </div>
      <div class="flex w-full h-auto">
        <p class="text-[#195279] font-[500] text-[34px]">
          What they say after using our product
        </p>
      </div>
    </div>
    <div class="relative w-full h-auto group mt-4">
      <Swiper
        :modules="modules"
        :navigation="false"
        :pagination="{ el: '.custom-pagination', clickable: true }"
        :autoplay="{ delay: 3000, disableOnInteraction: false }"
        loop
        class="w-full max-w-[1440px] cursor-grab active:cursor-grabbing"
      >
        <SwiperSlide
          v-for="(item, index) in testimonials"
          :key="index"
          class="px-8"
        >
          <TestimonialCard
            :name="item.name"
            :position="item.position"
            :text="item.text"
          />
        </SwiperSlide>
      </Swiper>

      <!-- Custom pagination -->
      <div class="custom-pagination mt-8 flex justify-center gap-2"></div>
    </div>
  </div>
</template>
