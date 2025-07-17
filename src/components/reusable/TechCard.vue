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
    class="flex flex-col snap-start snap-mandatory shrink-0 md:gap-x-5 h-auto lg:w-[80%] xl:w-[50%] rounded-xl py-5 px-10 border bg-[#FFFFFF]"
  >
    <div class="flex flex-row w-full h-auto">
      <div
        :class="`flex lg:w-[15%] xl:w-[20%] h-auto rounded-full lg:p-5 xl:p-6 ${bgCard}`"
      >
        <img
          src="@/assets/images/technology/CardIcon.svg"
          alt="BenefitRobot"
          class="w-full h-full object-center object-contain"
        />
      </div>
      <div class="flex w-full ml-10 h-auto items-center">
        <p :class="`lg:text-[24px] xl:text-[32px] font-[500] ${titleColor}`">
          {{ title }}
        </p>
      </div>
    </div>
    <div class="w-full h-auto mt-5">
      <p
        class="md:text-[16px] lg:text-[14px] xl:text-[18px] text-[#535862] font-[400]"
      >
        {{ body }}
      </p>
    </div>
  </div>
</template>
