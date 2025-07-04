<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from "vue";
import CardTilt from "@/components/reusable/CardTilt.vue";

const showPartners = ref(true);
const intervalTime = 5000;
const progress = ref(0);
const isHovered = ref(false);
let progressInterval = null;

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

function chunkArray(array, size) {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}

const columnsPerRow = 5;
const partnerChunks = computed(() => chunkArray(partnerLogos, columnsPerRow));
const clientChunks = computed(() => chunkArray(clientLogos, columnsPerRow));

const startProgress = () => {
  const step = 100 / (intervalTime / 100); // 100ms update
  progressInterval = setInterval(() => {
    if (!isHovered.value) {
      progress.value += step;
      if (progress.value >= 100) {
        progress.value = 0;
        showPartners.value = !showPartners.value;
      }
    }
  }, 100);
};

const stopProgress = () => {
  clearInterval(progressInterval);
};

onMounted(() => {
  startProgress();
});

onBeforeUnmount(() => {
  stopProgress();
});
</script>

<template>
  <div class="flex flex-col relative w-full px-12 py-10">
    <!-- Title -->
    <div class="text-center mb-4">
      <div
        class="inline-flex gap-2 items-end relative text-2xl font-semibold text-[#89A6BA]"
      >
        <span>SELERIS</span>
        <div class="relative">
          <span
            class="cursor-pointer transition-colors"
            :class="showPartners ? 'text-[#2AB857]' : 'text-[#89A6BA]'"
          >
            Partners
          </span>
          <!-- Progress bar under Partners -->
          <div
            v-if="showPartners"
            class="absolute left-0 -bottom-1 w-full h-1 bg-gray-300 rounded overflow-hidden"
          >
            <div
              class="h-full bg-[#2AB857] transition-all duration-100"
              :style="{ width: progress + '%' }"
            ></div>
          </div>
        </div>
        <span>&</span>
        <div class="relative">
          <span
            class="cursor-pointer transition-colors"
            :class="!showPartners ? 'text-[#2AB857]' : 'text-[#89A6BA]'"
          >
            Clients
          </span>
          <!-- Progress bar under Clients -->
          <div
            v-if="!showPartners"
            class="absolute left-0 -bottom-1 w-full h-1 bg-gray-300 rounded overflow-hidden"
          >
            <div
              class="h-full bg-[#2AB857] transition-all duration-100"
              :style="{ width: progress + '%' }"
            ></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Content Grid -->
    <transition name="fade" mode="out-in">
      <div :key="showPartners" class="flex flex-col items-center gap-6">
        <template v-if="showPartners">
          <div
            v-for="(row, rowIndex) in partnerChunks"
            :key="'row-' + rowIndex"
            class="grid gap-6"
            :class="[
              row.length === 1
                ? 'grid-cols-1'
                : row.length === 2
                ? 'grid-cols-2'
                : row.length === 3
                ? 'grid-cols-3'
                : row.length === 4
                ? 'grid-cols-4'
                : 'grid-cols-5',
              row.length < columnsPerRow ? 'justify-center' : '',
              rowIndex === 1 ? 'px-24' : '',
            ]"
          >
            <div
              v-for="(logo, index) in row"
              :key="`${rowIndex}-${index}`"
              class="flex items-center justify-center"
            >
              <CardTilt
                :image="logo"
                @mouseenter="isHovered = true"
                @mouseleave="isHovered = false"
              />
            </div>
          </div>
        </template>

        <template v-else>
          <div
            v-for="(row, rowIndex) in clientChunks"
            :key="'client-row-' + rowIndex"
            class="grid gap-6"
            :class="[
              row.length === 1
                ? 'grid-cols-1'
                : row.length === 2
                ? 'grid-cols-2'
                : row.length === 3
                ? 'grid-cols-3'
                : row.length === 4
                ? 'grid-cols-4'
                : 'grid-cols-5',
              row.length < columnsPerRow ? 'justify-center' : '',
            ]"
          >
            <div
              v-for="(logo, index) in row"
              :key="`${rowIndex}-${index}`"
              class="flex items-center justify-center"
            >
              <CardTilt
                :image="logo"
                @mouseenter="isHovered = true"
                @mouseleave="isHovered = false"
              />
            </div>
          </div>
        </template>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
