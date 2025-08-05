<script setup>
import CertCard from "@/components/reusable/CertCard.vue";
import MobileCert from "@/components/CertificateMobile.vue";
import Cert1 from "@/assets/images/certification/logo/Cert1.png";
import Cert2 from "@/assets/images/certification/logo/dscui.svg";
import Cert3 from "@/assets/images/certification/logo/Cert2.png";

const certificateData = [
  {
    logo: Cert1,
    titleBefore: "ISO Certification Award",
    titleAfter: "ISO Certification",
    certNumber: 2403150020501,
    description: `PT. Seleris Meditekno Internasional has been awarded ISO/IEC 27001:2022 certification with the number 2403150020501, which demonstrates our commitment to healthcare quality and service excellence. This certification signifies that we meet international standards in quality management, and we continuously strive to improve our service quality.`,
    divImageBefore: "bg-leftCertBefore dark:bg-leftCertDarkBefore",
    divImageAfter: "bg-leftCertAfter dark:bg-leftCertDarkAfter",
    textPosition: "text-start",
  },
  {
    logo: Cert2,
    titleBefore: "Best Innovation AI Solution for Insurance",
    titleAfter: "ISO Certification",
    certNumber: 2204210020100,
    description: `We received the Best Innovation AI Solution for Insurance, proving our dedication to cutting-edge AI implementation in health & insurance. This accolade reflects our drive to revolutionize healthcare access through smart technology.`,
    divImageBefore: "bg-centerCertBefore dark:bg-centerCertDarkBefore",
    divImageAfter: "bg-centerCertAfter dark:bg-centerCertDarkAfter",
    textPosition: "text-center",
  },
  {
    logo: Cert3,
    titleBefore: "ISO Certification Award",
    titleAfter: "ISO Certification",
    certNumber: 2403290020101,
    description: `PT. Seleris Meditekno Internasional has been awarded ISO 9001:2015 certification with the number , this certificate signifies that our Quality Management System meets stringent international standards, ensuring our products and services are consistent and reliable.`,
    divImageBefore: "bg-rightCertBefore dark:bg-rightCertDarkBefore",
    divImageAfter: "bg-rightCertAfter dark:bg-rightCertDarkAfter",
    textPosition: "text-end",
  },
];
</script>

<template>
  <div class="w-full h-auto py-10 xl:px-16 lg:px-8 px-4 sml:px-0">
    <div class="flex flex-col w-full h-auto max-w-[1440px] mx-auto">
      <!-- Heading -->
      <div class="flex flex-col w-full items-center text-center">
        <p
          class="text-3xl md:text-4xl lg:text-5xl xl:text-[48px] font-medium text-[#195279] dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-br dark:from-[#FAFAFA] dark:via-[#D4D4D4] dark:to-[#AAAAAA]"
        >
          Seleris Certification
        </p>
        <p
          class="text-lg md:text-xl lg:text-2xl xl:text-[22px] font-normal tracking-wide text-[#1DC457] dark:text-[#6A6A6A] mt-2 lg:mt-4"
        >
          Seleris Meditekno Internasional
        </p>
      </div>

      <!-- Desktop Certificate Cards -->
      <div
        class="hidden lg:flex flex-row w-full max-w-[1440px] mx-auto gap-x-16 mt-8 mb-12 justify-center"
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
