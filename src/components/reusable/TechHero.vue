<script setup>
defineProps({
  subtitle: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div
    class="flex w-full h-auto pt-[120px] md:pt-[120px] lg:pt-[140px] xl:pt-[160px]"
  >
    <div
      class="flex flex-col w-full h-auto gap-y-2 justify-center items-center"
    >
      <p
        class="text-[24px] md:text-[35px] lg:text-[28px] xl:text-[34px] font-[500] text-[#1AB24F] text-center"
      >
        Technology
      </p>
      <p
        class="text-[24px] md:text-[37px] lg:text-[43px] xl:text-[60px] font-[500] text-[#195279] text-center dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-br dark:from-[#FAFAFA] dark:via-[#D4D4D4] dark:to-[#AAAAAA]"
      >
        {{ subtitle }}
      </p>
    </div>
  </div>
</template>
