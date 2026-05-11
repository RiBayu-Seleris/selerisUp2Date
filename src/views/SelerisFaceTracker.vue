<script setup>
import ArrowLeft from "@/components/icons/ArrowLeft.vue";
import CardIconLeft from "@/components/reusable/CardIconLeft.vue";
import TrustedImage from "@/assets/images/facetracker/trusted-list.svg";
import Sun from "@/assets/icons/facetracker/sun.svg";
import Contact from "@/assets/icons/facetracker/contact.svg";
import Timer from "@/assets/icons/facetracker/timer.svg";

import playstore from "@/assets/images/playstore.png";
import appstore from "@/assets/images/appstore.png";

import Logo from "@/assets/images/logo.png";

// Icon
import HeartRate from "@/assets/icons/facetracker/heart-rate.svg";
import StressLevel from "@/assets/icons/facetracker/stress-level.svg";
import Blood from "@/assets/icons/facetracker/blood.svg";
import BMI from "@/assets/icons/facetracker/body-mass.svg";
import GenCell from "@/assets/icons/facetracker/gen-cell.svg";
import Heart from "@/assets/icons/facetracker/heart.svg";
import Lens from "@/assets/icons/facetracker/lens.svg";

import FaceTracker from "@/components/FaceScan/index.vue";
import Result from "@/components/FaceScan/Result.vue";

const rules = [
  {
    icon: Sun,
    title: "Check Lighting",
    description:
      "Ensure your face is well-lit from the front. Avoid harsh backlighting or deep shadows.",
  },
  {
    icon: Contact,
    title: "Stay Centered",
    description:
      "Position your face within the red markers. Keep a neutral expression and remain still.",
  },
  {
    icon: Timer,
    title: "60 Seconds",
    description:
      "The scan takes approximately 15 seconds via rPPG technology. Please do not move or speak during the process",
  },
];

const indicators = [
  {
    icon: HeartRate,
    title: "Heart Rate",
  },
  {
    icon: StressLevel,
    title: "Heart Rate",
  },
  {
    icon: Blood,
    title: "Heart Rate",
  },
  {
    icon: BMI,
    title: "Heart Rate",
  },
  {
    icon: GenCell,
    title: "Heart Rate",
  },
  {
    icon: Heart,
    title: "Heart Rate",
  },
];
</script>
<template>
  <div class="w-full h-screen p-5">
    <div
      class="w-full h-full flex flex-row justify-between items-center gap-x-4"
    >
      <!-- LEFT CONTENT -->
      <div class="w-full h-full flex flex-col justify-between">
        <div
          class="w-full h-auto flex flex-row gap-x-4 justify-start items-center bg-[#FFFFFF] rounded-full text-[#000000] border-[1px]"
        >
          <div
            class="w-10 h-10 flex justify-center items-center bg-[#F7F7F7] rounded-full p-1.5 border-[1px]"
          >
            <ArrowLeft />
          </div>
          <div class="w-full h-full flex items-center">
            <p class="text-[16px] font-[400]">Back to Site</p>
          </div>
        </div>
        <div
          class="w-full h-auto flex flex-col gap-y-6 justify-start items-center px-4 py-6 bg-[#FFFFFF] rounded-lg"
        >
          <div v-for="(rule, index) in rules" :key="index">
            <CardIconLeft
              :icon="rule.icon"
              :title="rule.title"
              :description="rule.description"
            />
          </div>
        </div>
        <div
          class="w-full h-auto flex justify-center items-center p-6 bg-[#FFFFFF] rounded-lg"
        >
          <p class="text-[#5A6062] text-[16px]">
            <span class="font-[600]">Professional Tip:</span> Taking three slow,
            measured breaths before initialization significantly improves HRV
            variability accuracy.
          </p>
        </div>
        <div class="w-full h-auto flex justify-start items-center">
          <div
            class="w-full h-auto flex flex-col gap-y-8 justify-center items-center bg-[#FFFFFF] rounded-lg p-6"
          >
            <div class="w-full h-auto flex justify-center items-center">
              <p>Trust By</p>
            </div>
            <div class="w-full h-auto flex justify-center items-center">
              <div class="flex-1 flex justify-center items-center">
                <img :src="TrustedImage" alt="" srcset="" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- CENTER CONTENT -->
      <div class="w-[35%] h-full shrink-0 flex justify-center items-start">
        <FaceTracker />
        <!-- <Result /> -->
      </div>
      <!-- RIGHT CONTENT -->
      <div class="w-full h-full flex flex-col justify-between">
        <div
          class="w-full h-auto flex flex-col gap-y-2 justify-start items-center bg-[#FFFFFF] rounded-lg text-[#000000] border-[1px] p-4"
        >
          <div class="w-full h-auto flex justify-start items-center">
            <p class="text-[18px] text-[#195279] font-[600]">
              Monitor 39+ health metrics in just 15 seconds with a facial scan
            </p>
          </div>
          <div class="w-full h-auto flex justify-start items-center">
            <p class="text-[14px]">
              Measure health markers like blood pressure, BMI, Heart rate (HR),
              heart rate variability and more in just 15 seconds via face scan
            </p>
          </div>
        </div>
        <div
          class="w-full h-auto grid grid-cols-2 gap-3 justify-start items-center"
        >
          <div v-for="(indicator, index) in indicators" :key="index">
            <div
              class="w-full h-auto flex flex-col gap-y-1 justify-between items-start bg-[#FFFFFF] p-5 rounded-lg"
            >
              <div class="w-full h-auto flex justify-start items-start">
                <div class="w-8 h-8 flex justify-center items-center p-1">
                  <img :src="indicator.icon" alt="" srcset="" />
                </div>
              </div>
              <div class="w-full h-auto flex">
                <p>{{ indicator.title }}</p>
              </div>
            </div>
          </div>
        </div>
        <div
          class="w-full h-auto flex flex-row justify-between items-center px-4 py-2 bg-[#FFFFFF] rounded-lg"
        >
          <div class="w-full h-auto flex justify-start items-center">
            <div class="w-auto h-full flex justify-center items-center">
              <img :src="Lens" alt="" srcset="" class="w-full h-full" />
            </div>
          </div>
          <div class="w-full h-auto flex justify-end items-center">
            <p class="text-[#6A6A6A] font-[500] text-[14px]">
              +24 Parameters Makers
            </p>
          </div>
        </div>
        <div
          class="w-full h-auto flex flex-col gap-y-5 justify-center items-center p-8 bg-[#FFFFFF] rounded-lg"
        >
          <div class="w-full h-auto flex justify-center items-center">
            <p class="text-[#A7A7A7]">Get the apps</p>
          </div>
          <div class="flex flex-row lg:flex-row gap-5 px-12">
            <a
              href="https://play.google.com/store/apps/developer?id=PT.+Seleris+Meditekno+Internasional"
              target="_blank"
              rel="noopener noreferrer"
              class="flex w-auto h-full md:justify-start justify-center items-center content-center xl:justify-start xl:content-start"
            >
              <img
                :src="playstore"
                alt="Playstore"
                class="w-full h-full object-contain object-center"
              />
            </a>
            <div
              class="flex w-auto h-full justify-center items-center content-center xl:justify-start xl:content-start"
            >
              <div class="relative group w-full h-full">
                <img
                  :src="appstore"
                  alt="Appstore"
                  class="w-full h-full object-contain object-center"
                />

                <!-- Hover Overlay -->
                <div
                  class="absolute flex items-center justify-center inset-0 group-hover:opacity-100 transition duration-300 bg-opacity-60 opacity-0"
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
          <div class="w-full h-auto flex justify-between items-center px-20">
            <div class="w-full h-auto flex justify-center items-center">
              <p class="text-[#A9A9A9] font-[500] text-[18px]">Powered by</p>
            </div>
            <div class="w-full h-full flex justify-start items-center">
              <img
                :src="Logo"
                alt=""
                srcset=""
                class="w-full h-[75%] md:h-[50px] xl:h-[40px] object-contain object-center"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
