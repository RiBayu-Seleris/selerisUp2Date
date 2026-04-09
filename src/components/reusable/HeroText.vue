<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
});
</script>

<template>
  <div
    class="flex flex-col w-full h-auto space-y-2 sm:space-y-0 md:space-y-0 lg:space-y-3 xl:space-y-2 justify-center items-center dark:bg-[#17181A]"
  >
    <p
      class="text-[24px] sm:text-[24px] md:text-[30px] lg:text-[38px] xl:text-[40px] font-[500] tracking-tight text-[#1AB24F] text-center"
    >
      {{ title }}
    </p>
    <p
      class="over-smallest:px-10 text-[20px] sm:text-[22px] md:text-[34px] lg:text-[44px] xl:text-[52px] font-[500] lg:tracking-wide xl:tracking-normal text-[#195279] text-center dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-br dark:from-[#FAFAFA] dark:via-[#D4D4D4] dark:to-[#AAAAAA]"
    >
      {{ subtitle }}
    </p>
    <p
      class="text-[14px] md:text-[18px] lg:text-[18px] xl:text-[18px] font-[400] tracking-wider text-[#195279] dark:text-[#6F6F6F] px-8 md:px-0 lg:px-32 xl:px-52 text-center"
    >
      {{ description }}
    </p>
  </div>
</template>
