<script setup>
defineProps({
  name: String,
  position: String,
  text: String,
});
</script>

<template>
  <div
    class="w-full h-[420px] sm:h-[230px] md:h-[300px] lg:h-[280px] xl:h-[270px] p-[1px] bg-[#D9D9D9] dark:bg-gradient-to-tr dark:from-[#17181A] dark:from-45% dark:to-[#565656] shadow-lg rounded-lg"
  >
    <div
      class="w-full h-full flex flex-col px-6 lg:px-8 rounded-lg shadow-sm bg-[#FFFFFF] dark:bg-[#1D1F23] dark:border-[#FAFAFA]/25"
    >
      <div class="flex flex-col w-full h-auto mb-5 gap-y-1 my-5">
        <h3
          class="text-[17px] sml:text-[14px] md:text-[20px] lg:text-[24px] font-[500] text-[#195279] dark:text-[#FAFAFA]"
        >
          {{ name }}
        </h3>
        <p
          class="text-[14px] sml:text-[14px] md:text-[16px] lg:text-[18px] text-[#717276]"
        >
          {{ position }}
        </p>
      </div>
      <div class="flex items-start gap-x-3">
        <svg
          class="w-4 h-4 md:w-6 md:h-6 lg:w-6 lg:h-6 text-[#91BBD8] dark:text-[#FAFAFA] flex-shrink-0"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            d="M7.17 6A4.17 4.17 0 0 0 3 10.17v3.33A4.17 4.17 0 0 0 7.17 17.67H9V10H6.67v-.83c0-.96.78-1.75 1.75-1.75H9V6H7.17zM17.17 6A4.17 4.17 0 0 0 13 10.17v3.33A4.17 4.17 0 0 0 17.17 17.67H19V10h-2.33v-.83c0-.96.78-1.75 1.75-1.75H19V6h-1.83z"
          />
        </svg>
        <p
          class="text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] xl:text-[20px] text-[#535862] dark:text-[#FAFAFA] leading-relaxed"
        >
          {{ text }}
        </p>
      </div>
    </div>
  </div>
</template>
