import { createRouter, createWebHistory } from "vue-router";
import { healthPricing360 } from "@/Data/workshops/healthpricing360";

// "ai-powered" -> "Ai Powered"
const slugToTitle = (slug) =>
  String(slug ?? "")
    .split("-")
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/Home.vue"),
    meta: { title: "Home" },
  },
  {
    path: "/book-a-demo",
    name: "BookDemo",
    component: () => import("@/views/BookDemo.vue"),
    meta: { title: "Demo" },
  },
  // Redirect jika akses langsung ke /about
  {
    path: "/about",
    redirect: "/", // bisa juga ke "/about/company" atau "/not-found"
  },
  // Routes Grouping
  {
    path: "/about", // Parent path for admin
    children: [
      {
        path: "company",
        name: "Company",
        component: () => import("@/views/Company.vue"),
        meta: { title: "Company" },
      },
      {
        path: "teams",
        name: "Team",
        component: () => import("@/views/Team.vue"),
        meta: { title: "Team" },
      },
      {
        path: "innovation",
        name: "Roadmap",
        component: () => import("@/views/Roadmap.vue"),
        meta: { title: "Innovation" },
      },
      {
        path: "frequently-ask-question",
        name: "FAQ",
        component: () => import("@/views/Faq.vue"),
        meta: { title: "FAQ" },
      },
    ],
  },
  {
    path: "/services",
    name: "Service",
    component: () => import("@/views/Service.vue"),
    meta: { title: "Service" },
  },
  {
    path: "/contact",
    name: "Contact",
    component: () => import("@/views/Contact.vue"),
    meta: { title: "Contact" },
  },

  // Technology
  {
    path: "/seleris-chromatic-imaging",
    name: "Seleris-Chromatic-Imaging",
    component: () => import("@/views/ChromaticImaging.vue"),
    meta: { title: "Home" },
  },
  {
    path: "/seleris-deep-vitals",
    name: "Seleris-Deep-Vitals",
    component: () => import("@/views/DeepVitals.vue"),
    meta: { title: "Home" },
  },
  {
    path: "/seleris-deep-risk",
    name: "Seleris-Deep-Risk",
    component: () => import("@/views/DeepRisk.vue"),
    meta: { title: "Home" },
  },
  // Company
  {
    path: "/security",
    name: "Security",
    component: () => import("@/views/Security.vue"),
    meta: { title: "Security" },
  },
  {
    path: "/term-and-condition",
    name: "TermCondition",
    component: () => import("@/views/Term.vue"),
    meta: { title: "Terms & Conditions" },
  },
  {
    path: "/privacy",
    name: "PrivacyPolicy",
    component: () => import("@/views/Privacy.vue"),
    meta: { title: "Privacy & Policy" },
  },

  // Products
  // Redirect jika akses langsung ke /about
  {
    path: "/product",
    redirect: "/", // bisa juga ke "/about/company" atau "/not-found"
  },
  {
    path: "/product",
    component: () => import("@/views/Products/ProductLayout.vue"),
    children: [
      {
        path: "shield",
        name: "Shield",
        component: () => import("@/views/Products/Shield.vue"),
        meta: { title: "Shield" },
      },
      {
        path: "medins",
        redirect: "/product/shield",
      },
      {
        path: "credit-cover",
        name: "CreditCover",
        component: () => import("@/views/Products/CC.vue"),
        meta: { title: "Credit Cover" },
      },
      {
        path: "assure",
        name: "Assure",
        component: () => import("@/views/Products/Assure.vue"),
        meta: { title: "Assure" },
      },
      {
        path: "lifins",
        redirect: "/product/assure",
      },
      {
        path: "health-care",
        name: "HealthCare",
        component: () => import("@/views/Products/HealthCare.vue"),
        meta: { title: "Health Care" },
      },
      {
        path: "seleris-credit",
        name: "SelerisCredit",
        component: () => import("@/views/Products/Credit.vue"),
        meta: { title: "Seleris Credit" },
      },
    ],
  },

  // Redirect jika akses langsung ke /Solution
  {
    path: "/solution",
    redirect: "/", // bisa juga ke "/about/company" atau "/not-found"
  },
  // Routes Solution
  {
    path: "/solution/:slug",
    name: "SolutionDetail",
    component: () => import("@/views/Solutions.vue"),
    // title dinamis: ikut :slug (mis. "ai-powered" -> "Ai Powered")
    meta: { title: (route) => slugToTitle(route.params.slug) || "Solution" },
  },

  // Blogs
  {
    path: "/blogs",
    name: "Blog",
    component: () => import("@/views/Blogs.vue"),
    meta: { title: "Blogs" },
  },
  {
    path: "/blog/:slug",
    name: "BlogDetail",
    component: () => import("@/views/BlogDetail.vue"),
    meta: { title: "BlogDetail" },
  },
  // {
  //   path: "/blog/details",
  //   name: "BlogDetails",
  //   component: () => import("@/views/BlogDetail.vue"),
  //   meta: { title: "BlogDetail" },
  // },

  // Careers
  {
    path: "/workshop",
    redirect: "/workshop/healthpricing-360",
  },
  {
    path: "/workshop/healthpricing-360",
    name: "WorkshopHealthPricing360",
    component: () => import("@/views/Workshop/HealthPricing360.vue"),
    meta: { title: "HEALTHPRICING 360° Workshop" },
    beforeEnter: () =>
      healthPricing360.isPublished || { path: "/", replace: true },
  },
  {
    path: "/careers",
    name: "Careers",
    component: () => import("@/views/Careers.vue"),
    meta: { title: "Career" },
  },
  {
    path: "/careers/apply",
    redirect: "/careers",
  },

  // Face Tracking
  {
    path: "/face-tracking",
    name: "Facetracking",
    component: () => import("@/views/SelerisFaceTracker.vue"),
  },

  // Testing
  {
    path: "/test-embed",
    name: "Testing",
    component: () => import("@/views/TestEmbed.vue"),
  },
  {
    path: "/chatbot",
    name: "TestChat",
    component: () => import("@/views/ChatBotLearn.vue"),
  },
  {
    path: "/chatbot2",
    name: "TestChat2",
    component: () => import("@/views/ChatBotLearn2.vue"),
  },

  // catch-all route (harus di paling bawah)
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    redirect: "/",
  },
];

// const router = createRouter({
//   history: createWebHistory(),
//   routes,
//   scrollBehavior(to, from, savedPosition) {
//     // Saat reload atau navigasi baru, scroll ke atas
//     return { top: 0 };
//   },
// });

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // Jika menekan tombol "back" browser
    // if (savedPosition) {
    //   return savedPosition;
    // }

    // Jika ada hash (#howapplicationwork)
    if (to.hash) {
      return {
        el: to.hash,
        behavior: "smooth",
      };
    }

    // Default scroll ke atas
    return { top: 0 };
  },
});

export default router;
