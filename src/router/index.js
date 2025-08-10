import { createRouter, createWebHistory } from "vue-router";

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
        path: "medins",
        name: "Medins",
        component: () => import("@/views/Products/Medins.vue"),
        meta: { title: "Medins" },
      },
      {
        path: "credit-cover",
        name: "CreditCover",
        component: () => import("@/views/Products/CC.vue"),
        meta: { title: "Credit Cover" },
      },
      {
        path: "lifins",
        name: "Lifins",
        component: () => import("@/views/Products/Lifins.vue"),
        meta: { title: "Lifins" },
      },
      {
        path: "health-care",
        name: "HealthCare",
        component: () => import("@/views/Products/HealthCare.vue"),
        meta: { title: "Health Care" },
      },
    ],
  },
  // catch-all route (harus di paling bawah)
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    redirect: "/",
  },
  // Testing
  {
    path: "/test-embed",
    name: "Lifins",
    component: () => import("@/views/TestEmbed.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // Saat reload atau navigasi baru, scroll ke atas
    return { top: 0 };
  },
});

export default router;
