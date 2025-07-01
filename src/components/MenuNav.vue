<script setup>
import { useScrollStore } from "@/stores/scroll";

const { isScrolled } = useScrollStore();
</script>

<template>
  <ul
    :class="[
      'flex  items-center text-md font-medium',
      isScrolled ? 'lg:gap-[10px]' : 'lg:gap-[60px]',
    ]"
  >
    <li>
      <a
        href="#"
        class="relative inline-block text-[#18AB53] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:bg-[#18AB53] after:w-0 after:transition-all after:duration-300 hover:after:w-full"
      >
        Home
      </a>
    </li>
    <li>
      <a
        href="#"
        class="relative inline-block after:absolute after:left-0 after:bottom-0 after:h-[2px] after:bg-[#18AB53] after:w-0 after:transition-all after:duration-300 hover:after:w-full"
      >
        About
      </a>
    </li>
    <li class="relative group">
      <a
        href="#"
        class="relative inline-block after:absolute after:left-0 after:bottom-0 after:h-[2px] after:bg-[#18AB53] after:w-0 after:transition-all after:duration-300 hover:after:w-full"
      >
        Product ▾
      </a>
      <ul
        class="absolute left-0 mt-2 hidden group-hover:block bg-white border rounded shadow"
      >
        <li>
          <a href="#" class="block px-4 py-2 hover:bg-gray-100">Sub Item</a>
        </li>
      </ul>
    </li>
    <li>
      <a
        href="#"
        class="relative inline-block after:absolute after:left-0 after:bottom-0 after:h-[2px] after:bg-[#18AB53] after:w-0 after:transition-all after:duration-300 hover:after:w-full"
      >
        Our Team
      </a>
    </li>
    <li>
      <a
        href="#"
        class="relative inline-block after:absolute after:left-0 after:bottom-0 after:h-[2px] after:bg-[#18AB53] after:w-0 after:transition-all after:duration-300 hover:after:w-full"
      >
        Blog
      </a>
    </li>
    <li>
      <a
        href="#"
        class="relative inline-block after:absolute after:left-0 after:bottom-0 after:h-[2px] after:bg-[#18AB53] after:w-0 after:transition-all after:duration-300 hover:after:w-full"
      >
        Services
      </a>
    </li>
    <li>
      <a
        href="#"
        class="relative inline-block after:absolute after:left-0 after:bottom-0 after:h-[2px] after:bg-[#18AB53] after:w-0 after:transition-all after:duration-300 hover:after:w-full"
      >
        Contact
      </a>
    </li>
  </ul>
</template>
