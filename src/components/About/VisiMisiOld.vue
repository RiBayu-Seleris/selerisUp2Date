<script setup>
import VisiMisiCard from "@/components/reusable/VisiMisiCard.vue";
import VisionVideo from "@/assets/videos/Vision.mp4";
import MissionVideo from "@/assets/videos/Mission.mp4";
</script>

<template>
  <div
    class="relative w-full h-auto pb-10 flex flex-row gap-x-0 lg:gap-x-10 overflow-x-auto lg:overflow-hidden snap-x snap-mandatory lg:snap-none scroll-pl-8 pl-8 pr-8 hide-scrollbar"
  >
    <VisiMisiCard
      :video="VisionVideo"
      title="Vision"
      description="Seleris's vision is to build a world where everyone can access
                affordable, reliable, and innovative solutions, fostering
                equality, empowering communities, and creating opportunities for
                a secure, sustainable, and prosperous future for all."
    />
    <VisiMisiCard
      :video="MissionVideo"
      title="Mission"
      description="Seleris's mission is to create innovative solutions that improve
              efficiency, accuracy, and accessibility, empowering individuals
              and organizations to achieve growth, make informed decisions, and
              build a secure, sustainable future for everyone."
    />
  </div>
</template>
