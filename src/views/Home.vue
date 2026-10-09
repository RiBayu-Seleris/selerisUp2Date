<script setup>
import { ref } from "vue";
import Herosection from "@/components/Home/Herosection.vue";
import PartnersClients from "@/components/Home/PartnersClients.vue";
import PartnersClientsMobile from "@/components/Home/PartnersClientsMobile.vue";
import Description from "@/components/Description.vue";
import AiDesc from "@/components/Home/AiDesc.vue";
import Technology from "@/components/Home/Technology.vue";
import Solutions from "@/components/Home/Solutions.vue";
import Certificate from "@/components/Certificate.vue";
import Supported from "@/components/Supported.vue";
import Benefits from "@/components/Home/Benefits.vue";
import Testimonial from "@/components/Home/Testimonial.vue";
import Blogs from "@/components/Home/Blogs.vue";
import Different from "@/components/Home/Different.vue";
import FaceTracker from "@/components/Home/FaceTracker.vue";
import { useHomeCinematicMotion } from "@/composables/useHomeCinematicMotion";
// import Roadmap from "@/components/Home/Roadmap.vue";

const heroSection = ref(null);
useHomeCinematicMotion(heroSection);
</script>

<template>
  <section
    ref="heroSection"
    data-home-motion
    data-home-hero
    class="relative flex w-full h-auto px-8 xls:px-8 2xls:px-0"
  >
    <Herosection />
  </section>

  <section
    data-home-motion
    data-home-reveal="rise"
    class="hidden lg:flex w-full h-auto"
  >
    <PartnersClients />
  </section>

  <section
    data-home-motion
    data-home-reveal="rise"
    class="lg:hidden flex w-full h-auto"
  >
    <PartnersClientsMobile />
  </section>

  <section
    data-home-motion
    data-home-reveal="zoom"
    class="flex flex-col relative w-full h-auto mt-10 md:mt-10 lg:mt-24"
  >
    <Certificate />
  </section>

  <section
    data-home-motion
    data-home-reveal="rise"
    class="flex flex-col relative w-full h-auto mt-10 md:mt-10 lg:mt-24"
  >
    <Supported />
  </section>

  <section
    data-home-motion
    data-home-native
    class="flex flex-col relative w-full h-auto mt-10 lg:mt-14 min-xls:mt-28 px-8 xls:px-8"
  >
    <Description />
  </section>

  <section
    data-home-motion
    data-home-stack-base
    class="flex flex-col relative w-full h-auto mt-10 sm:mt-10 md:mt-16 xl:mt-16"
  >
    <Benefits />
  </section>

  <section
    data-home-motion
    data-home-stack-cover
    class="flex flex-col relative w-full h-auto mt-24 lg:mt-10 px-8 xl:mt-28"
  >
    <AiDesc />
  </section>

  <section
    data-home-motion
    data-home-door
    class="flex flex-col relative w-full h-auto mt-24 lg:mt-10 px-8 xl:mt-28"
  >
    <Technology />

    <div aria-hidden="true" class="home-door-overlay">
      <div
        data-home-door-left
        class="home-door-panel home-door-panel--left"
      ></div>
      <div
        data-home-door-right
        class="home-door-panel home-door-panel--right"
      ></div>
      <div data-home-door-light class="home-door-light"></div>
    </div>
  </section>

  <section
    data-home-motion
    data-home-reveal="rise"
    class="flex relative w-full h-auto mt-24 lg:mt-10 xl:mt-28"
  >
    <FaceTracker />
  </section>

  <section
    data-home-motion
    data-home-reveal="zoom"
    class="flex flex-col relative w-full h-auto mt-24 lg:mt-10 xl:mt-36"
  >
    <Solutions />
  </section>

  <section
    data-home-motion
    data-home-reveal="rise"
    class="flex flex-col relative w-full h-auto mt-24 xl:mt-32 mb-10"
  >
    <Testimonial />
  </section>

  <section
    data-home-motion
    data-home-reveal="zoom"
    class="flex flex-col relative w-full h-auto mt-24 xl:mt-32 mb-10"
  >
    <Blogs />
  </section>

  <section
    data-home-motion
    data-home-reveal="rise"
    class="flex flex-col relative w-full h-auto px-8 xls:px-8 2xls:px-0 mt-24"
  >
    <Different />
  </section>

  <!-- <section
    data-aos="fade-up" class="flex flex-col relative w-full h-auto my-20">
    <Roadmap />
  </section> -->
</template>

<style scoped>
/* Satu pengendali reveal per section, termasuk kartu AOS di komponen anak. */
.home-motion-managed :deep([data-aos]) {
  opacity: 1 !important;
  transform: none !important;
  transition: none !important;
}

.home-stack-ready {
  background-color: #f9fafb;
}

:global(html.dark) .home-stack-ready {
  background-color: #17181a;
}

.home-door-overlay {
  position: absolute;
  inset: 0 4.5rem;
  z-index: 30;
  overflow: hidden;
  border-radius: 1rem;
  perspective: 1500px;
  pointer-events: none;
}

.home-door-panel {
  position: absolute;
  top: 0;
  bottom: 0;
  width: calc(50% + 1px);
  opacity: 0;
  visibility: hidden;
  backface-visibility: hidden;
  will-change: transform, opacity;
  background:
    linear-gradient(180deg, rgba(42, 184, 87, 0.2), transparent 34%),
    repeating-linear-gradient(
      0deg,
      transparent 0,
      transparent 43px,
      rgba(108, 234, 149, 0.1) 44px,
      rgba(108, 234, 149, 0.1) 45px
    ),
    linear-gradient(145deg, #143f56 0%, #0c293a 52%, #071821 100%);
  box-shadow: inset 0 0 70px rgba(0, 0, 0, 0.36);
}

.home-door-panel::before {
  content: "";
  position: absolute;
  inset: 1.15rem;
  border: 1px solid rgba(127, 240, 164, 0.2);
  border-radius: 1rem;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.08),
    transparent 45%
  );
}

.home-door-panel::after {
  content: "";
  position: absolute;
  top: 12%;
  bottom: 12%;
  width: 2px;
  border-radius: 999px;
  background: linear-gradient(
    180deg,
    transparent,
    rgba(105, 255, 154, 0.8),
    transparent
  );
  box-shadow: 0 0 20px rgba(42, 184, 87, 0.65);
}

.home-door-panel--left {
  left: 0;
  transform-origin: left center;
  border-radius: 1.5rem 0 0 1.5rem;
}

.home-door-panel--left::after {
  right: 0;
}

.home-door-panel--right {
  right: 0;
  transform-origin: right center;
  border-radius: 0 1.5rem 1.5rem 0;
}

.home-door-panel--right::after {
  left: 0;
}

.home-door-light {
  position: absolute;
  top: 7%;
  bottom: 7%;
  left: 50%;
  width: 5px;
  opacity: 0;
  visibility: hidden;
  transform: translateX(-50%);
  border-radius: 999px;
  background: #b9ffd0;
  box-shadow:
    0 0 20px rgba(102, 255, 151, 0.95),
    0 0 70px rgba(42, 184, 87, 0.8),
    0 0 140px rgba(42, 184, 87, 0.55);
  pointer-events: none;
}

.home-door-ready .home-door-panel,
.home-door-ready .home-door-light {
  opacity: 1;
  visibility: visible;
}

@media (max-width: 1023px), (prefers-reduced-motion: reduce) {
  .home-door-overlay {
    display: none;
  }
}
</style>
