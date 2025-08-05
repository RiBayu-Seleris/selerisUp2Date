<script setup>
import HeroText from "@/components/reusable/HeroText.vue";

const cardDetail = [
  {
    title: "Connect your favorite tools in minutes.",
    description:
      "Seleris Credit Cover integrates with a wide range of third-party apps to help you unify all your business data in one place. No more switching tabs, everything works together smoothly.",
  },
  {
    title: "Automate repetitive tasks and save hours.",
    description:
      "Create smart workflows using drag-and-drop logic. Let Seleris handle the routine so your team can focus on what really matters innovation and growth.",
  },
  {
    title: "Make data-driven decisions with live analytics.",
    description:
      "Track performance metrics, customer behavior, and operational data as they happen. With visual dashboards and instant reports, your team stays informed and agile.",
  },
];
</script>
<template>
  <section
    class="flex w-full h-auto sml:pt-[120px] md:pt-[150px] lg:pt-[160px] xl:pt-[160px]"
  >
    <HeroText
      title="Innovation"
      subtitle="Roadmap Seleris Meditekno Internasional"
    />
  </section>
  <div class="relative w-full h-auto">
    <img
      src="@/assets/images/frame-wave.png"
      alt=""
      srcset=""
      class="bottom-0 w-full h-full"
    />
  </div>
  <section class="w-full h-[400px] bottom-0 bg-red-600"></section>
  <!-- Card Description -->
  <section class="w-full h-auto mt-20">
    <div class="w-full h-auto flex flex-col">
      <div class="w-full h-auto px-10">
        <div
          class="w-full h-auto relative p-0.5 bg-gradient-to-r from-[#2C43B7] via-[#3ED2B2] to-[#50B6EE] rounded-[30px]"
        >
          <div
            class="w-full h-full flex flex-col bg-[#FFFFFF] dark:bg-[#323232] p-8 lg:p-14 rounded-[30px] gap-y-5"
          >
            <p
              class="md:text-[27px] text-center text-[#195279] font-[500] dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-br dark:from-[#FAFAFA] dark:via-[#D4D4D4] dark:to-[#AAAAAA]"
            >
              Seleris Credit Cover
            </p>
            <p
              class="text-center text-[#195279] dark:text-[#6F6F6F] text-[14px] md:text-[17px] lg:text-[19px] lg:px-8"
            >
              Seleris Credit Cover is an AI-powered platform designed to
              streamline your business operations by offering intelligent
              automation and seamless data integration. With a user-friendly
              interface and smart, real-time analytics, Seleris Credit Cover
              empowers teams to make better decisions faster, scale
              effortlessly, and enhance operational efficiency. Whether you're
              managing workflows, analyzing customer behavior, or integrating
              tools, Seleris gives you the power to turn insights into impact.
            </p>
          </div>
        </div>
      </div>
      <div class="w-full h-auto mt-4 lg:mt-10">
        <div
          class="relative flex flex-row w-full max-h-screen gap-x-10 sml:gap-x-5 md:gap-x-10 mt-16 sml:mt-4 md:mt-10 py-5 overflow-x-auto snap-x snap-mandatory sml:scroll-pl-10 sml:pl-10 sml:pr-10 md:scroll-pl-10 md:pl-10 md:pr-10 xl:scroll-pl-10 xl:pl-10 xl:pr-10 hide-scrollbar"
        >
          <div
            v-for="(detail, index) in cardDetail"
            :key="index"
            class="w-full h-auto relative p-0.5 bg-gradient-to-r from-[#2C43B7] via-[#3ED2B2] to-[#50B6EE] rounded-[30px]"
          >
            <div
              class="w-[300px] md:w-[500px] h-full flex flex-col bg-[#FFFFFF] dark:bg-[#323232] p-5 md:p-8 rounded-[30px] justify-between"
            >
              <p
                class="text-center md:px-16 pb-4 text-[#195279] font-[500] md:text-[21px] dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-br dark:from-[#FAFAFA] dark:via-[#D4D4D4] dark:to-[#AAAAAA]"
              >
                {{ detail.title }}
              </p>
              <p
                class="text-center text-[#195279] md:text-[17px] dark:text-[#6F6F6F]"
              >
                {{ detail.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
