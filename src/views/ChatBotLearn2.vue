<script setup></script>

<template>
  <!-- ChatbotStatic.vue -->
  <div
    class="flex flex-col w-full max-w-md h-[500px] border rounded-xl shadow-lg bg-white mx-auto mt-10"
  >
    <!-- Daftar pesan -->
    <div class="flex-1 overflow-y-auto p-4 space-y-3">
      <!-- Pesan dari bot -->
      <div class="text-left">
        <div
          class="inline-block px-3 py-2 bg-gray-200 text-black rounded-lg rounded-bl-none"
        >
          Halo! Ada yang bisa saya bantu?
        </div>
      </div>

      <!-- Pesan dari user -->
      <div class="text-right">
        <div
          class="inline-block px-3 py-2 bg-blue-500 text-white rounded-lg rounded-br-none"
        >
          Ya, saya ingin tanya sesuatu.
        </div>
      </div>

      <!-- Balasan dari bot -->
      <div class="text-left">
        <div
          class="inline-block px-3 py-2 bg-gray-200 text-black rounded-lg rounded-bl-none"
        >
          Silakan! Apa yang ingin kamu tanyakan?
        </div>
      </div>
    </div>

    <!-- Input pesan -->
    <div class="flex border-t">
      <input
        type="text"
        placeholder="Ketik pesan..."
        class="flex-1 p-3 outline-none"
      />
      <button class="px-4 text-white bg-blue-500 hover:bg-blue-600">
        Kirim
      </button>
    </div>
  </div>
</template>
