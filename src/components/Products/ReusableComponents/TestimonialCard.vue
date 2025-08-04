<script setup>
defineProps({
  comment: {
    type: String,
  },
  authorName: {
    type: String,
  },
  authorPosition: {
    type: String,
  },
});
</script>

<template>
  <div
    class="w-full h-auto px-8 md:px-12 lg:px-8 py-8 md:py-8 lg:py-4 flex flex-col border-[1px] border-[#CBC9C9] rounded-[10px] bg-[#FAFAFA] space-y-6 md:space-y-12 lg:space-y-7"
  >
    <div class="w-full h-auto flex">
      <p class="text-[#535862] text-[14px] md:text-[21px] lg:text-[17px]">
        {{ comment }}
      </p>
    </div>
    <div class="w-full h-auto flex flex-col space-y-1">
      <div class="w-full h-auto">
        <p
          class="text-[#323232] font-[600] text-[14px] md:text-[21px] lg:text-[21px]"
        >
          {{ authorName }}
        </p>
      </div>
      <div class="w-full h-auto">
        <p
          class="text-[#323232] font-[400] text-[14px] md:text-[17px] lg:text-[17px]"
        >
          {{ authorPosition }}
        </p>
      </div>
    </div>
  </div>
</template>
