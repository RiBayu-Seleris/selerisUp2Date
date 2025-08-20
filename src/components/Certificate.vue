<script setup>
import CertCard from "@/components/reusable/CertCard.vue";
import MobileCert from "@/components/CertificateMobile.vue";

import { certificateData } from "@/Data/certData";
</script>

<template>
  <div class="w-full h-auto lg:px-8">
    <div class="flex flex-col w-full h-auto">
      <!-- Heading -->
      <div class="flex flex-col w-full items-center text-center">
        <p
          class="text-[24px] sm:text-[30px] md:text-[36px] lg:text-[44px] xl:text-[48px] font-medium text-[#195279] dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-br dark:from-[#FAFAFA] dark:via-[#D4D4D4] dark:to-[#AAAAAA]"
        >
          Seleris Certification
        </p>
        <p
          class="text-[14px] sm:text-[16px] md:text-[20px] lg:text-2xl xl:text-[22px] font-normal tracking-wide text-[#1DC457] dark:text-[#6A6A6A] sm:mt-2 lg:mt-4"
        >
          Seleris Meditekno Internasional
        </p>
      </div>

      <!-- Desktop Certificate Cards -->
      <!-- class="hidden lg:flex flex-row w-full max-w-[1440px] mx-auto gap-x-16 mt-8 mb-12 justify-center" -->
      <div
        class="hidden lg:flex flex-row w-full space-x-16 mt-16 justify-center"
      >
        <CertCard
          v-for="(cert, index) in certificateData"
          :key="index"
          :divImageBefore="cert.divImageBefore"
          :divImageAfter="cert.divImageAfter"
          :imageCertLogo="cert.logo"
          :TitleBefore="cert.titleBefore"
          :textPosition="cert.textPosition"
          :TitleAfter="cert.titleAfter"
          :CertNumber="cert.certNumber"
          :BodyText="cert.description"
        />
      </div>

      <!-- Mobile Certificate -->
      <MobileCert :certificates="certificateData" />
    </div>
  </div>
</template>

<style scoped>
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
.hide-scrollbar {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
