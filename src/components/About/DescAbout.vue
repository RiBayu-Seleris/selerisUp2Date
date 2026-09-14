<script setup>
import DescRobot from "@/assets/images/about-images.png";
</script>

<template>
  <div class="flex w-full h-auto lg:px-20">
    <p
      class="text-[14px] lg:text-[17px] xl:text-[21px] text-center text-[#195279] dark:text-[#FAFAFA] font-light"
    >
      {{ $t("about.desc1") }}
    </p>
  </div>

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
          {{ $t("about.desc2Before") }}
          <span class="font-bold"> {{ $t("about.desc2Highlight") }} </span>
          {{ $t("about.desc2After") }}
        </p>
      </div>
    </div>
  </div>

  <div class="flex w-full h-auto xl:mt-5 lg:px-20">
    <p
      class="text-[14px] lg:text-[17px] xl:text-[21px] text-center text-[#195279] dark:text-[#FAFAFA] font-light"
    >
      {{ $t("about.desc3") }}
    </p>
  </div>
</template>
