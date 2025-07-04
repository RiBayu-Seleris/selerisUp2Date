<script setup>
defineProps({ image: String });
</script>

<template>
  <div
    class="flex w-[40%] h-[80px] rounded-2xl shadow-md border-[0.1px] border-[#e0e4eb]"
  >
    <div class="w-full h-full">
      <img :src="image" alt="partner" class="w-full h-full object-contain" />
    </div>
  </div>
</template>
