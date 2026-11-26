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
