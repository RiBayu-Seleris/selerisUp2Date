<script setup>
import { useRoute } from "vue-router";

const route = useRoute();
defineProps({
  href: {
    type: String,
    required: true,
  },
});

// Fungsi scroll ke elemen dengan id tertentu
function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;

  if (id === "about") {
    const yOffset = -100; // sesuaikan tinggi navbar
    const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;

    window.scrollTo({ top: y, behavior: "smooth" });
  } else {
    const yOffset = -20; // sesuaikan tinggi navbar
    const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;

    window.scrollTo({ top: y, behavior: "smooth" });
  }
}
</script>

<template>
  <button
    @click="scrollToId(href.replace('#', ''))"
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
  </button>
</template>
