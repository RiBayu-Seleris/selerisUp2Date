<script setup>
import HeroText from "@/components/reusable/HeroText.vue";
</script>

<template>
  <div class="flex w-full h-auto pt-[90px] md:pt-[100px] xl:pt-[140px]">
    <HeroText
      :title="$t('blog.heroTitle')"
      :subtitle="$t('blog.heroSubtitle')"
      :description="$t('blog.heroDescription')"
    />
  </div>
</template>
