export const healthPricing360 = {
  slug: "healthpricing-360",
  path: "/workshop/healthpricing-360",
  name: "HEALTHPRICING 360°",
  organizer: "Shield",
  durationDays: 2,
  moduleCount: 10,
  handsOnModule: 8,

  event: {
    startDate: null,
    endDate: null,
    time: null,
    timezone: "WIB",
    format: null,
    venue: null,
    price: null,
    quota: null,
    contactEmail: null,
    contactWhatsapp: null,
    cancellationPolicy: { id: null, en: null },
  },

  agenda: [
    {
      day: 1,
      sessions: [
        { module: 1, time: null },
        { module: 2, time: null },
        { module: 3, time: null },
        { module: 4, time: null },
        { module: 5, time: null },
      ],
    },
    {
      day: 2,
      sessions: [
        { module: 6, time: null },
        { module: 7, time: null },
        { module: 8, time: null },
        { module: 9, time: null },
        { module: 10, time: null },
      ],
    },
  ],

  facilitators: [],

  faq: [],

  modules: [],

  seo: {
    ogImage: null,
  },

  registration: {
    endpoint: "/api/v1/app/workshop-registrations",
    isOpen: true,
    status: "open",
  },
};

export const facilitatorTemplate = {
  name: "",
  role: "",
  organization: "",
  photo: null,
  credentials: [],
  modules: [],
  bio: { id: "", en: "" },
  linkedin: null,
};
