<script setup>
import {
  computed,
  onBeforeUnmount,
  onMounted,
  reactive,
  ref,
  watch,
} from "vue";
import { useI18n } from "vue-i18n";
import { healthPricing360 as workshop } from "@/Data/workshops/healthpricing360";
import { useWorkshopInfo } from "@/composables/useWorkshopInfo";
import { useContentReady } from "@/components/Products/Shield/useContentReady";
import shieldMark from "@/assets/Products/images/Shield/v2/shield-mark.webp";
import ResourceWorkshop from "@/components/icons/ResourceWorkshop.vue";
import { useSidebarStore } from "@/stores/sidebar";
import { loadWorkshopList } from "@/consumeAPI/workshopsApi";
import { featuredWorkshop, workshopStatus } from "@/utils/workshopStatus";
import { WORKSHOP_DYNAMIC } from "@/Data/workshops";
import { pickText } from "@/utils/workshopText";

const DISMISS_KEY = `seleris:workshop-popup:${workshop.slug}`;
const SHOW_DELAY_MS = 1400;

const visible = ref(false);
const eligible = ref(false);
const sidebar = useSidebarStore();
const contentReady = useContentReady();
const info = reactive({
  subtitle: null,
  event: {
    startDate: null,
    endDate: null,
    time: null,
    timezone: "WIB",
    format: null,
  },
});
const { dateLabel, timeLabel, formatLabel } = useWorkshopInfo(info);
const { t, locale } = useI18n();
const title = computed(
  () =>
    pickText(info.subtitle, locale.value) ||
    t("workshop.healthpricing360.popup.title"),
);

let timer = null;

const wasDismissed = () => {
  try {
    return sessionStorage.getItem(DISMISS_KEY) === "1";
  } catch {
    return false;
  }
};

const close = () => {
  visible.value = false;
  try {
    sessionStorage.setItem(DISMISS_KEY, "1");
  } catch {
    return;
  }
};

watch([contentReady, eligible], ([ready, ok]) => {
  if (!ready || !ok || timer) return;
  timer = setTimeout(() => {
    visible.value = true;
  }, SHOW_DELAY_MS);
});

onMounted(async () => {
  if (!WORKSHOP_DYNAMIC || wasDismissed()) return;
  try {
    const item = featuredWorkshop(await loadWorkshopList());
    if (item?.slug !== workshop.slug || workshopStatus(item) !== "open") return;
    Object.assign(info.event, {
      startDate: item.start_date || null,
      endDate: item.end_date || null,
      timezone: item.timezone || "WIB",
      format: item.format || null,
    });
    info.subtitle = item.subtitle || null;
    eligible.value = true;
  } catch {
    return;
  }
});

onBeforeUnmount(() => {
  clearTimeout(timer);
});
</script>

<template>
  <Teleport to="body">
    <Transition name="workshop-popup">
      <aside
        v-if="visible && !sidebar.isOpen"
        :aria-label="$t('workshop.healthpricing360.popup.label')"
        class="workshop-popup font-poppins fixed z-40 left-4 right-4 bottom-[76px] sm:left-auto sm:right-5 sm:w-[352px] lg:right-[104px] lg:bottom-6 rounded-[20px] bg-white dark:bg-[#1D2426] shadow-[0_24px_60px_-18px_rgba(10,46,30,0.45)] ring-1 ring-black/5 dark:ring-white/10 overflow-hidden"
      >
        <div
          class="relative overflow-hidden bg-[linear-gradient(135deg,#0E3B2A_0%,#145C3E_60%,#1A7049_100%)] px-4 pt-3 pb-3 sm:px-5 sm:pt-4 sm:pb-4"
        >
          <span
            aria-hidden="true"
            class="pointer-events-none absolute -right-10 -top-12 w-40 h-40 rounded-full border border-white/10"
          ></span>
          <span
            aria-hidden="true"
            class="pointer-events-none absolute -right-2 -top-4 w-24 h-24 rounded-full border border-dashed border-white/15"
          ></span>
          <span
            aria-hidden="true"
            class="pointer-events-none absolute right-6 top-8 w-10 h-10 rounded-full bg-white/[0.07]"
          ></span>

          <div class="relative flex items-start justify-between gap-3">
            <span
              class="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-[600] tracking-[0.12em] text-white uppercase"
            >
              <span
                class="w-1.5 h-1.5 rounded-full bg-[#5EE38F] workshop-popup-dot"
              ></span>
              {{ $t("workshop.healthpricing360.popup.chip") }}
            </span>
            <button
              type="button"
              :aria-label="$t('workshop.healthpricing360.popup.close')"
              class="-mr-1 -mt-0.5 w-8 h-8 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              @click="close"
            >
              <svg
                viewBox="0 0 24 24"
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                stroke-width="2.2"
                stroke-linecap="round"
              >
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>

          <div class="relative mt-4 hidden sm:flex items-center gap-3">
            <span
              class="w-10 h-10 shrink-0 rounded-full bg-white flex items-center justify-center ring-2 ring-white/25"
            >
              <img
                :src="shieldMark"
                alt=""
                class="w-6 h-6 object-contain"
                width="24"
                height="24"
              />
            </span>
            <span class="flex flex-col min-w-0">
              <span class="text-[13px] font-[600] text-white leading-tight">
                {{ $t("workshop.healthpricing360.popup.host") }}
              </span>
              <span class="text-[11.5px] text-white/70 mt-0.5 leading-snug">
                {{ $t("workshop.healthpricing360.popup.meta") }}
              </span>
            </span>
          </div>
        </div>

        <div class="px-4 pt-3 pb-4 sm:px-5 sm:pt-4 sm:pb-5">
          <p
            class="text-[15px] sm:text-[17px] font-[700] leading-snug text-[#111827] dark:text-white"
          >
            {{ workshop.name }}
            <span class="block font-[600] text-[#374151] dark:text-[#D1D5DB]">
              {{ title }}
            </span>
          </p>

          <ul
            class="mt-2 sm:mt-3 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[12.5px] text-[#4B5563] dark:text-[#A3A3A3]"
          >
            <li class="inline-flex items-center gap-1.5">
              <span class="w-4 h-4 text-[#159447] dark:text-[#5EE38F]">
                <ResourceWorkshop />
              </span>
              {{
                dateLabel || $t("workshop.healthpricing360.popup.scheduleTba")
              }}
            </li>
            <template v-if="timeLabel">
              <li aria-hidden="true" class="text-[#D1D5DB]">•</li>
              <li>{{ timeLabel }}</li>
            </template>
            <template v-if="formatLabel">
              <li aria-hidden="true" class="text-[#D1D5DB]">•</li>
              <li class="font-[600] text-[#159447] dark:text-[#5EE38F]">
                {{ formatLabel }}
              </li>
            </template>
          </ul>

          <router-link
            :to="`${workshop.path}#daftar`"
            class="group mt-3 sm:mt-4 flex h-10 sm:h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#1E7A4C] hover:bg-[#17663F] text-[14.5px] font-[600] text-white transition-colors"
            @click="close"
          >
            {{ $t("workshop.healthpricing360.popup.cta") }}
            <svg
              viewBox="0 0 24 24"
              class="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5"
              fill="none"
              stroke="currentColor"
              stroke-width="2.2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </router-link>
        </div>
      </aside>
    </Transition>
  </Teleport>
</template>

<style scoped>
.workshop-popup-enter-active {
  transition:
    opacity 0.45s ease,
    transform 0.55s cubic-bezier(0.16, 1, 0.3, 1);
}
.workshop-popup-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.25s ease;
}
.workshop-popup-enter-from,
.workshop-popup-leave-to {
  opacity: 0;
  transform: translateY(16px) scale(0.98);
}

.workshop-popup-dot {
  box-shadow: 0 0 0 0 rgba(94, 227, 143, 0.6);
  animation: workshop-popup-pulse 2s ease-out infinite;
}

@keyframes workshop-popup-pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(94, 227, 143, 0.55);
  }
  70% {
    box-shadow: 0 0 0 7px rgba(94, 227, 143, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(94, 227, 143, 0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .workshop-popup-enter-active,
  .workshop-popup-leave-active {
    transition: opacity 0.2s ease;
  }
  .workshop-popup-enter-from,
  .workshop-popup-leave-to {
    transform: none;
  }
  .workshop-popup-dot {
    animation: none;
  }
}
</style>
