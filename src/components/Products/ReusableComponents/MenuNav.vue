<script setup>
import { ref } from "vue";
import { useScrollStore } from "@/stores/scroll";
import { useRoute } from "vue-router";
import Navlink from "@productComponents/NavLink.vue";

const { isScrolled } = useScrollStore();
const route = useRoute();

const defaultProductMenu = [
  {
    href: "#hero",
    labelKey: "nav.product_items.home",
  },
  {
    href: "#about",
    labelKey: "nav.product_items.about",
  },
  {
    href: "#testimonial",
    labelKey: "nav.product_items.testimonial",
  },
  {
    href: "#faq",
    labelKey: "nav.product_items.faq",
  },
  {
    href: "/contact",
    labelKey: "nav.product_items.contact",
  },
];

const creditProductMenu = [
  {
    href: "#hero",
    labelKey: "nav.product_items.home",
  },
  {
    href: "#about",
    labelKey: "nav.product_items.product",
  },
  {
    href: "#technology",
    labelKey: "nav.product_items.technology",
  },
  {
    href: "#whyus",
    labelKey: "nav.product_items.whyUs",
  },
  {
    href: "/contact",
    labelKey: "nav.product_items.contact",
  },
];

const isSelerisCredit = ref(route.path === "/product/seleris-credit");
</script>

<template>
  <ul
    v-if="isSelerisCredit"
    :class="[
      'flex items-center text-md font-[400]',
      isScrolled
        ? 'lg:gap-[20px] xl:gap-[50px] text-[#717171] font-[500] '
        : 'lg:gap-[25px] 2lg:gap-[45px] xl:gap-[63px] 2xl:gap-[70px] justify-center text-[#374151]',
    ]"
  >
    <li v-for="(creditMenu, index) in creditProductMenu" :key="index">
      <Navlink class="text-[11pt]" :href="creditMenu.href">
        {{ $t(creditMenu.labelKey) }}
      </Navlink>
    </li>
  </ul>
  <ul
    v-if="!isSelerisCredit"
    :class="[
      'flex items-center text-md font-[400]',
      isScrolled
        ? 'lg:gap-[20px] xl:gap-[50px] text-[#717171] font-[500] '
        : isSelerisCredit
          ? 'lg:gap-[25px] 2lg:gap-[45px] xl:gap-[63px] 2xl:gap-[70px] justify-center text-[#374151]'
          : 'lg:gap-[25px] 2lg:gap-[45px] xl:gap-[63px] 2xl:gap-[70px] justify-center text-[#FAFAFA]',
    ]"
  >
    <li v-for="(menuDefault, index) in defaultProductMenu" :key="index">
      <Navlink class="text-[11pt]" :href="menuDefault.href">
        {{ $t(menuDefault.labelKey) }}
      </Navlink>
    </li>
  </ul>
</template>
