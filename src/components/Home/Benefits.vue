<script setup>
import CardDefault from "@/components/reusable/CardDefault.vue";

const benefitList = [
  {
    title: "Speed",
    body: "Seleris processes images in real-time, with an average recognition time of under 100 milliseconds.",
  },
  {
    title: "Accuracy",
    body: "Advanced AI ensures over 99% accuracy in detecting.",
  },
  {
    title: "Cost Efficiency",
    body: "Automated processing reduces operational costs and improves ROI significantly.",
  },
];
</script>

<template>
  <div class="flex flex-col relative w-full py-10 mb-10">
    <div class="flex flex-col gap-3">
      <div class="flex w-full h-auto justify-center items-center">
        <p
          class="sml:text-2xl md:text-3xl lg:text-4xl xl:text-[48px] font-[500] text-[#195279] dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-br dark:from-[#FAFAFA] dark:via-[#D4D4D4] dark:to-[#AAAAAA]"
        >
          Benefits Seleris
        </p>
      </div>
      <div class="flex w-full h-auto justify-center items-center px-10">
        <p
          class="sml:text-xl md:text-2xl lg:text-3xl xl:text-[20px] font-[400] text-[#1DC457] dark:text-[#6A6A6A] text-center"
        >
          Get started with Seleris and see the difference for yourself
        </p>
      </div>
    </div>
    <div class="relative w-full h-auto">
      <div
        class="absolute w-32 h-full bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FAFAFA]/0 to-60% dark:bg-gradient-to-r dark:from-[#17181A] dark:from-0% dark:to-[#17181A]/0 dark:to-60% left-0 z-20 rounded-r-2xl"
      />
      <div
        class="absolute w-32 h-full bg-gradient-to-l from-[#FAFAFA] from-0% to-[#FAFAFA]/0 to-60% dark:bg-gradient-to-l dark:from-[#17181A] dark:from-0% dark:to-[#17181A]/0 dark:to-60% right-0 z-20 rounded-l-2xl"
      />
      <div
        class="relative flex flex-row w-full max-h-screen gap-x-10 sml:gap-x-5 md:gap-x-5 mt-16 sml:mt-4 md:mt-10 py-5 overflow-x-auto snap-x snap-mandatory sml:scroll-pl-10 sml:pl-10 sml:pr-10 md:scroll-pl-32 md:pl-32 md:pr-32 hide-scrollbar"
      >
        <CardDefault
          v-for="(benefit, index) in benefitList"
          :key="index"
          :title="benefit.title"
          :body="benefit.body"
        />
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
