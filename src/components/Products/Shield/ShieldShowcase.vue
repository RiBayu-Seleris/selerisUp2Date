<script setup>
import { computed, onMounted, onBeforeUnmount, ref } from "vue";
import { useI18n } from "vue-i18n";
import dashboard from "@/assets/Products/images/Shield/v2/dashboard.webp";
import faceScanning from "@/assets/Products/images/Shield/v2/face-scanning.webp";
import healthResult from "@/assets/Products/images/Shield/v2/health-result.webp";
import { useContentReady } from "@/components/Products/Shield/useContentReady.js";

const { t } = useI18n();
const ready = useContentReady();
const section = ref(null);
const inView = ref(false);
const revealed = computed(() => ready.value && inView.value);

let observer = null;
onMounted(() => {
  observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry.isIntersecting) return;
      inView.value = true;
      observer.disconnect();
    },
    { threshold: 0.2 },
  );
  observer.observe(section.value);
});

onBeforeUnmount(() => observer?.disconnect());

const images = [dashboard, faceScanning, healthResult];
const tones = ["is-mint", "is-sky", "is-ice"];

const cards = computed(() =>
  images.map((image, i) => ({
    image,
    tone: tones[i],
    title: t(`products.shield.landing.showcase.${i}.title`),
    description: t(`products.shield.landing.showcase.${i}.description`),
  })),
);
</script>

<template>
  <section
    id="about"
    ref="section"
    class="relative w-full bg-[#F8FAFC] px-8 lg:px-[29px] pt-[14px] md:pt-[22px] pb-[58px] md:pb-[86px] scroll-mt-[90px]"
    :class="{ 'is-revealed': revealed }"
  >
    <div
      class="mx-auto max-w-[1130px] grid grid-cols-1 md:grid-cols-3 gap-[18px] md:gap-[14px] lg:gap-[27px]"
    >
      <div
        v-for="(card, i) in cards"
        :key="i"
        class="showcase-reveal"
        :style="{ '--reveal-delay': `${i * 450}ms` }"
      >
        <article
          class="showcase-card group relative flex flex-col h-full overflow-hidden rounded-[22px]"
          :class="card.tone"
        >
          <div
            class="px-[22px] pt-[25px] md:px-[18px] md:pt-[22px] lg:px-[29px] lg:pt-[32px]"
          >
            <h2
              class="text-[#0B2C5D] font-medium tracking-[-0.01em] text-[22px] md:text-[20px] lg:text-[24px] xl:text-[27px] leading-tight"
            >
              {{ card.title }}
            </h2>
            <p
              class="mt-[11px] text-[#434750] text-[13px] md:text-[13px] lg:text-[14px] leading-[1.6] max-w-[306px]"
            >
              {{ card.description }}
            </p>
          </div>
          <div
            class="mt-auto pt-[29px] md:pt-[36px] lg:pt-[43px] flex justify-center"
          >
            <img
              :src="card.image"
              :alt="card.title"
              width="303"
              height="404"
              loading="lazy"
              decoding="async"
              class="showcase-card__phone block w-[216px] md:w-[85%] lg:w-[78%] max-w-[273px] h-auto"
            />
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.showcase-reveal {
  opacity: 0;
  transform: translate3d(0, 48px, 0) scale(0.95);
  transition:
    opacity 1.2s ease-out,
    transform 1.4s cubic-bezier(0.2, 0.7, 0.1, 1);
  transition-delay: var(--reveal-delay);
}

.is-revealed .showcase-reveal {
  opacity: 1;
  transform: none;
}

@media (prefers-reduced-motion: reduce) {
  .showcase-reveal {
    opacity: 1;
    transform: none;
    transition: none;
  }
}

.showcase-card {
  border: 1px solid rgba(255, 255, 255, 0.7);
  transition:
    box-shadow 0.5s ease,
    transform 0.5s ease;
}

.showcase-card.is-mint {
  background: linear-gradient(180deg, #eefcfd 0%, #e9f8fc 100%);
}

.showcase-card.is-sky {
  background: linear-gradient(180deg, #d6f4ff 0%, #dff4fd 100%);
}

.showcase-card.is-ice {
  background: linear-gradient(180deg, #e5f6ff 0%, #eaf5fd 100%);
}

.showcase-card::before {
  content: "";
  position: absolute;
  left: 50%;
  bottom: -30%;
  width: 90%;
  aspect-ratio: 1;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(5, 165, 244, 0.22) 0%,
    rgba(5, 165, 244, 0) 65%
  );
  transform: translateX(-50%) scale(0.85);
  opacity: 0;
  transition:
    opacity 0.6s ease,
    transform 0.6s ease;
  pointer-events: none;
}

.showcase-card__phone {
  position: relative;
  transform: translateY(10px);
  transition: transform 0.6s cubic-bezier(0.2, 0.7, 0.1, 1);
  filter: drop-shadow(0 18px 24px rgba(11, 44, 93, 0.12));
}

@media (hover: hover) {
  .showcase-card:hover {
    box-shadow: 0 24px 48px -28px rgba(11, 44, 93, 0.35);
  }

  .showcase-card:hover::before {
    opacity: 1;
    transform: translateX(-50%) scale(1);
  }

  .showcase-card:hover .showcase-card__phone {
    transform: translateY(0);
  }
}
</style>
