<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
defineProps({
  certificates: {
    type: Array,
    required: true,
  },
});

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
  let max = 130;
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
  <div
    class="lg:hidden flex flex-row w-full h-auto gap-x-6 overflow-x-auto snap-x snap-mandatory hide-scrollbar px-8 py-10"
  >
    <div
      v-for="(cert, index) in certificates"
      :key="index"
      class="cursor-pointer snap-center shrink-0 w-full h-[240px] sm:w-full sm:h-[200px] md:w-full md:h-[240px] lg:h-[230px] perspective mb-2"
      @click="handleFlip(index)"
    >
      <div
        :class="[
          'relative w-full h-full duration-700 transform-style preserve-3d',
          flippedIndex === index ? 'rotate-y-180' : '',
        ]"
      >
        <!-- FRONT -->
        <div
          class="flex flex-col space-y-2 md:space-y-3 absolute w-full h-full backface-hidden bg-[#F9FAFB] dark:bg-[#1D1F23] rounded-[20px] bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-60 shadow-md px-5 pt-6 border-[0.1px] dark:border-[#FAFAFA]/25"
        >
          <div
            class="flex flex-col w-full h-auto text-[#195279] dark:text-[#FAFAFA]"
          >
            <div class="flex flex-col w-full h-auto">
              <div class="flex flex-row w-full h-auto gap-x-4 mb-4">
                <div
                  class="flex sml:w-[50px] sml:h-[50px] md:w-[60px] md:h-[60px]"
                >
                  <img
                    :src="`/assets/images/certificate-icon/${cert.logo}`"
                    alt="CertLogo"
                    class="w-full h-full object-center object-contain"
                  />
                </div>
                <div
                  class="flex md:w-full h-auto items-start justify-center"
                  :class="[
                    cert.subsubtitleBefore === null ? '' : 'space-y-1 flex-col',
                  ]"
                >
                  <p class="text-[14px] md:text-[20px] text-start font-normal">
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

          <!-- Description -->
          <div class="flex w-full h-auto">
            <p
              class="text-[12px] md:text-[16px] overflow-hidden"
              v-html="getShortText(cert.description)"
            ></p>
          </div>
        </div>

        <!-- BACK -->
        <div
          class="absolute w-full h-[240px] sm:w-full sm:h-[200px] md:w-full md:h-[240px] lg:h-[230px] py-5 px-5 sm:px-4 md:px-6 backface-hidden rotate-y-180 bg-[#F9FAFB] dark:bg-[#FAFAFA] rounded-[20px] bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-60 border border-gray-100 shadow-md flex items-center"
        >
          <p
            class="flex text-[12px] sm:text-[12px] md:text-[18px] leading-normal overflow-hidden justify-center dark:text-[#3D3434]"
            v-html="cert.description"
          ></p>
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
</style>
