<script setup>
import { nextTick, provide, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import { healthPricing360 } from "@/Data/workshops/healthpricing360";
import { useWorkshopDetail } from "@/composables/useWorkshopDetail";
import { usePageMeta } from "@/composables/usePageMeta";
import { useContentReady } from "@/components/Products/Shield/useContentReady";
import { scrollToSection } from "@/utils/scrollToSection";
import WorkshopHero from "@/components/Workshop/HealthPricing360/WorkshopHero.vue";
import WorkshopOverview from "@/components/Workshop/HealthPricing360/WorkshopOverview.vue";
import WorkshopCurriculum from "@/components/Workshop/HealthPricing360/WorkshopCurriculum.vue";
import WorkshopAgenda from "@/components/Workshop/HealthPricing360/WorkshopAgenda.vue";
import WorkshopShield from "@/components/Workshop/HealthPricing360/WorkshopShield.vue";
import WorkshopAudience from "@/components/Workshop/HealthPricing360/WorkshopAudience.vue";
import WorkshopBenefits from "@/components/Workshop/HealthPricing360/WorkshopBenefits.vue";
import WorkshopInfo from "@/components/Workshop/HealthPricing360/WorkshopInfo.vue";
import WorkshopFaq from "@/components/Workshop/HealthPricing360/WorkshopFaq.vue";
import WorkshopCta from "@/components/Workshop/HealthPricing360/WorkshopCta.vue";
import WorkshopRegisterModal from "@/components/Workshop/HealthPricing360/WorkshopRegisterModal.vue";

const { t } = useI18n();
const route = useRoute();
const ready = useContentReady();
const workshop = useWorkshopDetail(healthPricing360);

const registrationOpen = ref(false);
const openRegistration = () => {
  registrationOpen.value = true;
};
provide("hpOpenRegistration", openRegistration);

watch(
  [ready, () => route.hash],
  ([isReady, hash]) => {
    if (!isReady || !hash) return;
    const id = hash.slice(1);
    nextTick(() =>
      setTimeout(() => {
        if (id === "daftar") openRegistration();
        else scrollToSection(id);
      }, 300),
    );
  },
  { immediate: true },
);

usePageMeta(() => ({
  title: t("workshop.healthpricing360.seo.title"),
  description: t("workshop.healthpricing360.seo.description"),
  path: workshop.path,
  image: workshop.seo.ogImage,
}));
</script>

<template>
  <div class="relative w-full pb-8">
    <WorkshopHero :workshop="workshop" />
    <WorkshopOverview />
    <WorkshopCurriculum :workshop="workshop" />
    <WorkshopAgenda :workshop="workshop" />
    <WorkshopShield />
    <WorkshopAudience />
    <WorkshopBenefits :workshop="workshop" />
    <WorkshopInfo :workshop="workshop" />
    <WorkshopFaq :workshop="workshop" />
    <WorkshopCta />
    <WorkshopRegisterModal
      :open="registrationOpen"
      :workshop="workshop"
      @close="registrationOpen = false"
    />
  </div>
</template>
