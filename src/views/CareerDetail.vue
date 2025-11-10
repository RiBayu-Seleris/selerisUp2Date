<script setup>
import { ref } from "vue";

const steps = [
  { number: "Step 1", title: "Personal Info" },
  { number: "Step 2", title: "Education" },
  { number: "Step 3", title: "Experience" },
  { number: "Step 4", title: "Skills" },
  { number: "Step 5", title: "Motivation" },
  { number: "Step 6", title: "Documents" },
  { number: "Step 7", title: "Declaration" },
];

const currentStep = ref(0);

const nextStep = () => {
  if (currentStep.value < steps.length - 1) currentStep.value++;
};

const prevStep = () => {
  if (currentStep.value > 0) currentStep.value--;
};
</script>

<template>
  <div
    class="w-full h-auto px-8 md:px-12 xl:px-24 xl:max-w-6xl mx-auto pt-32 dark:bg-[#17181A]"
  >
    <div class="w-full h-auto flex flex-col">
      <div class="w-full h-auto">
        <p class="text-[#195279] font-[500] text-[36px]">Technical Writer</p>
      </div>
      <div class="w-full h-auto my-3">
        <p class="text-[#6E6E6E] font-[400] text-[16px]">
          Office Department - Technical Writer / Full Time / Jakarta
        </p>
      </div>

      <!-- TESTINGGGGGGGGGGGGGGGGGGGG -->
      <!-- Stepper -->
      <div class="flex flex-row w-full h-auto mt-20 mb-10 items-center">
        <template v-for="(step, index) in steps" :key="index">
          <!-- Step -->
          <div class="relative flex items-center w-auto h-auto">
            <!-- Step Sudah Dilakukan -->
            <template v-if="index < currentStep">
              <div
                class="flex items-center justify-center w-8 h-8 rounded-md bg-[#2AB857]/30 p-1 text-white"
              >
                <div
                  class="flex items-center justify-center w-full h-full rounded-md bg-[#2AB857] text-white"
                >
                  ✓
                </div>
              </div>
            </template>

            <!-- Step Sedang Dilakukan -->
            <template v-else-if="index === currentStep">
              <div
                class="flex items-center justify-center w-8 h-8 rounded-md bg-[#2AB857] p-1.5 text-white"
              >
                <div
                  class="flex items-center justify-center w-full h-full rounded-md bg-[#FAFAFA] text-white"
                />
              </div>
            </template>

            <!-- Step Belum Dilakukan -->
            <template v-else>
              <div
                class="flex items-center justify-center w-8 h-8 rounded-md bg-[#D9D9D9] p-[3px] text-white"
              >
                <div
                  class="flex items-center justify-center w-full h-full rounded-md bg-[#D9D9D9] border-white border-[5px]"
                />
              </div>
            </template>

            <!-- Label -->
            <div
              class="absolute flex flex-col text-center w-[100px] top-10 -left-8"
            >
              <span class="font-[500] text-[16px] text-[#195279]">
                {{ step.number }}
              </span>
              <p class="font-[400] text-[12px] text-[#195279] leading-normal">
                {{ step.title }}
              </p>
            </div>
          </div>

          <!-- Garis antar step -->
          <div
            v-if="index !== steps.length - 1"
            class="flex flex-1 items-center self-stretch px-0.5 rounded-full"
          >
            <div
              class="w-full h-[3px] rounded-full"
              :class="index < currentStep ? 'bg-[#2AB857]' : 'bg-[#D9D9D9]'"
            />
          </div>
        </template>
      </div>

      <!-- Form -->
      <div class="mt-16 p-0">
        <div v-if="currentStep === 0">
          <h2 class="text-xl font-semibold text-[#195279] mb-4">
            Personal Info
          </h2>
        </div>

        <div v-if="currentStep === 1">
          <h2 class="text-xl font-semibold text-[#195279] mb-4">Education</h2>
        </div>

        <div v-if="currentStep === 2">
          <h2 class="text-xl font-semibold text-[#195279] mb-4">Experience</h2>
        </div>

        <div v-if="currentStep === 3">
          <h2 class="text-xl font-semibold text-[#195279] mb-4">Skills</h2>
        </div>

        <div v-if="currentStep === 4">
          <h2 class="text-xl font-semibold text-[#195279] mb-4">Motivation</h2>
        </div>

        <div v-if="currentStep === 5">
          <h2 class="text-xl font-semibold text-[#195279] mb-4">Documents</h2>
        </div>

        <div v-if="currentStep === 6">
          <h2 class="text-xl font-semibold text-[#195279] mb-4">Declaration</h2>
        </div>

        <!-- Navigasi -->
        <div class="flex justify-between mt-8">
          <button
            @click="prevStep"
            class="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg"
            :disabled="currentStep === 0"
          >
            Sebelumnya
          </button>

          <button
            @click="nextStep"
            class="bg-[#2AB857] text-white px-4 py-2 rounded-lg"
            :disabled="currentStep === steps.length - 1"
          >
            Selanjutnya
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
