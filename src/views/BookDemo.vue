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
  <div class="grid grid-cols-2 px-8 pt-28">
    <div
      class="relative flex flex-col w-full h-auto items-center border-2 px-10 py-10"
    >
      <div class="w-full h-auto flex flex-col mb-10 space-y-4">
        <div class="w-full h-auto flex">
          <p class="text-[27px] text-[#195279] font-[600] leading-[60px]">
            Let's Seleris Together
          </p>
        </div>
        <div class="w-full h-auto flex">
          <p class="text-[#6E6E6E] text-[17px] font-[500]">
            Join leading AI teams accelerating their ML development with Scale.
            Book a 1:1 demo with us to get started.
          </p>
        </div>
      </div>
      <form class="flex flex-col w-full max-w-4xl mx-auto gap-y-5">
        <!-- Full Name -->
        <div class="flex flex-col w-full lg:mb-3 xl:mb-4">
          <div class="w-full mb-2">
            <p class="text-[14px] font-[500] dark:text-[#6F6F6F]">Full Name:</p>
          </div>
          <div class="w-full">
            <input
              type="text"
              class="w-full p-2 rounded-[8px] border-gray-300 placeholder-[6F6F6F] dark:bg-[#323232] border-[0.1px] dark:border-[#FAFAFA]/25 focus:outline-none focus:ring-1 focus:ring-[#2AB857] dark:focus:border-none"
              placeholder="Full Name"
            />
          </div>
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
            <option
              v-for="(item, index) in countries"
              :key="index"
              :value="item"
            >
              {{ item }}
            </option>
          </select>
        </div>
      </form>
    </div>
  </div>
</template>
