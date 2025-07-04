<!-- Ini adalah card yang memiliki logo di sebelah kiri dan konten di sebelah kanan degan 2 kolom konten -->
<template>
  <div
    class="flex flex-row snap-start shrink-0 w-[80%] lg:w-[50%] sml:h-[270px] md:h-[200px] lg:h-[200px] rounded-xl p-5 gap-x-5 border shadow-lg"
  >
    <div class="flex w-[30%] lg:w-[30%] h-auto">
      <img
        src="@/assets/images/robot-ai.svg"
        alt="CertLogo"
        class="w-full h-full object-center object-contain"
      />
    </div>
    <div class="flex flex-col w-[70%] lg:w-[70%] h-auto gap-y-3 justify-center">
      <div class="w-full h-auto text-[#2AB857]">
        <p class="text-2xl">Speed</p>
      </div>
      <div class="w-full h-auto text-[#195279]">
        <p class="text-xl">
          Seleris processes images in real-time, with an average recognition
          time of under 100 milliseconds.
        </p>
      </div>
    </div>
  </div>
</template>
