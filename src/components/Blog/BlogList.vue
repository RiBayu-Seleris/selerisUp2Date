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
    image: new URL("@/assets/images/blog/example.png", import.meta.url).href,
    title: "Meet AutoManage, the best AI management tools",
    category: "Artificial Intelligent",
    date: "Dec 22, 2023",
    description:
      "Meet AutoManage, the best AI management tools Boost productivity with smart tools that automate everyday operational tasks.",
  },
  {
    id: 2,
    image: new URL("@/assets/images/blog/example.png", import.meta.url).href,
    title: "Introducing CodeWizard, streamline with AI assistance",
    category: "Design",
    date: "Jan 3, 2024",
    description:
      "Introducing CodeWizard, streamline with AI assistance Explore AI-powered design tools that simplify modern app development.",
  },
  {
    id: 3,
    image: new URL("@/assets/images/blog/example.png", import.meta.url).href,
    title: "Discover HelpBot, the AI assistant for customer service",
    category: "Insurance",
    date: "Feb 10, 2024",
    description:
      "Discover HelpBot, the AI assistant for customer service Transform service experience using intelligent, real-time customer insights.",
  },
  {
    id: 4,
    image: new URL("@/assets/images/blog/example.png", import.meta.url).href,
    title: "Discover HelpBot, the AI assistant for customer service",
    category: "Technology",
    date: "Feb 10, 2024",
    description:
      "Discover HelpBot, the AI assistant for customer service AI-driven platform to uncover deep marketing and customer behavior patterns.",
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
  <div class="flex flex-col w-full h-auto px-0 xl:px-10">
    <!-- Tabs -->
    <div
      class="flex flex-row w-full h-auto gap-x-[20px] md:gap-x-[45px] lg:gap-x-[65px] mb-5 sml:overflow-x-auto md:overflow-x-hidden sml:snap-x sml:snap-mandatory sml:scroll-pl-10 sml:pl-10 sml:pr-10 hide-scrollbar md:pl-0"
    >
      <div
        v-for="category in categories"
        :key="category"
        @click="activeCategory = category"
        class="flex-shrink-0 w-auto cursor-pointer md:text-[16px] font-medium pb-1 border-b-2 transition-all duration-200"
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
    <div class="relative flex flex-wrap w-full h-auto mt-4 justify-between">
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
