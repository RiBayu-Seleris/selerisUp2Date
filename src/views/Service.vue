<script setup>
import HeroSection from "@/components/Service/HeroSection.vue";
import ApiService from "@/components/Service/ApiService.vue";
</script>

<template>
  <section class="flex relative w-full h-auto md:px-12 xl:px-14">
    <HeroSection />
  </section>

  <section class="flex relative w-full h-auto md:px-12 xl:px-14 mt-16">
    <ApiService />
  </section>
</template>
