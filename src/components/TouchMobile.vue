<template>
  <div
    class="lg:hidden flex flex-col w-full h-auto bg-[#F3F4F6] py-5 px-3 rounded-3xl gap-y-8"
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
        class="flex flex-row sml:flex-col w-full h-auto justify-between gap-8"
      >
        <div class="flex flex-col w-full h-auto py-5 bg-[#FAFAFA] rounded-2xl">
          <div class="flex w-full justify-center items-center mb-2">
            <div class="w-12 h-12 rounded-full bg-[#D9D9D9]" />
          </div>
          <div class="flex w-full justify-center items-center">
            <p class="text-2xl text-[#195279] font-bold">Chat to Support</p>
          </div>
          <div class="flex w-full justify-center items-center">
            <p class="text-md text-[#ACACAC]">
              Our team here ready to help you
            </p>
          </div>
          <div class="flex w-full justify-center items-center">
            <p class="text-[#2AB857]">support@seleris.ai</p>
          </div>
          <div class="flex w-full justify-center items-center">
            <p class="text-[#2AB857]">help@seleris.ai</p>
          </div>
        </div>
        <div class="flex flex-col w-full h-auto py-5 bg-[#FAFAFA] rounded-2xl">
          <div class="flex w-full justify-center items-center mb-2">
            <div class="w-12 h-12 rounded-full bg-[#D9D9D9]" />
          </div>
          <div class="flex w-full justify-center items-center">
            <p class="text-2xl text-[#195279] font-bold">Chat to Support</p>
          </div>
          <div class="flex w-full justify-center items-center">
            <p class="text-md text-[#ACACAC]">
              Our team here ready to help you
            </p>
          </div>
          <div class="flex w-full justify-center items-center">
            <p class="text-[#2AB857]">support@seleris.ai</p>
          </div>
          <div class="flex w-full justify-center items-center">
            <p class="text-[#2AB857]">help@seleris.ai</p>
          </div>
        </div>
      </div>
    </div>
    <div class="flex w-full h-auto">
      <div
        class="flex flex-col w-full h-auto bg-[#FAFAFA] rounded-2xl px-5 py-6"
      >
        <div class="flex flex-col w-full">
          <p class="text-3xl lg:text-4xl font-semibold text-[#195279]">
            GET <span class="text-[#2AB857]">In Touch</span>
          </p>
          <p class="text-[#195279] text-base lg:text-xl">
            Be among the first to discover what it's all about
          </p>
        </div>
        <div class="w-full h-1 bg-[#F3F4F6] my-3 rounded-full" />
        <div class="flex flex-col w-full mb-4">
          <div class="w-full mb-2">
            <p>Full Name:</p>
          </div>
          <div class="w-full">
            <input
              type="text"
              class="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2AB857]"
            />
          </div>
        </div>
        <div class="flex flex-col w-full mb-4">
          <div class="w-full mb-2">
            <p>Email:</p>
          </div>
          <div class="w-full">
            <input
              type="email"
              class="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2AB857]"
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
              class="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2AB857] resize-none align-top"
            />
          </div>
        </div>
        <div class="flex w-full h-auto rounded-lg mt-2">
          <button class="w-full h-12 bg-[#2AB857] text-white rounded-lg">
            Masuk
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
