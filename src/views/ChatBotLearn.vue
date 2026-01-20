<script setup>
import { ref, nextTick, watch } from "vue";

// 🟢 Data awal
const messages = ref([{ sender: "bot", text: "Halo! Aku chatbot Vue 😊" }]);
const userInput = ref("");

// 🟢 Referensi ke elemen chat-box
const chatBox = ref(null);

// 🟢 Fungsi scroll ke bawah
function scrollToBottom() {
  nextTick(() => {
    if (chatBox.value) {
      chatBox.value.scrollTop = chatBox.value.scrollHeight;
    }
  });
}

// 🟢 Fungsi kirim pesan
// function sendMessage() {
//   if (userInput.value.trim() === "") return;

//   // Tambahkan pesan user
//   messages.value.push({
//     sender: "user",
//     text: userInput.value,
//   });

//   const input = userInput.value.toLowerCase();

//   userInput.value = "";

//   // Balasan otomatis
//   let reply = "Maaf, aku belum mengerti 😅";
//   if (input.includes("halo")) reply = "Halo juga!";
//   else if (input.includes("apa kabar")) reply = "Aku baik, kamu?";
//   else if (input.includes("siapa")) reply = "Aku chatbot buatan Vue 💬";

//   // Kirim balasan setelah delay
//   setTimeout(() => {
//     messages.value.push({
//       sender: "bot",
//       text: reply,
//     });
//   }, 500);
// }

const GEMINI_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const MODEL = "gemini-2.5-flash";

async function sendMessage() {
  if (userInput.value.trim() === "") return;

  // Tambahkan pesan user
  messages.value.push({
    sender: "user",
    text: userInput.value,
  });

  const input = userInput.value;
  userInput.value = "";

  try {
    // Panggil Gemini API
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${GEMINI_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: input }],
            },
          ],
        }),
      },
    );

    const data = await response.json();

    // Ambil hasil teks dari respons
    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Maaf, aku belum mengerti 😅";

    messages.value.push({
      sender: "bot",
      text: reply,
    });
  } catch (error) {
    console.error(error);
    messages.value.push({
      sender: "bot",
      text: "Terjadi kesalahan saat menghubungi server 😞",
    });
  }
}

// 🟢 Pantau perubahan pada messages
watch(messages, scrollToBottom, { deep: true });
</script>

<template>
  <div class="chat-container">
    <!-- Bagian pesan -->
    <div class="chat-box" ref="chatBox">
      <div
        v-for="(msg, index) in messages"
        :key="index"
        :class="['message', msg.sender]"
      >
        {{ msg.text }}
      </div>
    </div>

    <!-- Bagian input -->
    <div class="chat-input">
      <input
        v-model="userInput"
        @keyup.enter="sendMessage"
        placeholder="Ketik pesan..."
      />
      <button aria-label="Chatbot Send" @click="sendMessage">Kirim</button>
    </div>
  </div>
</template>
<style scoped>
.chat-container {
  max-width: 400px;
  margin: 150px auto;
  border: 1px solid #ddd;
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.chat-box {
  padding: 10px;
  height: 300px;
  overflow-y: auto;
  background: #f9f9f9;
  display: flex;
  flex-direction: column;
  scroll-behavior: smooth; /* 🟢 inilah efek scroll lembut */
}

/* ======== Pesan Umum ======== */
.message {
  margin: 8px 0;
  padding: 8px 12px;
  border-radius: 12px;
  max-width: 80%;
  word-wrap: break-word;
  display: inline-block;
}

/* ======== Pesan User (kanan) ======== */
.message.user {
  background: #daf8cb;
  align-self: flex-end; /* posisi kanan */
  text-align: right;
  border-bottom-right-radius: 0;
}

/* ======== Pesan Bot (kiri) ======== */
.message.bot {
  background: #e0e0e0;
  align-self: flex-start; /* posisi kiri */
  text-align: left;
  border-bottom-left-radius: 0;
}

/* ======== Input chat ======== */
.chat-input {
  display: flex;
  padding: 10px;
  background: white;
  border-top: 1px solid #ddd;
}

.chat-input input {
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.chat-input button {
  margin-left: 8px;
  padding: 8px 12px;
  border: none;
  background: #3b82f6;
  color: white;
  border-radius: 8px;
  cursor: pointer;
}
</style>
