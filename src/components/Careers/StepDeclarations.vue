<script setup>
import { ref, onMounted, onBeforeUnmount, reactive } from "vue";

const props = defineProps({
  trueData: Boolean,
  dataPermission: Boolean,
  backgroundCheck: Boolean,
});

const emit = defineEmits([
  "update:trueData",
  "update:dataPermission",
  "update:backgroundCheck",
]);
</script>

<template>
  <div class="space-y-5">
    <label class="flex items-start gap-4 w-full cursor-pointer">
      <input
        type="checkbox"
        class="mt-1 w-5 h-5"
        :checked="props.trueData"
        @change="emit('update:trueData', $event.target.checked)"
      />
      <span class="text-justify">
        {{ $t("careers.declaration1") }}
      </span>
    </label>

    <label class="flex items-start gap-4 w-full cursor-pointer">
      <input
        type="checkbox"
        class="mt-1 w-5 h-5"
        :checked="props.dataPermission"
        @change="emit('update:dataPermission', $event.target.checked)"
      />
      <span class="text-justify">
        {{ $t("careers.declaration2") }}
      </span>
    </label>

    <label class="flex items-start gap-4 w-full cursor-pointer">
      <input
        type="checkbox"
        class="mt-1 w-5 h-5"
        :checked="props.backgroundCheck"
        @change="emit('update:backgroundCheck', $event.target.checked)"
      />
      <span class="text-justify">
        {{ $t("careers.declaration3") }}
      </span>
    </label>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
