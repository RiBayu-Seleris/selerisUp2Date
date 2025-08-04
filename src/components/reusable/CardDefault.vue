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
    class="sml:hidden lg:flex flex-row snap-start shrink-0 md:gap-x-5 w-[80%] md:w-[450px] md:h-[180px] lg:w-[50%] sml:h-[270px] lg:h-[200px] rounded-xl p-5 bg-[#FFFFFF] dark:bg-[#1D1F23] border-[0.1px] dark:border-[#FAFAFA]/25"
  >
    <div class="flex w-[30%] lg:w-[30%] h-auto">
      <img
        :src="icon"
        alt="BenefitRobot"
        class="w-full h-full object-center object-contain"
      />
    </div>
    <div class="w-[70%] lg:w-[70%] h-auto justify-center">
      <div class="flex flex-col w-full h-full items-center justify-between">
        <div class="w-full h-[100px] flex items-center">
          <p class="text-[24px] text-[#2AB857] md:text-[20px]">{{ title }}</p>
        </div>
        <div class="w-full h-full">
          <p
            class="text-[18px] md:text-[16px] text-[#195279] dark:text-[#FAFAFA]"
          >
            {{ body }}
          </p>
        </div>
      </div>
    </div>
  </div>

  <!-- Mobile Smalls -->
  <div
    class="lg:hidden sml:flex flex-col snap-start shrink-0 sml:w-full md:w-[60%] h-[200px] rounded-xl p-5 shadow-lg dark:bg-[#1D1F23] border-[0.1px] dark:border-[#FAFAFA]/25"
  >
    <div class="flex flex-row">
      <div class="flex w-[70px] h-[70px]">
        <img
          :src="icon"
          alt="BenefitRobot"
          class="w-full h-full object-center object-contain"
        />
      </div>
      <div class="flex w-full h-auto text-[#2AB857] pl-3 items-center">
        <p class="text-[24px] sml:text-[20px]">{{ title }}</p>
      </div>
    </div>
    <div class="flex flex-col w-full h-full">
      <div class="flex w-full h-full items-center justify-center">
        <p
          class="text-[1.1rem] sml:text-[14px] text-[#195279] dark:text-[#FAFAFA]"
        >
          {{ body }}
        </p>
      </div>
    </div>
  </div>
</template>
