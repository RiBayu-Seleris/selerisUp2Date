<script setup>
import ShieldCtaWaves from "@/components/Products/Shield/ShieldCtaWaves.vue";
</script>

<template>
  <section
    id="bookdemo"
    class="relative w-full px-8 lg:px-[22px] pt-[22px] md:pt-[36px]"
  >
    <div
      class="cta-card relative overflow-hidden rounded-[22px] md:rounded-[29px] bg-white"
    >
      <div class="cta-waves">
        <ShieldCtaWaves />
      </div>

      <div
        class="relative z-10 mx-auto max-w-[810px] px-[22px] pt-[135px] pb-[99px] md:pt-[207px] md:pb-[117px] xl:pt-[243px] xl:pb-[135px] text-center"
      >
        <h2
          data-aos="fade-up"
          class="text-[#0B1B33] font-medium tracking-[-0.02em] text-[27px] leading-[1.15] md:text-[40px] xl:text-[50px] xl:leading-[1.12]"
        >
          <span class="block">{{
            $t("products.shield.landing.cta.titleLine1")
          }}</span>
          <span class="block">{{
            $t("products.shield.landing.cta.titleLine2")
          }}</span>
        </h2>
        <p
          data-aos="fade-up"
          data-aos-delay="100"
          class="mx-auto mt-[18px] max-w-[468px] text-[#3B4250] text-[14px] md:text-[16px] xl:text-[17px] leading-[1.6]"
        >
          {{ $t("products.shield.landing.cta.description") }}
        </p>
        <div
          data-aos="fade-up"
          data-aos-delay="180"
          class="mt-[32px] md:mt-[40px]"
        >
          <a
            href="/book-a-demo"
            target="_blank"
            rel="noopener noreferrer"
            class="cta-button inline-flex items-center gap-[7px] h-[41px] md:h-[45px] px-[29px] rounded-full bg-[#0071E7] text-white text-[14px] font-medium"
          >
            {{ $t("products.shield.landing.cta.button") }}
            <svg
              viewBox="0 0 20 20"
              fill="none"
              class="cta-button__arrow h-[14px] w-[14px]"
              aria-hidden="true"
            >
              <path
                d="M4 10h12m0 0-4.5-4.5M16 10l-4.5 4.5"
                stroke="currentColor"
                stroke-width="1.6"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cta-card {
  box-shadow: 0 1px 0 rgba(11, 44, 93, 0.04);
}

.cta-waves {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.cta-button {
  box-shadow: 0 14px 28px -14px rgba(0, 113, 231, 0.8);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease,
    background-color 0.3s ease;
}

.cta-button__arrow {
  transition: transform 0.3s ease;
}

@media (hover: hover) {
  .cta-button:hover {
    background: #005fc4;
    transform: translateY(-2px);
    box-shadow: 0 18px 32px -14px rgba(0, 113, 231, 0.9);
  }

  .cta-button:hover .cta-button__arrow {
    transform: translateX(3px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .cta-button,
  .cta-button__arrow {
    transition: none;
  }
}
</style>
