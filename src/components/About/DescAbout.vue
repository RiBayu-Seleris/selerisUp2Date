<script setup>
import DescRobot from "@/assets/images/about-images.png";
</script>

<template>
  <!-- Section Description 1 -->
  <div class="flex w-full h-auto lg:px-20">
    <p
      class="text-[14px] lg:text-[17px] xl:text-[21px] text-center text-[#195279] dark:text-[#FAFAFA] font-light"
    >
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugiat, quas.
      Qui veritatis molestiae nemo numquam quidem commodi eum eaque vero
      exercitationem, repellendus illum vel, voluptatibus distinctio aliquid
      voluptates, delectus cupiditate excepturi cum odit recusandae itaque?
    </p>
  </div>
  <!-- div Description 2 -->
  <div class="flex w-full h-auto my-5 lg:my-5 xl:my-20 lg:px-20">
    <div
      class="flex md:flex-row sml:flex-col w-full h-auto justify-between gap-16"
    >
      <div
        class="flex w-full h-full md:w-[70%] lg:w-[50%] xl:w-[40%] justify-center items-center"
      >
        <img
          :src="DescRobot"
          alt="About Banner"
          class="w-full h-full sml:w-[200px] xl:w-[400px] object-cover"
        />
      </div>
      <div class="flex w-full items-center pr-2 lg:pr-8 xl:pr-14">
        <p
          class="text-[14px] lg:text-[17px] xl:text-[21px] text-[#195279] dark:text-[#FAFAFA] font-light sml:text-center md:text-justify lg:text-justify xl:text-justify"
        >
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
  <div class="flex w-full h-auto xl:mt-5 sml:mt-5 lg:px-20">
    <p
      class="text-[14px] lg:text-[17px] xl:text-[21px] text-center text-[#195279] dark:text-[#FAFAFA] font-light"
    >
      Seleris's underwriting platform is powered by artificial intelligence (AI)
      and machine learning (ML) algorithms that have been trained on a massive
      dataset of facial video data and underwriting data. This allows the
      platform to assess the risk of potential customers with a high degree of
      accuracy, even if they have limited or no medical history
    </p>
  </div>
</template>
