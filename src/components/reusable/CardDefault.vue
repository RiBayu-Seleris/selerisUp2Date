<!-- Ini adalah card yang memiliki logo di sebelah kiri dan konten di sebelah kanan degan 2 kolom konten -->
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
});
</script>

<template>
  <div
    class="hidden lg:flex flex-row snap-center shrink-0 p-5 md:gap-x-5 w-[80%] h-[270px] md:w-[450px] md:h-[180px] lg:w-[55%] lg:h-[180px] rounded-xl bg-[#FFFFFF] dark:bg-[#1D1F23] border-[0.1px] dark:border-[#FAFAFA]/25"
  >
    <div class="flex w-[30%] lg:w-[30%] h-auto">
      <img
        :src="icon"
        alt="BenefitRobot"
        class="w-full h-full object-center object-contain"
      />
    </div>
    <div class="w-[70%] lg:w-[70%] h-auto flex justify-center items-center">
      <div class="flex flex-col w-full h-full items-center justify-between">
        <div class="w-full h-[40%] flex items-center">
          <p class="text-[#2AB857] text-[24px] md:text-[20px] lg:text-[24px]">
            {{ title }}
          </p>
        </div>
        <div class="w-full h-[60%] flex justify-start items-start">
          <p
            class="text-[18px] md:text-[16px] lg:text-[18px] text-[#195279] dark:text-[#FAFAFA]"
          >
            {{ body }}
          </p>
        </div>
      </div>
    </div>
  </div>

  <!-- Mobile Smalls -->
  <div
    class="flex flex-col lg:hidden snap-center shrink-0 w-full sm:w-[60%] md:w-[60%] h-auto rounded-xl px-5 py-5 sm:py-2 shadow-lg dark:bg-[#1D1F23] border-[0.1px] dark:border-[#FAFAFA]/25 space-y-2 sm:space-y-2"
  >
    <div class="flex flex-row">
      <div class="flex w-[40%] h-auto">
        <img
          :src="icon"
          alt="BenefitRobot"
          class="w-full h-full object-center object-contain"
        />
      </div>
      <div class="flex w-full h-auto text-[#2AB857] pl-5 items-center">
        <p class="text-[16px] sm:text-[16px] md:text-[20px]">{{ title }}</p>
      </div>
    </div>
    <div class="flex flex-col w-full h-full pb-2 sm:pb-5">
      <div class="flex w-full h-full items-start justify-start">
        <p
          class="text-[12px] sm:text-[14px] text-[#195279] dark:text-[#FAFAFA]"
        >
          {{ body }}
        </p>
      </div>
    </div>
  </div>
</template>
