<script setup>
import TouchMobile from "@/components/TouchMobile.vue";
import ChatIcon from "@/components/icons/ChatIcon.vue";
import CallIcon from "@/components/icons/CallIcon.vue";
</script>

<template>
  <div class="lg:mt-0">
    <div
      class="hidden lg:block w-full lg:h-[630px] xl:h-auto bg-touch dark:bg-touchDark bg-cover bg-no-repeat lg:px-6 xl:px-8 xl:pt-24 lg:pt-20 pb-10 rounded-b-3xl rounded-tr-[3rem]"
    >
      <div class="flex flex-row w-full h-auto gap-5">
        <div class="w-[45%] lg:h-[530px] xl:h-[580px]">
          <div
            class="w-full h-full bg-[#FAFAFA] dark:bg-[#323232] rounded-3xl py-4 lg:px-6 xl:px-8"
          >
            <div class="flex flex-col w-full h-full">
              <div class="w-full h-auto py-5">
                <p
                  class="text-4xl xl:text-[38px] pb-3 font-[500] text-[#195279] dark:text-[#FAFAFA]"
                >
                  Get
                  <span class="text-[#2AB857] dark:text-[#FAFAFA]"
                    >in Touch</span
                  >
                </p>
                <p
                  class="base:text-base xl:text-[16px] text-[#195279] font-[500] dark:text-[#FAFAFA]"
                >
                  Be among the first to discover what it's all about
                </p>
              </div>
              <div class="flex flex-col w-full lg:mb-3 xl:mb-4">
                <div class="w-full mb-2">
                  <p class="text-[14px] font-[500] dark:text-[#6F6F6F]">
                    Full Name:
                  </p>
                </div>
                <div class="w-full">
                  <input
                    type="text"
                    class="w-full p-2 rounded-[8px] border-gray-300 placeholder-[6F6F6F] dark:bg-[#323232] border-[0.1px] dark:border-[#FAFAFA]/25 focus:outline-none focus:ring-1 focus:ring-[#2AB857] dark:focus:border-none"
                    placeholder="Full Name"
                  />
                </div>
              </div>
              <div class="flex flex-col w-full lg:mb-3 xl:mb-4">
                <div class="w-full mb-2">
                  <p class="text-[14px] font-[500] dark:text-[#6F6F6F]">
                    Email:
                  </p>
                </div>
                <div class="w-full">
                  <input
                    type="email"
                    class="w-full p-2 rounded-[8px] border-gray-300 placeholder-[6F6F6F] dark:bg-[#323232] border-[0.1px] dark:border-[#FAFAFA]/25 focus:outline-none focus:ring-1 focus:ring-[#2AB857] dark:focus:border-none"
                    placeholder="Email"
                  />
                </div>
              </div>
              <div class="flex flex-col w-full lg:mb-3 xl:mb-4">
                <div class="w-full mb-2">
                  <p class="text-[14px] font-[500] dark:text-[#6F6F6F]">
                    Message:
                  </p>
                </div>
                <div class="w-full">
                  <textarea
                    class="w-full lg:h-[70px] xl:h-[130px] p-2 rounded-[8px] border-gray-300 placeholder-[6F6F6F] dark:bg-[#323232] border-[0.1px] dark:border-[#FAFAFA]/25 focus:outline-none focus:ring-1 focus:ring-[#2AB857] resize-none align-top"
                    placeholder="Message"
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
        <div
          class="flex flex-col w-[55%] h-auto justify-between gap-5 rounded-3xl"
        >
          <div
            class="flex w-full lg:h-[60%] xl:h-[65%] bg-[#FAFAFA] dark:bg-[#323232] rounded-3xl p-4"
          >
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
          <div class="flex flex-row w-full lg:h-[40%] xl:h-[35%] gap-5">
            <div
              class="flex w-full h-full bg-[#FAFAFA] dark:bg-[#323232] rounded-xl"
            >
              <div class="flex flex-col w-full py-3 gap-1">
                <div class="flex w-full justify-center items-center mb-2">
                  <div
                    class="flex w-12 h-12 rounded-full bg-[#FFFFFF] dark:bg-[#6F6F6F] text-[#2AB857] dark:text-[#FAFAFA] justify-center items-center shadow-lg"
                  >
                    <ChatIcon />
                  </div>
                </div>
                <div class="flex w-full justify-center items-center">
                  <p
                    class="lg:text-xl xl:text-[24px] text-[#195279] font-[500] dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-br dark:from-[#FAFAFA] dark:via-[#D4D4D4] dark:to-[#AAAAAA]"
                  >
                    Chat to Support
                  </p>
                </div>
                <div class="flex w-full justify-center items-center lg:px-5">
                  <p
                    class="lg:text-sm xl:text-[14px] font-[400] text-[#ACACAC] text-center"
                  >
                    Our team here ready to help you
                  </p>
                </div>
                <div class="flex w-full justify-center items-center">
                  <p class="text-[#2AB857] xl:text-[14px]">
                    support@seleris.ai
                  </p>
                </div>
                <div class="flex w-full justify-center items-center">
                  <p class="text-[#2AB857] xl:text-[14px]">info@seleris.id</p>
                </div>
              </div>
            </div>
            <div
              class="flex w-full h-full bg-[#FAFAFA] dark:bg-[#323232] rounded-xl"
            >
              <div class="flex flex-col w-full py-3 gap-1">
                <div class="flex w-full justify-center items-center mb-2">
                  <div
                    class="flex w-12 h-12 rounded-full bg-[#FFFFFF] dark:bg-[#6F6F6F] text-[#2AB857] dark:text-[#FAFAFA] justify-center items-center shadow-lg"
                  >
                    <CallIcon />
                  </div>
                </div>
                <div class="flex w-full justify-center items-center">
                  <p
                    class="text-2xl xl:text-[24px] text-[#195279] font-[500] dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-br dark:from-[#FAFAFA] dark:via-[#D4D4D4] dark:to-[#AAAAAA]"
                  >
                    Call Us
                  </p>
                </div>
                <div class="flex w-full justify-center items-center">
                  <p class="text-md xl:text-[14px] font-[400] text-[#ACACAC]">
                    Mon-Sat 9am to 5pm
                  </p>
                </div>
                <div class="flex w-full justify-center items-center">
                  <p class="text-[#2AB857] xl:text-[14px] font-[400]">
                    +62 (21) 526 52 35
                  </p>
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
