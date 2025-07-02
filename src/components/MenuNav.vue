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
          'relative inline-block text-animate-hover hover:font-bold',
          route.path === '/' ? 'text-[#18AB53] font-bold' : '',
        ]"
      >
        Home
      </router-link>
    </li>
    <li>
      <router-link
        to="/about"
        :class="[
          'relative inline-block text-animate-hover hover:font-bold ',
          route.path === '/about' ? 'text-[#18AB53] font-bold' : '',
        ]"
      >
        About
      </router-link>
    </li>

    <!-- Dropdown wrapper -->
    <li class="relative group list-none">
      <!-- Trigger -->
      <span class="relative inline-block text-animate-hover hover:font-bold">
        Product ▾
      </span>

      <!-- Dropdown content as a div -->
      <div
        :class="[
          `absolute left-0 hidden group-hover:block bg-white border rounded shadow z-50 w-64 p-4`,
          isScrolled ? 'mt-3' : 'mt-4',
        ]"
      >
        <router-link
          to="/product"
          class="block px-2 py-2 text-sm rounded hover:bg-gray-100"
        >
          Seleris Lifins
        </router-link>
        <router-link
          to="/product/medins"
          class="block px-2 py-2 text-sm rounded hover:bg-gray-100"
        >
          Seleris Medins
        </router-link>
        <router-link
          to="/product/credit"
          class="block px-2 py-2 text-sm rounded hover:bg-gray-100"
        >
          Credit Cover
        </router-link>
      </div>
    </li>

    <!-- Tambahan menu lainnya -->
    <li>
      <router-link
        to="/team"
        :class="[
          'relative inline-block text-animate-hover hover:font-bold ',
          route.path === '/team' ? 'text-[#18AB53] font-bold' : '',
        ]"
      >
        Our Team
      </router-link>
    </li>
    <li>
      <router-link
        to="/blog"
        :class="[
          'relative inline-block text-animate-hover hover:font-bold ',
          route.path === '/blog' ? 'text-[#18AB53] font-bold' : '',
        ]"
      >
        Blog
      </router-link>
    </li>
    <li>
      <router-link
        to="/services"
        :class="[
          'relative inline-block text-animate-hover hover:font-bold ',
          route.path === '/services' ? 'text-[#18AB53] font-bold' : '',
        ]"
      >
        Services
      </router-link>
    </li>
    <li>
      <router-link
        to="/contact"
        :class="[
          'relative inline-block text-animate-hover hover:font-bold ',
          route.path === '/contact' ? 'text-[#18AB53] font-bold' : '',
        ]"
      >
        Contact
      </router-link>
    </li>
  </ul>
</template>
<style scoped>
.text-animate-hover {
  position: relative;
  display: inline-block;
  background-image: linear-gradient(to right, #18ab53 0%, #18ab53 100%);
  background-size: 0% 100%;
  background-repeat: no-repeat;
  background-position: left;
  -webkit-background-clip: text;
  background-clip: text;
  transition: background-size 0.5s ease, -webkit-text-fill-color 0.5s ease;
}

.text-animate-hover:hover {
  background-size: 100% 100%;
  -webkit-text-fill-color: transparent;
}
</style>
