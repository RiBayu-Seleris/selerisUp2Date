import { reactive } from "vue";
import { loadWorkshopDetail } from "@/consumeAPI/workshopsApi";

const timeRange = (start, end) => {
  if (!start) return null;
  return end ? `${start}–${end}` : start;
};

const bilingual = (value) => ({
  id: value?.id || null,
  en: value?.en || value?.id || null,
});

const toAgenda = (days) =>
  (days || [])
    .map((day) => ({
      day: day.day,
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

  workshop.facilitators = (data.facilitators || []).map(toFacilitator);
  workshop.faq = (data.faq || []).map((item) => ({
    question: bilingual(item.question),
    answer: bilingual(item.answer),
  }));
};

export function useWorkshopDetail(base) {
  const workshop = reactive(JSON.parse(JSON.stringify(base)));

  loadWorkshopDetail(base.slug)
    .then((data) => {
      if (data) applyDetail(workshop, data);
    })
    .catch(() => {});

  return workshop;
}
