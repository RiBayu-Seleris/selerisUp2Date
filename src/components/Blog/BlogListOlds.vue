<template>
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
          class="lg:text-[17px] font-[500] text-[#111928] dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-br dark:from-[#FAFAFA] dark:via-[#D4D4D4] dark:to-[#AAAAAA]"
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
