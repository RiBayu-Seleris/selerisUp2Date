<script setup>
import { computed } from "vue";
const props = defineProps({
  divImageBefore: {
    type: String,
  },
  divImageAfter: {
    type: String,
  },
  imageCertLogo: {
    type: String,
  },
  TitleBefore: {
    type: String,
  },
  subtitleBefore: {
    type: String,
  },
  subsubtitleBefore: {
    type: String,
  },
  textPosition: {
    type: String,
  },
  TitleAfter: {
    type: String,
  },
  CertNumber: {
    type: String,
  },
  BodyText: {
    type: String,
  },
  maxLength: {
    type: Number,
    default: 300,
  },
});

const emit = defineEmits(["readmore"]);

const showReadMore = computed(() => props.BodyText.length > props.maxLength);
const shortText = computed(() => {
  return props.BodyText.length > props.maxLength
    ? props.BodyText.substring(0, props.maxLength) + "..."
    : props.BodyText;
});
</script>

<template>
  <!-- <div class="relative w-[335px] h-[419px] group cursor-default"> -->
  <div
    class="snap-center shrink-0 relative w-[335px] h-[419px] group cursor-default"
  >
    <!-- Card A -->

    <div
      :class="`absolute top-0 left-0 z-0 flex flex-col w-full h-full bg-cover bg-center bg-no-repeat bg-centerCertBefore dark:bg-centerCertDarkBefore`"
    >
      <div class="flex flex-col w-full h-auto mt-20">
        <div class="flex w-[180px] h-[150px] justify-center mx-auto">
          <img
            :src="`/assets/images/certificate-icon/${imageCertLogo}`"
            alt="Cert Logo"
            class="w-full h-full object-contain object-center"
          />
        </div>
        <div class="flex flex-col w-full justify-center mt-6 px-10 text-center">
          <p
            class="text-[20px] font-normal text-[#195279] dark:text-[#FAFAFAFA]"
          >
            {{ TitleBefore }}
          </p>
          <p
            class="text-[16px] font-normal text-[#195279] dark:text-[#FAFAFAFA] leading-normal"
          >
            {{ subtitleBefore }}
          </p>
        </div>
      </div>
    </div>
    <!-- Card B -->
    <div
      :class="`absolute top-0 left-0 z-0 flex flex-col w-full h-full bg-cover bg-no-repeat bg-center opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out bg-centerCertAfter dark:bg-centerCertDarkAfter`"
    >
      <div
        :class="`flex flex-col w-full h-full text-white dark:text-[#3D3434] px-6 xl:px-10 pt-12 gap-y-2 text-center`"
      >
        <p
          class="text-[19px] h-[50px] flex items-center justify-center font-semibold leading-tight"
        >
          {{ TitleAfter }}
        </p>
        <p
          class="text-[16px] h-[60px] flex items-start justify-center font-normal whitespace-pre-line"
        >
          {{ CertNumber }}
        </p>
        <!-- <p class="text-[12px]">{{ BodyText }}</p> -->
        <p class="text-[12px]">
          {{ shortText }}
          <button
            aria-label="Readmore"
            v-if="showReadMore"
            @click="emit('readmore')"
            class="font-bold hover:underline"
          >
            Read More
          </button>
        </p>
      </div>
    </div>
  </div>
</template>
