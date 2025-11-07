<template>
  <div
    class="w-full h-auto px-8 md:px-12 xl:px-24 xl:max-w-6xl mx-auto pt-32 dark:bg-[#17181A]"
  >
    <!-- Judul -->
    <h1 class="text-2xl font-semibold text-blue-900 mb-1">Technical Writer</h1>
    <p class="text-gray-500 mb-6">
      Office Department – Technical Writer / Full Time / Jakarta
    </p>

    <!-- Progress Stepper -->
    <div class="w-full mb-8">
      <div class="flex items-center justify-between relative">
        <!-- Garis background -->
        <div
          class="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2"
        ></div>

        <!-- Garis progress -->
        <div
          class="absolute top-1/2 left-0 h-1 bg-green-500 -translate-y-1/2 transition-all duration-500"
          :style="{ width: `${(currentStep / (steps.length - 1)) * 100}%` }"
        ></div>

        <!-- Titik-titik step -->
        <div
          v-for="(step, index) in steps"
          :key="index"
          class="relative z-10 flex flex-col items-center mt-5"
        >
          <div
            class="w-7 h-7 rounded-full flex items-center justify-center text-white text-sm font-medium transition-all duration-300"
            :class="index <= currentStep ? 'bg-green-500' : 'bg-gray-300'"
          >
            <template v-if="index < currentStep"> ✓ </template>
            <template v-else>
              {{ index + 1 }}
            </template>
          </div>
          <p
            class="text-xs mt-2 text-center w-20"
            :class="index <= currentStep ? 'text-green-600' : 'text-gray-400'"
          >
            Step {{ index + 1 }}
          </p>
        </div>
      </div>
    </div>

    <!-- Konten step -->
    <div class="bg-white rounded-xl shadow p-6 mb-4 min-h-[320px]">
      <!-- STEP 1: Data Personal -->
      <div v-if="currentStep === 0">
        <h2 class="text-lg font-medium mb-4">Data Personal</h2>

        <form class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Full Name</label
            >
            <input
              v-model="form.fullName"
              type="text"
              class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring focus:ring-green-200"
              placeholder="Masukkan nama lengkap"
            />
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1"
                >Gender</label
              >
              <select
                v-model="form.gender"
                class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring focus:ring-green-200"
              >
                <option disabled value="">Pilih Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1"
                >Number Phone</label
              >
              <input
                v-model="form.phone"
                type="text"
                class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring focus:ring-green-200"
                placeholder="081234567890"
              />
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1"
                >Email</label
              >
              <input
                v-model="form.email"
                type="email"
                class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring focus:ring-green-200"
                placeholder="example@mail.com"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1"
                >Country</label
              >
              <div class="flex items-center gap-2">
                <select
                  v-model="form.country"
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring focus:ring-green-200"
                >
                  <option value="Indonesia">Indonesia</option>
                  <option value="Malaysia">Malaysia</option>
                  <option value="Singapore">Singapore</option>
                </select>
                <img
                  src="https://flagcdn.com/w20/id.png"
                  alt="ID flag"
                  class="w-6 h-4 object-cover rounded-sm border"
                />
              </div>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Current Location</label
            >
            <select
              v-model="form.location"
              class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring focus:ring-green-200"
            >
              <option value="Jakarta Selatan">Jakarta Selatan</option>
              <option value="Jakarta Barat">Jakarta Barat</option>
              <option value="Bandung">Bandung</option>
              <option value="Surabaya">Surabaya</option>
            </select>
          </div>
        </form>
      </div>

      <!-- STEP 2: Selection -->
      <div v-else-if="currentStep === 1">
        <h2 class="text-lg font-medium mb-2">Selection</h2>
        <p>Tahap seleksi — isi nanti di sini.</p>
      </div>

      <!-- STEP 3+ -->
      <div v-else>
        <h2 class="text-lg font-medium mb-2">Experience {{ currentStep }}</h2>
        <p>Isi pengalaman kerja Anda di tahap ini.</p>
      </div>
    </div>

    <!-- Tombol navigasi -->
    <div class="flex justify-between">
      <button
        v-if="currentStep > 0"
        @click="prevStep"
        class="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg"
      >
        Sebelumnya
      </button>

      <button
        v-if="currentStep < steps.length - 1"
        @click="nextStep"
        class="bg-green-500 text-white px-4 py-2 rounded-lg ml-auto"
      >
        Selanjutnya
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const steps = [
  "Data Personal",
  "Selection",
  "Experience 1",
  "Experience 2",
  "Experience 3",
  "Experience 4",
  "Experience 5",
];

const currentStep = ref(0);

const form = ref({
  fullName: "",
  gender: "",
  email: "",
  phone: "",
  country: "Indonesia",
  location: "",
});

const nextStep = () => {
  if (currentStep.value < steps.length - 1) currentStep.value++;
};

const prevStep = () => {
  if (currentStep.value > 0) currentStep.value--;
};
</script>
