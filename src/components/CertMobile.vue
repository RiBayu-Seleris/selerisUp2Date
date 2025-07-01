<script setup>
import { ref } from "vue";

const cardOne = ref(false);
const cardTwo = ref(false);
const cardThree = ref(false);

const toggleClickOne = () => {
  cardOne.value = !cardOne.value;
  cardTwo.value = false;
  cardThree.value = false;
};
const toggleClickTwo = () => {
  cardTwo.value = !cardTwo.value;
  cardOne.value = false;
  cardThree.value = false;
};
const toggleClickThree = () => {
  cardThree.value = !cardThree.value;
  cardOne.value = false;
  cardTwo.value = false;
};

// Mobile Version Script
// Kartu dengan info deskripsi

const scrollContainerRef = ref(null);
const selectedScrollIndex = ref(null);

const selectScrollCard = (index) => {
  selectedScrollIndex.value =
    selectedScrollIndex.value === index ? null : index;
};
</script>
<template>
  <div
    ref="scrollContainerRef"
    class="flex overflow-x-auto scroll-smooth snap-x snap-mandatory hide-scrollbar"
  >
    <div class="flex flex-row mx-10">
      <!-- Card Left -->
      <div class="w-full h-auto">
        <div
          class="sml:w-[345px] sml:h-[420px] md:w-[400px] md:h-[480px] mobile-bg-custom-cert-center transition-all duration-300"
          v-if="!cardOne"
          @click="toggleClickOne"
        >
          <div class="w-full h-full">
            <div class="flex flex-col">
              <div
                class="flex w-full h-full items-center justify-center mt-14 sml:mb-6 md:mb-10"
              >
                <img
                  src="@/assets/images/ISO-Cert.svg"
                  alt="Background"
                  class="sml:w-[150px] sml:h-[150px] md:w-[200px] md:h-[200px] object-contain"
                />
              </div>
              <div class="px-10 text-center">
                <p class="sml:text-[21pt] md:text-[21pt]">
                  ISO Certification Award
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
          class="sml:w-[360px] sml:h-[440px] md:w-[410px] md:h-[490px] mobile-bg-custom-cert-hover"
          v-if="cardOne"
          @click="toggleClickOne"
        >
          <div class="w-full">
            <div
              class="sml:px-10 sml:py-16 md:px-12 md:py-10 flex flex-col text-white"
            >
              <div>
                <p class="sml:text-[17pt] md:text-[21pt] pb-3">
                  ISO Certification Award
                </p>
              </div>
              <div>
                <p class="sml:text-[12pt] md:text-[12pt] pb-3">
                  Certificate Number: 2403150020501
                </p>
              </div>
              <div>
                <p class="sml:text-[11pt] md:text-[12pt]">
                  PT. Seleris Meditekno Internasional has been awarded ISO/IEC
                  27001:2022 certification with the number 2403150020501, which
                  demonstrates our commitment to healthcare quality and service
                  excellence. This certification signifies that we meet
                  international standards in quality management, and we
                  continuously strive to improve our service quality.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Card Center -->
      <div class="w-full h-auto">
        <div
          class="sml:w-[345px] sml:h-[420px] md:w-[400px] md:h-[480px] mobile-bg-custom-cert-center transition-all duration-300"
          v-if="!cardTwo"
          @click="toggleClickTwo"
        >
          <div class="w-full h-full">
            <div class="flex flex-col">
              <div
                class="flex w-full h-full items-center justify-center mt-14 sml:mb-6 md:mb-10"
              >
                <img
                  src="@/assets/images/DSCUI.svg"
                  alt="Background"
                  class="sml:w-[150px] sml:h-[150px] md:w-[200px] md:h-[200px] object-contain"
                />
              </div>
              <div class="text-center">
                <p class="sml:text-[19pt] md:text-[21pt]">Best Innovation AI</p>
                <p class="sml:text-[19pt] md:text-[21pt]">
                  Solution for Insurance
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
          class="sml:w-[360px] sml:h-[440px] md:w-[410px] md:h-[490px] mobile-bg-custom-cert-hover"
          v-if="cardTwo"
          @click="toggleClickTwo"
        >
          <div class="w-full">
            <div
              class="sml:px-10 sml:py-16 md:px-12 md:py-10 flex flex-col text-white"
            >
              <div>
                <p class="sml:text-[17pt] md:text-[21pt] pb-3">
                  ISO Certification Award
                </p>
              </div>
              <div>
                <p class="sml:text-[12pt] md:text-[12pt] pb-3">
                  Certificate Number: 2403150020501
                </p>
              </div>
              <div>
                <p class="sml:text-[11pt] md:text-[12pt]">
                  PT. Seleris Meditekno Internasional has been awarded ISO/IEC
                  27001:2022 certification with the number 2403150020501, which
                  demonstrates our commitment to healthcare quality and service
                  excellence. This certification signifies that we meet
                  international standards in quality management, and we
                  continuously strive to improve our service quality.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Card Right -->
      <div class="w-full h-auto">
        <div
          class="sml:w-[345px] sml:h-[420px] md:w-[400px] md:h-[480px] mobile-bg-custom-cert-center transition-all duration-300"
          v-if="!cardThree"
          @click="toggleClickThree"
        >
          <div class="w-full h-full">
            <div class="flex flex-col">
              <div
                class="flex w-full h-full items-center justify-center mt-14 sml:mb-6 md:mb-10"
              >
                <img
                  src="@/assets/images/ISO-Cert.svg"
                  alt="Background"
                  class="sml:w-[150px] sml:h-[150px] md:w-[200px] md:h-[200px] object-contain"
                />
              </div>
              <div class="px-10 text-center">
                <p class="sml:text-[21pt] md:text-[21pt]">
                  ISO Certification Award
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
          class="sml:w-[360px] sml:h-[440px] md:w-[410px] md:h-[490px] mobile-bg-custom-cert-hover"
          v-if="cardThree"
          @click="toggleClickThree"
        >
          <div class="w-full">
            <div
              class="sml:px-10 sml:py-16 md:px-12 md:py-10 flex flex-col text-white"
            >
              <div>
                <p class="sml:text-[17pt] md:text-[21pt] pb-3">
                  ISO Certification Award
                </p>
              </div>
              <div>
                <p class="sml:text-[12pt] md:text-[12pt] pb-3">
                  Certificate Number: 2403150020501
                </p>
              </div>
              <div>
                <p class="sml:text-[11pt] md:text-[12pt]">
                  PT. Seleris Meditekno Internasional has been awarded ISO/IEC
                  27001:2022 certification with the number 2403150020501, which
                  demonstrates our commitment to healthcare quality and service
                  excellence. This certification signifies that we meet
                  international standards in quality management, and we
                  continuously strive to improve our service quality.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.mobile-bg-custom-cert-hover {
  background-image: url("@/assets/images/cert-side2.png");
  background-size: contain;
  background-repeat: no-repeat;
}
.mobile-bg-custom-cert-center {
  background-image: url("@/assets/images/cert-center.png");
  background-size: contain;
  background-repeat: no-repeat;
}
.mobile-bg-custom-cert-right {
  background-image: url("@/assets/images/cert-right.png");
  background-size: contain;
  background-repeat: no-repeat;
}
</style>
