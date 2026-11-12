<script setup>
import { onMounted, onBeforeUnmount, ref } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { clientLogos } from "@/Data/Products/Shield/ShieldClients";

gsap.registerPlugin(ScrollTrigger);

const STAGGER = 1;

const list = ref(null);
let ctx = null;

onMounted(() => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  ctx = gsap.context(() => {
    const items = gsap.utils.toArray(".client-slot__logo", list.value);
    gsap.set(items, { autoAlpha: 0 });

    ScrollTrigger.create({
      trigger: list.value,
      start: "top 70%",
      once: true,
      onEnter: () => {
        const edge = document.documentElement.clientWidth;
        const distances = items.map(
          (el) => edge - el.getBoundingClientRect().left,
        );
        gsap
          .timeline()
          .fromTo(
            items,
            { x: (i) => distances[i] },
            { x: 0, duration: 1.6, ease: "power2.out", stagger: STAGGER },
            0,
          )
          .fromTo(
            items,
            { autoAlpha: 0 },
            { autoAlpha: 1, duration: 0.4, ease: "none", stagger: STAGGER },
            0,
          );
      },
    });
  }, list.value);
});

onBeforeUnmount(() => ctx?.revert());
</script>

<template>
  <section
    id="client"
    class="client-section relative w-full bg-[#F8FAFC] px-8 lg:px-[29px] py-[58px] md:py-[86px]"
  >
    <div class="mx-auto max-w-[1130px] text-center">
      <h2
        data-aos="fade-up"
        class="text-[#0B2C5D] font-medium tracking-[-0.01em] text-[25px] md:text-[31px] xl:text-[40px] leading-tight"
      >
        {{ $t("products.shared.ourClient") }}
      </h2>
      <p
        data-aos="fade-up"
        data-aos-delay="80"
        class="mx-auto mt-[11px] md:mt-[14px] max-w-[504px] text-[#434750] text-[13px] md:text-[14px] xl:text-[15px] leading-[1.7]"
      >
        {{ $t("products.shield.landing.clients.description") }}
      </p>
      <ul
        ref="list"
        class="mt-[36px] md:mt-[50px] grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 items-center gap-x-[22px] gap-y-[29px]"
      >
        <li
          v-for="(logo, i) in clientLogos"
          :key="i"
          class="client-slot flex h-[65px] items-center justify-center"
        >
          <img
            :src="logo"
            alt=""
            width="200"
            height="72"
            decoding="async"
            class="client-slot__logo h-[65px] w-auto max-w-full object-contain"
          />
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.client-section {
  overflow-x: clip;
}

.client-slot__logo {
  filter: grayscale(1) contrast(1.15) brightness(0.55);
  opacity: 0.85;
  transition: filter 0.5s ease;
}

@media (hover: hover) {
  .client-slot__logo:hover {
    filter: none;
  }
}
</style>
