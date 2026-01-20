<script setup>
defineProps({
  name: {
    type: String,
  },
  label: {
    type: String,
  },
  type: {
    type: String,
  },
  placeholder: {
    type: String,
  },
});
</script>

<template>
  <div class="w-full h-auto flex flex-col space-y-1">
    <div class="w-full h-auto">
      <label :for="name">{{ label }}</label>
    </div>
    <div class="w-full h-auto">
      <input
        :id="name"
        :name="name"
        :type="type"
        :aria-label="name"
        class="w-full p-2 rounded-[8px] border-gray-300 placeholder-[6F6F6F] dark:bg-[#323232] border dark:border-[#FAFAFA]/25 focus:outline-none focus:ring-1 focus:ring-[#2AB857]"
        :placeholder="placeholder"
      />
    </div>
  </div>
</template>
