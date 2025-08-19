<script setup>
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
  <div
    :class="`hidden lg:block w-full h-auto ${bgImage} rounded-b-[3rem] pb-5`"
  >
    <div class="flex flex-col w-full h-auto xl:px-10 lg:px-5">
      <div class="flex flex-col w-full h-auto lg:mt-8 xl:mt-20">
        <div class="flex w-full h-auto">
          <!-- Title -->
          <p class="text-[23px] xl:text-[24px] text-[#1DC457]">
            <!-- What Makes Us Different? -->
            {{ title }}
          </p>
        </div>
        <div class="flex w-[70%] h-auto mt-2 xl:mt-5">
          <!-- Title Body -->
          <p
            class="lg:text-2xl xl:text-[41px] text-[#195279] dark:text-[#FAFAFA] leading-[40px] xl:leading-[65px] font-[500]"
          >
            <!-- We bring solutions to make life insurance for our customers. -->
            {{ subtitle }}
          </p>
        </div>
      </div>
      <div class="flex flex-row w-full h-auto lg:mt-5 xl:mt-10">
        <div class="flex flex-col w-8/12 h-auto">
          <slot />
        </div>
        <div class="flex w-4/12 h-auto">
          <div class="flex w-full h-full z-0">
            <!-- src="@/assets/images/robot-ai3.svg" -->
            <img
              :src="robotImage"
              alt="Robot"
              class="w-full lg:h-[250px] xl:h-[300px] object-contain object-top top-0 md:animate__animated md:animate-bounce2"
            />
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Mobile -->
  <slot name="mobile" />
</template>
