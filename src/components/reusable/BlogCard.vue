<script setup>
defineProps({
  image: String,
  title: String,
  category: String,
  date: String,
  description: String,
});
</script>

<template>
  <div class="flex flex-col w-[330px] h-auto">
    <div class="w-full h-[200px]">
      <img
        :src="image"
        :alt="title"
        class="w-full h-full object-cover rounded-[10px]"
      />
    </div>
    <div
      class="flex flex-row w-full h-auto justify-between text-sm text-[#7A7A7A] my-5"
    >
      <div class="flex items-center bg-[#7B61FF]/10 px-4 rounded-[16px]">
        <p class="text-[#7B61FF] font-semibold">
          {{ category }}
        </p>
      </div>
      <div>
        <p
          class="flex items-center bg-[#3758F9] text-[#FFFFFF] px-3 py-1 rounded-[5px]"
        >
          {{ date }}
        </p>
      </div>
    </div>
    <div class="flex w-full h-[80px] text-left">
      <p class="text-[19px] font-[600] text-[#111928]">
        {{ title }}
      </p>
    </div>
    <div class="flex w-full h-[100px]">
      <p class="text-[14px] font-[400] text-[#637381]">
        {{ description }}
      </p>
    </div>
  </div>
</template>
