<script setup>
import HeroText from "@/components/reusable/HeroText.vue";
</script>
<template>
  <div
    class="flex w-full h-auto pt-[120px] md:pt-[150px] lg:pt-[160px] xl:pt-[160px] px-6 md:px-0"
  >
    <HeroText
      :title="$t('contact.contactTitle')"
      :subtitle="$t('contact.contactSubtitle')"
      :description="$t('contact.contactDescription')"
    />
  </div>
</template>
