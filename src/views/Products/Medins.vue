<script setup>
import playstore from "@/assets/images/playstore.png";
import appstore from "@/assets/images/appstore.png";
</script>

<template>
  <div class="relative w-full min-h-screen">
    <section class="relative w-full h-full rounded-[20px] z-20 p-4" id="hero">
      <div
        class="w-full h-[600px] lg:h-[650px] bg-medins bg-no-repeat bg-cover bg-center rounded-[20px] z-20"
      >
        <div class="w-full h-auto pt-[100px] lg:pt-[120px] space-y-6">
          <div class="md:w-[500px] h-auto flex flex-col mx-auto justify-center">
            <p
              class="text-[23px] md:text-[40px] font-medium text-[#FAFAFA] text-center leading-relaxed"
            >
              AI Health Care
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
            class="w-full md:h-[350px] lg:h-[400px] object-contain content-end object-right drop-shadow-[-20px_10px_10px_rgba(0,0,0,0.25)]"
          />
        </figure>
        <figure
          class="w-full md:max-w-[250px] lg:max-w-[300px] h-auto mx-auto flex"
        >
          <img
            src="@/assets/Products/images/Single-Phone.png"
            alt=""
            class="w-full md:h-[400px] lg:h-[500px] object-contain drop-shadow-[-20px_10px_10px_rgba(0,0,0,0.25)]"
          />
        </figure>
        <figure class="w-full h-auto flex items-center">
          <img
            src="@/assets/Products/images/Single-Phone.png"
            alt=""
            class="w-full md:h-[350px] lg:h-[400px] object-contain content-end object-left drop-shadow-[-20px_10px_10px_rgba(0,0,0,0.25)]"
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
    <!-- Section About Us -->
    <section
      class="relative w-full h-auto max-w-[1440px] mx-auto p-4"
      id="about"
    >
      <!-- Circle First -->
      <figure
        class="absolute w-auto md:h-[400px] xl:h-[500px] -top-[400px] -right-0 lg:right-[70px] p-4"
      >
        <img
          src="@/assets/Products/images/circle.png"
          alt="Circle"
          class="object-contain w-full h-full"
        />
      </figure>
      <figure
        class="absolute w-auto md:h-[500px] xl:h-[550px] -top-[0px] -left-[100px] p-4"
      >
        <img
          src="@/assets/Products/images/circle.png"
          alt="Circle"
          class="object-contain w-full h-full"
        />
      </figure>
      <div
        class="relative w-full flex flex-col justify-center items-center z-20 mt-20 lg:mt-40"
      >
        <div class="w-full h-auto flex flex-col">
          <div class="w-full h-auto flex justify-center">
            <p class="text-[#2E504E] text-[57px] font-[500]">About Us</p>
          </div>
          <div class="w-full h-auto flex justify-center">
            <p class="text-[#42C5AF] text-[27px] font-[500]">Seleris Medins</p>
          </div>
        </div>
        <div class="w-full h-auto grid grid-cols-2 xl:pr-[200px] lg:mt-20">
          <div
            class="w-full h-full p-10 lg:p-0 xl:h-[450px] flex justify-center"
          >
            <img
              src="@/assets/products/images/medins-about.png"
              alt=""
              class="h-full"
            />
          </div>
          <div class="w-full h-auto flex flex-col pt-24 lg:pt-20 space-y-5">
            <p class="text-[#2E504E] text-[27px] lg:text-[37px] font-[600]">
              AI Health Care Application
            </p>
            <p class="text-[#535862] text-[17px] lg:text-[17px]">
              deserunt mollit anim id est laborum. Sed ut perspiciatis unde
              omnis iste natus error sit voluptatem accusantium doloremque
              laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore
              veritatis et quasi architecto beatae vitae dicta sunt explicabo.
            </p>
          </div>
        </div>
      </div>
    </section>
    <!-- How Application Work -->
    <section
      class="relative w-full h-auto max-w-[1440px] mx-auto mt-14 lg:mt-20"
      id="work"
    >
      <!-- Circle Third -->
      <figure
        class="absolute w-auto md:h-[400px] xl:h-[500px] -top-[200px] lg:-top-[200px] -right-0 lg:right-[0] p-4"
      >
        <img
          src="@/assets/Products/images/circle.png"
          alt="Circle"
          class="object-contain w-full h-full"
        />
      </figure>
      <div
        class="relative w-full flex flex-col justify-center items-center z-20"
      >
        <div class="w-full h-auto flex flex-col">
          <div class="w-full h-auto flex pl-8">
            <p class="text-[#2E504E] text-[37px] lg:text-[57px] font-[500]">
              How Application Work
            </p>
          </div>
          <div class="w-full h-auto flex pl-8">
            <p class="text-[#42C5AF] text-[23px] lg:text-[27px] font-[500]">
              Seleris Medins
            </p>
          </div>
        </div>
      </div>
      <div class="relative w-full h-auto mt-14">
        <div
          class="relative flex flex-row w-full h-auto pb-20 gap-x-10 sml:gap-x-5 md:gap-x-0 mt-16 sml:mt-4 md:mt-10 py-5 overflow-x-auto snap-x snap-mandatory sml:scroll-pl-10 sml:pl-10 sml:pr-10 md:scroll-pl-8 md:pl-8 md:pr-8 hide-scrollbar"
        >
          <!-- Phone -->
          <div class="flex-row snap-start shrink-0">
            <figure
              class="w-full max-w-[250px] lg:max-w-[300px] h-auto mx-auto flex"
            >
              <img
                src="@/assets/Products/images/Single-Phone.png"
                alt=""
                class="w-full h-[400px] lg:h-[500px] object-contain"
              />
            </figure>
          </div>
          <!-- Line Frame -->
          <div class="w-auto h-auto flex items-center">
            <div class="relative flex flex-row w-auto h-full">
              <div
                class="absolute w-full h-1/2 bottom-[0px] justify-center flex pt-8"
              >
                <div class="relative w-auto h-auto">
                  <svg
                    class="w-full h-full drop-shadow-[0px_10px_10px_rgba(0,0,0,0.1)]"
                    viewBox="0 0 306 203"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <mask id="path-1-inside-1_360_260" fill="white">
                      <path
                        d="M182.072 24.9299C183.947 26.8053 186.491 27.8588 189.143 27.8588H291C299.284 27.8588 306 34.5746 306 42.8588V187.859C306 196.143 299.284 202.859 291 202.859H15C6.71586 202.859 0.000198145 196.143 0 187.859V42.8588C0 34.5746 6.71573 27.8588 15 27.8588H116.857C119.509 27.8588 122.053 26.8053 123.928 24.9299L145.929 2.92893C149.834 -0.976311 156.166 -0.97631 160.071 2.92893L182.072 24.9299Z"
                      />
                    </mask>
                    <path
                      d="M182.072 24.9299C183.947 26.8053 186.491 27.8588 189.143 27.8588H291C299.284 27.8588 306 34.5746 306 42.8588V187.859C306 196.143 299.284 202.859 291 202.859H15C6.71586 202.859 0.000198145 196.143 0 187.859V42.8588C0 34.5746 6.71573 27.8588 15 27.8588H116.857C119.509 27.8588 122.053 26.8053 123.928 24.9299L145.929 2.92893C149.834 -0.976311 156.166 -0.97631 160.071 2.92893L182.072 24.9299Z"
                      fill="#FAFAFA"
                    />
                    <path
                      d="M291 27.8588V26.8588V27.8588ZM306 187.859L307 187.859V187.859H306ZM291 202.859V203.859V202.859ZM15 202.859L15 203.859H15V202.859ZM0 187.859H-1V187.859L0 187.859ZM15 27.8588V26.8588V27.8588ZM123.928 24.9299L123.221 24.2228L123.928 24.9299ZM145.929 2.92893L146.636 3.63604L145.929 2.92893ZM160.071 2.92893L159.364 3.63604L160.071 2.92893ZM182.072 24.9299L182.779 24.2228L182.072 24.9299ZM189.143 27.8588V28.8588H291V27.8588V26.8588H189.143V27.8588ZM291 27.8588V28.8588C298.732 28.8588 305 35.1269 305 42.8588H306H307C307 34.0223 299.837 26.8588 291 26.8588V27.8588ZM306 42.8588H305V187.859H306H307V42.8588H306ZM306 187.859L305 187.859C305 195.591 298.732 201.859 291 201.859V202.859V203.859C299.836 203.859 307 196.695 307 187.859L306 187.859ZM291 202.859V201.859H15V202.859V203.859H291V202.859ZM15 202.859L15 201.859C7.26816 201.859 1.00018 195.591 1 187.859L0 187.859L-1 187.859C-0.999789 196.695 6.16355 203.859 15 203.859L15 202.859ZM0 187.859H1V42.8588H0H-1V187.859H0ZM0 42.8588H1C1 35.1269 7.26801 28.8588 15 28.8588V27.8588V26.8588C6.16344 26.8588 -1 34.0223 -1 42.8588H0ZM15 27.8588V28.8588H116.857V27.8588V26.8588H15V27.8588ZM123.928 24.9299L124.635 25.637L146.636 3.63604L145.929 2.92893L145.222 2.22182L123.221 24.2228L123.928 24.9299ZM160.071 2.92893L159.364 3.63604L181.365 25.637L182.072 24.9299L182.779 24.2228L160.778 2.22183L160.071 2.92893ZM116.857 27.8588V28.8588C119.774 28.8588 122.572 27.6999 124.635 25.637L123.928 24.9299L123.221 24.2228C121.533 25.9106 119.244 26.8588 116.857 26.8588V27.8588ZM145.929 2.92893L146.636 3.63604C150.151 0.12132 155.849 0.121321 159.364 3.63604L160.071 2.92893L160.778 2.22183C156.482 -2.07394 149.518 -2.07394 145.222 2.22182L145.929 2.92893ZM189.143 27.8588V26.8588C186.756 26.8588 184.467 25.9106 182.779 24.2228L182.072 24.9299L181.365 25.637C183.428 27.6999 186.226 28.8588 189.143 28.8588V27.8588Z"
                      fill="url(#paint0_linear_360_260)"
                      mask="url(#path-1-inside-1_360_260)"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_360_260"
                        x1="153"
                        y1="0"
                        x2="153"
                        y2="202.859"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#51DAC3" />
                        <stop
                          offset="1"
                          stop-color="#205F55"
                          stop-opacity="0"
                        />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div
                    class="absolute w-full h-full top-0 flex flex-col justify-center items-center px-8 gap-y-1 lg:gap-y-2 pt-8"
                  >
                    <div class="w-full flex justify-center">
                      <p
                        class="text-center text-[23px] lg:text-[27px] text-[#38C1AA]"
                      >
                        Face Screening
                      </p>
                    </div>
                    <div class="w-full flex justify-center">
                      <p
                        class="text-center text-[14px] lg:text-[17px] text-[#6F6F6F]"
                      >
                        Easy and Quick Health Check with Seleris Medins
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <!-- Line -->
              <div class="w-40 h-auto flex items-center">
                <div class="w-full h-1 bg-black rounded-full" />
              </div>
              <!-- Circle -->
              <div
                class="relative w-auto h-auto rounded-full flex items-center"
              >
                <div class="w-10 h-10 bg-green-500 rounded-full shadow-xl" />
              </div>
              <!-- Line -->
              <div class="w-40 h-auto flex items-center">
                <div class="w-full h-1 bg-black rounded-full" />
              </div>
            </div>
          </div>
          <!-- Phone -->
          <div class="flex-row snap-start shrink-0">
            <figure
              class="w-full max-w-[250px] lg:max-w-[300px] h-auto mx-auto flex"
            >
              <img
                src="@/assets/Products/images/Single-Phone.png"
                alt=""
                class="w-full h-[400px] lg:h-[500px] object-contain"
              />
            </figure>
          </div>
          <!-- Line Frame -->
          <div class="w-auto h-auto flex items-center">
            <div class="relative flex flex-row w-auto h-full">
              <div
                class="absolute w-full h-1/2 bottom-[0px] justify-center flex pt-8"
              >
                <div class="relative w-auto h-auto">
                  <svg
                    class="w-full h-full drop-shadow-[0px_10px_10px_rgba(0,0,0,0.1)]"
                    viewBox="0 0 306 203"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <mask id="path-1-inside-1_360_260" fill="white">
                      <path
                        d="M182.072 24.9299C183.947 26.8053 186.491 27.8588 189.143 27.8588H291C299.284 27.8588 306 34.5746 306 42.8588V187.859C306 196.143 299.284 202.859 291 202.859H15C6.71586 202.859 0.000198145 196.143 0 187.859V42.8588C0 34.5746 6.71573 27.8588 15 27.8588H116.857C119.509 27.8588 122.053 26.8053 123.928 24.9299L145.929 2.92893C149.834 -0.976311 156.166 -0.97631 160.071 2.92893L182.072 24.9299Z"
                      />
                    </mask>
                    <path
                      d="M182.072 24.9299C183.947 26.8053 186.491 27.8588 189.143 27.8588H291C299.284 27.8588 306 34.5746 306 42.8588V187.859C306 196.143 299.284 202.859 291 202.859H15C6.71586 202.859 0.000198145 196.143 0 187.859V42.8588C0 34.5746 6.71573 27.8588 15 27.8588H116.857C119.509 27.8588 122.053 26.8053 123.928 24.9299L145.929 2.92893C149.834 -0.976311 156.166 -0.97631 160.071 2.92893L182.072 24.9299Z"
                      fill="#FAFAFA"
                    />
                    <path
                      d="M291 27.8588V26.8588V27.8588ZM306 187.859L307 187.859V187.859H306ZM291 202.859V203.859V202.859ZM15 202.859L15 203.859H15V202.859ZM0 187.859H-1V187.859L0 187.859ZM15 27.8588V26.8588V27.8588ZM123.928 24.9299L123.221 24.2228L123.928 24.9299ZM145.929 2.92893L146.636 3.63604L145.929 2.92893ZM160.071 2.92893L159.364 3.63604L160.071 2.92893ZM182.072 24.9299L182.779 24.2228L182.072 24.9299ZM189.143 27.8588V28.8588H291V27.8588V26.8588H189.143V27.8588ZM291 27.8588V28.8588C298.732 28.8588 305 35.1269 305 42.8588H306H307C307 34.0223 299.837 26.8588 291 26.8588V27.8588ZM306 42.8588H305V187.859H306H307V42.8588H306ZM306 187.859L305 187.859C305 195.591 298.732 201.859 291 201.859V202.859V203.859C299.836 203.859 307 196.695 307 187.859L306 187.859ZM291 202.859V201.859H15V202.859V203.859H291V202.859ZM15 202.859L15 201.859C7.26816 201.859 1.00018 195.591 1 187.859L0 187.859L-1 187.859C-0.999789 196.695 6.16355 203.859 15 203.859L15 202.859ZM0 187.859H1V42.8588H0H-1V187.859H0ZM0 42.8588H1C1 35.1269 7.26801 28.8588 15 28.8588V27.8588V26.8588C6.16344 26.8588 -1 34.0223 -1 42.8588H0ZM15 27.8588V28.8588H116.857V27.8588V26.8588H15V27.8588ZM123.928 24.9299L124.635 25.637L146.636 3.63604L145.929 2.92893L145.222 2.22182L123.221 24.2228L123.928 24.9299ZM160.071 2.92893L159.364 3.63604L181.365 25.637L182.072 24.9299L182.779 24.2228L160.778 2.22183L160.071 2.92893ZM116.857 27.8588V28.8588C119.774 28.8588 122.572 27.6999 124.635 25.637L123.928 24.9299L123.221 24.2228C121.533 25.9106 119.244 26.8588 116.857 26.8588V27.8588ZM145.929 2.92893L146.636 3.63604C150.151 0.12132 155.849 0.121321 159.364 3.63604L160.071 2.92893L160.778 2.22183C156.482 -2.07394 149.518 -2.07394 145.222 2.22182L145.929 2.92893ZM189.143 27.8588V26.8588C186.756 26.8588 184.467 25.9106 182.779 24.2228L182.072 24.9299L181.365 25.637C183.428 27.6999 186.226 28.8588 189.143 28.8588V27.8588Z"
                      fill="url(#paint0_linear_360_260)"
                      mask="url(#path-1-inside-1_360_260)"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_360_260"
                        x1="153"
                        y1="0"
                        x2="153"
                        y2="202.859"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#51DAC3" />
                        <stop
                          offset="1"
                          stop-color="#205F55"
                          stop-opacity="0"
                        />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div
                    class="absolute w-full h-full top-0 flex flex-col justify-center items-center px-8 gap-y-1 lg:gap-y-2 pt-8"
                  >
                    <div class="w-full flex justify-center">
                      <p
                        class="text-center text-[23px] lg:text-[27px] text-[#38C1AA]"
                      >
                        Face Screening
                      </p>
                    </div>
                    <div class="w-full flex justify-center">
                      <p
                        class="text-center text-[14px] lg:text-[17px] text-[#6F6F6F]"
                      >
                        Easy and Quick Health Check with Seleris Medins
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <!-- Line -->
              <div class="w-40 h-auto flex items-center">
                <div class="w-full h-1 bg-black rounded-full" />
              </div>
              <!-- Circle -->
              <div
                class="relative w-auto h-auto rounded-full flex items-center"
              >
                <div class="w-10 h-10 bg-green-500 rounded-full shadow-xl" />
              </div>
              <!-- Line -->
              <div class="w-40 h-auto flex items-center">
                <div class="w-full h-1 bg-black rounded-full" />
              </div>
            </div>
          </div>
          <!-- Phone -->
          <div class="flex-row snap-start shrink-0">
            <figure
              class="w-full max-w-[250px] lg:max-w-[300px] h-auto mx-auto flex"
            >
              <img
                src="@/assets/Products/images/Single-Phone.png"
                alt=""
                class="w-full h-[400px] lg:h-[500px] object-contain"
              />
            </figure>
          </div>
        </div>
      </div>
    </section>
    <!-- Section Easy Quick -->
    <section
      class="relative w-full h-auto max-w-[1440px] mx-auto px-8"
      id="easyquick"
    >
      <div class="w-full h-[200px] bg-[#F3F4F6]"></div>
    </section>
  </div>
</template>
