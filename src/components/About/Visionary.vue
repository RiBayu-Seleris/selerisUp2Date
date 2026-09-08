<template>
  <div class="w-full h-auto flex flex-col space-y-10">
    <div
      class="relative w-full h-[150px] sm:h-[200px] md:h-[240px] lg:h-[280px] xl:h-[380px] flex"
    >
      <div class="absolute bottom-0 right-0 w-full h-full">
        <img
          src="@/assets/images/visionary-frame-dark.svg"
          alt="Visionary"
          class="hidden dark:flex w-full h-full object-cover object-bottom z-10"
        />
        <img
          src="@/assets/images/visionary-frame.svg"
          alt="Visionary"
          class="flex dark:hidden w-full h-full object-cover object-bottom z-10"
        />
      </div>
      <div
        class="absolute bottom-0 right-1/2 translate-x-1/2 lg:right-[22%] lg:translate-x-0 w-auto h-auto"
      >
        <img
          src="@/assets/images/leadership-teams/rinaldi-2.webp"
          alt="Visionary"
          class="w-auto h-[230px] sm:h-[280px] md:h-[350px] lg:h-[380px] xl:h-[530px] object-cover object-bottom z-10"
        />
      </div>
      <div class="relative w-full h-auto px-8 z-20">
        <div
          class="w-full h-full flex justify-end lg:flex-row lg:justify-between"
        >
          <div
            class="w-full h-auto hidden lg:flex flex-col gap-y-3 lg:ml-8 xl:ml-10 pt-7"
          >
            <p
              class="font-[500] dark:font-[400] text-[20px] xl:text-[28px] text-[#1AB24F] dark:text-[#01F27D]"
            >
              {{ $t("about.visionary.eyebrow") }}
            </p>
            <p
              class="font-[500] text-[#195279] dark:text-[#FAFAFA] text-[36px] xl:text-[54px] leading-tight"
            >
              The Brains Behind the <br />
              {{ $t("about.visionary.title") }}
            </p>
          </div>
          <div
            class="relative w-[190px] sm:w-[250px] md:w-[300px] lg:w-[380px] xl:w-[420px] shrink-0 h-auto flex justify-end items-end -mr-[4%] sm:mr-[5%] md:mr-[6%] lg:mr-[4%] xl:mr-[9%] pb-0 sm:pb-2 lg:pb-5 xl:pb-8"
          >
            <div
              class="relative w-full bottom-0 right-0 h-[65px] sm:h-[85px] xl:h-[100px]"
            >
              <div class="absolute bottom-0 right-0 w-full h-full">
                <img
                  src="@/assets/images/visionary-frame-caption-dark-3.svg"
                  alt="Visionary"
                  class="hidden dark:flex w-full h-full object-contain object-center lg:object-top z-10"
                />
                <img
                  src="@/assets/images/visionary-frame-caption.svg"
                  alt="Visionary"
                  class="flex dark:hidden w-full h-full object-contain object-center lg:object-top z-10"
                />
              </div>
              <div
                class="relative w-full h-full flex flex-col gap-y-1 xl:gap-y-2 justify-center lg:justify-center items-start pl-2 md:px-4 lg:px-10 lg:pt-0"
              >
                <p
                  class="text-[#195279] dark:text-[#FFFFFF] font-[600] text-[12px] sm:text-[16px] md:text-[18px] lg:text-[20px] xl:text-[24px]"
                >
                  {{ $t("about.visionary.name") }}
                </p>
                <p
                  class="text-[#195279] dark:text-[#FFFFFF] font-[500] text-[10px] sm:text-[12px] md:text-[14px] lg:text-[14px] xl:text-[18px]"
                >
                  {{ $t("about.visionary.role") }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="w-full h-auto px-8">
      <div
        class="w-full h-auto p-[1px] lg:bg-[#F3F4F6] dark:lg:bg-gradient-to-r dark:lg:from-[#17181A] dark:lg:to-[#565656] rounded-[28px]"
      >
        <div
          class="w-full h-auto flex flex-col gap-y-6 xl:gap-y-10 dark:lg:bg-[#1E1F1C] text-[#195279] dark:text-[#FAFAFA] font-[400] text-[14px] sm:text-[16px] lg:text-[18px] xl:text-[22px] text-justify py-8 lg:py-14 px-2 md:px-8 lg:px-14 xl:px-20 rounded-[28px]"
        >
          <div class="w-full h-auto flex lg:hidden flex-col gap-y-2">
            <p
              class="font-[500] text-[20px] sm:text-[18px] text-[#1AB24F] dark:text-[#01F27D]"
            >
              {{ $t("about.visionary.titleLine1") }}
            </p>
            <p
              class="font-[500] text-[#195279] dark:text-[#FAFAFA] text-[20px] sm:text-[28px] leading-snug"
            >
              The Brains Behind the Seleris AI <br class="hidden sm:block" />
              {{ $t("about.visionary.titleLine2") }}
            </p>
          </div>

          <p>{{ $t("about.visionary.bio.0.text") }}</p>
          <p>{{ $t("about.visionary.bio.1.text") }}</p>
          <p>{{ $t("about.visionary.bio.2.text") }}</p>
          <p>{{ $t("about.visionary.bio.3.text") }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
