<script setup>
import Hero from "@/components/About/Hero.vue";
import DescAbout from "@/components/About/DescAbout.vue";
import Description from "@/components/Description.vue";
import StepDescription from "@/components/About/StepDescription.vue";
import Certificate from "@/components/Certificate.vue";
import Deliver from "@/components/About/Deliver.vue";

import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { ref, onMounted, onUnmounted, watch } from "vue"; // ← Tambahkan ini!
// import { useScrollStore } from "@/stores/scroll";
import { useSidebarStore } from "@/stores/sidebar";
</script>

<template>
  <section class="flex flex-col relative w-full h-auto lg:px-20">
    <Hero />
  </section>

  <!-- data-aos="fade-in"
    data-aos-duration="2000" -->
  <section class="flex flex-col relative w-full h-auto px-8 mt-28">
    <DescAbout />
  </section>

  <!-- data-aos="fade-left"
    data-aos-duration="3000" -->
  <section class="flex flex-col relative w-full h-auto px-8 lg:mt-10 xl:mt-10">
    <Description />
  </section>

  <!-- data-aos="fade-up"
    data-aos-easing="ease-out-cubic"
    data-aos-duration="2000" -->
  <section
    class="flex flex-col relative w-full md:mt-10 lg:mt-10 xl:mt-20 pt-4 pb-8 lg:pt-0 lg:pb-0"
  >
    <!-- bg-cert bg-no-repeat bg-cover bg-center -->
    <Certificate />
  </section>
  <!-- Section Step -->
  <!-- <section class="flex w-full h-auto mt-10 relative justify-center"> -->
  <!-- data-aos="fade-left"
    data-aos-duration="3000" -->
  <section
    class="flex relative w-full xl:h-[100vh] lg:h-[80vh] pb-8 lg:pb-0 px-8 lg:px-20"
  >
    <StepDescription />
  </section>

  <section class="flex flex-col relative w-full h-auto px-8">
    <Deliver />
  </section>
</template>
