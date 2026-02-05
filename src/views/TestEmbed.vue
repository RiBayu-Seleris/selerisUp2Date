<script setup></script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-slate-900 px-20">
    <div class="relative w-full h-auto bg-white">
      <img
        src="@/assets/Products/images/Care-Applicator/full-maps.png"
        alt=""
        class="w-full h-full object-contain"
      />
      <img
        src="@/assets/Products/images/Care-Applicator/maps-1.png"
        alt=""
        class="absolute left-[0px] top-[0px] w-auto h-[70.7%] object-contain bg-red-600/0"
      />
      <img
        src="@/assets/Products/images/Care-Applicator/maps-2.png"
        alt=""
        class="absolute left-[22%] bottom-[41px] w-auto h-[22%] object-contain bg-blue-700/10"
      />
      <!-- <img
        src="@/assets/Products/images/Care-Applicator/maps-3.png"
        alt=""
        class="absolute left-[33%] top-6 w-auto h-[55%] object-contain"
      /> -->
      <!-- <img
        src="@/assets/Products/images/Care-Applicator/maps-4.png"
        alt=""
        class="absolute left-[60%] top-32 w-auto h-[45%] object-contain"
      /> -->
      <!-- <img
        src="@/assets/Products/images/Care-Applicator/maps-5.png"
        alt=""
        class="absolute left-[50%] bottom-7 w-auto h-[25%] object-contain bg-green-600"
      /> -->
    </div>
  </div>
  <div class="w-full h-[3px] origin-left skew-y-[5deg] flex flex-row gap-x-5">
    <div v-for="i in 20" :key="i" class="w-full h-full bg-red-800" />
  </div>
</template>
