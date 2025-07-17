<script setup>
import DifferentCard from "@/components/reusable/DifferentCard.vue";
defineProps({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: true,
  },
  robotImage: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div
    class="flex flex-col lg:hidden w-full h-auto bg-[#f2f3f3] dark:bg-[#1E1F1C] dark:border-1 dark:border-white rounded-[2rem] py-5 relative"
  >
    <div class="w-[10rem] h-[10rem] justify-center items-center self-center">
      <div class="w-auto h-full z-50">
        <!-- src="@/assets/images/robot-ai3.svg" -->
        <img
          :src="robotImage"
          alt="Robot"
          class="w-full h-full object-contain object-center robot-wiggle"
        />
      </div>
    </div>
    <div class="flex flex-col w-full h-full px-5 gap-y-2 justify-center">
      <div class="w-full h-auto">
        <p
          class="sml:text-[14pt] md:text-[23pt] leading-[27pt] font-[400] text-center text-[#1DC457]"
        >
          <!-- What Makes Us Different? -->
          {{ title }}
        </p>
      </div>
      <div class="w-full h-auto">
        <p
          class="sml:text-[12pt] md:text-[17pt] sml:leading-relaxed md:leading-[32pt] font-normal text-center text-[#195279] dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-br dark:from-[#FAFAFA] dark:via-[#D4D4D4] dark:to-[#AAAAAA]"
        >
          <!-- We bring solutions to make life insurance for our customers. -->
          {{ subtitle }}
        </p>
      </div>
    </div>
    <div
      class="flex flex-col md:grid md:grid-cols-2 md:gap-x-10 w-full sml:mt-5 md:mt-10 px-5"
    >
      <slot name="mobileContentDifferent" />
    </div>
  </div>
</template>
<style scoped>
@keyframes robotWiggle {
  0% {
    transform: rotate(7deg);
  }
  25% {
    transform: rotate(-7deg);
  }
  50% {
    transform: rotate(4deg);
  }
  75% {
    transform: rotate(-4deg);
  }
  100% {
    transform: rotate(7deg);
  }
}

.robot-wiggle-hover:hover {
  animation: robotWiggle 5s linear infinite;
  transform-origin: bottom center;
}
.robot-wiggle {
  animation: robotWiggle 5s linear infinite;
  transform-origin: bottom center;
}
</style>
