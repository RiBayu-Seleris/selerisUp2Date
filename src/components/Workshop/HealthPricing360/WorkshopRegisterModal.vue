<script setup>
import { computed, nextTick, onBeforeUnmount, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import {
  hentikanSmoothScroll,
  jalankanSmoothScroll,
} from "@/utils/smoothScroll";
import WorkshopRegisterForm from "./WorkshopRegisterForm.vue";
import shieldMark from "@/assets/Products/images/Shield/v2/shield-mark.webp";
import { pickText } from "@/utils/workshopText";

const props = defineProps({
  open: { type: Boolean, default: false },
  workshop: { type: Object, required: true },
});

const emit = defineEmits(["close"]);

const NS = "workshop.healthpricing360";
const { t, tm, rt, locale } = useI18n();

const steps = computed(() =>
  tm(`${NS}.register.${props.workshop.payment ? "stepsPaid" : "steps"}`).map(
    (m) => rt(m),
  ),
);

const subtitle = computed(
  () =>
    pickText(props.workshop.subtitle, locale.value) || t(`${NS}.hero.subtitle`),
);

const dialog = ref(null);
let lastFocus = null;
let locked = false;

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]):not([tabindex="-1"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

const close = () => emit("close");

const onKeydown = (e) => {
  if (e.key === "Escape") {
    e.preventDefault();
    close();
    return;
  }
  if (e.key !== "Tab" || !dialog.value) return;
  const focusables = [...dialog.value.querySelectorAll(FOCUSABLE)].filter(
    (el) => el.offsetParent !== null,
  );
  if (!focusables.length) return;
  const first = focusables[0];
  const last = focusables[focusables.length - 1];
  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault();
    last.focus();
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault();
    first.focus();
  }
};

const lock = () => {
  if (locked) return;
  locked = true;
  lastFocus = document.activeElement;
  hentikanSmoothScroll();
  document.body.style.overflow = "hidden";
  document.addEventListener("keydown", onKeydown);
};

const release = () => {
  if (!locked) return;
  locked = false;
  document.removeEventListener("keydown", onKeydown);
  document.body.style.overflow = "";
  jalankanSmoothScroll();
  if (lastFocus && typeof lastFocus.focus === "function") lastFocus.focus();
  lastFocus = null;
};

watch(
  () => props.open,
  async (open) => {
    if (open) {
      lock();
      await nextTick();
      dialog.value?.focus();
    } else {
      release();
    }
  },
);

onBeforeUnmount(release);
</script>

<template>
  <Teleport to="body">
    <Transition name="rm">
      <div
        v-show="open"
        class="font-poppins fixed inset-0 z-[1000] flex items-end sm:items-center justify-center bg-[#020617]/70 backdrop-blur-sm sm:p-6"
        @click.self="close"
      >
        <div
          ref="dialog"
          role="dialog"
          aria-modal="true"
          aria-labelledby="hp-register-title"
          tabindex="-1"
          data-lenis-prevent
          class="rm-panel relative flex max-h-[92dvh] sm:max-h-[min(860px,92vh)] w-full sm:max-w-[660px] flex-col overflow-hidden rounded-t-[28px] sm:rounded-[28px] bg-white shadow-[0_40px_80px_-30px_rgba(2,6,23,0.8)] outline-none dark:bg-[#1D2426]"
        >
          <header
            class="rm-head relative isolate shrink-0 overflow-hidden px-6 pt-6 pb-5 sm:px-8 sm:pt-7 sm:pb-6 text-white"
          >
            <div
              aria-hidden="true"
              class="absolute -z-10 -right-16 -top-24 w-64 h-64 rounded-full bg-[#1AB24F]/30 blur-[80px]"
            ></div>
            <div class="flex items-start justify-between gap-4">
              <span
                class="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.07] py-1 pl-1 pr-3"
              >
                <span
                  class="w-6 h-6 rounded-full bg-white flex items-center justify-center"
                >
                  <img
                    :src="shieldMark"
                    alt=""
                    width="14"
                    height="14"
                    class="w-3.5 h-3.5 object-contain"
                  />
                </span>
                <span
                  class="font-mono text-[10.5px] font-[600] uppercase tracking-[0.14em] text-[#3DDC84]"
                  >{{ t(`${NS}.modal.kicker`) }}</span
                >
              </span>
              <button
                type="button"
                :aria-label="t(`${NS}.modal.close`)"
                class="-mr-2 -mt-1 inline-flex w-9 h-9 items-center justify-center rounded-xl text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                @click="close"
              >
                <svg
                  viewBox="0 0 24 24"
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.2"
                  stroke-linecap="round"
                  aria-hidden="true"
                >
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>
            <h2
              id="hp-register-title"
              class="mt-4 text-[20px] sm:text-[24px] font-[700] leading-tight"
            >
              {{ t(`${NS}.modal.title`) }}
              <span
                class="block mt-1 text-[14px] sm:text-[15px] font-[500] text-white/60"
                >{{ workshop.name }} · {{ subtitle }}</span
              >
            </h2>
            <ol
              class="mt-5 grid grid-cols-3 gap-2 text-[11.5px] sm:text-[12.5px] font-[500] text-white/75"
            >
              <li
                v-for="(step, i) in steps"
                :key="i"
                class="flex items-start gap-2"
              >
                <span
                  class="mt-px shrink-0 w-5 h-5 rounded-full flex items-center justify-center font-mono text-[10px] font-[700]"
                  :class="
                    i === 0
                      ? 'bg-[#1AB24F] text-white'
                      : 'border border-white/25 text-white/70'
                  "
                  >{{ i + 1 }}</span
                >
                <span class="leading-snug">{{ step }}</span>
              </li>
            </ol>
          </header>

          <div
            data-lenis-prevent
            class="flex-1 overflow-y-auto overscroll-contain px-5 py-6 sm:px-8 sm:py-7"
          >
            <WorkshopRegisterForm :workshop="workshop" @done="close" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.rm-head {
  background: linear-gradient(150deg, #0a1b36 0%, #071427 60%, #040c1a 100%);
}

.rm-enter-active,
.rm-leave-active {
  transition: opacity 0.25s ease;
}
.rm-enter-active .rm-panel,
.rm-leave-active .rm-panel {
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}
.rm-enter-from,
.rm-leave-to {
  opacity: 0;
}
.rm-enter-from .rm-panel,
.rm-leave-to .rm-panel {
  transform: translateY(24px) scale(0.98);
}

@media (prefers-reduced-motion: reduce) {
  .rm-enter-active .rm-panel,
  .rm-leave-active .rm-panel {
    transition: none;
  }
  .rm-enter-from .rm-panel,
  .rm-leave-to .rm-panel {
    transform: none;
  }
}
</style>
