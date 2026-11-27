import { reactive } from "vue";
import { WORKSHOP_DYNAMIC } from "@/Data/workshops";
import { loadWorkshopDetail } from "@/consumeAPI/workshopsApi";
import { useAutoRefresh } from "@/composables/useAutoRefresh";
import { toEnglish } from "@/utils/workshopText";

const timeRange = (start, end) => {
  if (!start) return null;
  return end ? `${start}–${end}` : start;
};

const bilingual = (value) => ({
  id: value?.id || null,
  en: value?.en || toEnglish(value?.id) || value?.id || null,
});

const text = (value) => (value ? bilingual(value) : null);

const texts = (items) =>
  (items || []).map(bilingual).filter((item) => item.id || item.en);

const toShowcase = (showcase) =>
  showcase
    ? {
        title: text(showcase.title),
        body: text(showcase.body),
        steps: (showcase.steps || []).map((step) => ({
          title: text(step.title),
          description: text(step.description),
          imageUrl: step.image_url || null,
          imageAlt: text(step.image_alt),
        })),
        disclaimer: text(showcase.disclaimer),
        linkUrl: showcase.link_url || null,
        linkLabel: text(showcase.link_label),
      }
    : null;

const toContent = (data) => ({
  label: text(data.label),
  headline: text(data.headline),
  summary: text(data.summary),
  introQuestion: text(data.intro_question),
  description: text(data.description),
  whyItMatters: text(data.why_it_matters),
  objective: text(data.objective),
  keyMessage: text(data.key_message),
  learningOutcomes: texts(data.learning_outcomes),
  curriculumTitle: text(data.curriculum_title),
  curriculumDescription: text(data.curriculum_description),
  agendaTitle: text(data.agenda_title),
  learningMethods: texts(data.learning_methods),
  showcase: toShowcase(data.showcase),
  audienceDescription: text(data.audience_description),
  audience: (data.audience || [])
    .filter((group) => Array.isArray(group?.roles))
    .map((group) => ({ group: text(group.group), roles: texts(group.roles) }))
    .filter((group) => group.roles.length),
  benefitsDescription: text(data.benefits_description),
  benefits: (data.benefits || []).map((item) => ({
    title: text(item.title),
    description: text(item.description),
  })),
  ctaTitle: text(data.cta_title),
  ctaDescription: text(data.cta_description),
  seoTitle: text(data.seo_title),
  seoDescription: text(data.seo_description),
  ogImageUrl: data.og_image_url || null,
  priceNote: text(data.price_note),
});

const toAgenda = (days) =>
  (days || [])
    .map((day) => ({
      day: day.day,
      title: day.title ? bilingual(day.title) : null,
      summary: day.summary ? bilingual(day.summary) : null,
      sessions: (day.sessions || [])
        .filter((session) => session.type === "module" && session.module)
        .map((session) => ({
          module: session.module,
          time: timeRange(session.start_time, session.end_time),
        })),
    }))
    .filter((day) => day.sessions.length);

const toFacilitator = (person) => ({
  name: person.name || "",
  role: person.role || "",
  organization: person.organization || "",
  photo: person.photo_url || null,
  credentials: person.credentials || [],
  modules: person.modules || [],
  bio: bilingual(person.bio),
  linkedin: person.linkedin_url || null,
});

const applyDetail = (workshop, data) => {
  workshop.subtitle = data.subtitle ? bilingual(data.subtitle) : null;
  workshop.highlights = (data.highlights || [])
    .map(bilingual)
    .filter((item) => item.id || item.en);
  workshop.content = toContent(data);

  Object.assign(workshop.event, {
    startDate: data.start_date ?? null,
    endDate: data.end_date ?? null,
    time: timeRange(data.start_time, data.end_time),
    timezone: data.timezone || "WIB",
    format: data.format ?? null,
    venue: data.venue ?? null,
    price: data.price ?? null,
    quota: data.quota ?? null,
    contactEmail: data.contact_email ?? null,
    contactWhatsapp: data.contact_whatsapp ?? null,
    cancellationPolicy: bilingual(data.cancellation_policy),
  });

  const status = data.registration?.status || "closed";
  workshop.registration.status = status;
  workshop.registration.isOpen = status === "open";

  const agenda = toAgenda(data.agenda);
  if (agenda.length) workshop.agenda = agenda;

  workshop.modules = (data.modules || []).map((item) => ({
    number: item.number,
    day: item.day ?? null,
    title: bilingual(item.title),
    summary: bilingual(item.summary),
    type: item.type || null,
    topics: texts(item.topics),
  }));

  workshop.facilitators = (data.facilitators || []).map(toFacilitator);
  workshop.faq = (data.faq || []).map((item) => ({
    question: bilingual(item.question),
    answer: bilingual(item.answer),
  }));
};

export function useWorkshopDetail(base) {
  const workshop = reactive(JSON.parse(JSON.stringify(base)));
  let lastJson = "";

  const refresh = (fresh = false) =>
    loadWorkshopDetail(base.slug, { fresh })
      .then((data) => {
        if (!data) return;
        const json = JSON.stringify(data);
        if (json === lastJson) return;
        lastJson = json;
        applyDetail(workshop, data);
      })
      .catch(() => {});

  if (WORKSHOP_DYNAMIC) {
    refresh();
    useAutoRefresh(() => refresh(true));
  }

  return workshop;
}
