<script setup>
import VideoAi from "@/assets/images/video-ai-desc.png";
import { onMounted } from "vue";

onMounted(() => {
  const video = document.querySelector("video");
  if (video) {
    video.addEventListener("contextmenu", (e) => e.preventDefault());
  }
});
</script>

<template>
  <div
    class="w-full h-auto flex sml:flex-col md:flex-col lg:flex-row xl:flex-row lg:gap-x-8 xl:gap-x-10"
  >
    <div
      class="flex sml:w-full sml:h-[300px] md:w-full md:h-[300px] lg:w-[50%] lg:h-[370px] xl:w-[50%] xl:h-[500px] sml:mb-5 md:mb-5"
    >
      <video
        autoplay
        loop
        muted
        playsinline
        @contextmenu.prevent
        class="w-full h-full object-cover object-center rounded-3xl"
      >
        <source src="@/assets/videos/Ai-Video.mp4" type="video/mp4" />
      </video>
    </div>
    <div
      class="flex flex-col w-full lg:w-[50%] lg:h-[370px] xl:w-[50%] xl:h-[500px] rounded-3xl py-5 gap-y-5 md:py-8 lg:gap-y-5 xl:gap-y-10 lg:justify-center xl:py-16 bg-white dark:bg-[#1D1F23] px-10 sml:px-8 shadow-lg"
    >
      <div class="w-full lg:w-full xl:w-[80%] xl:h-auto">
        <p
          class="sml:text-xl md:text-[24px] lg:text-[27px] xl:text-[36px] bg-gradient-to-b from-[#FF09C2] to-[#2B3CFC] dark:bg-gradient-to-r dark:from-[#FF09C2] dark:to-[#2B3CFC] bg-clip-text text-transparent leading-[60px] lg:leading-[45px] xl:leading-[50px] font-semibold"
        >
          AI and Machine Learning Algorithms
        </p>
      </div>
      <div class="w-full h-auto pr-0">
        <p
          class="sml:text-[14px] md:text-[14px] lg:text-[17px] xl:text-[20px] text-[#195279] dark:text-[#FAFAFA]"
        >
          <span class="font-semibold">Our AI and ML</span> algorithms conduct
          in-depth risk assessments, considering various factors and subtleties
          that impact outcomes. This sophisticated analysis enables us to
          provide insurers with tailored guidance and recommendations
        </p>
      </div>
    </div>
  </div>
</template>
