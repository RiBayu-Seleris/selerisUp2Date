<script setup>
import RobotEngineering from "@/assets/images/robot-engineering.svg";
import RobotProduct from "@/assets/images/robot-product.png";
const positions = [
  {
    robot: RobotEngineering,
    title: "Product Team",
    subtitle:
      "Drives product vision, user experience, and continuous improvement.",
    description:
      "Our product team shapes the future of Seleris by defining product strategy, enhancing user experience, and translating feedback into meaningful features. Collaborating closely with users and stakeholders, they turn complex ideas into simple, intuitive, and high-impact solutions.",
  },
  {
    robot: RobotProduct,
    title: "Sales & Marketing Team",
    subtitle:
      "Connects Seleris to the market through strategy and storytelling.",
    description:
      "The sales and marketing team ensures Seleris reaches the right audience with the right message. From lead generation and relationship building to branding and content creation, they craft compelling campaigns and drive business growth through clear communication and market insight.",
  },
  {
    robot: RobotEngineering,
    title: "Engineering Team",
    subtitle: "Develops smart, scalable, and reliable AI-driven technology.",
    description:
      "The engineering team is the backbone of Seleris’s technology. They are responsible for developing and maintaining our AI-powered platform with a focus on performance, scalability, and security. With deep technical expertise, the team continuously innovates to ensure our solutions stay ahead of industry needs and deliver real value to users.",
  },
];
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
      class="relative flex flex-row py-2 w-full h-auto gap-x-8 md:gap-x-10 mt-5 overflow-x-auto snap-x snap-mandatory scroll-pl-10 pl-10 pr-10 md:scroll-pl-14 md:pl-14 md:pr-14 hide-scrollbar"
    >
      <div
        v-for="(position, index) in positions"
        :key="index"
        class="snap-start shrink-0 sml:h-auto sml:w-[330px] md:w-[740px] md:h-[350px] lg:w-[740px] lg:h-[447px] xl:w-[740px] xl:h-[447px] rounded-[22px]"
      >
        <div
          class="relative flex w-full h-full bg-[#FFFFFF] dark:bg-[#1D1F23] rounded-[22px] border-[#CFCFCF] border-[0.1px] dark:border-[#FAFAFA]/25 px-4 py-5"
        >
          <div class="flex flex-col w-full h-auto">
            <div class="flex flex-col md:flex-row w-full h-auto md:gap-x-5">
              <div
                class="flex w-full justify-center md:justify-start md:w-[20%] lg:w-[30%] h-[176px]"
              >
                <img
                  :src="position.robot"
                  alt="Robot"
                  class="w-[180px] h-[180px] md:w-full md:h-full object-contain object-bottom md:object-top"
                />
              </div>
              <div class="flex flex-col w-full md:w-[70%] h-auto gap-y-4 pt-5">
                <div
                  class="flex w-full h-[60px] md:h-auto justify-center items-center md:justify-start md:items-start"
                >
                  <p
                    class="text-[23px] md:text-[27px] lg:text-[32px] text-[#2AB857] font-[600] text-center"
                  >
                    {{ position.title }}
                  </p>
                </div>
                <div class="flex w-full h-auto justify-center md:justify-start">
                  <p
                    class="text-[14px] md:text-[16px] text-[#89A6BA] dark:text-[#6F6F6F] text-center md:text-start"
                  >
                    {{ position.subtitle }}
                  </p>
                </div>
              </div>
            </div>
            <div class="flex w-full h-auto md:px-10 mt-5 md:mt-0 lg:mt-14">
              <p
                class="text-[14px] md:text-[16px] lg:text-[18px] text-[#195279] dark:text-[#FAFAFA] font-[400] text-center md:text-start"
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
