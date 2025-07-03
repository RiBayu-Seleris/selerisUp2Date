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
    class="flex flex-col lg:hidden w-full h-auto bg-[#f2f3f3] rounded-[2rem] py-5 relative"
  >
    <div class="w-[15rem] h-[15rem] justify-center items-center self-center">
      <div class="w-auto h-full z-50">
        <!-- src="@/assets/images/robot-ai3.svg" -->
        <img
          :src="robotImage"
          alt="Robot"
          class="w-full h-full object-contain object-center animate-bounce"
        />
      </div>
    </div>
    <div class="flex flex-col w-full h-full px-5 justify-center">
      <div class="w-full h-auto">
        <p
          class="sml:text-[17pt] md:text-[23pt] leading-[32pt] font-semibold text-center text-[#1DC457]"
        >
          <!-- What Makes Us Different? -->
          {{ title }}
        </p>
      </div>
      <div class="w-full h-auto">
        <p
          class="sml:text-[14pt] md:text-[17pt] sml:leading-relaxed md:leading-[32pt] font-normal text-center text-[#195279]"
        >
          <!-- We bring solutions to make life insurance for our customers. -->
          {{ subtitle }}
        </p>
      </div>
    </div>
    <div
      class="flex flex-col md:grid md:grid-cols-2 md:gap-x-10 w-full md:mt-3 sml:mt-5 px-5"
    >
      <slot name="mobileContentDifferent" />
    </div>
  </div>
</template>
