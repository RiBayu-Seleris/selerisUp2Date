<script setup>
import FaceTracker from "@/components/FaceScan/index.vue";
import ArrowLeft from "@/components/icons/ArrowLeft.vue";
</script>
<template>
  <div class="w-full h-screen p-5">
    <div
      class="w-full h-full flex flex-row justify-between items-center gap-x-5"
    >
      <div class="w-[28%] h-full shrink-0 flex flex-col gap-y-5">
        <div
          class="w-full h-auto flex flex-row gap-x-4 justify-start items-center bg-[#FFFFFF] rounded-full text-[#000000] border-[1px]"
        >
          <div
            class="w-10 h-10 flex justify-center items-center bg-[#F7F7F7] rounded-full p-1.5 border-[1px]"
          >
            <ArrowLeft />
          </div>
          <div class="w-full h-full flex items-center">
            <p class="text-[16px] font-[400]">Back to Site</p>
          </div>
        </div>
        <div
          class="w-full h-auto flex flex-col justify-start items-center p-4 bg-[#FFFFFF] rounded-lg"
        >
          <div class="w-full"></div>
        </div>
        <div class="w-full h-auto flex justify-start items-center"></div>
        <div class="w-full h-auto flex justify-start items-center"></div>
      </div>
      <div class="flex-1 h-full flex justify-center items-center bg-purple-500">
        <!-- <FaceTracker /> -->
      </div>
      <div class="w-[28%] h-full shrink-0 bg-orange-500"></div>
    </div>
  </div>
</template>
