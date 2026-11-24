<script setup>
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const props = defineProps({
  status: { type: String, required: true },
  dark: { type: Boolean, default: false },
});

const { t } = useI18n();

const TONES = {
  open: {
    light:
      "border-[#1AB24F]/25 bg-[#1AB24F]/[0.08] text-[#138A3D] dark:border-[#3DDC84]/25 dark:bg-[#3DDC84]/10 dark:text-[#5EE38F]",
    dark: "border-[#3DDC84]/30 bg-[#3DDC84]/10 text-[#3DDC84]",
    dot: "bg-[#1AB24F] dark:bg-[#3DDC84]",
    darkDot: "bg-[#3DDC84]",
  },
  full: {
    light:
      "border-[#F79009]/30 bg-[#FFFAEB] text-[#B54708] dark:border-[#F79009]/30 dark:bg-[#F79009]/10 dark:text-[#FEC84B]",
    dark: "border-[#FEC84B]/30 bg-[#FEC84B]/10 text-[#FEC84B]",
    dot: "bg-[#F79009] dark:bg-[#FEC84B]",
    darkDot: "bg-[#FEC84B]",
  },
  closed: {
    light:
      "border-[#E4E7EC] bg-[#F9FAFB] text-[#667085] dark:border-white/10 dark:bg-white/5 dark:text-[#A3A3A3]",
    dark: "border-white/15 bg-white/5 text-white/60",
    dot: "bg-[#98A2B3] dark:bg-[#8A8A8A]",
    darkDot: "bg-white/50",
  },
};

const tone = computed(() => TONES[props.status] || TONES.closed);
const dotClass = computed(() =>
  props.dark ? tone.value.darkDot : tone.value.dot,
);
</script>

<template>
  <span
    class="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-1 font-mono text-[10.5px] font-[600] uppercase tracking-[0.12em]"
    :class="dark ? tone.dark : tone.light"
  >
    <span class="relative flex w-1.5 h-1.5">
      <span
        v-if="status === 'open'"
        class="absolute inset-0 rounded-full animate-ping motion-reduce:animate-none"
        :class="dotClass"
      ></span>
      <span class="relative w-1.5 h-1.5 rounded-full" :class="dotClass"></span>
    </span>
    {{ t(`workshop.list.status.${status}`) }}
  </span>
</template>
