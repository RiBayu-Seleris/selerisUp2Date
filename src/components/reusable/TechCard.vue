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
    class="flex flex-col snap-start snap-mandatory shrink-0 md:gap-x-5 w-[50%] rounded-xl p-10 border bg-[#FFFFFF]"
  >
    <div class="flex flex-row w-full h-auto gap-x-5">
      <div :class="`flex w-[20%] h-auto rounded-full p-6 ${bgCard}`">
        <img
          src="@/assets/images/technology/CardIcon.svg"
          alt="BenefitRobot"
          class="w-full h-full object-center object-contain"
        />
      </div>
      <div class="flex w-[40%] ml-10 h-auto items-center">
        <p :class="`text-[32px] font-[500] ${titleColor}`">{{ title }}</p>
      </div>
    </div>
    <div class="w-full h-auto mt-5">
      <p class="text-[18px] md:text-[16px] text-[#535862]">
        {{ body }}
      </p>
    </div>
  </div>
</template>
