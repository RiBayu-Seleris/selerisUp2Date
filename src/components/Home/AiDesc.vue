<script setup>
import VideoAi from "@/assets/images/video-ai-desc.png";
</script>

<template>
  <div class="xl:mt-10 xl:px-14">
    <div
      class="w-full h-auto flex sml:flex-col md:flex-col lg:flex-row xl:flex-row lg:gap-x-8 xl:gap-x-10"
    >
      <div
        class="flex sml:w-full sml:h-[300px] md:w-full md:h-[300px] lg:w-[50%] lg:h-[370px] xl:w-[50%] xl:h-[500px] sml:mb-5 md:mb-5"
      >
        <img
          :src="VideoAi"
          alt="VideoAI"
          class="w-full h-full object-cover rounded-[2.5rem]"
        />
        <!-- <video
          autoplay
          loop
          muted
          playsinline
          class="w-full h-full object-cover object-center"
        >
          <source
            src="@/assets/videos/Design-Vector-Web2.mp4"
            type="video/mp4"
          />
        </video> -->
      </div>
      <div
        class="flex flex-col w-full lg:w-[50%] lg:h-[370px] xl:w-[50%] xl:h-[500px] rounded-3xl py-5 gap-y-5 md:py-8 lg:gap-y-5 xl:gap-y-10 lg:justify-center xl:justify-between xl:py-16 bg-white px-10 sml:px-8 shadow-lg"
      >
        <div class="w-full lg:w-full xl:w-[80%] xl:h-auto">
          <p
            class="sml:text-xl md:text-2xl lg:text-3xl xl:text-4xl bg-gradient-to-b from-[#FF09C2] to-[#2B3CFC] bg-clip-text text-transparent leading-[60px] lg:leading-[45px] font-semibold"
          >
            AI and Machine Learning Algorithms
          </p>
        </div>
        <div class="w-full h-auto text-[#195279] pr-0">
          <p class="md:text-xl lg:text-xl xl:text-2xl">
            <span class="font-semibold">Our AI and ML</span> algorithms conduct
            in-depth risk assessments, considering various factors and
            subtleties that impact insurance outcomes. This sophisticated
            analysis enables us to provide insurers with tailored guidance and
            recommendations.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
