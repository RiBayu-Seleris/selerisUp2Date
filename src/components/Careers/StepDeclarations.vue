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
  <h2 class="text-xl font-semibold text-[#195279] mb-4">
    Declaration and Consent
  </h2>

  <div class="space-y-5">
    <label class="flex items-start gap-4 w-full cursor-pointer">
      <input
        type="checkbox"
        class="mt-1 w-5 h-5"
        :checked="props.trueData"
        @change="emit('update:trueData', $event.target.checked)"
      />
      <span class="text-justify">
        Saya menyatakan bahwa seluruh data yang saya isi dalam formulir ini
        adalah benar dan dapat dipertanggungjawabkan
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
        Saya memberikan izin kepada perusahaan untuk menggunakan data ini dalam
        proses rekrutmen sesuai kebijakan yang berlaku.
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
        Saya bersedia untuk dilakukan proses pemeriksaan latar belakang
        (background check) sesuai dengan ketentuan perusahaan.
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
