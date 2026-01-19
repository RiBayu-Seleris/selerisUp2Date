<script setup>
import HeroText from "@/components/reusable/HeroText.vue";
</script>

<template>
  <div class="flex flex-col w-full h-auto">
    <div class="flex w-full h-auto pt-[90px] md:pt-[100px] xl:pt-[100px]">
      <HeroText
        title="Benefits"
        subtitle="Benefits of Using the Seleris API"
        description="The Seleris API service offers a number of benefits for companies, including"
      />
    </div>
    <div class="flex w-full h-full mt-20">
      <video
        autoplay
        muted
        playsinline
        class="w-full h-full object-cover object-center rounded-3xl dark:hidden"
      >
        <source src="@/assets/videos/DesignAPI.mp4" type="video/mp4" />
      </video>
      <video
        autoplay
        muted
        playsinline
        class="w-full h-full object-cover object-center rounded-3xl hidden dark:block"
      >
        <source src="@/assets/videos/DarkDesignAPI.mp4" type="video/mp4" />
      </video>
    </div>
  </div>
</template>
