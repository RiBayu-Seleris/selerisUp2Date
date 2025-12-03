<template>
  <div class="w-full flex justify-center mt-20">
    <div ref="container" style="width: 300px; height: 300px"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import lottie from "lottie-web";

// 📌 Import JSON Anda langsung
// Pastikan file ada di: src/assets/myAnimation.json
import myAnimation from "@/assets/videos/videojson.json";

const container = ref(null);

onMounted(() => {
  lottie.loadAnimation({
    container: container.value, // elemen target
    renderer: "svg",
    loop: true,
    autoplay: true,
    animationData: myAnimation, // langsung pakai data JSON
  });
});
</script>

<style scoped>
/* opsional */
</style>
