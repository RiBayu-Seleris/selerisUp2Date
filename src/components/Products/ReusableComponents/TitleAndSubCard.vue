<script setup>
defineProps({
  title: {
    type: String,
  },
  subtitle: {
    type: String,
  },
  subtitleColor: {
    type: String,
  },
});
</script>

<template>
  <div
    class="w-full h-auto flex flex-col justify-center space-y-4 md:space-y-2"
  >
    <div class="w-full h-auto flex justify-center items-center">
      <p
        class="text-[27px] md:text-[32px] lg:text-[40px] text-[#2E504E] font-[500]"
      >
        {{ title }}
      </p>
    </div>
    <div class="w-full h-auto flex justify-center items-center">
      <p
        :class="[
          `text-[17px] md:text-[19px] lg:text-[21px] ${subtitleColor} font-[500] text-center`,
        ]"
      >
        {{ subtitle }}
      </p>
    </div>
  </div>
</template>
