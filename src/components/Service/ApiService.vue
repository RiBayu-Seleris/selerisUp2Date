<script setup>
import Icon from "@/assets/icons/innovation.svg";
const ApiCards = [
  {
    icon: Icon,
    title: "Risk Assessment",
    description: `The API service allows companies to assess the risk 
    of potential customers 
    based on a short facial video recording.`,
  },
  {
    icon: Icon,
    title: "Risk Assessment",
    description: `The API service allows companies to assess the risk 
    of potential customers 
    based on a short facial video recording.`,
  },
  {
    icon: Icon,
    title: "Risk Assessment",
    description: `The API service allows companies to assess the risk 
    of potential customers 
    based on a short facial video recording.`,
  },
];
</script>

<template>
  <div
    class="flex w-full h-auto pb-20 xl:pb-10 bg-api dark:bg-darkapi rounded-b-[3rem] bg-no-repeat bg-contain xl:bg-cover"
  >
    <div class="flex flex-col w-full h-auto">
      <div
        class="flex flex-col w-full h-auto lg:mt-10 xl:mt-14 lg:px-14 xl:px-14 gap-y-6"
      >
        <div class="flex w-full h-auto">
          <p class="text-[25px] xl:text-[30px] text-[#1DC457]">Services</p>
        </div>
        <div class="flex w-full h-auto">
          <p
            class="lg:text-[32px] xl:text-[37px] text-[#195279] leading-[40px] font-[500] dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-br dark:from-[#FAFAFA] dark:via-[#D4D4D4] dark:to-[#AAAAAA]"
          >
            API Services
          </p>
        </div>
        <div class="flex w-[80%] h-auto">
          <p
            class="text-[17px] xl:text-[24px] text-[#195279] dark:text-[#6F6F6F]"
          >
            Seleris offers a powerful API service that allows insurance
            companies to integrate Seleris's underwriting capabilities into
            their existing systems. The API service is easy to use and provides
            a wide range of features, including.
          </p>
        </div>
      </div>
      <!-- Cards -->
      <div class="w-full h-auto flex flex-row lg:mt-3 xl:mt-8">
        <div
          class="flex flex-row w-full h-auto mt-5 overflow-x-auto snap-x snap-mandatory lg:scroll-pl-10 lg:pl-10 lg:pr-10 xl:scroll-pl-16 xl:pl-16 xl:pr-16 hide-scrollbar gap-x-10"
        >
          <div
            v-for="(ApiCard, index) in ApiCards"
            :key="index"
            class="flex snap-start shrink-0 lg:w-[70%] xl:w-[55%] sml:h-[270px] md:h-[200px] lg:h-[180px] xl:h-[200px] rounded-[22px] items-center bg-[#FAFAFA] dark:bg-[#323232]"
          >
            <div class="flex flex-row w-full h-auto gap-x-10 justify-center">
              <div
                class="flex lg:w-[80px] xl:w-[90px] lg:h-[80px] xl:h-[90px] justify-center"
              >
                <img
                  :src="ApiCard.icon"
                  alt="Icon"
                  class="w-full xl:h-full lg:h-full object-contain bg-white rounded-full shadow-lg p-2"
                />
              </div>
              <div class="flex flex-col w-[70%] h-auto lg:gap-y-2 xl:gap-y-5">
                <div class="flex w-full h-auto">
                  <p
                    class="text-[#1AB24F] lg:text-[20px] xl:text-[24px] font-[500]"
                  >
                    {{ ApiCard.title }}
                  </p>
                </div>
                <div class="flex w-full h-auto">
                  <p
                    class="text-[#195279] font-[400] lg:text-[20px] xl:text-[20px] dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-br dark:from-[#FAFAFA] dark:via-[#D4D4D4] dark:to-[#AAAAAA]"
                  >
                    {{ ApiCard.description }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="flex lg:w-[65%] xl:w-[60%] h-auto px-16 mt-10">
        <p class="dark:text-[#6F6F6F] xl:text-[20px]">
          Seleris provides comprehensive documentation and support to help
          companies get started with the API service.
        </p>
      </div>
    </div>
  </div>
  <!-- Mobile -->
  <!-- <div></div> -->
</template>
