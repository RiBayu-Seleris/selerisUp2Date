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
      :title="$t('about.vision.title')"
      :description="$t('about.vision.description')"
    />

    <VisiMisiCard
      :video="MissionVideo"
      :title="$t('about.mission.title')"
      :description="$t('about.mission.description')"
    />
  </div>
</template>
