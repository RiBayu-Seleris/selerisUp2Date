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
    ],

    // Business Benefits
    businessBenefits: {
      title: "Business Benefits",
      subtitle: "Solution For Your Business",
      items: [
        { icon: null, label: "Reduce underwriting costs by up to 70%" },
        {
          icon: null,
          label: "Accelerate policy issuance from days to minutes",
        },
        {
          icon: null,
          label:
            "Improve risk selection accuracy and minimize adverse selection",
        },
        {
          icon: null,
          label:
            "Expand insurance access to underserved unbanked/uninsured segments",
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
    slug: "mobile-health",
    url: "/solution/mobile-health",
    title: "Mobile Health — Seleriscare.ai",
    content: "Kesehatan Mobile — Seleriscare.ai",
    icons: phone,

    hero: {
      label: "Solution 02",
      title: "Mobile Health — Seleriscare.ai",
      subtitle: "Comprehensive Health Check, 60 Seconds, Anywhere.",
    },

    overview: {
      description:
        "Seleriscare.ai is an rPPG-based direct-to-consumer (D2C) health platform that brings clinic-grade health assessment capabilities directly to your smartphone. Users simply face their smartphone camera for 60 seconds to receive a comprehensive health report covering vital signs, cardiovascular risk scores, biological age estimation, and metabolic indicators — no additional sensors, no wires, no doctor visits.",
      stats: [
        { value: "60s", label: "Fast Assessment" },
        { value: "D2C", label: "Direct to Consumer" },
        { value: "4", label: "Subscription Tiers" },
      ],
    },

    keyFeatures: {
      image: "/images/solutions/mobile-health.png",
      items: [
        {
          title: "60-Second Vital Sign Scan",
          description:
            "Heart rate, respiratory rate, HRV, oxygen saturation (estimated), and blood pressure (estimated)",
        },
        {
          title: "Comprehensive Health Scores",
          description:
            "Cardiovascular Risk Score, Stress Level, Metabolic Health Index",
        },
        {
          title: "Biological Age Estimation",
          description:
            "Compare biological vs chronological age to understand true health status",
        },
        {
          title: "Facial BMI Estimation",
          description:
            "Seleris’s unique technology for Body Mass Index estimation without a scale",
        },
      ],
    },

    moreFeatures: [
      {
        title: "Health Trend Dashboard",
        description:
          "Track health progress over time with easy-to-understand visualizations",
      },
      {
        title: "Subscription Packages",
        description:
          "Free, Basic, Silver, Gold — tailored for different age segments and health needs",
      },
    ],

    businessBenefits: {
      title: "Business Benefits",
      subtitle: "Solution For Your Business",
      items: [
        { icon: null, label: "Health assessment without clinic visits" },
        { icon: null, label: "Track personal health trends over time" },
        { icon: null, label: "Early detection of cardiovascular risk" },
        { icon: null, label: "Multiple subscription tiers available" },
      ],
    },

    cta: {
      title: "Bring AI Health Checks to Everyone",
      subtitle: "Deliver accessible health insights directly from smartphones",
      buttonText: "Contact Us for a Demo",
      buttonUrl: "/contact",
    },
  },

  {
    id: 3,
    slug: "corporate-wellness",
    url: "/solution/corporate-wellness",
    title: "Corporate Wellness",
    content: "Wellness Korporasi",
    icons: trash,

    hero: {
      label: "Solution 03",
      title: "Corporate Wellness",
      subtitle: "Healthier Employees, More Productive Companies.",
    },

    overview: {
      description:
        "Seleris Corporate Wellness Platform changes the conventional wellness approach entirely: mass employee health screenings can now be conducted contactlessly, quickly, and at scale — directly from each employee's smartphone, anytime, anywhere. Aggregated workforce health data empowers HR teams and management to understand health risk profiles in real-time.",
      stats: [
        { value: "0", label: "Operational Disruption" },
        { value: "Real-time", label: "Aggregated Data" },
        { value: "ROI", label: "Measurable Impact" },
      ],
    },

    keyFeatures: {
      image: "/images/solutions/corporate-wellness.png",
      items: [
        {
          title: "Wellness Management Dashboard",
          description:
            "Monitor aggregated (anonymized) employee health profiles in a single platform",
        },
        {
          title: "Mass Screening Without Disruption",
          description:
            "Employees conduct self-scans without leaving their workstations",
        },
        {
          title: "Risk Stratification Report",
          description:
            "Identify high-risk groups for precisely targeted intervention programs",
        },
        {
          title: "Health Insurance Benefit Integration",
          description:
            "Link health data to employee premium benefit adjustments",
        },
      ],
    },

    moreFeatures: [
      {
        title: "Gamified Wellbeing Programs",
        description:
          "Drive employee participation through health challenges with rewards and team leaderboards",
      },
      {
        title: "Wellness ROI Reports",
        description:
          "Measure the impact of wellness programs on productivity and insurance claim savings",
      },
    ],

    businessBenefits: {
      title: "Business Benefits",
      subtitle: "Solution For Your Business",
      items: [
        { icon: null, label: "Mass screening without operational disruption" },
        { icon: null, label: "Real-time employee risk identification" },
        { icon: null, label: "Precisely targeted intervention programs" },
        { icon: null, label: "Measurable wellness ROI" },
      ],
    },

    cta: {
      title: "Build a Healthier Workforce",
      subtitle: "Empower HR teams with real-time health intelligence",
      buttonText: "Contact Us for a Demo",
      buttonUrl: "/contact",
    },
  },

  {
    id: 4,
    slug: "remote-patient-monitoring",
    url: "/solution/remote-patient-monitoring",
    title: "Remote Patient Monitoring",
    content: "Pemantauan Pasien Jarak Jauh",
    icons: lens,

    hero: {
      label: "Solution 04",
      title: "Remote Patient Monitoring",
      subtitle: "Monitor Your Patients From Anywhere, Anytime.",
    },

    overview: {
      description:
        "Seleris RPM Platform enables medical professionals to continuously monitor patients' physiological conditions — without requiring face-to-face interaction. Through integration with telehealth systems and Electronic Medical Records (EMR), patient vital sign data collected via rPPG is directly synchronized to the clinician's dashboard, providing a comprehensive and up-to-date view of patient status.",
      stats: [
        { value: "24/7", label: "Monitoring" },
        { value: "Instant", label: "Critical Alerts" },
        { value: "EMR", label: "Integrated" },
      ],
    },

    keyFeatures: {
      image: "/images/solutions/remote-monitoring.png",
      items: [
        {
          title: "Continuous Monitoring Dashboard",
          description:
            "Real-time monitoring of Heart Rate, HRV, RR, SpO2, and cardiovascular risk",
        },
        {
          title: "Automated Alert System",
          description:
            "Instant notifications to clinicians when vital parameters exceed critical thresholds",
        },
        {
          title: "EMR/Telehealth Integration",
          description:
            "Compatible with existing medical record and telehealth platforms",
        },
        {
          title: "Post-Discharge Monitoring",
          description:
            "Track patients after hospitalization to prevent readmission",
        },
      ],
    },

    moreFeatures: [
      {
        title: "Chronic Disease Management",
        description:
          "Specialized solutions for long-term management of hypertension, diabetes, and cardiac patients",
      },
      {
        title: "Structured Clinical Reports",
        description:
          "Generate periodic health reports ready for medical documentation",
      },
    ],

    businessBenefits: {
      title: "Business Benefits",
      subtitle: "Solution For Your Business",
      items: [
        {
          icon: null,
          label: "Remote patient monitoring without face-to-face visits",
        },
        {
          icon: null,
          label: "Early detection of post-discharge complications",
        },
        { icon: null, label: "Long-term chronic disease management" },
        { icon: null, label: "Seamless EMR integration" },
      ],
    },

    cta: {
      title: "Deliver Continuous Patient Care",
      subtitle: "Extend healthcare monitoring beyond hospital walls",
      buttonText: "Contact Us for a Demo",
      buttonUrl: "/contact",
    },
  },

  {
    id: 5,
    slug: "biological-age-assessment",
    url: "/solution/biological-age",
    title: "Biological Age Assessment — Seleriscare.ai",
    content: "Penilaian Usia Biologis — Seleriscare.ai",
    icons: dna,

    hero: {
      label: "Solution 05",
      title: "Biological Age Assessment",
      subtitle: "How Old Is Your Body, Really?",
    },

    overview: {
      description:
        "Seleris uses a combination of rPPG, computer vision, and machine learning to non-invasively estimate biological age from facial video alone. The model is calibrated using epidemiological data from Southeast Asian populations, making it demographically and clinically relevant for the Indonesian market. The output is not merely a number — it is an actionable guide for health interventions and fairer insurance premium determination.",
      stats: [
        { value: "AI", label: "Non-Invasive" },
        { value: "SEA", label: "Southeast Asian Dataset" },
        { value: "∞", label: "Strategic Applications" },
      ],
    },

    keyFeatures: {
      image: "/images/solutions/biological-age.png",
      items: [
        {
          title: "Life Insurance Risk Selection",
          description:
            "Replace or augment conventional medical underwriting with objective biological assessment",
        },
        {
          title: "Personalized Longevity Programs",
          description:
            "Tailored health guidance based on the biological vs chronological age gap",
        },
        {
          title: "Intervention Effectiveness Evaluation",
          description:
            "Measure the real impact of health programs on slowing the aging rate",
        },
        {
          title: "Epidemiological Research",
          description:
            "Large-scale population biological age database for national health research",
        },
      ],
    },

    moreFeatures: [
      {
        title: "Wellness Incentives",
        description:
          "Reward policyholders/employees who successfully reduce their biological age",
      },
    ],

    businessBenefits: {
      title: "Business Benefits",
      subtitle: "Solution For Your Business",
      items: [
        {
          icon: null,
          label: "More accurate risk assessment than chronological age",
        },
        { icon: null, label: "Personalized health intervention guidance" },
        { icon: null, label: "National-scale epidemiological database" },
        { icon: null, label: "Data-driven wellness incentives" },
      ],
    },

    cta: {
      title: "Improve Health Insights with Biological Age",
      subtitle: "Turn data into actionable longevity strategies",
      buttonText: "Contact Us for a Demo",
      buttonUrl: "/contact",
    },
  },

  {
    id: 6,
    slug: "population-health-screening",
    url: "/solution/population-health",
    title: "Population Health Screening — Seleriscare.ai",
    content: "Skrining Kesehatan Populasi — Seleriscare.ai",
    icons: users,

    hero: {
      label: "Solution 06",
      title: "Population Health Screening",
      subtitle: "Screen Millions of People, With Just a Smartphone.",
    },

    overview: {
      description:
        "Seleris Population Health Screening changes the equation entirely. With a 'screening-as-a-service' model, Seleris enables national-scale health screening using existing infrastructure: smartphones. No new clinics to build, no additional healthcare staff required. The platform can be integrated into national health apps, corporate health portals, or digital kiosks — reaching millions of people simultaneously.",
      stats: [
        { value: "240M", label: "BPJS Members" },
        { value: "SaaS", label: "Screening-as-a-Service" },
        { value: "∞", label: "Scalability" },
      ],
    },

    keyFeatures: {
      image: "/images/solutions/population-health.png",
      items: [
        {
          title: "BPJS Health Members",
          description:
            "Early cardiovascular and metabolic risk screening for 240 million national health insurance participants",
        },
        {
          title: "Insurance Policyholders",
          description:
            "Pre-underwriting screening to accelerate policy application processing",
        },
        {
          title: "Government Health Programs",
          description:
            "Supporting national chronic disease prevention, NCD, and hypertension early detection programs",
        },
        {
          title: "Rural Communities",
          description:
            "Screening without healthcare infrastructure via village health workers and basic smartphones",
        },
      ],
    },

    moreFeatures: [
      {
        title: "Educational Institutions",
        description:
          "Regular health screening for students and university communities",
      },
    ],

    businessBenefits: {
      title: "Business Benefits",
      subtitle: "Solution For Your Business",
      items: [
        { icon: null, label: "National-scale screening via smartphone" },
        { icon: null, label: "Early detection of chronic diseases" },
        { icon: null, label: "Reach rural and underserved communities" },
        { icon: null, label: "Integration with government health programs" },
      ],
    },

    cta: {
      title: "Scale Health Screening Nationwide",
      subtitle: "Reach millions with simple smartphone-based screening",
      buttonText: "Contact Us for a Demo",
      buttonUrl: "/contact",
    },
  },

  {
    id: 7,
    slug: "b2b-partnership-licensing",
    url: "/solution/b2b-partnership",
    title: "B2B Partnership & Licensing — Seleriscare.ai",
    content: "Kemitraan & Lisensi B2B — Seleriscare.ai",
    icons: hands,

    hero: {
      label: "Solution 07",
      title: "B2B Partnership & Licensing",
      subtitle: "Integrate the Best Health AI Into Your Platform.",
    },

    overview: {
      description:
        "Seleris rPPG technology is available not only as an end-user product, but also as a health technology infrastructure component that can be integrated into your business ecosystem. Through flexible partnership models — from API integration and white-label solutions to strategic joint ventures — Seleris opens collaboration opportunities for organizations wanting to bring cutting-edge health AI to their platforms.",
      stats: [
        { value: "30+", label: "Countries" },
        { value: "API", label: "SDK Ready" },
        { value: "30yr", label: "Industry Network" },
      ],
    },

    keyFeatures: {
      image: "/images/solutions/b2b.png",
      items: [
        {
          title: "API Integration",
          description:
            "Integrate rPPG SDK directly into your mobile app or web platform with comprehensive technical documentation",
        },
        {
          title: "White-Label Solution",
          description:
            "Fully rebranded Seleriscare.ai solution matching the partner’s brand identity — including UI/UX, branding, and domain",
        },
        {
          title: "OEM/Embedded",
          description:
            "SDK integration into hardware devices (kiosks, medical tablets, health IoT devices)",
        },
        {
          title: "Strategic Joint Venture",
          description:
            "50/50 JV model for specific markets, including Malaysia JV and 30-country Asia-MENA expansion",
        },
      ],
    },

    moreFeatures: [
      {
        title: "Sub-Licensing Program",
        description:
          "Sub-licensee partners in target countries receive exclusive distribution rights for Seleris technology",
      },
    ],

    businessBenefits: {
      title: "Business Benefits",
      subtitle: "Solution For Your Business",
      items: [
        { icon: null, label: "Flexible partnership models" },
        { icon: null, label: "Access to the full Seleris ecosystem" },
        { icon: null, label: "30-country Asia-MENA expansion" },
        { icon: null, label: "30+ years of industry network" },
      ],
    },

    cta: {
      title: "Partner With Seleris",
      subtitle: "Bring advanced health AI into your ecosystem",
      buttonText: "Contact Us for a Demo",
      buttonUrl: "/contact",
    },
  },
];
