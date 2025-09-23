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
  const blogDetailError = ref(null);
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
    blogDetailError.value = null;
    error.value = null; //Reset Error Global

    try {
      const response = await axios.get(
        `${BASE_URL}/api/v1/app/blogs/${slug}`,
        headerApi
      );

      blogDetail.value = response.data?.data || null;
    } catch (err) {
      // error dari API
      if (err.response) {
        // Error Global
        handleError(err);

        // Popular Error
        blogDetailError.value =
          err.response?.data?.message ||
          "Terjadi kesalahan saat memuat blog terbaru";
      } else {
        // runtime error (typo, bug kode, dll)
        console.error("Runtime Error:", err);
        blogDetailError.value = "Kesalahan internal aplikasi. Cek console.";
      }
      blogDetail.value = null;
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
      // error dari API
      if (err.response) {
        // Error Global
        handleError(err);

        // Popular Error
        newestError.value =
          err.response?.data?.message ||
          "Terjadi kesalahan saat memuat blog terbaru";
      } else {
        // runtime error (typo, bug kode, dll)
        console.error("Runtime Error:", err);
        newestError.value = "Kesalahan internal aplikasi. Cek console.";
      }
      newestBlog.value = null;
    } finally {
      stopLoading();
    }
  };

  // get Popular Blog
  const getPopularBlog = async () => {
    startLoading();
    popularError.value = null;
    error.value = null; //Reset Error Global
    try {
      const res = await axios.get(
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
      popularBlog.value = res.data.data;
    } catch (err) {
      // error dari API
      if (err.response) {
        // Error Global
        handleError(err);

        // Popular Error
        popularError.value =
          err.response?.data?.message ||
          "Terjadi kesalahan saat memuat popular blog";
      } else {
        // runtime error (typo, bug kode, dll)
        console.error("Runtime Error:", err);
        popularError.value = "Kesalahan internal aplikasi. Cek console.";
      }
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
    blogDetailError,
  };
}
