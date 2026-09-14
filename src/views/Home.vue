<script setup>
import Herosection from "@/components/Home/Herosection.vue";
import PartnersClients from "@/components/Home/PartnersClients.vue";
import PartnersClientsMobile from "@/components/Home/PartnersClientsMobile.vue";
import Description from "@/components/Description.vue";
import AiDesc from "@/components/Home/AiDesc.vue";
import Technology from "@/components/Home/Technology.vue";
import Solutions from "@/components/Home/Solutions.vue";
import Certificate from "@/components/Certificate.vue";
import Supported from "@/components/Supported.vue";
import Benefits from "@/components/Home/Benefits.vue";
import Testimonial from "@/components/Home/Testimonial.vue";
import Blogs from "@/components/Home/Blogs.vue";
import Different from "@/components/Home/Different.vue";
import FaceTracker from "@/components/Home/FaceTracker.vue";
// import Roadmap from "@/components/Home/Roadmap.vue";
</script>

<template>
  <section class="relative flex w-full h-auto px-8 xls:px-8 2xls:px-0">
    <Herosection />
  </section>

  <section data-aos="fade-up" class="hidden lg:flex w-full h-auto">
    <PartnersClients />
  </section>

  <section data-aos="fade-up" class="lg:hidden flex w-full h-auto">
    <PartnersClientsMobile />
  </section>

  <section
    data-aos="zoom-in"
    class="flex flex-col relative w-full h-auto mt-10 md:mt-10 lg:mt-24"
  >
    <Certificate />
  </section>

  <section
    data-aos="fade-up"
    class="flex flex-col relative w-full h-auto mt-10 md:mt-10 lg:mt-24"
  >
    <Supported />
  </section>

  <section
    data-aos="fade-up"
    class="flex flex-col relative w-full h-auto mt-10 lg:mt-14 xl:mt-0 px-8 xls:px-8"
  >
    <Description />
  </section>

  <section
    data-aos="fade-left"
    class="flex flex-col relative w-full h-auto mt-10 sm:mt-10 md:mt-16 xl:mt-16"
  >
    <Benefits />
  </section>

  <section
    class="flex flex-col relative w-full h-auto mt-24 lg:mt-10 px-8 xl:mt-28"
  >
    <AiDesc />
  </section>

  <section
    data-aos="fade-up"
    class="flex flex-col relative w-full h-auto mt-24 lg:mt-10 px-8 xl:mt-28"
  >
    <Technology />
  </section>

  <section
    data-aos="fade-up"
    class="flex relative w-full h-auto mt-24 lg:mt-10 xl:mt-28"
  >
    <FaceTracker />
  </section>

  <section class="flex flex-col relative w-full h-auto mt-24 lg:mt-10 xl:mt-36">
    <Solutions />
  </section>

  <section
    data-aos="fade-up"
    class="flex flex-col relative w-full h-auto mt-24 xl:mt-32 mb-10"
  >
    <Testimonial />
  </section>

  <section class="flex flex-col relative w-full h-auto mt-24 xl:mt-32 mb-10">
    <Blogs />
  </section>

  <section
    data-aos="fade-up"
    class="flex flex-col relative w-full h-auto px-8 xls:px-8 2xls:px-0 mt-24"
  >
    <Different />
  </section>

  <!-- <section
    data-aos="fade-up" class="flex flex-col relative w-full h-auto my-20">
    <Roadmap />
  </section> -->
</template>
