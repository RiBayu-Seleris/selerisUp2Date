<script setup>
import { ref, computed } from "vue";
import { blogPosts } from "@/Data/blogPosts.js";
import BlogCard from "@/components/reusable/BlogCard.vue";
import SearchIcon from "@/components/icons/Search.vue";
import FilterIcon from "@/components/icons/Filter.vue";

// Kategori
const categories = [
  "View All",
  "Design",
  "Insurance",
  "Technology",
  "Artificial Intelligent",
];
const activeCategory = ref("View All");

// Pencarian
const searchQuery = ref("");

// Filter berdasarkan kategori
const filteredPosts = computed(() => {
  if (activeCategory.value === "View All") return blogPosts;
  return blogPosts.filter((post) => post.category === activeCategory.value);
});

// Gabungkan dengan pencarian
const filteredAndSearchedPosts = computed(() => {
  return filteredPosts.value.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});
</script>

<template>
  <div class="flex flex-col w-full h-auto px-0 xl:px-10">
    <!-- Search Mobile -->
    <div
      class="relative flex lg:hidden flex-row w-full h-auto justify-end items-center gap-x-5 mb-10"
    >
      <div
        class="w-full h-10 flex flex-row items-center bg-[#EFEFEF] dark:bg-[#535353] md:px-2 rounded-[10px] md:gap-x-3 lg:gap-x-3 xl:gap-x-2.5"
      >
        <div
          class="w-[15%] h-full flex justify-center items-center text-[#6C6C6C] dark:text-[#ADADAD]"
        >
          <SearchIcon />
        </div>
        <div class="w-full h-auto">
          <input
            v-model="searchQuery"
            type="text"
            class="bg-transparent border-none outline-none placeholder-gray-500 w-full text-[#6C6C6C] dark:text-[#ADADAD]"
            placeholder="Search"
          />
        </div>
      </div>
      <div
        class="w-10 lg:w-12 h-10 flex justify-center items-center bg-[#2AB857] rounded-[10px] p-2.5 lg:p-3.5"
      >
        <FilterIcon />
      </div>
    </div>
    <!-- Tabs -->
    <div class="flex flex-row lg:flex-row w-full h-auto justify-between">
      <!-- Kategori -->
      <div
        class="flex flex-row w-full md:w-full lg:w-[70%] xl:w-[70%] h-auto gap-x-[20px] md:gap-x-[25px] lg:gap-x-[25px] sml:overflow-x-auto py-3 sml:snap-x sml:snap-mandatory sml:scroll-pl-10 sml:pl-10 sml:pr-10 hide-scrollbar md:pl-0 md:pr-0"
      >
        <div
          v-for="category in categories"
          :key="category"
          @click="activeCategory = category"
          class="flex-shrink-0 w-auto cursor-pointer md:text-[16px] font-medium transition-all duration-200"
          :class="
            activeCategory === category
              ? 'text-green-600 font-[500]'
              : 'text-gray-500 border-transparent hover:text-green-500'
          "
        >
          {{ category }}
        </div>
      </div>

      <!-- Search -->
      <div
        class="relative hidden lg:flex flex-row lg:flex-row w-full md:w-[50%] lg:w-[30%] xl:w-[30%] h-auto justify-end items-center gap-x-3 lg:pl-5 lg:pr-0 pl-16"
      >
        <div
          class="w-full lg:w-[70%] xl:w-full h-10 flex flex-row items-center bg-[#EFEFEF] dark:bg-[#535353] md:px-2 lg:px-3.5 xl:px-4 rounded-[10px] md:gap-x-3 lg:gap-x-3 xl:gap-x-2.5"
        >
          <div
            class="w-[15%] lg:w-[10%] h-full flex items-center text-[#6C6C6C] dark:text-[#ADADAD]"
          >
            <SearchIcon />
          </div>
          <div class="w-full h-auto">
            <input
              v-model="searchQuery"
              type="text"
              class="bg-transparent border-none outline-none placeholder-gray-500 w-full text-[#6C6C6C] dark:text-[#ADADAD]"
              placeholder="Search"
            />
          </div>
        </div>
        <div
          class="w-10 lg:w-12 h-10 flex justify-center items-center bg-[#2AB857] rounded-[10px] p-2.5 lg:p-3.5"
        >
          <FilterIcon />
        </div>
      </div>
    </div>

    <!-- Blog Cards -->
    <div
      class="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 w-full h-auto mt-4 justify-between gap-y-10 gap-x-10"
    >
      <div
        v-for="post in filteredAndSearchedPosts"
        :key="post.id"
        class="w-auto h-auto"
      >
        <BlogCard
          :slug="post.slug"
          :title="post.title"
          :category="post.category"
          :date="post.date"
          :description="post.description"
          :image="post.image"
          :likes="post.likes"
          :views="post.views"
          :comments="post.comments"
        />
      </div>
    </div>
  </div>
</template>
