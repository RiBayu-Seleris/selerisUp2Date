<script setup>
import HeroText from "@/components/reusable/HeroText.vue";
</script>

<template>
  <div class="flex flex-col w-full h-auto">
    <div class="flex w-full h-auto xl:pt-[100px] md:pt-[100px] sml:pt-[90px]">
      <HeroText
        title="Benefits"
        subtitle="Benefits of Using the Seleris API"
        description="The Seleris API service offers a number of benefits for insurance companies, including"
      />
    </div>
    <div class="flex w-full h-[700px] mt-5">
      <video
        autoplay
        muted
        playsinline
        class="w-full h-full object-cover object-center rounded-3xl"
      >
        <source src="@/assets/videos/Ai-Video.mp4" type="video/mp4" />
      </video>
    </div>
  </div>
</template>
