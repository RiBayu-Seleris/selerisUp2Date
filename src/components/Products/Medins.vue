<template>
  <section class="relative flex w-full h-auto px-8">
    <div class="relative w-full h-auto rounded-b-3xl mt-28">
      <div
        class="w-full h-auto lg:bg-hero2 dark:lg:bg-herodark bg-no-repeat bg-cover lg:bg-center dark:lg:bg-center xl:bg-top dark:xl:bg-top lg:pt-16 rounded-3xl"
      >
        <div
          class="flex flex-col w-full h-auto text-center justify-center items-center z-30 bg-[#F3F4F6] dark:bg-black dark:lg:bg-transparent lg:bg-transparent rounded-3xl animate__animated animate__fadeIn animate__slower"
        >
          <div class="w-full pb-2 sml:pb-2 sml:pt-4 md:pt-5">
            <p
              class="text-[24px] sml:text-[21px] lg:text-[26px] xl:text-[32px] text-[#1AB24F] font-[500]"
            >
              AI Innovation
            </p>
          </div>
          <div class="w-full pb-2 sml:pb-2">
            <p
              class="text-[#195279] sml:text-[21px] sml:tracking-[0.5px] md:text-[32px] lg:text-[36px] xl:text-[48px] font-[500] sml:leading-[27px] md:leading-[37px] lg:leading-[45px] xl:leading-[60px] xl:tracking-[0px] dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-br dark:from-[#FAFAFA] dark:via-[#D4D4D4] dark:to-[#AAAAAA]"
            >
              The Future of Life <br />
              Technology
            </p>
          </div>
          <!-- Swipe caption -->
          <div
            class="cursor-pointer flex flex-row items-center mb-4 sml:mb-0 lg:mb-5 mt-6 bg-[#195279] dark:bg-[#2B2E32] dark:border-[1px] dark:border-[#2AB857] px-5 py-2 rounded-full dark:shadow-[0px_4px_18.8px_0px_rgba(0,255,59,0.25)]"
          >
            <router-link to="/book-a-demo">
              <p
                class="text-[20px] sml:text-[10px] xl:text-[14px] font-[400] text-[#FAFAFA]"
              >
                Book a Demo
              </p>
            </router-link>
            <div class="ml-1 text-[#FAFAFA] dark:text-[#FAFAFA]">
              <svg
                class="w-5 h-5 sml:w-3 sml:h-3 xl:w-5 xl:h-5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.43 18.07L20.5 12L14.43 5.92999"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M3.50002 12L20.33 12"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
