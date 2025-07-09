<script setup>
import { ref, computed } from "vue";
import BlogCard from "@/components/reusable/BlogCard.vue";

// Kategori
const categories = [
  "View All",
  "Design",
  "Insurance",
  "Technology",
  "Artificial Intelligent",
];
const activeCategory = ref("View All");

// Data blog (dummy)
const blogPosts = ref([
  {
    id: 1,
    title: "Meet AutoManage, the best AI management tools",
    category: "Artificial Intelligent",
    date: "Dec 22, 2023",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    image: new URL("@/assets/images/blog/example.png", import.meta.url).href,
  },
  {
    id: 2,
    title: "Design 2024: Clean Minimal UI",
    category: "Design",
    date: "Jan 3, 2024",
    description: "New trends in visual and UX design for modern apps.",
    image: new URL("@/assets/images/blog/example.png", import.meta.url).href,
  },
  {
    id: 3,
    title: "Insurance Tech Boom",
    category: "Insurance",
    date: "Feb 10, 2024",
    description: "How AI is transforming the insurance industry.",
    image: new URL("@/assets/images/blog/example.png", import.meta.url).href,
  },
  // Tambah lebih banyak sesuai kebutuhan
]);

// Filter berdasarkan kategori aktif
const filteredPosts = computed(() => {
  if (activeCategory.value === "View All") return blogPosts.value;
  return blogPosts.value.filter(
    (post) => post.category === activeCategory.value
  );
});
</script>

<template>
  <div class="flex flex-col w-full h-auto px-0">
    <!-- Tabs -->
    <div class="flex flex-row w-full h-auto gap-x-[65px] mb-8">
      <div
        v-for="category in categories"
        :key="category"
        @click="activeCategory = category"
        class="cursor-pointer text-[16px] font-medium pb-1 border-b-2 transition-all duration-200"
        :class="
          activeCategory === category
            ? 'text-green-600 border-green-600'
            : 'text-gray-500 border-transparent hover:text-green-500'
        "
      >
        {{ category }}
      </div>
    </div>

    <!-- Blog Cards -->
    <div class="relative flex flex-wrap w-full h-auto mt-4 gap-[32px]">
      <div v-for="post in filteredPosts" :key="post.id" class="w-auto h-auto">
        <BlogCard
          :title="post.title"
          :category="post.category"
          :date="post.date"
          :description="post.description"
          :image="post.image"
        />
      </div>
    </div>
  </div>
</template>
