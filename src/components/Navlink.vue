<script setup>
import { useRoute } from "vue-router";

const route = useRoute();
defineProps({
  href: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <router-link
    :to="href"
    :class="[
      'relative inline-block text-animate-hover hover:font-bold',
      route.path === href ? 'text-[#18AB53] font-bold' : '',
    ]"
  >
    <slot />
  </router-link>
</template>
