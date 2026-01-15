<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import lottie from "lottie-web/build/player/lottie_light";

// 📌 Import JSON Anda langsung
// Pastikan file ada di: src/assets/myAnimation.json
import myAnimation from "@/assets/videos/videojson.json";

const technologyItems = [
  {
    title: "What is rPPG? Understanding Core Basics.",
    description:
      "Contactless imaging method measuring heart rate from subtle skin color changes via cameras.",
  },
  {
    title: "How rPPG Works in Camera Heart Sensing..",
    description:
      "Light reflects from skin as cameras analyze signals to extract blood flow patterns reliably.",
  },
  {
    title: "Machine Learning as the Processing Brain",
    description:
      "Machine learning removes motion and lighting noise to extract rPPG for heart rate prediction.",
  },
  {
    title: "Great Potential for Remote Telemedicine.",
    description:
      "rPPG supports remote heart monitoring using cameras for scalable mobile telemedicine care.",
  },
];

const container = ref(null);
const currentIndex = ref(0);
const showDescription = ref(false);

let interval = null;
let timeout = null;
let lottieInstance = null;

// ⏱️ konfigurasi timing (biar gampang diatur)
const SLIDE_DURATION = 4000;
const TITLE_ANIM_DURATION = 500;

onMounted(async () => {
  // ✅ lazy-load lottie (aman & ringan)
  const lottie = (await import("lottie-web")).default;

  lottieInstance = lottie.loadAnimation({
    container: container.value,
    renderer: "svg",
    loop: true,
    autoplay: true,
    animationData: myAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  });

  const runCycle = () => {
    showDescription.value = false;

    currentIndex.value =
      currentIndex.value === technologyItems.length - 1
        ? 0
        : currentIndex.value + 1;

    timeout = setTimeout(() => {
      showDescription.value = true;
    }, TITLE_ANIM_DURATION);
  };

  // ▶️ first show
  showDescription.value = true;

  // 🔁 interval utama
  interval = setInterval(runCycle, SLIDE_DURATION);
});

onBeforeUnmount(() => {
  clearInterval(interval);
  clearTimeout(timeout);

  // 🧹 bersihin lottie instance (penting!)
  lottieInstance?.destroy();
});
</script>

<template>
  <div class="w-full h-auto sm:px-10">
    <div
      class="w-full h-auto p-[1px] bg-[#D9D9D9] dark:bg-gradient-to-r dark:from-[#17181A] dark:from-45% dark:to-[#565656] shadow-lg rounded-2xl"
    >
      <div
        class="w-full h-auto flex flex-col bg-[#FFFFFF] dark:bg-[#1D1F23] pt-14 pb-14 sm:pb-16 px-8 md:px-16 lg:px-28 xl:px-40 rounded-2xl gap-y-3"
      >
        <div class="w-full h-auto flex flex-col gap-y-3">
          <div class="w-full h-auto">
            <p class="text-[#2AB857] font-[500] text-[18px] sm:text-[24px]">
              Technology
            </p>
          </div>
          <div class="w-full h-auto lg:pr-20">
            <p
              class="text-[#195279] font-[500] text-[16px] md:text-[24px] lg:text-[26px] xl:text-[36px] leading-normal tracking-wide dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-br dark:from-[#FAFAFA] dark:via-[#D4D4D4] dark:to-[#AAAAAA]"
            >
              Integrating RPPG + Machine Learning <br class="hidden sm:block" />
              For Noninvasive Heart Rate Monitoring
            </p>
          </div>
        </div>
        <div
          class="w-full h-auto flex flex-col-reverse lg:flex-row mt-5 transition-all duration-500 ease-out gap-y-5"
        >
          <div
            class="flex flex-col w-full h-[410px] lg:h-auto lg:w-[80%] xl:w-[60%] lg:pr-5 gap-y-0 lg:gap-y-0 transition-all duration-500 ease-out"
          >
            <div
              v-for="(technology, index) in technologyItems"
              :key="index"
              class="relative w-full lg:w-[80%] h-full flex flex-col items-center gap-y-0 lg:gap-y-2 transition-all lg:justify-between duration-500 ease-out"
            >
              <div
                class="absolute left-0 w-full flex items-center transition-all duration-500 ease-out"
                :class="
                  index === currentIndex
                    ? 'top-0 h-[40px] lg:h-[60px] xl:h-[60px]'
                    : 'h-full top-1/2 -translate-y-1/2'
                "
              >
                <p
                  class="font-[500] leading-snug tracking-normal transition-all duration-500 ease-out text-[16px] sm:text-[20px] lg:text-[16px] xl:text-[24px] max-[375px]:!text-[140px]"
                  :class="
                    index === currentIndex
                      ? 'text-[#195279] dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-br dark:from-[#FAFAFA] dark:via-[#D4D4D4] dark:to-[#AAAAAA]'
                      : 'text-[#D6D6D6] dark:text-[#565656] '
                  "
                >
                  {{ technology.title }}
                </p>
              </div>
              <div
                v-if="index === currentIndex && showDescription"
                class="absolute bottom-0 sm:bottom-3 lg:-bottom-3 xl:-bottom-1 xls:-bottom-1 left-0 w-full h-auto transition-all duration-500 ease-out animate__animated animate__fadeIn"
              >
                <p
                  class="font-[500] text-[#195279] dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-br dark:from-[#FAFAFA] dark:via-[#D4D4D4] dark:to-[#AAAAAA] text-[12px] sm:text-[16px] lg:text-[12px] xl:text-[16px] xls:text-[18px] leading-snug tracking-wide"
                >
                  {{ technology.description }}
                </p>
              </div>
            </div>
          </div>
          <div
            class="flex items-center justify-center w-full h-[250px] sm:h-[300px] lg:w-auto lg:h-auto"
          >
            <div class="flex w-auto h-full" ref="container"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.7s cubic-bezier(0.25, 0.1, 0.25, 1); /* lebih smooth */
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px); /* geser dikit ke atas */
}
</style>
