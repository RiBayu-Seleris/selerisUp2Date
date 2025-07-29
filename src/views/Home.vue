<script setup>
import Banner from "@/assets/images/Hero2.png";

import Herosection from "@/components/Home/Herosection.vue";
import PartnersClients from "@/components/Home/PartnersClients.vue";
import PartnersClientsMobile from "@/components/Home/PartnersClientsMobile.vue";
import Description from "@/components/Description.vue";
import AiDesc from "@/components/Home/AiDesc.vue";
import Certificate from "@/components/Certificate.vue";
import Benefits from "@/components/Home/Benefits.vue";
import Testimonial from "@/components/Home/Testimonial.vue";
import Different from "@/components/Home/Different.vue";
</script>

<template>
    <section class="relative flex w-full h-auto px-8">
      <Herosection />
    </section>

  <!-- data-aos="fade-down"
    data-aos-duration="2000" -->
  <section class="hidden lg:flex w-full max-w-[1440px] mx-auto h-auto">
    <PartnersClients />
  </section>
  <!-- data-aos="fade-down"
    data-aos-duration="2000" -->
  <section class="lg:hidden flex w-full max-w-[1440px] mx-auto h-auto">
    <PartnersClientsMobile />
  </section>

  <!-- data-aos="fade-up"
    data-aos-easing="ease-out-cubic"
    data-aos-duration="2000" -->
  <section
    class="flex flex-col relative w-full h-auto max-w-[1440px] mx-auto md:mt-10 lg:mt-10 pt-4 pb-8 lg:pt-0 lg:pb-0"
  >
    <!-- bg-cert bg-no-repeat bg-cover bg-center -->
    <Certificate />
  </section>

  <!-- data-aos="fade-left"
    data-aos-duration="3000" -->
  <!-- xl:px-8 md:px-12 lg:px-12 -->
  <section
    class="flex flex-col relative w-full max-w-[1440px] mx-auto h-auto lg:mt-20 2lg:mt-40 xl:mt-0 px-8"
  >
    <Description />
  </section>

  <!-- data-aos="fade-right"
    data-aos-duration="3000" -->
  <section
    class="flex flex-col relative w-full max-w-[1440px] mx-auto h-auto mt-16"
  >
    <Benefits />
  </section>

  <!-- data-aos="fade-down"
    data-aos-easing="linear"
    data-aos-duration="1000" -->
  <!-- px-8 2lg:px-28 xl:px-28 -->
  <section
    class="flex flex-col relative w-full max-w-[1440px] mx-auto h-auto mt-10 lg:mt-10 xl:mt-10 px-8 lg:px-24"
  >
    <AiDesc />
  </section>

  <section
    class="flex flex-col relative w-full max-w-[1440px] mx-auto h-auto mt-40 sml:mt-24 mb-10"
  >
    <Testimonial />
  </section>

  <section
    class="flex flex-col relative w-full max-w-[1440px] mx-auto h-auto px-8 my-20"
  >
    <Different />
  </section>
</template>
