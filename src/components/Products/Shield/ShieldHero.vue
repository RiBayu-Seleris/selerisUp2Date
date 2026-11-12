<script setup>
import ShieldHeroFan from "@/components/Products/Shield/ShieldHeroFan.vue";
import ShieldPlayIcon from "@/components/Products/Shield/ShieldPlayIcon.vue";
import { SHIELD_PLAY_STORE } from "@/Data/Products/Shield/ShieldLinks.js";
import { useContentReady } from "@/components/Products/Shield/useContentReady.js";

const ready = useContentReady();
</script>

<template>
  <section
    id="hero"
    class="shield-hero relative flex w-full min-h-svh flex-col justify-center overflow-hidden"
    :class="{ 'is-ready': ready }"
  >
    <div class="absolute inset-0 z-0">
      <ShieldHeroFan />
    </div>

    <div
      class="relative z-10 mx-auto max-w-[1040px] px-8 lg:px-[22px] w-full pt-[100px] md:pt-[110px] pb-[48px] md:pb-[56px] text-center"
    >
      <h1
        class="shield-hero__title text-[#253F65] font-medium tracking-[-0.01em] text-[32px] leading-[1.18] sm:text-[40px] md:text-[54px] lg:text-[60px] xl:text-[68px] xl:leading-[1.12]"
      >
        <span class="shield-hero__line">
          <span>{{ $t("products.shield.landing.hero.titleLine1") }}</span>
        </span>
        <span class="shield-hero__line">
          <span>{{ $t("products.shield.landing.hero.titleLine2") }}</span>
        </span>
      </h1>
      <p
        class="shield-hero__fade shield-hero__fade--1 mx-auto mt-[20px] md:mt-[26px] max-w-[620px] text-[#434750] text-[16px] md:text-[18px] xl:text-[20px] leading-[1.7]"
      >
        {{ $t("products.shield.hero.description") }}
      </p>
      <div
        class="shield-hero__fade shield-hero__fade--2 mt-[32px] md:mt-[40px]"
      >
        <a
          :href="SHIELD_PLAY_STORE"
          target="_blank"
          rel="noopener noreferrer"
          class="shield-hero__cta inline-flex items-center gap-[10px] h-[46px] md:h-[52px] px-[26px] md:px-[30px] rounded-full text-white text-[15px] md:text-[17px] font-medium"
        >
          <ShieldPlayIcon class="w-[16px] h-[16px]" />
          {{ $t("products.shield.landing.downloadApp") }}
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.shield-hero {
  background: linear-gradient(
    180deg,
    #d5eefb 0%,
    #e6f4fb 32%,
    #f1f8fb 58%,
    #f8fafc 100%
  );
}

.shield-hero__line {
  display: block;
  overflow: hidden;
  padding-bottom: 0.06em;
}

.shield-hero__line > span {
  display: inline-block;
  text-wrap: balance;
  transform: translateY(105%);
}

.shield-hero__fade {
  opacity: 0;
}

.is-ready .shield-hero__line > span {
  animation: shield-rise 1s cubic-bezier(0.2, 0.7, 0.1, 1) both;
}

.is-ready .shield-hero__line:nth-child(2) > span {
  animation-delay: 0.12s;
}

.is-ready .shield-hero__fade {
  animation: shield-fade 0.9s ease-out both;
}

.is-ready .shield-hero__fade--1 {
  animation-delay: 0.35s;
}

.is-ready .shield-hero__fade--2 {
  animation-delay: 0.5s;
}

.shield-hero__cta {
  background-image: linear-gradient(90deg, #0b2c5d 0%, #315a95 100%);
  box-shadow: 0 14px 30px -14px rgba(11, 44, 93, 0.7);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.shield-hero__cta:hover {
  transform: translateY(-2px);
  box-shadow: 0 18px 34px -14px rgba(11, 44, 93, 0.85);
}

@keyframes shield-rise {
  from {
    transform: translateY(105%);
  }
  to {
    transform: translateY(0);
  }
}

@keyframes shield-fade {
  from {
    opacity: 0;
    transform: translateY(14px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .shield-hero__line > span,
  .shield-hero__fade,
  .is-ready .shield-hero__line > span,
  .is-ready .shield-hero__fade {
    animation: none;
    transform: none;
    opacity: 1;
  }
}
</style>
