import { computed, reactive, ref, watch } from "vue";
import axios from "axios";
import { useI18n } from "vue-i18n";
import { SENTRIS_BASE_URL } from "@/consumeAPI/workshopsApi";

const MIN_FILL_MS = 3000;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^\+?\d{9,15}$/;
const PROOF_MAX_BYTES = 5 * 1024 * 1024;
const PROOF_TYPES = ["image/jpeg", "image/png", "application/pdf"];
const PROOF_EXT = /\.(jpe?g|png|pdf)$/i;

export const PROOF_ACCEPT =
  "image/jpeg,image/png,application/pdf,.jpg,.jpeg,.png,.pdf";

const toFormData = (payload, file) => {
  const body = new FormData();
  Object.entries(payload).forEach(([key, value]) => {
    if (value === null || value === undefined) return;
    if (typeof value === "boolean") body.append(key, value ? "1" : "0");
    else body.append(key, String(value));
  });
  body.append("payment_proof", file);
  return body;
};

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
  paymentProof: null,
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
  const notice = ref(null);
  const message = computed(() =>
    notice.value?.key ? t(notice.value.key) : notice.value?.text || "",
  );
  const submittedName = ref("");
  const registrationCode = ref("");
  const paidSubmission = ref(false);
  const progress = ref(0);
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
    paymentProof: () => {
      if (!workshop.payment) return "";
      const file = form.paymentProof;
      if (!file) return t("workshop.form.errors.proofRequired");
      if (!PROOF_TYPES.includes(file.type) && !PROOF_EXT.test(file.name || ""))
        return t("workshop.form.errors.proofType");
      return file.size > PROOF_MAX_BYTES
        ? t("workshop.form.errors.proofSize")
        : "";
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

  watch(locale, () => {
    Object.keys(errors).forEach(validateField);
  });

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
    notice.value = null;
    registrationCode.value = "";
    paidSubmission.value = false;
    progress.value = 0;
    startedAt = Date.now();
  };

  const succeed = (name, code = "", paid = false) => {
    submittedName.value = name;
    registrationCode.value = code;
    paidSubmission.value = paid;
    status.value = "success";
    notice.value = null;
  };

  const submit = async () => {
    if (status.value === "submitting") return null;
    notice.value = null;

    if (!workshop.registration.isOpen) {
      status.value = "error";
      notice.value = {
        key:
          workshop.registration.status === "full"
            ? "workshop.form.result.full"
            : "workshop.form.result.closed",
      };
      return null;
    }

    const firstInvalid = validateAll();
    if (firstInvalid) {
      status.value = "invalid";
      notice.value = { key: "workshop.form.errors.summary" };
      return firstInvalid;
    }

    const name = form.fullName.trim();
    const paid = Boolean(workshop.payment);

    if (form.website || Date.now() - startedAt < MIN_FILL_MS) {
      succeed(name, "", paid);
      return null;
    }

    status.value = "submitting";
    progress.value = 0;

    const payload = {
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
      team_size: form.participation === "team" ? Number(form.teamSize) : null,
      consent: true,
      locale: locale.value,
      source_url: window.location.href,
    };

    try {
      const response = await axios.post(
        `${SENTRIS_BASE_URL}${workshop.registration.endpoint}`,
        paid ? toFormData(payload, form.paymentProof) : payload,
        {
          headers: {
            Accept: "application/json",
            "Accept-Language": locale.value,
          },
          onUploadProgress: paid
            ? (event) => {
                if (event.total)
                  progress.value = Math.round(
                    (event.loaded / event.total) * 100,
                  );
              }
            : undefined,
        },
      );
      succeed(name, response?.data?.data?.registration_code || "", paid);
    } catch (error) {
      const code = error.response?.status;
      status.value = "error";
      if (code === 404 || code === 405) {
        notice.value = { key: "workshop.form.result.notAvailable" };
      } else if (code === 413) {
        notice.value = { key: "workshop.form.errors.proofSize" };
        errors.paymentProof = t("workshop.form.errors.proofSize");
      } else if (code === 422) {
        const list = error.response?.data?.errors;
        notice.value = list
          ? { text: Object.values(list).flat().join(" ") }
          : { key: "workshop.form.errors.summary" };
      } else if (code === 429) {
        notice.value = { key: "workshop.form.result.tooMany" };
      } else {
        notice.value = { key: "workshop.form.result.errorText" };
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
    registrationCode,
    paidSubmission,
    progress,
    touch,
    revalidate,
    submit,
    reset,
  };
}
