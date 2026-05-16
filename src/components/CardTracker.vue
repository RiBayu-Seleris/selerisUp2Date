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
        class="w-[250px] lg:w-[320px] xl:w-[400px] h-auto flex flex-row gap-x-4 justify-between items-start"
      >
        <div
          class="w-6 h-6 lg:w-7 lg:h-7 xl:w-10 xl:h-10 shrink-0 flex justify-center items-center bg-gradient-to-b from-[#D0D0D0] from-[0%] to-[#D0D0D0]/40 dark:from-[#63FD94] dark:to-[#3B9758]/0 rounded-md p-[1px]"
        >
          <div
            class="w-full h-full rounded-md bg-[#FFFFFF] dark:bg-[#2AB857] backdrop-blur-[100px] shadow-[0_26px_44px_0_rgba(0,0,0,0.08)] text-[#2AB857] dark:text-[#FFFFFF]"
          >
            <component :is="icon" class="w-full h-full p-1" />
          </div>
        </div>
        <div
          class="w-full h-auto flex flex-col gap-y-2 xl:gap-y-4 lg:pt-0.5 xl:pt-1"
        >
          <div class="w-full flex justify-start">
            <p
              class="text-[#195279] font-[500] text-[14px] lg:text-[16px] xl:text-[20px] dark:bg-clip-text dark:text-transparent dark:bg-gradient-to-r dark:from-[#FAFAFA] dark:via-[#D4D4D4] dark:to-[#AAAAAA]"
            >
              {{ title }}
            </p>
          </div>
          <div class="w-full">
            <p
              class="text-[#8C8181] dark:text-[#8C8181] text-[10px] lg:text-[12px] xl:text-[16px]"
            >
              {{ description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
