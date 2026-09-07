<script setup>
import { useLocalizedList } from "@/utils/i18nList";
import RobotEngineering from "@/assets/images/robot-engineering.png";
import RobotProduct from "@/assets/images/robot-product.png";
import RobotSales from "@/assets/images/robot-sales.png";
const positions = [
  { robot: RobotProduct },
  { robot: RobotSales },
  { robot: RobotEngineering },
];

// Teks diambil dari file locale
const localizedPositions = useLocalizedList("team.positions", positions, [
  "title",
  "subtitle",
  "description",
]);
</script>

<template>
  <div class="w-full h-auto flex flex-row relative">
    <div
      class="hidden xl:flex absolute w-32 h-full bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FAFAFA]/0 to-60% dark:bg-gradient-to-r dark:from-[#17181A] dark:from-0% dark:to-[#17181A]/0 dark:to-60% left-0 z-20 rounded-r-2xl"
    />
    <div
      class="hidden xl:flex absolute w-32 h-full bg-gradient-to-l from-[#FAFAFA] from-0% to-[#FAFAFA]/0 to-60% dark:bg-gradient-to-l dark:from-[#17181A] dark:from-0% dark:to-[#17181A]/0 dark:to-60% right-0 z-20 rounded-l-2xl"
    />
    <div
      class="relative flex flex-row w-full h-auto gap-x-4 lg:gap-x-10 mt-5 overflow-x-auto snap-x snap-mandatory pl-8 pr-8 lg:pl-14 lg:pr-14 hide-scrollbar"
    >
      <div
        v-for="(position, index) in localizedPositions"
        :key="index"
        class="snap-center shrink-0 h-auto w-full md:w-full lg:w-[740px] xl:w-[750px] rounded-[22px]"
      >
        <div
          class="relative flex w-full h-full bg-[#FFFFFF] dark:bg-[#1D1F23] rounded-[22px] border-[#CFCFCF] border-[0.1px] dark:border-[#FAFAFA]/25 px-6 pt-4 pb-6 lg:pb-8"
        >
          <div class="flex flex-col w-full h-auto gap-y-4 lg:gap-y-6">
            <div class="flex flex-row w-full h-auto gap-x-3.5">
              <div
                class="flex h-auto justify-center md:justify-start w-[25%] sm:w-[20%] md:w-[20%] lg:w-[20%]"
              >
                <img
                  :src="position.robot"
                  alt="Robot"
                  class="w-full h-full object-contain object-bottom sm:object-top"
                />
              </div>
              <div
                class="flex flex-col w-[75%] sm:w-[60%] md:w-[80%] lg:w-[80%] h-auto gap-y-1 sm:gap-y-1 xl:gap-y-2 pt-3 sm:pt-4 lg:pt-5"
              >
                <div
                  class="flex w-full h-[auto] sm:h-auto justify-start items-start"
                >
                  <p
                    class="text-[14px] sm:text-[20px] md:text-[24px] lg:text-[24px] xl:text-[26px] text-[#2AB857] font-[500] text-center"
                  >
                    {{ position.title }} Team
                  </p>
                </div>
                <div
                  class="flex w-full h-auto justify-start pr-0 sm:pr-8 md:pr-10 lg:pr-12"
                >
                  <p
                    class="text-[10px] sm:text-[14px] md:text-[14px] lg:text-[16px] leading-relaxed sm:leading-normal md:leading-relaxed md:tracking-widest lg:tracking-wider text-[#89A6BA] font-[400] dark:text-[#6F6F6F] text-start"
                  >
                    {{ position.subtitle }}
                  </p>
                </div>
              </div>
            </div>
            <div class="flex w-full h-auto px-2 sm:px-6">
              <p
                class="text-[10px] sm:text-[14px] md:text-[14px] lg:text-[14px] xl:text-[16px] text-[#195279] dark:text-[#FAFAFA] leading-relaxed tracking-normal font-[400] text-justify"
              >
                {{ position.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
.hide-scrollbar {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
