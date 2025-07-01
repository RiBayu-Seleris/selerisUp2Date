<script setup>
import { ref, onMounted } from "vue";
import ArrowLeft from "@/components/icons/ArrowLeft.vue";
import ArrowRight from "@/components/icons/ArrowRight.vue";

const containerRef = ref(null);
const currentIndex = ref(0);
const cardWidth = 400; // sesuai class w-[400px]
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
  <div class="mx-10 mt-20">
    <div class="hidden lg:flex flex-col bg-[#F9F9FB]">
      <!-- Header -->
      <div class="flex flex-row bg-[#F9F9FB]">
        <div class="lg:bg-[#F3F4F6] sml:w-[60%] md:w-[25%] lg:w-4/5">
          <div
            class="flex flex-col h-full w-full justify-center items-center rounded-br-[2rem] bg-[#F9F9FB]"
          >
            <div class="flex w-full">
              <p class="text-5xl text-[#195279]">Benefits Seleris Insurance</p>
            </div>
            <div class="flex w-full">
              <p class="text-xl text-[#1DC457]">
                Get started with Seleris and see the difference for yourself
              </p>
            </div>
          </div>
        </div>

        <!-- Panah -->
        <div
          class="flex h-[120px] md:w-[75%] lg:w-3/5 items-end justify-end px-5 rounded-tr-[2rem] rounded-tl-[5rem] bg-[#F3F4F6]"
        >
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

      <!-- Scroll Snap Container -->
      <div
        class="relative w-full h-auto pt-5 bg-[#F3F4F6] pb-5 rounded-tl-3xl rounded-b-3xl overflow-hidden"
      >
        <div
          ref="containerRef"
          class="flex gap-0 h-full overflow-x-auto scroll-smooth snap-x snap-mandatory hide-scrollbar"
        >
          <div
            v-for="(card, index) in cards"
            :key="index"
            :class="`bg-benefits${
              index + 1
            } w-[400px] h-[450px] shrink-0 rounded-2xl flex justify-center items-center text-white text-xl snap-center`"
          >
            <div
              class="flex flex-col w-full h-full justify-center items-center px-10 text-center"
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
                class="flex text-center justify-center items-center w-full h-[50px] mt-10 font-semibold"
              >
                <p class="text-3xl">{{ card.title }}</p>
              </div>
              <div
                class="flex text-center justify-center items-center w-full h-[150px] text-md"
              >
                <p class="text-md">{{ card.text }}</p>
              </div>
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
.bg-benefits1,
.bg-benefits2,
.bg-benefits3,
.bg-benefits4,
.bg-benefits5,
.bg-benefits6 {
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
}

.hide-scrollbar::-webkit-scrollbar {
  display: none;
}

.hide-scrollbar {
  -ms-overflow-style: none; /* IE dan Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
