<script setup>
import Swal from "sweetalert2";
import ArrowDown from "@/components/icons/ArrowDown.vue";
import ToC from "@/components/Blog/ToC.vue";
import { computed, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { blogsApi } from "@/consumeAPI/blogsApi";
import { useUtilsStore } from "@/stores/utils.js";
import DOMPurify from "dompurify";
import {
  login,
  loading as authLoading,
  error as authError,
} from "@/consumeAPI/authApi";

const route = useRoute();
const slug = route.params.slug;
const utils = useUtilsStore();
const {
  blogDetail,
  popularBlog,
  getBlogBySlug,
  getPopularBlog,
  error,
  loading,
  blogDetailError,
} = blogsApi();

// Toggle Password Eye
const showPassword = ref(false);
// State logout dropdown
const isAccountDropdown = ref(false);
// Status login user
const loginStatus = ref(false);
// State untuk kontrol komen textarea
const isFocusedComment = ref(false);
// State untuk frame modals login
const showLoginForm = ref(false);
// State untuk frame modals Register
const showRegisterForm = ref(false);

// Email dan Password
const email = ref("");
const password = ref("");

// HARUS akses .value untun DOM Purify XSS Defender
const safeContent = computed(() =>
  blogDetail.value?.content ? DOMPurify.sanitize(blogDetail.value.content) : ""
);

const toggleDropdown = () => {
  isAccountDropdown.value = !isAccountDropdown.value;
};

// Fungsi saat textarea difokuskan
const toggledTextareaIsFocused = () => {
  if (!loginStatus.value) {
    // kalau belum login, maka munculkan (panggil function)
    openLoginForm();
    return;
  }
  // kalau sudah login atau LoginStatus == true
  isFocusedComment.value = true;
};

// Menutup (out of focused) textArea
const closeComment = () => {
  isFocusedComment.value = false;
};

// Menampilkan Login form
const openLoginForm = () => {
  showLoginForm.value = true;
};
// Menutup Login form
const closeLoginForm = () => {
  showLoginForm.value = false;
};
// Membuka register Form
const openRegisterForm = () => {
  showLoginForm.value = false;
  showRegisterForm.value = true;
};

// Watch error dari authApi.js
watch(error, (val) => {
  if (val) {
    console.log("Error", val, "error");
  }
});

const handleLogin = async () => {
  const data = await login(email.value, password.value);
  // Jika berhasil
  if (data.status === 200) {
    Swal.fire({
      title: "Berhasil Login",
      text: data.message,
      icon: "success",
      timer: 2000, // 2 detik otomatis tertutup
      showConfirmButton: false, // tombol OK disembunyikan
    }).then(() => {
      loginStatus.value = true;
      showLoginForm.value = false;
    });
    return;
  }

  // Jika akun tidak ada atau salah password
  if (data.status !== 200) {
    // console.log("Login gagal:", data.message);
    Swal.fire({
      title: "Gagal Login",
      text: data.message,
      icon: "error",
    });
    return;
  }
};

onMounted(() => {
  getBlogBySlug(slug); // <= WAJIB
  getPopularBlog();

  loginStatus.value = localStorage.getItem("loginStatus") === "true";
});
</script>

<template>
  <div v-if="loading">Loading Data</div>
  <div v-else-if="error">{{ error }}</div>
  <div
    v-else-if="blogDetail"
    class="w-full h-auto px-8 md:px-12 xl:px-16 pt-32"
  >
    <section class="w-full h-auto flex flex-row justify-between">
      <div class="w-full h-auto flex items-center">
        <p class="text-[#535862] font-[400]">
          <router-link to="/" class="hover:underline">
            <span>Home</span></router-link
          >
          <span class="px-2">></span>
          <router-link to="/blogs" class="hover:underline">
            <span>Blog</span></router-link
          >
          <span class="px-2">></span>
          <span class="text-[#195279] dark:text-[#FAFAFA]">{{
            blogDetail.title
          }}</span>
        </p>
      </div>
      <!-- Akun Section -->
      <div v-if="loginStatus === true" class="w-[40%] h-auto flex justify-end">
        <div class="w-full flex flex-row justify-end">
          <div class="relative w-full h-auto flex flex-row justify-end">
            <div class="relative w-[30%] h-auto pt-0 flex justify-end">
              <button @click="toggleDropdown" class="w-7 h-7 p-1">
                <ArrowDown />
              </button>
              <div
                v-if="isAccountDropdown"
                class="absolute w-full h-[50px] border-[1px] top-10 right-0 transition-all duration-500"
              >
                <div class="w-full h-full flex justify-center items-center">
                  <p class="text-[14px]">Logout</p>
                </div>
              </div>
            </div>
            <div class="w-auto h-auto flex flex-col justify-between px-2">
              <div class="w-full flex justify-end">
                <p class="text-[16px] text-[#195279] font-[400] text-end">
                  Riski Yusuf Maulana
                </p>
              </div>
              <div class="w-full flex justify-end">
                <p class="text-[16px] text-[#B8B8B8] font-[400]">Account</p>
              </div>
            </div>
          </div>
          <div class="relative w-[30%] h-auto flex justify-center items-center">
            <img
              src="/assets/images/profile/example.png"
              alt=""
              class="w-[55px] h-[55px] rounded-full bg-contain object-center"
            />
          </div>
        </div>
      </div>
    </section>
    <section class="w-full h-auto flex flex-col mt-10">
      <!-- Blog Images -->
      <div class="w-full h-auto">
        <img
          :src="blogDetail.cover"
          alt=""
          class="w-full h-full object-fill rounded-lg sm:rounded-3xl"
        />
        <!-- <img :src="`/assets/images/blog/` + blogimage" alt="" class="w-full" /> -->
      </div>
      <!-- Frame Blog Detail and Content & Most Popular -->
      <div
        class="w-full h-auto flex flex-col-reverse lg:flex-row mt-10 gap-x-5"
      >
        <!-- Kolom kiri -->
        <div class="w-full lg:w-[70%] h-auto flex flex-col gap-y-5 lg:pr-20">
          <div class="w-full h-auto flex flex-col gap-y-4">
            <div class="w-full h-auto">
              <p class="text-[#18AB53] font-[500]">
                Published {{ utils.fromISODate(blogDetail.created_at) }}
              </p>
            </div>
            <div class="w-full h-auto">
              <h1
                class="text-[24px] sm:text-[28px] md:text-[32px] lg:text-[38px] text-[#195279] font-[500] leading-snug dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-[#FAFAFA] dark:via-[#D4D4D4] dark:to-[#AAAAAA]"
              >
                {{ blogDetail.title }}
              </h1>
            </div>
            <div class="w-full lg:w-[70%] h-auto">
              <p class="text-[16px] text-[#535862] font-[400] leading-tight">
                Author:
                <span class="text-[#535862] font-[600] dark:text-[#B3B3B3]">
                  {{ blogDetail.author_name }}</span
                >
              </p>
            </div>
          </div>
          <div class="w-full h-auto flex justify-start items-center">
            <p
              class="text-[14px] lg:text-[14px] text-[#6941C6] bg-[#7B61FF]/10 dark:bg-[#340777] px-4 py-1 rounded-full"
            >
              {{ blogDetail.category_name }}
            </p>
          </div>
          <!-- ref="articleRef" -->
          <article
            id="content"
            class="w-full h-auto flex flex-col leading-relaxed text-[#535862] dark:text-[#DADADA] font-[400] space-y-6 lg:space-y-10 mt-5"
          >
            <p class="break-words">
              {{ blogDetail.synopsis }}
            </p>
            <!-- Content Blog -->
            <div
              class="prose max-w-none dark:prose-invert dark:prose-white text-[16px] font-[400] text-[#535862] dark:text-[#DADADA] prose-p:my-0 prose-ul:my-1 prose-ol:my-1 break-words"
              v-html="safeContent"
            ></div>
          </article>
        </div>

        <!-- Kolom kanan -->
        <div class="w-full lg:w-[30%] mb-10 lg:mb-0">
          <!-- wrapper tinggi sama dengan kolom kiri -->
          <div class="relative w-full h-full">
            <div class="sticky top-[17%] flex flex-col gap-y-5">
              <!-- Box 1 -->
              <ToC />
              <!-- Box 2 -->
              <div
                class="h-auto border-[1px] rounded-[10px] pt-2 hidden lg:flex lg:flex-col"
              >
                <div class="w-full h-auto pt-4 px-3">
                  <p
                    class="text-[#195279] font-[500] lg:text-[16px] justify-center dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-[#FAFAFA] dark:via-[#D4D4D4] dark:to-[#AAAAAA]"
                  >
                    Most Popular
                  </p>
                </div>
                <div class="flex flex-col w-full h-full mt-4">
                  <!-- ✅ Hanya tampilkan gambar dari data pertama -->
                  <router-link
                    v-if="popularBlog.length > 0"
                    :to="`/blog/${popularBlog[0].slug}`"
                    class="w-full h-[50%]"
                  >
                    <figure class="w-full h-auto">
                      <img
                        :src="popularBlog[0].cover"
                        alt="cover"
                        class="w-full h-[180px] object-fill"
                      />
                    </figure>
                  </router-link>
                  <!-- ✅ Daftar lainnya -->
                  <div class="flex flex-col w-full h-full">
                    <div
                      v-for="(data, index) in popularBlog"
                      :key="index"
                      class="w-full flex flex-col items-center"
                    >
                      <router-link :to="`/blog/${data.slug}`" class="w-full">
                        <div class="w-full h-auto grid grid-cols-12 pr-10 py-4">
                          <div class="col-span-3 w-full flex justify-center">
                            <p class="text-[24px] text-[#8EB3CC]">
                              #{{ index + 1 }}
                            </p>
                          </div>
                          <div class="col-span-9 flex flex-col gap-y-1">
                            <p
                              class="text-[#6941C6] dark:text-[#2AB857] text-[14px]"
                            >
                              {{ data.category_name }}
                            </p>
                            <p
                              class="text-[#195279] font-[500] text-[16px] leading-snug dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-[#FAFAFA] dark:via-[#D4D4D4] dark:to-[#AAAAAA]"
                            >
                              {{ data.title }}
                            </p>
                            <p
                              class="text-[#B8B8B8] dark:text-[#6F6F6F] text-[12px]"
                            >
                              {{ data.author_name }} |
                              {{ utils.fromISODate(data.created_at) }}
                            </p>
                          </div>
                        </div>
                      </router-link>
                      <div
                        v-if="index !== popularBlog.length - 1"
                        class="w-full h-[0.5px] bg-[#D9D9D9] dark:bg-[#565656]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- Comments -->
    <section class="w-full lg:w-[70%] h-auto mt-20 flex flex-col">
      <div class="w-full h-auto flex flex-col">
        <div class="w-full">
          <p class="text-[#374151] font-[500]">
            Comments ({{ blogDetail?.comments_data?.length || 0 }})
          </p>
        </div>
        <div class="w-full mt-4 rounded-[8px]">
          <textarea
            type="text"
            rows="2"
            class="w-full pl-4 py-2 bg-[#EBEBEB] rounded-[8px] focus:outline-none"
            placeholder="Share your thoughts?"
            @focus="toggledTextareaIsFocused"
          />
        </div>
        <div
          v-if="isFocusedComment"
          class="w-full h-auto flex flex-row justify-end space-x-3 mt-2 transition-all duration-500"
        >
          <button
            @click="closeComment"
            class="w-auto h-auto bg-slate-300 text-[#FAFAFA] px-8 py-2 rounded-md"
          >
            <p>Cancel</p>
          </button>
          <button
            class="w-auto h-auto bg-green-500 text-[#FAFAFA] px-8 py-2 rounded-md"
          >
            <p>Send</p>
          </button>
        </div>
      </div>
      <!-- Comments Display -->
      <div class="w-full h-auto flex flex-col mt-14 space-y-6">
        <div
          v-for="(comment, index) in blogDetail?.comments_data"
          :key="index"
          class="w-full h-auto flex flex-col gap-y-6"
        >
          <div class="w-full h-auto flex flex-col">
            <div class="w-full h-auto">
              <p
                class="text-[16px] md:text-[18px] lg:text-[20px] font-[500] text-[#323232]"
              >
                {{ comment.user }}
              </p>
            </div>
            <div class="w-full h-auto">
              <p
                class="text-[14px] md:text-[16px] lg:text-[18px] font-[400] text-[#2AB857]"
              >
                <!-- {{ comment.date }} -->
                {{ utils.fromISODate(comment.created_at) }}
              </p>
            </div>
          </div>
          <div class="w-full h-auto">
            <p
              class="text-[14px] md:text-[16px] lg:text-[18px] font-[400] text-[#7A808D]"
            >
              {{ comment.content }}
            </p>
          </div>
          <div
            v-if="index !== blogDetail.value?.comments_data.length - 1"
            class="w-full h-[1px] bg-gray-400"
          />
        </div>
      </div>
    </section>
  </div>
  <div v-else>Blog tidak ditemukan.</div>

  <!-- Frame Login and Register -->
  <Transition
    enter-active-class="animate__animated animate__fadeIn duration-75"
    leave-active-class="animate__animated animate__fadeOut duration-75"
  >
    <div
      v-if="showLoginForm"
      class="fixed z-50 top-0 w-full h-full bg-[#2F2F2F]/60 px-8 md:px-16 lg:px-0"
    >
      <div
        class="w-full lg:w-[60%] mx-auto relative top-1/2 -translate-y-1/2 bg-white flex flex-col rounded-xl p-8 space-y-3"
      >
        <div
          class="relative flex justify-end items-end w-full h-auto text-[#ACACAC] rounded-t-xl"
        >
          <button @click="closeLoginForm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              class="w-[20px] h-[20px]"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                d="M 4.2382812 2.9882812 A 1.250125 1.250125 0 0 0 3.3671875 5.1347656 L 10.232422 12 L 3.3613281 18.869141 A 1.2512475 1.2512475 0 1 0 5.1308594 20.638672 L 12 13.767578 L 18.865234 20.632812 A 1.250125 1.250125 0 1 0 20.632812 18.865234 L 13.767578 12 L 20.625 5.1425781 A 1.250125 1.250125 0 1 0 18.857422 3.375 L 12 10.232422 L 5.1347656 3.3671875 A 1.250125 1.250125 0 0 0 4.2382812 2.9882812 z"
              ></path>
            </svg>
          </button>
        </div>
        <div
          class="w-full h-full flex flex-col space-y-4 lg:space-y-6 items-center justify-center px-12 lg:px-6"
        >
          <div class="w-full h-auto flex flex-col leading-normal">
            <div class="w-full h-auto">
              <p
                class="md:text-[32px] lg:text-[38px] font-[500] text-[#195279]"
              >
                Login
              </p>
            </div>
            <div class="w-full h-auto">
              <p
                class="md:text-[18px] lg:text-[22px] font-[400] tracking-tight text-[#195279]"
              >
                Be among the first to discover what it's all about
              </p>
            </div>
          </div>
          <!-- Email Input and Label -->
          <form
            @submit.prevent="handleLogin"
            class="w-full h-auto flex flex-col space-y-4 lg:space-y-6"
          >
            <div class="w-full h-auto">
              <label
                for="email"
                class="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                required
                id="email"
                v-model="email"
                placeholder="example@email.com"
                class="w-full pr-10 pl-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#2AB857]"
              />
            </div>
            <!-- Password Input and Label -->
            <div class="w-full h-auto">
              <label
                for="password"
                class="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <div class="relative">
                <input
                  required
                  id="password"
                  :type="showPassword ? 'text' : 'password'"
                  v-model="password"
                  placeholder="Masukkan password"
                  class="w-full pr-10 pl-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#2AB857]"
                />
                <!-- Tombol toggle mata -->
                <button
                  type="button"
                  @click="togglePassword"
                  class="absolute inset-y-0 right-0 pr-3 flex items-center focus:outline-none"
                >
                  <!-- Ikon Mata Terbuka -->
                  <svg
                    v-if="!showPassword"
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 text-gray-600"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M2.5 12s4-7 9.5-7S21.5 12 21.5 12s-4 7-9.5 7S2.5 12 2.5 12z"
                    />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                  <!-- Ikon Mata Tertutup -->
                  <svg
                    v-else
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 text-gray-600"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M3 3l18 18"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M10.58 10.58A2.5 2.5 0 0 0 13.42 13.42"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M2.5 12s4-7 9.5-7c2.1 0 4.06.56 5.64 1.5m2.86 3.5s-1.4 2.46-4.45 4.4"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <!-- Forgot Password -->
            <div class="w-full h-auto flex justify-end">
              <p
                class="md:text-[14px] lg:text-[16px] hover:underline cursor-pointer hover:text-[#2AB857]"
              >
                Forgot Password?
              </p>
            </div>
            <!-- Button Send -->
            <button
              type="submit"
              class="w-full h-auto bg-[#2AB857] py-1 lg:py-2 rounded-md"
            >
              <span class="text-[#FFFFFF] text-[18px]">Send</span>
            </button>
          </form>
          <div
            class="w-full h-auto flex justify-center items-center cursor-pointer"
          >
            <p>
              Don't you have an account?
              <span class="text-[#2AB857]">Sign up</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>
