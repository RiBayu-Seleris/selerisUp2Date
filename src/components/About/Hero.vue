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
          class="flex flex-col w-full h-auto justify-center gap-3 xl:gap-4 sml:text-center md:text-center lg:text-left"
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
              class="sml:text-2xl md:text-3xl lg:text-[40px] xl:text-[48px] text-[#195279] lg:leading-[54px] xl:leading-[65px]"
            >
              Seleris Meditekno Internasional
            </p>
          </div>
          <div class="w-full h-auto">
            <p
              class="text-base xl:text-[27px] text-[#89A6BA] lg:leading-[54px] xl:leading-[45px]"
            >
              Seleris Is The Best Life Insurance Underwriting.
            </p>
          </div>
        </div>
      </div>
      <div
        class="flex w-full h-full sml:w-full md:w-full lg:w-[60%] xl:w-[55%] justify-center lg:justify-end items-end mt-0 sml:mt-5 md:mt-5"
      >
        <img
          :src="AboutHero"
          alt="About Banner"
          class="w-full h-full sml:h-[300px] md:h-[400px] lg:h-[400px] xl:h-[400px] object-contain"
        />
      </div>
    </div>
  </div>
</template>
