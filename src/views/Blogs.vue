<script setup>
import HeroSection from "@/components/Blog/HeroSection.vue";
import BlogList from "@/components/Blog/BlogList.vue";
</script>

<template>
  <section
    class="flex relative w-full h-auto md:px-12 xl:px-14 bg-[radial-gradient(ellipse_at_top,_#3CFF7A_-70%,_#FAFAFA_60%)] dark:bg-[radial-gradient(ellipse_at_top,_#3CFF7A_-70%,_#17181A_40%)]"
  >
    <HeroSection />
  </section>

  <section class="flex relative w-full h-auto md:px-12 xl:px-16 mt-10 lg:mt-20">
    <BlogList />
  </section>
</template>
