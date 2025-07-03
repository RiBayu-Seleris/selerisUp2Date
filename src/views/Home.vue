<script setup>
import Banner from "@/assets/images/Hero2.png";

import Herosection from "@/components/Herosection.vue";
import Description from "@/components/Description.vue";
import AiDesc from "@/components/AiDesc.vue";
import Certificate from "@/components/Certificate.vue";
import Benefits from "@/components/Benefits.vue";
import Products from "@/components/Products.vue";
import Different from "@/components/Home/Different.vue";
import Partners from "@/components/Partners.vue";
import Clients from "@/components/Clients.vue";
</script>

<template>
  <section class="px-8">
    <Herosection />
  </section>

  <section class="flex flex-col relative w-full h-auto px-8">
    <Description />
  </section>
  <section
    class="flex flex-col relative w-full h-auto px-8"
    data-aos="fade-right"
    data-aos-delay="300"
  >
    <AiDesc />
  </section>
  <section
    class="flex flex-col relative w-full lg:h-[100vh] md:mt-10 lg:mt-20 py-20 lg:py-0 bg-cert bg-no-repeat bg-cover bg-center"
    data-aos="fade-left"
    data-aos-delay="300"
  >
    <Certificate />
  </section>
  <section class="flex flex-col relative w-full h-auto px-6 lg:px-16 lg:mt-16">
    <Benefits />
  </section>
  <!-- <section class="flex relative w-full h-auto px-8 mt-10">
    <Products />
  </section> -->
  <section class="flex flex-col relative w-full h-auto">
    <Different />
  </section>
  <section class="flex flex-col relative w-full h-auto">
    <Partners />
  </section>
  <section class="flex flex-col relative w-full h-auto">
    <Clients />
  </section>
</template>
