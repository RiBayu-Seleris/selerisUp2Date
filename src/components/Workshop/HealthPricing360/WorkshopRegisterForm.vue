<script setup>
import { computed, nextTick, onBeforeUnmount, ref, watch } from "vue";
import { Translation as I18nT, useI18n } from "vue-i18n";
import {
  PARTICIPANT_CATEGORIES,
  PROOF_ACCEPT,
  useWorkshopRegistration,
} from "@/composables/useWorkshopRegistration";
import { formatRupiah, useWorkshopInfo } from "@/composables/useWorkshopInfo";
import { pickText } from "@/utils/workshopText";
import WorkshopField from "./WorkshopField.vue";

const props = defineProps({
  workshop: { type: Object, required: true },
});

const emit = defineEmits(["done"]);

const F = "workshop.form";
const { t, locale } = useI18n();

const {
  form,
  errors,
  status,
  message,
  submittedName,
  registrationCode,
  paidSubmission,
  progress,
  touch,
  revalidate,
  submit,
  reset,
} = useWorkshopRegistration(props.workshop);

const { priceLabel } = useWorkshopInfo(props.workshop);

const payment = computed(() => props.workshop.payment);

const amount = computed(() =>
  props.workshop.event.price === 0 ? "" : priceLabel.value || "",
);

const isTeam = computed(() => form.participation === "team");

const teamCount = computed(() => {
  if (!isTeam.value) return 0;
  const n = Number(form.teamSize);
  return Number.isInteger(n) && n >= 2 && n <= 500 ? n : 0;
});

const teamTotal = computed(() => {
  const price = props.workshop.event.price;
  return teamCount.value && typeof price === "number" && price > 0
    ? formatRupiah(price * teamCount.value)
    : "";
});

const paymentNote = computed(() =>
  pickText(payment.value?.instructions, locale.value),
);

const copied = ref(-1);
let copyTimer = 0;

const copyNumber = async (account, index) => {
  const value = account.number.replace(/\D/g, "") || account.number;
  try {
    await navigator.clipboard.writeText(value);
    copied.value = index;
    clearTimeout(copyTimer);
    copyTimer = setTimeout(() => (copied.value = -1), 1600);
  } catch {
    const target = document.getElementById(`hp-account-${index}`);
    const selection = window.getSelection();
    if (!target || !selection) return;
    const range = document.createRange();
    range.selectNodeContents(target);
    selection.removeAllRanges();
    selection.addRange(range);
  }
};

const proofInput = ref(null);
const proofPreview = ref("");
const dragging = ref(false);

watch(
  () => form.paymentProof,
  (file) => {
    if (proofPreview.value) URL.revokeObjectURL(proofPreview.value);
    proofPreview.value =
      file && /^image\/(jpeg|png)$/.test(file.type)
        ? URL.createObjectURL(file)
        : "";
  },
);

const setProof = (file) => {
  form.paymentProof = file;
  if (proofInput.value) proofInput.value.value = "";
  if (file) touch("paymentProof");
  else revalidate("paymentProof");
};

const onProofChange = (event) => {
  const file = event.target.files?.[0];
  if (file) setProof(file);
};

const onProofDrop = (event) => {
  dragging.value = false;
  const file = event.dataTransfer?.files?.[0];
  if (file) setProof(file);
};

const fileSize = (bytes) => {
  const intl = locale.value === "id" ? "id-ID" : "en-GB";
  if (bytes >= 1024 * 1024) {
    const mb = (bytes / (1024 * 1024)).toLocaleString(intl, {
      maximumFractionDigits: 1,
    });
    return `${mb} MB`;
  }
  return `${Math.max(1, Math.round(bytes / 1024)).toLocaleString(intl)} KB`;
};

const successText = computed(() => {
  if (!paidSubmission.value)
    return t(`${F}.result.successText`, { name: submittedName.value });
  const format = props.workshop.event.format;
  const key = ["online", "onsite", "hybrid"].includes(format)
    ? format
    : "other";
  return t(`${F}.result.paidText.${key}`, { name: submittedName.value });
});

const submitLabel = computed(() => {
  if (status.value !== "submitting") return t(`${F}.submit`);
  return progress.value > 0 && progress.value < 100
    ? t(`${F}.uploading`, { n: progress.value })
    : t(`${F}.submitting`);
});

onBeforeUnmount(() => {
  clearTimeout(copyTimer);
  if (proofPreview.value) URL.revokeObjectURL(proofPreview.value);
});

const digitsOnly = (value, allowPlus) => {
  const clean = value.replace(allowPlus ? /[^\d+]/g : /\D/g, "");
  return allowPlus ? clean.replace(/(?!^)\+/g, "") : clean;
};

const keepDigits = (event, field, allowPlus = false) => {
  const input = event.target;
  const raw = input.value;
  const clean = digitsOnly(raw, allowPlus);
  if (clean !== raw) {
    const caret = digitsOnly(
      raw.slice(0, input.selectionStart ?? raw.length),
      allowPlus,
    ).length;
    input.value = clean;
    input.setSelectionRange(caret, caret);
  }
  form[field] = clean;
  revalidate(field);
};

const categories = computed(() =>
  PARTICIPANT_CATEGORIES.map((value) => ({
    value,
    label: t(`${F}.categories.${value}`),
  })),
);

const successPanel = ref(null);

const inputClass = (field) => [
  "w-full h-12 rounded-xl border bg-white px-4 text-[15px] text-[#0B1324] placeholder:text-[#98A2B3] outline-none transition-[border-color,box-shadow] dark:bg-[#141819] dark:text-white dark:placeholder:text-[#6B7280]",
  errors[field]
    ? "border-[#F87171] focus:border-[#DC2626] focus:ring-4 focus:ring-[#DC2626]/10"
    : "border-[#D0D5DD] focus:border-[#1AB24F] focus:ring-4 focus:ring-[#1AB24F]/15 dark:border-white/10",
];

const fieldAttrs = (field) => ({
  id: `hp-${field}`,
  "aria-invalid": errors[field] ? "true" : "false",
  "aria-describedby": errors[field] ? `hp-${field}-error` : undefined,
});

const onSubmit = async () => {
  const invalid = await submit();
  if (invalid) {
    await nextTick();
    document.getElementById(`hp-${invalid}`)?.focus();
    return;
  }
  if (status.value === "success") {
    await nextTick();
    successPanel.value?.focus();
  }
};

const registerAgain = () => {
  reset();
  nextTick(() => document.getElementById("hp-fullName")?.focus());
};

defineExpose({ status });
</script>

<template>
  <div class="relative">
    <div
      v-if="status === 'success'"
      ref="successPanel"
      tabindex="-1"
      role="status"
      class="flex flex-col items-center justify-center text-center py-8 outline-none"
    >
      <span
        class="w-16 h-16 rounded-full bg-[#1AB24F]/10 flex items-center justify-center text-[#1AB24F]"
      >
        <svg
          viewBox="0 0 24 24"
          class="w-8 h-8"
          fill="none"
          stroke="currentColor"
          stroke-width="2.2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="m5 12.5 4.5 4.5L19 7.5" />
        </svg>
      </span>
      <h3
        class="mt-6 text-[22px] sm:text-[26px] font-[700] text-[#0F172A] dark:text-white"
      >
        {{ t(`${F}.result.successTitle`) }}
      </h3>
      <p
        class="mt-3 max-w-[440px] text-[15px] leading-[1.7] text-[#4B5563] dark:text-[#A3A3A3]"
      >
        {{ successText }}
      </p>
      <div
        v-if="registrationCode"
        class="mt-6 flex flex-col items-center gap-1 rounded-2xl border border-[#1AB24F]/30 bg-[#1AB24F]/[0.06] px-6 py-4"
      >
        <span
          class="font-mono text-[11px] font-[600] uppercase tracking-[0.14em] text-[#667085] dark:text-[#A3A3A3]"
          >{{ t(`${F}.result.codeLabel`) }}</span
        >
        <span
          class="font-mono text-[22px] font-[700] tracking-[0.04em] text-[#0B1324] dark:text-white select-all"
          >{{ registrationCode }}</span
        >
        <span class="text-[12.5px] text-[#667085] dark:text-[#A3A3A3]">{{
          t(`${F}.result.codeHint`)
        }}</span>
      </div>
      <button
        type="button"
        class="mt-8 inline-flex h-11 items-center rounded-xl border border-[#E5E7EB] px-5 text-[14px] font-[600] text-[#0F172A] transition-colors hover:border-[#1AB24F] hover:text-[#159447] dark:border-white/15 dark:text-white"
        @click="registerAgain"
      >
        {{ t(`${F}.result.again`) }}
      </button>
      <button
        type="button"
        class="mt-3 text-[13.5px] font-[600] text-[#667085] hover:text-[#0B1324] dark:text-[#A3A3A3] dark:hover:text-white"
        @click="emit('done')"
      >
        {{ t("workshop.healthpricing360.modal.close") }}
      </button>
    </div>

    <div
      v-else-if="!workshop.registration.isOpen"
      class="flex h-full items-center justify-center py-16 text-center text-[16px] font-[500] text-[#4B5563] dark:text-[#A3A3A3]"
    >
      {{
        workshop.registration.status === "full"
          ? t(`${F}.result.full`)
          : t(`${F}.result.closed`)
      }}
    </div>

    <form
      v-else
      novalidate
      class="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-5"
      @submit.prevent="onSubmit"
    >
      <WorkshopField
        id="hp-fullName"
        :label="t(`${F}.fullName`)"
        :error="errors.fullName"
        class="sm:col-span-2"
      >
        <input
          v-bind="fieldAttrs('fullName')"
          v-model="form.fullName"
          type="text"
          name="name"
          autocomplete="name"
          maxlength="120"
          required
          :placeholder="t(`${F}.fullNamePh`)"
          :class="inputClass('fullName')"
          @blur="touch('fullName')"
          @input="revalidate('fullName')"
        />
      </WorkshopField>

      <WorkshopField
        id="hp-email"
        :label="t(`${F}.email`)"
        :error="errors.email"
      >
        <input
          v-bind="fieldAttrs('email')"
          v-model="form.email"
          type="email"
          name="email"
          autocomplete="email"
          inputmode="email"
          maxlength="160"
          required
          :placeholder="t(`${F}.emailPh`)"
          :class="inputClass('email')"
          @blur="touch('email')"
          @input="revalidate('email')"
        />
      </WorkshopField>

      <WorkshopField
        id="hp-whatsapp"
        :label="t(`${F}.whatsapp`)"
        :error="errors.whatsapp"
      >
        <input
          v-bind="fieldAttrs('whatsapp')"
          :value="form.whatsapp"
          type="tel"
          name="tel"
          autocomplete="tel"
          inputmode="tel"
          maxlength="16"
          required
          :placeholder="t(`${F}.whatsappPh`)"
          :class="inputClass('whatsapp')"
          @blur="touch('whatsapp')"
          @input="keepDigits($event, 'whatsapp', true)"
        />
      </WorkshopField>

      <WorkshopField
        id="hp-organization"
        :label="t(`${F}.organization`)"
        :error="errors.organization"
      >
        <input
          v-bind="fieldAttrs('organization')"
          v-model="form.organization"
          type="text"
          name="organization"
          autocomplete="organization"
          maxlength="160"
          required
          :placeholder="t(`${F}.organizationPh`)"
          :class="inputClass('organization')"
          @blur="touch('organization')"
          @input="revalidate('organization')"
        />
      </WorkshopField>

      <WorkshopField
        id="hp-jobTitle"
        :label="t(`${F}.jobTitle`)"
        :error="errors.jobTitle"
      >
        <input
          v-bind="fieldAttrs('jobTitle')"
          v-model="form.jobTitle"
          type="text"
          name="organization-title"
          autocomplete="organization-title"
          maxlength="120"
          required
          :placeholder="t(`${F}.jobTitlePh`)"
          :class="inputClass('jobTitle')"
          @blur="touch('jobTitle')"
          @input="revalidate('jobTitle')"
        />
      </WorkshopField>

      <WorkshopField
        id="hp-category"
        :label="t(`${F}.category`)"
        :error="errors.category"
        :class="form.category === 'other' ? '' : 'sm:col-span-2'"
      >
        <div class="relative">
          <select
            v-bind="fieldAttrs('category')"
            v-model="form.category"
            name="category"
            required
            :class="[
              inputClass('category'),
              'appearance-none pr-10 cursor-pointer',
              form.category ? '' : 'text-[#9CA3AF] dark:text-[#6B7280]',
            ]"
            @blur="touch('category')"
            @change="touch('category')"
          >
            <option value="" disabled>{{ t(`${F}.categoryPh`) }}</option>
            <option
              v-for="option in categories"
              :key="option.value"
              :value="option.value"
              class="text-[#0F172A]"
            >
              {{ option.label }}
            </option>
          </select>
          <svg
            viewBox="0 0 24 24"
            class="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280]"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div>
      </WorkshopField>

      <WorkshopField
        v-if="form.category === 'other'"
        id="hp-categoryOther"
        :label="t(`${F}.categoryOther`)"
        :error="errors.categoryOther"
      >
        <input
          v-bind="fieldAttrs('categoryOther')"
          v-model="form.categoryOther"
          type="text"
          maxlength="80"
          required
          :class="inputClass('categoryOther')"
          @blur="touch('categoryOther')"
          @input="revalidate('categoryOther')"
        />
      </WorkshopField>

      <fieldset class="sm:col-span-2">
        <legend
          class="text-[13.5px] font-[600] text-[#1F2937] dark:text-[#E5E7EB]"
        >
          {{ t(`${F}.participation`) }}
        </legend>
        <div class="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <label
            v-for="option in ['individual', 'team']"
            :key="option"
            class="relative flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition-colors"
            :class="
              form.participation === option
                ? 'border-[#1AB24F] bg-[#1AB24F]/[0.05] ring-1 ring-[#1AB24F]'
                : 'border-[#E5E7EB] hover:border-[#1AB24F]/50 dark:border-white/10'
            "
          >
            <input
              v-model="form.participation"
              type="radio"
              name="participation"
              :value="option"
              class="peer sr-only"
              @change="revalidate('teamSize')"
            />
            <span
              aria-hidden="true"
              class="mt-0.5 shrink-0 w-[18px] h-[18px] rounded-full border-2 flex items-center justify-center peer-focus-visible:ring-4 peer-focus-visible:ring-[#1AB24F]/20"
              :class="
                form.participation === option
                  ? 'border-[#1AB24F]'
                  : 'border-[#D1D5DB] dark:border-white/25'
              "
            >
              <span
                v-if="form.participation === option"
                class="w-2 h-2 rounded-full bg-[#1AB24F]"
              ></span>
            </span>
            <span class="flex flex-col">
              <span
                class="text-[14.5px] font-[600] text-[#0F172A] dark:text-white"
                >{{ t(`${F}.${option}`) }}</span
              >
              <span
                class="mt-0.5 text-[12.5px] text-[#6B7280] dark:text-[#A3A3A3]"
                >{{ t(`${F}.${option}Desc`) }}</span
              >
            </span>
          </label>
        </div>
      </fieldset>

      <WorkshopField
        v-if="form.participation === 'team'"
        id="hp-teamSize"
        :label="t(`${F}.teamSize`)"
        :error="errors.teamSize"
      >
        <input
          v-bind="fieldAttrs('teamSize')"
          :value="form.teamSize"
          type="text"
          inputmode="numeric"
          maxlength="3"
          required
          placeholder="5"
          :class="inputClass('teamSize')"
          @blur="touch('teamSize')"
          @input="keepDigits($event, 'teamSize')"
        />
      </WorkshopField>

      <section
        v-if="payment"
        aria-labelledby="hp-payment-title"
        class="sm:col-span-2 rounded-2xl border border-[#E5E7EB] bg-[#F9FAFB] p-4 sm:p-5 dark:border-white/10 dark:bg-white/[0.03]"
      >
        <div
          class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1"
        >
          <h3
            id="hp-payment-title"
            class="text-[14.5px] font-[700] text-[#0F172A] dark:text-white"
          >
            {{ t(`${F}.payment.title`) }}
          </h3>
          <div v-if="amount" class="text-right">
            <p class="text-[15px] font-[700] text-[#0B1324] dark:text-white">
              <span class="sr-only"
                >{{
                  teamTotal
                    ? t(`${F}.payment.total`)
                    : t("workshop.info.price")
                }}: </span
              >{{ teamTotal || amount }}
            </p>
            <p
              v-if="isTeam"
              class="mt-0.5 text-[12px] leading-snug text-[#667085] dark:text-[#A3A3A3]"
            >
              {{
                teamTotal
                  ? t(`${F}.payment.perTeam`, { n: teamCount, price: amount })
                  : t(`${F}.payment.perPerson`)
              }}
            </p>
          </div>
        </div>
        <p
          class="mt-1 text-[13px] leading-[1.6] text-[#6B7280] dark:text-[#A3A3A3]"
        >
          {{
            payment.accounts.length > 1
              ? t(`${F}.payment.leadMany`)
              : t(`${F}.payment.lead`)
          }}
        </p>
        <ul class="mt-4 flex flex-col gap-3">
          <li
            v-for="(account, i) in payment.accounts"
            :key="`${account.bank}-${account.number}`"
            class="flex items-center justify-between gap-3 rounded-xl border border-[#E5E7EB] bg-white px-4 py-3 dark:border-white/10 dark:bg-[#141819]"
          >
            <div class="min-w-0">
              <p
                v-if="account.bank"
                class="font-mono text-[11px] font-[600] uppercase tracking-[0.14em] text-[#667085] dark:text-[#A3A3A3]"
              >
                {{ account.bank }}
              </p>
              <p
                :id="`hp-account-${i}`"
                class="mt-1 font-mono text-[18px] sm:text-[20px] font-[700] tracking-[0.04em] text-[#0B1324] dark:text-white select-all break-all"
              >
                {{ account.number }}
              </p>
              <p
                v-if="account.holder"
                class="mt-0.5 text-[12.5px] leading-snug text-[#667085] dark:text-[#A3A3A3]"
              >
                {{ t(`${F}.payment.holder`, { name: account.holder }) }}
              </p>
            </div>
            <button
              type="button"
              class="shrink-0 inline-flex h-9 items-center gap-1.5 rounded-lg border px-3 text-[13px] font-[600] transition-colors"
              :class="
                copied === i
                  ? 'border-[#1AB24F] bg-[#1AB24F]/[0.08] text-[#138A3D] dark:text-[#5EE38F]'
                  : 'border-[#E5E7EB] text-[#0F172A] hover:border-[#1AB24F] hover:text-[#159447] dark:border-white/15 dark:text-white'
              "
              :aria-label="
                t(`${F}.payment.copyLabel`, { number: account.number })
              "
              @click="copyNumber(account, i)"
            >
              <svg
                viewBox="0 0 24 24"
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <path v-if="copied === i" d="m5 12.5 4.5 4.5L19 7.5" />
                <template v-else>
                  <path
                    d="M9.5 8h9A1.5 1.5 0 0 1 20 9.5v9a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 8 18.5v-9A1.5 1.5 0 0 1 9.5 8Z"
                  />
                  <path
                    d="M16 8V5.5A1.5 1.5 0 0 0 14.5 4h-9A1.5 1.5 0 0 0 4 5.5v9A1.5 1.5 0 0 0 5.5 16H8"
                  />
                </template>
              </svg>
              {{
                copied === i ? t(`${F}.payment.copied`) : t(`${F}.payment.copy`)
              }}
            </button>
          </li>
        </ul>
        <p
          v-if="paymentNote"
          class="mt-3 whitespace-pre-line text-[12.5px] leading-[1.6] text-[#6B7280] dark:text-[#A3A3A3]"
        >
          {{ paymentNote }}
        </p>
        <span class="sr-only" aria-live="polite">{{
          copied >= 0 ? t(`${F}.payment.copied`) : ""
        }}</span>
      </section>

      <WorkshopField
        v-if="payment"
        id="hp-paymentProof"
        :label="t(`${F}.proof.label`)"
        :error="errors.paymentProof"
        class="sm:col-span-2"
      >
        <input
          ref="proofInput"
          v-bind="fieldAttrs('paymentProof')"
          type="file"
          name="payment_proof"
          :accept="PROOF_ACCEPT"
          class="peer sr-only"
          @change="onProofChange"
        />
        <div
          v-if="form.paymentProof"
          class="flex items-center gap-3 rounded-xl border bg-white p-3 transition-[border-color,box-shadow] peer-focus-visible:ring-4 peer-focus-visible:ring-[#1AB24F]/15 dark:bg-[#141819]"
          :class="
            errors.paymentProof
              ? 'border-[#F87171]'
              : 'border-[#D0D5DD] dark:border-white/10'
          "
        >
          <img
            v-if="proofPreview"
            :src="proofPreview"
            alt=""
            class="w-12 h-12 shrink-0 rounded-lg object-cover"
          />
          <span
            v-else
            class="w-12 h-12 shrink-0 rounded-lg bg-[#F2F4F7] flex items-center justify-center text-[#667085] dark:bg-white/[0.06] dark:text-[#A3A3A3]"
          >
            <svg
              viewBox="0 0 24 24"
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path
                d="M14 3H7.5A1.5 1.5 0 0 0 6 4.5v15A1.5 1.5 0 0 0 7.5 21h9a1.5 1.5 0 0 0 1.5-1.5V7l-4-4Z"
              />
              <path d="M14 3v4h4" />
            </svg>
          </span>
          <div class="min-w-0 flex-1">
            <p
              class="truncate text-[14px] font-[600] text-[#0F172A] dark:text-white"
            >
              {{ form.paymentProof.name }}
            </p>
            <p class="text-[12.5px] text-[#667085] dark:text-[#A3A3A3]">
              {{ fileSize(form.paymentProof.size) }}
            </p>
          </div>
          <label
            for="hp-paymentProof"
            class="shrink-0 cursor-pointer rounded-lg px-2.5 py-1.5 text-[13px] font-[600] text-[#159447] transition-colors hover:bg-[#1AB24F]/10 dark:text-[#5EE38F]"
            >{{ t(`${F}.proof.change`) }}</label
          >
          <button
            type="button"
            class="shrink-0 rounded-lg px-2.5 py-1.5 text-[13px] font-[600] text-[#667085] transition-colors hover:bg-[#F2F4F7] hover:text-[#B91C1C] dark:text-[#A3A3A3] dark:hover:bg-white/[0.06] dark:hover:text-[#FCA5A5]"
            @click="setProof(null)"
          >
            {{ t(`${F}.proof.remove`) }}
          </button>
        </div>
        <label
          v-else
          for="hp-paymentProof"
          class="flex cursor-pointer flex-col items-center justify-center gap-1.5 rounded-xl border-2 border-dashed px-4 py-6 text-center transition-colors peer-focus-visible:ring-4 peer-focus-visible:ring-[#1AB24F]/15"
          :class="
            errors.paymentProof
              ? 'border-[#F87171]'
              : dragging
                ? 'border-[#1AB24F] bg-[#1AB24F]/[0.05]'
                : 'border-[#D0D5DD] hover:border-[#1AB24F]/60 hover:bg-[#1AB24F]/[0.03] dark:border-white/15'
          "
          @dragover.prevent="dragging = true"
          @dragleave="dragging = false"
          @drop.prevent="onProofDrop"
        >
          <span
            class="pointer-events-none w-10 h-10 rounded-full bg-[#1AB24F]/10 flex items-center justify-center text-[#1AB24F]"
          >
            <svg
              viewBox="0 0 24 24"
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path d="M12 15V4" />
              <path d="m7.5 8.5 4.5-4.5 4.5 4.5" />
              <path
                d="M4 15v3.5A1.5 1.5 0 0 0 5.5 20h13a1.5 1.5 0 0 0 1.5-1.5V15"
              />
            </svg>
          </span>
          <span
            class="pointer-events-none text-[14px] font-[600] text-[#0F172A] dark:text-white"
            >{{ t(`${F}.proof.choose`) }}
            <span
              class="hidden sm:inline font-[500] text-[#667085] dark:text-[#A3A3A3]"
              >{{ t(`${F}.proof.drop`) }}</span
            ></span
          >
          <span
            class="pointer-events-none text-[12.5px] text-[#667085] dark:text-[#A3A3A3]"
            >{{ t(`${F}.proof.hint`) }}</span
          >
        </label>
      </WorkshopField>

      <div
        class="absolute -left-[9999px] w-px h-px overflow-hidden"
        aria-hidden="true"
      >
        <label for="hp-website">Website</label>
        <input
          id="hp-website"
          v-model="form.website"
          type="text"
          name="website"
          tabindex="-1"
          autocomplete="off"
        />
      </div>

      <div class="sm:col-span-2">
        <label
          for="hp-consent"
          class="flex cursor-pointer items-start gap-3 text-[13.5px] leading-[1.6] text-[#374151] dark:text-[#D1D5DB]"
        >
          <input
            v-bind="fieldAttrs('consent')"
            v-model="form.consent"
            type="checkbox"
            required
            class="mt-[3px] w-[18px] h-[18px] shrink-0 cursor-pointer rounded accent-[#1AB24F]"
            @change="touch('consent')"
          />
          <I18nT :keypath="`${F}.consent`" tag="span" scope="global">
            <template #policy>
              <router-link
                to="/privacy"
                target="_blank"
                class="font-[600] text-[#159447] underline underline-offset-2 dark:text-[#5EE38F]"
                @click.stop
                >{{ t(`${F}.policy`) }}</router-link
              >
            </template>
          </I18nT>
        </label>
        <p
          v-if="errors.consent"
          id="hp-consent-error"
          class="mt-1.5 pl-[30px] text-[12.5px] font-[500] text-[#DC2626] dark:text-[#F87171]"
        >
          {{ errors.consent }}
        </p>
      </div>

      <div class="sm:col-span-2 flex flex-col gap-3">
        <p
          v-if="message"
          role="alert"
          class="rounded-xl px-4 py-3 text-[13.5px] leading-[1.6]"
          :class="
            status === 'invalid'
              ? 'bg-[#FEF2F2] text-[#B91C1C] dark:bg-[#7F1D1D]/30 dark:text-[#FCA5A5]'
              : 'bg-[#FFF7ED] text-[#9A3412] dark:bg-[#7C2D12]/30 dark:text-[#FDBA74]'
          "
        >
          <strong v-if="status === 'error'" class="font-[600]"
            >{{ t(`${F}.result.errorTitle`) }}.
          </strong>
          {{ message }}
        </p>
        <button
          type="submit"
          :disabled="status === 'submitting'"
          class="group inline-flex h-[52px] w-full items-center justify-center gap-2 rounded-xl bg-[#1AB24F] px-6 text-[15.5px] font-[600] text-white shadow-[0_10px_30px_-12px_rgba(26,178,79,0.8)] transition-colors hover:bg-[#16A046] disabled:cursor-wait disabled:opacity-70"
        >
          <svg
            v-if="status === 'submitting'"
            viewBox="0 0 24 24"
            class="w-4 h-4 animate-spin"
            fill="none"
            aria-hidden="true"
          >
            <circle
              cx="12"
              cy="12"
              r="9"
              stroke="currentColor"
              stroke-opacity="0.3"
              stroke-width="3"
            />
            <path
              d="M21 12a9 9 0 0 0-9-9"
              stroke="currentColor"
              stroke-width="3"
              stroke-linecap="round"
            />
          </svg>
          {{ submitLabel }}
        </button>
        <p class="text-center text-[12.5px] text-[#6B7280] dark:text-[#A3A3A3]">
          {{ t(`${F}.privacyNote`) }}
        </p>
      </div>
    </form>
  </div>
</template>
