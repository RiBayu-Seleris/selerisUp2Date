<script setup>
import SearchIcon from "@/components/icons/Search.vue";
import FilterIcon from "@/components/icons/Filter.vue";
import ChevronDown from "@/components/icons/ChevronDown.vue";
import LikeIcon from "@/components/icons/Like.vue";
import EyeIcon from "@/components/icons/Eye.vue";
import CommentIcon from "@/components/icons/Comment.vue";
import ShareIcon from "@/components/icons/Share.vue";

import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import axios from "axios";
import Swal from "sweetalert2";
import { useUtilsStore } from "@/stores/utils";

const utils = useUtilsStore();

/* =========================
   STATE
========================= */
const blogs = ref([]);
// const loading = ref(false);
const activeShareId = ref(null);
const shareRefs = ref([]); // simpan semua element share

/* =========================
   CONFIG
========================= */
const BASE_URL = import.meta.env.VITE_API_URL;
// const VERSION = "v1";

const headerApi = {
  headers: {
    Accept: "application/json",
  },
};

/* =========================
   API CALL
========================= */
const getBlogs = async () => {
  //   loading.value = true;
  try {
    const res = await axios.get(
      `${BASE_URL}/api/v1/app/blogs?sort_by=latest`,
      headerApi,
    );

    blogs.value = res.data?.data ?? [];
  } catch (err) {
    console.error("Get blogs error:", err);
  } finally {
    // loading.value = false;
  }
};

/* =========================
   COMPUTED
========================= */
const latestBlogs = computed(() => {
  if (!Array.isArray(blogs.value)) return [];
  return blogs.value.slice(0, 3);
});

/* =========================
   SHARE
========================= */
const toggleShare = (id) => {
  activeShareId.value = activeShareId.value === id ? null : id;
};

const copyLink = async (slug) => {
  const blogUrl = `${window.location.origin}/blog/${slug}`;

  await navigator.clipboard.writeText(blogUrl);

  activeShareId.value = null; // 👈 auto close

  Swal.fire({
    toast: true,
    position: "top",
    icon: "success",
    title: "Link berhasil disalin!",
    showConfirmButton: false,
    timer: 1500,
  });
};

const handleClickOutside = (event) => {
  if (!activeShareId.value) return;

  const clickedInside = shareRefs.value.some((el) =>
    el?.contains(event.target),
  );

  if (!clickedInside) {
    activeShareId.value = null;
  }
};

/* =========================
   LIFECYCLE
========================= */
onMounted(() => {
  getBlogs();
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<template>
  <div class="flex flex-col dark:bg-[#17181A] gap-y-5">
    <div
      class="relative flex flex-col w-full h-auto px-8 lg:px-16 xls:px-8 gap-y-3 justify-center items-center"
    >
      <div class="flex w-full h-auto justify-center items-center text-center">
        <p class="text-[#2AB857] font-[500] text-[18px] lg:text-[28px]">Blog</p>
      </div>
      <div class="flex w-full h-auto justify-center items-center text-center">
        <p
          class="text-[#195279] font-[500] text-[20px] lg:text-[42px] dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-br dark:from-[#FAFAFA] dark:via-[#D4D4D4] dark:to-[#AAAAAA]"
        >
          What's On Seleris
        </p>
      </div>
    </div>
    <!-- v-for="(data, index) in finalBlogs" -->
    <div class="flex flex-col relative w-full h-auto xl:px-16 mt-10 lg:mt-8">
      <div
        class="relative z-40 w-full h-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 px-8 md:px-8 xl:px-0"
      >
        <div
          v-for="data in latestBlogs"
          :key="data.id"
          class="relative w-full h-auto grid rounded-[10px] p-[1px] bg-[#D9D9D9] dark:bg-gradient-to-tr dark:from-[#17181A] dark:to-[#565656]"
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
                    <!-- CATEGORY -->
                  </p>
                </div>
                <div
                  class="flex items-center bg-[#3758F9] px-5 py-1 rounded-[5px]"
                >
                  <p
                    class="text-[#FFFFFF] text-[12px] md:text-[12px] lg:text-[14px]"
                  >
                    {{ utils.fromISODate(data.created_at) }}
                    <!-- Date -->
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
                  <!-- TITLE -->
                </p>
              </div>
              <div class="flex w-full h-auto justify-start items-start my-3">
                <p
                  class="text-[12px] lg:text-[14px] text-[#637381] line-clamp-2 lg:line-clamp-2"
                >
                  {{ data.synopsis }}
                  <!-- Lorem ipsum dolor sit, amet consectetur adipisicing elit.Officia, expedita! -->
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
                      <!-- 100 -->
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
                      {{ utils.shortNumber(data.comments) }}
                      <!-- 200 -->
                    </span>
                  </div>
                </router-link>
                <div
                  class="relative flex w-full h-auto share-wrapper"
                  :ref="(el) => (shareRefs[data.id] = el)"
                >
                  <div
                    class="w-auto h-auto text-[#6E6E6E] dark:text-[#637381] cursor-pointer flex items-center"
                  >
                    <ShareIcon
                      @click.stop="toggleShare(data.id)"
                      class="w-5 h-5 sm:w-auto sm:h-auto"
                    />
                  </div>
                  <div
                    v-show="activeShareId === data.id"
                    class="absolute z-50 -left-[65px] md:-left-[63px] lg:-left-[80px] -bottom-[190px] md:-bottom-[190px] lg:-bottom-[220px] xl:-bottom-[230px] w-[150px] lg:w-[180px] h-auto"
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
                          @click="copyLink(data.slug)"
                          class="w-full h-auto cursor-pointer flex flex-row items-center gap-x-2 lg:gap-x-3"
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
    </div>
    <div class="w-auto h-auto mx-auto">
      <router-link
        to="/blogs"
        class="cursor-pointer flex flex-row items-center justify-center mb-5 sm:mb-5 lg:mb-5 mt-4 lg:mt-6 bg-[#195279] dark:bg-[#2B2E32] border-[1px] dark:border-[1px] dark:border-[#2AB857] px-6 py-2 rounded-full dark:shadow-[0px_4px_18.8px_0px_rgba(0,255,59,0.25)] z-30 transition-all duration-300 hover:translate-y-[-2px]"
      >
        <div>
          <p class="text-[12px] xl:text-[14px] font-[400] text-[#FAFAFA]">
            Berita Lainnya
          </p>
        </div>
        <div class="ml-3 text-[#FAFAFA] dark:text-[#FAFAFA]">
          <svg
            class="w-5 h-5 sm:w-3 sm:h-3 xl:w-5 xl:h-5"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.43 18.07L20.5 12L14.43 5.92999"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M3.50002 12L20.33 12"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </router-link>
    </div>
  </div>
</template>
