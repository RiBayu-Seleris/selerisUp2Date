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
      :class="`w-full h-[500px] group-hover:opacity-0 bg-cover bg-center ${divImageBefore} `"
    >
      <div class="flex flex-col w-full h-auto mt-20">
        <div class="flex w-full h-[180px]">
          <img
            :src="imageCertLogo"
            alt="Cert Logo"
            class="w-full h-full object-contain object-center"
          />
        </div>
        <div
          class="flex w-full h-auto justify-center mt-10 px-16 items-center text-center"
        >
          <p class="text-3xl font-normal text-[#195279]">{{ TitleBefore }}</p>
        </div>
      </div>
    </div>

    <!-- Card B (on hover) -->
    <div
      :class="`w-full h-[500px] absolute inset-0 bg-cover bg-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out ${divImageAfter} `"
    >
      <div
        :class="`flex flex-col w-full h-full text-white px-16 pt-12 gap-y-4 ${textPosition}`"
      >
        <p class="text-2xl font-semibold">{{ TitleAfter }}</p>
        <p class="text-xl font-normal">Certificate Number: {{ CertNumber }}</p>
        <p class="text-base">
          {{ BodyText }}
        </p>
      </div>
    </div>
  </div>
</template>
