<script setup>
import AboutHero from "@/assets/images/About-hero-image.png";
</script>

<template>
  <div class="flex w-full h-auto xl:pt-[100px] md:pt-[100px] sml:pt-[90px]">
    <div
      class="flex flex-row sml:flex-col w-full h-auto justify-between sml:bg-[#F3F4F6] sml:mt-3 sml:pt-4 sml:rounded-xl sml:shadow-md"
    >
      <div class="flex w-full md:w-[40%] xl:w-[45%] h-auto">
        <div
          class="flex flex-col w-full h-auto md:pt-[60px] lg:pt-[100px] xl:pt-[100px] gap-3 xl:gap-7 sml:text-center"
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
              class="text-4xl lg:text-[40px] xl:text-[60px] text-[#195279] lg:leading-[54px] xl:leading-[74px]"
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
        class="flex w-full h-full md:w-[60%] xl:w-[55%] justify-center items-center sml:pt-10"
      >
        <img
          :src="AboutHero"
          alt="About Banner"
          class="w-full h-full object-cover"
        />
      </div>
    </div>
  </div>
</template>
