import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/Home.vue"),
  },
  {
    path: "/about",
    name: "About",
    component: () => import("@/views/About.vue"),
  },
  {
    path: "/teams",
    name: "Team",
    component: () => import("@/views/Team.vue"),
  },
  {
    path: "/blogs",
    name: "Blog",
    component: () => import("@/views/Blogs.vue"),
  },
  {
    path: "/services",
    name: "Service",
    component: () => import("@/views/Service.vue"),
  },
  {
    path: "/contact",
    name: "Contact",
    component: () => import("@/views/Contact.vue"),
  },

  // Technology
  {
    path: "/seleris-chromatic-imaging",
    name: "Seleris-Chromatic-Imaging",
    component: () => import("@/views/ChromaticImaging.vue"),
  },
  {
    path: "/seleris-deep-vitals",
    name: "Seleris-Deep-Vitals",
    component: () => import("@/views/DeepVitals.vue"),
  },
  {
    path: "/seleris-deep-risk",
    name: "Seleris-Deep-Risk",
    component: () => import("@/views/DeepRisk.vue"),
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
