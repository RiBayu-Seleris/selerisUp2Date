<script setup>
defineProps({ image: String });
</script>

<template>
  <!-- <div
    class="w-[160px] h-[120px] rounded-lg bg-white shadow-lg p-4 flex items-center justify-center"
  >
    <img :src="image" alt="partner" class="w-full h-full object-contain" />
  </div> -->

  <div
    class="flex w-[40%] h-[120px] rounded-2xl shadow-2xl border-[0.1px] border-[#e0e4eb]"
  >
    <div class="w-full h-full p-8">
      <img :src="image" alt="partner" class="w-full h-full object-contain" />
    </div>
  </div>
</template>
