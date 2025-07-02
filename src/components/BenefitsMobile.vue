<script setup>
import { ref, onMounted } from "vue";
import ArrowLeft from "@/components/icons/ArrowLeft.vue";
import ArrowRight from "@/components/icons/ArrowRight.vue";

const cards = [
  {
    title: "Accuracy",
    text: "Test results show that Seleris can recognize faces with up to 99% accuracy.",
  },
  {
    title: "Testimonials",
    text: "Test results show that Seleris can recognize faces with up to 99% accuracy.",
  },
  {
    title: "Speed",
    text: "Seleris processes images in real-time, with an average recognition time of under 100 milliseconds.",
  },
  {
    title: "Scalability",
    text: "Seleris can handle thousands of simultaneous users without a drop in performance.",
  },
  {
    title: "Integration",
    text: "Seleris easily integrates with existing security systems and applications.",
  },
];
</script>

<template>
  <div class="flex flex-col w-full h-full">
    <!-- Top Side -->
    <div class="flex flex-col w-full h-auto pt-7 text-center gap-y-3">
      <p class="text-2xl md:text-4xl text-[#195279] font-semibold">
        Benefits Seleris Insurance
      </p>
      <p class="text-xl md:text-2xl text-[#1DC457] px-8">
        Get started with Seleris and see the difference for yourself
      </p>
    </div>
    <!-- Under Side -->
    <div
      class="relative w-full h-auto pt-5 rounded-tl-3xl rounded-b-3xl overflow-hidden"
    >
      <div
        class="flex gap-7 h-auto overflow-x-auto scroll-smooth snap-x snap-mandatory hide-scrollbar px-10"
      >
        <div
          v-for="(card, index) in cards"
          :key="index"
          :class="`bg-benefits${index + 1} 
            w-[250px] h-[350px] 
            shrink-0 rounded-2xl flex justify-center items-center text-white text-xl snap-center bg-contain bg-center bg-no-repeat`"
        >
          <div
            class="flex flex-col w-full h-full justify-center items-center px-3 text-center"
          >
            <div class="flex justify-center items-center w-full h-[90px]">
              <img
                src="@/assets/images/rocket.png"
                alt="Rocket"
                class="w-full h-full object-contain object-center robot-wiggle"
              />
            </div>
            <!-- <div class="w-full h-auto bg-red-400">{{ card.title }}</div> -->
            <div
              class="flex text-center justify-center items-center w-full h-[50px] mt-5 mb-2 font-semibold"
            >
              <p class="text-2xl">{{ card.title }}</p>
            </div>
            <div
              class="flex text-center justify-center items-start w-full h-[120px] pt-2"
            >
              <p class="text-base">{{ card.text }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.bg-benefits1 {
  background-image: url("@/assets/images/card1.png");
}
.bg-benefits2 {
  background-image: url("@/assets/images/card2.png");
}
.bg-benefits3 {
  background-image: url("@/assets/images/card3.png");
}
.bg-benefits4 {
  background-image: url("@/assets/images/card4.png");
}
.bg-benefits5 {
  background-image: url("@/assets/images/card5.png");
}
.bg-benefits6 {
  background-image: url("@/assets/images/card6.png");
}

.hide-scrollbar::-webkit-scrollbar {
  display: none;
}

.hide-scrollbar {
  -ms-overflow-style: none; /* IE dan Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
