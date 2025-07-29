<script setup>
import { ref } from "vue";

const FullName = ref("");
const CompanyName = ref("");
const Email = ref("");
const PhoneNumber = ref("");
const Country = ref("");
const Products = ref("");
const Message = ref("");

const countries = ["Indonesia", "Singapura", "Malaysia"];
</script>

<template>
  <div
    class="relative flex flex-col w-full h-auto pt-28 justify-center items-center"
  >
    <div class="w-full h-auto flex flex-col mb-10">
      <div class="w-full h-auto flex justify-center text-center mb-5">
        <p class="text-[47px] text-[#343F51] font-[600] leading-[60px]">
          Get in Touch with Us to <br />
          Request a Demo
        </p>
      </div>
      <div class="w-full h-auto flex justify-center text-center">
        <p class="text-[#60697B] text-[23px] font-[500]">
          Be among the first to discover what it's all about.
        </p>
      </div>
    </div>

    <form class="flex flex-col w-full max-w-4xl mx-auto gap-y-5">
      <!-- Full Name -->
      <div class="relative w-full">
        <input
          v-model="FullName"
          type="text"
          id="fullName"
          placeholder=" "
          class="peer w-full border rounded-xl px-4 pt-6 pb-2 text-base text-black placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
        <label
          for="fullName"
          class="absolute left-4 top-2 text-sm text-gray-500 transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-500"
        >
          Full Name <span class="text-red-500">*</span>
        </label>
      </div>

      <!-- Company Name -->
      <div class="relative w-full">
        <input
          v-model="CompanyName"
          type="text"
          id="companyName"
          placeholder=" "
          class="peer w-full border rounded-xl px-4 pt-6 pb-2 text-base text-black placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
        <label
          for="companyName"
          class="absolute left-4 top-2 text-sm text-gray-500 transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-500"
        >
          Company Name <span class="text-red-500">*</span>
        </label>
      </div>

      <!-- Email -->
      <div class="relative w-full">
        <input
          v-model="Email"
          type="email"
          id="email"
          placeholder=" "
          class="peer w-full border rounded-xl px-4 pt-6 pb-2 text-base text-black placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
        <label
          for="email"
          class="absolute left-4 top-2 text-sm text-gray-500 transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-500"
        >
          Email <span class="text-red-500">*</span>
        </label>
      </div>

      <!-- Phone Number -->
      <div class="relative w-full">
        <input
          v-model="PhoneNumber"
          type="number"
          id="phoneNumber"
          placeholder=" "
          class="peer w-full border rounded-xl px-4 pt-6 pb-2 text-base text-black placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
        <label
          for="phoneNumber"
          class="absolute left-4 top-2 text-sm text-gray-500 transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-500"
        >
          Phone Number <span class="text-red-500">*</span>
        </label>
      </div>

      <!-- Country -->
      <div class="relative w-full">
        <select
          v-model="country"
          class="w-full border rounded-xl px-4 py-3 text-base text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 appearance-none"
        >
          <option value="" disabled selected>Select Country</option>
          <option v-for="(item, index) in countries" :key="index" :value="item">
            {{ item }}
          </option>
        </select>
      </div>
    </form>
  </div>
</template>
