<script setup>
import CertCard from "@/components/reusable/CertCard.vue";
import Cert1 from "@/assets/images/certification/logo/Cert1.png";
import Cert2 from "@/assets/images/certification/logo/dscui.svg";
import Cert3 from "@/assets/images/certification/logo/Cert1.png";
</script>

<template>
  <div class="w-full h-full lg:px-16">
    <div class="flex flex-col w-full h-auto">
      <div class="flex flex-col w-full h-auto">
        <div class="flex w-full justify-center items-center text-[#195279]">
          <p class="text-4xl lg:text-5xl font-semibold">
            Seleris Certification
          </p>
        </div>
        <div
          class="flex w-full justify-center items-center text-[#1DC457] mt-2 lg:mt-4"
        >
          <p class="text-lg lg:text-2xl font-semibold">
            Seleris Meditekno Internasional
          </p>
        </div>
      </div>

      <!-- Desktop -->
      <div class="hidden lg:flex flex-row w-full h-auto gap-x-10 mt-5 relative">
        <!-- :divImageAfter="bgLeftAfter" -->
        <CertCard
          :divImageBefore="'bg-leftCertBefore'"
          :divImageAfter="'bg-leftCertAfter'"
          :imageCertLogo="Cert1"
          :TitleBefore="'ISO Certification Award'"
          :textPosition="'text-start'"
          :TitleAfter="'ISO Certification'"
          :CertNumber="'2403150020501 '"
          :BodyText="`PT. Seleris Meditekno Internasional has been awarded ISO/IEC 27001:2022 
          certification with the number 2403150020501, which demonstrates our commitment to healthcare 
          quality and service excellence. This certification signifies that we meet international standards in quality management, 
          and we continuously strive to improve our service quality.`"
        />
        <CertCard
          :divImageBefore="'bg-centerCertBefore'"
          :divImageAfter="'bg-centerCertAfter'"
          :imageCertLogo="Cert2"
          :TitleBefore="'Best Innovation AI Solution for Insurance'"
          :textPosition="'text-center'"
          :TitleAfter="'ISO Certification'"
          :CertNumber="'2403150020501 '"
          :BodyText="`PT. Seleris Meditekno Internasional has been awarded ISO/IEC 27001:2022 
          certification with the number 2403150020501, which demonstrates our commitment to healthcare 
          quality and service excellence. This certification signifies that we meet international standards in quality management, 
          and we continuously strive to improve our service quality.`"
        />
        <CertCard
          :divImageBefore="'bg-rightCertBefore'"
          :divImageAfter="'bg-rightCertAfter'"
          :imageCertLogo="Cert3"
          :TitleBefore="'ISO Certification Award'"
          :textPosition="'text-end'"
          :TitleAfter="'ISO Certification'"
          :CertNumber="'2403150020501 '"
          :BodyText="`PT. Seleris Meditekno Internasional has been awarded ISO/IEC 27001:2022 
          certification with the number 2403150020501, which demonstrates our commitment to healthcare 
          quality and service excellence. This certification signifies that we meet international standards in quality management, 
          and we continuously strive to improve our service quality.`"
        />
      </div>

      <!-- Mobile Cert -->
      <div
        class="lg:hidden flex flex-row w-full max-h-screen gap-x-6 mt-5 lg:overscroll-none lg:overflow-x-hidden lg:snap-none lg:pr-0 lg:pl-0 lg:scroll-pl-0 overflow-x-auto snap-x snap-mandatory scroll-pl-6 pl-10 pr-10 hide-scrollbar"
      >
        <div
          class="snap-start shrink-0 w-[85%] h-[150px] bg-blue-500 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30 border border-gray-100"
        >
          Item 1
        </div>
        <div
          class="snap-start shrink-0 w-[85%] h-[150px] bg-green-300 rounded-lg"
        >
          Item 2
        </div>
        <div
          class="snap-start shrink-0 w-[85%] h-[150px] bg-blue-300 rounded-lg"
        >
          Item 3
        </div>
      </div>
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
