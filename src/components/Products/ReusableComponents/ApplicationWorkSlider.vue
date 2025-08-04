<script setup>
import WorkPhone from "@productComponents/WorkPhone.vue";
import WorkLine from "@productComponents/WorkLine.vue";

defineProps({
  circleColor: {
    type: String,
  },
  textcolor: {
    type: String,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  steps: {
    type: Array,
    default: () => [],
  },
});
</script>

<template>
  <div
    class="relative flex flex-row w-full h-auto pb-8 overflow-x-auto snap-x snap-mandatory scroll-pl-8 pl-8 pr-8 md:scroll-pl-[70px] md:pl-[70px] md:pr-8 hide-scrollbar"
  >
    <template v-for="(step, index) in steps" :key="index">
      <!-- Phone -->
      <WorkPhone />
      <!-- Line Frame -->
      <WorkLine
        :circleColor="circleColor"
        :textcolor="textcolor"
        :title="step.title"
        :description="step.description"
        :isLast="index === steps.length - 1"
      >
        <slot />
      </WorkLine>
    </template>
    <!-- Phone -->
    <!-- <WorkPhone /> -->
  </div>
</template>
