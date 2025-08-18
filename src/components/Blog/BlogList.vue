<script setup>
import { ref, computed } from "vue";
import { blogPosts } from "@/Data/blogPosts.js";
import BlogCard from "@/components/reusable/BlogCard.vue";
import SearchIcon from "@/components/icons/Search.vue";
import FilterIcon from "@/components/icons/Filter.vue";
import ChevronDown from "@/components/icons/ChevronDown.vue";
import LikeIcon from "@/components/icons/Like.vue";
import EyeIcon from "@/components/icons/Eye.vue";
import CommentIcon from "@/components/icons/Comment.vue";
import ShareIcon from "@/components/icons/Share.vue";

const blogimage = "new-example.png";
const blogimage2 = "example.png";

const isOpenCategory = ref(false);
const selectedCategory = ref("All Articles");
const Categories = ["All Articles", "Technology", "Design", "Business"];

const isOpenPostTime = ref(false);
const selectedPostTime = ref("Latest");
const PostsTime = ["Latest", "Most Like", "Most View"];

const handleCategory = () => {
  isOpenCategory.value = !isOpenCategory.value;
  isOpenPostTime.value = false;
};
const handlePostTime = () => {
  isOpenPostTime.value = !isOpenPostTime.value;
  isOpenCategory.value = false;
};

const selectCategory = (option) => {
  selectedCategory.value = option;
  isOpenCategory.value = false;
};
const selectPostTime = (option) => {
  selectedPostTime.value = option;
  isOpenPostTime.value = false;
};
</script>

<template>
  <section class="flex flex-col relative w-full h-auto max-w-2xl mx-auto">
    <!-- Search Frame -->
    <div
      class="w-full h-14 flex flex-row items-center border-2 dark:bg-[#535353] px-2 md:px-4 rounded-[5px] md:gap-x-3 lg:gap-x-3 xl:gap-x-2.5"
    >
      <div
        class="w-[15%] md:w-[5%] h-full flex justify-center items-center text-[#6C6C6C] dark:text-[#ADADAD]"
      >
        <SearchIcon />
      </div>
      <div class="w-full h-auto">
        <input
          name="search"
          v-model="searchQuery"
          type="text"
          class="bg-transparent outline-none w-full text-[#6C6C6C] dark:text-[#ADADAD]"
          placeholder="Search Article..."
        />
      </div>
    </div>
    <div class="w-full h-[50px] grid grid-cols-12 gap-x-2 mt-5">
      <!-- Tombol utama -->
      <div
        @click="handleCategory"
        class="relative col-span-4 h-auto border-[2px] flex flex-row items-center px-5 py-2 rounded-[5px] justify-between cursor-pointer select-none"
      >
        <p>{{ selectedCategory }}</p>
        <ChevronDown
          :class="isOpenCategory ? 'rotate-180 transition' : 'transition'"
        />

        <!-- List dropdown -->
        <div
          v-if="isOpenCategory"
          class="absolute left-0 top-12 mt-1 w-full border-[2px] rounded-[5px] shadow bg-white z-10"
        >
          <div
            v-for="(category, index) in Categories"
            :key="index"
            @click.stop="selectCategory(category)"
            class="px-5 py-2 hover:bg-gray-100 cursor-pointer"
          >
            {{ category }}
          </div>
        </div>
      </div>

      <div
        @click="handlePostTime"
        class="relative col-span-4 h-auto border-[2px] flex flex-row items-center px-5 py-2 rounded-[5px] justify-between cursor-pointer select-none"
      >
        <p>{{ selectedPostTime }}</p>
        <ChevronDown
          :class="isOpenPostTime ? 'rotate-180 transition' : 'transition'"
        />

        <!-- List dropdown -->
        <div
          v-if="isOpenPostTime"
          class="absolute left-0 top-12 mt-1 w-full border-[2px] rounded-[5px] shadow bg-white z-10"
        >
          <div
            v-for="(post, index) in PostsTime"
            :key="index"
            @click.stop="selectPostTime(post)"
            class="px-5 py-2 hover:bg-gray-100 cursor-pointer"
          >
            {{ post }}
          </div>
        </div>
      </div>
      <div
        class="col-span-4 h-auto border-[2px] flex flex-row items-center px-5 rounded-[5px] justify-between"
      >
        <div
          class="flex items-center justify-between py-2 w-full cursor-pointer hover:border-gray-400"
        >
          <span class="text-gray-500">Custom Date</span>
          <!-- Ikon kalender -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            class="w-5 h-5 text-gray-500"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
      </div>
    </div>
  </section>
  <!-- Newest and Popular -->
  <section class="w-full h-auto grid grid-cols-12 gap-x-5 mt-10">
    <!-- Newest -->
    <div
      class="col-span-8 w-full h-auto border-[1px] rounded-lg flex flex-col px-6 pb-4 gap-y-4"
    >
      <div class="w-full h-auto pt-6">
        <p class="text-[#195279] font-[500] lg:text-[22px] justify-center">
          News
        </p>
      </div>
      <div class="w-full h-auto">
        <figure class="w-full h-auto">
          <!-- src="/assets/images/blog/new-example.png" -->
          <img
            :src="`/assets/images/blog/` + blogimage"
            alt=""
            class="w-full h-[320px] object-center"
          />
        </figure>
      </div>
      <div class="w-full h-auto flex flex-row justify-between">
        <div class="w-full h-auto flex justify-start items-center">
          <p
            class="text-[14px] text-[#6941C6] bg-[#7B61FF]/10 px-4 py-1 rounded-full"
          >
            Artificial Intelligent
          </p>
        </div>
        <div class="w-full h-auto flex justify-end items-center">
          <p
            class="text-[14px] text-[#FFFFFF] bg-[#3758F9] px-2 py-1 rounded-md"
          >
            Mar 05, 2024
          </p>
        </div>
      </div>
      <div class="w-full h-auto flex flex-col gap-y-4">
        <div class="w-full h-auto">
          <p class="text-[22px] text-[#111928] font-[600]">
            Check out SalesGenius, AI tools for smarter sales pitches
          </p>
        </div>
        <div class="w-full h-auto">
          <p class="text-[#637381] font-[400]">
            Every day, new advancements emerge, seemingly at lightning speed,
            promising to make our lives easier, smarter, and more connected. But
            beyond the hype, what truly defines the current landscape of
            technology, and how is it fundam...
          </p>
        </div>
        <div class="w-full h-auto">
          <p class="text-[#535862]">
            Author: <span class="font-[600]">Anisa Maulida Rahma</span>
          </p>
        </div>
      </div>
      <div class="w-full h-auto">
        <div class="w-full flex flex-row gap-x-5">
          <div class="flex flex-row justify-between gap-x-1">
            <div class="w-full h-auto text-[#6E6E6E] dark:text-[#B2AEAE]">
              <LikeIcon />
            </div>
            <div class="w-full h-auto">
              <span class="text-[#6E6E6E] dark:text-[#B2AEAE]"> 1k </span>
            </div>
          </div>
          <div class="flex flex-row justify-between gap-x-1">
            <div class="w-full h-auto text-[#6E6E6E] dark:text-[#B2AEAE]">
              <EyeIcon />
            </div>
            <div class="w-full h-auto">
              <span class="text-[#6E6E6E] dark:text-[#B2AEAE]"> 600 </span>
            </div>
          </div>
          <div class="flex flex-row justify-between gap-x-1">
            <div class="w-full h-auto text-[#6E6E6E] dark:text-[#B2AEAE]">
              <CommentIcon />
            </div>
            <div class="w-full h-auto">
              <span class="text-[#6E6E6E] dark:text-[#B2AEAE]"> 200 </span>
            </div>
          </div>
          <div class="w-auto h-auto text-[#6E6E6E] dark:text-[#B2AEAE]">
            <ShareIcon />
          </div>
        </div>
      </div>
    </div>
    <!-- Most Popular -->
    <div
      class="col-span-4 w-full h-auto border-[1px] rounded-lg flex flex-col gap-y-4"
    >
      <div class="w-full h-auto pt-6 px-6">
        <p class="text-[#195279] font-[500] lg:text-[22px] justify-center">
          Most Popular
        </p>
      </div>
      <div class="w-full h-auto flex flex-col gap-y-4">
        <div class="w-full h-auto">
          <figure class="w-full h-auto">
            <img
              src="/assets/images/blog/example.png"
              alt=""
              class="w-full h-[200px] object-center"
            />
          </figure>
        </div>
        <div class="w-full h-auto grid grid-cols-12">
          <div class="col-span-3 w-full h-auto flex justify-center">
            <p class="text-[24px] text-[#8EB3CC]">#1</p>
          </div>
          <div class="col-span-9 flex flex-col pr-8 gap-y-1">
            <div class="w-full h-auto">
              <p class="text-[#6941C6] text-[14px]">Artificial Intelligent</p>
            </div>
            <div class="w-full h-auto">
              <p class="text-[#195279] font-[500] text-[18px]">
                Shaping Our World, One Innovation at a Time
              </p>
            </div>
            <div class="w-full h-auto">
              <p class="text-[#B8B8B8] text-[12px]">
                Anisa Maulida Rahma | 20 Januari 2025
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="w-full h-[1px] bg-[#D2D2D2]" />
      <div class="w-full h-auto grid grid-cols-12">
        <div class="col-span-3 w-full h-auto flex justify-center">
          <p class="text-[24px] text-[#8EB3CC]">#2</p>
        </div>
        <div class="col-span-9 flex flex-col pr-8 gap-y-1">
          <div class="w-full h-auto">
            <p class="text-[#6941C6] text-[14px]">Artificial Intelligent</p>
          </div>
          <div class="w-full h-auto">
            <p class="text-[#195279] font-[500] text-[18px]">
              Shaping Our World, One Innovation at a Time
            </p>
          </div>
          <div class="w-full h-auto">
            <p class="text-[#B8B8B8] text-[12px]">
              Anisa Maulida Rahma | 20 Januari 2025
            </p>
          </div>
        </div>
      </div>
      <div class="w-full h-[1px] bg-[#D2D2D2]" />
      <div class="w-full h-auto grid grid-cols-12">
        <div class="col-span-3 w-full h-auto flex justify-center">
          <p class="text-[24px] text-[#8EB3CC]">#3</p>
        </div>
        <div class="col-span-9 flex flex-col pr-8 gap-y-1">
          <div class="w-full h-auto">
            <p class="text-[#6941C6] text-[14px]">Artificial Intelligent</p>
          </div>
          <div class="w-full h-auto">
            <p class="text-[#195279] font-[500] text-[18px]">
              Shaping Our World, One Innovation at a Time
            </p>
          </div>
          <div class="w-full h-auto">
            <p class="text-[#B8B8B8] text-[12px]">
              Anisa Maulida Rahma | 20 Januari 2025
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- BlogList -->
  <section class="w-full h-auto grid grid-cols-3 mt-10 gap-5 mb-20">
    <!-- <router-link
      :to="`/blog/${slug}`"
      class="flex flex-col w-full px-0 sml:px-8 md:px-0 h-auto"
    > -->
    <div
      v-for="(i, index) in 6"
      :key="index"
      class="flex flex-col w-full h-auto p-3 border-[1px] rounded-[10px]"
    >
      <div class="w-full h-[200px]">
        <img
          src="/assets/images/blog/example.png"
          alt="BlogImage"
          class="w-full h-full object-cover rounded-[10px]"
        />
      </div>
      <div
        class="flex flex-row w-full h-auto justify-between text-sm text-[#7A7A7A] my-5"
      >
        <div
          class="flex items-center bg-[#7B61FF]/10 dark:bg-transparent px-4 dark:px-0 rounded-[16px]"
        >
          <p
            class="lg:text-[12px] text-[#7B61FF] dark:text-[#FFFFFF] font-semibold"
          >
            Artificial Intelligent
          </p>
        </div>
        <div class="flex items-center bg-[#3758F9] px-5 py-1 rounded-[5px]">
          <p class="text-[#FFFFFF] lg:text-[12px]">Mar 05, 2024</p>
        </div>
      </div>
      <div class="flex w-full h-[65px] text-left">
        <p
          class="lg:text-[17px] font-[600] text-[#111928] dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-br dark:from-[#FAFAFA] dark:via-[#D4D4D4] dark:to-[#AAAAAA]"
        >
          Check out SalesGenius, AI tools for smarter sales pitches
        </p>
      </div>
      <div class="flex w-full h-[70px] justify-start items-start">
        <!-- <div
          v-html="description"
          class="prose max-w-none line-clamp-3 text-[14px] font-[400] text-[#637381] dark:text-[#6F6F6F]"
        /> -->
        <p class="text-[#637381]">
          Tailor your approach with AI-enhanced customer analytics.
        </p>
      </div>
      <div class="flex flex-row justify-between w-full h-auto">
        <div class="w-[90%] h-auto">
          <div class="flex flex-row gap-x-5">
            <div class="flex flex-row justify-between gap-x-1">
              <div class="w-full h-auto text-[#6E6E6E] dark:text-[#B2AEAE]">
                <LikeIcon />
              </div>
              <div class="w-full h-auto">
                <span class="text-[#6E6E6E] dark:text-[#B2AEAE]"> 500 </span>
              </div>
            </div>
            <div class="flex flex-row justify-between gap-x-1">
              <div class="w-full h-auto text-[#6E6E6E] dark:text-[#B2AEAE]">
                <EyeIcon />
              </div>
              <div class="w-full h-auto">
                <span class="text-[#6E6E6E] dark:text-[#B2AEAE]"> 500 </span>
              </div>
            </div>
            <div class="flex flex-row justify-between gap-x-1">
              <div class="w-full h-auto text-[#6E6E6E] dark:text-[#B2AEAE]">
                <CommentIcon />
              </div>
              <div class="w-full h-auto">
                <span class="text-[#6E6E6E] dark:text-[#B2AEAE]"> 500 </span>
              </div>
            </div>
          </div>
        </div>
        <div class="w-[10%] h-auto text-[#6E6E6E] dark:text-[#B2AEAE]">
          <ShareIcon />
        </div>
      </div>
    </div>
    <!-- </router-link> -->
  </section>
</template>
