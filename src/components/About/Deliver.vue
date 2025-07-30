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
    title="About Us"
    subtitle="We are committed to deliver efficient and effective products and services."
    :robotImage="RobotAI"
  >
    <template #default>
      <div class="flex flex-row mb-10">
        <DifferentCard
          :image="WhySelerisIcon"
          title="Why Seleris"
          subtitle="Seleris helps businesses assess people faster, smarter, and easier."
        />
        <DifferentCard
          :image="EfficiencyIcon"
          title="Efficiency"
          subtitle="Cut costs and processing time by up to 50 percent."
        />
      </div>
      <div class="flex flex-row">
        <DifferentCard
          :image="AccuracyIcon"
          title="Accuracy"
          subtitleClass="pr-5"
          subtitle="AI delivers accurate results, even with limited user data."
        />
        <DifferentCard
          :image="InnovationIcon"
          title="Innovation"
          subtitle="Online process is quick, easy, and accessible for everyone."
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
              :image="WhySelerisIcon"
              title="Why Seleris"
              subtitle="Seleris helps businesses assess people faster, smarter, and easier."
            />
          </div>
          <div class="w-full mb-5">
            <DifferentCard
              :image="EfficiencyIcon"
              title="Efficiency"
              subtitle="Cut costs and processing time by up to 50 percent."
            />
          </div>
          <div class="w-full mb-5">
            <DifferentCard
              :image="AccuracyIcon"
              title="Accuracy"
              subtitle="AI delivers accurate results, even with limited user data."
            />
          </div>
          <div class="w-full mb-5">
            <DifferentCard
              :image="InnovationIcon"
              title="Innovation"
              subtitle="Online process is quick, easy, and accessible for everyone."
            />
          </div>
        </template>
      </DifferentMobileSection>
    </template>
  </DifferentSection>
</template>
