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
  <div class="flex relative w-full h-auto group justify-center">
    <!-- Card A (default) -->
    <div
      :class="`relative xl:w-[335px] xl:h-[419px] lg:h-[419px]  group-hover:opacity-0 bg-cover bg-center ${divImageBefore} `"
    >
      <div class="flex flex-col w-full h-auto xl:mt-14 lg:mt-14">
        <div
          class="flex w-full h-[180px] lg:h-[140px] xl:w-[149px] xl:h-[194px] justify-center mx-auto"
        >
          <img
            :src="imageCertLogo"
            alt="Cert Logo"
            class="w-full h-full object-contain object-center"
          />
        </div>
        <div
          class="flex w-full h-auto justify-center mt-6 px-10 lg:px-10 items-center text-center"
        >
          <p class="flex xl:text-[20px] lg:text-2xl font-normal text-[#195279]">
            {{ TitleBefore }}
          </p>
        </div>
      </div>
    </div>

    <!-- Card B (on hover) -->
    <div
      :class="`flex w-full xl:w-[335px] xl:h-[419px] lg:h-[419px] absolute inset-0 bg-cover bg-center opacity-0 group-hover:opacity-100 transition-opacity duration-1000 ease-in-out ${divImageAfter} xl:ml-7 2xl:ml-10`"
    >
      <div
        :class="`flex flex-col w-full h-full text-white xl:px-10 lg:px-6 2lg:px-10 xl:pt-12 lg:pt-10 lg:gap-y-1 2xl:gap-y-6 xl:gap-y-4 ${textPosition}`"
      >
        <p class="xl:text-[24px] lg:text-lg 2lg:text-[22px] font-semibold">
          {{ TitleAfter }}
        </p>
        <p class="xl:text-[14px] lg:text-base font-normal">
          Certificate Number: {{ CertNumber }}
        </p>
        <p class="xl:text-[12px] lg:text-sm">
          {{ BodyText }}
        </p>
      </div>
    </div>
  </div>
</template>
