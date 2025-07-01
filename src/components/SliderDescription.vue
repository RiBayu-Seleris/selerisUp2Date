<script setup>
import Logo from "@/assets/images/seleris-logo.svg";
</script>

<template>
  <div
    class="absolute w-auto inset-0 flex items-center justify-end opacity-0 group-hover:opacity-100 mr-[9rem] transition-opacity duration-300 z-[999]"
  >
    <!-- Tombol atau Konten -->
    <div class="flex w-[440px] h-[270px]">
      <div class="relative w-full h-full">
        <svg
          class="absolute inset-0 w-full h-full drop-shadow-md"
          viewBox="0 0 409 228"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M1 30.5731V197.292C1 213.624 14.2403 226.865 30.5731 226.865H378.427C394.76 226.865 408 213.624 408 197.292V79.3688C408 63.036 394.76 49.7956 378.427 49.7956H227.234C213.76 49.7956 202.837 38.8724 202.837 25.3978C202.837 11.9233 191.913 1 178.439 1H30.5731C14.2403 1 1 14.2403 1 30.5731Z"
            fill="#F9FAFB"
            stroke="#48C97C"
            stroke-width="0.739328"
          />
        </svg>
      </div>
      <div class="absolute flex flex-col pl-8 pr-10">
        <div class="">
          <img
            :src="Logo"
            alt="Logo"
            class="w-[128px] h-auto object-contain pt-6 pb-7 z-10 relative"
          />
        </div>
        <div class="text-start">
          Seleris is a technology company that develops a facial video-based
          life insurance underwriting application. The application allows
          insurance companies to assess the r...
        </div>
        <div class="flex flex-row text-start text-[#2AB857] mt-5 font-medium">
          <div>
            <span> View product </span>
          </div>
          <div class="ml-1 items-center justify-center self-center">
            <svg
              class="w-[1.1rem] h-[1.1rem]"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.43 18.07L20.5 12L14.43 5.92999"
                stroke="#2AB857"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M3.50002 12L20.33 12"
                stroke="#2AB857"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
