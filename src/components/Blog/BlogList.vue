<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { blogsApi } from "@/consumeAPI/blogsApi";

import BlogCard from "@/components/reusable/BlogCard.vue";
import SearchIcon from "@/components/icons/Search.vue";
import FilterIcon from "@/components/icons/Filter.vue";
import ChevronDown from "@/components/icons/ChevronDown.vue";
import LikeIcon from "@/components/icons/Like.vue";
import EyeIcon from "@/components/icons/Eye.vue";
import CommentIcon from "@/components/icons/Comment.vue";
import ShareIcon from "@/components/icons/Share.vue";
import { useUtilsStore } from "@/stores/utils.js";
import { useRoute } from "vue-router";

const utils = useUtilsStore();
const isOpenCategory = ref(false);
const selectedCategory = ref("All Articles");
const Categories = [
  {
    id: 1,
    name: "All Articles",
  },
  {
    id: 2,
    name: "Technology",
  },
  {
    id: 3,
    name: "Design",
  },
  {
    id: 4,
    name: "Business",
  },
];
// const Categories = ref({});

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

// CopyLink
const route = useRoute();
const copied = ref(false);

const {
  blogs,
  blogDetail,
  newestBlog,
  popularBlog,
  getAllBlogs,
  getBlogBySlug,
  getNewestBlog,
  getPopularBlog,
  error,
  loading,
  newestError,
  popularError,
  blogsError,
} = blogsApi();

// bikin URL lengkap berdasarkan slug
const blogUrl = `${window.location.origin}/blog/${newestBlog.slug}`;

const copyLink = async (slug) => {
  try {
    const blogUrl = `${window.location.origin}/blog/${slug}`;
    await navigator.clipboard.writeText(blogUrl);
    copied.value = true;
    setTimeout(() => (copied.value = false), 2000);
  } catch (err) {
    console.error("Gagal menyalin link:", err);
  }
};

const activeShareId = ref(null);
const isShareOpen = ref(false);
const menuRef = ref(null);
const buttonRef = ref(null);
const toggleShare = (id) => {
  activeShareId.value = activeShareId.value === id ? null : id;
};
const toggleShareBlogs = (id) => {
  if (activeShareId.value === id) {
    // kalau menu yang sama diklik → tutup
    activeShareId.value = null;
  } else {
    // kalau menu lain diklik → ganti ke id itu
    activeShareId.value = id;
  }
};
const handleClickOutside = (event) => {
  // ambil semua share-wrapper
  const wrappers = document.querySelectorAll(".share-wrapper");

  let clickedInside = false;
  wrappers.forEach((wrapper) => {
    if (wrapper.contains(event.target)) {
      clickedInside = true;
    }
  });

  if (!clickedInside) {
    activeShareId.value = null;
  }
};

onMounted(() => {
  getAllBlogs();
  getNewestBlog();
  getPopularBlog();
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<template>
  <section
    class="flex flex-col relative w-full h-auto lg:max-w-2xl mx-auto px-8 md:px-8 lg:px-0"
  >
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
        <!-- v-model="searchQuery" -->
        <input
          name="search"
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
            @click.stop="selectCategory(category.name)"
            class="px-5 py-2 hover:bg-gray-100 cursor-pointer"
          >
            {{ category.name }}
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
  <!-- Frame Blog Newest, Popular and Blog Lists -->
  <div>
    <!-- Newest and Popular -->
    <section
      class="w-full h-auto flex flex-col lg:grid lg:grid-cols-12 gap-x-5 xl:gap-x-10 mt-10 px-8 md:px-8 lg:px-8 xl:px-0"
    >
      <!-- Newest Blog-->
      <div
        class="w-full h-full col-span-12 lg:col-span-8 rounded-lg bg-[#D9D9D9] !p-[1px] dark:bg-gradient-to-tr dark:from-[#17181A] dark:from-45% dark:to-[#565656]"
      >
        <div
          class="relative w-full h-full rounded-lg flex flex-col gap-y-4 px-6 pb-5 lg:pb-0 bg-[#FAFAFA] dark:bg-[#1D1F23]"
        >
          <div class="w-full h-auto pt-6">
            <p
              class="text-[#195279] dark:text-[#FAFAFA] font-[500] text-[22px] justify-center"
            >
              News
            </p>
          </div>
          <!-- Loading -->
          <div v-if="loading">Loading Data</div>
          <!-- Error Global -->
          <div v-else-if="error">{{ error }}</div>
          <!-- newestError -->
          <div v-else-if="newestError" class="lg:pb-4">
            {{ newestError }}
          </div>
          <div
            v-else-if="newestBlog"
            class="relative w-full h-auto flex flex-col"
          >
            <router-link
              :to="`/blog/${newestBlog.slug}`"
              class="w-full h-full rounded-lg flex flex-col group"
            >
              <div class="relative flex flex-col">
                <div class="w-full h-auto flex flex-col gap-y-4">
                  <figure class="w-full h-auto lg:h-auto">
                    <!-- src="/assets/images/blog/new-example.png" -->
                    <img
                      :src="newestBlog.cover"
                      alt="Newest Blog Cover"
                      class="w-full h-full object-center object-fill rounded-[10px]"
                    />
                  </figure>
                  <div class="w-full h-auto flex flex-row justify-between">
                    <div class="w-full h-auto flex justify-start items-center">
                      <p
                        class="text-[12px] sm:text-[14px] text-[#6941C6] dark:text-[#2AB857] bg-[#7B61FF]/10 dark:bg-transparent px-4 py-1 dark:px-0 rounded-full"
                      >
                        {{ newestBlog.category_name }}
                      </p>
                    </div>
                    <div class="w-full h-auto flex justify-end items-center">
                      <p
                        class="text-[12px] sm:text-[14px] text-[#FFFFFF] bg-[#3758F9] px-2 py-1 rounded-md"
                      >
                        <!-- Mar 05, 2024 -->
                        {{ utils.fromISODate(newestBlog.created_at) }}
                      </p>
                    </div>
                  </div>
                  <div class="w-full h-auto flex flex-col gap-y-3">
                    <div
                      class="w-full h-auto transition-all duration-300 ease-in"
                    >
                      <p
                        class="text-[16px] sm:text-[16px] lg:text-[20px] text-[#111928] font-[500] dark:font-[600] dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-[#FAFAFA] dark:via-[#D4D4D4] dark:to-[#AAAAAA]"
                      >
                        {{ newestBlog.title }}
                      </p>
                    </div>
                    <div class="w-full h-auto">
                      <p
                        class="text-[14px] lg:text-[16px] text-[#637381] font-[400] break-words line-clamp-3"
                      >
                        {{ newestBlog.synopsis }}
                      </p>
                    </div>
                    <div class="w-full h-auto">
                      <p
                        class="text-[14px] sm:text-[16px] text-[#535862] dark:text-[#637381]"
                      >
                        Author:
                        <span class="font-[600]">{{
                          newestBlog.author_name
                        }}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </router-link>
            <div class="relative w-full h-auto flex flex-row mt-4 mb-0 lg:mb-4">
              <div class="w-auto flex flex-row gap-x-3 justify-start">
                <div class="flex flex-row justify-between gap-x-1">
                  <div class="w-full h-auto text-[#6E6E6E] dark:text-[#637381]">
                    <EyeIcon />
                  </div>
                  <div class="w-full h-auto">
                    <span class="text-[#6E6E6E] dark:text-[#637381]">
                      {{ utils.shortNumber(newestBlog.views) }}
                    </span>
                  </div>
                </div>
                <div class="flex flex-row justify-between gap-x-1">
                  <div class="w-full h-auto text-[#6E6E6E] dark:text-[#637381]">
                    <CommentIcon />
                  </div>
                  <div class="w-full h-auto">
                    <span class="text-[#6E6E6E] dark:text-[#637381]">
                      {{ newestBlog.comments }}
                    </span>
                  </div>
                </div>
                <div class="relative flex w-full h-auto share-wrapper">
                  <div
                    class="w-auto h-auto text-[#6E6E6E] dark:text-[#637381] cursor-pointer"
                    @click.stop="toggleShare('newest-' + newestBlog.id)"
                  >
                    <ShareIcon />
                  </div>

                  <div
                    v-show="activeShareId === 'newest-' + newestBlog.id"
                    class="absolute z-30 -left-[80px] -bottom-[210px] md:-bottom-[210px] lg:-bottom-[220px] xl:-bottom-[230px] w-[180px] h-auto"
                  >
                    <div class="relative">
                      <img
                        src="@/assets/images/blog/share-frame2.svg"
                        alt=""
                        srcset=""
                        class="w-full h-auto object-cover relative"
                      />
                      <div
                        class="absolute w-full h-full top-3 px-5 flex flex-col gap-y-3 justify-center"
                      >
                        <div
                          class="w-full h-auto cursor-pointer flex flex-row gap-x-3"
                          @click="copyLink(newestBlog.slug)"
                        >
                          <div class="w-auto h-auto">
                            <img
                              src="@/assets/images/blog/copy-link.svg"
                              alt=""
                              srcset=""
                            />
                          </div>
                          <div class="w-[70%] h-auto flex items-center">
                            Copy Link
                          </div>
                        </div>
                        <div class="w-full h-[1px] bg-[#EBEBEB]" />
                        <div
                          class="w-full h-auto flex flex-col gap-y-5 cursor-pointer"
                        >
                          <!-- Linked In -->
                          <div
                            class="w-full h-auto cursor-pointer flex flex-row gap-x-3"
                          >
                            <div class="w-auto h-auto">
                              <img
                                src="@/assets/images/blog/linkedin.png"
                                alt=""
                                srcset=""
                              />
                            </div>
                            <div class="w-[70%] h-auto flex items-center">
                              LinkedIn
                            </div>
                          </div>
                          <!-- Facebook -->
                          <div
                            class="w-full h-auto cursor-pointer flex flex-row gap-x-3"
                          >
                            <div class="w-auto h-auto">
                              <img
                                src="@/assets/images/blog/facebook.png"
                                alt=""
                                srcset=""
                              />
                            </div>
                            <div class="w-[70%] h-auto flex items-center">
                              Facebook
                            </div>
                          </div>
                          <!-- Twitter -->
                          <div
                            class="w-full h-auto cursor-pointer flex flex-row gap-x-3"
                          >
                            <div class="w-auto h-auto">
                              <img
                                src="@/assets/images/blog/twitter.png"
                                alt=""
                                srcset=""
                              />
                            </div>
                            <div class="w-[70%] h-auto flex items-center">
                              Twitter(X)
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Most Popular Desktop -->
      <div
        class="hidden lg:flex lg:col-span-4 w-full h-auto bg-[#D9D9D9] !p-[1px] dark:bg-gradient-to-tr dark:from-[#17181A] dark:from-45% dark:to-[#565656] rounded-lg"
      >
        <div
          class="lg:flex lg:flex-col lg:col-span-4 w-full h-auto rounded-lg gap-y-0 bg-[#FAFAFA] dark:bg-[#1D1F23]"
        >
          <div class="w-full h-auto pt-6 px-6">
            <p
              class="text-[#195279] font-[500] lg:text-[22px] justify-center dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-[#FAFAFA] dark:via-[#D4D4D4] dark:to-[#AAAAAA]"
            >
              Most Popular
            </p>
          </div>
          <!-- Loading -->
          <div v-if="loading">Loading Data</div>
          <!-- Error Global -->
          <div v-else-if="error">{{ error }}</div>
          <!-- popularError -->
          <div v-else-if="popularError" class="px-6 pt-4">
            {{ popularError }}
          </div>
          <div v-else-if="popularBlog" class="flex flex-col w-full h-full mt-4">
            <!-- ✅ Hanya tampilkan gambar dari data pertama -->
            <router-link
              v-if="popularBlog.length > 0"
              :to="`/blog/${popularBlog[0].slug}`"
              class="w-full h-auto"
            >
              <figure class="w-full h-auto">
                <img
                  :src="popularBlog[0].cover"
                  alt="cover"
                  class="w-full h-auto object-fill"
                />
              </figure>
            </router-link>
            <!-- ✅ Daftar lainnya -->
            <div class="flex flex-col w-full h-full">
              <div
                v-for="(data, index) in popularBlog"
                :key="index"
                class="w-full flex flex-col items-center"
              >
                <router-link :to="`/blog/${data.slug}`" class="w-full">
                  <div
                    class="w-full h-auto grid grid-cols-12 pr-10 py-4 justify-start"
                  >
                    <div class="col-span-3 w-full flex justify-center">
                      <p class="text-[24px] text-[#8EB3CC]">#{{ index + 1 }}</p>
                    </div>
                    <div class="col-span-9 w-full flex flex-col gap-y-1">
                      <p class="text-[#6941C6] dark:text-[#2AB857] text-[14px]">
                        {{ data.category_name }}
                      </p>
                      <p
                        class="text-[#195279] h-[45px] font-[500] text-[16px] leading-snug line-clamp-2 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-[#FAFAFA] dark:via-[#D4D4D4] dark:to-[#AAAAAA]"
                      >
                        {{ data.title }}
                      </p>
                      <p class="text-[#B8B8B8] dark:text-[#6F6F6F] text-[12px]">
                        {{ data.author_name }} |
                        {{ utils.fromISODate(data.created_at) }}
                      </p>
                    </div>
                  </div>
                </router-link>
                <div
                  v-if="index !== popularBlog.length - 1"
                  class="w-full h-[0.5px] bg-[#D9D9D9] dark:bg-[#565656]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- Most Popular Mobile -->
    <div class="relative flex flex-col lg:hidden w-full h-auto mt-10 py-4">
      <div class="w-full h-auto px-8">
        <p
          class="text-[#195279] font-[500] sm:text-[20px] md:text-[24px] justify-center dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-[#FAFAFA] dark:via-[#D4D4D4] dark:to-[#AAAAAA]"
        >
          Most Popular
        </p>
      </div>
      <div
        class="relative flex flex-row w-full h-auto gap-x-4 sm:gap-x-4 md:gap-x-8 overflow-x-auto snap-x snap-mandatory mt-3 pb-10 pl-8 pr-8 hide-scrollbar"
      >
        <div v-if="loading">Loading Data</div>
        <div v-else-if="error" class="px-6">{{ error }}</div>
        <div
          v-else
          v-for="(data, index) in popularBlog"
          :key="index"
          class="snap-center shrink-0 relative cursor-default h-auto shadow-md rounded-lg bg-white !p-[1px] dark:bg-gradient-to-bl dark:from-[#17181A] dark:from-25% dark:to-[#565656]"
          :class="popularBlog.length === 1 ? 'w-full' : 'w-full md:w-[650px]'"
        >
          <!-- Card -->
          <router-link :to="`/blog/${data.slug}`">
            <div
              class="relative h-full w-full p-4 cursor-default shadow-md rounded-lg bg-white dark:bg-[#1D1F23]"
            >
              <div
                class="absolute z-20 w-14 h-8 flex justify-center items-center bg-[#1AB24F] top-0 right-0 rounded-bl-lg rounded-tr-lg"
              >
                <p class="text-white text-[16px]">#{{ index + 1 }}</p>
              </div>
              <div
                class="relative w-full h-full flex flex-row items-center justify-center gap-x-4 rounded-lg"
              >
                <div class="w-[40%] h-full flex items-center rounded-lg">
                  <img
                    :src="data.cover"
                    alt=""
                    class="w-full h-full rounded-lg"
                  />
                </div>
                <div
                  class="w-[60%] sm:h-full flex flex-col items-start gap-y-2 rounded-lg justify-between"
                >
                  <div class="w-full h-[20%] flex items-center">
                    <p
                      class="text-[12px] sm:text-[12px] md:text-[14px] text-[#6941C6] dark:text-[#2AB857] bg-[#7B61FF]/10 dark:bg-transparent px-4 dark:px-0 rounded-full w-auto h-full flex items-center"
                    >
                      {{ data.category_name }}
                    </p>
                  </div>
                  <div class="w-full h-full flex flex-col items-center gap-y-3">
                    <div class="w-full h-[40px] flex items-center">
                      <p
                        class="text-[14px] lg:text-[16px] text-[#111928] leading-tight font-[500] dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-[#FAFAFA] dark:via-[#D4D4D4] dark:to-[#AAAAAA] line-clamp-2"
                      >
                        {{ data.title }}
                      </p>
                    </div>
                    <div class="w-full h-auto flex items-start">
                      <p
                        class="text-[12px] md:text-[12px] leading-tight line-clamp-2 lg:line-clamp-3 text-[#637381]"
                      >
                        {{ data.synopsis }}
                      </p>
                    </div>
                  </div>
                  <div
                    class="hidden w-full h-auto sm:flex flex-row items-center"
                  >
                    <div class="w-full h-[40px] flex items-end">
                      <p
                        class="text-[12px] md:text-[14px] text-[#535862] dark:text-[#6F6F6F]"
                      >
                        <span class="font-[600]">{{ data.author_name }}</span> |
                        {{ utils.fromISODate(data.created_at) }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
    <!-- BlogList -->
    <section
      class="relative z-0 w-full h-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:mt-10 gap-5 mb-20 px-8 md:px-8 xl:px-0 pb-20"
    >
      <div v-if="loading">Loading Data</div>
      <div v-else-if="error" class="px-6">{{ error }}</div>
      <div
        v-else
        v-for="(data, index) in blogs"
        :key="index"
        class="relative w-full h-full !p-[1px] rounded-[10px] bg-[#D9D9D9] dark:bg-gradient-to-tr dark:from-[#17181A] dark:from-35% dark:to-[#565656]"
      >
        <div class="w-full h-auto flex flex-col">
          <div
            class="flex flex-col w-full h-full p-4 rounded-[10px] bg-[#FAFAFA] dark:bg-[#1D1F23]"
          >
            <router-link :to="`/blog/${data.slug}`">
              <div class="w-full h-[140px] lg:h-[180px]">
                <img
                  :src="data.cover"
                  alt="BlogImage"
                  class="w-full h-full object-fill rounded-[10px]"
                />
              </div>
              <div
                class="flex flex-row w-full h-auto justify-between text-sm text-[#7A7A7A] my-5"
              >
                <div
                  class="flex items-center bg-[#7B61FF]/10 dark:bg-transparent px-4 dark:px-0 rounded-[16px]"
                >
                  <p
                    class="md:text-[14px] lg:text-[14px] text-[#7B61FF] dark:text-[#FFFFFF] font-semibold"
                  >
                    {{ data.category_name }}
                  </p>
                </div>
                <div
                  class="flex items-center bg-[#3758F9] px-5 py-1 rounded-[5px]"
                >
                  <p class="text-[#FFFFFF] md:text-[12px] lg:text-[14px]">
                    {{ utils.fromISODate(data.created_at) }}
                  </p>
                </div>
              </div>
              <div
                class="flex w-full h-[50px] sm:h-[45px] md:h-[50px] lg:h-[55px] text-left overflow-hidden"
              >
                <p
                  class="sm:text-[14px] md:text-[16px] lg:text-[18px] font-[500] text-[#111928] dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-br dark:from-[#FAFAFA] dark:via-[#D4D4D4] dark:to-[#AAAAAA] line-clamp-2"
                >
                  {{ data.title }}
                </p>
              </div>
              <div class="flex w-full h-auto justify-start items-start my-3">
                <p
                  class="text-[12px] lg:text-[14px] text-[#637381] line-clamp-3 lg:line-clamp-2"
                >
                  {{ data.synopsis }}
                </p>
              </div>
            </router-link>
            <div class="relative w-full h-auto flex flex-row mt-4 mb-0">
              <div class="w-auto flex flex-row gap-x-3 justify-start">
                <div class="flex flex-row justify-between gap-x-1">
                  <div class="w-full h-auto text-[#6E6E6E] dark:text-[#637381]">
                    <EyeIcon />
                  </div>
                  <div class="w-full h-auto">
                    <span class="text-[#6E6E6E] dark:text-[#637381]">
                      {{ utils.shortNumber(data.views) }}
                    </span>
                  </div>
                </div>
                <div class="flex flex-row justify-between gap-x-1">
                  <div class="w-full h-auto text-[#6E6E6E] dark:text-[#637381]">
                    <CommentIcon />
                  </div>
                  <div class="w-full h-auto">
                    <span class="text-[#6E6E6E] dark:text-[#637381]">
                      {{ data.comments }}
                    </span>
                  </div>
                </div>
                <div class="relative flex w-full h-auto share-wrapper">
                  <div
                    class="w-auto h-auto text-[#6E6E6E] dark:text-[#637381] cursor-pointer"
                    @click.stop="toggleShare(data.id)"
                  >
                    <ShareIcon />
                  </div>
                  <div
                    v-show="activeShareId === data.id"
                    class="absolute z-30 -left-[77px] md:-left-[80px] -bottom-[230px] md:-bottom-[230px] lg:-bottom-[220px] xl:-bottom-[230px] w-[180px] h-auto"
                  >
                    <div class="relative">
                      <img
                        src="@/assets/images/blog/share-frame2.svg"
                        alt=""
                        srcset=""
                        class="w-full h-auto object-cover relative"
                      />
                      <div
                        class="absolute w-full h-full top-3 px-5 flex flex-col gap-y-3 justify-center"
                      >
                        <div
                          class="w-full h-auto cursor-pointer flex flex-row gap-x-3"
                          @click="copyLink(data.slug)"
                        >
                          <div class="w-auto h-auto">
                            <img
                              src="@/assets/images/blog/copy-link.svg"
                              alt=""
                              srcset=""
                            />
                          </div>
                          <div class="w-[70%] h-auto flex items-center">
                            Copy Link
                          </div>
                        </div>
                        <div class="w-full h-[1px] bg-[#EBEBEB]" />
                        <div
                          class="w-full h-auto flex flex-col gap-y-5 cursor-pointer"
                        >
                          <!-- Linked In -->
                          <div
                            class="w-full h-auto cursor-pointer flex flex-row gap-x-3"
                          >
                            <div class="w-auto h-auto">
                              <img
                                src="@/assets/images/blog/linkedin.png"
                                alt=""
                                srcset=""
                              />
                            </div>
                            <div class="w-[70%] h-auto flex items-center">
                              LinkedIn
                            </div>
                          </div>
                          <!-- Facebook -->
                          <div
                            class="w-full h-auto cursor-pointer flex flex-row gap-x-3"
                          >
                            <div class="w-auto h-auto">
                              <img
                                src="@/assets/images/blog/facebook.png"
                                alt=""
                                srcset=""
                              />
                            </div>
                            <div class="w-[70%] h-auto flex items-center">
                              Facebook
                            </div>
                          </div>
                          <!-- Twitter -->
                          <div
                            class="w-full h-auto cursor-pointer flex flex-row gap-x-3"
                          >
                            <div class="w-auto h-auto">
                              <img
                                src="@/assets/images/blog/twitter.png"
                                alt=""
                                srcset=""
                              />
                            </div>
                            <div class="w-[70%] h-auto flex items-center">
                              Twitter(X)
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- </div> -->
  </div>
</template>
