import shield from "@/assets/icons/Solutions/shield.vue";
import phone from "@/assets/icons/Solutions/phone.vue";
import trash from "@/assets/icons/Solutions/trash.vue";
import lens from "@/assets/icons/Solutions/lens.vue";
import dna from "@/assets/icons/Solutions/dna.vue";
import users from "@/assets/icons/Solutions/users.vue";
import hands from "@/assets/icons/Solutions/hands.vue";

// Semua teks solusi ada di src/locales/en.json & id.json di bawah kunci
// solutions.<slug>. File ini hanya menyimpan struktur: urutan, ikon, warna,
// angka statistik, dan jumlah item (dipakai v-for di views/Solutions.vue).
export const SolutionLists = [
  {
    id: 1,
    slug: "ai-powered",
    url: "/solution/ai-powered",
    icons: shield,
    bgColor: "#ADF9C5",
    darkBgColor: "#2AB857",
    iconColor: "#2AB857",
    darkIconColor: "#FFFFFF",

    overview: {
      stats: [{ value: "60+" }, { value: "60s" }, { value: "70%" }],
    },

    keyFeatures: {
      image: "/images/solutions/ai-powered.png",
      count: 4,
    },

    moreFeaturesCount: 1,
    businessBenefitsCount: 4,

    cta: {
      buttonUrl: "/contact",
    },
  },
  {
    id: 2,
    slug: "mobile-health",
    url: "/solution/mobile-health",
    icons: phone,
    bgColor: "#ADF9D6",
    darkBgColor: "#23D88F",
    iconColor: "#02C285",
    darkIconColor: "#FFFFFF",

    overview: {
      stats: [{ value: "60s" }, { value: "D2C" }, { value: "4" }],
    },

    keyFeatures: {
      image: "/images/solutions/mobile-health.png",
      count: 4,
    },

    moreFeaturesCount: 2,
    businessBenefitsCount: 4,

    cta: {
      buttonUrl: "/contact",
    },
  },
  {
    id: 3,
    slug: "corporate-wellness",
    url: "/solution/corporate-wellness",
    icons: trash,
    bgColor: "#ADECF9",
    darkBgColor: "#3595E8",
    iconColor: "#2A7FB8",
    darkIconColor: "#FFFFFF",

    overview: {
      stats: [{ value: "Zero" }, { value: "Real-time" }, { value: "ROI" }],
    },

    keyFeatures: {
      image: "/images/solutions/corporate-wellness.png",
      count: 4,
    },

    moreFeaturesCount: 2,
    businessBenefitsCount: 4,

    cta: {
      buttonUrl: "/contact",
    },
  },
  {
    id: 4,
    slug: "remote-patient-monitoring",
    url: "/solution/remote-patient-monitoring",
    icons: lens,
    bgColor: "#FFCDB5",
    darkBgColor: "#F5942C",
    iconColor: "#F05222",
    darkIconColor: "#FFFFFF",

    overview: {
      stats: [{ value: "24/7" }, { value: "Instant" }, { value: "EMR" }],
    },

    keyFeatures: {
      image: "/images/solutions/remote-monitoring.png",
      count: 4,
    },

    moreFeaturesCount: 2,
    businessBenefitsCount: 4,

    cta: {
      buttonUrl: "/contact",
    },
  },
  {
    id: 5,
    slug: "biological-age",
    url: "/solution/biological-age",
    icons: dna,
    bgColor: "#FFC2C2",
    darkBgColor: "#FF5F46",
    iconColor: "#FF5F46",
    darkIconColor: "#FFFFFF",

    overview: {
      stats: [{ value: "AI" }, { value: "SEA" }, { value: "∞" }],
    },

    keyFeatures: {
      image: "/images/solutions/biological-age.png",
      count: 4,
    },

    moreFeaturesCount: 1,
    businessBenefitsCount: 4,

    cta: {
      buttonUrl: "/contact",
    },
  },
  {
    id: 6,
    slug: "population-health",
    url: "/solution/population-health",
    icons: users,
    bgColor: "#F9F1AD",
    darkBgColor: "#FFBE4D",
    iconColor: "#E9A928",
    darkIconColor: "#FFFFFF",

    overview: {
      stats: [{ value: "240M" }, { value: "SaaS" }, { value: "∞" }],
    },

    keyFeatures: {
      image: "/images/solutions/population-health.png",
      count: 4,
    },

    moreFeaturesCount: 1,
    businessBenefitsCount: 4,

    cta: {
      buttonUrl: "/contact",
    },
  },
  {
    id: 7,
    slug: "b2b-partnership",
    url: "/solution/b2b-partnership",
    icons: hands,
    bgColor: "#ADF9C5",
    darkBgColor: "#2AB857",
    iconColor: "#2AB857",
    darkIconColor: "#FFFFFF",

    overview: {
      stats: [{ value: "30+" }, { value: "API" }, { value: "30yr" }],
    },

    keyFeatures: {
      image: "/images/solutions/b2b.png",
      count: 4,
    },

    moreFeaturesCount: 1,
    businessBenefitsCount: 4,

    cta: {
      buttonUrl: "/contact",
    },
  },
];
