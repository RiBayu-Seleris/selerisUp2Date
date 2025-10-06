<script setup>
import HeroText from "@/components/reusable/HeroText.vue";
</script>

<template>
  <div
    class="flex w-full h-auto pt-[150px] sm:pt-[160px] md:pt-[150px] lg:pt-[160px] xl:pt-[160px] dark:bg-[#17181A]"
  >
    <div
      class="flex flex-col w-full h-auto space-y-2 sm:space-y-2 md:space-y-2 lg:space-y-3 xl:space-y-1 justify-center items-center"
    >
      <p
        class="text-[20px] sm:text-[30px] md:text-[32px] lg:text-[38px] xl:text-[40px] font-[500] tracking-tight text-[#1AB24F] text-center"
      >
        Our Team
      </p>
      <p
        class="text-[20px] sm:text-[34px] md:text-[40px] lg:text-[44px] xl:text-[52px] font-[500] tracking-wide lg:tracking-wide xl:tracking-wider text-[#195279] text-center dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-br dark:from-[#FAFAFA] dark:via-[#D4D4D4] dark:to-[#AAAAAA]"
      >
        Meet the team behind Seleris
      </p>
      <p
        class="text-[13px] sm:text-[12px] md:text-[16px] lg:text-[16px] xl:text-[18px] font-[400] px-4 sm:px-0 tracking-wider text-[#89A6BA] dark:text-[#6F6F6F] text-center"
      >
        <!-- Desktop -->
        <span class="hidden sm:block">
          Behind every breakthrough is a team of passionate experts turning
          <br />
          bold ideas into real-world impact.
        </span>

        <!-- Mobile -->
        <span class="block sm:hidden">
          Behind every breakthrough is a team of passionate experts turning bold
          <br />
          ideas into real-world impact.
        </span>
      </p>
    </div>
  </div>
</template>
