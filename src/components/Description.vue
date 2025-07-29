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
    title: "Artificial Intelligence and Machine Learning Adoption",
    description:
      "Seleris capitalizes on the power of cutting-edge AI and ML algorithms to evaluate underwriting decisions and furnish comprehensive coverage advice.",
  },
  {
    title: "The Company",
    description:
      "The company can then use the risk score to make a decision about whether or not to proceed with the individual's application.",
  },
];

onMounted(() => {
  const el = scrollContainer.value;
  const stepElements = el.querySelectorAll(".step");

  const video = document.querySelector("video");
  if (video) {
    video.addEventListener("contextmenu", (e) => e.preventDefault());
  }

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
    class="flex flex-row sml:flex-col-reverse lg:flex-row mx-6 lg:justify-between"
  >
    <div class="flex flex-col w-full h-full justify-center">
      <div class="w-full pb-2 sml:pb-4 md:pb-5 xl:pb-5">
        <p
          class="sml:text-2xl md:text-3xl lg:text-3xl xl:text-[24px] text-[#1AB24F] font-[500] dark:text-[#FAFAFA]"
        >
          AI Technology
        </p>
      </div>
      <div class="w-full sml:pb-4 md:pb-10 lg:pb-0 xl:pb-0 text-[#195279]">
        <p
          class="sml:text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-[500] dark:text-[#FAFAFA]"
        >
          How Seleris
          <span
            class="sml:inline-flex md:inline-flex lg:hidden dark:text-[#FAFAFA]"
          >
            Works?</span
          >
        </p>
        <p
          class="sml:hidden md:hidden lg:block sml:text-3xl lg:text-4xl xl:text-5xl font-[500] xl:mt-5 dark:text-[#FAFAFA]"
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
            class="h-full overflow-y-scroll snap-y snap-mandatory scroll-smooth scroll-hide pr-10 sml:pl-8 sml:pr-0 md:pl-10 lg:pl-10 xl:pl-14 xl:pr-20"
          >
            <section
              v-for="(step, index) in steps"
              :key="index"
              class="step h-full snap-start flex items-center justify-start lg:w-full xl:w-full text-start"
            >
              <div>
                <h3
                  class="sml:text-[14px] md:text-2xl lg:text-2xl xl:text-[20px] sml:leading-[20px] md:leading-normal text-green-600 font-[500]"
                >
                  {{ step.title }}
                </h3>
                <p
                  class="mt-5 sml:mt-3 text-xl sml:text-[12px] xl:text-[16px] sml:leading-relaxed text-gray-600 dark:text-[#FAFAFA] max-w-xl"
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
      class="flex w-full sml:h-full md:h-[600px] lg:h-full xl:h-[425px] justify-center items-center sml:mb-12 md:mb-20 lg:mb-0"
    >
      <video
        autoplay
        loop
        muted
        playsinline
        @contextmenu.prevent
        class="w-full h-full object-contain dark:hidden"
      >
        <source src="@/assets/videos/Design-Vector-Web2.mp4" type="video/mp4" />
      </video>
      <video
        autoplay
        loop
        muted
        playsinline
        @contextmenu.prevent
        class="w-full h-full lg:w-[400px] lg:h-[400px] xl:w-[500px] xl:h-[500px] object-contain hidden dark:block rounded-[20px] bg-[#FFFFFF] dark:bg-[#151819] border-[0.1px] dark:border-[#FAFAFA]/25 lg:ml-10 xl:pl-0"
      >
        <source
          src="@/assets/videos/Design-Dark-Vector-Web2.mp4"
          type="video/mp4"
        />
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
