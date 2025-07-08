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
