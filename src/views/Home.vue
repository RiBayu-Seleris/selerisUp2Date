<script setup>
import Banner from "@/assets/images/Hero2.png";

import Herosection from "@/components/Home/Herosection.vue";
import PartnersClients from "@/components/Home/PartnersClients.vue";
import PartnersClientsMobile from "@/components/Home/PartnersClientsMobile.vue";
import Description from "@/components/Description.vue";
import AiDesc from "@/components/Home/AiDesc.vue";
import Certificate from "@/components/Certificate.vue";
import Benefits from "@/components/Home/Benefits.vue";
import Different from "@/components/Home/Different.vue";
</script>

<template>
  <section class="px-8">
    <Herosection />
  </section>

  <section class="hidden lg:flex w-full h-auto">
    <PartnersClients />
  </section>
  <section class="lg:hidden flex w-full h-auto">
    <PartnersClientsMobile />
  </section>

  <section
    class="flex flex-col relative w-full lg:h-[100vh] md:mt-10 lg:mt-10 pt-4 pb-8 lg:pt-0 lg:pb-0 bg-cert bg-no-repeat bg-cover bg-center"
    data-aos="fade-left"
    data-aos-delay="100"
  >
    <Certificate />
  </section>

  <section class="flex flex-col relative w-full h-auto px-8">
    <Description />
  </section>

  <section class="flex flex-col relative w-full h-auto lg:mt-16">
    <Benefits />
  </section>

  <section
    class="flex flex-col relative w-full h-auto px-12"
    data-aos="fade-right"
    data-aos-delay="300"
  >
    <AiDesc />
  </section>

  <section class="flex flex-col relative w-full h-auto">
    <Different />
  </section>
</template>
