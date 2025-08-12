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
import Roadmap from "@/components/Home/Roadmap.vue";
</script>

<template>
  <section class="relative flex w-full h-auto px-8">
    <Herosection />
  </section>

  <!-- max-w-[1440px] mx-auto -->
  <section class="hidden lg:flex w-full h-auto">
    <PartnersClients />
  </section>

  <section class="lg:hidden flex w-full h-auto">
    <PartnersClientsMobile />
  </section>

  <section
    class="flex flex-col relative w-full h-auto md:mt-10 lg:mt-10 pt-4 pb-8 lg:pt-0 lg:pb-0"
  >
    <Certificate />
  </section>

  <section
    class="flex flex-col relative w-full h-auto lg:mt-20 2lg:mt-40 xl:mt-0 px-8"
  >
    <Description />
  </section>

  <section class="flex flex-col relative w-full h-auto mt-16">
    <Benefits />
  </section>

  <section
    class="flex flex-col relative w-full h-auto mt-10 lg:mt-10 xl:mt-10 px-8 lg:px-24"
  >
    <AiDesc />
  </section>

  <section class="flex flex-col relative w-full h-auto mt-40 sml:mt-24 mb-10">
    <Testimonial />
  </section>

  <section class="flex flex-col relative w-full h-auto px-8 my-20">
    <Different />
  </section>

  <!-- <section class="flex flex-col relative w-full h-auto my-20">
    <Roadmap />
  </section> -->
</template>
