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
  <section class="px-8 pt-5">
    <Herosection />
  </section>

  <section
    class="hidden lg:flex w-full h-auto"
    data-aos="fade-down"
    data-aos-duration="2000"
  >
    <PartnersClients />
  </section>
  <section
    class="lg:hidden flex w-full h-auto"
    data-aos="fade-down"
    data-aos-duration="2000"
  >
    <PartnersClientsMobile />
  </section>

  <section
    class="flex flex-col relative w-full xl:h-[100vh] lg:h-[80vh] md:mt-10 lg:mt-10 pt-4 pb-8 lg:pt-0 lg:pb-0"
    data-aos="fade-up"
    data-aos-easing="ease-out-cubic"
    data-aos-duration="2000"
  >
    <!-- bg-cert bg-no-repeat bg-cover bg-center -->
    <Certificate />
  </section>

  <section
    class="flex flex-col relative w-full h-auto xl:px-8 lg:mt-10 xl:mt-0"
    data-aos="fade-left"
    data-aos-duration="3000"
  >
    <Description />
  </section>

  <section
    class="flex flex-col relative w-full h-auto mt-16"
    data-aos="fade-right"
    data-aos-duration="3000"
  >
    <Benefits />
  </section>

  <section
    class="flex flex-col relative w-full h-auto px-12 mt-10"
    data-aos="fade-down"
    data-aos-easing="linear"
    data-aos-duration="1000"
  >
    <AiDesc />
  </section>

  <section class="flex flex-col relative w-full h-auto">
    <Different />
  </section>
</template>
