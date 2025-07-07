<script setup>
import DefaultLogo from "@/assets/images/certification/logo/Cert1.png";
import { computed } from "vue";
defineProps({
  divImageBefore: {
    type: String,
    required: true,
  },
  divImageAfter: {
    type: String,
    required: true,
  },
  imageCertLogo: {
    type: String,
    required: true,
    default: DefaultLogo,
  },
  TitleBefore: {
    type: String,
    required: true,
  },
  textPosition: {
    type: String,
    required: true,
  },
  TitleAfter: {
    type: String,
    required: true,
  },
  CertNumber: {
    type: Number,
    required: true,
  },
  BodyText: {
    type: String,
    required: true,
  },
});

const cekCertIcon = computed(() => {
  imageCertLogo ? imageCertLogo : DefaultLogo;
});
</script>

<template>
  <div class="flex relative w-full h-auto group">
    <!-- Card A (default) -->
    <div
      :class="`relative w-full xl:h-[500px] lg:h-[410px]  group-hover:opacity-0 bg-cover bg-center ${divImageBefore} `"
    >
      <div class="flex flex-col w-full h-auto xl:mt-20 lg:mt-14">
        <div class="flex w-full h-[180px] lg:h-[140px] xl:h-[180px]">
          <img
            :src="imageCertLogo"
            alt="Cert Logo"
            class="w-full h-full object-contain object-center"
          />
        </div>
        <div
          class="flex w-full h-auto justify-center mt-10 px-16 lg:px-10 items-center text-center"
        >
          <p class="flex xl:text-3xl lg:text-2xl font-normal text-[#195279]">
            {{ TitleBefore }}
          </p>
        </div>
      </div>
    </div>

    <!-- Card B (on hover) -->
    <div
      :class="`w-full xl:h-[500px] lg:h-[410px]  absolute inset-0 bg-cover bg-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out ${divImageAfter} `"
    >
      <div
        :class="`flex flex-col w-full h-full text-white xl:px-10 lg:px-6 xl:pt-12 lg:pt-10 lg:gap-y-1 xl:gap-y-4 ${textPosition}`"
      >
        <p class="xl:text-2xl lg:text-lg font-semibold">{{ TitleAfter }}</p>
        <p class="xl:text-xl lg:text-base font-normal">
          Certificate Number: {{ CertNumber }}
        </p>
        <p class="xl:text-base lg:text-sm">
          {{ BodyText }}
        </p>
      </div>
    </div>
  </div>
</template>
