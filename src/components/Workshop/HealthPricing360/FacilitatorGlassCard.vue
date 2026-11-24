<script setup>
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const props = defineProps({
  person: { type: Object, required: true },
  variant: {
    type: String,
    default: "column",
    validator: (v) =>
      ["feature", "wide", "column", "compact", "cover"].includes(v),
  },
  index: { type: Number, default: 0 },
});

const NS = "workshop.healthpricing360";
const { t } = useI18n();

const WINDOWS = [
  "bg-[linear-gradient(150deg,#0B2A4A_0%,#0E5A45_55%,#1AB24F_120%)]",
  "bg-[linear-gradient(150deg,#0A1B36_0%,#0A3F86_60%,#0071E7_125%)]",
  "bg-[linear-gradient(150deg,#0E4A3A_0%,#0B5E6B_50%,#0071E7_120%)]",
  "bg-[linear-gradient(150deg,#071427_0%,#0E4A3A_55%,#3DDC84_130%)]",
  "bg-[linear-gradient(150deg,#0059B8_0%,#0B5E8A_50%,#3DDC84_130%)]",
];

const windowBg = computed(() => WINDOWS[props.index % WINDOWS.length]);

const captionOnPhoto = computed(() =>
  ["column", "compact", "cover"].includes(props.variant),
);

const windowShape = computed(
  () =>
    ({
      feature: "aspect-[4/5]",
      wide: "aspect-[16/11] sm:aspect-[4/5]",
      column: "aspect-[16/11] sm:aspect-[4/5]",
      compact: "aspect-[16/11] sm:aspect-square",
      cover: "aspect-square",
    })[props.variant],
);

const initialsSize = computed(
  () =>
    ({
      feature: "text-[64px] sm:text-[88px]",
      wide: "text-[48px] sm:text-[56px]",
      column: "text-[52px] sm:text-[64px]",
      compact: "text-[44px] sm:text-[52px]",
      cover: "text-[48px] sm:text-[56px]",
    })[props.variant],
);

const shell = computed(
  () =>
    ({
      feature:
        "grid grid-cols-1 md:grid-cols-[minmax(0,340px)_1fr] gap-2 md:gap-8 p-3 md:p-4",
      wide: "grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-2 sm:gap-5 p-3",
      column: "flex flex-col p-3",
      compact: "flex flex-col p-3",
      cover: "flex flex-col p-3",
    })[props.variant],
);
</script>

<template>
  <article class="fg-card group relative h-full rounded-[28px]">
    <div
      class="relative h-full overflow-hidden rounded-[28px] bg-white/[0.055] backdrop-blur-xl"
      :class="shell"
    >
      <span aria-hidden="true" class="fg-glare"></span>

      <div
        class="fg-window relative overflow-hidden rounded-[20px]"
        :class="[windowShape, windowBg]"
      >
        <img
          v-if="person.photo"
          :src="person.photo"
          :alt="person.name"
          loading="lazy"
          class="absolute inset-0 h-full w-full object-cover"
        />
        <template v-else>
          <span
            aria-hidden="true"
            class="absolute -left-[20%] -top-[15%] w-[70%] aspect-square rounded-full bg-[#3DDC84]/35 blur-[40px]"
          ></span>
          <span
            aria-hidden="true"
            class="absolute -right-[25%] bottom-[5%] w-[75%] aspect-square rounded-full bg-[#4AA8FF]/35 blur-[45px]"
          ></span>
          <span
            aria-hidden="true"
            class="absolute inset-0 flex items-center justify-center font-[700] tracking-[-0.04em] text-white/90"
            :class="[initialsSize, captionOnPhoto ? 'pb-[18%]' : '']"
            >{{ person.initials }}</span
          >
        </template>

        <span
          aria-hidden="true"
          class="pointer-events-none absolute inset-0 rounded-[20px] ring-1 ring-inset ring-white/20"
        ></span>
        <span
          aria-hidden="true"
          class="fg-corner fg-tl left-3 top-3 border-l-2 border-t-2 rounded-tl-[10px]"
        ></span>
        <span
          aria-hidden="true"
          class="fg-corner fg-tr right-3 top-3 border-r-2 border-t-2 rounded-tr-[10px]"
        ></span>
        <span
          aria-hidden="true"
          class="fg-corner fg-bl left-3 bottom-3 border-b-2 border-l-2 rounded-bl-[10px]"
        ></span>
        <span
          aria-hidden="true"
          class="fg-corner fg-br right-3 bottom-3 border-b-2 border-r-2 rounded-br-[10px]"
        ></span>

        <div
          v-if="captionOnPhoto"
          class="absolute inset-x-3 bottom-3 rounded-2xl border border-white/25 bg-white/[0.12] px-4 py-3 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.5)] backdrop-blur-md"
        >
          <h4
            class="truncate font-[700] leading-tight text-white"
            :class="variant === 'compact' ? 'text-[15.5px]' : 'text-[17px]'"
          >
            {{ person.name }}
          </h4>
          <p class="mt-0.5 truncate text-[12.5px] text-white/75">
            {{ person.role
            }}<template v-if="person.organization">
              · {{ person.organization }}</template
            >
          </p>
        </div>
      </div>

      <div
        class="relative flex min-w-0 flex-1 flex-col"
        :class="
          variant === 'feature'
            ? 'px-3 pb-4 pt-4 md:py-8 md:pl-0 md:pr-6'
            : variant === 'wide'
              ? 'px-2 pb-3 pt-3 sm:py-3 sm:pl-0 sm:pr-3'
              : 'px-2 pb-2 pt-4'
        "
      >
        <template v-if="!captionOnPhoto">
          <h4
            class="font-[700] leading-[1.2] tracking-[-0.015em] text-white"
            :class="
              variant === 'feature'
                ? 'text-[26px] sm:text-[34px]'
                : 'text-[20px] sm:text-[22px]'
            "
          >
            {{ person.name }}
          </h4>
          <p class="mt-1.5 text-[14px] sm:text-[15px] text-white/70">
            <span class="font-[600] text-white/90">{{ person.role }}</span>
            <template v-if="person.organization">
              <span class="text-white/30"> · </span>{{ person.organization }}
            </template>
          </p>
        </template>

        <ul
          v-if="person.credentials?.length"
          class="flex flex-wrap gap-1.5"
          :class="captionOnPhoto ? '' : 'mt-4'"
        >
          <li
            v-for="credential in person.credentials"
            :key="credential"
            class="rounded-lg border border-white/15 bg-white/[0.08] px-2.5 py-1 text-[11.5px] font-[600] text-white/85 backdrop-blur-sm"
          >
            {{ credential }}
          </li>
        </ul>

        <p
          v-if="person.bioText"
          class="mt-4 leading-[1.7] text-white/70"
          :class="[
            variant === 'feature'
              ? 'text-[15px] sm:text-[16.5px] max-w-[620px]'
              : 'text-[14px]',
            variant === 'compact' ? 'line-clamp-3' : '',
          ]"
        >
          {{ person.bioText }}
        </p>

        <div
          v-if="person.moduleChips?.length"
          class="mt-auto pt-5 flex flex-wrap items-center gap-1.5"
        >
          <span
            class="mr-1 font-mono text-[10.5px] font-[600] uppercase tracking-[0.12em] text-white/45"
            >{{ t(`${NS}.facilitators.leads`) }}</span
          >
          <span
            v-for="chip in person.moduleChips"
            :key="chip.number"
            :title="chip.title"
            class="rounded-md px-1.5 py-0.5 font-mono text-[11px] font-[700]"
            :class="
              chip.day === 1
                ? 'bg-[#3DDC84]/15 text-[#3DDC84]'
                : 'bg-[#4AA8FF]/15 text-[#7DC0FF]'
            "
            >{{ chip.number }}</span
          >
        </div>

        <a
          v-if="person.linkedin"
          :href="person.linkedin"
          target="_blank"
          rel="noopener noreferrer"
          class="mt-4 inline-flex items-center gap-1.5 self-start text-[13.5px] font-[600] text-[#3DDC84] hover:underline"
        >
          LinkedIn
          <svg
            viewBox="0 0 24 24"
            class="w-3.5 h-3.5"
            fill="none"
            stroke="currentColor"
            stroke-width="2.2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="M7 17 17 7M8 7h9v9" />
          </svg>
        </a>
      </div>
    </div>
  </article>
</template>

<style scoped>
.fg-card {
  box-shadow: 0 30px 60px -30px rgba(0, 0, 0, 0.6);
  transition:
    transform 0.4s cubic-bezier(0.16, 1, 0.3, 1),
    box-shadow 0.4s ease;
}
.fg-card::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 2;
  padding: 1px;
  border-radius: inherit;
  pointer-events: none;
  background: linear-gradient(
    160deg,
    rgba(255, 255, 255, 0.45) 0%,
    rgba(255, 255, 255, 0.1) 35%,
    rgba(255, 255, 255, 0.06) 65%,
    rgba(61, 220, 132, 0.45) 100%
  );
  -webkit-mask:
    linear-gradient(#000 0 0) content-box,
    linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  transition: opacity 0.4s ease;
}
.fg-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 40px 70px -30px rgba(0, 0, 0, 0.7);
}
.fg-card:hover::before {
  background: linear-gradient(
    160deg,
    rgba(255, 255, 255, 0.6) 0%,
    rgba(255, 255, 255, 0.14) 35%,
    rgba(74, 168, 255, 0.2) 65%,
    rgba(61, 220, 132, 0.7) 100%
  );
}

.fg-corner {
  position: absolute;
  width: 22px;
  height: 22px;
  border-color: rgba(255, 255, 255, 0.75);
  pointer-events: none;
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.group:hover .fg-tl {
  transform: translate(-3px, -3px);
}
.group:hover .fg-tr {
  transform: translate(3px, -3px);
}
.group:hover .fg-bl {
  transform: translate(-3px, 3px);
}
.group:hover .fg-br {
  transform: translate(3px, 3px);
}

.fg-glare {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  background: linear-gradient(
    115deg,
    transparent 35%,
    rgba(255, 255, 255, 0.1) 48%,
    transparent 60%
  );
  transform: translateX(-100%);
  transition: transform 1s cubic-bezier(0.16, 1, 0.3, 1);
}
.group:hover .fg-glare {
  transform: translateX(100%);
}

@media (prefers-reduced-motion: reduce) {
  .fg-card,
  .fg-corner,
  .fg-glare {
    transition: none;
  }
  .fg-card:hover,
  .group:hover .fg-tl,
  .group:hover .fg-tr,
  .group:hover .fg-bl,
  .group:hover .fg-br {
    transform: none;
  }
  .group:hover .fg-glare {
    transform: translateX(-100%);
  }
}
</style>
