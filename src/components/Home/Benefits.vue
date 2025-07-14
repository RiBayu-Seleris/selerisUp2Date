<script setup>
import CardDefault from "@/components/reusable/CardDefault.vue";

const benefitList = [
  {
    title: "Speed",
    body: "Seleris processes images in real-time, with an average recognition time of under 100 milliseconds.",
  },
  {
    title: "Accuracy",
    body: "Advanced AI ensures over 99% accuracy in detecting and evaluating insurance claims.",
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
          class="sml:text-2xl md:text-3xl lg:text-4xl xl:text-[48px] font-[500] text-[#195279]"
        >
          Benefits Seleris Insurance
        </p>
      </div>
      <div class="flex w-full h-auto justify-center items-center px-10">
        <p
          class="sml:text-xl md:text-2xl lg:text-3xl xl:text-[20px] font-[400] text-[#1DC457] text-center"
        >
          Get started with Seleris and see the difference for yourself
        </p>
      </div>
    </div>
    <div
      class="flex flex-row w-full max-h-screen gap-x-10 sml:gap-x-5 md:gap-x-5 mt-16 sml:mt-4 md:mt-10 py-5 overflow-x-auto snap-x snap-mandatory scroll-pl-24 pl-24 pr-24 sml:scroll-pl-10 sml:pl-10 sml:pr-10 hide-scrollbar"
    >
      <CardDefault
        v-for="(benefit, index) in benefitList"
        :key="index"
        :title="benefit.title"
        :body="benefit.body"
      />
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
