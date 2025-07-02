<script setup>
import TouchMobile from "@/components/TouchMobile.vue";
</script>

<template>
  <div class="px-10 lg:mt-0">
    <div
      class="hidden lg:block w-full h-auto bg-touch px-8 pt-24 pb-10 rounded-b-3xl rounded-tr-[3rem]"
    >
      <div class="flex flex-row w-full h-auto gap-5">
        <div class="w-[45%] h-[580px]">
          <div class="w-full h-full bg-[#FAFAFA] rounded-xl py-4 px-8">
            <div class="flex flex-col w-full h-full">
              <div class="w-full h-auto py-5">
                <p class="text-4xl pb-3 font-semibold text-[#195279]">
                  Get <span class="text-[#2AB857]">in Touch</span>
                </p>
                <p class="text-lg text-[#195279] font-semibold">
                  Be among the first to discover what it's all about
                </p>
              </div>
              <div class="flex flex-col w-full mb-4">
                <div class="w-full mb-2">
                  <p>Full Name:</p>
                </div>
                <div class="w-full">
                  <input
                    type="text"
                    class="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2AB857]"
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
                    class="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2AB857]"
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
                    class="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2AB857] resize-none align-top"
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
        <div
          class="flex flex-col w-[55%] h-auto justify-between gap-5 rounded-3xl"
        >
          <div class="flex w-full h-[65%] bg-[#FAFAFA] rounded-3xl p-4">
            <div class="flex w-full h-full rounded-xl">
              <iframe
                class="w-full h-full rounded-2xl"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.8339793616797!2d106.83314007441082!3d-6.285542461522718!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3001660852f%3A0x1ac61febb98f4350!2sSeleris%20Development%20Office!5e0!3m2!1sid!2sid!4v1751444288952!5m2!1sid!2sid"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
          <div class="flex flex-row w-full h-[35%] gap-5">
            <div class="flex w-full h-full bg-[#FAFAFA] rounded-xl">
              <div class="flex flex-col w-full py-3 gap-1">
                <div class="flex w-full justify-center items-center mb-2">
                  <div class="w-12 h-12 rounded-full bg-[#D9D9D9]" />
                </div>
                <div class="flex w-full justify-center items-center">
                  <p class="text-2xl text-[#195279] font-bold">
                    Chat to Support
                  </p>
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
            <div class="flex w-full h-full bg-[#FAFAFA] rounded-xl">
              <div class="flex flex-col w-full py-3 gap-1">
                <div class="flex w-full justify-center items-center mb-2">
                  <div class="w-12 h-12 rounded-full bg-[#D9D9D9]" />
                </div>
                <div class="flex w-full justify-center items-center">
                  <p class="text-2xl text-[#195279] font-bold">Call Us</p>
                </div>
                <div class="flex w-full justify-center items-center">
                  <p class="text-md text-[#ACACAC]">Mon-Sat 9am to 5pm</p>
                </div>
                <div class="flex w-full justify-center items-center">
                  <p class="text-[#2AB857]">+62 (21) 526 52 35</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <TouchMobile />
  </div>
</template>
<style scoped>
.bg-touch {
  background-image: url("@/assets/images/touch-bg.png");
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
