<script setup>
import { ref } from "vue";

const props = defineProps({
  image: {
    type: String,
    required: true,
  },
});

const card = ref(null);
const transformStyle = ref("perspective(1000px)");

function handleMouseMove(e) {
  if (!card.value) return;

  const cardRect = card.value.getBoundingClientRect();
  const centerX = cardRect.left + cardRect.width / 2;
  const centerY = cardRect.top + cardRect.height / 2;

  const deltaX = e.clientX - centerX;
  const deltaY = e.clientY - centerY;

  const rotateX = (-deltaY / 20).toFixed(2);
  const rotateY = (deltaX / 20).toFixed(2);

  transformStyle.value = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
}

function resetTransform() {
  transformStyle.value = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
}
</script>

<template>
  <div
    ref="card"
    class="animated-border-wrapper group w-[222px] h-[80px] p-[1px] rounded-xl transition-all duration-300 ease-out"
    @mousemove="handleMouseMove"
    @mouseleave="resetTransform"
    :style="{ transform: transformStyle }"
  >
    <div
      class="flex w-full h-full rounded-xl transition-transform duration-300 ease-out justify-center items-center bg-[#F9FAFB] hover:bg-white dark:bg-[#1D1F23] dark:border-[#FAFAFA]/25"
    >
      <div class="flex w-full h-full justify-center items-center">
        <img
          :src="image"
          alt="partner logo"
          class="w-[200px] h-full object-contain filter grayscale group-hover:filter-none transition duration-300"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
@property --angle {
  syntax: "<angle>";
  initial-value: 0deg;
  inherits: false;
}

@keyframes spin-border {
  to {
    --angle: 360deg;
  }
}

.animated-border-wrapper {
  background: #d9d9d9;
}

.dark .animated-border-wrapper {
  background: linear-gradient(135deg, #17181a 45%, #565656);
}

/* Dark mode hover: baru animasi aktif */
.dark .animated-border-wrapper:hover {
  background: conic-gradient(
    from calc(15deg + var(--angle)),
    #17181a 0%,
    #565656 40%,
    #888888 55%,
    #565656 70%,
    #17181a 100%
  ) !important;
  animation: spin-border 5s linear infinite;
}
</style>
