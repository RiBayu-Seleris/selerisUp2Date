<script setup>
import {
  ref,
  computed,
  onMounted,
  onBeforeUnmount,
  watch,
  nextTick,
} from "vue";
import axios from "axios";
import { blogsApi } from "@/consumeAPI/blogsApi";
import Swal from "sweetalert2";

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

// state dropdown
const isCategoryOpen = ref(false);
const selectedCategory = ref("All Articles");
const isPostTimeOpen = ref(false);
const selectedPostTime = ref({
  id: 1,
  name: "Latest", // untuk UI
  value: "updated_at", // untuk API
});
const showDateRange = ref(false);
const activeShareId = ref(null);

const PostsTime = [
  {
    id: 1,
    name: "Latest", // tampil di UI
    value: "updated_at", // dikirim ke API
  },
  {
    id: 2,
    name: "Oldest",
    value: "oldest",
  },
  {
    id: 3,
    name: "Views",
    value: "views",
  },
  // {
  //   id: 4,
  //   name: "Likes",
  //   value: "likes"
  // }
];

const customDateRange = ref({
  start: "",
  end: "",
});

const searchQuery = ref(""); // Search Input
let timeout = null; // timer untuk manual delay / "debounce"
let lastSearchId = 0;
const results = ref([]); // 🔥 state untuk simpan hasil
const loadingTyping = ref(false); //State loading untuk search query

// CopyLink
const route = useRoute();
const copied = ref(false);

const {
  categories,
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
  fetchCategory,
  pagination,
} = blogsApi();

const dummyPagination = {
  current_page: 1,
  last_page: 5,
};

const logoContainer = ref(null);
const maxHeight = ref(0);

const updateMaxHeight = async () => {
  await nextTick();
  if (!logoContainer.value) return;

  const height = logoContainer.value.scrollHeight;

  // Simpan tinggi terbesar yang pernah dicapai
  if (height > maxHeight.value) {
    maxHeight.value = height;
  }
};

const changePage = async (page) => {
  if (page < 1 || page > pagination.value.last_page) return;

  // Tunggu data baru dimuat (pastikan getAllBlogs mengembalikan Promise)
  await getAllBlogs({ ...buildParams(), page });

  // Tunggu DOM selesai update
  await nextTick();

  const section = document.getElementById("blogSection");
  if (section) {
    const width = window.innerWidth;
    let offset = 130; // default offset

    // Kamu bisa aktifkan logika dinamis lagi kalau mau:
    // if (width >= 1280) offset = 130;
    // else if (width >= 1024) offset = 120;
    // else if (width >= 768) offset = 110;
    // else offset = 100;

    const y = section.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({ top: y, behavior: "smooth" });
  }
};

// bikin URL lengkap berdasarkan slug
const blogUrl = `${window.location.origin}/blog/${newestBlog.slug}`;

const copyLink = async (slug) => {
  const blogUrl = `${window.location.origin}/blog/${slug}`;

  try {
    // ✅ Salin ke clipboard
    await navigator.clipboard.writeText(blogUrl);

    // ✅ Notifikasi sukses
    Swal.fire({
      icon: "success",
      title: "Link berhasil disalin!",
      text: "Bagikan ke temanmu 🚀",
      toast: true,
      position: "bottom", // 👈 Lebih umum untuk toast-style
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
    });
  } catch (err) {
    console.warn("Clipboard error (kemungkinan false error):", err);

    // ⚠️ Jika navigator.clipboard tidak diizinkan
    try {
      const textArea = document.createElement("textarea");
      textArea.value = blogUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
    } catch (fallbackErr) {
      console.error("Fallback copy gagal:", fallbackErr);
    }

    Swal.fire({
      icon: "info",
      title: "Link disalin (mungkin dengan peringatan)",
      text: "Jika tidak tersalin, coba tekan Ctrl + C.",
      toast: true,
      position: "bottom",
      showConfirmButton: false,
      timer: 2500,
      timerProgressBar: true,
    });
  }
};

const buildParams = () => {
  const params = {};

  // Filter kategori
  if (selectedCategory.value && selectedCategory.value !== "All Articles") {
    const categoryObj = categories.value.find(
      (c) => c.name === selectedCategory.value
    );
    if (categoryObj) params.category_id = categoryObj.id;
  }

  // Filter pencarian
  if (searchQuery.value) {
    params.search = searchQuery.value.trim();
  }

  // Filter sorting
  if (selectedPostTime.value?.value) {
    params.sort_by = selectedPostTime.value.value;
  }

  // Filter rentang tanggal
  if (customDateRange.value.start && customDateRange.value.end) {
    params.start_date = customDateRange.value.start;
    params.end_date = customDateRange.value.end;
  }

  return params;
};

const toggleDateRange = () => {
  showDateRange.value = !showDateRange.value;
};

// toggle dropdown
const toggleCategory = () => {
  isCategoryOpen.value = !isCategoryOpen.value;
  isPostTimeOpen.value = false;
  activeShareId.value = null;
};

const togglePostTime = () => {
  isPostTimeOpen.value = !isPostTimeOpen.value;
  isCategoryOpen.value = false;
  activeShareId.value = null;
};

// toggle share
const toggleShare = (id) => {
  activeShareId.value = activeShareId.value === id ? null : id;
  isCategoryOpen.value = false;
  isPostTimeOpen.value = false;
};

// pilih opsi
const chooseCategory = (category) => {
  selectedCategory.value = category.name;
  isCategoryOpen.value = false;
  getAllBlogs(buildParams());
};

const chooseSort = (post) => {
  selectedPostTime.value = post; // simpan seluruh object { name, value }
  isPostTimeOpen.value = false;
  getAllBlogs(buildParams());
};

const choosePostTime = (option) => {
  selectedPostTime.value = option;
  isPostTimeOpen.value = false;
};

// helper untuk cek klik di luar
const isClickOutside = (selector, event) => {
  const elements = document.querySelectorAll(selector);
  return ![...elements].some((el) => el.contains(event.target));
};

// klik luar → tutup semua
const handleClickOutside = (event) => {
  if (isClickOutside(".category-box", event)) {
    isCategoryOpen.value = false;
  }
  if (isClickOutside(".posttime-box", event)) {
    isPostTimeOpen.value = false;
  }
  if (isClickOutside(".share-wrapper", event)) {
    activeShareId.value = null;
  }
  if (isClickOutside(".daterange-box", event)) {
    showDateRange.value = false; // ✅ tutup date range
  }
};

onMounted(() => {
  getAllBlogs();
  getNewestBlog();
  getPopularBlog();
  fetchCategory();
  document.addEventListener("click", handleClickOutside);

  // Hitung tinggi awal
  nextTick(() => updateMaxHeight());
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});

// 🔍 Watch untuk search query (dengan debounce)
watch(searchQuery, (newQuery) => {
  clearTimeout(timeout);
  const currentSearchId = ++lastSearchId; // Cegah race condition

  // Kalau user hapus semua teks → reset blog
  if (!newQuery) {
    loadingTyping.value = false;
    getAllBlogs(buildParams()); // Ambil ulang semua blog default
    return;
  }

  // Aktifkan indikator "mengetik"
  loadingTyping.value = true;

  // Debounce 500ms
  timeout = setTimeout(async () => {
    try {
      const params = buildParams();
      // console.log("🔍 Search triggered with params:", params);

      await getAllBlogs(params);
    } finally {
      // Pastikan hanya request terbaru yang menonaktifkan loading
      if (currentSearchId === lastSearchId) {
        loadingTyping.value = false;
      }
    }
  }, 500);
});

// 📅 Watch untuk date range (update & reset otomatis)
watch(
  customDateRange,
  async (newVal) => {
    const hasBothDates = newVal.start && newVal.end;

    if (hasBothDates) {
      // console.log("📆 Date range changed:", newVal.start, "→", newVal.end);
    } else {
      // console.log("🧹 Date range cleared — reset ke semua blog");
    }

    const params = buildParams();
    // console.log("API Params (date range):", params);
    await getAllBlogs(params);
  },
  { deep: true }
);

// 🔁 Pantau setiap kali daftar blog berubah (misal pagination)
watch(
  () => blogs.value,
  async () => {
    await updateMaxHeight();
  },
  { deep: true }
);
</script>

<template>
  <section
    class="flex flex-col relative w-full h-auto lg:max-w-2xl mx-auto px-8 md:px-8 lg:px-0"
  >
    <!-- Search Frame -->
    <div
      class="w-full h-auto rounded-[5px] bg-[#D9D9D9] p-[1px] dark:bg-[#565656]"
    >
      <div
        class="w-full h-14 flex flex-row items-center bg-[#FAFAFA] dark:bg-[#17181A] px-4 md:px-4 rounded-[5px] gap-x-2 md:gap-x-3 lg:gap-x-3 xl:gap-x-2.5"
      >
        <div
          class="w-[10%] sm:w-[15%] md:w-[5%] h-full flex justify-center items-center text-[#6C6C6C] dark:text-[#ADADAD]"
        >
          <SearchIcon />
        </div>
        <div class="w-full h-full">
          <input
            v-model="searchQuery"
            type="text"
            class="bg-transparent outline-none w-full h-full text-[#6C6C6C] dark:text-[#ADADAD]"
            placeholder="Search Article..."
          />
        </div>
      </div>
    </div>

    <div class="w-full h-auto grid grid-cols-12 gap-x-2 mt-5">
      <!-- Category -->
      <div
        class="col-span-6 sm:col-span-4 h-full rounded-[5px] bg-[#D9D9D9] p-[1px] dark:bg-[#565656]"
      >
        <div
          class="category-box relative w-full h-full bg-[#FAFAFA] dark:bg-[#17181A] rounded-[5px]"
        >
          <div
            @click="toggleCategory"
            class="w-full h-full flex flex-row items-center px-5 py-2 rounded-[5px] justify-between cursor-pointer select-none"
          >
            <p class="text-[#6C6C6C] dark:text-[#ADADAD]">
              {{ selectedCategory }}
            </p>
            <ChevronDown
              :class="isCategoryOpen ? 'rotate-180 transition' : 'transition'"
            />
          </div>
          <!-- List dropdown -->
          <div
            v-if="isCategoryOpen"
            class="absolute left-0 top-12 mt-1 w-full rounded-[5px] shadow bg-white dark:bg-[#565656] z-10 p-[1px]"
          >
            <div class="w-full h-auto rounded-[5px] bg-white dark:bg-[#17181A]">
              <div
                v-for="(category, index) in categories"
                :key="index"
                @click.stop="chooseCategory(category)"
                class="px-5 py-2 hover:bg-white hover:text-[#17181A] text-[#6C6C6C] dark:text-[#ADADAD] cursor-pointer rounded-[5px]"
              >
                {{ category.name }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- PostTime -->
      <div
        class="col-span-6 sm:col-span-4 h-full rounded-[5px] bg-[#D9D9D9] p-[1px] dark:bg-[#565656]"
      >
        <div
          class="posttime-box relative w-full h-full bg-[#FAFAFA] dark:bg-[#17181A] rounded-[5px]"
        >
          <div
            @click="togglePostTime"
            class="w-full h-full flex flex-row items-center px-5 py-2 rounded-[5px] justify-between cursor-pointer select-none"
          >
            <p class="capitalize text-[#6C6C6C] dark:text-[#ADADAD]">
              {{ selectedPostTime.name }}
            </p>
            <ChevronDown
              :class="isPostTimeOpen ? 'rotate-180 transition' : 'transition'"
            />
          </div>

          <!-- List dropdown -->
          <div
            v-if="isPostTimeOpen"
            class="absolute left-0 top-12 mt-1 w-full rounded-[5px] shadow bg-white dark:bg-[#565656] z-10 p-[1px]"
          >
            <div class="w-full h-auto rounded-[5px] bg-white dark:bg-[#17181A]">
              <div
                v-for="(post, index) in PostsTime"
                :key="index"
                @click.stop="chooseSort(post)"
                class="px-5 py-2 hover:bg-white hover:text-[#17181A] text-[#6C6C6C] dark:text-[#ADADAD] cursor-pointer capitalize"
              >
                {{ post.name }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Custom Date -->
      <div
        class="col-span-12 sm:col-span-4 h-full rounded-[5px] bg-[#D9D9D9] p-[1px] dark:bg-[#565656] mt-3 sm:mt-0"
      >
        <div
          class="daterange-box relative w-full h-full bg-[#FAFAFA] dark:bg-[#17181A] rounded-[5px]"
        >
          <div
            @click="toggleDateRange"
            class="w-full h-full flex flex-row items-center px-6 sm:px-3 py-2 rounded-[5px] justify-between cursor-pointer select-none"
          >
            <div class="flex items-center">
              <span
                class="flex items-center text-[14px]"
                :class="[
                  customDateRange.start && customDateRange.end
                    ? 'text-[12px] text-[#6C6C6C] dark:text-[#ADADAD]'
                    : 'capitalize text-[#6C6C6C] dark:text-[#ADADAD]',
                ]"
              >
                {{
                  customDateRange.start && customDateRange.end
                    ? utils.fromISODate(customDateRange.start) +
                      " - " +
                      utils.fromISODate(customDateRange.end)
                    : "Start Date - End Date"
                }}
              </span>
            </div>
            <!-- Ikon kalender -->
            <div class="flex items-center">
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

          <!-- Dropdown Date Range -->
          <div
            v-if="showDateRange"
            class="absolute right-0 top-12 mt-1 w-auto rounded-[5px] shadow bg-white dark:bg-[#565656] z-10 p-[1px]"
          >
            <div
              class="w-full h-auto rounded-[5px] bg-white dark:bg-[#17181A] p-3"
            >
              <div class="flex w-auto flex-row items-center gap-x-1">
                <!-- Start Date -->
                <input
                  type="date"
                  v-model="customDateRange.start"
                  class="w-full border rounded px-2 py-1 text-[14px] text-[#6C6C6C] dark:text-black"
                />
                <span>-</span>
                <!-- End Date -->
                <input
                  type="date"
                  v-model="customDateRange.end"
                  class="w-full border rounded px-2 py-1 text-[14px] text-[#6C6C6C] dark:text-black"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Loading Search Query Section -->
  <div
    v-if="loadingTyping"
    class="w-full h-auto lg:px-0 pt-4 flex justify-center"
  >
    <!-- Loader Frame -->
    <video
      autoplay
      loop
      muted
      playsinline
      @contextmenu.prevent
      class="w-[250px] h-[250px] md:w-[300px] md:h-[300px] lg:w-[200px] lg:h-[200px] object-cover object-center dark:hidden"
    >
      <source src="@/assets/videos/loading.mp4" type="video/mp4" />
    </video>

    <video
      autoplay
      loop
      muted
      playsinline
      @contextmenu.prevent
      class="w-[250px] h-[250px] md:w-[300px] md:h-[300px] lg:w-[200px] lg:h-[200px] object-cover object-center hidden dark:flex"
    >
      <source src="@/assets/videos/dark-loading.mp4" type="video/mp4" />
    </video>
  </div>

  <!-- Search Result -->
  <div
    v-else-if="blogs.length && searchQuery && !loadingTyping"
    class="w-full h-auto mt-5"
  >
    <section
      class="relative z-0 w-full h-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:mt-10 gap-5 px-8 md:px-8 xl:px-0"
    >
      <div
        v-for="(data, index) in blogs"
        :key="index"
        class="relative w-full h-full !p-[1px] rounded-[10px] bg-[#D9D9D9] dark:bg-gradient-to-tr dark:from-[#17181A] dark:from-35% dark:to-[#565656]"
      >
        <div class="w-full h-auto flex flex-col">
          <div
            class="flex flex-col w-full h-full p-4 rounded-[10px] bg-[#FAFAFA] dark:bg-[#1D1F23]"
          >
            <router-link :to="`/blog/${data.slug}`">
              <div class="w-full h-auto lg:h-[160px]">
                <img
                  :src="data.cover"
                  alt="BlogImage"
                  class="w-full h-full object-cover lg:object-fill rounded-[10px]"
                />
              </div>
              <div
                class="flex flex-row w-full h-auto justify-between text-sm text-[#7A7A7A] my-5"
              >
                <div
                  class="flex items-center bg-[#7B61FF]/10 dark:bg-transparent px-4 dark:px-0 rounded-[16px]"
                >
                  <p
                    class="text-[12px] md:text-[14px] lg:text-[14px] text-[#7B61FF] dark:text-[#FFFFFF] font-semibold"
                  >
                    {{ data.category_name }}
                  </p>
                </div>
                <div
                  class="flex items-center bg-[#3758F9] px-5 py-1 rounded-[5px]"
                >
                  <p
                    class="text-[#FFFFFF] text-[12px] md:text-[12px] lg:text-[14px]"
                  >
                    {{ utils.fromISODate(data.created_at) }}
                  </p>
                </div>
              </div>
              <div
                class="flex w-full h-auto sm:h-[45px] md:h-[50px] lg:h-[55px] text-left overflow-hidden"
              >
                <p
                  class="text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] font-[500] text-[#111928] dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-br dark:from-[#FAFAFA] dark:via-[#D4D4D4] dark:to-[#AAAAAA] line-clamp-2"
                >
                  {{ data.title }}
                </p>
              </div>
              <div class="flex w-full h-auto justify-start items-start my-3">
                <p
                  class="text-[12px] lg:text-[14px] text-[#637381] line-clamp-2 lg:line-clamp-2"
                >
                  {{ data.synopsis }}
                </p>
              </div>
            </router-link>
            <div class="relative w-full h-auto flex flex-row mt-4 mb-0 xl:mb-0">
              <div class="w-auto flex flex-row gap-x-3 justify-start">
                <router-link
                  :to="`/blog/${data.slug}`"
                  class="flex flex-row justify-between gap-x-1"
                >
                  <div
                    class="w-full h-auto text-[#6E6E6E] dark:text-[#637381] flex items-center"
                  >
                    <EyeIcon class="w-5 h-5 sm:w-auto sm:h-auto" />
                  </div>
                  <div class="w-full h-full flex items-center">
                    <span
                      class="text-[14px] text-[#6E6E6E] dark:text-[#637381]"
                    >
                      {{ utils.shortNumber(newestBlog.views) }}
                    </span>
                  </div>
                </router-link>
                <router-link
                  :to="`/blog/${data.slug}`"
                  class="flex flex-row justify-between gap-x-1"
                >
                  <div
                    class="w-full h-auto text-[#6E6E6E] dark:text-[#637381] flex items-center"
                  >
                    <CommentIcon class="w-5 h-5 sm:w-auto sm:h-auto" />
                  </div>
                  <div class="w-full h-auto">
                    <span
                      class="text-[14px] text-[#6E6E6E] dark:text-[#637381]"
                    >
                      {{ newestBlog.comments }}
                      <!-- 15 -->
                    </span>
                  </div>
                </router-link>
                <div class="relative flex w-full h-auto share-wrapper">
                  <div
                    class="w-auto h-auto text-[#6E6E6E] dark:text-[#637381] cursor-pointer flex items-center"
                    @click.stop="toggleShare(data.id)"
                  >
                    <ShareIcon class="w-5 h-5 sm:w-auto sm:h-auto" />
                  </div>
                  <div
                    v-show="activeShareId === data.id"
                    class="absolute z-30 -left-[65px] md:-left-[63px] lg:-left-[80px] -bottom-[190px] md:-bottom-[190px] lg:-bottom-[220px] xl:-bottom-[230px] w-[150px] lg:w-[180px] h-auto"
                  >
                    <div class="relative">
                      <img
                        src="@/assets/images/blog/share-frame2.svg"
                        alt=""
                        srcset=""
                        class="w-full h-auto object-cover relative"
                      />
                      <div
                        class="absolute w-full h-full top-2 lg:top-3 px-5 flex flex-col gap-y-2 sm:gap-y-3 justify-center"
                      >
                        <div
                          class="w-full h-auto cursor-pointer flex flex-row items-center gap-x-2 lg:gap-x-3"
                          @click="copyLink(data.slug)"
                        >
                          <div class="w-5 h-auto lg:w-auto lg:h-auto">
                            <img
                              src="@/assets/images/blog/copy-link.svg"
                              alt="Copy Link"
                            />
                          </div>
                          <div class="w-[70%] h-auto flex items-center">
                            <span class="text-[14px] text-[#8C8C8C]"
                              >Copy Link</span
                            >
                          </div>
                        </div>
                        <div class="w-full h-[1px] bg-[#EBEBEB]" />
                        <div
                          class="w-full h-auto flex flex-col gap-y-4 lg:gap-y-5 cursor-pointer"
                        >
                          <div
                            class="w-full h-auto cursor-pointer flex flex-row gap-x-2 lg:gap-x-3"
                          >
                            <div class="w-5 h-auto lg:w-auto lg:h-auto">
                              <img
                                src="@/assets/images/blog/linkedin.png"
                                alt=""
                                srcset=""
                              />
                            </div>
                            <div class="w-[70%] h-auto flex items-center">
                              <span class="text-[14px]">LinkedIn</span>
                            </div>
                          </div>
                          <div
                            class="w-full h-auto cursor-pointer flex flex-row gap-x-2 lg:gap-x-3"
                          >
                            <div class="w-5 h-auto lg:w-auto lg:h-auto">
                              <img
                                src="@/assets/images/blog/facebook.png"
                                alt=""
                                srcset=""
                              />
                            </div>
                            <div class="w-[70%] h-auto flex items-center">
                              <span class="text-[14px]">Facebook</span>
                            </div>
                          </div>
                          <div
                            class="w-full h-auto cursor-pointer flex flex-row gap-x-2 lg:gap-x-3"
                          >
                            <div class="w-5 h-auto lg:w-auto lg:h-auto">
                              <img
                                src="@/assets/images/blog/twitter.png"
                                alt=""
                                srcset=""
                              />
                            </div>
                            <div class="w-[70%] h-auto flex items-center">
                              <span class="text-[14px]">Twitter(X)</span>
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

    <!-- Pagination -->
    <div
      v-if="pagination?.last_page >= 1"
      class="pagination flex gap-2 justify-end px-8 xl:px-0 mb-20 mt-10"
    >
      <!-- Tombol Prev -->
      <button
        class="px-3 py-1 rounded bg-gray-300 text-gray-700 hover:bg-gray-400 transition disabled:opacity-50"
        :disabled="pagination.current_page === 1"
        @click="changePage(pagination.current_page - 1)"
      >
        Prev
      </button>

      <!-- Nomor halaman -->
      <button
        v-for="page in pagination.last_page"
        :key="page"
        class="px-3 py-1 rounded transition"
        :class="{
          'bg-blue-600 text-white': page === pagination.current_page,
          'bg-gray-200 hover:bg-gray-300': page !== pagination.current_page,
        }"
        @click="changePage(page)"
      >
        {{ page }}
      </button>

      <!-- Tombol Next -->
      <button
        class="px-3 py-1 rounded bg-gray-300 text-gray-700 hover:bg-gray-400 transition disabled:opacity-50"
        :disabled="pagination.current_page === pagination.last_page"
        @click="changePage(pagination.current_page + 1)"
      >
        Next
      </button>
    </div>
  </div>

  <!-- Search Result No Blog Found -->
  <div
    v-else-if="searchQuery && !blogs.length && !loadingTyping"
    class="w-full h-auto mt-5 text-center py-6 text-gray-500"
  >
    <p>
      Tidak ada artikel yang cocok dengan pencarian
      <template v-if="selectedCategory !== 'All Articles'">
        pada kategori <strong>{{ selectedCategory }}</strong>
      </template>
      <template v-if="customDateRange.start && customDateRange.end">
        pada rentang waktu {{ customDateRange.start }} -
        {{ customDateRange.end }}
      </template>
    </p>
  </div>

  <!-- 📅 4. Filter kategori atau date range aktif tapi hasil kosong -->
  <div
    v-else-if="
      !searchQuery &&
      (selectedCategory !== 'All Articles' ||
        customDateRange.start ||
        customDateRange.end) &&
      !blogs.length
    "
    class="w-full h-auto mt-5"
  >
    <p class="text-center text-[#6E6E6E]">
      Tidak ada artikel
      <template v-if="selectedCategory !== 'All Articles'">
        pada kategori <strong>{{ selectedCategory }}</strong>
      </template>
      <template v-if="customDateRange.start && customDateRange.end">
        dalam rentang tanggal {{ customDateRange.start }} -
        {{ customDateRange.end }}
      </template>
    </p>
  </div>

  <!-- Hasil Filter by Category -->
  <div
    v-else-if="
      selectedCategory !== 'All Articles' && blogs.length && !searchQuery
    "
    class="w-full h-auto mt-5"
  >
    <div
      class="relative z-0 w-full h-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:mt-10 gap-5 px-8 md:px-8 xl:px-0"
    >
      <div
        v-for="(data, index) in blogs"
        :key="index.id"
        class="relative w-full h-full !p-[1px] rounded-[10px] bg-[#D9D9D9] dark:bg-gradient-to-tr dark:from-[#17181A] dark:from-35% dark:to-[#565656]"
      >
        <div class="w-full h-auto flex flex-col">
          <div
            class="flex flex-col w-full h-full p-4 rounded-[10px] bg-[#FAFAFA] dark:bg-[#1D1F23]"
          >
            <router-link :to="`/blog/${data.slug}`">
              <div class="w-full h-auto xl:h-[170px]">
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
                    class="text-[12px] md:text-[14px] lg:text-[14px] text-[#7B61FF] dark:text-[#FFFFFF] font-semibold"
                  >
                    {{ data.category_name }}
                  </p>
                </div>
                <div
                  class="flex items-center bg-[#3758F9] px-5 py-1 rounded-[5px]"
                >
                  <p
                    class="text-[#FFFFFF] text-[12px] md:text-[12px] lg:text-[14px]"
                  >
                    {{ utils.fromISODate(data.created_at) }}
                  </p>
                </div>
              </div>
              <div
                class="flex w-full h-auto sm:h-[45px] md:h-[50px] lg:h-[55px] text-left overflow-hidden"
              >
                <p
                  class="text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] font-[500] text-[#111928] dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-br dark:from-[#FAFAFA] dark:via-[#D4D4D4] dark:to-[#AAAAAA] line-clamp-2"
                >
                  {{ data.title }}
                </p>
              </div>
              <div class="flex w-full h-auto justify-start items-start my-3">
                <p
                  class="text-[12px] lg:text-[14px] text-[#637381] line-clamp-2 lg:line-clamp-2"
                >
                  {{ data.synopsis }}
                </p>
              </div>
            </router-link>
            <div class="relative w-full h-auto flex flex-row mt-4 mb-0 xl:mb-0">
              <div class="w-auto flex flex-row gap-x-3 justify-start">
                <router-link
                  :to="`/blog/${data.slug}`"
                  class="flex flex-row justify-between gap-x-1"
                >
                  <div
                    class="w-full h-auto text-[#6E6E6E] dark:text-[#637381] flex items-center"
                  >
                    <EyeIcon class="w-5 h-5 sm:w-auto sm:h-auto" />
                  </div>
                  <div class="w-full h-full flex items-center">
                    <span
                      class="text-[14px] text-[#6E6E6E] dark:text-[#637381]"
                    >
                      {{ utils.shortNumber(data.views) }}
                    </span>
                  </div>
                </router-link>
                <router-link
                  :to="`/blog/${data.slug}`"
                  class="flex flex-row justify-between gap-x-1"
                >
                  <div
                    class="w-full h-auto text-[#6E6E6E] dark:text-[#637381] flex items-center"
                  >
                    <CommentIcon class="w-5 h-5 sm:w-auto sm:h-auto" />
                  </div>
                  <div class="w-full h-auto">
                    <span
                      class="text-[14px] text-[#6E6E6E] dark:text-[#637381]"
                    >
                      {{ data.comments }}
                    </span>
                  </div>
                </router-link>
                <div class="relative flex w-full h-auto share-wrapper">
                  <div
                    class="w-auto h-auto text-[#6E6E6E] dark:text-[#637381] cursor-pointer flex items-center"
                    @click.stop="toggleShare(data.id)"
                  >
                    <ShareIcon class="w-5 h-5 sm:w-auto sm:h-auto" />
                  </div>

                  <div
                    v-show="activeShareId === data.id"
                    class="absolute z-30 -left-[65px] md:-left-[63px] lg:-left-[80px] -bottom-[190px] md:-bottom-[190px] lg:-bottom-[220px] xl:-bottom-[230px] w-[150px] lg:w-[180px] h-auto"
                  >
                    <div class="relative">
                      <img
                        src="@/assets/images/blog/share-frame2.svg"
                        alt=""
                        srcset=""
                        class="w-full h-auto object-cover relative"
                      />
                      <div
                        class="absolute w-full h-full top-2 lg:top-3 px-5 flex flex-col gap-y-2 sm:gap-y-3 justify-center"
                      >
                        <div
                          class="w-full h-auto cursor-pointer flex flex-row items-center gap-x-2 lg:gap-x-3"
                          @click="copyLink(data.slug)"
                        >
                          <div class="w-5 h-auto lg:w-auto lg:h-auto">
                            <img
                              src="@/assets/images/blog/copy-link.svg"
                              alt="Copy Link"
                            />
                          </div>
                          <div class="w-[70%] h-auto flex items-center">
                            <span class="text-[14px] text-[#8C8C8C]"
                              >Copy Link</span
                            >
                          </div>
                        </div>
                        <div class="w-full h-[1px] bg-[#EBEBEB]" />
                        <div
                          class="w-full h-auto flex flex-col gap-y-4 lg:gap-y-5 cursor-pointer"
                        >
                          <!-- Linked In -->
                          <div
                            class="w-full h-auto cursor-pointer flex flex-row gap-x-2 lg:gap-x-3"
                          >
                            <div class="w-5 h-auto lg:w-auto lg:h-auto">
                              <img
                                src="@/assets/images/blog/linkedin.png"
                                alt=""
                                srcset=""
                              />
                            </div>
                            <div class="w-[70%] h-auto flex items-center">
                              <span class="text-[14px]">LinkedIn</span>
                            </div>
                          </div>
                          <!-- Facebook -->
                          <div
                            class="w-full h-auto cursor-pointer flex flex-row gap-x-2 lg:gap-x-3"
                          >
                            <div class="w-5 h-auto lg:w-auto lg:h-auto">
                              <img
                                src="@/assets/images/blog/facebook.png"
                                alt=""
                                srcset=""
                              />
                            </div>
                            <div class="w-[70%] h-auto flex items-center">
                              <span class="text-[14px]">Facebook</span>
                            </div>
                          </div>
                          <!-- Twitter -->
                          <div
                            class="w-full h-auto cursor-pointer flex flex-row gap-x-2 lg:gap-x-3"
                          >
                            <div class="w-5 h-auto lg:w-auto lg:h-auto">
                              <img
                                src="@/assets/images/blog/twitter.png"
                                alt=""
                                srcset=""
                              />
                            </div>
                            <div class="w-[70%] h-auto flex items-center">
                              <span class="text-[14px]">Twitter(X)</span>
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
    </div>

    <!-- Pagination -->
    <div
      v-if="pagination?.last_page >= 1"
      class="pagination flex gap-2 justify-end px-8 xl:px-0 mb-20 mt-10"
    >
      <!-- Tombol Prev -->
      <button
        class="px-3 py-1 rounded bg-gray-300 text-gray-700 hover:bg-gray-400 transition disabled:opacity-50"
        :disabled="pagination.current_page === 1"
        @click="changePage(pagination.current_page - 1)"
      >
        Prev
      </button>

      <!-- Nomor halaman -->
      <button
        v-for="page in pagination.last_page"
        :key="page"
        class="px-3 py-1 rounded transition"
        :class="{
          'bg-blue-600 text-white': page === pagination.current_page,
          'bg-gray-200 hover:bg-gray-300': page !== pagination.current_page,
        }"
        @click="changePage(page)"
      >
        {{ page }}
      </button>

      <!-- Tombol Next -->
      <button
        class="px-3 py-1 rounded bg-gray-300 text-gray-700 hover:bg-gray-400 transition disabled:opacity-50"
        :disabled="pagination.current_page === pagination.last_page"
        @click="changePage(pagination.current_page + 1)"
      >
        Next
      </button>
    </div>
  </div>

  <!-- Frame Blog Newest, Popular and Blog Lists -->
  <div v-else-if="!searchQuery && !loadingTyping" class="w-full h-auto mt-10">
    <!-- Newest and Popular -->
    <section
      class="w-full h-auto flex flex-col lg:grid lg:grid-cols-12 gap-x-5 xl:gap-x-5 px-8 md:px-8 lg:px-8 xl:px-0"
    >
      <!-- Newest Blog-->
      <div
        class="w-full h-full col-span-12 lg:col-span-8 rounded-lg bg-[#D9D9D9] p-[1px] dark:bg-gradient-to-tr dark:from-[#17181A] dark:from-45% dark:to-[#565656]"
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
          <div v-if="loading" class="flex justify-center items-center">
            <!-- Loader Frame -->
            <video
              autoplay
              loop
              muted
              playsinline
              @contextmenu.prevent
              class="w-[250px] h-[250px] md:w-[300px] md:h-[300px] lg:w-[200px] lg:h-[200px] object-cover object-center dark:hidden"
            >
              <source src="@/assets/videos/loading.mp4" type="video/mp4" />
            </video>

            <video
              autoplay
              loop
              muted
              playsinline
              @contextmenu.prevent
              class="w-[250px] h-[250px] md:w-[300px] md:h-[300px] lg:w-[200px] lg:h-[200px] object-cover object-center hidden dark:flex"
            >
              <source src="@/assets/videos/dark-loading.mp4" type="video/mp4" />
            </video>
          </div>
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
                  <figure class="w-full h-auto">
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
                  <div class="w-full h-auto flex flex-col gap-y-5 lg:gap-y-3">
                    <div
                      class="w-full h-auto transition-all duration-300 ease-in"
                    >
                      <p
                        class="text-[12px] sm:text-[16px] lg:text-[20px] text-[#111928] font-[500] dark:font-[600] dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-[#FAFAFA] dark:via-[#D4D4D4] dark:to-[#AAAAAA] line-clamp-2 sm:line-clamp-none"
                      >
                        {{ newestBlog.title }}
                      </p>
                    </div>
                    <div class="w-full h-auto">
                      <p
                        class="text-[10px] sm:text-[14px] lg:text-[16px] text-[#637381] font-[400] break-words line-clamp-2 sm:line-clamp-2"
                      >
                        {{ newestBlog.synopsis }}
                      </p>
                    </div>
                    <div class="w-full h-auto">
                      <p
                        class="text-[10px] sm:text-[14px] text-[#535862] dark:text-[#637381]"
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
                <router-link
                  :to="`/blog/${newestBlog.slug}`"
                  class="flex flex-row justify-between gap-x-1"
                >
                  <div
                    class="w-full h-auto text-[#6E6E6E] dark:text-[#637381] flex items-center"
                  >
                    <EyeIcon class="w-5 h-5 sm:w-auto sm:h-auto" />
                  </div>
                  <div class="w-full h-full flex items-center">
                    <span
                      class="text-[14px] text-[#6E6E6E] dark:text-[#637381]"
                    >
                      {{ utils.shortNumber(newestBlog.views) }}
                    </span>
                  </div>
                </router-link>
                <router-link
                  :to="`/blog/${newestBlog.slug}`"
                  class="flex flex-row justify-between gap-x-1"
                >
                  <div
                    class="w-full h-auto text-[#6E6E6E] dark:text-[#637381] flex items-center"
                  >
                    <CommentIcon class="w-5 h-5 sm:w-auto sm:h-auto" />
                  </div>
                  <div class="w-full h-auto">
                    <span
                      class="text-[14px] text-[#6E6E6E] dark:text-[#637381]"
                    >
                      {{ newestBlog.comments }}
                    </span>
                  </div>
                </router-link>
                <div class="relative flex w-full h-auto share-wrapper">
                  <div
                    class="w-auto h-auto text-[#6E6E6E] dark:text-[#637381] cursor-pointer flex items-center"
                    @click.stop="toggleShare('newest-' + newestBlog.id)"
                  >
                    <ShareIcon class="w-5 h-5 sm:w-auto sm:h-auto" />
                  </div>

                  <div
                    v-show="activeShareId === 'newest-' + newestBlog.id"
                    class="absolute z-30 -left-[65px] md:-left-[63px] lg:-left-[80px] -bottom-[190px] md:-bottom-[190px] lg:-bottom-[220px] xl:-bottom-[230px] w-[150px] lg:w-[180px] h-auto"
                  >
                    <div class="relative">
                      <img
                        src="@/assets/images/blog/share-frame2.svg"
                        alt=""
                        srcset=""
                        class="w-full h-auto object-cover relative"
                      />
                      <div
                        class="absolute w-full h-full top-2 lg:top-3 px-5 flex flex-col gap-y-2 sm:gap-y-3 justify-center"
                      >
                        <div
                          class="w-full h-auto cursor-pointer flex flex-row items-center gap-x-2 lg:gap-x-3"
                          @click="copyLink(newestBlog.slug)"
                        >
                          <div class="w-5 h-auto lg:w-auto lg:h-auto">
                            <img
                              src="@/assets/images/blog/copy-link.svg"
                              alt=""
                              srcset=""
                            />
                          </div>
                          <div class="w-[70%] h-auto flex items-center">
                            <span class="text-[14px]">Copy Link</span>
                          </div>
                        </div>
                        <div class="w-full h-[1px] bg-[#EBEBEB]" />
                        <div
                          class="w-full h-auto flex flex-col gap-y-4 lg:gap-y-5 cursor-pointer"
                        >
                          <!-- Linked In -->
                          <div
                            class="w-full h-auto cursor-pointer flex flex-row gap-x-2 lg:gap-x-3"
                          >
                            <div class="w-5 h-auto lg:w-auto lg:h-auto">
                              <img
                                src="@/assets/images/blog/linkedin.png"
                                alt=""
                                srcset=""
                              />
                            </div>
                            <div class="w-[70%] h-auto flex items-center">
                              <span class="text-[14px]">LinkedIn</span>
                            </div>
                          </div>
                          <!-- Facebook -->
                          <div
                            class="w-full h-auto cursor-pointer flex flex-row gap-x-2 lg:gap-x-3"
                          >
                            <div class="w-5 h-auto lg:w-auto lg:h-auto">
                              <img
                                src="@/assets/images/blog/facebook.png"
                                alt=""
                                srcset=""
                              />
                            </div>
                            <div class="w-[70%] h-auto flex items-center">
                              <span class="text-[14px]">Facebook</span>
                            </div>
                          </div>
                          <!-- Twitter -->
                          <div
                            class="w-full h-auto cursor-pointer flex flex-row gap-x-2 lg:gap-x-3"
                          >
                            <div class="w-5 h-auto lg:w-auto lg:h-auto">
                              <img
                                src="@/assets/images/blog/twitter.png"
                                alt=""
                                srcset=""
                              />
                            </div>
                            <div class="w-[70%] h-auto flex items-center">
                              <span class="text-[14px]">Twitter(X)</span>
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
          <!-- Loading -->
          <div v-if="loading" class="flex justify-center items-center">
            <!-- Loader Frame -->
            <video
              autoplay
              loop
              muted
              playsinline
              @contextmenu.prevent
              class="w-[250px] h-[250px] md:w-[300px] md:h-[300px] lg:w-[200px] lg:h-[200px] object-cover object-center dark:hidden"
            >
              <source src="@/assets/videos/loading.mp4" type="video/mp4" />
            </video>

            <video
              autoplay
              loop
              muted
              playsinline
              @contextmenu.prevent
              class="w-[250px] h-[250px] md:w-[300px] md:h-[300px] lg:w-[200px] lg:h-[200px] object-cover object-center hidden dark:flex"
            >
              <source src="@/assets/videos/dark-loading.mp4" type="video/mp4" />
            </video>
          </div>
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
                  class="w-full h-full object-fill"
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
                    <div class="col-span-9 w-full flex flex-col gap-y-2">
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
        <!-- Loading -->
        <div v-if="loading" class="flex justify-center items-center">
          <!-- Loader Frame -->
          <video
            autoplay
            loop
            muted
            playsinline
            @contextmenu.prevent
            class="w-[250px] h-[250px] md:w-[300px] md:h-[300px] lg:w-[200px] lg:h-[200px] object-cover object-center dark:hidden"
          >
            <source src="@/assets/videos/loading.mp4" type="video/mp4" />
          </video>

          <video
            autoplay
            loop
            muted
            playsinline
            @contextmenu.prevent
            class="w-[250px] h-[250px] md:w-[300px] md:h-[300px] lg:w-[200px] lg:h-[200px] object-cover object-center hidden dark:flex"
          >
            <source src="@/assets/videos/dark-loading.mp4" type="video/mp4" />
          </video>
        </div>
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
                class="absolute z-20 w-12 h-auto sm:w-14 sm:h-8 flex justify-center items-center bg-[#1AB24F] top-0 right-0 rounded-bl-lg rounded-tr-lg"
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
                  class="w-[60%] sm:h-full flex flex-col items-start gap-y-2 md:gap-y-3 rounded-lg justify-between"
                >
                  <div class="w-full h-[20%] flex items-center">
                    <p
                      class="text-[10px] sm:text-[12px] md:text-[14px] text-[#6941C6] dark:text-[#2AB857] bg-[#7B61FF]/10 dark:bg-transparent px-2 sm:px-4 dark:px-0 rounded-full w-auto h-full flex items-center"
                    >
                      {{ data.category_name }}
                    </p>
                  </div>
                  <div
                    class="w-full h-full flex flex-col items-center gap-y-3 sm:gap-y-3"
                  >
                    <div class="w-full sm:h-[40px] flex items-center">
                      <p
                        class="text-[10px] sm:text-[14px] md:text-[12px] lg:text-[16px] text-[#111928] leading-relaxed font-[500] dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-[#FAFAFA] dark:via-[#D4D4D4] dark:to-[#AAAAAA] line-clamp-2"
                      >
                        {{ data.title }}
                      </p>
                    </div>
                    <!-- <div class="w-full h-auto flex items-start">
                      <p
                        class="text-[10px] sm:text-[12px] md:text-[12px] leading-normal line-clamp-2 lg:line-clamp-3 text-[#637381]"
                      >
                        {{ data.synopsis }}
                      </p>
                    </div> -->
                  </div>
                  <div
                    class="hidden w-full h-auto sm:flex flex-row items-center"
                  >
                    <div class="w-full h-[40px] flex items-end">
                      <p
                        class="text-[12px] md:text-[12px] text-[#535862] dark:text-[#6F6F6F]"
                      >
                        <span class="font-[600]">{{ data.author_name }}</span>
                        |
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
      ref="logoContainer"
      id="blogSection"
      class="relative z-0 w-full h-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:mt-10 gap-5 px-8 md:px-8 xl:px-0"
    >
      <!-- :style="{ minHeight: maxHeight + 'px' }" -->
      <!-- :style="{ minHeight: `${maxHeight}px` }" -->
      <!-- Loading -->
      <div v-if="loading" class="w-full flex justify-center items-center">
        <!-- Loader Frame -->
        <video
          autoplay
          loop
          muted
          playsinline
          @contextmenu.prevent
          class="w-[250px] h-[250px] md:w-[300px] md:h-[300px] lg:w-[200px] lg:h-[200px] object-cover object-center dark:hidden"
        >
          <source src="@/assets/videos/loading.mp4" type="video/mp4" />
        </video>

        <video
          autoplay
          loop
          muted
          playsinline
          @contextmenu.prevent
          class="w-[250px] h-[250px] md:w-[300px] md:h-[300px] lg:w-[200px] lg:h-[200px] object-cover object-center hidden dark:flex"
        >
          <source src="@/assets/videos/dark-loading.mp4" type="video/mp4" />
        </video>
      </div>
      <div v-else-if="error" class="px-6">{{ error }}</div>
      <div
        v-for="(data, index) in blogs"
        :key="index"
        class="relative w-full h-full grid rounded-[10px] p-[1px] bg-[#D9D9D9] dark:bg-gradient-to-tr dark:from-[#17181A] dark:to-[#565656]"
      >
        <div
          class="flex flex-col w-full h-auto p-4 rounded-[9px] bg-[#FAFAFA] dark:bg-[#1D1F23]"
        >
          <router-link :to="`/blog/${data.slug}`">
            <div class="w-full h-auto xl:h-[170px]">
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
                  class="text-[12px] md:text-[14px] lg:text-[14px] text-[#7B61FF] dark:text-[#FFFFFF] font-semibold"
                >
                  {{ data.category_name }}
                </p>
              </div>
              <div
                class="flex items-center bg-[#3758F9] px-5 py-1 rounded-[5px]"
              >
                <p
                  class="text-[#FFFFFF] text-[12px] md:text-[12px] lg:text-[14px]"
                >
                  {{ utils.fromISODate(data.created_at) }}
                </p>
              </div>
            </div>
            <div
              class="flex w-full h-auto sm:h-[45px] md:h-[50px] lg:h-[55px] text-left overflow-hidden"
            >
              <p
                class="text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] font-[500] text-[#111928] dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-br dark:from-[#FAFAFA] dark:via-[#D4D4D4] dark:to-[#AAAAAA] line-clamp-2"
              >
                {{ data.title }}
              </p>
            </div>
            <div class="flex w-full h-auto justify-start items-start my-3">
              <p
                class="text-[12px] lg:text-[14px] text-[#637381] line-clamp-2 lg:line-clamp-2"
              >
                {{ data.synopsis }}
              </p>
            </div>
          </router-link>
          <div class="relative w-full h-auto flex flex-row mt-4 mb-0 xl:mb-0">
            <div class="w-auto flex flex-row gap-x-3 justify-start">
              <router-link
                :to="`/blog/${data.slug}`"
                class="flex flex-row justify-between gap-x-1"
              >
                <div
                  class="w-full h-auto text-[#6E6E6E] dark:text-[#637381] flex items-center"
                >
                  <EyeIcon class="w-5 h-5 sm:w-auto sm:h-auto" />
                </div>
                <div class="w-full h-full flex items-center">
                  <span class="text-[14px] text-[#6E6E6E] dark:text-[#637381]">
                    {{ utils.shortNumber(data.views) }}
                  </span>
                </div>
              </router-link>
              <router-link
                :to="`/blog/${data.slug}`"
                class="flex flex-row justify-between gap-x-1"
              >
                <div
                  class="w-full h-auto text-[#6E6E6E] dark:text-[#637381] flex items-center"
                >
                  <CommentIcon class="w-5 h-5 sm:w-auto sm:h-auto" />
                </div>
                <div class="w-full h-auto">
                  <span class="text-[14px] text-[#6E6E6E] dark:text-[#637381]">
                    {{ data.comments }}
                  </span>
                </div>
              </router-link>
              <div class="relative flex w-full h-auto share-wrapper">
                <div
                  class="w-auto h-auto text-[#6E6E6E] dark:text-[#637381] cursor-pointer flex items-center"
                  @click.stop="toggleShare(data.id)"
                >
                  <ShareIcon class="w-5 h-5 sm:w-auto sm:h-auto" />
                </div>

                <div
                  v-show="activeShareId === data.id"
                  class="absolute z-30 -left-[65px] md:-left-[63px] lg:-left-[80px] -bottom-[190px] md:-bottom-[190px] lg:-bottom-[220px] xl:-bottom-[230px] w-[150px] lg:w-[180px] h-auto"
                >
                  <div class="relative">
                    <img
                      src="@/assets/images/blog/share-frame2.svg"
                      alt=""
                      srcset=""
                      class="w-full h-auto object-cover relative"
                    />
                    <div
                      class="absolute w-full h-full top-2 lg:top-3 px-5 flex flex-col gap-y-2 sm:gap-y-3 justify-center"
                    >
                      <div
                        class="w-full h-auto cursor-pointer flex flex-row items-center gap-x-2 lg:gap-x-3"
                        @click="copyLink(data.slug)"
                      >
                        <div class="w-5 h-auto lg:w-auto lg:h-auto">
                          <img
                            src="@/assets/images/blog/copy-link.svg"
                            alt=""
                            srcset=""
                          />
                        </div>
                        <div class="w-[70%] h-auto flex items-center">
                          <span class="text-[14px]">Copy Link</span>
                        </div>
                      </div>
                      <div class="w-full h-[1px] bg-[#EBEBEB]" />
                      <div
                        class="w-full h-auto flex flex-col gap-y-4 lg:gap-y-5 cursor-pointer"
                      >
                        <!-- Linked In -->
                        <div
                          class="w-full h-auto cursor-pointer flex flex-row gap-x-2 lg:gap-x-3"
                        >
                          <div class="w-5 h-auto lg:w-auto lg:h-auto">
                            <img
                              src="@/assets/images/blog/linkedin.png"
                              alt=""
                              srcset=""
                            />
                          </div>
                          <div class="w-[70%] h-auto flex items-center">
                            <span class="text-[14px]">LinkedIn</span>
                          </div>
                        </div>
                        <!-- Facebook -->
                        <div
                          class="w-full h-auto cursor-pointer flex flex-row gap-x-2 lg:gap-x-3"
                        >
                          <div class="w-5 h-auto lg:w-auto lg:h-auto">
                            <img
                              src="@/assets/images/blog/facebook.png"
                              alt=""
                              srcset=""
                            />
                          </div>
                          <div class="w-[70%] h-auto flex items-center">
                            <span class="text-[14px]">Facebook</span>
                          </div>
                        </div>
                        <!-- Twitter -->
                        <div
                          class="w-full h-auto cursor-pointer flex flex-row gap-x-2 lg:gap-x-3"
                        >
                          <div class="w-5 h-auto lg:w-auto lg:h-auto">
                            <img
                              src="@/assets/images/blog/twitter.png"
                              alt=""
                              srcset=""
                            />
                          </div>
                          <div class="w-[70%] h-auto flex items-center">
                            <span class="text-[14px]">Twitter(X)</span>
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

    <!-- Pagination -->
    <div
      v-if="pagination?.last_page >= 1"
      class="pagination flex gap-2 justify-end px-8 xl:px-0 mb-20 mt-10"
    >
      <!-- Tombol Prev -->
      <button
        class="px-3 py-1 rounded bg-gray-300 text-gray-700 hover:bg-gray-400 transition disabled:opacity-50"
        :disabled="pagination.current_page === 1"
        @click="changePage(pagination.current_page - 1)"
      >
        Prev
      </button>

      <!-- Nomor halaman -->
      <button
        v-for="page in pagination.last_page"
        :key="page"
        class="px-3 py-1 rounded transition"
        :class="{
          'bg-blue-600 text-white': page === pagination.current_page,
          'bg-gray-200 hover:bg-gray-300': page !== pagination.current_page,
        }"
        @click="changePage(page)"
      >
        {{ page }}
      </button>

      <!-- Tombol Next -->
      <button
        class="px-3 py-1 rounded bg-gray-300 text-gray-700 hover:bg-gray-400 transition disabled:opacity-50"
        :disabled="pagination.current_page === pagination.last_page"
        @click="changePage(pagination.current_page + 1)"
      >
        Next
      </button>
    </div>
  </div>
</template>
