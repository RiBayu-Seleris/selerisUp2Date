<script setup>
import playstore from "@/assets/images/playstore.png";
import appstore from "@/assets/images/appstore.png";
</script>

<template>
  <div class="relative w-full min-h-screen p-4">
    <section class="relative w-full h-full rounded-[20px] z-20" id="hero">
      <div
        class="w-full h-[600px] lg:h-[650px] bg-cc bg-no-repeat bg-cover bg-bottom rounded-[20px] z-20"
      >
        <div class="w-full h-auto pt-[100px] lg:pt-[120px] space-y-6">
          <div class="md:w-[500px] h-auto flex flex-col mx-auto justify-center">
            <p
              class="text-[23px] md:text-[40px] font-medium text-[#FAFAFA] text-center leading-relaxed"
            >
              CREDIT COVER
              <span class="font-[600]">Application</span>
            </p>
          </div>
          <div
            class="md:w-[700px] px-10 h-auto flex flex-col mx-auto justify-center"
          >
            <p
              class="text-[17px] lg:text-[20px] text-center text-[#FAFAFA] font-[400]"
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
              ullamcorper mattis lorem non.
            </p>
          </div>
        </div>
      </div>
      <!-- Image Phone -->
      <div class="w-full h-auto flex flex-row -mt-[250px] lg:-mt-[250px]">
        <figure class="w-full h-auto flex items-center">
          <img
            src="@/assets/Products/images/Single-Phone.png"
            alt=""
            class="w-full h-[350px] lg:h-[400px] object-contain content-end object-right drop-shadow-[-20px_10px_10px_rgba(0,0,0,0.25)]"
          />
        </figure>
        <figure
          class="w-full max-w-[250px] lg:max-w-[300px] h-auto mx-auto flex"
        >
          <img
            src="@/assets/Products/images/Single-Phone.png"
            alt=""
            class="w-full h-[400px] lg:h-[500px] object-contain drop-shadow-[-20px_10px_10px_rgba(0,0,0,0.25)]"
          />
        </figure>
        <figure class="w-full h-auto flex items-center">
          <img
            src="@/assets/Products/images/Single-Phone.png"
            alt=""
            class="w-full h-[350px] lg:h-[400px] object-contain content-end object-left drop-shadow-[-20px_10px_10px_rgba(0,0,0,0.25)]"
          />
        </figure>
      </div>
      <!-- Appstore -->
      <div class="w-full h-auto mt-20">
        <div
          class="w-full h-auto flex flex-row justify-center max-w-sm mx-auto gap-x-10"
        >
          <div class="w-full h-full flex justify-center">
            <a
              href="https://play.google.com/store/apps/developer?id=PT.+Seleris+Meditekno+Internasional"
              target="_blank"
              rel="noopener noreferrer"
              class="flex w-full h-auto justify-start"
            >
              <figure class="w-full h-auto shadow-2xl">
                <img
                  :src="playstore"
                  alt="Playstore"
                  class="w-full h-full object-contain object-center"
                />
              </figure>
            </a>
          </div>
          <div class="relative group w-full h-full">
            <img
              :src="appstore"
              alt="Appstore"
              class="w-full h-full object-contain object-center shadow-2xl"
            />

            <!-- Hover Overlay -->
            <div
              class="absolute flex w-full h-full items-center justify-center inset-0 group-hover:opacity-100 transition duration-300 bg-opacity-60 opacity-0"
            >
              <div
                class="w-full h-full bg-[#FDFDFD] bg-opacity-60 flex items-center justify-center text-white cursor-pointer"
              >
                <span>Coming Soon!</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section
      class="relative w-full h-auto -mt-[400px] max-w-[1440px] mx-auto"
      id="about"
    >
      <!-- Circle First -->
      <figure
        class="absolute w-auto h-[650px] -top-[200px] left-1/2 transform -translate-x-1/2 justify-center p-4"
      >
        <img
          src="@/assets/Products/images/circle.png"
          alt="Circle"
          class="object-contain w-full h-full"
        />
      </figure>
      <!-- Circle Second -->
      <figure class="absolute w-auto h-[400px] top-[400px] left-0 p-4">
        <img
          src="@/assets/Products/images/circle.png"
          alt="Circle"
          class="object-contain w-full h-full"
        />
      </figure>
    </section>
  </div>
</template>
