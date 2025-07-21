<script setup>
import DifferentSection from "@/components/reusable/Different.vue";
import DifferentMobileSection from "@/components/reusable/DifferentMobile.vue";
import RobotAI from "@/assets/images/robot-ai.svg";
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
    title="About Us"
    subtitle="We are committed to deliver efficient and effective products and services."
    :robotImage="RobotAI"
  >
    <template #default>
      <div class="flex flex-row mb-10">
        <DifferentCard
          :image="innovationIcon"
          title="Innovation"
          subtitle="Developing innovative and effective solutions."
        />
        <DifferentCard
          :image="innovationIcon"
          title="Innovation"
          subtitle="Developing innovative and effective solutions."
        />
      </div>
      <div class="flex flex-row">
        <DifferentCard
          :image="innovationIcon"
          title="Innovation"
          subtitle="Developing innovative and effective solutions."
        />
        <DifferentCard
          :image="innovationIcon"
          title="Innovation"
          subtitle="Developing innovative and effective solutions."
        />
      </div>
    </template>
    <template #mobile>
      <DifferentMobileSection
        title="About Us"
        subtitle="We are committed to deliver efficient and effective products and services."
        :robotImage="RobotAI2"
      >
        <template #mobileContentDifferent>
          <div class="w-full mb-5">
            <DifferentCard
              :image="innovationIcon"
              title="Innovation"
              subtitle="Developing innovative and effective solutions."
            />
          </div>
          <div class="w-full mb-5">
            <DifferentCard
              :image="innovationIcon"
              title="Innovation"
              subtitle="Developing innovative and effective solutions."
            />
          </div>
          <div class="w-full mb-5">
            <DifferentCard
              :image="innovationIcon"
              title="Innovation"
              subtitle="Developing innovative and effective solutions."
            />
          </div>
          <div class="w-full mb-5">
            <DifferentCard
              :image="innovationIcon"
              title="Innovation"
              subtitle="Developing innovative and effective solutions."
            />
          </div>
        </template>
      </DifferentMobileSection>
    </template>
  </DifferentSection>
</template>
