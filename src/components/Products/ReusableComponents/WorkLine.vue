<script setup>
import { onMounted, ref } from "vue";

const props = defineProps({
  circleColor: {
    type: String,
  },
  textcolor: {
    type: String,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  isLast: {
    type: Boolean,
    default: false,
  },
  index: {
    type: Number,
    default: 0,
  },
});

const showContent = ref(false);

onMounted(() => {
  // ✅ Kalau ini item pertama (index 0), tampilkan otomatis
  if (props.index === 0) {
    showContent.value = true;
  }
});

const toggleContent = () => {
  // Kalau bukan index 0, baru toggle
  // if (props.index !== 0) {
  showContent.value = !showContent.value;
  // }
};
</script>

<template>
  <div class="w-auto h-auto flex items-center">
    <div class="relative flex flex-row w-auto h-full">
      <div class="absolute w-full h-1/2 bottom-[0px] justify-center flex pt-8">
        <transition name="fade">
          <div
            class="relative w-full h-full md:w-auto md:h-auto"
            v-if="showContent"
          >
            <slot />
            <!-- INI FRAME DIBAWAH LINGKARAN -->
            <div
              class="absolute w-full h-full top-0 flex flex-col justify-center items-center px-8 gap-y-2.5 lg:gap-y-2 pt-5 sm:pt-9 md:pt-3 lg:pt-8"
            >
              <div
                class="w-full h-[15px] sm:h-[15px] md:h-[20px] lg:h-[35px] flex justify-center items-start"
              >
                <p
                  :class="[
                    `${textcolor} text-center text-[12px] md:text-[16px] lg:text-[22px] `,
                  ]"
                >
                  {{ title }}
                </p>
              </div>
              <div class="w-full h-[50px] flex justify-center">
                <p
                  class="text-center text-[10px] md:text-[14px] lg:text-[18px] text-[#6F6F6F]"
                >
                  {{ description }}
                </p>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <!-- LineStart -->
      <div class="w-[90px] md:w-36 lg:w-44 h-auto flex items-center">
        <div class="w-full h-[2.5px] bg-[#868686] rounded-full" />
      </div>
      <!-- Circle -->
      <div
        class="relative w-auto h-auto rounded-full flex items-center"
        @click="toggleContent"
      >
        <div
          :class="[
            `w-6 h-6 sm:w-8 sm:h-8 lg:w-12 lg:h-12 p-2 rounded-full ${circleColor} cursor-pointer`,
          ]"
        >
          <div
            class="w-full h-full rounded-full transition-all duration-500 ease-in-out"
            :class="
              showContent
                ? 'bg-white scale-110 shadow-[0_0_20px_rgba(255,255,255,0.8)]'
                : 'bg-transparent scale-100 opacity-70'
            "
          />
        </div>
      </div>
      <!-- LineEnd -->
      <div class="w-[90px] md:w-36 lg:w-44 h-auto flex items-center">
        <div
          v-if="!isLast"
          class="w-full h-[2.5px] bg-[#868686] rounded-full"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
