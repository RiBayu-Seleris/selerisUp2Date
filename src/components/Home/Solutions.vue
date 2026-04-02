<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import { Solutions } from "@/Data/Solutions.js";

const activeIndex = ref(0);
const hoveredIndex = ref(null);
let interval = null;

const row1 = Solutions.slice(0, 2);
const row2 = Solutions.slice(2, 5);
const row3 = Solutions.slice(5, 7);

const startInterval = () => {
  clearInterval(interval);
  interval = setInterval(() => {
    if (hoveredIndex.value === null) {
      activeIndex.value = (activeIndex.value + 1) % Solutions.length;
    }
  }, 2000);
};

const onMouseEnter = (index) => {
  hoveredIndex.value = index;
  activeIndex.value = index;
};

const onMouseLeave = () => {
  hoveredIndex.value = null;
  activeIndex.value = (activeIndex.value + 1) % Solutions.length;
  startInterval();
};

const isDark = ref(document.documentElement.classList.contains("dark"));
const angle = ref(0);
let rafId = null;
let observer = null;

const animateAngle = () => {
  angle.value = (angle.value + 1) % 360;
  rafId = requestAnimationFrame(animateAngle);
};

onMounted(() => {
  startInterval();
  animateAngle();
  observer = new MutationObserver(() => {
    isDark.value = document.documentElement.classList.contains("dark");
  });
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
});

onUnmounted(() => {
  clearInterval(interval);
  cancelAnimationFrame(rafId);
  observer?.disconnect();
});
</script>

<template>
  <div class="w-full h-auto flex flex-col gap-y-5 lg:gap-y-10">
    <!-- Heading -->
    <div
      class="w-full h-auto flex flex-col text-center justify-center items-center xl:px-8"
    >
      <p class="text-[20px] text-[#2AB857] font-[500]">Solutions</p>
      <p
        class="md:text-[32px] lg:text-[34px] xl:text-[46px] tracking-wider text-[#195279] dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-br dark:from-[#FAFAFA] dark:via-[#D4D4D4] dark:to-[#AAAAAA] font-[500]"
      >
        7 AI-Powered Health Solutions
      </p>
    </div>

    <!-- Ini ukuran LG -->
    <!-- Cards Grid 2-3-2 -->
    <div
      class="w-full h-auto hidden lg:flex flex-col gap-y-4 xl:gap-y-4 xl:px-8"
    >
      <!-- Row 1: 2 cards -->
      <div class="w-full grid grid-cols-2 gap-3">
        <div
          v-for="data in row1"
          :key="data.id"
          class="card-wrapper relative rounded-2xl h-auto p-[1px] cursor-pointer"
          :class="
            Solutions.indexOf(data) === activeIndex
              ? 'is-active border-none'
              : 'border-2 border-[#E6F0ED] dark:border-none dark:bg-gradient-to-tr dark:from-[#17181A] dark:from-45% dark:to-[#565656]'
          "
          @mouseenter="onMouseEnter(Solutions.indexOf(data))"
          @mouseleave="onMouseLeave"
        >
          <div
            class="w-full h-full flex flex-col justify-between bg-white dark:bg-[#1D1F23] rounded-2xl px-5 py-6"
          >
            <component
              :is="data.icon"
              class="w-10 h-10 object-contain p-2 rounded-[10px]"
              :class="
                Solutions.indexOf(data) === activeIndex
                  ? 'bg-[#39D5BC] text-white'
                  : 'bg-[#D8F7F2] text-[#39D5BC]'
              "
            />
            <div class="w-full h-auto flex flex-col gap-y-4 xl:gap-y-4">
              <div class="w-full h-auto flex justify-start items-start">
                <div
                  class="w-10 h-10 rounded-md flex justify-center items-center p-2"
                  :class="
                    Solutions.indexOf(data) === activeIndex
                      ? 'bg-[#ADF9C5] dark:bg-[#2AB857] text-[#2AB857] dark:text-[#AFFAC6]'
                      : 'bg-[#ADF9C5] text-[#2AB857]'
                  "
                >
                  <component :is="data.icons" class="w-full h-full" />
                </div>
              </div>
              <div class="w-full h-12 flex flex-col gap-y-1 xl:gap-y-1.5">
                <span
                  class="font-[600] text-[14px] xl:text-[20px]"
                  :class="
                    Solutions.indexOf(data) === activeIndex
                      ? 'dark:text-[#2AB857]'
                      : 'text-[#374151] dark:text-[#357EAF]'
                  "
                  >{{ data.title }}</span
                >
                <span
                  class="text-[#8E98A8] text-[14px] leading-normal font-[400]"
                  >{{ data.content }}</span
                >
              </div>
              <div class="w-full h-5">
                <Transition name="fade-link">
                  <a
                    v-if="Solutions.indexOf(data) === activeIndex"
                    href="#"
                    class="inline-flex items-center gap-x-1.5 text-[#2AB857] text-[12px] xl:text-[14px] font-[500]"
                    >Learn More <span>→</span></a
                  >
                </Transition>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Row 2: 3 cards -->
      <div class="w-full grid grid-cols-3 gap-3">
        <div
          v-for="data in row2"
          :key="data.id"
          class="card-wrapper relative rounded-2xl h-auto p-[1px] cursor-pointer"
          :class="
            Solutions.indexOf(data) === activeIndex
              ? 'is-active border-none'
              : 'border-2 border-[#E6F0ED] dark:border-none dark:bg-gradient-to-tr dark:from-[#17181A] dark:from-45% dark:to-[#565656]'
          "
          @mouseenter="onMouseEnter(Solutions.indexOf(data))"
          @mouseleave="onMouseLeave"
        >
          <div
            class="w-full h-full flex flex-col justify-between bg-white dark:bg-[#1D1F23] rounded-2xl px-5 py-6"
          >
            <component
              :is="data.icon"
              class="w-10 h-10 object-contain p-2 rounded-[10px]"
              :class="
                Solutions.indexOf(data) === activeIndex
                  ? 'bg-[#39D5BC] text-white'
                  : 'bg-[#D8F7F2] text-[#39D5BC]'
              "
            />
            <div class="w-full h-auto flex flex-col gap-y-4 xl:gap-y-4">
              <div class="w-full h-auto flex justify-start items-start">
                <div
                  class="w-10 h-10 rounded-md flex justify-center items-center p-2"
                  :class="
                    Solutions.indexOf(data) === activeIndex
                      ? 'bg-[#ADF9C5] dark:bg-[#2AB857] text-[#2AB857] dark:text-[#AFFAC6]'
                      : 'bg-[#ADF9C5] text-[#2AB857]'
                  "
                >
                  <component :is="data.icons" class="w-full h-full" />
                </div>
              </div>
              <div
                class="w-full h-14 xl:h-12 flex flex-col gap-y-1 xl:gap-y-1.5"
              >
                <span
                  class="font-[600] text-[14px] xl:text-[20px]"
                  :class="
                    Solutions.indexOf(data) === activeIndex
                      ? 'dark:text-[#2AB857]'
                      : 'text-[#374151] dark:text-[#357EAF]'
                  "
                  >{{ data.title }}</span
                >
                <span
                  class="text-[#8E98A8] text-[12px] xl:text-[14px] leading-normal font-[400]"
                  >{{ data.content }}</span
                >
              </div>
              <div class="w-full h-5">
                <Transition name="fade-link">
                  <a
                    v-if="Solutions.indexOf(data) === activeIndex"
                    href="#"
                    class="inline-flex items-center gap-x-1.5 text-[#2AB857] text-[12px] xl:text-[14px] font-[500]"
                    >Learn More <span>→</span></a
                  >
                </Transition>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Row 3: 2 cards -->
      <div class="w-full grid grid-cols-2 gap-3">
        <div
          v-for="data in row3"
          :key="data.id"
          class="card-wrapper relative rounded-2xl h-auto p-[1px] cursor-pointer"
          :class="
            Solutions.indexOf(data) === activeIndex
              ? 'is-active border-none'
              : 'border-2 border-[#E6F0ED] dark:border-none dark:bg-gradient-to-tr dark:from-[#17181A] dark:from-45% dark:to-[#565656]'
          "
          @mouseenter="onMouseEnter(Solutions.indexOf(data))"
          @mouseleave="onMouseLeave"
        >
          <div
            class="w-full h-full flex flex-col justify-between bg-white dark:bg-[#1D1F23] rounded-2xl px-5 py-6"
          >
            <component
              :is="data.icon"
              class="w-10 h-10 object-contain p-2 rounded-[10px]"
              :class="
                Solutions.indexOf(data) === activeIndex
                  ? 'bg-[#39D5BC] text-white'
                  : 'bg-[#D8F7F2] text-[#39D5BC]'
              "
            />
            <div class="w-full h-auto flex flex-col gap-y-4 xl:gap-y-4">
              <div class="w-full h-auto flex justify-start items-start">
                <div
                  class="w-10 h-10 rounded-md flex justify-center items-center p-2"
                  :class="
                    Solutions.indexOf(data) === activeIndex
                      ? 'bg-[#ADF9C5] dark:bg-[#2AB857] text-[#2AB857] dark:text-[#AFFAC6]'
                      : 'bg-[#ADF9C5] text-[#2AB857]'
                  "
                >
                  <component :is="data.icons" class="w-full h-full" />
                </div>
              </div>
              <div class="w-full h-12 flex flex-col gap-y-1 xl:gap-y-1.5">
                <span
                  class="font-[600] text-[14px] xl:text-[20px]"
                  :class="
                    Solutions.indexOf(data) === activeIndex
                      ? 'dark:text-[#2AB857]'
                      : 'text-[#374151] dark:text-[#357EAF]'
                  "
                  >{{ data.title }}</span
                >
                <span
                  class="text-[#8E98A8] text-[14px] leading-normal font-[400]"
                  >{{ data.content }}</span
                >
              </div>
              <div class="w-full h-5">
                <Transition name="fade-link">
                  <a
                    v-if="Solutions.indexOf(data) === activeIndex"
                    href="#"
                    class="inline-flex items-center gap-x-1.5 text-[#2AB857] text-[12px] xl:text-[14px] font-[500]"
                    >Learn More <span>→</span></a
                  >
                </Transition>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile -->
    <div
      class="relative flex flex-row lg:hidden w-full gap-x-4 py-5 overflow-x-auto snap-x snap-mandatory pl-8 pr-8 sm:pl-10 sm:pr-10 md:pl-8 md:pr-8 hide-scrollbar"
    >
      <div
        v-for="(data, index) in Solutions"
        :key="index"
        class="card-wrapper relative rounded-2xl flex-shrink-0 p-[1px] cursor-pointer w-[80vw] sm:w-[60%] md:w-[460px] snap-center"
        :class="
          index === activeIndex
            ? 'is-active border-none'
            : 'border-2 border-[#E6F0ED] dark:border-none dark:bg-gradient-to-tr dark:from-[#17181A] dark:from-45% dark:to-[#565656]'
        "
        @mouseenter="onMouseEnter(index)"
        @mouseleave="onMouseLeave"
      >
        <div
          class="w-full h-full flex flex-col justify-between bg-white dark:bg-[#1D1F23] rounded-2xl px-5 py-6 gap-y-6"
        >
          <div class="w-full h-auto flex flex-col gap-y-4">
            <div
              class="w-10 h-10 rounded-md flex justify-center items-center p-2"
              :class="
                index === activeIndex
                  ? 'bg-[#ADF9C5] dark:bg-[#2AB857] text-[#2AB857] dark:text-[#AFFAC6]'
                  : 'bg-[#ADF9C5] text-[#2AB857]'
              "
            >
              <component :is="data.icons" class="w-full h-full" />
            </div>

            <div class="w-full flex flex-col gap-y-1.5">
              <span
                class="font-[600] text-[16px]"
                :class="
                  index === activeIndex
                    ? 'dark:text-[#2AB857]'
                    : 'text-[#374151] dark:text-[#357EAF]'
                "
                >{{ data.title }}</span
              >
              <span
                class="text-[#8E98A8] text-[13px] leading-normal font-[400]"
              >
                {{ data.content }}
              </span>
            </div>

            <div class="w-full h-5">
              <Transition name="fade-link">
                <a
                  v-if="index === activeIndex"
                  href="#"
                  class="inline-flex items-center gap-x-1.5 text-[#2AB857] text-[13px] font-[500]"
                  >Learn More <span>→</span></a
                >
              </Transition>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card-wrapper {
  isolation: isolate;
  transition:
    box-shadow 0.3s ease,
    transform 0.3s ease;
}

.card-wrapper.is-active {
  transform: translateY(-6px);
  box-shadow: 0 10px 20px 0 rgba(42, 184, 87, 0.15);
  background-image: v-bind(
    "isDark ? `conic-gradient(from ${angle}deg, #1a1a1a 0%, #4a4a4a 25%, #e8e8e8 45%, #ffffff 50%, #e8e8e8 55%, #4a4a4a 75%, #1a1a1a 100%)` : 'none'"
  );
}

.card-wrapper.is-active::before {
  content: "";
  position: absolute;
  inset: -1px;
  border-radius: 18px;
  background-image: v-bind(
    "!isDark ? `conic-gradient(from ${angle}deg, #eaf8ee 0%, #dff4e6 25%, #bde9cb 50%, #2ab857 75%, #eaf8ee 100%)` : 'none'"
  );
  z-index: -1;
  display: v-bind("isDark ? 'none' : 'block'");
}

.fade-link-enter-active,
.fade-link-leave-active {
  transition: opacity 0.3s ease;
}
.fade-link-enter-from,
.fade-link-leave-to {
  opacity: 0;
}
</style>
