<script setup>
import AboutHero from "@/assets/images/About-hero-image.png";
</script>

<template>
  <div
    class="flex relative w-full h-auto animate__animated animate__fadeIn animate__slower"
  >
    <div
      class="flex relative lg:flex-row sml:flex-col md:flex-col w-full h-auto justify-between lg:gap-x-10 mt-[130px] sml:mt-[100px]"
    >
      <div class="flex w-full md:w-full lg:w-[40%] xl:w-[45%] h-auto">
        <div
          class="flex flex-col w-full h-auto justify-center sml:px-4 gap-3 xl:gap-7 sml:text-center md:text-center lg:text-left"
        >
          <div class="w-full h-auto">
            <p
              class="text-2xl lg:text-3xl xl:text-4xl text-[#1AB24F] font-semibold"
            >
              About Us
            </p>
          </div>
          <div class="w-full h-auto">
            <p
              class="sml:text-2xl md:text-3xl lg:text-[40px] xl:text-[60px] text-[#195279] lg:leading-[54px] xl:leading-[74px]"
            >
              Seleris Meditekno Internasional
            </p>
          </div>
          <div class="w-full h-auto">
            <p class="text-base xl:text-2xl text-[#89A6BA]">
              Seleris Is The Best Life Insurance Underwriting.
            </p>
          </div>
        </div>
      </div>
      <div
        class="flex w-full h-full md:w-full lg:w-[60%] xl:w-[55%] justify-end items-end"
      >
        <img
          :src="AboutHero"
          alt="About Banner"
          class="h-full sml:h-[300px] md:h-[500px] lg:h-[400px] xl:h-[500px] object-contain"
        />
      </div>
    </div>
  </div>
</template>
