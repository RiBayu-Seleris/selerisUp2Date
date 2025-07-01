<template>
  <div class="px-10 mt-10">
    <div
      class="w-full h-[110vh] bg-touch px-8 pt-24 rounded-b-3xl rounded-tr-[3rem]"
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
                  <input type="text" class="w-full h-10 border rounded-md" />
                </div>
              </div>
              <div class="flex flex-col w-full mb-4">
                <div class="w-full mb-2">
                  <p>Email:</p>
                </div>
                <div class="w-full">
                  <input type="text" class="w-full h-10 border rounded-md" />
                </div>
              </div>
              <div class="flex flex-col w-full mb-4">
                <div class="w-full mb-2">
                  <p>Message:</p>
                </div>
                <div class="w-full">
                  <input type="text" class="w-full h-32 border rounded-md" />
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
          <div class="flex w-full h-[70%] bg-[#FAFAFA] rounded-3xl p-4">
            <div class="flex w-full h-full rounded-xl">
              <img
                src="@/assets/images/maps.png"
                alt="Maps"
                class="w-full h-full object-cover object-center rounded-2xl"
              />
            </div>
          </div>
          <div class="flex flex-row w-full h-full gap-5">
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
  </div>
</template>
<style scoped>
.bg-touch {
  background-image: url("@/assets/images/touch-bg.png");
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
