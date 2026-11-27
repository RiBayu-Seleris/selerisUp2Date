<script setup>
import { bersihkanHtml } from "@/utils/sanitizeHtml";
import { buatCarousel } from "@/utils/carousel";
import { ref, computed, onMounted, onUnmounted } from "vue";
defineProps({
  certificates: {
    type: Array,
    required: true,
  },
});

const kartu = buatCarousel();

// Track flipped card index
const flippedIndex = ref(null);

const handleFlip = (index) => {
  flippedIndex.value = flippedIndex.value === index ? null : index;
};

// Window width
const windowWidth = ref(window.innerWidth);
const updateWidth = () => (windowWidth.value = window.innerWidth);

onMounted(() => window.addEventListener("resize", updateWidth));
onUnmounted(() => window.removeEventListener("resize", updateWidth));

const getShortText = (fullText) => {
  const length = fullText.length;
  let max; // selalu diisi salah satu cabang di bawah
  if (windowWidth.value >= 1024) max = 140;
  else if (windowWidth.value >= 768) max = 140;
  else if (windowWidth.value >= 640) max = 140;
  else max = 100;

  if (length > max) {
    const cut = fullText.slice(0, max).trim();
    return `${cut}<span class='text-[#1AB24F] font-semibold '>...read more</span>`;
  } else {
    return fullText;
  }
};
</script>

<template>
  <div class="relative lg:hidden w-full">
    <transition
      enter-active-class="duration-300 ease-out"
      enter-from-class="opacity-0 scale-75 -translate-x-3"
      leave-active-class="duration-200 ease-in"
      leave-to-class="opacity-0 scale-75 -translate-x-3"
    >
      <button
        v-if="kartu.bisaKeKiri.value"
        @click="kartu.geser('left')"
        aria-label="Scroll left"
        class="flex absolute left-2 top-1/2 -translate-y-1/2 z-30 w-10 h-10 p-2 items-center justify-center rounded-full bg-white dark:bg-[#2A2B2D] shadow-md border border-[#E5E7EB] dark:border-[#3A3B3D] text-[#195279] dark:text-[#D4D4D4] hover:bg-[#195279] hover:text-white dark:hover:bg-[#3A3B3D] transition-all duration-200"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-full h-full"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>
    </transition>
    <transition
      enter-active-class="duration-300 ease-out"
      enter-from-class="opacity-0 scale-75 translate-x-3"
      leave-active-class="duration-200 ease-in"
      leave-to-class="opacity-0 scale-75 translate-x-3"
    >
      <button
        v-if="kartu.bisaKeKanan.value"
        @click="kartu.geser('right')"
        aria-label="Scroll right"
        class="flex absolute right-2 top-1/2 -translate-y-1/2 z-30 w-10 h-10 p-2 items-center justify-center rounded-full bg-white dark:bg-[#2A2B2D] shadow-md border border-[#E5E7EB] dark:border-[#3A3B3D] text-[#195279] dark:text-[#D4D4D4] hover:bg-[#195279] hover:text-white dark:hover:bg-[#3A3B3D] transition-all duration-200"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-full h-full"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
    </transition>
    <div
      :ref="kartu.pasangEl"
      class="flex flex-row w-full h-auto gap-x-6 overflow-x-auto snap-x snap-mandatory hide-scrollbar px-8 py-10"
    >
      <div
        v-for="(cert, index) in certificates"
        :key="index"
        class="animated-border-wrapper p-[1px] rounded-[20px] snap-center shrink-0 w-full h-[240px] sm:h-[200px] md:h-[240px] lg:h-[230px] mb-2"
      >
        <div
          class="cursor-pointer w-full h-full perspective rounded-[20px]"
          @click="handleFlip(index)"
        >
          <div
            :class="[
              'relative w-full h-full duration-700 transform-style preserve-3d',
              flippedIndex === index ? 'rotate-y-180' : '',
            ]"
          >
            <div
              class="flex flex-col space-y-2 md:space-y-3 absolute w-full h-full backface-hidden bg-[#F9FAFB] dark:bg-[#1D1F23] rounded-[20px] bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-60 shadow-md px-5 pt-6"
            >
              <div
                class="flex flex-col w-full h-auto text-[#195279] dark:text-[#FAFAFA]"
              >
                <div class="flex flex-col w-full h-auto">
                  <div class="flex flex-row w-full h-auto gap-x-4 mb-4">
                    <div class="flex w-[50px] h-[50px] md:w-[60px] md:h-[60px]">
                      <img
                        :src="`/assets/images/certificate-icon/${cert.logo}`"
                        alt="CertLogo"
                        class="w-full h-full object-center object-contain"
                      />
                    </div>
                    <div
                      class="flex md:w-full h-auto items-start justify-center"
                      :class="[
                        cert.subsubtitleBefore === null
                          ? ''
                          : 'space-y-1 flex-col',
                      ]"
                    >
                      <p
                        class="text-[14px] md:text-[20px] text-start font-normal"
                      >
                        {{ cert.titleBefore }}
                      </p>
                      <p
                        class="text-[10px] sm:text-[12px] font-normal text-[#195279] dark:text-[#FAFAFAFA] leading-normal"
                      >
                        {{ cert.subtitleBefore }}
                      </p>
                    </div>
                  </div>
                  <div class="flex w-full h-[50px] sm:h-[30px]">
                    <p
                      class="text-[14px] sm:text-[14px] md:text-[18px] tracking-wide"
                    >
                      {{ cert.certNumber }}
                    </p>
                  </div>
                </div>
              </div>

              <div class="flex w-full h-auto">
                <p
                  class="text-[12px] md:text-[16px] overflow-hidden"
                  v-html="bersihkanHtml(getShortText(cert.description))"
                ></p>
              </div>
            </div>

            <div
              class="absolute w-full h-full py-5 px-5 sm:px-4 md:px-6 backface-hidden rotate-y-180 bg-[#F9FAFB] dark:bg-[#FAFAFA] rounded-[20px] bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-60 border border-gray-100 shadow-md flex items-center"
            >
              <p
                class="flex text-[12px] sm:text-[12px] md:text-[18px] leading-normal overflow-hidden justify-center dark:text-[#3D3434]"
                v-html="bersihkanHtml(cert.description)"
              ></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.perspective {
  perspective: 1000px;
}
.transform-style {
  transform-style: preserve-3d;
}
.backface-hidden {
  backface-visibility: hidden;
}
.rotate-y-180 {
  transform: rotateY(180deg);
}
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

@property --angle {
  syntax: "<angle>";
  initial-value: 0deg;
  inherits: false;
}

@keyframes spin-border {
  to {
    --angle: 360deg;
  }
}

.animated-border-wrapper {
  background: #f9fafb;
}

.dark .animated-border-wrapper {
  background: conic-gradient(
    from var(--angle),
    #1a1a1a 0%,
    #4a4a4a 25%,
    #e8e8e8 45%,
    #ffffff 50%,
    #e8e8e8 55%,
    #4a4a4a 75%,
    #1a1a1a 100%
  );
  animation: spin-border 10s linear infinite;
}
</style>
