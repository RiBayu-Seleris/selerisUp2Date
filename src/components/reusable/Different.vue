<script setup>
// import DifferentCard from "@/components/reusable/DifferentCard.vue";
import DifferentMobile from "@/components/reusable/DifferentMobile.vue";

defineProps({
  bgImage: {
    type: String,
    required: true,
  },
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
  <div class="px-10 my-16">
    <div :class="`hidden lg:block w-full h-auto ${bgImage} rounded-b-[3rem]`">
      <div class="flex flex-col w-full h-auto px-10">
        <div class="flex flex-col w-full h-auto mt-20">
          <div class="flex w-full h-auto">
            <!-- Title -->
            <p class="text-3xl text-[#1DC457]">
              <!-- What Makes Us Different? -->
              {{ title }}
            </p>
          </div>
          <div class="flex w-[70%] h-auto mt-5">
            <!-- Title Body -->
            <p class="text-4xl text-[#195279] leading-[40px] font-semibold">
              <!-- We bring solutions to make life insurance for our customers. -->
              {{ subtitle }}
            </p>
          </div>
        </div>
        <div class="flex flex-row w-full h-auto mt-10">
          <div class="flex flex-col w-8/12 h-auto">
            <slot />
          </div>
          <div class="flex w-4/12 h-auto">
            <div class="flex w-full h-full z-0">
              <!-- src="@/assets/images/robot-ai3.svg" -->
              <img
                :src="robotImage"
                alt="Robot"
                class="w-full h-[350px] object-contain object-top top-0 animate-bounce"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile -->
    <slot name="mobile" />
  </div>
</template>
