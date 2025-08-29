<script setup>
import CertCard from "@/components/reusable/CertCard.vue";
import MobileCert from "@/components/CertificateMobile.vue";

import { certificateData } from "@/Data/certData";
</script>

<template>
  <div class="w-full h-auto">
    <div class="flex flex-col w-full h-auto">
      <!-- Heading -->
      <div class="flex flex-col w-full items-center text-center">
        <p
          class="text-[24px] sm:text-[30px] md:text-[32px] lg:text-[44px] xl:text-[48px] font-medium text-[#195279] dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-br dark:from-[#FAFAFA] dark:via-[#D4D4D4] dark:to-[#AAAAAA]"
        >
          Seleris Certification
        </p>
        <p
          class="text-[14px] sm:text-[16px] md:text-[18px] lg:text-2xl xl:text-[22px] font-normal tracking-wide text-[#1DC457] dark:text-[#6A6A6A] sm:mt-2 lg:mt-4"
        >
          Seleris Meditekno Internasional
        </p>
      </div>

      <!-- Desktop Certificate Cards -->
      <!-- class="hidden lg:flex flex-row w-full max-w-[1440px] mx-auto gap-x-16 mt-8 mb-12 justify-center" -->
      <div class="relative w-full h-auto">
        <div
          class="hidden xl:flex absolute w-32 h-full bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FAFAFA]/0 to-60% dark:bg-gradient-to-r dark:from-[#17181A] dark:from-0% dark:to-[#17181A]/0 dark:to-60% left-0 z-20"
        />
        <div
          class="hidden xl:flex absolute w-32 h-full bg-gradient-to-l from-[#FAFAFA] from-0% to-[#FAFAFA]/0 to-60% dark:bg-gradient-to-l dark:from-[#17181A] dark:from-0% dark:to-[#17181A]/0 dark:to-60% right-0 z-20"
        />
        <div
          class="relative hidden lg:flex flex-row w-full space-x-6 mt-16 overflow-x-auto snap-x snap-mandatory scroll-pl-16 pl-16 pr-16 hide-scrollbar hide-scrollbar hide-scrollbar"
        >
          <CertCard
            v-for="(cert, index) in certificateData"
            :key="index"
            :imageCertLogo="cert.logo"
            :TitleBefore="cert.titleBefore"
            :subtitleBefore="cert.subtitleBefore"
            :textPosition="cert.textPosition"
            :TitleAfter="cert.titleAfter"
            :CertNumber="cert.certNumber"
            :BodyText="cert.description"
          />
        </div>
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
