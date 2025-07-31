<!-- views/product/ProductLayout.vue -->
<template>
  <div
    class="relative w-full h-auto font-poppins overflow-x-hidden mx-auto bg-[#f9fafb] dark:bg-[#17181A] dark:text-white"
  >
    <main class="relative w-full max-w-[1440px] mx-auto">
      <header class="fixed top-10 w-full h-auto p-4 px-8">
        <nav class="w-full h-auto bg-black text-white">Product Header</nav>
      </header>
      <router-view />
    </main>
    <footer class="mt-8 text-center text-gray-500">Product Footer</footer>
  </div>
</template>
