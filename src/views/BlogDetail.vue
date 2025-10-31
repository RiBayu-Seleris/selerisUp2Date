<script setup>
import Swal from "sweetalert2";
import LikeIcon from "@/components/icons/Like.vue";
import EyeIcon from "@/components/icons/Eye.vue";
import CommentIcon from "@/components/icons/Comment.vue";
import ShareIcon from "@/components/icons/Share.vue";
import ArrowDown from "@/components/icons/ArrowDown.vue";
import ToC from "@/components/Blog/ToC.vue";
import {
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  reactive,
  ref,
  watch,
} from "vue";
import { useRoute } from "vue-router";
import { blogsApi } from "@/consumeAPI/blogsApi";
import { useUtilsStore } from "@/stores/utils.js";
import DOMPurify from "dompurify";
import {
  login,
  register,
  loading as authLoading,
  error as authError,
  logout,
  token,
  user,
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
  postComment,
  likeBlogCheck,
  likeBlog,
  unlikeBlog,
} = blogsApi();

// Toggle Password Eye
const showPassword = ref(false);
const showPasswordRegister = ref(false);
// State logout dropdown
const isAccountDropdown = ref(false);
// Status login user
const loginStatus = computed(() => !!token.value);
// State untuk kontrol komen textarea
const isFocusedComment = ref(false);
// State untuk Like
const isLiked = ref(false);

// State untuk frame modals login
const showLoginForm = ref(false);
// State untuk frame modals Register
const showRegisterForm = ref(false);

// HARUS akses .value untun DOM Purify XSS Defender
const safeContent = computed(() =>
  blogDetail.value?.content ? DOMPurify.sanitize(blogDetail.value.content) : ""
);

const toggleDropdown = () => {
  isAccountDropdown.value = !isAccountDropdown.value;
};

const commentTextArea = ref(null);

// Fungsi saat textarea difokuskan
const toggledTextareaIsFocused = () => {
  if (!loginStatus.value) {
    // Hapus fokus dari textarea
    nextTick(() => {
      commentTextArea.value?.blur();
    });

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
  showRegisterForm.value = false;
};
// Membuka register Form
const openRegisterForm = () => {
  showRegisterForm.value = true;
  showLoginForm.value = false;
};

// Menutup Login form
const closeLoginForm = () => {
  showLoginForm.value = false;
};
// Menutup Login form
const closeRegisterForm = () => {
  showRegisterForm.value = false;
};

const loginError = ref(false);

// Fullname, Email dan Password
const loginData = reactive({
  email: "",
  password: "",
});

const registerData = reactive({
  fullname: "",
  email: "",
  password: "",
  c_password: "",
});

const inputCommentData = reactive({
  comment: "",
});

const togglePassword = () => {
  showPassword.value = !showPassword.value;
};

const togglePasswordRegister = () => {
  showPasswordRegister.value = !showPasswordRegister.value;
};

const handleLogin = async () => {
  const payload = {
    email: loginData.email,
    password: loginData.password,
  };
  const data = await login(payload);

  // Jika berhasil
  if (data?.success) {
    loginError.value = false;
    Swal.fire({
      title: "Berhasil Login",
      text: "Selamat datang kembali!",
      icon: "success",
      timer: 2000,
      showConfirmButton: false,
    }).then(() => {
      showLoginForm.value = false;
    });
    return;
  }

  if (!data?.success) {
    loginError.value = true;
  }
};

const handleRegister = async () => {
  const payload = {
    name: registerData.fullname,
    email: registerData.email,
    password: registerData.password,
    c_password: registerData.password,
  };
  const data = await register(payload);

  if (data.status === 422) {
    Swal.fire({
      title: "Gagal Register",
      text: data.message,
      icon: "error",
    });
  }

  if (data.status === 200) {
    Swal.fire({
      title: "Berhasil Register",
      text: data.message,
      icon: "success",
      timer: 2000, // 2 detik otomatis tertutup
      showConfirmButton: false, // tombol OK disembunyikan
    }).then(() => {
      showRegisterForm.value = false;
      showLoginForm.value = true;
    });
  }
};

// Logout
const handleLogout = async () => {
  // Swal
  const result = await Swal.fire({
    title: "Yakin ingin logout?",
    text: "Kamu akan keluar dari akun saat ini.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Ya, logout",
    cancelButtonText: "Batal",
  });

  if (result.isConfirmed) {
    // Panggil fungsi logout
    logout();

    // Tampilkan notifikasi berhasil
    Swal.fire({
      title: "Berhasil Logout",
      icon: "success",
      timer: 2000,
      showConfirmButton: false,
    }).then(() => {
      window.location.reload();
    });
  }
};

const handleLike = async () => {
  const blogId = blogDetail.value?.id;
  if (!blogId) return console.warn("Blog ID tidak ditemukan");

  if (!loginStatus.value) {
    openLoginForm();
    return;
  }

  try {
    const check = await likeBlogCheck(blogId);
    const isAlreadyLiked = !!check?.liked;

    if (!isAlreadyLiked) {
      // ✅ Belum like
      isLiked.value = true; // Optimistic UI
      const res = await likeBlog(blogId);

      if ([200, 201, 409].includes(res?.status)) {
        blogDetail.value.likes++;
      } else {
        isLiked.value = false;
        console.warn("Gagal like:", res?.status);
      }
    } else {
      // ✅ Sudah like → unlike
      isLiked.value = false; // Optimistic UI
      const res = await unlikeBlog(blogId);

      if (res?.status === 200) {
        blogDetail.value.likes--;
      } else {
        isLiked.value = true; // rollback
        console.warn("Gagal unlike:", res?.status);
      }
    }
  } catch (error) {
    console.error("Terjadi kesalahan saat like/unlike:", error);
  }
};

const handleSubmitComment = async () => {
  const blogId = blogDetail.value?.id;

  // 🔹 Pastikan user sudah login dulu
  if (!loginStatus.value) {
    openLoginForm();
    return;
  }

  const payload = {
    content: inputCommentData.comment.trim(),
  };

  if (!payload.content) return; // jangan kirim kalau kosong

  const data = await postComment(payload, blogId);
  if (data) {
    inputCommentData.comment = "";
    await getBlogBySlug(slug); // refresh komentar
  }
};

const blogUrl = `${window.location.origin}/blog/${blogDetail.slug}`;

const copyLink = async (slug) => {
  const blogUrl = `${window.location.origin}/blog/${slug}`;

  try {
    await navigator.clipboard.writeText(blogUrl);

    // ✅ Swal sukses
    Swal.fire({
      icon: "success",
      title: "Link berhasil disalin!",
      text: "Bagikan ke temanmu 🚀",
      toast: true,
      position: "top",
      showConfirmButton: false,
      timer: 2000,
    });
  } catch (err) {
    console.log("Clipboard error (kemungkinan false error):", err);
  }
};

const activeShareId = ref(null);

const toggleShare = (id) => {
  activeShareId.value = activeShareId.value === id ? null : id;
};

const handleClickOutside = (event) => {
  const wrappers = document.querySelectorAll(".share-wrapper");

  let clickedInside = false;
  wrappers.forEach((wrapper) => {
    if (wrapper.contains(event.target)) {
      clickedInside = true;
    }
  });

  if (!clickedInside) {
    activeShareId.value = null;
  }
};

onMounted(async () => {
  await getBlogBySlug(slug);
  getPopularBlog();
  document.addEventListener("click", handleClickOutside);
});

// ✅ Reaktif cek ketika blogDetail sudah terisi
watch(
  () => loginStatus.value,
  async (status) => {
    const blogId = blogDetail.value?.id;
    if (!blogId) return;

    if (status) {
      // user baru login → cek ulang status like
      const BASE_URL = import.meta.env.VITE_API_URL;
      const userToken = localStorage.getItem("token");

      try {
        const response = await fetch(
          `${BASE_URL}/api/v1/app/blogs/${blogId}/like`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userToken}`,
            },
          }
        );

        const data = await response.json();
        isLiked.value = !!data?.liked;
        // console.log("Status Like setelah login:", isLiked.value);
      } catch (error) {
        console.warn("Gagal cek like setelah login:", error);
      }
    } else {
      // user logout → reset warna like
      isLiked.value = false;
    }
  }
);

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<template>
  <div v-if="loading"></div>
  <div v-else-if="error">{{ error }}</div>
  <div
    v-else-if="blogDetail"
    class="w-full h-auto px-8 md:px-12 xl:px-16 pt-32 dark:bg-[#17181A]"
  >
    <section
      class="w-full h-auto flex flex-col-reverse lg:flex-row justify-between"
    >
      <div class="w-full h-auto flex items-center">
        <p class="text-[14px] lg:text-[18px] text-[#535862] font-[400]">
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
      <div
        v-if="loginStatus === true"
        class="w-full lg:w-[40%] h-auto flex justify-end mb-8"
      >
        <div class="w-full flex flex-row justify-end">
          <div class="relative w-full h-auto flex flex-row justify-end">
            <div class="relative w-[30%] h-auto pt-0 flex justify-end">
              <button
                @click="toggleDropdown"
                class="w-7 h-7 p-1 text-[#195279] dark:text-white"
              >
                <ArrowDown />
              </button>
              <button
                @click="handleLogout"
                v-if="isAccountDropdown"
                class="absolute w-full h-auto border-[1px] top-8 lg:top-8 right-0 transition-all duration-500 bg-white dark:bg-[#17181A] dark:shadow-white rounded-lg"
              >
                <div
                  class="w-full h-full flex justify-center items-center py-2 lg:py-3.5"
                >
                  <p class="text-[14px] text-[#195279] dark:text-[#FAFAFA]">
                    Logout
                  </p>
                </div>
              </button>
            </div>
            <div
              class="w-auto h-auto flex flex-col justify-between pl-2 lg:px-2"
            >
              <div class="w-full flex justify-end">
                <p
                  class="text-[16px] text-[#195279] dark:text-white font-[400] text-end"
                >
                  {{ user }}
                </p>
              </div>
              <div class="w-full flex justify-end">
                <p class="text-[16px] text-[#B8B8B8] font-[400]">Account</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="w-full h-auto flex flex-col mt-10">
      <!-- Blog Images -->
      <div class="w-full h-auto dark:bg-[17181A]">
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
        <div class="w-full lg:w-[70%] h-auto flex flex-col -space-y-0 lg:pr-10">
          <div class="w-full h-auto flex flex-col gap-y-5">
            <div class="w-full h-auto flex flex-col gap-y-4">
              <div class="w-full h-auto">
                <p class="text-[#18AB53] font-[500]">
                  Published {{ utils.fromISODate(blogDetail.created_at) }}
                </p>
              </div>
              <div class="w-full h-auto">
                <h1
                  class="text-[16px] sm:text-[20px] md:text-[24px] lg:text-[28px] text-[#195279] font-[500] leading-snug dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-[#FAFAFA] dark:via-[#D4D4D4] dark:to-[#AAAAAA]"
                >
                  {{ blogDetail.title }}
                </h1>
              </div>
              <div class="w-full h-auto">
                <p class="text-[14px] text-[#535862] font-[400] leading-normal">
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
              class="w-full h-auto flex flex-col leading-loose text-[#535862] dark:text-[#DADADA] font-[500] space-y-6 lg:space-y-8 mt-5 text-[12px] sm:text-[14px] md:text-[16px]"
            >
              <p class="break-words">
                {{ blogDetail.synopsis }}
              </p>
              <!-- Content Blog -->
              <div
                class="prose max-w-none text-[#535862] dark:prose-invert prose-p:mt-2 prose-p:mb-0 prose-ul:my-0 prose-ol:my-0 prose-headings:mt-10 prose-headings:mb-3 break-words text-[12px] sm:text-[14px] md:text-[16px] font-[400] dark:[&_*]:!text-[#DADADA] prose-p:leading-loose"
                v-html="safeContent"
              ></div>
            </article>
          </div>

          <div
            class="relative w-full h-auto flex flex-row justify-between px-8 lg:px-0 pt-10"
          >
            <div class="w-auto flex flex-row gap-x-4 justify-start">
              <div class="flex flex-row justify-between space-x-0.5">
                <button
                  type="submit"
                  @click="handleLike"
                  class="w-full h-auto flex items-center transition-transform duration-150"
                  :class="[
                    isLiked
                      ? 'text-blue-800 scale-110'
                      : 'text-[#6E6E6E] dark:text-[#637381]',
                  ]"
                >
                  <LikeIcon class="w-auto h-6 sm:h-8 md:h-7 lg:h-full p-0.5" />
                </button>
                <div class="w-full h-full flex items-center justify-center">
                  <span
                    class="text-[14px] sm:text-[18px] lg:text-[18px] text-[#6E6E6E] dark:text-[#637381]"
                  >
                    {{ utils.shortNumber(blogDetail.likes) }}
                  </span>
                </div>
              </div>
              <div class="flex flex-row justify-between space-x-0.5">
                <div
                  class="w-full h-auto text-[#6E6E6E] dark:text-[#637381] flex items-center"
                >
                  <EyeIcon
                    class="w-auto h-6 sm:w-auto sm:h-8 md:w-auto md:h-7 lg:w-8 lg:h-full p-0.5"
                  />
                </div>
                <div class="w-full h-full flex items-center justify-center">
                  <span
                    class="text-[14px] sm:text-[18px] lg:text-[18px] text-[#6E6E6E] dark:text-[#637381]"
                  >
                    {{ utils.shortNumber(blogDetail.views) }}
                  </span>
                </div>
              </div>
              <div class="flex flex-row justify-between space-x-0.5">
                <div
                  class="w-full h-auto text-[#6E6E6E] dark:text-[#637381] flex items-center"
                >
                  <CommentIcon
                    class="w-auto h-6 sm:w-auto sm:h-8 md:w-auto md:h-7 lg:w-8 lg:h-full p-0.5"
                  />
                </div>
                <div class="w-full h-full flex items-center justify-center">
                  <span
                    class="text-[14px] sm:text-[18px] lg:text-[18px] text-[#6E6E6E] dark:text-[#637381]"
                  >
                    {{ blogDetail.comments }}
                  </span>
                </div>
              </div>
            </div>
            <div class="relative flex w-auto h-auto share-wrapper justify-end">
              <div
                class="w-auto h-auto text-[#6E6E6E] dark:text-[#637381] cursor-pointer mr-5 lg:mr-0"
                @click.stop="toggleShare(blogDetail.id)"
              >
                <ShareIcon
                  class="w-auto h-6 sm:w-auto sm:h-8 md:w-auto md:h-7 lg:w-8 lg:h-full p-0.5"
                />
              </div>
              <div
                v-show="activeShareId === blogDetail.id"
                class="absolute z-30 -right-[40px] sm:-right-[40px] md:-right-[35px] lg:-right-[75px] -bottom-[190px] md:-bottom-[190px] lg:-bottom-[220px] xl:-bottom-[230px] w-[150px] lg:w-[180px] h-auto"
              >
                <div class="relative">
                  <img
                    src="@/assets/images/blog/share-frame2.svg"
                    alt=""
                    srcset=""
                    class="w-full h-auto object-cover relative"
                  />
                  <div
                    class="absolute w-full h-full top-2 lg:top-3 px-5 flex flex-col gap-y-3 sm:gap-y-3 justify-center"
                  >
                    <div
                      class="w-full h-auto cursor-pointer flex flex-row items-center gap-x-2 lg:gap-x-3"
                      @click="copyLink(blogDetail.slug)"
                    >
                      <div class="w-5 h-auto lg:w-auto lg:h-auto">
                        <img
                          src="@/assets/images/blog/copy-link.svg"
                          alt="Copy link"
                        />
                      </div>
                      <div class="w-[70%] h-auto flex items-center">
                        <span class="text-[14px] text-[#8C8C8C]"
                          >Copy Link</span
                        >
                      </div>
                    </div>
                    <div class="w-full h-[1px] bg-[#EBEBEB]" />
                    <div
                      class="w-full h-auto flex flex-col gap-y-4 lg:gap-y-5 cursor-pointer"
                    >
                      <!-- Linked In -->
                      <div
                        class="w-full h-auto cursor-pointer flex flex-row gap-x-2 lg:gap-x-3"
                      >
                        <div class="w-5 h-auto lg:w-auto lg:h-auto">
                          <img
                            src="@/assets/images/blog/linkedin.png"
                            alt=""
                            srcset=""
                          />
                        </div>
                        <div class="w-[70%] h-auto flex items-center">
                          <span class="text-[14px] text-[#8C8C8C]"
                            >LinkedIn</span
                          >
                        </div>
                      </div>
                      <!-- Facebook -->
                      <div
                        class="w-full h-auto cursor-pointer flex flex-row gap-x-2 lg:gap-x-3"
                      >
                        <div class="w-5 h-auto lg:w-auto lg:h-auto">
                          <img
                            src="@/assets/images/blog/facebook.png"
                            alt=""
                            srcset=""
                          />
                        </div>
                        <div class="w-[70%] h-auto flex items-center">
                          <span class="text-[14px] text-[#8C8C8C]"
                            >Facebook</span
                          >
                        </div>
                      </div>
                      <!-- Twitter -->
                      <div
                        class="w-full h-auto cursor-pointer flex flex-row gap-x-2 lg:gap-x-3"
                      >
                        <div class="w-5 h-auto lg:w-auto lg:h-auto">
                          <img
                            src="@/assets/images/blog/twitter.png"
                            alt=""
                            srcset=""
                          />
                        </div>
                        <div class="w-[70%] h-auto flex items-center">
                          <span class="text-[14px] text-[#8C8C8C]"
                            >Twitter(X)</span
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
                class="hidden lg:flex w-full h-auto p-[1px] rounded-[10px] bg-[#D9D9D9] dark:bg-gradient-to-tl dark:from-[#17181A] dark:from-45% dark:to-[#565656]"
              >
                <div
                  class="w-full h-auto rounded-[10px] pt-2 hidden lg:flex lg:flex-col bg-[#FAFAFA] dark:bg-[#1D1F23]"
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
                      class="w-full h-auto"
                    >
                      <figure class="w-full h-auto">
                        <img
                          :src="popularBlog[0].cover"
                          alt="cover"
                          class="w-full h-[180px] lg:h-auto object-fill"
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
                          <div
                            class="w-full h-auto grid grid-cols-12 pr-10 py-4"
                          >
                            <div class="col-span-3 w-full flex justify-center">
                              <p class="text-[24px] text-[#8EB3CC]">
                                #{{ index + 1 }}
                              </p>
                            </div>
                            <div
                              class="col-span-9 w-full flex flex-col gap-y-2"
                            >
                              <p
                                class="text-[#6941C6] dark:text-[#2AB857] text-[14px]"
                              >
                                {{ data.category_name }}
                              </p>
                              <p
                                class="text-[#195279] h-[45px] font-[500] text-[16px] leading-snug line-clamp-2 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-[#FAFAFA] dark:via-[#D4D4D4] dark:to-[#AAAAAA]"
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
      </div>
    </section>
    <!-- Comments -->
    <section class="w-full lg:w-[70%] h-auto pt-10 flex flex-col lg:pr-10">
      <div class="w-full h-auto flex flex-col">
        <div class="w-full">
          <p class="text-[#374151] font-[500]">
            Comments ({{ blogDetail?.comments_data?.length || 0 }})
          </p>
        </div>
        <form @submit.prevent="handleSubmitComment">
          <div class="w-full mt-4 rounded-[8px]">
            <textarea
              ref="commentTextArea"
              v-model="inputCommentData.comment"
              type="text"
              rows="2"
              class="w-full pl-4 py-2 bg-[#EBEBEB] rounded-[8px] focus:outline-none cursor-pointer"
              placeholder="Share your thoughts?"
              @focus="toggledTextareaIsFocused"
              required
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
              type="submit"
              class="w-auto h-auto bg-green-500 text-[#FAFAFA] px-8 py-2 rounded-md"
            >
              <p>Send</p>
            </button>
          </div>
        </form>
      </div>
      <!-- Comments Display -->
      <div class="w-full h-auto flex flex-col mt-14 space-y-6">
        <div
          v-for="(comment, index) in blogDetail?.comments_data"
          :key="index"
          class="w-full h-auto flex flex-col gap-y-0 mb-6"
        >
          <div class="w-full h-auto flex flex-col">
            <div class="w-full h-auto">
              <p
                class="text-[16px] md:text-[18px] lg:text-[20px] font-[500] text-[#323232] dark:text-[#FAFAFA]"
              >
                {{ comment.user }}
              </p>
            </div>
            <div class="w-full h-auto mt-4 mb-2">
              <p
                class="text-[14px] md:text-[16px] lg:text-[18px] font-[400] text-[#7A808D]"
              >
                {{ comment.content }}
              </p>
            </div>
          </div>
          <div class="w-full h-auto">
            <p
              class="text-[14px] md:text-[16px] lg:text-[18px] font-[400] text-[#2AB857]"
            >
              <!-- {{ comment.date }} -->
              {{ utils.fromISODate(comment.created_at) }}
            </p>
          </div>
          <!-- <div
            v-if="index !== blogDetail.value?.comments_data.length - 1"
            class="w-full h-[1px] bg-gray-400"
          /> -->
        </div>
      </div>
    </section>
  </div>
  <div v-else>Blog tidak ditemukan.</div>

  <!-- Login -->
  <Transition
    enter-active-class="animate__animated animate__fadeIn duration-75"
    leave-active-class="animate__animated animate__fadeOut duration-75"
  >
    <div
      v-if="showLoginForm"
      class="fixed z-50 top-0 left-0 w-full h-full bg-[#2F2F2F]/60 px-8 md:px-16 lg:px-0"
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
          class="w-full h-full flex flex-col space-y-4 lg:space-y-4 items-center justify-center px-12 lg:px-6"
        >
          <div class="w-full h-auto flex flex-col leading-normal">
            <div class="w-full h-auto">
              <p
                class="md:text-[32px] lg:text-[38px] font-[500] text-[#195279]"
              >
                Sign In
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
            class="w-full h-auto flex flex-col space-y-4 lg:space-y-4"
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
                v-model="loginData.email"
                autocomplete="email"
                placeholder="example@email.com"
                class="w-full pr-10 pl-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#2AB857]"
                :class="{ 'border-red-500 focus:ring-red-500': loginError }"
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
                  v-model="loginData.password"
                  placeholder="Password"
                  autocomplete="current-password"
                  class="w-full pr-10 pl-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-0 focus:ring-[#2AB857]"
                  :class="{ 'border-red-500 focus:ring-red-500': loginError }"
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
            <div
              v-if="loginError"
              class="w-full h-auto flex justify-center animate__animated animate__fadeIn duration-300"
            >
              <p class="text-red-500 font-[500]">Email Atau Password Salah</p>
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
              <button @click="openRegisterForm">
                <span class="text-[#2AB857]">Sign Up</span>
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  </Transition>

  <!-- Register -->
  <Transition
    enter-active-class="animate__animated animate__fadeIn duration-75"
    leave-active-class="animate__animated animate__fadeOut duration-75"
  >
    <div
      v-if="showRegisterForm"
      class="fixed z-50 top-0 left-0 w-full h-full bg-[#2F2F2F]/60 px-8 md:px-16 lg:px-0"
    >
      <div
        class="w-full lg:w-[60%] mx-auto relative top-1/2 -translate-y-1/2 bg-white flex flex-col rounded-xl p-8 space-y-3"
      >
        <div
          class="relative flex justify-end items-end w-full h-auto text-[#ACACAC] rounded-t-xl"
        >
          <button @click="closeRegisterForm">
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
                Sign Up
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
            @submit.prevent="handleRegister"
            class="w-full h-auto flex flex-col space-y-4 lg:space-y-6"
          >
            <div class="w-full h-auto">
              <label
                for="email"
                class="block text-sm font-medium text-gray-700 mb-1"
              >
                Full Name
              </label>
              <input
                required
                id="fullname"
                v-model="registerData.fullname"
                autocomplete="name"
                placeholder="Fullname"
                class="w-full pr-10 pl-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#2AB857]"
              />
            </div>
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
                v-model="registerData.email"
                autocomplete="email"
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
                  :type="showPasswordRegister ? 'text' : 'password'"
                  v-model="registerData.password"
                  placeholder="Password"
                  autocomplete="new-password"
                  class="w-full pr-10 pl-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#2AB857]"
                />
                <!-- Tombol toggle mata -->
                <button
                  type="button"
                  @click="togglePasswordRegister"
                  class="absolute inset-y-0 right-0 pr-3 flex items-center focus:outline-none"
                >
                  <!-- Ikon Mata Terbuka -->
                  <svg
                    v-if="!showPasswordRegister"
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
              Do you have account?
              <button @click="openLoginForm">
                <span class="text-[#2AB857]">Sign In</span>
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>
