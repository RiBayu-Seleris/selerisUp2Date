<script setup>
// import Herosection from "@/components/Home/Herosection.vue";
// import PartnersClients from "@/components/Home/PartnersClients.vue";
// import PartnersClientsMobile from "@/components/Home/PartnersClientsMobile.vue";
// import Description from "@/components/Description.vue";
// import AiDesc from "@/components/Home/AiDesc.vue";
// import Technology from "@/components/Home/Technology.vue";
// import Certificate from "@/components/Certificate.vue";
// import Benefits from "@/components/Home/Benefits.vue";
// import Testimonial from "@/components/Home/Testimonial.vue";
// import Blogs from "@/components/Home/Blogs.vue";
// import Different from "@/components/Home/Different.vue";
// import Roadmap from "@/components/Home/Roadmap.vue";

import { defineAsyncComponent } from "vue";

const Herosection = defineAsyncComponent(
  () => import("@/components/Home/Herosection.vue"),
);
const PartnersClients = defineAsyncComponent(
  () => import("@/components/Home/PartnersClients.vue"),
);
const PartnersClientsMobile = defineAsyncComponent(
  () => import("@/components/Home/PartnersClientsMobile.vue"),
);
const Description = defineAsyncComponent(
  () => import("@/components/Description.vue"),
);
const AiDesc = defineAsyncComponent(
  () => import("@/components/Home/AiDesc.vue"),
);
const Technology = defineAsyncComponent(
  () => import("@/components/Home/Technology.vue"),
);
const Certificate = defineAsyncComponent(
  () => import("@/components/Certificate.vue"),
);
const Benefits = defineAsyncComponent(
  () => import("@/components/Home/Benefits.vue"),
);
const Testimonial = defineAsyncComponent(
  () => import("@/components/Home/Testimonial.vue"),
);
const Blogs = defineAsyncComponent(() => import("@/components/Home/Blogs.vue"));
const Different = defineAsyncComponent(
  () => import("@/components/Home/Different.vue"),
);
</script>

<template>
  <section class="relative flex w-full h-auto px-8 xls:px-8 2xls:px-0">
    <Herosection />
  </section>

  <!-- max-w-[1440px] mx-auto -->
  <section class="hidden lg:flex w-full h-auto">
    <PartnersClients />
  </section>

  <section class="lg:hidden flex w-full h-auto">
    <PartnersClientsMobile />
  </section>

  <section class="flex flex-col relative w-full h-auto mt-10 md:mt-10 lg:mt-24">
    <Certificate />
  </section>

  <section
    class="flex flex-col relative w-full h-auto mt-14 lg:mt-20 xl:mt-28 px-8 xls:px-8"
  >
    <Description />
  </section>

  <section
    class="flex flex-col relative w-full h-auto mt-14 sm:mt-14 md:mt-24 xl:mt-28"
  >
    <Benefits />
  </section>

  <section
    class="flex flex-col relative w-full h-auto mt-24 lg:mt-10 px-8 xl:mt-28"
  >
    <AiDesc />
  </section>

  <section
    class="flex flex-col relative w-full h-auto mt-24 lg:mt-10 px-8 xl:mt-28"
  >
    <Technology />
  </section>

  <section class="flex flex-col relative w-full h-auto mt-24 xl:mt-32 mb-10">
    <Testimonial />
  </section>

  <section class="flex flex-col relative w-full h-auto mt-24 xl:mt-32 mb-10">
    <Blogs />
  </section>

  <section
    class="flex flex-col relative w-full h-auto px-8 xls:px-8 2xls:px-0 mt-24"
  >
    <Different />
  </section>

  <!-- <section class="flex flex-col relative w-full h-auto my-20">
    <Roadmap />
  </section> -->
</template>
