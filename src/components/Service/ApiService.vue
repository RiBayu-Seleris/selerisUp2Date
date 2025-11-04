<script setup>
import Atom from "@/assets/icons/Services/circle-atom.svg";
import Chip from "@/assets/icons/Services/chip-thunder.svg";
import Bars from "@/assets/icons/Services/bars-up.svg";
const ApiCards = [
  {
    icon: Atom,
    title: "Smart Video Analysis",
    description: `Seleris analyzes short facial videos to identify key risk factors quickly and accurately, 
    enabling smarter, faster evaluations.`,
  },
  {
    icon: Chip,
    title: "Instant Risk Scoring",
    description: `Get instant risk scores in seconds to streamline decisions and improve your digital evaluation process.`,
  },
  {
    icon: Bars,
    title: "Frictionless Evaluation",
    description: `Seleris provides a fully digital, seamless evaluation experience, 
    perfect for remote users or those with limited data history.`,
  },
];
</script>

<template>
  <!-- md:rounded-b-[3rem] -->
  <div
    class="flex w-full h-auto lg:h-[588px] xl:h-auto pb-5 lg:pb-10 dark:bg-transparent lg:bg-api dark:lg:bg-darkapi bg-no-repeat bg-cover bg-top xl:rounded-b-[3rem]"
  >
    <div
      class="flex flex-col w-full h-auto bg-[#F3F4F6] sml:pb-10 lg:pb-0 lg:bg-transparent dark:bg-[#1E1F1C] dark:lg:bg-transparent rounded-[1.5rem]"
    >
      <div
        class="flex flex-col w-full h-auto mt-8 lg:mt-10 xl:mt-14 px-8 lg:px-14 gap-y-4 xl:gap-y-6"
      >
        <div class="flex w-full h-auto">
          <p class="text-[21px] lg:text-[25px] xl:text-[30px] text-[#1DC457]">
            Services
          </p>
        </div>
        <div class="flex w-full h-auto">
          <p
            class="text-[27px] lg:text-[29px] xl:text-[37px] text-[#195279] leading-[40px] font-[500] dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-br dark:from-[#FAFAFA] dark:via-[#D4D4D4] dark:to-[#AAAAAA]"
          >
            API Services
          </p>
        </div>
        <div class="flex lg:w-[80%] h-auto">
          <p
            class="text-[15px] lg:text-[19px] xl:text-[21px] text-[#195279] dark:text-[#6F6F6F]"
          >
            Seleris offers a powerful API service that allows companies to
            integrate Seleris's capabilities into their existing systems. The
            API service is easy to use and provides a wide range of features,
            including.
          </p>
        </div>
      </div>
      <!-- Cards -->
      <div class="w-full h-auto flex flex-row mt-5 lg:mt-3 xl:mt-8 pl-1">
        <div
          class="flex flex-row w-full h-auto mt-5 overflow-x-auto snap-x snap-mandatory scroll-pl-8 pl-8 pr-8 lg:scroll-pl-14 lg:pl-14 lg:pr-14 xl:scroll-pl-16 xl:pl-16 xl:pr-16 hide-scrollbar gap-x-5 md:gap-x-10"
        >
          <div
            v-for="(ApiCard, index) in ApiCards"
            :key="index"
            class="flex snap-start shrink-0 w-[100%] md:w-[60%] lg:w-[55%] xl:w-[60%] sml:h-[150px] md:h-auto lg:h-auto xl:h-[200px] rounded-[22px] items-center bg-[#FAFAFA] dark:bg-[#323232] p-[1px] md:gap-x-5 dark:bg-gradient-to-tr dark:from-[#1E1F1C] dark:from-45% dark:to-[#565656]"
          >
            <div
              class="flex flex-row w-full h-full py-5 gap-x-5 md:gap-x-5 xl:gap-x-8 justify-center px-2 sm:px-0 bg-[#FAFAFA] dark:bg-[#1D1F23] dark:border-[#FAFAFA]/25 rounded-[22px]"
            >
              <div
                class="flex sml:w-[50px] sml:h-[50px] md:w-[50px] md:h-[50px] lg:w-[55px] lg:h-[55px] xl:w-[70px] xl:h-[70px] justify-center md:mt-2 lg:mt-0"
              >
                <img
                  :src="ApiCard.icon"
                  alt="Icon"
                  class="w-full lg:h-full xl:h-full object-contain object-top bg-white dark:bg-[#323232] rounded-full shadow-lg dark:shadow-white dark:shadow-[0px_0px_25px_-16px_#ffffff] p-3"
                />
              </div>
              <div
                class="flex flex-col w-[70%] h-auto gap-y-2 lg:gap-y-2 xl:gap-y-5"
              >
                <div class="flex w-full h-auto">
                  <p
                    class="text-[#1AB24F] text-[17px] md:text-[14px] lg:text-[17px] xl:text-[21px] font-[500]"
                  >
                    {{ ApiCard.title }}
                  </p>
                </div>
                <div class="flex w-full h-auto">
                  <p
                    class="text-[#195279] font-[400] text-[12px] sm:text-[14px] lg:text-[15px] xl:text-[19px] dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-br dark:from-[#FAFAFA] dark:via-[#D4D4D4] dark:to-[#AAAAAA]"
                  >
                    {{ ApiCard.description }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        class="flex lg:w-[65%] xl:w-[60%] h-auto px-8 lg:px-16 mt-10 lg:mt-10"
      >
        <p class="text-[#195279] dark:text-[#6F6F6F] xl:text-[20px]">
          Seleris provides comprehensive documentation and support to help
          companies get started with the API service.
        </p>
      </div>
    </div>
  </div>
  <!-- Mobile -->
  <!-- <div></div> -->
</template>
