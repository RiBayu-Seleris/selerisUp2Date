<script setup>
import ImgLinear from "@/assets/images/about-linear.png";
import DarkImgLinear from "@/assets/images/dark-about-linear.png";

import { onMounted } from "vue";

onMounted(() => {
  const video = document.querySelector("video");
  if (video) {
    video.addEventListener("contextmenu", (e) => e.preventDefault());
  }
});
</script>

<template>
  <div class="w-full h-full">
    <div class="flex md:flex-row sml:flex-col-reverse w-full h-auto gap-x-10">
      <div class="flex w-full h-auto">
        <div
          class="flex flex-col w-full h-full rounded-lg justify-center sml:gap-y-4 md:gap-y-4 lg:gap-y-4 xl:gap-y-6"
        >
          <div class="flex w-full h-auto">
            <p
              class="sml:text-[17px] md:text-[21px] lg:text-[23px] xl:text-[30px] text-[#1AB24F]"
            >
              App Features
            </p>
          </div>
          <div class="flex w-full h-auto md:pr-16 lg:pr-16 xl:pr-20">
            <p
              class="sml:text-[24px] md:text-[32px] lg:text-[40px] xl:text-[48px] text-[#195279] md:leading-[45px] lg:leading-[50px] xl:leading-[60px] dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-br dark:from-[#FAFAFA] dark:via-[#D4D4D4] dark:to-[#AAAAAA]"
            >
              We're company with a vision.
            </p>
          </div>
          <div class="flex w-full h-auto">
            <p
              class="sml:text-[14px] md:text-[19px] lg:text-[21px] xl:text-[24px] text-[#89A6BA] dark:text-[#6F6F6F] xl:leading-[35px] pr-20"
            >
              Seleris Is The Best Life Technology
            </p>
          </div>
        </div>
      </div>
      <div class="w-full h-auto sml:h-[350px] lg:w-full lg:h-auto flex">
        <video
          autoplay
          loop
          muted
          playsinline
          @contextmenu.prevent
          class="w-full h-full object-cover object-center rounded-3xl dark:hidden"
        >
          <source src="@/assets/videos/Step.mp4" type="video/mp4" />
        </video>
        <video
          autoplay
          loop
          muted
          playsinline
          @contextmenu.prevent
          class="w-full h-full object-cover object-center rounded-3xl hidden dark:block"
        >
          <source src="@/assets/videos/Dark_Step.mp4" type="video/mp4" />
        </video>
        <!-- <NetworkDiagram /> -->
      </div>
    </div>
  </div>
</template>
