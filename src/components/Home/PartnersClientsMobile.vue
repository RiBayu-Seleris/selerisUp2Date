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

// Gabungkan partner dan client, lalu filter agar tidak duplikat
const combinedLogos = Array.from(new Set([...partnerLogos, ...clientLogos]));
</script>

<template>
  <div class="w-full h-auto flex flex-col py-16">
    <div
      class="flex w-full h-auto justify-center items-center text-center pb-5"
    >
      <p class="text-2xl text-[#89A6BA] font-[500]">
        Seleris Partners & Clients
      </p>
    </div>
    <div class="marquee-track animation-row-1 whitespace-nowrap">
      <div class="flex gap-x-6 w-max">
        <template v-for="i in 2">
          <CardSlide
            v-for="(logo, index) in combinedLogos"
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
