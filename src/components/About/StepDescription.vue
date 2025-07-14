<script setup>
import ImgLinear from "@/assets/images/about-linear.png";
</script>

<template>
  <div class="w-full h-full">
    <div class="flex flex-row sml:flex-col-reverse w-full h-auto gap-x-10">
      <div class="flex w-full h-auto">
        <div
          class="flex flex-col w-full h-full pl-10 rounded-lg justify-center sml:gap-y-4 md:gap-y-4 lg:gap-y-4 xl:gap-y-8"
        >
          <div class="flex w-full h-auto">
            <p class="text-2xl lg:text-3xl xl:text-4xl text-[#1AB24F]">
              App Features
            </p>
          </div>
          <div class="flex w-full h-auto md:pr-16 lg:pr-16 xl:pr-20">
            <p
              class="text-3xl lg:text-4xl xl:text-5xl text-[#195279] lg:leading-[50px] xl:leading-[60px]"
            >
              We're company with a vision.
            </p>
          </div>
          <div class="flex w-full h-auto">
            <p class="lg:text-xl xl:text-2xl text-[#89A6BA] xl:leading-[35px]">
              Seleris Is The Best Life Insurance Underwriting.
            </p>
          </div>
        </div>
      </div>
      <div class="w-full h-auto sml:h-[350px] flex">
        <img
          :src="ImgLinear"
          alt="About Banner"
          class="w-full h-full object-cover sml:object-contain"
        />
        <!-- <NetworkDiagram /> -->
      </div>
    </div>
  </div>
</template>
