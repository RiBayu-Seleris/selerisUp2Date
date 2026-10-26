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
  growCard: Boolean,
  descriptionClass: {
    type: String,
    default: "text-[10px] md:text-[14px] lg:text-[18px]",
  },
});
</script>

<template>
  <div
    class="relative flex flex-row w-full h-auto overflow-x-auto snap-x snap-mandatory scroll-pl-[15%] pl-[15%] pr-20 md:scroll-pl-[20%] md:pl-[50%] md:pr-20 xl:scroll-pl-0 xl:pl-[50%] xl:pr-[50%] hide-scrollbar"
    :class="growCard ? 'pb-24 md:pb-28 lg:pb-32' : 'pb-8'"
  >
    <template v-for="(step, index) in steps" :key="index">
      <WorkPhone :image="step.image" />

      <WorkLine
        :circleColor="circleColor"
        :textcolor="textcolor"
        :title="step.title"
        :description="step.description"
        :isLast="index === steps.length - 1"
        :index="index"
        :growCard="growCard"
        :descriptionClass="descriptionClass"
      >
        <slot />
      </WorkLine>
    </template>

    <!-- <WorkPhone /> -->
  </div>
</template>
