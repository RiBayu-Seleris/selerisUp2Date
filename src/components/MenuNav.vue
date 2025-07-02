<script setup>
import { useScrollStore } from "@/stores/scroll";
import { useRoute } from "vue-router";

const { isScrolled } = useScrollStore();
const route = useRoute();
</script>

<template>
  <ul
    :class="[
      'flex items-center text-md font-medium',
      isScrolled ? 'lg:gap-[60px]' : 'lg:gap-[60px]',
    ]"
  >
    <li>
      <router-link
        to="/"
        :class="[
          'relative inline-block after:absolute after:left-0 after:bottom-0 after:h-[2px] after:bg-[#18AB53] after:transition-all after:duration-300 hover:after:w-full',
          route.path === '/' ? 'text-[#18AB53] after:w-full' : 'after:w-0',
        ]"
      >
        Home
      </router-link>
    </li>
    <li>
      <router-link
        to="/about"
        :class="[
          'relative inline-block after:absolute after:left-0 after:bottom-0 after:h-[2px] after:bg-[#18AB53] after:transition-all after:duration-300 hover:after:w-full',
          route.path === '/about' ? 'text-[#18AB53] after:w-full' : 'after:w-0',
        ]"
      >
        About
      </router-link>
    </li>

    <!-- Dropdown (tanpa active path karena tidak ada to= link) -->
    <li class="relative group">
      <span
        class="relative inline-block cursor-pointer after:absolute after:left-0 after:bottom-0 after:h-[2px] after:bg-[#18AB53] after:w-0 after:transition-all after:duration-300 group-hover:after:w-full"
      >
        Product ▾
      </span>
      <ul
        class="absolute left-0 mt-2 hidden group-hover:block bg-white border rounded shadow"
      >
        <li>
          <router-link to="/product" class="block px-4 py-2 hover:bg-gray-100"
            >Sub Item</router-link
          >
        </li>
      </ul>
    </li>

    <!-- Tambahan menu lainnya -->
    <li>
      <router-link
        to="/team"
        :class="[
          'relative inline-block after:absolute after:left-0 after:bottom-0 after:h-[2px] after:bg-[#18AB53] after:transition-all after:duration-300 hover:after:w-full',
          route.path === '/team' ? 'text-[#18AB53] after:w-full' : 'after:w-0',
        ]"
      >
        Our Team
      </router-link>
    </li>
    <li>
      <router-link
        to="/blog"
        :class="[
          'relative inline-block after:absolute after:left-0 after:bottom-0 after:h-[2px] after:bg-[#18AB53] after:transition-all after:duration-300 hover:after:w-full',
          route.path === '/blog' ? 'text-[#18AB53] after:w-full' : 'after:w-0',
        ]"
      >
        Blog
      </router-link>
    </li>
    <li>
      <router-link
        to="/services"
        :class="[
          'relative inline-block after:absolute after:left-0 after:bottom-0 after:h-[2px] after:bg-[#18AB53] after:transition-all after:duration-300 hover:after:w-full',
          route.path === '/services'
            ? 'text-[#18AB53] after:w-full'
            : 'after:w-0',
        ]"
      >
        Services
      </router-link>
    </li>
    <li>
      <router-link
        to="/contact"
        :class="[
          'relative inline-block after:absolute after:left-0 after:bottom-0 after:h-[2px] after:bg-[#18AB53] after:transition-all after:duration-300 hover:after:w-full',
          route.path === '/contact'
            ? 'text-[#18AB53] after:w-full'
            : 'after:w-0',
        ]"
      >
        Contact
      </router-link>
    </li>
  </ul>
</template>
