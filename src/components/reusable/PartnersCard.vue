<script setup>
defineProps({
  image: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="flex w-full h-[120px] bg-white rounded-lg shadow-2xl">
    <div class="w-full h-full p-8">
      <img :src="image" alt="partners" class="w-full h-full object-contain" />
    </div>
  </div>
</template>
