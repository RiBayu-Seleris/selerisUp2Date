<script setup>
import HeroSection from "@/components/Team/HeroSection.vue";
import TeamList from "@/components/Team/TeamList.vue";
import DevelopmentTeam from "@/components/Team/DevelopmentTeam.vue";
import PositionDescription from "@/components/Team/PositionDescription.vue";
import Description from "@/components/Team/Description.vue";
</script>

<template>
  <section class="flex relative w-full h-auto md:px-12 xl:px-14">
    <HeroSection />
  </section>

  <section class="flex relative w-full h-auto mt-20">
    <TeamList />
  </section>

  <section class="flex relative w-full h-auto mt-20">
    <DevelopmentTeam />
  </section>

  <section class="flex relative w-full h-auto mt-10">
    <PositionDescription />
  </section>

  <section class="flex relative w-full h-auto mt-10 px-16">
    <Description />
  </section>
</template>
