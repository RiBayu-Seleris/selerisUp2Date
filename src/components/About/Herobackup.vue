<script setup>
import AboutHero from "@/assets/images/About-hero-image2.png";
import FrameCaptionAboutHero from "@/assets/images/About-frame-hero2.svg";
// import FrameCaptionAboutHero from "@/assets/images/About-frame-hero.png";
</script>

<template>
  <div class="flex relative w-full h-auto">
    <div
      class="flex relative flex-col md:flex-row w-full h-auto justify-between gap-x-10 lg:gap-x-10 mt-[120px] md:mt-[150px] lg:mt-[160px] xl:pr-24"
    >
      <div class="flex w-full md:w-full lg:w-[40%] xl:w-[45%] h-auto">
        <div
          class="flex flex-col w-full h-auto justify-center gap-y-3 sm:gap-y-1 lg:gap-y-5 text-center md:text-left"
        >
          <div class="w-full h-auto">
            <p
              class="text-2xl lg:text-[30px] xl:text-[30px] text-[#1AB24F] font-[500]"
            >
              About Us
            </p>
          </div>
          <div class="w-full h-auto">
            <p
              class="text-[24px] md:text-[30px] lg:text-[32px] xl:text-[60px] font-[500] text-[#195279] lg:leading-[54px] xl:leading-tight dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-br dark:from-[#FAFAFA] dark:via-[#D4D4D4] dark:to-[#AAAAAA]"
            >
              Seleris Meditekno Internasional
            </p>
          </div>
          <div class="w-full h-auto">
            <p
              class="md:text-[14px] lg:text-[17px] xl:text-[23px] text-[#89A6BA] dark:text-[#6F6F6F] lg:leading-[54px] xl:leading-[45px]"
            >
              The Future of Life Technology
            </p>
          </div>
        </div>
      </div>
      <div
        class="relative flex flex-col w-full h-auto md:w-full lg:w-[60%] xl:w-auto justify-end lg:justify-end items-end pt-5 md:pt-5 lg:pt-0"
      >
        <div
          class="absolute w-[60%] md:w-[80%] xl:w-[75%] h-auto top-20 left-[3%] md:-top-[10px] xl:-top-[24px] md:-left-[25%] xl:-left-[25%]"
        >
          <div class="relative w-full h-full">
            <img
              :src="FrameCaptionAboutHero"
              alt="About Banner"
              class="w-full h-full drop-shadow-[0_10px_15px_rgba(0,0,0,0.07)]"
            />
            <a
              href="https://maps.app.goo.gl/ywhqmCdfhGod9Mps6"
              target="_blank"
              rel="noopener noreferrer"
              class="absolute w-full h-full top-0 left-0 flex flex-row px-4 gap-x-4"
            >
              <div class="w-auto h-auto flex justify-center items-center">
                <div
                  class="relative w-5 h-5 md:w-5 md:h-5 xl:w-6 xl:h-6 flex justify-center items-center"
                >
                  <!-- ping effect -->
                  <div
                    class="absolute w-full h-full bg-[#2AB857] rounded-full animate-ping opacity-75"
                  ></div>
                  <!-- circle asli -->
                  <div
                    class="w-5 h-5 md:w-5 md:h-5 xl:w-6 xl:h-6 bg-[#2AB857] rounded-full p-[2px] xl:p-[2.5px] flex justify-center items-center"
                  >
                    <div
                      class="w-full h-full bg-white rounded-full p-[3.5px] xl:p-[5px] flex justify-center items-center"
                    >
                      <div
                        class="w-full h-full bg-[#2AB857] rounded-full"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="w-full h-auto flex flex-col justify-center gap-y-1.5">
                <div class="w-auto h-auto">
                  <p
                    class="text-[#195279] font-[400] text-[12px] md:text-[14px] xl:text-[16px]"
                  >
                    Seleris Development Office
                  </p>
                </div>
                <div class="w-auto h-auto">
                  <p
                    class="text-[#8E98A8] font-[300] text-[10px] xl:text-[12px]"
                  >
                    Royal Spring , Jakarta Selatan.....
                  </p>
                </div>
              </div>
            </a>
          </div>
        </div>
        <img
          :src="AboutHero"
          alt="About Banner"
          class="w-full h-[75%] md:h-[380px] lg:h-[400px] xl:h-[500px] object-contain object-right sm:pr-0"
        />
      </div>
    </div>
  </div>
</template>
