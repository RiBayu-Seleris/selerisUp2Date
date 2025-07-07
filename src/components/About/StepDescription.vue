<script setup>
import ImgLinear from "@/assets/images/about-linear.png";
</script>

<template>
  <div class="w-full h-full lg:px-16 xl:px-20">
    <div class="flex flex-row w-full h-auto gap-x-10">
      <div class="flex w-full h-auto">
        <div
          class="flex flex-col w-full h-full pl-10 rounded-lg justify-center lg:gap-y-4 xl:gap-y-8"
        >
          <div class="flex w-full h-auto">
            <p class="lg:text-3xl xl:text-4xl text-[#1AB24F]">App Features</p>
          </div>
          <div class="flex w-full h-auto lg:pr-16 xl:pr-20">
            <p
              class="lg:text-4xl xl:text-5xl text-[#195279] lg:leading-[50px] xl:leading-[60px]"
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
      <div class="w-full h-auto flex">
        <img
          :src="ImgLinear"
          alt="About Banner"
          class="w-full h-full object-cover"
        />
        <!-- <NetworkDiagram /> -->
      </div>
    </div>
  </div>
</template>
