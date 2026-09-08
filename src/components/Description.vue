<script setup>
import { useIsDark } from "@/utils/useIsDark";
import { ref, onMounted, onUnmounted } from "vue";

const scrollContainer = ref(null);
const currentStep = ref(0);
const scrollProgress = ref(0);

const steps = [{ key: "rppg" }, { key: "ai" }, { key: "security" }];

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

// Dipakai di template: video mode terang pakai v-if="!isDark", yang gelap
// pakai v-else. Tujuannya supaya cuma satu video yang benar-benar dibuat
// dan diunduh browser. Penjelasan lengkap ada di src/utils/useIsDark.js
const isDark = useIsDark();
</script>

<template>
  <div
    class="flex flex-col-reverse lg:flex-row px-0 lg:px-6 lg:justify-between dark:bg-[#17181A]"
  >
    <div class="flex flex-col w-full h-full justify-center dark:bg-[#17181A]">
      <div class="w-full pb-0 sm:pb-2 md:pb-0 xl:pb-6">
        <p
          class="text-[20px] md:text-[24px] text-[#1AB24F] font-[500] dark:text-[#FAFAFA]"
        >
          {{ $t("home.howItWorks.eyebrow") }}
        </p>
      </div>
      <div
        class="w-full h-auto flex flex-col xl:-space-y-4 pb-4 md:pb-5 lg:pb-0 xl:pb-0 text-[#195279]"
      >
        <p
          class="text-[26px] sm:text-[34px] md:text-[40px] lg:text-[44px] xl:text-[48px] font-[500] dark:text-[#FAFAFA]"
        >
          {{ $t("home.howItWorks.titleLine1") }}
          <span class="inline-flex lg:hidden dark:text-[#FAFAFA]">
            {{ $t("home.howItWorks.titleLine2") }}</span
          >
        </p>
        <p
          class="hidden lg:block text-[26px] sm:text-[34px] md:text-[40px] lg:text-[44px] xl:text-[48px] font-[500] dark:text-[#FAFAFA]"
        >
          {{ $t("home.howItWorks.titleLine2") }}
        </p>
      </div>
      <div class="w-full h-[200px] lg:h-[320px] xl:h-[200px] lg:mt-5">
        <div class="h-full relative overflow-hidden">
          <!-- Scroll Indicator dengan Garis -->
          <div
            class="absolute left-0 xl:left-3 top-1/2 -translate-y-1/2 flex flex-col gap-6 z-0"
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
            class="h-full overflow-y-scroll snap-y snap-mandatory scroll-smooth scroll-hide pl-8 pr-0 sm:pl-8 sm:pr-0 md:pl-10 lg:pl-10 xl:pl-14 xl:pr-20"
          >
            <section
              v-for="(step, index) in steps"
              :key="index"
              class="step h-full snap-start flex items-center justify-start lg:w-full xl:w-full text-start"
            >
              <div>
                <h3
                  class="text-[16px] sm:text-[20px] md:text-[24px] lg:text-[24px] xl:text-[24px] leading-[20px] sm:leading-normal text-green-600 font-[500]"
                >
                  {{ $t(`home.howItWorks.steps.${step.key}.title`) }}
                </h3>
                <p
                  class="mt-3.5 md:mt-5 text-[12px] sm:text-[14px] xl:text-[14px] leading-relaxed text-gray-600 dark:text-[#FAFAFA] max-w-xl"
                >
                  {{ $t(`home.howItWorks.steps.${step.key}.description`) }}
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
    <div
      class="flex w-full h-full md:h-[500px] lg:h-full xl:h-[425px] justify-center items-center mb-12 md:mb-20 lg:mb-0"
    >
      <video
        v-if="!isDark"
        aria-hidden="true"
        autoplay
        loop
        muted
        playsinline
        @contextmenu.prevent
        class="w-full h-full md:w-auto md:h-[500px] lg:w-[400px] lg:h-[400px] xl:w-[500px] xl:h-[500px] object-fill lg:object-contain lg:ml-20 xl:pl-0"
      >
        <source src="@/assets/videos/Design-Vector-Web2.mp4" type="video/mp4" />
      </video>
      <video
        v-else
        aria-hidden="true"
        autoplay
        loop
        muted
        playsinline
        @contextmenu.prevent
        class="w-full h-full md:w-auto md:h-[500px] lg:w-[400px] lg:h-[400px] xl:w-[500px] xl:h-[500px] object-fill lg:object-contain rounded-[20px] bg-[#FFFFFF] dark:bg-[#151819] border-[0.1px] dark:border-[#FAFAFA]/25 lg:ml-20 xl:pl-0"
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
