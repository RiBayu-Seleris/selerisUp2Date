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
  <div class="flex flex-col w-full h-auto gap-y-4 justify-center items-center">
    <p
      class="text-[25px] md:text-[35px] lg:text-[30px] xl:text-[30px] font-[500] text-[#1AB24F] text-center"
    >
      {{ title }}
    </p>
    <p
      class="text-[23px] md:text-[37px] lg:text-[43px] xl:text-[47px] font-[500] text-[#195279] text-center dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-br dark:from-[#FAFAFA] dark:via-[#D4D4D4] dark:to-[#AAAAAA]"
    >
      {{ subtitle }}
    </p>
    <p
      class="text-[14px] md:text-[23px] lg:text-[24px] xl:text-[24px] font-[400] text-[#195279] sml:px-8 md:px-0 xl:px-48 text-center dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-br dark:from-[#FAFAFA] dark:via-[#D4D4D4] dark:to-[#AAAAAA]"
    >
      {{ description }}
    </p>
  </div>
</template>
