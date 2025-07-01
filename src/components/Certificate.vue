<script setup>
import { ref } from "vue";
import MobileCert from "@/components/CertMobile.vue";

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
  <div class="lg:mt-24">
    <!-- Desktop Version -->
    <div
      class="hidden lg:flex flex-row w-full h-[100vh] relative items-center justify-center self-center"
    >
      <div class="flex flex-row w-full h-full justify-between relative">
        <div
          class="flex w-full h-full justify-start self-start content-start items-start"
        >
          <img
            src="@/assets/images/left-cert.svg"
            alt="Background"
            class="w-[600px] h-[600px] object-contain"
          />
        </div>
        <div
          class="flex w-full h-full justify-end self-end content-end items-end"
        >
          <img
            src="@/assets/images/right-cert.svg"
            alt="Background"
            class="w-[600px] h-[600px] object-contain"
          />
        </div>
      </div>

      <!-- ISI CARD -->
      <div class="absolute w-full h-full flex flex-col">
        <div class="flex flex-col text-center justify-center mb-5">
          <div class="w-full h-auto py-2">
            <p class="text-5xl">Seleris Certification</p>
          </div>
          <div class="w-full h-auto py-2">
            <p class="text-2xl text-[#1DC457]">
              Seleris Meditekno Internasional
            </p>
          </div>
        </div>
        <div class="flex flex-row mx-10">
          <!-- Card Left -->
          <div class="w-full h-auto">
            <div
              class="w-[420px] h-[500px] bg-custom-cert-center"
              v-if="!cardOne"
              @click="toggleClickOne"
            >
              <div class="w-full h-full">
                <div class="px-16 py-20 flex flex-col">
                  <div
                    class="flex w-full h-full items-center justify-center mb-5"
                  >
                    <img
                      src="@/assets/images/ISO-Cert.svg"
                      alt="Background"
                      class="w-[200px] h-[200px] object-contain"
                    />
                  </div>
                  <div class="pt-6 text-center text-[#195279] font-semibold">
                    <p class="text-[21pt]">ISO Certification Award</p>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="w-[420px] h-[500px] bg-custom-cert-hover"
              v-if="cardOne"
              @click="toggleClickOne"
            >
              <div class="w-full">
                <div class="px-14 py-14 flex flex-col text-white">
                  <div>
                    <p class="text-[21pt] pb-3">ISO Certification Award</p>
                  </div>
                  <div>
                    <p class="text-[12pt] pb-3">
                      Certificate Number: 2403150020501
                    </p>
                  </div>
                  <div>
                    <p class="text-[12pt]">
                      PT. Seleris Meditekno Internasional has been awarded
                      ISO/IEC 27001:2022 certification with the number
                      2403150020501, which demonstrates our commitment to
                      healthcare quality and service excellence. This
                      certification signifies that we meet international
                      standards in quality management, and we continuously
                      strive to improve our service quality.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Card Center -->
          <div class="w-full h-auto">
            <div
              class="w-[420px] h-[500px] bg-custom-cert-center"
              v-if="!cardTwo"
              @click="toggleClickTwo"
            >
              <div class="w-full h-full">
                <div class="px-16 py-20 flex flex-col">
                  <div
                    class="flex w-full h-full items-center justify-center mb-5"
                  >
                    <img
                      src="@/assets/images/DSCUI.svg"
                      alt="Background"
                      class="w-[200px] h-[200px] object-contain"
                    />
                  </div>
                  <div class="pt-6 text-center text-[#195279] font-semibold">
                    <p class="text-[19pt]">Best Innovation AI</p>
                    <p class="text-[19pt]">Solution for Insurance</p>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="w-[420px] h-[500px] bg-custom-cert-hover"
              v-if="cardTwo"
              @click="toggleClickTwo"
            >
              <div class="w-full">
                <div class="px-14 py-14 flex flex-col text-white">
                  <div>
                    <p class="text-[21pt] pb-3">ISO Certification Award</p>
                  </div>
                  <div>
                    <p class="text-[12pt] pb-3">
                      Certificate Number: 2403150020501
                    </p>
                  </div>
                  <div>
                    <p class="text-[12pt]">
                      PT. Seleris Meditekno Internasional has been awarded
                      ISO/IEC 27001:2022 certification with the number
                      2403150020501, which demonstrates our commitment to
                      healthcare quality and service excellence. This
                      certification signifies that we meet international
                      standards in quality management, and we continuously
                      strive to improve our service quality.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Card Right -->
          <div class="w-full h-auto">
            <div
              class="w-[420px] h-[500px] bg-custom-cert-right"
              v-if="!cardThree"
              @click="toggleClickThree"
            >
              <div class="w-full h-full">
                <div class="px-16 py-20 flex flex-col">
                  <div
                    class="flex w-full h-full items-center justify-center mb-5"
                  >
                    <img
                      src="@/assets/images/ISO-Cert.svg"
                      alt="Background"
                      class="w-[200px] h-[200px] object-contain"
                    />
                  </div>
                  <div class="pt-6 text-center text-[#195279] font-semibold">
                    <p class="text-[21pt]">ISO Certification Award</p>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="w-[420px] h-[500px] bg-custom-cert-hover"
              v-if="cardThree"
              @click="toggleClickThree"
            >
              <div class="w-full">
                <div class="px-14 py-14 flex flex-col text-white">
                  <div>
                    <p class="text-[21pt] pb-3">ISO Certification Award</p>
                  </div>
                  <div>
                    <p class="text-[12pt] pb-3">
                      Certificate Number: 2403150020501
                    </p>
                  </div>
                  <div>
                    <p class="text-[12pt]">
                      PT. Seleris Meditekno Internasional has been awarded
                      ISO/IEC 27001:2022 certification with the number
                      2403150020501, which demonstrates our commitment to
                      healthcare quality and service excellence. This
                      certification signifies that we meet international
                      standards in quality management, and we continuously
                      strive to improve our service quality.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile Version -->
    <div class="flex lg:hidden w-full mt-10 overflow-hidden">
      <MobileCert />
    </div>
  </div>
</template>

<style scoped>
.bg-custom-cert-hover {
  background-image: url("@/assets/images/cert-side2.png");
  background-size: cover;
  background-repeat: no-repeat;
}
.bg-custom-cert-center {
  background-image: url("@/assets/images/cert-center.png");
  background-size: cover;
  background-repeat: no-repeat;
}
.bg-custom-cert-right {
  background-image: url("@/assets/images/cert-right.png");
  background-size: cover;
  background-repeat: no-repeat;
}

.custom-shape {
  border-radius: 30px;
  clip-path: polygon(0% 0%, 85% 0%, 100% 15%, 100% 100%, 0% 100%);
}
</style>
