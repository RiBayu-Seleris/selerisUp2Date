<script setup>
const props = defineProps({
  icon: String,
  title: String,
  description: String,
});
</script>

<template>
  <div
    class="w-auto h-auto flex justify-center items-center p-[1px] bg-white/50 dark:bg-gradient-to-tr dark:from-[#17181A] dark:from-45% dark:to-[#565656] shadow-[0_26px_44px_0_rgba(0,0,0,0.08)] rounded-xl"
  >
    <div
      class="relative w-auto h-auto flex flex-col justify-center items-center bg-white/40 dark:bg-[#1D1F23] backdrop-blur-[30px] px-4 py-5 rounded-xl"
    >
      <div
        class="w-[300px] xl:w-[350px] h-auto flex flex-row gap-x-4 justify-between items-start"
      >
        <div
          class="lg:w-7 lg:h-7 xl:w-10 xl:h-10 shrink-0 flex justify-center items-center bg-orange-500 rounded-md"
        >
          P
        </div>
        <div
          class="w-full h-auto flex flex-col gap-y-2 xl:gap-y-4 pt-0.5 xl:pt-1"
        >
          <div class="w-full flex justify-start">
            <p
              class="text-[#195279] font-[500] lg:text-[16px] xl:text-[20px] dark:bg-clip-text dark:text-transparent dark:bg-gradient-to-r dark:from-[#FAFAFA] dark:via-[#D4D4D4] dark:to-[#AAAAAA]"
            >
              Precise measurement
            </p>
          </div>
          <div class="w-full">
            <p
              class="text-[#8C8181] dark:text-[#8C8181] text-[12px] xl:text-[16px]"
            >
              Creates unique 3D model of your face for accurate health
              measurements.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
