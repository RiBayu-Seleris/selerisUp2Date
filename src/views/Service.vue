<script setup>
import HeroSection from "@/components/Service/HeroSection.vue";
import ApiService from "@/components/Service/ApiService.vue";
import Benefit from "@/components/Service/Benefit.vue";
import GetStarted from "@/components/Service/GetStarted.vue";
</script>

<template>
  <section class="flex relative w-full h-auto md:px-12 xl:px-14">
    <HeroSection />
  </section>

  <section class="flex relative w-full h-auto md:px-12 xl:px-14 mt-16">
    <ApiService />
  </section>

  <section class="flex relative w-full h-auto md:px-12 xl:px-14">
    <Benefit />
  </section>

  <section class="flex relative w-full h-auto md:px-12 xl:px-14">
    <GetStarted />
  </section>
</template>
