<script setup>
import CardSlide from "@/components/reusable/CardSlide.vue";

const partnerLogos = [
  new URL("@/assets/images/clients-and-partners/rynest.png", import.meta.url)
    .href,
  new URL("@/assets/images/clients-and-partners/boa.png", import.meta.url).href,
  new URL("@/assets/images/clients-and-partners/grm.png", import.meta.url).href,
  new URL("@/assets/images/clients-and-partners/cc.png", import.meta.url).href,
  new URL("@/assets/images/clients-and-partners/bc.png", import.meta.url).href,
  new URL("@/assets/images/clients-and-partners/dsc.png", import.meta.url).href,
  new URL("@/assets/images/clients-and-partners/hunting.png", import.meta.url)
    .href,
  new URL(
    "@/assets/images/clients-and-partners/math-faculty.png",
    import.meta.url
  ).href,
  new URL("@/assets/images/clients-and-partners/data-ai.png", import.meta.url)
    .href,
];

const clientLogos = [
  new URL("@/assets/images/clients-and-partners/boa.png", import.meta.url).href,
  new URL("@/assets/images/clients-and-partners/grm.png", import.meta.url).href,
  new URL("@/assets/images/clients-and-partners/chubb.png", import.meta.url)
    .href,
  new URL("@/assets/images/clients-and-partners/fpg.png", import.meta.url).href,
  new URL("@/assets/images/clients-and-partners/heksa.png", import.meta.url)
    .href,
  new URL(
    "@/assets/images/clients-and-partners/jamkrida-banten.png",
    import.meta.url
  ).href,
  new URL("@/assets/images/clients-and-partners/nexus.png", import.meta.url)
    .href,
];

const partnerLogosDark = [
  new URL(
    "@/assets/images/clients-and-partners/rynest-dark.png",
    import.meta.url
  ).href,
  new URL("@/assets/images/clients-and-partners/boa-dark.png", import.meta.url)
    .href,
  new URL("@/assets/images/clients-and-partners/grm-dark.png", import.meta.url)
    .href,
  new URL("@/assets/images/clients-and-partners/cc-dark.png", import.meta.url)
    .href,
  new URL("@/assets/images/clients-and-partners/bc-dark.png", import.meta.url)
    .href,
  new URL("@/assets/images/clients-and-partners/dsc-dark.png", import.meta.url)
    .href,
  new URL(
    "@/assets/images/clients-and-partners/hunting-dark.png",
    import.meta.url
  ).href,
  new URL(
    "@/assets/images/clients-and-partners/math-faculty-dark.png",
    import.meta.url
  ).href,
  new URL(
    "@/assets/images/clients-and-partners/data-ai-dark.png",
    import.meta.url
  ).href,
];

const clientLogosDark = [
  new URL("@/assets/images/clients-and-partners/boa-dark.png", import.meta.url)
    .href,
  new URL("@/assets/images/clients-and-partners/grm-dark.png", import.meta.url)
    .href,
  new URL(
    "@/assets/images/clients-and-partners/chubb-dark.png",
    import.meta.url
  ).href,
  new URL("@/assets/images/clients-and-partners/fpg-dark.png", import.meta.url)
    .href,
  new URL(
    "@/assets/images/clients-and-partners/heksa-dark.png",
    import.meta.url
  ).href,
  new URL(
    "@/assets/images/clients-and-partners/jamkrida-banten-dark.png",
    import.meta.url
  ).href,
  new URL(
    "@/assets/images/clients-and-partners/nexus-dark.png",
    import.meta.url
  ).href,
];

// Gabungkan partner dan client, lalu filter agar tidak duplikat
const combinedLogos = Array.from(new Set([...partnerLogos, ...clientLogos]));
const combinedLogosDark = Array.from(
  new Set([...partnerLogosDark, ...clientLogosDark])
);
</script>

<template>
  <div class="w-full h-auto flex flex-col py-14 sm:py-20 md:py-14">
    <div
      class="flex w-full h-auto justify-center items-center text-center pb-5"
    >
      <p
        class="text-[18px] sm:text-[24px] text-[#89A6BA] dark:text-[#6A6A6A] font-[400]"
      >
        Seleris Partners & Clients
      </p>
    </div>
    <div class="marquee-track animation-row-1 whitespace-nowrap">
      <div class="flex gap-x-6 w-max dark:hidden">
        <template v-for="i in 2">
          <CardSlide
            v-for="(logo, index) in combinedLogos"
            :key="`combined-${i}-${index}`"
            :image="logo"
          />
        </template>
      </div>
      <div class="dark:flex gap-x-6 w-max hidden">
        <template v-for="i in 2">
          <CardSlide
            v-for="(logo, index) in combinedLogosDark"
            :key="`combined-${i}-${index}`"
            :image="logo"
          />
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>
.marquee-track {
  display: flex;
  width: fit-content;
  white-space: nowrap;
}

.animation-row-1 {
  animation: marquee-left 60s linear infinite;
}

@keyframes marquee-left {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-50%);
  }
}
</style>
