<script setup>
import AboutHero from "@/assets/images/About-hero-image.png";
</script>

<template>
  <div class="flex relative w-full h-auto">
    <div
      class="flex relative md:flex-row sml:flex-col w-full h-auto justify-between lg:gap-x-10 sml:mt-[100px] md:mt-[50px] lg:mt-[130px]"
    >
      <div class="flex w-full md:w-full lg:w-[40%] xl:w-[45%] h-auto">
        <div
          class="flex flex-col w-full h-auto justify-center gap-3 xl:gap-4 sml:text-center md:text-left"
        >
          <div class="w-full h-auto">
            <p
              class="text-2xl lg:text-3xl xl:text-[30px] text-[#1AB24F] font-[500]"
            >
              About Us
            </p>
          </div>
          <div class="w-full h-auto">
            <p
              class="sml:text-[24px] md:text-[30px] lg:text-[32px] xl:text-[48px] font-[500] text-[#195279] lg:leading-[54px] xl:leading-[65px] dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-br dark:from-[#FAFAFA] dark:via-[#D4D4D4] dark:to-[#AAAAAA]"
            >
              Seleris Meditekno Internasional
            </p>
          </div>
          <div class="w-full h-auto">
            <p
              class="md:text-[14px] lg:text-[17px] xl:text-[23px] text-[#89A6BA] dark:text-[#6F6F6F] lg:leading-[54px] xl:leading-[45px]"
            >
              The Future of Life Technology
            </p>
          </div>
        </div>
      </div>
      <div
        class="flex w-full h-full sml:w-full md:w-full lg:w-[60%] xl:w-auto justify-end lg:justify-end items-end mt-0 sml:mt-5 md:mt-5"
      >
        <img
          :src="AboutHero"
          alt="About Banner"
          class="w-full h-full sml:h-[300px] md:h-[400px] lg:h-[400px] xl:h-[400px] object-contain object-right"
        />
      </div>
    </div>
  </div>
</template>
