<script setup>
defineProps({
  name: String,
  position: String,
  text: String,
});
</script>

<template>
  <div
    class="w-full h-[200px] px-8 py-6 border border-gray-200 rounded-lg bg-white shadow-sm"
  >
    <div class="mb-4">
      <h3 class="text-[24px] font-semibold text-[#195279]">{{ name }}</h3>
      <p class="text-[18px] text-[#717276]">{{ position }}</p>
    </div>
    <div class="flex items-start gap-3">
      <svg
        class="w-6 h-6 text-[#91BBD8] flex-shrink-0"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          d="M7.17 6A4.17 4.17 0 0 0 3 10.17v3.33A4.17 4.17 0 0 0 7.17 17.67H9V10H6.67v-.83c0-.96.78-1.75 1.75-1.75H9V6H7.17zM17.17 6A4.17 4.17 0 0 0 13 10.17v3.33A4.17 4.17 0 0 0 17.17 17.67H19V10h-2.33v-.83c0-.96.78-1.75 1.75-1.75H19V6h-1.83z"
        />
      </svg>
      <p class="text-[16px] text-[#535862] leading-relaxed">{{ text }}</p>
    </div>
  </div>
</template>
