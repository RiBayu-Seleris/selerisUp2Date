<script setup>
import CardDefault from "@/components/reusable/CardDefault.vue";
</script>

<template>
  <div class="flex flex-col relative w-full py-10 mb-10">
    <div class="flex flex-col gap-3">
      <div class="flex w-full h-auto justify-center items-center">
        <p
          class="sml:text-2xl md:text-3xl lg:text-4xl xl:text-4xl font-[500] text-[#195279]"
        >
          Benefits Seleris Insurance
        </p>
      </div>
      <div class="flex w-full h-auto justify-center items-center px-10">
        <p
          class="sml:text-xl md:text-2xl lg:text-3xl xl:text-3xl font-[500] text-[#1DC457] text-center"
        >
          Get started with Seleris and see the difference for yourself
        </p>
      </div>
    </div>
    <div
      class="flex flex-row py-2 w-full max-h-screen gap-x-6 mt-5 overflow-x-auto snap-x snap-mandatory scroll-pl-10 px-10 hide-scrollbar"
    >
      <CardDefault />
      <CardDefault />
      <CardDefault />
      <CardDefault />
      <CardDefault />
    </div>
  </div>
</template>
<style scoped>
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
.hide-scrollbar {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
