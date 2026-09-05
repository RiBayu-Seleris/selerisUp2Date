<script setup>
import DifferentSection from "@/components/reusable/Different.vue";
import DifferentMobileSection from "@/components/reusable/DifferentMobile.vue";
import RobotAI from "@/assets/images/robot-ai.svg";
import RobotAI2 from "@/assets/images/robot-ai3.svg";
import DifferentCard from "@/components/reusable/DifferentCard.vue";

import AccuracyIcon from "@/assets/icons/About-Accuracy.png";
import EfficiencyIcon from "@/assets/icons/About-Efficiency.png";
import InnovationIcon from "@/assets/icons/About-Innovation.png";
import WhySelerisIcon from "@/assets/icons/About-Why-Seleris.png";
</script>

<template>
  <DifferentSection
    bgImage="bg-different dark:bg-differentDark bg-cover bg-no-repeat"
    :title="$t('about.deliver.title')"
    :subtitle="$t('about.deliver.subtitle')"
    :robotImage="RobotAI"
  >
    <template #default>
      <div class="flex flex-row mb-10">
        <DifferentCard
          :image="WhySelerisIcon"
          :title="$t('about.deliver.whySeleris.title')"
          :subtitle="$t('about.deliver.whySeleris.subtitle')"
        />
        <DifferentCard
          :image="EfficiencyIcon"
          :title="$t('about.deliver.efficiency.title')"
          :subtitle="$t('about.deliver.efficiency.subtitle')"
        />
      </div>
      <div class="flex flex-row">
        <DifferentCard
          :image="AccuracyIcon"
          :title="$t('about.deliver.accuracy.title')"
          subtitleClass="pr-5"
          :subtitle="$t('about.deliver.accuracy.subtitle')"
        />
        <DifferentCard
          :image="InnovationIcon"
          :title="$t('about.deliver.innovation.title')"
          :subtitle="$t('about.deliver.innovation.subtitle')"
        />
      </div>
    </template>
    <template #mobile>
      <DifferentMobileSection
        :title="$t('about.deliver.title')"
        :subtitle="$t('about.deliver.subtitle')"
        :robotImage="RobotAI2"
      >
        <template #mobileContentDifferent>
          <div class="w-full mb-5">
            <DifferentCard
              :image="WhySelerisIcon"
              :title="$t('about.deliver.whySeleris.title')"
              :subtitle="$t('about.deliver.whySeleris.subtitle')"
            />
          </div>
          <div class="w-full mb-5">
            <DifferentCard
              :image="EfficiencyIcon"
              :title="$t('about.deliver.efficiency.title')"
              :subtitle="$t('about.deliver.efficiency.subtitle')"
            />
          </div>
          <div class="w-full mb-5">
            <DifferentCard
              :image="AccuracyIcon"
              :title="$t('about.deliver.accuracy.title')"
              :subtitle="$t('about.deliver.accuracy.subtitle')"
            />
          </div>
          <div class="w-full mb-5">
            <DifferentCard
              :image="InnovationIcon"
              :title="$t('about.deliver.innovation.title')"
              :subtitle="$t('about.deliver.innovation.subtitle')"
            />
          </div>
        </template>
      </DifferentMobileSection>
    </template>
  </DifferentSection>
</template>
