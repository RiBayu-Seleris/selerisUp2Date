<script setup>
import { computed, inject } from "vue";
import { useI18n } from "vue-i18n";
import WorkshopEyebrow from "./WorkshopEyebrow.vue";
import WorkshopFacilitators from "./WorkshopFacilitators.vue";
import { useWorkshopInfo } from "@/composables/useWorkshopInfo";
import { useWorkshopContent } from "@/composables/useWorkshopContent";
import shieldMark from "@/assets/Products/images/Shield/v2/shield-mark.webp";

const props = defineProps({
  workshop: { type: Object, required: true },
});

const NS = "workshop.healthpricing360";
const { t, tm, rt, locale } = useI18n();
const openRegistration = inject("hpOpenRegistration", () => {});

const ICONS = {
  date: [
    "M4 7.5A1.5 1.5 0 0 1 5.5 6h13A1.5 1.5 0 0 1 20 7.5v11a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 18.5v-11Z",
    "M8 3.5V8M16 3.5V8M4 11h16",
  ],
  time: ["M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z", "M12 7.5V12l3 2"],
  format: [
    "m12 3 9 4.5-9 4.5-9-4.5L12 3Z",
    "m3 12 9 4.5 9-4.5",
    "m3 16.5 9 4.5 9-4.5",
  ],
  location: [
    "M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z",
    "M12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z",
  ],
  price: [
    "M3.5 7.5A1.5 1.5 0 0 1 5 6h14a1.5 1.5 0 0 1 1.5 1.5v9A1.5 1.5 0 0 1 19 18H5a1.5 1.5 0 0 1-1.5-1.5v-9Z",
    "M3.5 10h17",
    "M7 14.5h3",
  ],
  quota: [
    "M9 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z",
    "M2.5 20c.8-3.4 3.3-5.5 6.5-5.5s5.7 2.1 6.5 5.5",
    "M16 4.3a3.5 3.5 0 0 1 0 6.4",
    "M18 14.8c1.8.8 3 2.6 3.5 5.2",
  ],
};

const { items } = useWorkshopInfo(props.workshop);
const content = useWorkshopContent(props.workshop);

const tiles = computed(() =>
  items.value.map((item) => ({ ...item, icon: ICONS[item.key] })),
);

const hasPending = computed(() => tiles.value.some((tile) => !tile.isSet));

const priceNote = computed(() =>
  content.pick(props.workshop.content?.priceNote),
);

const cancellation = computed(
  () => props.workshop.event.cancellationPolicy?.[locale.value] || null,
);

const contactEmail = computed(() => props.workshop.event.contactEmail);
const contactWhatsapp = computed(() => props.workshop.event.contactWhatsapp);
const whatsappLink = computed(() => {
  const digits = String(contactWhatsapp.value || "").replace(/\D/g, "");
  if (!digits) return null;
  return `https://wa.me/${digits.startsWith("0") ? "62" + digits.slice(1) : digits}`;
});

const steps = computed(() => tm(`${NS}.register.steps`).map((m) => rt(m)));
</script>

<template>
  <section id="informasi" class="relative w-full px-4 sm:px-8 mt-20 lg:mt-32">
    <div data-aos="fade-up" class="max-w-[760px]">
      <WorkshopEyebrow index="07" :label="t(`${NS}.info.eyebrow`)" />
      <h2
        class="mt-6 text-[26px] sm:text-[34px] xl:text-[44px] font-[700] leading-[1.15] tracking-[-0.02em] text-[#0B1324] dark:text-white"
      >
        {{ t(`${NS}.info.title`) }}
      </h2>
      <p
        v-if="hasPending"
        class="mt-4 text-[15px] sm:text-[17px] leading-[1.7] text-[#475467] dark:text-[#A3A3A3]"
      >
        {{ t(`${NS}.info.desc`) }}
      </p>
    </div>

    <div
      class="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 items-stretch"
    >
      <div
        data-aos="fade-up"
        class="lg:col-span-8 flex flex-col gap-4 sm:gap-5"
      >
        <dl class="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
          <div
            v-for="tile in tiles"
            :key="tile.key"
            class="rounded-[20px] border border-[#E4E7EC] bg-white p-4 sm:p-5 dark:border-white/10 dark:bg-[#1D2426]"
          >
            <span
              class="inline-flex w-10 h-10 items-center justify-center rounded-xl"
              :class="
                tile.isSet
                  ? 'bg-[#1AB24F]/10 text-[#138A3D] dark:text-[#5EE38F]'
                  : 'bg-[#F2F4F7] text-[#98A2B3] dark:bg-white/[0.06]'
              "
            >
              <svg
                viewBox="0 0 24 24"
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <path v-for="(d, k) in tile.icon" :key="k" :d="d" />
              </svg>
            </span>
            <dt
              class="mt-4 font-mono text-[10.5px] sm:text-[11px] font-[600] uppercase tracking-[0.14em] text-[#98A2B3]"
            >
              {{ tile.label }}
            </dt>
            <dd
              class="mt-1 text-[14px] sm:text-[16px] leading-snug"
              :class="
                tile.isSet
                  ? 'font-[700] text-[#0B1324] dark:text-white'
                  : 'font-[500] text-[#98A2B3]'
              "
            >
              {{ tile.display }}
            </dd>
          </div>
        </dl>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          <div
            class="flex items-center gap-4 rounded-[20px] border border-[#E4E7EC] bg-white p-4 sm:p-5 dark:border-white/10 dark:bg-[#1D2426]"
          >
            <span
              class="inline-flex w-12 h-12 shrink-0 items-center justify-center rounded-2xl bg-[#071427]"
            >
              <img
                :src="shieldMark"
                alt=""
                width="24"
                height="24"
                class="w-6 h-6 object-contain"
              />
            </span>
            <div>
              <p
                class="font-mono text-[10.5px] sm:text-[11px] font-[600] uppercase tracking-[0.14em] text-[#98A2B3]"
              >
                {{ t("workshop.info.organizer") }}
              </p>
              <p
                class="mt-0.5 text-[16px] font-[700] text-[#0B1324] dark:text-white"
              >
                {{ workshop.organizer }}
              </p>
            </div>
          </div>
          <div
            class="rounded-[20px] border border-[#E4E7EC] bg-white p-4 sm:p-5 dark:border-white/10 dark:bg-[#1D2426]"
          >
            <p
              class="font-mono text-[10.5px] sm:text-[11px] font-[600] uppercase tracking-[0.14em] text-[#98A2B3]"
            >
              {{ t(`${NS}.register.cancellation`) }}
            </p>
            <p
              class="mt-1 text-[14px] leading-[1.6]"
              :class="
                cancellation
                  ? 'text-[#344054] dark:text-[#D1D5DB]'
                  : 'text-[#98A2B3]'
              "
            >
              {{ cancellation || t("workshop.info.tba") }}
            </p>
          </div>
          <div
            v-if="priceNote"
            class="md:col-span-2 rounded-[20px] border border-[#E4E7EC] bg-white p-4 sm:p-5 dark:border-white/10 dark:bg-[#1D2426]"
          >
            <p
              class="font-mono text-[10.5px] sm:text-[11px] font-[600] uppercase tracking-[0.14em] text-[#98A2B3]"
            >
              {{ t("workshop.info.priceNote") }}
            </p>
            <p
              class="mt-1 whitespace-pre-line text-[14px] leading-[1.6] text-[#344054] dark:text-[#D1D5DB]"
            >
              {{ priceNote }}
            </p>
          </div>
          <div
            v-if="contactEmail || whatsappLink"
            class="md:col-span-2 flex flex-wrap items-center gap-x-6 gap-y-2 rounded-[20px] border border-[#E4E7EC] bg-white p-4 sm:p-5 dark:border-white/10 dark:bg-[#1D2426]"
          >
            <p
              class="font-mono text-[10.5px] sm:text-[11px] font-[600] uppercase tracking-[0.14em] text-[#98A2B3]"
            >
              {{ t(`${NS}.register.contact`) }}
            </p>
            <a
              v-if="contactEmail"
              :href="`mailto:${contactEmail}`"
              class="text-[14.5px] font-[600] text-[#138A3D] hover:underline dark:text-[#5EE38F]"
              >{{ contactEmail }}</a
            >
            <a
              v-if="whatsappLink"
              :href="whatsappLink"
              target="_blank"
              rel="noopener noreferrer"
              class="text-[14.5px] font-[600] text-[#138A3D] hover:underline dark:text-[#5EE38F]"
              >WhatsApp {{ contactWhatsapp }}</a
            >
          </div>
        </div>
      </div>

      <aside
        data-aos="fade-up"
        data-aos-delay="100"
        class="in-cta relative isolate overflow-hidden lg:col-span-4 flex flex-col rounded-[24px] p-6 sm:p-7 text-white"
      >
        <div
          aria-hidden="true"
          class="absolute -z-10 -right-16 -top-16 w-60 h-60 rounded-full bg-[#1AB24F]/30 blur-[80px]"
        ></div>
        <p
          class="font-mono text-[11px] font-[600] uppercase tracking-[0.16em] text-[#3DDC84]"
        >
          {{ t(`${NS}.register.eyebrow`) }}
        </p>
        <p class="mt-3 text-[15px] leading-[1.65] text-white/80">
          {{ content.text("ctaDescription", `${NS}.register.desc`) }}
        </p>
        <ol class="mt-6 flex flex-col gap-3">
          <li
            v-for="(step, i) in steps"
            :key="i"
            class="flex items-center gap-3 text-[14px] font-[500] text-white/90"
          >
            <span
              class="shrink-0 w-7 h-7 rounded-full border flex items-center justify-center font-mono text-[11.5px] font-[700]"
              :class="
                i === 0
                  ? 'border-[#1AB24F] bg-[#1AB24F] text-white'
                  : 'border-white/25 text-white/80'
              "
              >{{ i + 1 }}</span
            >
            {{ step }}
          </li>
        </ol>
        <button
          type="button"
          class="group mt-8 lg:mt-auto inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#1AB24F] text-[15px] font-[600] text-white transition-all hover:bg-[#16A046] active:scale-[0.98]"
          @click="openRegistration()"
        >
          {{ t(`${NS}.info.cta`) }}
          <svg
            viewBox="0 0 24 24"
            class="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5"
            fill="none"
            stroke="currentColor"
            stroke-width="2.2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </button>
      </aside>
    </div>

    <div data-aos="fade-up" class="mt-12 lg:mt-16">
      <WorkshopFacilitators :workshop="workshop" />
    </div>
  </section>
</template>

<style scoped>
.in-cta {
  background: linear-gradient(160deg, #0a1b36 0%, #071427 55%, #040c1a 100%);
}
</style>
