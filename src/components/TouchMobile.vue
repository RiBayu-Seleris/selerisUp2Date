<script setup>
import ChatIcon from "@/components/icons/ChatIcon.vue";
import CallIcon from "@/components/icons/CallIcon.vue";
</script>

<template>
  <div
    class="lg:hidden flex flex-col w-full h-auto bg-[#F3F4F6] dark:bg-[#1E1F1C] py-5 px-3 rounded-3xl gap-y-8"
  >
    <div class="flex w-full h-auto rounded-3xl">
      <iframe
        class="w-full h-[300px] rounded-3xl border-2"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.8339793616797!2d106.83314007441082!3d-6.285542461522718!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3001660852f%3A0x1ac61febb98f4350!2sSeleris%20Development%20Office!5e0!3m2!1sid!2sid!4v1751444288952!5m2!1sid!2sid"
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      />
    </div>
    <div class="flex w-full h-auto">
      <div
        class="flex md:flex-row sml:flex-col w-full h-auto justify-between gap-8"
      >
        <div
          class="flex flex-col w-full h-auto py-5 bg-[#FAFAFA] dark:bg-[#323232] rounded-2xl"
        >
          <div class="flex w-full justify-center items-center mb-2">
            <div
              class="flex w-12 h-12 rounded-full bg-[#FFFFFF] dark:bg-[#6F6F6F] text-[#2AB857] dark:text-[#FAFAFA] justify-center items-center shadow-lg"
            >
              <ChatIcon />
            </div>
          </div>
          <div class="flex w-full justify-center items-center">
            <p
              class="text-[16px] text-[#195279] dark:text-[#FAFAFA] font-[600] dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-br dark:from-[#FAFAFA] dark:via-[#D4D4D4] dark:to-[#AAAAAA]"
            >
              Chat to Support
            </p>
          </div>
          <div class="flex w-full justify-center items-center">
            <p class="text-[14px] text-[#ACACAC]">
              Our team here ready to help you
            </p>
          </div>
          <div class="flex w-full justify-center items-center">
            <a href="mailto:info@seleris.id" class="text-[#2AB857] text-[14px]"
              >info@seleris.id</a
            >
          </div>
        </div>
        <div
          class="flex flex-col w-full h-auto py-5 bg-[#FAFAFA] dark:bg-[#323232] rounded-2xl"
        >
          <div class="flex w-full justify-center items-center mb-2">
            <div
              class="flex w-12 h-12 rounded-full bg-[#FFFFFF] dark:bg-[#6F6F6F] text-[#2AB857] dark:text-[#FAFAFA] justify-center items-center shadow-lg"
            >
              <CallIcon />
            </div>
          </div>
          <div class="flex w-full justify-center items-center">
            <p
              class="ttext-[16px] text-[#195279] font-[600] dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-br dark:from-[#FAFAFA] dark:via-[#D4D4D4] dark:to-[#AAAAAA]"
            >
              Call Us
            </p>
          </div>
          <div class="flex w-full justify-center items-center">
            <p class="text-[14px] text-[#ACACAC]">Mon-Sat 9am to 5pm</p>
          </div>
          <div class="flex w-full justify-center items-center">
            <p class="text-[#2AB857] text-[14px]">+62 (21) 526 52 35</p>
          </div>
        </div>
      </div>
    </div>
    <div class="flex w-full h-auto">
      <div
        class="flex flex-col w-full h-auto bg-[#FAFAFA] dark:bg-[#323232] rounded-2xl px-5 py-6"
      >
        <div class="flex flex-col w-full">
          <p
            class="text-[20px] font-semibold text-[#195279] dark:text-[#FAFAFA]"
          >
            GET <span class="text-[#2AB857] dark:text-[#FAFAFA]">In Touch</span>
          </p>
          <p class="text-[#195279] text-[14px] dark:text-[#FAFAFA]">
            Be among the first to discover what it's all about
          </p>
        </div>
        <div class="w-full h-[1px] bg-[#F3F4F6] my-3 rounded-full" />
        <div class="flex flex-col w-full mb-4">
          <div class="w-full mb-2">
            <p>Full Name:</p>
          </div>
          <div class="w-full">
            <input
              name="fullname"
              type="text"
              class="w-full p-2 rounded-md border border-gray-300 dark:bg-[#565656] focus:outline-none focus:ring-2 focus:ring-[#2AB857] dark:focus:ring-white"
            />
          </div>
        </div>
        <div class="flex flex-col w-full mb-4">
          <div class="w-full mb-2">
            <p>Email:</p>
          </div>
          <div class="w-full">
            <input
              name="email"
              type="email"
              class="w-full p-2 rounded-md border border-gray-300 dark:bg-[#565656] focus:outline-none focus:ring-2 focus:ring-[#2AB857] dark:focus:ring-white"
            />
          </div>
        </div>
        <div class="flex flex-col w-full mb-4">
          <div class="w-full mb-2">
            <p>Message:</p>
          </div>
          <div class="w-full">
            <textarea
              rows="5"
              class="w-full p-2 rounded-md border border-gray-300 dark:bg-[#565656] focus:outline-none focus:ring-2 focus:ring-[#2AB857] dark:focus:ring-white resize-none align-top"
            />
          </div>
        </div>
        <div class="flex w-full h-auto rounded-lg mt-2">
          <button class="w-full h-12 bg-[#2AB857] text-white rounded-lg">
            Submit
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
