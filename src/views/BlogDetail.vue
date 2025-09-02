<script setup>
import ArrowDown from "@/components/icons/ArrowDown.vue";
import ToC from "@/components/Blog/ToC.vue";
import { computed, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { blogsApi } from "@/consumeAPI/blogsApi";
import { useUtilsStore } from "@/stores/utils.js";
import DOMPurify from "dompurify";

const convertDate = useUtilsStore();
const {
  blogDetail,
  popularBlog,
  getBlogBySlug,
  getPopularBlog,
  error,
  loading,
} = blogsApi();
const loginStatus = ref(false);

const route = useRoute();
const slug = route.params.slug;

// HARUS akses .value
const safeContent = computed(() =>
  blogDetail.value?.content ? DOMPurify.sanitize(blogDetail.value.content) : ""
);

onMounted(() => {
  getBlogBySlug(slug); // <= WAJIB
  getPopularBlog();
});

const blogimage = "new-example.png";
const blogimage2 = "example.png";
// const articleRef = ref(null);
const isAccountDropdown = ref(false);
const isFocusedComment = ref(false);

const toggleDropdown = () => {
  isAccountDropdown.value = !isAccountDropdown.value;
};

const toggleIsFocused = () => {
  isFocusedComment.value = true;
};

const closeComment = () => {
  isFocusedComment.value = false;
};

const comments = [
  {
    name: "Riski Maulana Yusuf",
    date: "21 Jul 2025",
    comment:
      "Artikel yang hebat untuk sebuah tema teknologi kami sangat berharap jika kamu terus membuat artikel yang bertemakan teknologi",
  },
  {
    name: "Arya Alfinanto",
    date: "21 Jul 2025",
    comment:
      "Artikel yang hebat untuk sebuah tema teknologi kami sangat berharap jika kamu terus membuat artikel yang bertemakan teknologi",
  },
  {
    name: "Yusuf Rijal",
    date: "21 Jul 2025",
    comment:
      "Artikel yang hebat untuk sebuah tema teknologi kami sangat berharap jika kamu terus membuat artikel yang bertemakan teknologi",
  },
];
</script>

<template>
  <div v-if="loading">Loading Data</div>
  <div v-else-if="error">{{ error }}</div>
  <div v-else-if="blogDetail" class="w-full h-auto px-12 xl:px-16 pt-40">
    <section class="w-full h-auto flex flex-row justify-between">
      <div class="w-full h-auto flex items-center">
        <p class="text-[#535862] font-[400]">
          Home > Blog >
          <span class="text-[#195279]">{{ blogDetail.slug }}</span>
        </p>
      </div>
      <!-- Akun Section -->
      <div v-if="loginStatus === true" class="w-full h-auto flex justify-end">
        <div class="w-[60%] flex flex-row">
          <div class="relative w-full h-auto flex flex-row justify-end">
            <div class="relative w-[30%] h-auto pt-0 flex justify-end">
              <button @click="toggleDropdown" class="w-7 h-7 p-1">
                <ArrowDown />
              </button>
              <div
                v-if="isAccountDropdown"
                class="absolute w-full h-[50px] border-[1px] top-10 right-0 transition-all duration-500"
              >
                <div class="w-full h-full flex justify-center items-center">
                  <p class="text-[14px]">Logout</p>
                </div>
              </div>
            </div>
            <div class="w-auto h-auto flex flex-col justify-between px-2">
              <div class="w-full flex justify-end">
                <p class="text-[16px] text-[#195279] font-[400] text-end">
                  Riski Yusuf Maulana
                </p>
              </div>
              <div class="w-full flex justify-end">
                <p class="text-[16px] text-[#B8B8B8] font-[400]">Account</p>
              </div>
            </div>
          </div>
          <div class="relative w-[30%] h-auto flex justify-center items-center">
            <img
              src="/assets/images/profile/example.png"
              alt=""
              class="w-[55px] h-[55px] rounded-full bg-contain object-center"
            />
          </div>
        </div>
      </div>
    </section>
    <section class="w-full h-auto flex flex-col mt-10">
      <!-- Blog Images -->
      <div class="w-full h-[500px]">
        <img
          :src="blogDetail.cover"
          alt=""
          class="w-full h-full object-fill rounded-3xl"
        />
        <!-- <img :src="`/assets/images/blog/` + blogimage" alt="" class="w-full" /> -->
      </div>
      <!-- Frame Blog Detail and Content & Most Popular -->
      <div
        class="w-full h-auto flex flex-col-reverse lg:flex-row mt-10 gap-x-5"
      >
        <!-- Kolom kiri -->
        <div class="w-full lg:w-[70%] h-auto flex flex-col gap-y-5 lg:pr-20">
          <div class="w-full h-auto flex flex-col gap-y-4">
            <div class="w-full h-auto">
              <p class="text-[#18AB53] font-[500]">
                {{ convertDate.fromISODate(blogDetail.created_at) }}
              </p>
            </div>
            <div class="w-full h-auto">
              <h1
                class="text-[28px] lg:text-[38px] text-[#195279] font-[500] leading-snug"
              >
                {{ blogDetail.title }}
              </h1>
            </div>
            <div class="w-full lg:w-[70%] h-auto">
              <p class="text-[16px] text-[#535862] font-[400] leading-tight">
                Author:
                <span class="text-[#535862] font-[600]">
                  {{ blogDetail.author_name }}</span
                >
              </p>
            </div>
          </div>
          <div class="w-full h-auto flex justify-start items-center">
            <p
              class="text-[14px] lg:text-[14px] text-[#6941C6] bg-[#7B61FF]/10 px-4 py-1 rounded-full"
            >
              {{ blogDetail.category_name }}
            </p>
          </div>
          <!-- ref="articleRef" -->
          <article
            id="content"
            class="w-full h-auto flex flex-col leading-relaxed text-[#535862] font-[400] space-y-6 lg:space-y-5 mt-5"
          >
            <p>
              {{ blogDetail.synopsis }}
            </p>
            <!-- Content Blog -->
            <div
              class="text-[16px] leading-relaxed font-[400] text-[#535862] space-y-4"
              v-html="safeContent"
            ></div>
          </article>
        </div>

        <!-- Kolom kanan -->
        <div class="w-full lg:w-[30%] mb-10 lg:mb-0">
          <!-- wrapper tinggi sama dengan kolom kiri -->
          <div class="relative w-full h-full">
            <div class="sticky top-[17%] flex flex-col gap-y-5">
              <!-- Box 1 -->
              <ToC />
              <!-- Box 2 -->
              <div
                class="h-auto border-[1px] rounded-[10px] pt-2 hidden lg:flex lg:flex-col"
              >
                <div class="w-full h-auto py-4 px-3">
                  <p
                    class="text-[#195279] font-[500] lg:text-[16px] justify-center"
                  >
                    Most Popular
                  </p>
                </div>
                <div
                  v-for="(data, index) in popularBlog"
                  :key="index"
                  class="w-full h-auto flex flex-col gap-y-0"
                >
                  <div v-if="index === 0" class="w-full h-auto">
                    <figure class="w-full h-auto">
                      <img
                        :src="data.cover"
                        alt=""
                        class="w-full h-[200px] object-center"
                      />
                    </figure>
                  </div>
                  <div class="w-full h-auto grid grid-cols-12 pr-10 py-3">
                    <div class="col-span-3 w-full h-auto flex justify-center">
                      <p class="text-[24px] text-[#8EB3CC]">#{{ index + 1 }}</p>
                    </div>
                    <div class="col-span-9 flex flex-col gap-y-1">
                      <div class="w-full h-auto">
                        <p class="text-[#6941C6] text-[14px]">
                          {{ data.category_name }}
                        </p>
                      </div>
                      <div class="w-full flex h-auto">
                        <p
                          class="text-[#195279] font-[500] text-[16px] leading-tight"
                        >
                          {{ data.title }}
                        </p>
                      </div>
                      <div class="w-full h-auto">
                        <p class="text-[#B8B8B8] text-[12px]">
                          {{ data.author_name }} |
                          {{ convertDate.fromISODate(data.created_at) }}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div
                    v-if="index !== popularBlog.length - 1"
                    class="w-full h-[1px] bg-[#D2D2D2]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="w-full lg:w-[70%] h-auto mt-20 flex flex-col">
      <div class="w-full h-auto flex flex-col">
        <div class="w-full">
          <p class="text-[#374151] font-[500]">Comments (10)</p>
        </div>
        <div class="w-full mt-4 rounded-[8px]">
          <textarea
            type="text"
            rows="2"
            class="w-full pl-4 py-2 bg-[#EBEBEB] rounded-[8px] focus:outline-none"
            placeholder="Share your thoughts?"
            @focus="toggleIsFocused"
          />
        </div>
        <div
          v-if="isFocusedComment"
          class="w-full h-auto flex flex-row justify-end space-x-3 mt-2 transition-all duration-500"
        >
          <button
            @click="closeComment"
            class="w-auto h-auto bg-slate-300 text-[#FAFAFA] px-8 py-2 rounded-md"
          >
            <p>Cancel</p>
          </button>
          <button
            class="w-auto h-auto bg-green-500 text-[#FAFAFA] px-8 py-2 rounded-md"
          >
            <p>Send</p>
          </button>
        </div>
      </div>
      <!-- Comments Display -->
      <div class="w-full h-auto flex flex-col mt-14 space-y-6">
        <!-- <div
          v-for="(comment, index) in comments"
          :key="index"
          class="w-full h-auto flex flex-col gap-y-6"
        >
          <div class="w-full h-auto flex flex-col">
            <div class="w-full h-auto">
              <p class="text-[20px] font-[500] text-[#323232]">
                {{ comment.name }}
              </p>
            </div>
            <div class="w-full h-auto">
              <p class="text-[18px] font-[400] text-[#2AB857]">
                {{ comment.date }}
              </p>
            </div>
          </div>
          <div class="w-full h-auto">
            <p class="text-[18px] font-[400] text-[#7A808D]">
              {{ comment.comment }}
            </p>
          </div>
          <div
            v-if="index !== comments.length - 1"
            class="w-full h-[1px] bg-gray-400"
          />
        </div> -->
      </div>
    </section>
  </div>
  <div v-else>Blog tidak ditemukan.</div>
</template>
