<script setup>
import VisiMisiCard from "@/components/reusable/VisiMisiCard.vue";
import VisionVideo from "@/assets/videos/Vision.mp4";
import MissionVideo from "@/assets/videos/Mission.mp4";
</script>

<template>
  <div
    class="relative w-full h-auto flex flex-col md:flex-row justify-between space-y-20 md:space-y-0 md:space-x-8 lg:space-x-10"
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
