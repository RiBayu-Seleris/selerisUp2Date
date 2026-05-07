<script setup>
const props = defineProps({
  icon: String,
  title: String,
  description: String,
});
</script>

<template>
  <div
    class="relative w-auto h-auto flex flex-col justify-center items-center bg-white/40 backdrop-blur-[70px] border border-white/50 shadow-[0_26px_44px_0_rgba(0,0,0,0.08)] px-4 py-5 rounded-xl"
  >
    <div
      class="w-[350px] h-auto flex flex-row gap-x-4 justify-between items-start"
    >
      <div
        class="w-10 h-10 shrink-0 flex justify-center items-center bg-orange-500 rounded-md"
      >
        P
      </div>
      <div class="w-full h-auto flex flex-col gap-y-4 pt-1">
        <div class="w-full flex justify-start">
          <p class="text-[#195279] font-[500] text-[20px]">
            Precise measurement
          </p>
        </div>
        <div class="w-full">
          <p class="text-[#8C8181] text-[18px]">
            Creates unique 3D model of your face for accurate health
            measurements.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
