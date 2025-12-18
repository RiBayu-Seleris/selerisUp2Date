<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import lottie from "lottie-web";

// 📌 Import JSON Anda langsung
// Pastikan file ada di: src/assets/myAnimation.json
import myAnimation from "@/assets/videos/videojson.json";

const container = ref(null);
const currentIndex = ref(0);

let interval = null;

const technologyItems = [
  {
    title: "What is rPPG?",
    description:
      "A contactless imaging technique that measures heart rate by analyzing subtle skin color changes captured by a camera.",
  },
  {
    title: "How rPPG Works",
    description:
      "Light hits the skin, and the camera detects diffuse and specular reflections. The diffuse reflection carries blood-flow information used for heart-rate extraction.",
  },
  {
    title: "Machine Learning as the Processing Brain",
    description:
      "Machine Learning models clean noise from light and movement, and accurately extract rPPG signals to predict heart rate.",
  },
  {
    title: "Great Potential for Telemedicine",
    description:
      "rPPG enables remote health monitoring through any camera-equipped device, offering scalable solutions for mobile and telemedicine applications.",
  },
];

onMounted(() => {
  lottie.loadAnimation({
    container: container.value, // elemen target
    renderer: "svg",
    loop: true,
    autoplay: true,
    animationData: myAnimation, // langsung pakai data JSON
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice", // <-- penting: "slice" memotong area kosong
    },
  });

  // Interval untuk animasi teks
  interval = setInterval(() => {
    currentIndex.value =
      currentIndex.value === technologyItems.length - 1
        ? 0
        : currentIndex.value + 1;
  }, 2000);
});
onBeforeUnmount(() => {
  clearInterval(interval);
});
</script>

<template>
  <div class="w-full h-auto px-10">
    <div
      class="w-full h-auto p-[1px] bg-[#D9D9D9] dark:bg-gradient-to-r dark:from-[#17181A] dark:from-45% dark:to-[#565656] shadow-lg rounded-2xl"
    >
      <div
        class="w-full h-auto flex flex-col bg-[#FFFFFF] py-10 px-32 rounded-2xl gap-y-3"
      >
        <div class="w-full h-auto flex flex-col gap-y-3">
          <div class="w-full h-auto">
            <p class="text-[#2AB857] font-[500] text-[24px]">Technology</p>
          </div>
          <div class="w-full h-auto pr-20">
            <p
              class="text-[#195279] font-[500] text-[36px] leading-normal tracking-wide"
            >
              Integrating RPPG + Machine Learning <br />
              For Noninvasive Heart Rate Monitoring
            </p>
          </div>
        </div>
        <div class="w-full h-auto flex flex-row mt-10">
          <div class="flex flex-col w-[70%] h-auto">
            <div
              class="w-full h-full flex flex-col items-center gap-y-5 pr-10 justify-between"
            >
              <div
                v-for="(technology, index) in technologyItems"
                :key="index"
                class="w-full h-auto flex flex-col gap-y-5"
              >
                <div class="w-full h-auto flex items-center">
                  <p
                    class="font-[500] text-[#195279] text-[20px] leading-snug tracking-normal"
                  >
                    {{ technology.title }}
                  </p>
                </div>
                <!-- v-if="index === currentIndex"  -->
                <transition name="fade">
                  <div class="w-full h-auto">
                    <p
                      class="font-[400] text-[#195279] text-[16px] leading-snug"
                    >
                      {{ technology.description }}
                    </p>
                  </div>
                </transition>
              </div>
            </div>
          </div>
          <div class="flex w-auto h-auto" ref="container"></div>
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
