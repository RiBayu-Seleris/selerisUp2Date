<script setup>
defineProps({
  title: String,
  items: Object,
});
</script>

<template>
  <div
    class="w-full h-auto bg-[#D9D9D9] dark:bg-gradient-to-r dark:from-[#17181A] dark:from-45% dark:to-[#565656]/95 p-[1px] rounded-xl"
  >
    <div
      class="w-full h-full p-5 flex flex-col gap-y-2 text-[18px] font-[400] text-[#323232] dark:text-[#B8B8B8] bg-[#F9FAFB] dark:bg-[#1D1F23] dark:border-[#FAFAFA]/25 rounded-xl"
    >
      <p
        class="text-[20px] lg:text-[18px] xl:text-[20px] font-semibold text-[#195279] dark:text-[#FAFAFA]"
      >
        {{ title }}
      </p>

      <!-- Desktop -->
      <div class="hidden lg:flex flex-col w-full h-auto gap-y-2">
        <div
          v-for="(value, key) in items"
          :key="key"
          class="flex flex-row w-full h-auto"
        >
          <div class="w-[55%] xl:w-[70%] h-auto">
            <p class="text-[14px] font-[500]">{{ key }}</p>
          </div>

          <div class="max-w-fit h-auto pr-2">
            <p class="text-[14px]">:</p>
          </div>

          <div class="w-full h-auto pl-0">
            <!-- 🔥 jika value berisi tag HTML (hasil Quill) -->
            <p
              v-if="
                typeof value === 'string' && /<\/?[a-z][\s\S]*>/i.test(value)
              "
              class="text-[14px] font-[500] prose max-w-none"
              v-html="value"
            ></p>

            <!-- 🔥 jika value adalah teks biasa atau angka -->
            <p v-else class="text-[14px] font-[500]">
              {{ value }}
            </p>
          </div>
        </div>
      </div>

      <!-- Mobile -->
      <div class="lg:hidden flex flex-col w-full h-auto gap-y-2">
        <div
          v-for="(value, key) in items"
          :key="key"
          class="flex flex-col w-full h-auto"
        >
          <div class="w-full h-auto flex flex-row">
            <div class="max-w-fit h-auto">
              <p class="text-[14px] font-[500]">{{ key }}</p>
            </div>
            <div class="max-w-fit h-auto pl-2">
              <p class="text-[14px]">:</p>
            </div>
          </div>

          <div class="w-full h-auto pl-0">
            <!-- 🔥 jika value berisi tag HTML (hasil Quill) -->
            <p
              v-if="
                typeof value === 'string' && /<\/?[a-z][\s\S]*>/i.test(value)
              "
              class="text-[14px] font-[500] prose max-w-none mb-1"
              v-html="value"
            ></p>

            <!-- 🔥 jika value adalah teks biasa atau angka -->
            <p v-else class="text-[14px] font-[500] mb-1">
              {{ value }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
