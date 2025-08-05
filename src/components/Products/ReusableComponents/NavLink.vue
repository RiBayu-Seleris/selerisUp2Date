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
      'relative inline-block font-medium',
      route.path === '/product/lifins'
        ? 'text-[#374151]'
        : route.path === '/product/health-care'
        ? 'text-[#374151]'
        : route.path === href
        ? 'text-[#374151]'
        : '',
    ]"
  >
    <slot />
  </a>
</template>
