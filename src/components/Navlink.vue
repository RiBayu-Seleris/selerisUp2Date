<script setup>
import { useRoute } from "vue-router";

const route = useRoute();

defineProps({
  href: {
    type: String,
    required: true,
  },
  target: {
    type: String,
    default: "_self",
  },
});

const isExternal = (url) => /^https?:\/\//.test(url);
</script>

<template>
  <!-- External link -->
  <a
    v-if="isExternal(href)"
    :href="href"
    :target="target"
    rel="noopener noreferrer"
    class="relative inline-block justify-start text-start"
  >
    <slot />
  </a>

  <!-- Internal link -->
  <router-link
    v-else
    :to="href"
    :target="target"
    :class="[
      'relative inline-block justify-start text-start',
      route.path === href ? 'text-[#18AB53] dark:text-[#EEEEEE]' : '',
    ]"
  >
    <slot />
  </router-link>
</template>
