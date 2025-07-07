<script setup>
import DescRobot from "@/assets/images/about-images.png";
</script>

<template>
  <!-- Section Description 1 -->
  <div class="flex w-full h-auto sml:mt-5 sml:px-10">
    <p class="lg:text-xl xl:text-2xl text-justify text-[#195279]">
      Seleris is a technology company that develops a facial video-based life
      insurance underwriting application. The application allows insurance
      companies to assess the risk of potential customers more quickly and
      accurately, without the need for face-to-face interviews.
    </p>
  </div>
  <!-- div Description 2 -->
  <div class="flex w-full h-auto my-5 sml:px-10 lg:my-5 xl:my-10">
    <div class="flex flex-row sml:flex-col w-full h-auto justify-between gap-8">
      <div
        class="flex w-full h-full md:w-[70%] xl:w-[55%] justify-center items-center sml:pt-10"
      >
        <img
          :src="DescRobot"
          alt="About Banner"
          class="w-full h-full object-cover"
        />
      </div>
      <div class="flex w-full items-center">
        <p class="lg:text-xl xl:text-2xl text-[#195279] text-justify">
          Seleris was founded in 2019 by a team of experienced entrepreneurs and
          technologists with a passion for transforming the insurance industry.
          The company believes that everyone deserves access to affordable and
          accessible life insurance, and that technology can play a vital role
          in making this a reality
        </p>
      </div>
    </div>
  </div>
  <!-- div Description 1 -->
  <div class="flex w-full h-auto xl:mt-5 sml:mt-5 sml:px-10">
    <p class="lg:text-xl xl:text-2xl text-justify text-[#195279]">
      Seleris's underwriting platform is powered by artificial intelligence (AI)
      and machine learning (ML) algorithms that have been trained on a massive
      dataset of facial video data and underwriting data. This allows the
      platform to assess the risk of potential customers with a high degree of
      accuracy, even if they have limited or no medical history
    </p>
  </div>
</template>
