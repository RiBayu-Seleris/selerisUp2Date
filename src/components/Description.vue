<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const scrollContainer = ref(null);
const currentStep = ref(0);
const scrollProgress = ref(0);

const steps = [
  {
    title: "Remote Photoplethysmography Technology",
    description:
      "Seleris harnesses Remote Photoplethysmography (rPPG) technology to evaluate various vital signs that represent a customer's health condition.",
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

    // Hitung progress scroll untuk garis
    const maxScroll = el.scrollHeight - el.clientHeight;
    const currentScroll = el.scrollTop;
    scrollProgress.value = Math.min((currentScroll / maxScroll) * 100, 100);
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
    class="flex flex-row sml:flex-col-reverse md:flex-col lg:flex-row mx-6 lg:justify-between"
  >
    <div class="flex flex-col w-full h-full justify-center">
      <div class="w-full pb-2 sml:pb-4 md:pb-5 xl:pb-5">
        <p
          class="sml:text-2xl md:text-3xl lg:text-3xl xl:text-[24px] text-[#1AB24F] font-[500]"
        >
          AI Technology
        </p>
      </div>
      <div class="w-full sml:pb-4 md:pb-10 lg:pb-0 xl:pb-0 text-[#195279]">
        <p class="sml:text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-[500]">
          How Seleris
          <span class="sml:inline-flex md:inline-flex lg:hidden"> Works?</span>
        </p>
        <p
          class="sml:hidden md:hidden lg:block sml:text-3xl lg:text-4xl xl:text-5xl font-[500] xl:mt-5"
        >
          Works?
        </p>
      </div>
      <div
        class="w-full sml:h-[200px] md:h-[200px] lg:h-[320px] xl:h-[200px] lg:mt-5"
      >
        <div class="h-full relative overflow-hidden">
          <!-- Scroll Indicator dengan Garis -->
          <div
            class="absolute xl:left-3 sml:left-0 top-1/2 -translate-y-1/2 flex flex-col gap-12 sml:gap-6 z-0"
          >
            <!-- Garis Progress -->
            <div
              class="absolute left-1/2 -translate-x-1/2 top-0 w-0.5 h-full bg-gray-200"
            >
              <div
                class="w-full bg-green-500 transition-all duration-300 ease-out"
                :style="{ height: `${scrollProgress}%` }"
              ></div>
            </div>

            <!-- Titik-titik -->
            <div
              v-for="(step, index) in steps.length"
              :key="index"
              :class="[
                'w-3 h-3 rounded-full border-2 transition-all duration-300 relative z-20 bg-white',
                currentStep >= index
                  ? 'border-green-500 scale-110'
                  : 'border-gray-300',
              ]"
            >
              <!-- Isi titik yang aktif -->
              <div
                v-if="currentStep >= index"
                class="absolute inset-0.5 bg-green-500 rounded-full transition-all duration-300"
              ></div>
            </div>
          </div>

          <!-- Scrollable Sections -->
          <div
            ref="scrollContainer"
            class="h-full overflow-y-scroll snap-y snap-mandatory scroll-smooth scroll-hide pr-10"
          >
            <section
              v-for="(step, index) in steps"
              :key="index"
              class="step h-full snap-start flex items-center justify-start sml:pl-8 sml:pr-0 md:pl-10 lg:w-full xl:w-full lg:pl-10 xl:pl-14 xl:pr-20 text-start"
            >
              <div>
                <h3
                  class="sml:text-xl md:text-2xl lg:text-2xl xl:text-[20px] text-green-600 font-semibold"
                >
                  {{ step.title }}
                </h3>
                <p
                  class="mt-5 sml:mt-3 text-xl xl:text-[16px] sml:text-sm text-gray-600 max-w-xl mx-auto"
                >
                  {{ step.description }}
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
    <div
      class="flex w-full sml:h-full md:h-[300px] lg:h-full xl:h-[425px] sml:mb-5 justify-center items-center"
    >
      <video
        autoplay
        loop
        muted
        playsinline
        class="w-full h-full object-contain"
      >
        <source src="@/assets/videos/Design-Vector-Web2.mp4" type="video/mp4" />
      </video>
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
