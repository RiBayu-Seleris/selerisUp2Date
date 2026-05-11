<script setup>
import gridFaceTracker from "@/assets/images/facetracker/grid-face-tracker2.svg";
import Person from "@/assets/images/facetracker/person3.png";
// import Person from "@/assets/images/facetracker/person2.svg";
// import FaceMask from "@/assets/images/facetracker/masking-face2.svg";
import FaceMask from "@/assets/images/facetracker/MaskingFace2.vue";
import FaceIcon from "@/assets/icons/FaceTracker/face-icon.svg";
import CardTracker from "../CardTracker.vue";
</script>
<template>
  <div
    class="relative w-full h-auto flex flex-col gap-y-14 bg-[#F9FAFB] dark:bg-[#17181A]"
  >
    <div class="absolute w-full h-auto"></div>
    <div
      class="w-full h-auto flex flex-col gap-y-1.5 text-center justify-center items-center xl:px-8"
    >
      <p class="text-[20px] text-[#2AB857] font-[500]">Request Demo</p>
      <p
        class="text-[16px] md:text-[32px] lg:text-[34px] xl:text-[46px] leading-snug text-[#195279] dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-br dark:from-[#FAFAFA] dark:via-[#D4D4D4] dark:to-[#AAAAAA] font-[500]"
      >
        Apa yang anda dapatkan <br />
        jika melakukan demo Scan
      </p>
    </div>
    <div class="relative w-full h-auto">
      <div class="relative w-full h-full">
        <img :src="gridFaceTracker" alt="" srcset="" />
      </div>
      <div class="absolute inset-0 w-full h-auto">
        <div
          class="absolute z-10 inset-0 w-auto h-auto bottom-0 left-1/2 -translate-x-1/2"
        >
          <div class="relative w-full h-auto">
            <div
              class="absolute w-auto h-auto top-[9.5%] xl:top-[9%] left-1/2 -translate-x-1/2"
            >
              <div
                class="lg:w-[70%] xl:w-[85%] h-auto object-contain object-center ml-[17%] xl:ml-[10.5%]"
              >
                <FaceMask />
              </div>
            </div>
            <img :src="Person" alt="" srcset="" class="w-full h-full" />
          </div>
        </div>
        <!-- cards -->
        <div class="absolute z-20 w-full h-full">
          <div class="absolute left-[10%] top-[20%] card-float-left">
            <card-tracker />
          </div>
          <div
            class="absolute left-[14%] bottom-[25%] xl:bottom-[20%] card-float-left-delay"
          >
            <card-tracker />
          </div>
          <div class="absolute right-[10%] top-[20%] card-float-right">
            <card-tracker />
          </div>
          <div
            class="absolute right-[14%] bottom-[25%] xl:bottom-[20%] card-float-right-delay"
          >
            <card-tracker />
          </div>
        </div>
        <!-- Button Scan Now -->
        <div
          class="absolute z-30 w-fit h-auto flex flex-row gap-x-5 justify-center items-center left-1/2 -translate-x-1/2 lg:bottom-6 xl:bottom-10 bg-gradient-to-tr from-[#1E6493] from-[20%] to-[#2E97DF] to-[100%] px-10 py-2.5 rounded-xl shadow-[0_20px_20px_0_rgba(39,128,188,0.16)] hover:scale-[1.2] transition-all duration-300 ease-in-out cursor-pointer"
        >
          <div class="w-6 h-6 shrink-0 flex justify-center items-center">
            <img :src="FaceIcon" alt="" srcset="" class="w-full h-full" />
          </div>
          <div class="w-fit h-auto flex justify-center items-center">
            <p class="text-[#FFFFFF]">Scan Yourself</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.card-float-left {
  animation: floatLeft 3s ease-in-out infinite;
}
.card-float-left-delay {
  animation: floatLeft 3s ease-in-out infinite 2s;
}
.card-float-right {
  animation: floatRight 3s ease-in-out infinite;
}
.card-float-right-delay {
  animation: floatRight 3s ease-in-out infinite 2s;
}

@keyframes floatLeft {
  0%,
  100% {
    transform: translateX(0px);
  }
  50% {
    transform: translateX(-50px);
  }
}
@keyframes floatRight {
  0%,
  100% {
    transform: translateX(0px);
  }
  50% {
    transform: translateX(50px);
  }
}
</style>
