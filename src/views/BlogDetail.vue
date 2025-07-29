<script setup>
import LikeIcon from "@/components/icons/Like.vue";
import EyeIcon from "@/components/icons/Eye.vue";
import CommentIcon from "@/components/icons/Comment.vue";
import ShareIcon from "@/components/icons/Share.vue";

import { useRoute } from "vue-router";
import { blogPosts } from "@/Data/BlogPosts";
import { formatNumber } from "@/components/Helper/numberFormat.js";

const route = useRoute();
const slug = route.params.slug;

// Cari artikel berdasarkan slug
const post = blogPosts.find((p) => p.slug === slug);
</script>

<template>
  <section
    class="flex flex-col relative w-full h-auto md:px-12 xl:px-14 bg-[radial-gradient(ellipse_at_top,_#3CFF7A_-70%,_#FAFAFA_60%)] dark:bg-[radial-gradient(ellipse_at_top,_#3CFF7A_-70%,_#17181A_40%)]"
  >
    <div
      class="flex flex-col w-full max-w-[1440px] mx-auto h-auto xl:pt-[200px] md:pt-[100px] sml:pt-[90px] justify-center"
    >
      <div
        class="flex flex-col w-full h-auto justify-center items-center gap-y-1 px-40"
      >
        <p class="text-[23px] text-[#18AB53] font-[500] text-center">
          Published {{ post.date }}
        </p>
        <p class="text-[47px] text-[#195279] font-[500] text-center">
          {{ post.title }}
        </p>
        <!-- <p class="text-[#535862] font-[400] text-center px-20">
          How do you create compelling presentations that wow your colleagues
          and impress your managers?
        </p> -->
        <div class="w-auto h-auto px-10 py-2 bg-[#F9F5FF] mt-5 rounded-full">
          <p class="text-[#6941C6] text-[17px]">{{ post.category }}</p>
        </div>
      </div>
      <!-- Like, View, Comments, Share -->
      <div
        class="flex flex-row justify-between w-full max-w-sm h-auto py-2 mx-auto mt-6 px-10"
      >
        <div class="w-[90%] h-auto">
          <div class="flex flex-row gap-x-5">
            <div class="flex flex-row justify-between gap-x-1">
              <div class="w-full h-auto text-[#6E6E6E] dark:text-[#B2AEAE]">
                <LikeIcon />
              </div>
              <div class="w-full h-auto">
                <span class="text-[#6E6E6E] dark:text-[#B2AEAE]">
                  {{ formatNumber(post.likes) }}
                </span>
              </div>
            </div>
            <div class="flex flex-row justify-between gap-x-1">
              <div class="w-full h-auto text-[#6E6E6E] dark:text-[#B2AEAE]">
                <EyeIcon />
              </div>
              <div class="w-full h-auto">
                <span class="text-[#6E6E6E] dark:text-[#B2AEAE]">
                  {{ formatNumber(post.views) }}
                </span>
              </div>
            </div>
            <div class="flex flex-row justify-between gap-x-1">
              <div class="w-full h-auto text-[#6E6E6E] dark:text-[#B2AEAE]">
                <CommentIcon />
              </div>
              <div class="w-full h-auto">
                <span class="text-[#6E6E6E] dark:text-[#B2AEAE]">
                  {{ formatNumber(post.comments) }}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="w-[10%] h-auto text-[#6E6E6E] dark:text-[#B2AEAE]">
          <ShareIcon />
        </div>
      </div>
    </div>
  </section>
  <!-- Gambar Blog -->
  <section class="flex relative w-full h-auto md:px-12 xl:px-28 mt-20">
    <!-- Blog Content -->
    <div class="w-full h-auto">
      <img
        src="@/assets/images/blog1.png"
        alt="CertLogo"
        class="w-full h-full object-center object-contain"
      />
    </div>
  </section>
  <!-- Content Blog -->
  <section
    class="flex flex-col relative w-full h-auto md:px-12 xl:px-28 mt-20 bg-[#FFFFFF]"
  >
    <!-- Blog Content -->
    <div class="w-full h-auto">
      <!-- {{ post.description }} -->
      <div v-html="post.description" class="prose max-w-none" />
    </div>
  </section>
</template>
