<!-- Ini adalah card yang memiliki logo di sebelah kiri dan konten di sebelah kanan degan 2 kolom konten -->
<script setup>
defineProps({
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
    <div class="flex flex-row w-full h-auto">
      <div
        :class="`flex w-[20%] lg:w-[15%] xl:w-[20%] h-auto rounded-full p-2 md:p-3 xl:p-6 ${bgCard}`"
      >
        <img
          src="@/assets/images/technology/CardIcon.svg"
          alt="BenefitRobot"
          class="w-full h-full object-center object-contain"
        />
      </div>
      <div class="flex w-full ml-5 h-auto items-center">
        <p
          :class="`md:text-[22px] xl:text-[32px] font-[500] ${titleColor} dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-br dark:from-[#FAFAFA] dark:via-[#D4D4D4] dark:to-[#AAAAAA]`"
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
