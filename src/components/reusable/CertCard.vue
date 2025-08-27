<script setup>
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
    type: String,
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
  <!-- <div class="relative w-[335px] h-[419px] group cursor-default"> -->
  <div
    class="snap-start shrink-0 relative w-[335px] h-[419px] group cursor-default"
  >
    <!-- Card A -->

    <div
      :class="`absolute top-0 left-0 z-0 flex flex-col w-full h-full bg-cover bg-center bg-no-repeat bg-centerCertBefore dark:bg-centerCertDarkBefore`"
    >
      <div class="flex flex-col w-full h-auto mt-14">
        <div class="flex w-[180px] h-[194px] justify-center mx-auto">
          <img
            :src="`/assets/images/certificate-icon/${imageCertLogo}`"
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
      :class="`absolute top-0 left-0 z-0 flex flex-col w-full h-full bg-cover bg-no-repeat bg-center opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out bg-centerCertAfter dark:bg-centerCertDarkAfter`"
    >
      <div
        :class="`flex flex-col w-full h-full text-white dark:text-[#3D3434] px-6 xl:px-10 pt-12 gap-y-4 text-center`"
      >
        <p class="text-[19px] font-semibold leading-tight">
          {{ TitleAfter }}
        </p>
        <p class="text-[14px] font-normal">{{ CertNumber }}</p>
        <p class="text-[12px]">{{ BodyText }}</p>
      </div>
    </div>
  </div>
</template>
