import { reactive, ref } from "vue";
import axios from "axios";
import { useI18n } from "vue-i18n";
import { SENTRIS_BASE_URL } from "@/consumeAPI/workshopsApi";

const MIN_FILL_MS = 3000;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^\+?\d{9,15}$/;

export const PARTICIPANT_CATEGORIES = [
  "actuary",
  "underwriter",
  "insurer",
  "broker",
  "tpa",
  "consultant",
  "corporate",
  "other",
];

const blank = () => ({
  fullName: "",
  email: "",
  whatsapp: "",
  organization: "",
  jobTitle: "",
  category: "",
  categoryOther: "",
  participation: "individual",
  teamSize: "",
  consent: false,
  website: "",
});

export const normalizePhone = (value) =>
  String(value || "").replace(/[\s\-().]/g, "");

export function useWorkshopRegistration(workshop) {
  const { t, locale } = useI18n();

  const form = reactive(blank());
  const errors = reactive({});
  const touched = reactive({});
  const status = ref("idle");
  const message = ref("");
  const submittedName = ref("");
  let startedAt = Date.now();

  const rules = {
    fullName: () =>
      form.fullName.trim().length >= 2
        ? ""
        : t("workshop.form.errors.required"),
    email: () => {
      const v = form.email.trim();
      if (!v) return t("workshop.form.errors.required");
      return EMAIL_RE.test(v) ? "" : t("workshop.form.errors.email");
    },
    whatsapp: () => {
      const v = normalizePhone(form.whatsapp);
      if (!v) return t("workshop.form.errors.required");
      if (!PHONE_RE.test(v)) return t("workshop.form.errors.phone");
      if (v.startsWith("0") && !v.startsWith("08"))
        return t("workshop.form.errors.phone");
      return "";
    },
    organization: () =>
      form.organization.trim() ? "" : t("workshop.form.errors.required"),
    jobTitle: () =>
      form.jobTitle.trim() ? "" : t("workshop.form.errors.required"),
    category: () =>
      PARTICIPANT_CATEGORIES.includes(form.category)
        ? ""
        : t("workshop.form.errors.required"),
    categoryOther: () =>
      form.category !== "other" || form.categoryOther.trim()
        ? ""
        : t("workshop.form.errors.required"),
    teamSize: () => {
      if (form.participation !== "team") return "";
      const n = Number(form.teamSize);
      return Number.isInteger(n) && n >= 2 && n <= 500
        ? ""
        : t("workshop.form.errors.teamSize");
    },
    consent: () => (form.consent ? "" : t("workshop.form.errors.consent")),
  };

  const validateField = (field) => {
    const rule = rules[field];
    if (!rule) return true;
    const error = rule();
    if (error) errors[field] = error;
    else delete errors[field];
    return !error;
  };

  const touch = (field) => {
    touched[field] = true;
    validateField(field);
  };

  const revalidate = (field) => {
    if (touched[field] || errors[field]) validateField(field);
  };

  const validateAll = () => {
    let firstInvalid = null;
    for (const field of Object.keys(rules)) {
      touched[field] = true;
      if (!validateField(field) && !firstInvalid) firstInvalid = field;
    }
    return firstInvalid;
  };

  const reset = () => {
    Object.assign(form, blank());
    Object.keys(errors).forEach((key) => delete errors[key]);
    Object.keys(touched).forEach((key) => delete touched[key]);
    status.value = "idle";
    message.value = "";
    startedAt = Date.now();
  };

  const succeed = (name) => {
    submittedName.value = name;
    status.value = "success";
    message.value = "";
  };

  const submit = async () => {
    if (status.value === "submitting") return null;
    message.value = "";

    if (!workshop.registration.isOpen) {
      status.value = "error";
      message.value =
        workshop.registration.status === "full"
          ? t("workshop.form.result.full")
          : t("workshop.form.result.closed");
      return null;
    }

    const firstInvalid = validateAll();
    if (firstInvalid) {
      status.value = "invalid";
      message.value = t("workshop.form.errors.summary");
      return firstInvalid;
    }

    const name = form.fullName.trim();

    if (form.website || Date.now() - startedAt < MIN_FILL_MS) {
      succeed(name);
      return null;
    }

    status.value = "submitting";

    try {
      await axios.post(
        `${SENTRIS_BASE_URL}${workshop.registration.endpoint}`,
        {
          workshop_slug: workshop.slug,
          workshop_name: workshop.name,
          full_name: name,
          email: form.email.trim().toLowerCase(),
          whatsapp: normalizePhone(form.whatsapp),
          organization: form.organization.trim(),
          job_title: form.jobTitle.trim(),
          participant_category: form.category,
          participant_category_other:
            form.category === "other" ? form.categoryOther.trim() : null,
          participation_type: form.participation,
          team_size:
            form.participation === "team" ? Number(form.teamSize) : null,
          consent: true,
          locale: locale.value,
          source_url: window.location.href,
        },
        {
          headers: {
            Accept: "application/json",
            "Accept-Language": locale.value,
          },
        },
      );
      succeed(name);
    } catch (error) {
      const code = error.response?.status;
      status.value = "error";
      if (code === 404 || code === 405) {
        message.value = t("workshop.form.result.notAvailable");
      } else if (code === 422) {
        const list = error.response?.data?.errors;
        message.value = list
          ? Object.values(list).flat().join(" ")
          : t("workshop.form.errors.summary");
      } else if (code === 429) {
        message.value = t("workshop.form.result.tooMany");
      } else {
        message.value = t("workshop.form.result.errorText");
      }
    }
    return null;
  };

  return {
    form,
    errors,
    status,
    message,
    submittedName,
    touch,
    revalidate,
    submit,
    reset,
  };
}
