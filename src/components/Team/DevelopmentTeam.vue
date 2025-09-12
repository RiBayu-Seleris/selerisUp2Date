<template>
  <div class="flex flex-col w-full h-auto">
    <div
      class="flex flex-col w-full h-auto justify-center items-center px-8 sm:px-8 md:px-10 lg:px-10 xl:px-14 gap-y-2"
    >
      <p
        class="text-[26px] md:text-[32px] lg:text-[36px] xl:text-[40px] font-[500] text-[#1AB24F] text-center dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-br dark:from-[#FAFAFA] dark:via-[#D4D4D4] dark:to-[#AAAAAA]"
      >
        Office Team
      </p>
      <p
        class="text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] xl:text-[20px] tracking-wider sm:tracking-wide font-[400] text-[#89A6BA] dark:text-[#6F6F6F] px-0 md:px-0 lg:px-8 xl:px-40 text-center"
      >
        <!-- Desktop -->
        <span class="hidden sm:block">
          Our dev team turns ideas into working code fast, clean, and reliable.
        </span>
        <!-- Mobile -->
        <span class="block sm:hidden">
          Our dev team turns ideas into working code
          <br />
          fast, clean, and reliable.
        </span>
      </p>
    </div>
    <div class="flex w-full h-auto mt-5 px-8 lg:px-14">
      <img
        src="@/assets/images/development-teams/example.png"
        alt="Robot"
        class="w-full h-full object-cover rounded-[22px]"
      />
    </div>
  </div>
</template>
