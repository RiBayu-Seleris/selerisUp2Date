<script setup>
import { onMounted, onBeforeUnmount, ref } from "vue";
import NavLink from "@productComponents/NavLink.vue";
import LanguageSwitcher from "@/components/reusable/LanguageSwitcher.vue";
import MenuIcon from "@/components/icons/MenuIcon.vue";
import ShieldPlayIcon from "@/components/Products/Shield/ShieldPlayIcon.vue";
import { useScrollStore } from "@/stores/scroll";
import { useSidebarStore } from "@/stores/sidebar";
import logo from "@/assets/Products/images/Logo/Shield-Logo-Color.png";
import { SHIELD_PLAY_STORE } from "@/Data/Products/Shield/ShieldLinks.js";

const scrollStore = useScrollStore();
const sidebarStore = useSidebarStore();

const menu = [
  { href: "#hero", labelKey: "nav.product_items.home" },
  { href: "#about", labelKey: "nav.product_items.about" },
  { href: "#testimonial", labelKey: "nav.product_items.testimonial" },
  { href: "#faq", labelKey: "nav.product_items.faq" },
  { href: "/contact", labelKey: "nav.product_items.contact" },
];

const active = ref("#hero");
let observer = null;

onMounted(() => {
  const ids = menu.filter((m) => m.href.startsWith("#")).map((m) => m.href);
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) active.value = `#${entry.target.id}`;
      }
    },
    { rootMargin: "-45% 0px -50% 0px" },
  );
  for (const id of ids) {
    const el = document.querySelector(id);
    if (el) observer.observe(el);
  }
});

onBeforeUnmount(() => observer?.disconnect());
</script>

<template>
  <div
    class="shield-nav px-[14px] md:px-[29px] pt-[11px] md:pt-[18px] lg:pt-[22px]"
  >
    <div
      class="shield-nav__bar mx-auto flex items-center justify-between max-w-[927px] h-[58px] lg:h-[68px] pl-[14px] pr-[11px] lg:pl-[40px] lg:pr-[20px] rounded-[13px] bg-white/95 backdrop-blur-md transition-shadow duration-300"
      :class="
        scrollStore.isScrolled
          ? 'shadow-[0_10px_34px_-12px_rgba(11,44,93,0.28)]'
          : 'shadow-[0_6px_24px_-16px_rgba(11,44,93,0.18)]'
      "
    >
      <router-link
        to="/product/shield"
        class="shrink-0 flex items-center"
        aria-label="Shield"
      >
        <img
          :src="logo"
          alt="Shield"
          class="h-[36px] lg:h-[45px] w-auto object-contain"
        />
      </router-link>

      <nav class="hidden lg:flex items-center">
        <ul class="flex items-center gap-[25px] xl:gap-[36px]">
          <li v-for="item in menu" :key="item.href">
            <NavLink
              :href="item.href"
              class="shield-nav__link text-[14px] xl:text-[15px] transition-colors duration-300"
              :class="
                active === item.href
                  ? 'text-[#009EE5] is-active'
                  : 'text-[#434750] hover:text-[#009EE5]'
              "
            >
              {{ $t(item.labelKey) }}
            </NavLink>
          </li>
        </ul>
      </nav>

      <div class="flex items-center gap-[7px] lg:gap-[11px]">
        <LanguageSwitcher />
        <a
          :href="SHIELD_PLAY_STORE"
          target="_blank"
          rel="noopener noreferrer"
          class="shield-nav__cta hidden lg:inline-flex items-center gap-[7px] h-[34px] xl:h-[36px] px-[14px] xl:px-[18px] rounded-full text-white text-[13px] xl:text-[13px] font-medium"
        >
          <ShieldPlayIcon class="w-[13px] h-[13px]" />
          {{ $t("products.shield.landing.downloadApp") }}
        </a>
        <button
          aria-label="Open Sidebar Page Product"
          type="button"
          id="sidebar-button"
          class="lg:hidden bg-white p-[7px] rounded-lg shadow-md text-[#0071E7]"
          @click="sidebarStore.open"
        >
          <MenuIcon />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.shield-nav__cta {
  background-image: linear-gradient(90deg, #12c7e0 0%, #05a5f4 100%);
  box-shadow: 0 8px 20px -10px rgba(5, 165, 244, 0.7);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.shield-nav__cta:hover {
  transform: translateY(-1px);
  box-shadow: 0 12px 24px -10px rgba(5, 165, 244, 0.85);
}

.shield-nav :deep([aria-haspopup="listbox"]) {
  height: 38px;
  padding-inline: 11px;
}

.shield-nav :deep(.text-\[\#1AB24F\]) {
  color: #009ee5;
}

.shield-nav__link {
  position: relative;
}

.shield-nav__link::after {
  content: "";
  position: absolute;
  left: 50%;
  bottom: -6px;
  width: 4px;
  height: 4px;
  border-radius: 999px;
  background: #009ee5;
  transform: translateX(-50%) scale(0);
  transition: transform 0.3s ease;
}

.shield-nav__link.is-active::after {
  transform: translateX(-50%) scale(1);
}
</style>
