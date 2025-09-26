<script setup>
import HeroSection from "@/components/Team/HeroSection.vue";
import TeamList from "@/components/Team/TeamList.vue";
import DevelopmentTeam from "@/components/Team/DevelopmentTeam.vue";
import PositionDescription from "@/components/Team/PositionDescription.vue";
import Description from "@/components/Team/Description.vue";
</script>

<template>
  <section class="flex relative w-full h-auto md:px-10 xl:px-14">
    <HeroSection />
  </section>

  <section class="flex flex-col relative w-full h-auto mt-20 sm:mt-32 xl:mt-28">
    <TeamList />
  </section>

  <section class="flex relative w-full h-auto mt-24 sm:mt-32 md:mt-36 lg:mt-36">
    <DevelopmentTeam />
  </section>

  <section class="flex relative w-full h-auto mt-5 sm:mt-10">
    <PositionDescription />
  </section>

  <section class="flex relative w-full h-auto mt-20 lg:mt-28 px-8 lg:px-16">
    <Description />
  </section>
</template>
