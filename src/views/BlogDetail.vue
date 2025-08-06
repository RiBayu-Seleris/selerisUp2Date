<script setup>
import LikeIcon from "@/components/icons/Like.vue";
import EyeIcon from "@/components/icons/Eye.vue";
import CommentIcon from "@/components/icons/Comment.vue";
import ShareIcon from "@/components/icons/Share.vue";
import BlogPublic from "@/components/reusable/BlogPublic.vue";
import BlogShareMenu from "@/components/reusable/BlogShareMenu.vue";

import Instagram from "@/components/icons/Instagram.vue";
import Linkedin from "@/components/icons/Linkedin.vue";
import Twitter from "@/components/icons/Twitter.vue";

import { useRoute } from "vue-router";
import { blogPosts } from "@/Data/BlogPosts";
import { formatNumber } from "@/components/Helper/numberFormat.js";
import { ref, onMounted, onBeforeUnmount } from "vue";

const route = useRoute();
const slug = route.params.slug;

// Cari artikel berdasarkan slug
const post = blogPosts.find((p) => p.slug === slug);

const countlikes = formatNumber(post.likes);
const countviews = formatNumber(post.views);
const countcomments = formatNumber(post.comments);

const shareOpenTop = ref(false);
const shareOpenBottom = ref(false);

const shareTopRef = ref(null);
const shareBottomRef = ref(null);

const handleTop = () => {
  shareOpenTop.value = !shareOpenTop.value;
  shareOpenBottom.value = false;
};
const handleBottom = () => {
  shareOpenBottom.value = !shareOpenBottom.value;
  shareOpenTop.value = false;
};

const handleClickOutside = (event) => {
  const clickedOutsideTop =
    shareTopRef.value && !shareTopRef.value.contains(event.target);
  const clickedOutsideBottom =
    shareBottomRef.value && !shareBottomRef.value.contains(event.target);

  if (clickedOutsideTop && clickedOutsideBottom) {
    shareOpenTop.value = false;
    shareOpenBottom.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});
onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<template>
  <section
    class="flex flex-col relative w-full h-auto md:px-12 xl:px-14 bg-[radial-gradient(ellipse_at_top,_#3CFF7A_-70%,_#FAFAFA_60%)] dark:bg-[radial-gradient(ellipse_at_top,_#3CFF7A_-70%,_#17181A_40%)]"
  >
    <div
      class="flex flex-col w-full max-w-[1440px] mx-auto h-auto sml:pt-[130px] md:pt-[130px] lg:pt-[150px] xl:pt-[200px] justify-center"
    >
      <div
        class="flex flex-col w-full h-auto justify-center items-center gap-y-1 px-16 md:px-28 lg:px-40"
      >
        <p
          class="text-[19px] lg:text-[23px] text-[#18AB53] font-[500] text-center"
        >
          Published {{ post.date }}
        </p>
        <p
          class="text-[21px] md:text-[27px] lg:text-[32px] xl:text-[47px] text-[#195279] font-[500] text-center leading-relaxed dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-br dark:from-[#FAFAFA] dark:via-[#D4D4D4] dark:to-[#AAAAAA]"
        >
          {{ post.title }}
        </p>
        <div
          class="w-auto h-auto px-8 py-1 md:px-10 md:py-2 bg-[#F9F5FF] mt-5 rounded-full"
        >
          <p class="text-[#6941C6] text-[14px] md:text-[17px]">
            {{ post.category }}
          </p>
        </div>
      </div>
      <!-- Like, View, Comments, Share -->
      <div
        class="flex flex-row justify-between w-full max-w-none md:max-w-md h-auto py-2 mx-auto mt-6 px-20 md:px-0"
      >
        <div class="w-[90%] h-auto">
          <div class="flex flex-row gap-x-5 md:gap-x-10">
            <BlogPublic :count="countlikes">
              <template #icon>
                <LikeIcon />
              </template>
            </BlogPublic>
            <BlogPublic :count="countviews">
              <template #icon>
                <EyeIcon />
              </template>
            </BlogPublic>
            <BlogPublic :count="countcomments">
              <template #icon>
                <CommentIcon />
              </template>
            </BlogPublic>
          </div>
        </div>
        <div
          ref="shareTopRef"
          class="relative w-[10%] h-auto text-[#6E6E6E] dark:text-[#B2AEAE]"
        >
          <!-- Tombol Share -->
          <div @click.stop="handleTop" class="cursor-pointer">
            <ShareIcon />
          </div>

          <!-- Dropdown -->
          <div
            v-if="shareOpenTop"
            class="absolute mt-0 w-48 md:w-56 z-30 left-[30%] -translate-x-1/2"
          >
            <BlogShareMenu />
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- Gambar Blog -->
  <section class="flex relative w-full h-auto px-12 xl:px-28 mt-10 lg:mt-20">
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
    class="flex flex-col relative w-full h-auto px-12 md:px-12 xl:px-28 mt-10"
  >
    <!-- Blog Content -->
    <div
      class="w-full h-auto bg-[#FFFFFF] dark:bg-[#17181A] px-0 md:px-14 lg:px-28 py-5"
    >
      <!-- {{ post.description }} -->
      <div
        v-html="post.description"
        class="prose prose-base md:prose-lg lg:prose-xl max-w-none text-justify leading-relaxed dark:text-[#FAFAFA]"
      />
    </div>
  </section>
  <!-- Like, View, Comment, Share (Bottom) -->
  <div
    class="flex flex-row justify-between w-full max-w-none md:max-w-xl lg:max-w-4xl h-auto py-2 mx-auto mt-6 px-20 md:px-0"
  >
    <div class="w-full h-auto">
      <div class="flex flex-row gap-x-5 md:gap-x-10">
        <BlogPublic :count="countlikes">
          <template #icon>
            <LikeIcon />
          </template>
        </BlogPublic>
        <BlogPublic :count="countviews">
          <template #icon>
            <EyeIcon />
          </template>
        </BlogPublic>
        <BlogPublic :count="countcomments">
          <template #icon>
            <CommentIcon />
          </template>
        </BlogPublic>
      </div>
    </div>
    <div
      ref="shareBottomRef"
      class="relative flex content-end justify-end w-[10%] h-auto text-[#6E6E6E] dark:text-[#B2AEAE]"
    >
      <!-- Tombol Share -->
      <div @click.stop="handleBottom" class="cursor-pointer">
        <ShareIcon />
      </div>

      <!-- Dropdown -->
      <div
        v-if="shareOpenBottom"
        class="absolute mt-5 w-48 md:w-56 z-30 left-[50%] md:left-[80%] -translate-x-1/2"
      >
        <BlogShareMenu />
      </div>
    </div>
  </div>
  <div class="w-full mt-10 px-12 md:px-12 xl:px-28">
    <div class="w-full h-[2px] bg-[#DADADA]" />
  </div>
  <!-- Post At and Author -->
  <section
    class="flex flex-row justify-between w-full max-w-none md:max-w-xl lg:max-w-4xl h-auto py-2 mx-auto mt-6 px-8 md:px-0"
  >
    <div
      class="flex flex-col md:flex-row w-full h-auto gap-x-2 md:gap-x-5 items-center"
    >
      <div
        class="w-8 h-8 md:w-14 md:h-14 lg:w-14 lg:h-14 mb-2 flex items-center justify-center"
      >
        <div class="w-full h-full bg-[#D9D9D9] rounded-full"></div>
      </div>
      <div
        class="w-[80%] md:w-[60%] h-auto flex items-center text-center md:text-start"
      >
        <p class="text-[14px] md:text-[14px] lg:text-[17px]">
          <span class="font-[600]">Published in</span> Seleris Meditekno
          International
        </p>
      </div>
    </div>
    <div
      class="flex flex-col md:flex-row w-full h-auto gap-x-2 md:gap-x-5 md:justify-end items-center"
    >
      <div class="w-8 h-8 md:w-14 md:h-14 lg:w-14 lg:h-14 mb-2">
        <div class="w-full h-full bg-[#D9D9D9] rounded-full" />
      </div>
      <div
        class="w-[80%] md:w-[60%] h-auto flex items-center text-center md:text-start"
      >
        <p class="text-[14px] md:text-[14px] lg:text-[17px]">
          <span class="font-[600]">Written by</span> Annisa Maulida Rahma
        </p>
      </div>
    </div>
  </section>
  <!-- Comments -->
  <section
    class="flex flex-col w-full max-w-none md:max-w-xl lg:max-w-4xl h-auto py-2 mx-auto mt-6 px-14 md:px-0"
  >
    <div class="w-full h-auto">
      <p>Comments (10)</p>
    </div>
    <div class="w-full h-auto mt-5">
      <input
        name="comment"
        type="text"
        placeholder="Share your thoughts?"
        class="w-full bg-[#EBEBEB] rounded-[10px] py-3 px-3"
      />
    </div>
  </section>
  <section
    class="flex flex-col w-full max-w-none md:max-w-xl lg:max-w-4xl h-auto py-2 mx-auto mt-6 px-14 md:px-0 gap-y-16"
  >
    <!-- Comment 2 -->
    <div class="w-full h-auto flex flex-col">
      <div class="w-full h-auto">
        <p
          class="font-[500] text-[#000000] dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-br dark:from-[#FAFAFA] dark:via-[#D4D4D4] dark:to-[#AAAAAA]"
        >
          Maulana Riski
        </p>
      </div>
      <div class="w-full h-auto">
        <p class="font-[400] text-[#000000] dark:text-[#565656]">21 Jul 2020</p>
      </div>
      <div class="w-full h-auto mt-3">
        <p class="text-[#535862] dark:text-[#DADADA]">
          This is a really helpful reminder of how important it is to plan ahead
          financially, especially with so much uncertainty these days. I
          appreciate the practical tips!
        </p>
      </div>
    </div>
    <!-- See More -->
    <div class="w-full h-auto flex flex-col">
      <div class="w-full h-auto">
        <p class="font-[500] text-[#2AB857]">See More..</p>
      </div>
    </div>
  </section>
</template>
