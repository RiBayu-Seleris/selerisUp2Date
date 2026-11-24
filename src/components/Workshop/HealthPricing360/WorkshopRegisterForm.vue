<script setup>
import { computed, nextTick, ref } from "vue";
import { Translation as I18nT, useI18n } from "vue-i18n";
import {
  PARTICIPANT_CATEGORIES,
  useWorkshopRegistration,
} from "@/composables/useWorkshopRegistration";
import WorkshopField from "./WorkshopField.vue";

const props = defineProps({
  workshop: { type: Object, required: true },
});

const emit = defineEmits(["done"]);

const F = "workshop.form";
const { t } = useI18n();

const {
  form,
  errors,
  status,
  message,
  submittedName,
  touch,
  revalidate,
  submit,
  reset,
} = useWorkshopRegistration(props.workshop);

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
        {{ t(`${F}.result.successText`, { name: submittedName }) }}
      </p>
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
          v-model="form.whatsapp"
          type="tel"
          name="tel"
          autocomplete="tel"
          inputmode="tel"
          maxlength="20"
          required
          :placeholder="t(`${F}.whatsappPh`)"
          :class="inputClass('whatsapp')"
          @blur="touch('whatsapp')"
          @input="revalidate('whatsapp')"
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
          v-model="form.teamSize"
          type="number"
          inputmode="numeric"
          min="2"
          max="500"
          step="1"
          required
          placeholder="5"
          :class="inputClass('teamSize')"
          @blur="touch('teamSize')"
          @input="revalidate('teamSize')"
        />
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
          {{
            status === "submitting" ? t(`${F}.submitting`) : t(`${F}.submit`)
          }}
        </button>
        <p class="text-center text-[12.5px] text-[#6B7280] dark:text-[#A3A3A3]">
          {{ t(`${F}.privacyNote`) }}
        </p>
      </div>
    </form>
  </div>
</template>
