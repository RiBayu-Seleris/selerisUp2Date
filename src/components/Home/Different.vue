<script setup>
import DifferentSection from "@/components/reusable/Different.vue";
import DifferentMobileSection from "@/components/reusable/DifferentMobile.vue";
import RobotAI from "@/assets/images/robot-ai4.png";
import RobotAI2 from "@/assets/images/robot-ai3.svg";
import DifferentCard from "@/components/reusable/DifferentCard.vue";

import teamIcon from "@/assets/icons/our-team.svg";
import innovationIcon from "@/assets/icons/innovation.svg";
import missionIcon from "@/assets/icons/mission.svg";
import performanceIcon from "@/assets/icons/performance.svg";
</script>

<template>
  <DifferentSection
    bgImage="bg-different dark:bg-differentDark bg-cover bg-no-repeat"
    :title="$t('home.different.title')"
    :subtitle="$t('home.different.subtitle')"
    :robotImage="RobotAI"
  >
    <template #default>
      <div class="flex flex-row mb-10">
        <DifferentCard
          :image="teamIcon"
          :title="$t('home.different.items.team.title')"
          :subtitle="$t('home.different.items.team.subtitle')"
          subtitleClass="xl:pr-32"
        />
        <DifferentCard
          :image="innovationIcon"
          :title="$t('home.different.items.innovation.title')"
          :subtitle="$t('home.different.items.innovation.subtitle')"
          subtitleClass="lg:pr-10 xl:pr-20"
        />
      </div>
      <div class="flex flex-row">
        <DifferentCard
          :image="missionIcon"
          :title="$t('home.different.items.missions.title')"
          :subtitle="$t('home.different.items.missions.subtitle')"
          subtitleClass="lg:pr-14 xl:pr-24"
        />
        <DifferentCard
          :image="performanceIcon"
          :title="$t('home.different.items.performance.title')"
          :subtitle="$t('home.different.items.performance.subtitle')"
        />
      </div>
    </template>
    <template #mobile>
      <DifferentMobileSection
        :title="$t('home.different.title')"
        :subtitle="$t('home.different.subtitle')"
        :robotImage="RobotAI2"
      >
        <template #mobileContentDifferent>
          <div class="w-full mb-5">
            <DifferentCard
              :image="teamIcon"
              :title="$t('home.different.items.team.title')"
              :subtitle="$t('home.different.items.team.subtitle')"
              subtitleClass="pr-10"
            />
          </div>
          <div class="w-full mb-5">
            <DifferentCard
              :image="innovationIcon"
              :title="$t('home.different.items.innovation.title')"
              :subtitle="$t('home.different.items.innovation.subtitle')"
              subtitleClass="pr-10"
            />
          </div>
          <div class="w-full mb-5">
            <DifferentCard
              :image="missionIcon"
              :title="$t('home.different.items.missions.title')"
              :subtitle="$t('home.different.items.missions.subtitle')"
              subtitleClass="pr-10"
            />
          </div>
          <div class="w-full mb-5">
            <DifferentCard
              :image="performanceIcon"
              :title="$t('home.different.items.performance.title')"
              :subtitle="$t('home.different.items.performance.subtitle')"
            />
          </div>
        </template>
      </DifferentMobileSection>
    </template>
  </DifferentSection>
</template>
