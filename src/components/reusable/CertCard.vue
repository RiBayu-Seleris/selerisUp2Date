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
  <div class="relative w-[335px] h-[419px] group">
    <!-- Card A -->
    <div
      :class="`absolute top-0 left-0 z-0 flex flex-col w-full h-full bg-cover bg-center ${divImageBefore}`"
    >
      <div class="flex flex-col w-full h-auto mt-14">
        <div class="flex w-full h-[194px] justify-center mx-auto">
          <img
            :src="imageCertLogo"
            alt="Cert Logo"
            class="w-full h-full object-contain object-center"
          />
        </div>
        <div class="flex w-full justify-center mt-6 px-10 text-center">
          <p
            class="text-[20px] font-normal text-[#195279] dark:text-[#FAFAFAFA]"
          >
            {{ TitleBefore }}
          </p>
        </div>
      </div>
    </div>

    <!-- Card B -->
    <div
      :class="`absolute top-0 left-0 z-0 flex flex-col w-full h-full bg-cover bg-center opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out ${divImageAfter}`"
    >
      <div
        :class="`flex flex-col w-full h-full text-white dark:text-[#3D3434] px-10 pt-12 gap-y-4 ${textPosition}`"
      >
        <p class="text-[24px] font-semibold">
          {{ TitleAfter }}
        </p>
        <p class="text-[14px] font-normal">
          Certificate Number: {{ CertNumber }}
        </p>
        <p class="text-[12px]">
          {{ BodyText }}
        </p>
      </div>
    </div>
  </div>
</template>
