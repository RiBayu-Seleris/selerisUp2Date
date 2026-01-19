<script setup>
import DescRobot from "@/assets/images/about-images.png";
</script>

<template>
  <!-- Section Description 1 -->
  <div class="flex w-full h-auto lg:px-20">
    <p
      class="text-[14px] lg:text-[17px] xl:text-[21px] text-center text-[#195279] dark:text-[#FAFAFA] font-light"
    >
      Seleris is a technology company that develops facial video-based
      applications to help businesses assess individuals more quickly and
      accurately without the need for face-to-face interviews. The AI-powered
      solution delivers smarter, faster, and scalable evaluations, making it
      easier to analyze various aspects such as health, financial condition, and
      behavioral traits.
    </p>
  </div>
  <!-- div Description 2 -->
  <div class="flex w-full h-auto my-5 sm:my-8 lg:my-14 xl:my-16 lg:px-20">
    <div
      class="flex flex-col md:flex-row w-full h-auto justify-between gap-y-5 md:gap-8 lg:gap-x-16"
    >
      <div
        class="flex w-full h-full md:w-[70%] lg:w-[50%] xl:w-[50%] justify-center items-center"
      >
        <img
          :src="DescRobot"
          alt="About Banner"
          class="h-full w-[200px] lg:w-[400px] object-cover"
        />
      </div>
      <div class="flex w-full items-center pr-2 lg:pr-8 xl:pr-14">
        <p
          class="text-[14px] lg:text-[17px] xl:text-[21px] text-[#195279] dark:text-[#FAFAFA] font-light text-center md:text-justify lg:text-justify xl:text-justify"
        >
          Founded in 2019 by experienced entrepreneurs and technologists,
          Seleris is built on the belief that everyone deserves access to
          affordable and inclusive protection. Its
          <span class="font-bold"> AI and machine learning </span>
          models are trained on large datasets of facial video and behavioral
          data, enabling high accuracy risk assessments even for individuals
          with limited medical or historical records.
        </p>
      </div>
    </div>
  </div>
  <!-- div Description 3 -->
  <div class="flex w-full h-auto xl:mt-5 lg:px-20">
    <p
      class="text-[14px] lg:text-[17px] xl:text-[21px] text-center text-[#195279] dark:text-[#FAFAFA] font-light"
    >
      Seleris's platform is designed to be simple and efficient for both
      companies and customers. Businesses can integrate Seleris through a
      flexible API, while users can complete the assessment process entirely
      online within minutes. Seleris helps partners enhance speed, precision,
      and accessibility across a variety of digital screening and evaluation use
      cases.
    </p>
  </div>
</template>
