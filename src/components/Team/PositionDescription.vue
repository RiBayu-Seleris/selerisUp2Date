<script setup>
import RobotEngineering from "@/assets/images/robot-engineering.svg";
import RobotProduct from "@/assets/images/robot-product.svg";
const positions = [
  {
    robot: RobotEngineering,
    title: "Engineering Team",
    description:
      "Our engineering team is a powehouse of coding wizards, arthitecture, architects, and problem-solving pioneers",
  },
  {
    robot: RobotProduct,
    name: "Product Team",
    position:
      "Our engineering team is a powehouse of coding wizards, arthitecture, architects, and problem-solving pioneers",
  },
  {
    robot: RobotEngineering,
    title: "Engineering Team",
    description:
      "Our engineering team is a powehouse of coding wizards, arthitecture, architects, and problem-solving pioneers",
  },
  {
    robot: RobotProduct,
    name: "Product Team",
    position:
      "Our engineering team is a powehouse of coding wizards, arthitecture, architects, and problem-solving pioneers",
  },
  {
    robot: RobotEngineering,
    title: "Engineering Team",
    description:
      "Our engineering team is a powehouse of coding wizards, arthitecture, architects, and problem-solving pioneers",
  },
  {
    robot: RobotProduct,
    name: "Product Team",
    position:
      "Our engineering team is a powehouse of coding wizards, arthitecture, architects, and problem-solving pioneers",
  },
];
</script>

<template>
  <div class="w-full h-auto flex flex-row">
    <div
      class="flex flex-row py-2 w-full h-auto gap-x-10 mt-5 overflow-x-auto snap-x snap-mandatory scroll-pl-14 pl-14 pr-14 hide-scrollbar"
    >
      <div
        v-for="(position, index) in positions"
        :key="index"
        class="snap-start shrink-0 sml:h-[270px] md:h-[200px] lg:w-[740px] lg:h-[447px] xl:w-[740px] xl:h-[447px] rounded-[22px]"
      >
        <div
          class="relative flex w-full h-full bg-[#FFFFFF] rounded-[22px] border-[1px] border-[#CFCFCF] py-4 px-8"
        >
          <div class="flex flex-col w-full h-auto">
            <div class="flex flex-row w-full h-auto">
              <div class="flex w-[30%] h-[176px]">
                <img
                  :src="position.robot"
                  alt="Robot"
                  class="w-full h-full object-contain"
                />
              </div>
              <div class="flex flex-col w-[70%] h-auto gap-y-4 pt-5">
                <div class="flex w-full h-auto">
                  <p class="text-[32px] text-[#2AB857] font-[600]">
                    Engineering Team
                  </p>
                </div>
                <div class="flex w-full h-auto">
                  <p class="text-[16px] text-[#89A6BA]">
                    Our engineering team is a powehouse of coding wizards,
                    arthitecture, architects, and problem-solving pioneers
                  </p>
                </div>
              </div>
            </div>
            <div class="flex w-full h-auto px-10 mt-14">
              <p class="text-[18px] text-[#195279] font-[400]">
                The Seleris engineering team is responsible for developing and
                maintaining our AI-powered underwriting platform. The team is
                led by Rinaldi Anwar, who has over 10 years of experience in
                developing and deploying AI solutions.
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
