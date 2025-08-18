<script setup>
import { ref, onMounted } from "vue";

const props = defineProps({
  // Elemen artikel
  root: {
    type: Object,
    default: null,
  },
  // Mengambil H1 dan H2
  levels: {
    type: Array,
    default: () => [2, 3, 4, 5, 6],
  },
  // Jarak scroll dari atas
  offset: {
    type: Number,
    default: 0,
  },
});

const toc = ref([]);

// Mengubah teks heading jadi slug untuk ID
function slugify(text) {
  return text
    .toString()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

// Memindai heading di artikel dan membuat daftar ToC
function buildToc() {
  const rootEl = props.root?.$el ?? props.root ?? document;
  if (!rootEl) return;

  const selector = props.levels.map((l) => `h${l}`).join(",");
  const headings = Array.from(rootEl.querySelectorAll(selector));

  const used = new Map();
  headings.forEach((h) => {
    if (!h.id) {
      const base = slugify(h.textContent || "section");
      let id = base || "section";
      let n = used.get(base) || 0;
      while (document.getElementById(id)) {
        n++;
        id = `${base}-${n}`;
      }
      used.set(base, n);
      h.id = id;
    }
  });

  toc.value = headings.map((h) => ({
    id: h.id,
    text: h.textContent.trim(),
    level: Number(h.tagName.replace("H", "")),
  }));
}

// Scroll halus ke heading
function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.pageYOffset - props.offset;
  window.scrollTo({ top: y, behavior: "smooth" });
  history.replaceState(null, "", `#${id}`);
}

onMounted(buildToc);
</script>

<template>
  <div class="h-auto flex flex-col p-4 gap-y-2 border-[1px] rounded-[10px]">
    <p>Content</p>
    <!-- ToC -->
    <ol class="list-decimal list-outside pl-6 space-y-2">
      <li v-for="item in toc" :key="item.id">
        <a
          :href="'#' + item.id"
          @click.prevent="scrollToId(item.id)"
          class="text-blue-600 hover:underline"
        >
          {{ item.text }}
        </a>
      </li>
    </ol>
  </div>
  <!-- <p class="text-[14px] py-0.5">{{ item.content }}</p> -->
      <!-- <ToCList
        class="list-disc ml-0 space-y-2"
        v-if="item.subheadings.length"
        :items="item.subheadings"
      /> -->
      <!-- <a
          :href="'#' + item.id"
          @click.prevent="scrollToId(item.id)"
          class="text-blue-600 hover:underline"
        >
          {{ item.text }}
        </a> -->
</template>
