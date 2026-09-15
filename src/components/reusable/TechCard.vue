<script setup>
defineProps({
  icon: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  titleColor: {
    type: String,
    required: true,
  },
  bgCard: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div
    class="flex flex-col snap-start snap-mandatory shrink-0 md:gap-x-5 h-auto w-[85%] md:w-[45%] lg:w-[45%] xl:w-[47%] rounded-xl py-6 px-5 lg:px-10 border-[0.1px] bg-[#FFFFFF] dark:bg-[#1D1F23] dark:border-[#FAFAFA]/25"
  >
    <div class="flex flex-row w-full h-auto items-center">
      <div
        :class="`flex shrink-0 items-center justify-center w-[18%] md:w-[16%] lg:w-[13%] xl:w-[14%] aspect-square rounded-full p-2.5 md:p-3 xl:p-4 ${bgCard}`"
      >
        <img
          :src="icon"
          alt="Icon"
          class="w-full h-full object-center object-contain"
        />
      </div>
      <div class="flex w-full ml-3.5 md:ml-4 xl:ml-5 h-auto items-center">
        <p
          :class="`text-[14px] md:text-[16px] lg:text-[17px] xl:text-[20px] font-[500] leading-snug min-h-[4.125em] flex items-center ${titleColor} dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-br dark:from-[#FAFAFA] dark:via-[#D4D4D4] dark:to-[#AAAAAA]`"
        >
          {{ title }}
        </p>
      </div>
    </div>
    <div class="w-full h-auto mt-5">
      <p
        class="text-[12px] md:text-[14px] lg:text-[14px] xl:text-[18px] text-[#535862] dark:text-[#FAFAFA] font-[400]"
      >
        {{ body }}
      </p>
    </div>
  </div>
</template>
