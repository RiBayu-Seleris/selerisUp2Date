<script setup>
import { ref } from "vue";

const props = defineProps({
  items: Array,
  offset: { type: Number, default: 130 }, // tambahkan ini!
});

// Set Active Id = Null
const activeId = ref(null);

// Scroll halus ke heading
function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.pageYOffset - props.offset;
  window.scrollTo({ top: y, behavior: "smooth" });
  history.replaceState(null, "", `#${id}`);
  // set active
  activeId.value = id;
}
</script>

<template>
  <ol class="list-decimal list-outside pl-4 space-y-2">
    <li
      v-for="(item, index) in items"
      :key="index"
      :class="[
        'hover:text-[#2AB857] cursor-pointer',
        activeId === item.id ? 'text-[#2AB857] font-[400]' : 'text-[#909090]',
      ]"
    >
      <a :href="'#' + item.id" @click.prevent="scrollToId(item.id)">
        <span class="text-[14px]">
          {{ item.content }}
        </span>
      </a>
    </li>
  </ol>
</template>
