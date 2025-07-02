<script setup>
import { ref, onMounted } from "vue";
import ArrowLeft from "@/components/icons/ArrowLeft.vue";
import ArrowRight from "@/components/icons/ArrowRight.vue";
import BenefitsMobile from "@/components/BenefitsMobile.vue";

const containerRef = ref(null);
const currentIndex = ref(0);
const cardWidth = 350; // sesuai class w-[400px]
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

const visibleCards = ref(0); // jumlah card yang kelihatan
const maxIndex = ref(0); // index maksimum bisa digeser

onMounted(() => {
  const containerWidth = containerRef.value?.clientWidth || 0;
  visibleCards.value = Math.floor(containerWidth / cardWidth);
  maxIndex.value = cards.length - visibleCards.value;
});

const scrollToIndex = () => {
  const scrollX = currentIndex.value * cardWidth;
  containerRef.value?.scrollTo({ left: scrollX, behavior: "smooth" });
};

const scrollLeft = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--;
    scrollToIndex();
  }
};

const scrollRight = () => {
  if (currentIndex.value < maxIndex.value) {
    currentIndex.value++;
    scrollToIndex();
  }
};
</script>

<template>
  <div
    class="hidden lg:flex w-full h-[105vh] bg-benefits bg-cover bg-top bg-no-repeat rounded-b-[2.5rem]"
  >
    <div class="flex flex-col w-full h-full">
      <!-- Top Side -->
      <div class="flex flex-row w-full h-auto">
        <div class="flex flex-col w-[55%] h-[140px] pt-2">
          <div class="w-full h-auto text-[#195279]">
            <p class="text-5xl font-normal">Benefits Seleris Insurance</p>
          </div>
          <div class="w-full h-auto text-[#1DC457]">
            <p class="text-xl pt-3">
              Get started with Seleris and see the difference for yourself
            </p>
          </div>
        </div>
        <div class="flex w-[45%] h-[140px]">
          <div class="flex w-full h-full items-end justify-end pr-16">
            <div
              class="flex flex-row bg-white rounded-full items-center justify-center py-3 px-4 gap-4"
            >
              <button
                @click="scrollLeft"
                :disabled="currentIndex === 0"
                :class="[
                  'w-14 h-14 flex justify-center items-center rounded-full disabled:opacity-50',
                  currentIndex === 0
                    ? 'bg-white opacity-50 cursor-not-allowed'
                    : 'bg-[#2AB857] text-[#E5E7EB]',
                ]"
              >
                <ArrowLeft class="text-[#E5E7EB]" />
              </button>
              <button
                @click="scrollRight"
                :disabled="currentIndex === maxIndex"
                :class="[
                  'w-14 h-14 flex justify-center items-center rounded-full disabled:opacity-50',
                  currentIndex === maxIndex
                    ? 'bg-white opacity-50 cursor-not-allowed'
                    : 'bg-[#2AB857] text-#E5E7EB',
                ]"
              >
                <ArrowRight class="text-[#E5E7EB]" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- Under Side -->
      <div
        class="relative w-full h-auto pt-10 rounded-tl-3xl rounded-b-3xl overflow-hidden"
      >
        <div
          ref="containerRef"
          class="flex gap-7 h-auto overflow-x-auto scroll-smooth snap-x snap-mandatory hide-scrollbar px-10"
        >
          <div
            v-for="(card, index) in cards"
            :key="index"
            :class="`bg-benefits${index + 1} 
            w-[350px] h-[450px] 
            shrink-0 rounded-2xl flex justify-center items-center text-white text-xl snap-center bg-contain bg-center bg-no-repeat`"
          >
            <div
              class="flex flex-col w-full h-full justify-center items-center px-7 text-center"
            >
              <div class="flex justify-center items-center w-full h-[100px]">
                <img
                  src="@/assets/images/rocket.png"
                  alt="Robot"
                  class="w-full h-full object-contain object-center robot-wiggle"
                />
              </div>
              <!-- <div class="w-full h-auto bg-red-400">{{ card.title }}</div> -->
              <div
                class="flex text-center justify-center items-center w-full h-[50px] mt-10 font-normal"
              >
                <p class="text-3xl">{{ card.title }}</p>
              </div>
              <div
                class="flex text-center justify-center items-center w-full h-[150px]"
              >
                <p class="text-xl">{{ card.text }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div
    class="flex lg:hidden w-full max-h-screen bg-[#f2f3f3] mt-20 rounded-3xl pb-5"
  >
    <BenefitsMobile />
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
