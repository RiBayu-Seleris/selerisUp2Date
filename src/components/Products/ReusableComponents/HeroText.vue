<script setup>
defineProps({
  title: {
    type: String,
  },
  subtitle: {
    type: String,
  },
  description: {
    type: String,
  },
});
</script>

<template>
  <div
    class="w-full h-auto pt-[90px] md:pt-[100px] lg:pt-[120px] space-y-5 md:space-y-6"
  >
    <div
      class="md:w-[500px] h-auto flex flex-col mx-auto justify-center px-10 md:px-0"
    >
      <p
        class="text-[24px] md:text-[37px] lg:text-[40px] font-medium text-[#FAFAFA] text-center leading-[35px] md:px-10 md:justify-center md:leading-relaxed"
      >
        {{ title }}
        <span class="font-[600]">{{ subtitle }}</span>
      </p>
    </div>
    <div class="md:w-[700px] px-10 h-auto flex flex-col mx-auto justify-center">
      <p
        class="text-[14px] md:text-[20px] lg:text-[20px] text-center text-[#FAFAFA] font-[400]"
      >
        {{ description }}
      </p>
    </div>
  </div>
</template>
