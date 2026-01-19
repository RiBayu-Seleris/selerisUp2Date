<script setup>
import CardDefault from "@/components/reusable/CardDefault.vue";

const benefitList = [
  {
    icon: new URL("@/assets/icons/Benefits/accuracy.png", import.meta.url).href,
    title: "Accuracy",
    body: "The results show that Seleris can recognize faces with up to 94% accuracy.",
  },
  {
    icon: new URL("@/assets/icons/Benefits/speed.png", import.meta.url).href,
    title: "Speed",
    body: "Seleris has a lightning fast speed. it can open and run features quickly.",
  },
  {
    icon: new URL("@/assets/icons/Benefits/efficiency.png", import.meta.url)
      .href,
    title: "Efficiency",
    body: "The app’s simple interface helps users quickly find desired features easily.",
  },
  {
    icon: new URL("@/assets/icons/Benefits/testimonial.png", import.meta.url)
      .href,
    title: "Testimonial",
    body: "Embrace the power of collaboration with a multitude of partners.",
  },
  {
    icon: new URL("@/assets/icons/Benefits/experience.png", import.meta.url)
      .href,
    title: "Customer Experience",
    body: "We commit to giving Seleris users the best, easy, safe, and comfortable experience.",
  },
  {
    icon: new URL("@/assets/icons/Benefits/guarantee.png", import.meta.url)
      .href,
    title: "Guarantee",
    body: "Your data security is our priority, protected with advanced cutting-edge technology.",
  },
];
</script>

<template>
  <div class="flex flex-col relative w-full dark:bg-[#17181A]">
    <div class="flex flex-col gap-y-3 xl:gap-y-5 dark:bg-[#17181A]">
      <div
        class="flex w-full h-auto justify-center items-center dark:bg-[#17181A]"
      >
        <p
          class="text-2xl md:text-[32px] lg:text-[44px] xl:text-[44px] font-[500] text-[#195279] dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-br dark:from-[#FAFAFA] dark:via-[#D4D4D4] dark:to-[#AAAAAA]"
        >
          Benefits Seleris
        </p>
      </div>
      <div class="flex w-full h-auto justify-center items-center px-10">
        <p
          class="text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] xl:text-[20px] font-[400] text-[#1DC457] dark:text-[#6A6A6A] text-center"
        >
          Get started with Seleris and see the difference for yourself
        </p>
      </div>
    </div>
    <div class="relative w-full h-auto">
      <div
        class="hidden xl:flex absolute w-32 h-full bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FAFAFA]/0 to-60% dark:bg-gradient-to-r dark:from-[#17181A] dark:from-0% dark:to-[#17181A]/0 dark:to-60% left-0 z-20 rounded-r-2xl"
      />
      <div
        class="hidden xl:flex absolute w-32 h-full bg-gradient-to-l from-[#FAFAFA] from-0% to-[#FAFAFA]/0 to-60% dark:bg-gradient-to-l dark:from-[#17181A] dark:from-0% dark:to-[#17181A]/0 dark:to-60% right-0 z-20 rounded-l-2xl"
      />
      <div
        class="relative flex flex-row w-full max-h-screen gap-x-5 md:gap-x-5 lg:gap-x-10 mt-4 md:mt-5 py-5 overflow-x-auto snap-x snap-mandatory sm:pl-10 px-8 sm:pr-10 md:pl-16 md:pr-16 xl:pl-20 xl:pr-16 hide-scrollbar"
      >
        <CardDefault
          v-for="(benefit, index) in benefitList"
          :key="index"
          :icon="benefit.icon"
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
