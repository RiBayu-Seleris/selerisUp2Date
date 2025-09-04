<script setup>
import { ref, onMounted, computed } from "vue";
import ToCList from "@/components/Blog/ToCList.vue";
import { slugifyWithCounter } from "@sindresorhus/slugify";

const slugify = slugifyWithCounter();

const headings = ref([]);

onMounted(() => {
  window.document
    .querySelector("#content")
    .querySelectorAll("h1, h2, h3, h4, h5, h6")
    .forEach((el) => {
      let id = slugify(el.innerText);
      el.setAttribute("id", id);

      headings.value.push({
        id: id,
        level: parseInt(el.tagName.charAt(1), 10),
        content: el.innerText,
        subheadings: [],
      });
    });

  //   console.log(headings.value);
});

const groupedHeadings = computed(() => {
  let items = [...headings.value];

  for (let i = items.length - 1; i >= 0; i--) {
    // console.log(items[i]);
    let currentItem = items[i];

    let parentItem = items.findLast((item, index) => {
      return item.level < currentItem.level && index < i;
    });

    if (parentItem) {
      parentItem.subheadings.unshift(currentItem);
      items.splice(i, 1);
    }
  }

  return items;
});

// offset responsif
const offset = computed(() => {
  return window.innerWidth < 768 ? 80 : 110;
});
</script>

<template>
  <div class="h-auto flex flex-col p-4 gap-y-2 border-[1px] rounded-[10px]">
    <p class="text-[#195279] font-[500] text-[16px]">Content</p>
    <!-- ToC -->
    <ToCList :items="groupedHeadings" :offset="offset" />
  </div>
</template>
