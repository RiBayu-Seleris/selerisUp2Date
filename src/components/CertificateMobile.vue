<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";

const isFlippedLeft = ref(false);
const isFlippedCenter = ref(false);
const isFlippedRight = ref(false);

// Deskripsi asli
const fullText = `
PT. Seleris Meditekno Internasional has been awarded ISO/IEC 27001:2022 certification with the number 2403150020501, which demonstrates our commitment to healthcare quality and service excellence. This certification signifies that we meet international standards in quality management, and we continuously strive to improve our service quality.`;

// Window width untuk kontrol responsif
const windowWidth = ref(window.innerWidth);

const updateWidth = () => {
  windowWidth.value = window.innerWidth;
};

onMounted(() => {
  window.addEventListener("resize", updateWidth);
});

onUnmounted(() => {
  window.removeEventListener("resize", updateWidth);
});

// Deskripsi pendek tergantung ukuran layar
const shortText = computed(() => {
  const length = fullText.length;
  let max = 130;

  if (windowWidth.value >= 1024) {
    max = 140;
  } else if (windowWidth.value > 425 && windowWidth.value < 1024) {
    max = 120;
  } else {
    max = 70;
  }

  if (length > max) {
    const cut = fullText.slice(0, max).trim();
    return `${cut}<span class='text-blue-500 font-semibold'>...read more</span>`;
  } else {
    return fullText;
  }
});
</script>

<template>
  <div
    class="lg:hidden flex flex-row py-2 w-full max-h-screen gap-x-6 mt-5 overflow-x-auto snap-x snap-mandatory scroll-pl-6 pl-10 pr-10 hide-scrollbar"
  >
    <div
      class="snap-start shrink-0 w-[85%] sml:h-[270px] md:h-[200px] lg:h-[230px] perspective"
      @click="isFlippedLeft = !isFlippedLeft"
    >
      <div
        :class="[
          'relative w-full h-full duration-700 transform-style preserve-3d',
          isFlippedLeft ? 'rotate-y-180' : '',
        ]"
      >
        <!-- FRONT -->
        <div
          class="flex flex-col gap-5 absolute w-full h-full backface-hidden bg-[#F9FAFB] rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30 border border-gray-100 shadow-md p-5"
        >
          <div class="sml:hidden flex flex-row w-full h-auto gap-5">
            <div class="w-[15%] h-auto">
              <img
                src="@/assets/images/certification/logo/Cert1.png"
                alt="CertLogo"
                class="w-full h-full object-center object-contain"
              />
            </div>
            <div class="w-[85%] h-auto flex flex-col gap-2 text-[#195279]">
              <div class="w-full h-auto">
                <p class="text-2xl">ISO CERTIFICATION</p>
              </div>
              <div class="w-full h-auto">
                <p class="text-xl">Certificate Number: 2403150020501</p>
              </div>
            </div>
          </div>

          <!-- sml Screen -->
          <div class="md:hidden flex flex-col w-full h-auto text-[#195279]">
            <div class="flex flex-col w-full h-auto">
              <div class="flex flex-row w-full h-auto gap-x-4 mb-3">
                <div class="flex w-[20%] h-auto">
                  <img
                    src="@/assets/images/certification/logo/Cert1.png"
                    alt="CertLogo"
                    class="w-full h-full object-center object-contain"
                  />
                </div>
                <div class="flex w-[80%] h-auto items-center">
                  <p class="text-xl font-semibold">ISO CERTIFICATION</p>
                </div>
              </div>
              <div class="flex w-full h-auto">
                <p class="text-base">Certificate Number: 2403150020501</p>
              </div>
            </div>
          </div>

          <!-- Descriptions -->
          <div class="flex w-full h-auto">
            <p class="text-base overflow-hidden" v-html="shortText"></p>
          </div>
        </div>

        <!-- BACK -->
        <div
          class="absolute w-full h-full backface-hidden rotate-y-180 bg-[#F9FAFB] rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30 border border-gray-100 shadow-md p-5"
        >
          <p class="text-base overflow-hidden" v-html="fullText"></p>
        </div>
      </div>
    </div>
    <div
      class="snap-start shrink-0 w-[85%] sml:h-[270px] md:h-[200px] lg:h-[230px] perspective"
      @click="isFlippedCenter = !isFlippedCenter"
    >
      <div
        :class="[
          'relative w-full h-full duration-700 transform-style preserve-3d',
          isFlippedCenter ? 'rotate-y-180' : '',
        ]"
      >
        <!-- FRONT -->
        <div
          class="flex flex-col gap-5 absolute w-full h-full backface-hidden bg-[#F9FAFB] rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30 border border-gray-100 shadow-md p-5"
        >
          <div class="sml:hidden flex flex-row w-full h-auto gap-5">
            <div class="w-[15%] h-auto">
              <img
                src="@/assets/images/certification/logo/Cert1.png"
                alt="CertLogo"
                class="w-full h-full object-center object-contain"
              />
            </div>
            <div class="w-[85%] h-auto flex flex-col gap-2 text-[#195279]">
              <div class="w-full h-auto">
                <p class="text-2xl">ISO CERTIFICATION</p>
              </div>
              <div class="w-full h-auto">
                <p class="text-xl">Certificate Number: 2403150020501</p>
              </div>
            </div>
          </div>

          <!-- sml Screen -->
          <div class="md:hidden flex flex-col w-full h-auto text-[#195279]">
            <div class="flex flex-col w-full h-auto">
              <div class="flex flex-row w-full h-auto gap-x-4 mb-3">
                <div class="flex w-[20%] h-auto">
                  <img
                    src="@/assets/images/certification/logo/Cert1.png"
                    alt="CertLogo"
                    class="w-full h-full object-center object-contain"
                  />
                </div>
                <div class="flex w-[80%] h-auto items-center">
                  <p class="text-xl font-semibold">ISO CERTIFICATION</p>
                </div>
              </div>
              <div class="flex w-full h-auto">
                <p class="text-base">Certificate Number: 2403150020501</p>
              </div>
            </div>
          </div>

          <!-- Descriptions -->
          <div class="flex w-full h-auto">
            <p class="text-base overflow-hidden" v-html="shortText"></p>
          </div>
        </div>

        <!-- BACK -->
        <div
          class="absolute w-full h-full backface-hidden rotate-y-180 bg-[#F9FAFB] rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30 border border-gray-100 shadow-md p-5"
        >
          <p class="text-base overflow-hidden" v-html="fullText"></p>
        </div>
      </div>
    </div>
    <div
      class="snap-start shrink-0 w-[85%] sml:h-[270px] md:h-[200px] lg:h-[230px] perspective"
      @click="isFlippedRight = !isFlippedRight"
    >
      <div
        :class="[
          'relative w-full h-full duration-700 transform-style preserve-3d',
          isFlippedRight ? 'rotate-y-180' : '',
        ]"
      >
        <!-- FRONT -->
        <div
          class="flex flex-col gap-5 absolute w-full h-full backface-hidden bg-[#F9FAFB] rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30 border border-gray-100 shadow-md p-5"
        >
          <div class="sml:hidden flex flex-row w-full h-auto gap-5">
            <div class="w-[15%] h-auto">
              <img
                src="@/assets/images/certification/logo/Cert1.png"
                alt="CertLogo"
                class="w-full h-full object-center object-contain"
              />
            </div>
            <div class="w-[85%] h-auto flex flex-col gap-2 text-[#195279]">
              <div class="w-full h-auto">
                <p class="text-2xl">ISO CERTIFICATION</p>
              </div>
              <div class="w-full h-auto">
                <p class="text-xl">Certificate Number: 2403150020501</p>
              </div>
            </div>
          </div>

          <!-- sml Screen -->
          <div class="md:hidden flex flex-col w-full h-auto text-[#195279]">
            <div class="flex flex-col w-full h-auto">
              <div class="flex flex-row w-full h-auto gap-x-4 mb-3">
                <div class="flex w-[20%] h-auto">
                  <img
                    src="@/assets/images/certification/logo/Cert1.png"
                    alt="CertLogo"
                    class="w-full h-full object-center object-contain"
                  />
                </div>
                <div class="flex w-[80%] h-auto items-center">
                  <p class="text-xl font-semibold">ISO CERTIFICATION</p>
                </div>
              </div>
              <div class="flex w-full h-auto">
                <p class="text-base">Certificate Number: 2403150020501</p>
              </div>
            </div>
          </div>

          <!-- Descriptions -->
          <div class="flex w-full h-auto">
            <p class="text-base overflow-hidden" v-html="shortText"></p>
          </div>
        </div>

        <!-- BACK -->
        <div
          class="absolute w-full h-full backface-hidden rotate-y-180 bg-[#F9FAFB] rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30 border border-gray-100 shadow-md p-5"
        >
          <p class="text-base overflow-hidden" v-html="fullText"></p>
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
</style>
