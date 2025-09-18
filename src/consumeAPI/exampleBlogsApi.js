import { ref } from "vue";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

const headerApi = {
  headers: {
    Accept: "application/json",
  },
};
// "ngrok-skip-browser-warning": "true",

export function blogsApi() {
  const blogs = ref([]);
  const newestBlog = ref([]);
  const popularBlog = ref([]);

  const blogDetail = ref(null);

  // Error Per Section
  const newestError = ref(null);
  const popularError = ref(null);
  const blogsError = ref(null);

  // Error Global
  const error = ref(null);

  // Loading State
  const loading = ref(false);
  const startLoading = () => (loading.value = true);
  const stopLoading = () => (loading.value = false);

  const handleError = (err) => {
    if (err.response) {
      error.value = `Error ${err.response.status}: ${err.response.statusText}`;
    } else if (err.request) {
      error.value = "Server tidak merespon. Coba lagi nanti.";
    } else {
      error.value = "Terjadi kesalahan: " + err.message;
    }
  };
  //End Loading counter

  const getAllBlogs = async () => {
    startLoading();
    try {
      const response = await axios.get(
        `${BASE_URL}/api/v1/app/blogs`,
        headerApi
      );
      if (response.data.status !== 200) {
        console.log("Blogs Data Not Found");
        return;
      }

      blogs.value = response.data.data;
    } catch (err) {
      handleError(err);
    } finally {
      stopLoading();
    }
  };

  // Function get blog detail by slug
  const getBlogBySlug = async (slug) => {
    startLoading();
    error.value = null;

    // console.log("Slug yang dikirim:", slug);
    try {
      const response = await axios.get(
        `${BASE_URL}/api/v1/app/blogs/${slug}`,
        headerApi
      );

      blogDetail.value = response.data?.data || null;
    } catch (err) {
      if (err.response && err.response.status === 404) {
        // Kalau 404, jangan console.error, langsung kasih nilai null atau pesan sendiri
        blogDetail.value = null;
        error.value = "Blog tidak ditemukan.";
      } else {
        handleError(err);
      }
    } finally {
      stopLoading();
    }
  };

  const getNewestBlog = async () => {
    startLoading();
    newestError.value = null;
    error.value = null; //Reset Error Global

    try {
      const res = await axios.get(
        `${BASE_URL}/api/v1/app/blogs/newest`,
        headerApi
      );
      const { status, data, message } = res.data || {};

      if (status !== 200 || !data) {
        newestError.value = message;
        newestBlog.value = null;
        return;
      }

      newestBlog.value = data;
    } catch (err) {
      // Error Global
      handleError(err);

      // Error khusus Newest
      newestError.value =
        err.response?.data?.message || "Gagal memuat blog terbaru";
    } finally {
      stopLoading();
    }
  };

  // get Popular Blog
  const getPopularBlog = async () => {
    startLoading();
    try {
      const ress = await axios.get(
        `${BASE_URL}/api/v1/app/blogs/popular`,
        headerApi
      );
      const { status, data, message } = res.data || {};

      if (status !== 200) {
        popularError.value = message || "Terjadi kesalahan pada popular blog";
        popularBlog.value = null;
        return;
      }

      if (!data || data.length === 0) {
        // Sukses tapi data kosong
        popularError.value = "Blog popular belum ada";
        popularBlog.value = [];
        return;
      }

      // Sukses dan ada data
      popularError.value = null;
      popularBlog.value = response.data.data;
    } catch (err) {
      // Error Global
      handleError(err);

      // Popular Error
      popularError.value = err.response?.data?.message || err.message;
      popularBlog.value = null;
    } finally {
      stopLoading();
    }
  };

  return {
    blogs,
    blogDetail,
    newestBlog,
    popularBlog,
    getAllBlogs,
    getBlogBySlug,
    getNewestBlog,
    getPopularBlog,
    error,
    loading,
    newestError,
    popularError,
    blogsError,
  };
}
