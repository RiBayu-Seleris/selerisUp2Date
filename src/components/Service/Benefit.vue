<script setup>
import { useIsDark } from "@/utils/useIsDark";
import HeroText from "@/components/reusable/HeroText.vue";

// Dipakai di template: video mode terang pakai v-if="!isDark", yang gelap
// pakai v-else. Tujuannya supaya cuma satu video yang benar-benar dibuat
// dan diunduh browser. Penjelasan lengkap ada di src/utils/useIsDark.js
const isDark = useIsDark();
</script>

<template>
  <div class="flex flex-col w-full h-auto">
    <div class="flex w-full h-auto pt-[90px] md:pt-[100px] xl:pt-[100px]">
      <HeroText
        :title="$t('services.benefitsTitle')"
        :subtitle="$t('services.benefitsSubtitle')"
        :description="$t('services.benefitsDescription')"
      />
    </div>
    <div class="flex w-full h-full mt-20">
      <video
        v-if="!isDark"
        autoplay
        muted
        playsinline
        class="w-full h-full object-cover object-center rounded-3xl"
      >
        <source src="@/assets/videos/DesignAPI.mp4" type="video/mp4" />
      </video>
      <video
        v-else
        autoplay
        muted
        playsinline
        class="w-full h-full object-cover object-center rounded-3xl"
      >
        <source src="@/assets/videos/DarkDesignAPI.mp4" type="video/mp4" />
      </video>
    </div>
  </div>
</template>
