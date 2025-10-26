<script setup>
defineProps({
  image: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: true,
  },
  imageClass: {
    type: String,
    default: "",
  },
  subtitleClass: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <!-- Desktop -->
  <div class="hidden lg:flex w-full h-auto">
    <div class="flex flex-row w-full h-full">
      <div class="flex w-[15%] xl:w-[25%] h-full">
        <img
          :src="image"
          alt="Icon"
          class="w-[70px] lg:w-[45px] lg:h-[45px] xl:w-[70px] xl:h-[70px] p-3 xl:p-3 object-contain bg-white dark:bg-[#323232] rounded-full shadow-lg"
        />
      </div>
      <div
        class="flex flex-col w-[85%] xl:w-full h-auto lg:pl-2 xl:pl-4 justify-start items-start"
      >
        <div class="flex w-full h-auto text-[#195279] dark:text-[#FAFAFA]">
          <p class="lg:text-[16px] xl:text-[20px] pt-3 pb-2">{{ title }}</p>
        </div>
        <div
          :class="`flex w-full h-auto text-[#4F90BC] dark:text-[#6F6F6F] ${subtitleClass}`"
        >
          <p class="text-[18px] lg:text-[16px]">{{ subtitle }}</p>
        </div>
      </div>
    </div>
  </div>

  <!-- Mobile & Tabs -->
  <div class="flex lg:hidden w-full h-auto md:justify-center">
    <div class="flex flex-col sml:flex-row w-full h-full md:justify-center">
      <div class="flex w-full sml:w-[20%] h-full md:justify-center">
        <img
          :src="image"
          alt="Icon"
          class="w-[20%] sml:w-[50px] h-full object-contain bg-white dark:bg-[#323232] rounded-full shadow-lg p-2"
        />
      </div>
      <div class="flex flex-col w-full h-auto md:justify-center pl-5 sm:pl-4">
        <div class="flex w-full h-auto text-[#195279]">
          <p
            class="text-[14px] sm:text-[16px] md:text-[16px] pb-1 md:text-center text-[#195279] dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-br dark:from-[#FAFAFA] dark:via-[#D4D4D4] dark:to-[#AAAAAA]"
          >
            {{ title }}
          </p>
        </div>
        <div
          :class="`flex w-full h-auto md:h-[75px] text-[#4F90BC] dark:text-[#FAFAFA] md:items-start ${subtitleClass}`"
        >
          <p
            class="text-[12px] sm:text-[12px] md:text-[14px] dark:text-[#6F6F6F]"
          >
            {{ subtitle }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
