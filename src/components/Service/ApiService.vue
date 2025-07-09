<script setup>
import Icon from "@/assets/icons/innovation.svg";
const ApiCards = [
  {
    icon: Icon,
    title: "Risk Assessment",
    description: `The API service allows 
	insurance companies to assess the risk of potential customers 
	based on a short facial video recording.`,
  },
  {
    icon: Icon,
    title: "Risk Assessment",
    description: `The API service allows 
	insurance companies to assess the risk of potential customers 
	based on a short facial video recording.`,
  },
  {
    icon: Icon,
    title: "Risk Assessment",
    description: `The API service allows 
	insurance companies to assess the risk of potential customers 
	based on a short facial video recording.`,
  },
];
</script>

<template>
  <div
    class="flex w-full h-auto lg:h-[520px] xl:h-[100vh] bg-api rounded-b-[3rem] bg-cover"
  >
    <div class="flex flex-col w-full h-auto">
      <div
        class="flex flex-col w-full h-auto lg:mt-10 xl:mt-14 xl:pl-16 lg:pl-10"
      >
        <div class="flex w-full h-auto">
          <p class="text-[30px] text-[#1DC457]">Services</p>
        </div>
        <div class="flex w-[70%] h-auto lg:mt-4 xl:mt-8">
          <p
            class="lg:text-[47px] xl:text-[60px] text-[#195279] leading-[40px] font-[500]"
          >
            API Services
          </p>
        </div>
        <div class="flex w-full h-auto lg:mt-4 xl:mt-8">
          <p class="text-[20px] xl:text-[24px] text-[#195279]">
            Seleris offers a powerful API service that allows insurance
            companies to integrate Seleris's underwriting capabilities into
            their existing systems. The API service is easy to use and provides
            a wide range of features, including.
          </p>
        </div>
      </div>
      <div class="w-full h-auto flex flex-row lg:mt-3 xl:mt-8">
        <div
          class="flex flex-row w-full h-auto mt-5 overflow-x-auto snap-x snap-mandatory lg:scroll-pl-10 lg:pl-10 lg:pr-10 xl:scroll-pl-16 xl:pl-16 xl:pr-16 hide-scrollbar gap-x-10"
        >
          <div
            v-for="(ApiCard, index) in ApiCards"
            :key="index"
            class="flex snap-start shrink-0 lg:w-[645px] xl:w-[645px] sml:h-[270px] md:h-[200px] lg:h-[180px] xl:h-[246px] rounded-[22px] items-center bg-[#FAFAFA]"
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
                    class="text-[#195279] font-[400] lg:text-[20px] xl:text-[20px]"
                  >
                    {{ ApiCard.description }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Mobile -->
  <!-- <div></div> -->
</template>
