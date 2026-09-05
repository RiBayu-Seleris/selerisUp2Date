<script setup>
import HeroText from "@/components/reusable/HeroText.vue";
</script>

<template>
  <div class="flex w-full h-auto pt-[90px] md:pt-[100px] xl:pt-[140px]">
    <HeroText
      :title="$t('careers.heroTitle')"
      :subtitle="$t('careers.heroSubtitle')"
      :description="$t('careers.heroDescription')"
    />
  </div>
</template>
