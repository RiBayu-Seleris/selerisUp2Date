<script setup>
import CertCard from "@/components/reusable/CertCard.vue";
import MobileCert from "@/components/CertificateMobile.vue";

import CloseIcon from "@/components/icons/CloseIcon.vue";

import { certificateData } from "@/Data/certData";
import { ref, watch } from "vue";

const isModalOpen = ref(false);
const selectedCert = ref(null);

const openModal = (cert) => {
  selectedCert.value = cert;
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

watch(isModalOpen, (open) => {
  if (open) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
});
</script>

<template>
  <div class="relative w-full h-auto">
    <div class="flex flex-col w-full h-auto dark:bg-[#17181A]">
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
          class="relative hidden lg:flex flex-row w-full space-x-6 mt-16 overflow-x-auto snap-x snap-mandatory pl-10 pr-10 xl:pl-16 xl:pr-16 hide-scrollbar"
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
            @readmore="openModal(cert)"
          />
        </div>
        <!-- Modal -->
        <transition name="fade">
          <div
            v-if="isModalOpen"
            class="fixed inset-0 z-50 flex flex-col transition-all duration-300 overflow-hidden bg-[#1C1B1B]/80"
          >
            <transition name="slide">
              <div class="ml-auto w-full h-full p-20 z-50">
                <div
                  class="w-full h-auto bg-white dark:bg-[#17181A] relative z-50 flex flex-col items-center rounded-3xl"
                >
                  <div
                    @click="closeModal"
                    class="w-auto h-auto absolute top-6 right-6 bg-[#94FBB5] rounded-full text-[#2AB857] cursor-pointer"
                  >
                    <CloseIcon class="w-auto h-[40px]" />
                  </div>
                  <div class="w-full h-auto py-8">
                    <div class="w-full h-auto px-20">
                      <p
                        class="text-[20px] font-[600] text-[#195279] dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-br dark:from-[#FAFAFA] dark:via-[#D4D4D4] dark:to-[#AAAAAA]"
                      >
                        {{ selectedCert?.description }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </transition>
          </div>
        </transition>
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
}

.slide-enter-to,
.slide-leave-from {
  opacity: 1;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease-in-out;
}

.slide-enter-from {
  transform: translateY(-100%);
}

.slide-enter-to {
  transform: translateY(0%);
}

.slide-leave-from {
  transform: translateY(0%);
}

.slide-leave-to {
  transform: translateY(-100%);
}
</style>
