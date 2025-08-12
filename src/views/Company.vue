<script setup>
import Hero from "@/components/About/Hero.vue";
import DescAbout from "@/components/About/DescAbout.vue";
import VisiMisi from "@/components/About/VisiMisi.vue";
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
  <section class="dark:hidden flex flex-col relative w-full h-auto md:px-20">
    <Hero />
  </section>

  <section
    class="dark:hidden flex flex-col relative w-full h-auto px-8 sml:mt-20 lg:mt-28"
  >
    <DescAbout />
  </section>

  <!-- DARK MODE -->
  <div class="hidden dark:flex dark:flex-col dark:w-full dark:h-auto">
    <section class="flex flex-col relative w-full h-auto md:px-20">
      <Hero />
    </section>

    <section
      class="flex flex-col relative w-full h-auto px-8 sml:mt-20 lg:mt-28"
    >
      <DescAbout />
    </section>
  </div>

  <section class="relative w-full h-auto lg:px-8 mt-20 lg:mt-28 xl:mt-40">
    <VisiMisi />
  </section>

  <section
    class="flex flex-col relative w-full h-auto px-8 mt-10 lg:mt-28 xl:mt-40"
  >
    <Description />
  </section>

  <section
    class="flex flex-col relative w-full md:mt-10 lg:mt-10 xl:mt-20 pt-4 pb-8 lg:pt-0 lg:pb-0"
  >
    <Certificate />
  </section>
  <!-- Section Step -->

  <section
    class="flex relative w-full h-auto pb-8 lg:pb-0 px-8 md:px-16 lg:px-20 sml:mb-20 md:mb-4 lg:mb-20 xl:mb-20"
  >
    <StepDescription />
  </section>

  <section class="flex flex-col relative w-full h-auto px-8">
    <Deliver />
  </section>
</template>
