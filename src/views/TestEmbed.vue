<template>
  <div class="w-full flex justify-center mt-20">
    <div ref="container" style="width: 300px; height: 300px"></div>
  </div>

  <section class="w-full h-[500px] bg-green-400"></section>

  <div
    class="min-h-screen flex flex-row items-center justify-center bg-gray-100 px-4"
  >
    <div class="w-full bg-white rounded-xl shadow p-6">
      <!-- CIRCLE STEPPER -->
      <div class="flex flex-row items-center mb-6">
        <div class="relative w-auto h-auto">
          <svg class="w-28 h-28 rotate-[-90deg]">
            <circle
              cx="56"
              cy="56"
              r="50"
              stroke-width="8"
              fill="none"
              class="stroke-gray-200"
            />
            <circle
              cx="56"
              cy="56"
              r="50"
              stroke-width="8"
              fill="none"
              stroke-linecap="round"
              class="stroke-green-500 transition-all duration-300"
              :stroke-dasharray="circumference"
              :stroke-dashoffset="dashOffset"
            />
          </svg>
          <div
            class="absolute w-full h-full top-0 text-sm font-semibold text-gray-700 flex items-center justify-center"
          >
            Step {{ currentStep + 1 }} of {{ steps.length }}
          </div>
        </div>

        <div class="w-full h-auto flex flex-col">
          <h3 class="mt-4 text-lg font-bold">
            {{ steps[currentStep].title }}
          </h3>
          <p class="text-sm text-gray-400">
            {{ steps[currentStep].next }}
          </p>
        </div>
      </div>

      <!-- FORM -->
      <div>
        <component :is="steps[currentStep].component" />
      </div>

      <!-- ACTIONS -->
      <div class="flex justify-between mt-6">
        <button
          @click="prevStep"
          :disabled="currentStep === 0"
          class="px-4 py-2 rounded-full border text-gray-500 disabled:opacity-40"
        >
          Back
        </button>

        <button
          @click="nextStep"
          class="px-6 py-2 rounded-full bg-indigo-600 text-white font-semibold"
        >
          {{ isLastStep ? "Finish" : "Next" }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import lottie from "lottie-web";

// 📌 Import JSON Anda langsung
// Pastikan file ada di: src/assets/myAnimation.json
import myAnimation from "@/assets/videos/videojson.json";
/* ---------------- STATE ---------------- */
const currentStep = ref(0);

const steps = [
  {
    title: "Personal Information",
    next: "Next: Contact Information",
    component: {
      template: `
        <div class="space-y-4">
          <input class="input" placeholder="First name" />
          <input class="input" placeholder="Last name" />
        </div>
      `,
    },
  },
  {
    title: "Contact Information",
    next: "Next: Create Password",
    component: {
      template: `
        <div class="space-y-4">
          <input class="input" placeholder="Phone" />
          <input class="input" placeholder="Email" />
        </div>
      `,
    },
  },
  {
    title: "Create Password",
    next: "Next: Payment",
    component: {
      template: `
        <div class="space-y-4">
          <input type="password" class="input" placeholder="Password" />
          <input type="password" class="input" placeholder="Confirm password" />
        </div>
      `,
    },
  },
  {
    title: "Payment",
    next: "Finish",
    component: {
      template: `
        <div class="space-y-4">
          <input class="input" placeholder="Card number" />
          <input class="input" placeholder="MM/YY" />
        </div>
      `,
    },
  },
];

/* ---------------- PROGRESS ---------------- */
const circumference = 2 * Math.PI * 50;

const dashOffset = computed(() => {
  return circumference * (1 - (currentStep.value + 1) / steps.length);
});

const isLastStep = computed(() => currentStep.value === steps.length - 1);

/* ---------------- METHODS ---------------- */
const nextStep = () => {
  if (!isLastStep.value) currentStep.value++;
};

const prevStep = () => {
  if (currentStep.value > 0) currentStep.value--;
};

const container = ref(null);

const timelines = [
  { year: 2019, quarter: 4, active: false },
  { year: 2020, quarter: 1, active: true },
  { year: 2021, quarter: 2, active: false },
  { year: 2022, quarter: 3, active: false },
  { year: 2023, quarter: 4, active: false },
];

onMounted(() => {
  lottie.loadAnimation({
    container: container.value, // elemen target
    renderer: "svg",
    loop: true,
    autoplay: true,
    animationData: myAnimation, // langsung pakai data JSON
  });
});
</script>

<style scoped>
/* opsional */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
