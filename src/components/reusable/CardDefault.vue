<!-- Ini adalah card yang memiliki logo di sebelah kiri dan konten di sebelah kanan degan 2 kolom konten -->
<template>
  <div
    class="sml:hidden flex flex-row snap-start shrink-0 md:gap-x-5 w-[80%] md:w-[450px] md:h-[180px] lg:w-[50%] sml:h-[270px] lg:h-[200px] rounded-xl p-5 border bg-[#FFFFFF]"
  >
    <div class="flex w-[30%] lg:w-[30%] h-auto">
      <img
        src="@/assets/images/robot-ai.svg"
        alt="BenefitRobot"
        class="w-full h-full object-center object-contain"
      />
    </div>
    <div class="flex flex-col w-[70%] lg:w-[70%] h-auto gap-y-3 justify-center">
      <div class="w-full h-auto text-[#2AB857]">
        <p class="text-[24px] md:text-[20px]">Speed</p>
      </div>
      <div class="w-full h-auto text-[#195279]">
        <p class="text-[18px] md:text-[16px]">
          Seleris processes images in real-time, with an average recognition
          time of under 100 milliseconds.
        </p>
      </div>
    </div>
  </div>

  <!-- Mobile Smalls -->
  <div
    class="hidden sml:flex flex-col snap-start shrink-0 w-[270px] h-[200px] rounded-xl p-5 border shadow-lg"
  >
    <div class="flex flex-row">
      <div class="flex w-[70px] h-[70px]">
        <img
          src="@/assets/images/robot-ai.svg"
          alt="BenefitRobot"
          class="w-full h-full object-center object-contain"
        />
      </div>
      <div class="flex w-full h-auto text-[#2AB857] pl-3 items-center">
        <p class="text-[24px] sml:text-[20px]">Speed</p>
      </div>
    </div>
    <div class="flex flex-col w-full h-full">
      <div
        class="flex w-full h-full text-[#195279] items-center justify-center"
      >
        <p class="text-[1.1rem] sml:text-[14px]">
          Seleris processes images in real-time, with an average recognition
          time of under 100 milliseconds.
        </p>
      </div>
    </div>
  </div>
</template>
