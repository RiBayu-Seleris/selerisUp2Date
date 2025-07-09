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
    bgImage="bg-different bg-cover bg-no-repeat"
    title="What Makes Us Different?"
    subtitle="We bring solutions to make life insurance for our customers."
    :robotImage="RobotAI"
  >
    <template #default>
      <div class="flex flex-row mb-10">
        <DifferentCard
          :image="teamIcon"
          title="Our Team"
          subtitle="Collaboration and Teamwork."
          subtitleClass="xl:pr-32"
        />
        <DifferentCard
          :image="innovationIcon"
          title="Innovation"
          subtitle="Developing innovative and effective solutions."
          subtitleClass="xl:pr-20"
        />
      </div>
      <div class="flex flex-row">
        <DifferentCard
          :image="missionIcon"
          title="Missions"
          subtitle="Efficient, accurate, and accessible."
          subtitleClass="xl:pr-24"
        />
        <DifferentCard
          :image="performanceIcon"
          title="Optimal Perfomance"
          subtitle="Equipped with advanced technology to ensure smoothness and speed."
        />
      </div>
    </template>
    <template #mobile>
      <DifferentMobileSection
        title="What Makes Us Different?"
        subtitle="We bring solutions to make life insurance for our customers."
        :robotImage="RobotAI2"
      >
        <template #mobileContentDifferent>
          <div class="w-full mb-5">
            <DifferentCard
              :image="teamIcon"
              title="Our Team"
              subtitle="Collaboration and Teamwork."
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
              :image="missionIcon"
              title="Missions"
              subtitle="Efficient, accurate, and accessible."
            />
          </div>
          <div class="w-full mb-5">
            <DifferentCard
              :image="performanceIcon"
              title="Optimal Perfomance"
              subtitle="Equipped with advanced technology to ensure smoothness and speed."
            />
          </div>
        </template>
      </DifferentMobileSection>
    </template>
  </DifferentSection>
</template>
