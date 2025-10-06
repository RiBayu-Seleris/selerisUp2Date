import { ref } from "vue";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

const token = localStorage.getItem("token");

const headerApi = {
  headers: {
    Accept: "application/json",
  },
};

const headerApiToken = {
  headers: {
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  },
};
// "ngrok-skip-browser-warning": "true",

export function blogsApi() {
  const blogs = ref([]);
  const newestBlog = ref([]);
  const popularBlog = ref([]);
  const blogDetail = ref(null);
  const categories = ref([]);

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

  // get category list
  const fetchCategory = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/v1/app/blogs/categories`,
        headerApi
      );
      if (response.data?.data) {
        categories.value = [
          { id: 0, name: "All Articles" },
          ...response.data.data,
        ];
      }
    } catch (error) {
      console.error("Gagal fetch category:", error);
    }
  };

  const getAllBlogs = async (params = {}) => {
    startLoading();
    try {
      console.log("API Params:", params); // 👈 Tambahkan ini
      const response = await axios.get(`${BASE_URL}/api/v1/app/blogs`, {
        headers: headerApi.headers,
        params,
      });

      let result = [];

      if (Array.isArray(response.data?.data)) {
        // kasus: data langsung array
        result = response.data.data;
      } else if (Array.isArray(response.data?.data?.data)) {
        // kasus: data nested (pakai pagination)
        result = response.data.data.data;
      }

      blogs.value = result;
    } catch (err) {
      handleError(err);
      blogs.value = [];
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
          "Terjadi kesalahan saat memuat blog detail";
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

  const postComment = async (payload, id) => {
    loading.value = true;
    error.value = null;

    try {
      const res = await axios.post(
        `${BASE_URL}/api/v1/app/blogs/${id}/comments`,
        payload,
        headerApiToken
      );
      return res.data;
    } catch (error) {
    } finally {
      stopLoading();
    }
  };

  return {
    categories, //Set Category
    fetchCategory, // Get Category
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
    postComment,
  };
}
