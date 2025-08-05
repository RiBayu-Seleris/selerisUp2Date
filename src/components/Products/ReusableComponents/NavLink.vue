<script setup>
import { useRoute } from "vue-router";

const route = useRoute();
defineProps({
  href: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <a
    :href="href"
    :class="[
      'relative inline-block text-animate-hover hover:font-semibold',
      route.path === href
        ? 'text-[#18AB53] dark:text-[#EEEEEE] font-semibold'
        : '',
    ]"
  >
    <slot />
  </a>
</template>
