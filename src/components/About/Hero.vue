<script setup>
import AboutHero from "@/assets/images/About-hero-image.png";
</script>

<template>
  <div
    class="flex w-full h-auto xl:pt-[80px] md:pt-[100px] sml:pt-[90px] animate__animated animate__fadeIn animate__slower"
  >
    <div
      class="flex lg:flex-row sml:flex-col md:flex-col w-full h-auto justify-between lg:gap-x-10 sml:mt-3 sml:pt-4"
    >
      <div class="flex w-full md:w-full lg:w-[40%] xl:w-[45%] h-auto">
        <div
          class="flex flex-col w-full h-auto md:pt-[30px] lg:pt-[100px] xl:pt-[140px] sml:px-4 gap-3 xl:gap-7 sml:text-center md:text-center lg:text-left"
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
        class="flex w-full h-full md:w-full lg:w-[60%] xl:w-[55%] justify-center items-center sml:pt-10 md:pt-10"
      >
        <img
          :src="AboutHero"
          alt="About Banner"
          class="w-full h-full md:h-[500px] lg:h-[400px] xl:h-[500px] object-cover md:object-contain"
        />
      </div>
    </div>
  </div>
</template>
