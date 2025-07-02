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
    class="flex w-full h-[120px] rounded-2xl shadow-md border-[0.1px] border-[#e0e4eb] transition-transform duration-300 ease-out hover:bg-white"
    @mousemove="handleMouseMove"
    @mouseleave="resetTransform"
    :style="{ transform: transformStyle }"
  >
    <div class="w-full h-full">
      <img :src="image" alt="partners" class="w-full h-full object-contain" />
    </div>
  </div>
</template>
