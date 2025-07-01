<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const scrollContainer = ref(null);
const currentStep = ref(0);

const steps = [
  {
    title: "Remote Photoplethysmography Technology",
    description:
      "Seleris harnesses Remote Photoplethysmography (rPPG) technology to evaluate various vital signs that represent a customer’s health condition.",
  },
  {
    title: "Artificial Intelligence and Machine Learning",
    description:
      "Leveraging predictive models to enhance underwriting accuracy and speed.",
  },
  {
    title: "Insurance Company",
    description:
      "Integration with the insurance platform to streamline customer experience.",
  },
];

onMounted(() => {
  const el = scrollContainer.value;
  const stepElements = el.querySelectorAll(".step");

  const onScroll = () => {
    let current = 0;
    stepElements.forEach((step, index) => {
      const rect = step.getBoundingClientRect();
      if (rect.top < window.innerHeight / 2) {
        current = index;
      }
    });
    currentStep.value = current;
  };

  el.addEventListener("scroll", onScroll);
  onScroll();

  onUnmounted(() => {
    el.removeEventListener("scroll", onScroll);
  });
});
</script>

<template>
  <div
    class="flex flex-row sml:flex-col md:flex-col lg:flex-row mx-9 lg:justify-between mt-10"
  >
    <div class="flex flex-col w-full h-full justify-center">
      <div class="w-full pb-2 sml:pb-4">
        <p class="text-4xl sml:text-2xl text-[#1AB24F] font-medium">
          AI Technology
        </p>
      </div>
      <div class="w-full sml:pb-4 text-[#195279]">
        <p class="text-5xl sml:text-3xl font-semibold leading-[55px]">
          How Seleris
        </p>
        <p class="text-5xl sml:text-3xl font-semibold leading-[55px]">Works?</p>
      </div>
      <div class="w-full h-[354px] sml:h-[200px]">
        <div class="h-full relative overflow-hidden">
          <!-- Scroll Indicator -->
          <div
            class="absolute left-3 sml:left-0 top-1/2 -translate-y-1/2 flex flex-col gap-12 sml:gap-6 z-10"
          >
            <div
              v-for="(step, index) in steps.length"
              :key="index"
              :class="[
                'w-3 h-3 rounded-full border-2 transition-all duration-300',
                currentStep === index
                  ? 'bg-green-500 border-green-500 scale-110'
                  : 'bg-transparent border-gray-300',
              ]"
            ></div>
          </div>

          <!-- Scrollable Sections -->
          <div
            ref="scrollContainer"
            class="h-full overflow-y-scroll snap-y snap-mandatory scroll-smooth scroll-hide"
          >
            <section
              v-for="(step, index) in steps"
              :key="index"
              class="step h-full snap-start flex items-center justify-start pl-14 pr-8 sml:pl-8 sml:pr-0 text-start"
            >
              <div>
                <h3 class="text-4xl sml:text-xl text-green-600 font-semibold">
                  {{ step.title }}
                </h3>
                <p
                  class="mt-5 sml:mt-3 text-xl sml:text-sm text-gray-600 max-w-xl mx-auto"
                >
                  {{ step.description }}
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
    <div class="flex w-full h-full justify-center items-center">
      <video
        autoplay
        loop
        muted
        playsinline
        class="w-full h-full object-contain"
      >
        <source src="@/assets/videos/Design-Vector-Web2.mp4" type="video/mp4" />
      </video>
      <!-- bg-[#F9FAFB] -->
      <!-- <div
        class="absolute w-[590px] sml:w-[300px] h-[30px] bg-red-800 mt-[500px] sml:mt-[310px]"
      ></div> -->
    </div>
  </div>
</template>

<style scoped>
/* Bisa di global CSS atau di <style scoped> */
.scroll-hide::-webkit-scrollbar {
  display: none;
}

.scroll-hide {
  -ms-overflow-style: none; /* IE & Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
