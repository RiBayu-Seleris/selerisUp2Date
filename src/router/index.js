import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/Home.vue"),
    meta: { title: "Home" },
  },
  {
    path: "/about",
    name: "About",
    component: () => import("@/views/About.vue"),
    meta: { title: "About" },
  },
  {
    path: "/teams",
    name: "Team",
    component: () => import("@/views/Team.vue"),
    meta: { title: "Team" },
  },
  {
    path: "/blogs",
    name: "Blog",
    component: () => import("@/views/Blogs.vue"),
    meta: { title: "Blog" },
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
