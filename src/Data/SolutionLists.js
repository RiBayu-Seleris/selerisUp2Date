import shield from "@/assets/icons/Solutions/shield.vue";
import phone from "@/assets/icons/Solutions/phone.vue";
import trash from "@/assets/icons/Solutions/trash.vue";
import lens from "@/assets/icons/Solutions/lens.vue";
import dna from "@/assets/icons/Solutions/dna.vue";
import users from "@/assets/icons/Solutions/users.vue";
import hands from "@/assets/icons/Solutions/hands.vue";

export const SolutionLists = [
  {
    id: 1,
    slug: "ai-powered",
    url: "/solution/ai-powered",
    title: "AI-Powered Insurance Underwriting",
    content: "Underwriting Asuransi Berbasis AI",
    icons: shield,

    // Hero
    hero: {
      label: "Solution",
      title: "AI-Powered Insurance Underwriting",
      subtitle: "Fair Insurance Pricing, Starting From Your Face.",
    },

    // Overview
    overview: {
      description:
        "Seleris fundamentally transforms the underwriting paradigm. Using AI-powered rPPG (Remote Photoplethysmography) technology, Seleris measures up to 39 physiological parameters — including heart rate, HRV, respiratory rate, blood pressure estimation, and cardiovascular risk indicators — in just 60 seconds via a standard smartphone camera. No additional devices. No clinic visits. No waiting for lab results.",
      stats: [
        { value: "39", label: "Physiological Parameters" },
        { value: "60s", label: "Scan Time" },
        { value: "70%", label: "Cost Reduction" },
      ],
    },

    // Key Features
    keyFeatures: {
      image: "/images/solutions/ai-powered.png",
      items: [
        {
          title: "39 Physiological Parameters",
          description:
            "Heart Rate, HRV, Respiratory Rate, Blood Pressure estimation, Stress Index, Cardiovascular Risk Score, Biological Age, BMI, and more",
        },
        {
          title: "End-to-End Digital Underwriting",
          description:
            "From application, screening, to risk decision — all in one seamless digital workflow without paperwork",
        },
        {
          title: "39 Physiological Parameters",
          description:
            "Heart Rate, HRV, Respiratory Rate, Blood Pressure estimation, Stress Index, Cardiovascular Risk Score, Biological Age, BMI, and more",
        },
        {
          title: "Compliance-Ready",
          description:
            "Designed in accordance with OJK regulations and international actuarial best practices (FSAI/IAI)",
        },
      ],
    },

    // More Features
    moreFeatures: [
      {
        title: "Bias-Corrected for Asian Populations",
        description:
          "Models trained on multi-ethnic Southeast Asian datasets for demographically relevant accuracy",
      },
      {
        title: "Bias-Corrected for Asian Populations",
        description:
          "Models trained on multi-ethnic Southeast Asian datasets for demographically relevant accuracy",
      },
      {
        title: "Bias-Corrected for Asian Populations",
        description:
          "Models trained on multi-ethnic Southeast Asian datasets for demographically relevant accuracy",
      },
      {
        title: "Bias-Corrected for Asian Populations",
        description:
          "Models trained on multi-ethnic Southeast Asian datasets for demographically relevant accuracy",
      },
    ],

    // Business Benefits
    businessBenefits: {
      title: "Business Benefits",
      subtitle: "Solution For Your Business",
      items: [
        { icon: null, label: "Reduce underwriting costs by up to 70%" },
        {
          icon: null,
          label:
            "Expand insurance access to underserved unbanked/uninsured segments",
        },
        {
          icon: null,
          label: "Accelerate policy issuance from days to minutes",
        },
        {
          icon: null,
          label:
            "Improve risk selection accuracy and minimize adverse selection",
        },
      ],
    },

    // CTA Banner
    cta: {
      title: "Smarter Risk. Faster Decision. Sustainable Protection",
      subtitle: "Smarter Risk. Faster Decision. Sustainable Protection",
      buttonText: "Book a Demo!",
      buttonUrl: "/contact",
    },
  },
  {
    id: 2,
    url: "/",
    title: "Mobile Health — Seleriscare.ai",
    content: "Kesehatan Mobile — Seleriscare.ai",
    icons: phone,
  },
  {
    id: 3,
    url: "/",
    title: "Corporate Wellness",
    content: "Wellness Korporasi",
    icons: trash,
  },
  {
    id: 4,
    url: "/",
    title: "Remote Patient Monitoring",
    content: "Pemantauan Pasien Jarak Jauh",
    icons: lens,
  },
  {
    id: 5,
    url: "/",
    title: "Biological Age Assessment",
    content: "Penilaian Usia Biologis",
    icons: dna,
  },
  {
    id: 6,
    url: "/",
    title: "Population Health Screening",
    content: "Skrining Kesehatan Populasi",
    icons: users,
  },
  {
    id: 7,
    url: "/",
    title: "B2B Partnership & Licensing",
    content: "Kemitraan & Lisensi B2B",
    icons: hands,
  },
];
