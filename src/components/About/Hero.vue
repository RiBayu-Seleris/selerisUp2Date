<script setup>
import AboutHero from "@/assets/images/About-hero-image.png";
</script>

<template>
  <div class="flex relative w-full h-auto">
    <div
      class="flex relative flex-col md:flex-row w-full h-auto justify-between gap-x-10 lg:gap-x-10 mt-[120px] md:mt-[100px] lg:mt-[160px]"
    >
      <div class="flex w-full md:w-full lg:w-[40%] xl:w-[45%] h-auto">
        <div
          class="flex flex-col w-full h-auto justify-center gap-y-3 sm:gap-y-1 lg:gap-y-5 text-center md:text-left"
        >
          <div class="w-full h-auto">
            <p
              class="text-2xl lg:text-[30px] xl:text-[30px] text-[#1AB24F] font-[500]"
            >
              About Us
            </p>
          </div>
          <div class="w-full h-auto">
            <p
              class="text-[24px] md:text-[30px] lg:text-[32px] xl:text-[46px] font-[500] text-[#195279] lg:leading-[54px] xl:leading-tight dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-br dark:from-[#FAFAFA] dark:via-[#D4D4D4] dark:to-[#AAAAAA]"
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
        class="flex w-full h-auto md:w-full lg:w-[60%] xl:w-auto justify-end lg:justify-end items-end pt-5 md:pt-5 lg:pt-0"
      >
        <img
          :src="AboutHero"
          alt="About Banner"
          class="w-full h-[300px] md:h-[400px] lg:h-[400px] xl:h-[450px] object-contain md:object-right"
        />
      </div>
    </div>
  </div>
</template>
