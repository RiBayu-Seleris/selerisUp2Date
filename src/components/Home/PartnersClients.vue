<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from "vue";
import CardTilt from "@/components/reusable/CardTilt.vue";
import {
  partnerLogos,
  partnerLogosDark,
} from "@/Data/Partners-Clients/PartnerList.js";
import {
  clientLogos,
  clientLogosDark,
} from "@/Data/Partners-Clients/ClientList.js";

const showPartners = ref(true);
const intervalTime = 3000;
const progress = ref(0);
const isHovered = ref(false);
let progressInterval = null;

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

const partnerChunksDark = computed(() =>
  chunkArray(partnerLogosDark, columnsPerRow),
);
const clientChunksDark = computed(() =>
  chunkArray(clientLogosDark, columnsPerRow),
);

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
  <div class="flex flex-col relative w-full px-12 py-10 dark:bg-[#17181A]">
    <!-- Title -->
    <div class="text-center mb-4">
      <div
        class="inline-flex gap-2 items-end relative text-[20px] font-[400] text-[#89A6BA] dark:text-[#6A6A6A]"
      >
        <span>Seleris</span>
        <div class="relative">
          <span
            class="cursor-pointer transition-colors"
            @click="
              showPartners = true;
              progress = 0;
            "
            :class="
              showPartners
                ? 'text-[#2AB857] dark:text-[#FAFAFA]'
                : 'text-[#89A6BA] dark:text-[#6A6A6A]'
            "
          >
            Partners
          </span>
        </div>
        <span>&</span>
        <div class="relative">
          <span
            class="cursor-pointer transition-colors"
            @click="
              showPartners = false;
              progress = 0;
            "
            :class="
              !showPartners
                ? 'text-[#2AB857] dark:text-[#FAFAFA]'
                : 'text-[#89A6BA] dark:text-[#6A6A6A]'
            "
          >
            Clients
          </span>
        </div>
      </div>
    </div>

    <!-- Content Grid Light -->
    <transition name="fade" mode="out-in" class="dark:hidden h-[200px]">
      <div :key="showPartners" class="flex flex-col items-center gap-6 mt-5">
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
            ]"
          >
            <!-- rowIndex === 1 ? 'px-24' : 'px-0', -->
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

    <!-- Content Grid Dark -->
    <transition name="fade" mode="out-in" class="hidden dark:flex h-[200px]">
      <div :key="showPartners" class="flex flex-col items-center gap-6 mt-5">
        <template v-if="showPartners">
          <div
            v-for="(row, rowIndex) in partnerChunksDark"
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
            v-for="(row, rowIndex) in clientChunksDark"
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
