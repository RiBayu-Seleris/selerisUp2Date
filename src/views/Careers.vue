<script setup>
import HeroSection from "@/components/Careers/HeroSection.vue";
// import CareerList from "@/components/Careers/CareerList.vue";
</script>

<template>
  <section class="flex relative w-full h-auto md:px-12 xl:px-14">
    <HeroSection />
  </section>

  <section
    class="flex flex-col relative w-full h-auto xl:px-16 mt-10 lg:mt-8 mb-20"
  >
    <CareerList />
  </section>
</template>
