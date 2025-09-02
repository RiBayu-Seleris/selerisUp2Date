import { ref } from "vue";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

const headerApi = {
  headers: {
    Accept: "application/json",
    "ngrok-skip-browser-warning": "true",
  },
};

export function blogsApi() {
  const blogs = ref([]);
  const blogDetail = ref(null);
  const newestBlog = ref([]);
  const popularBlog = ref([]);
  const error = ref(null);
  const loading = ref(false);

  // Loading counter berapa request yang masih berjalan
  const pendingRequests = ref(0);

  const startLoading = () => {
    pendingRequests.value++;
    loading.value = true;
  };

  const stopLoading = () => {
    pendingRequests.value--;
    if (pendingRequests.value <= 0) {
      loading.value = false;
      pendingRequests.value = 0;
    }
  };

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

  // get Newest Blog
  const getNewestBlog = async () => {
    startLoading();
    error.value = null;
    try {
      const response = await axios.get(
        `${BASE_URL}/api/v1/app/blogs/newest`,
        headerApi
      );

      if (response.data.status !== 200) {
        console.log("Newest Data Not Found");
        return;
      }

      newestBlog.value = response.data.data;
    } catch (err) {
      handleError(err);
    } finally {
      stopLoading();
    }
  };

  // get Popular Blog
  const getPopularBlog = async () => {
    startLoading();
    try {
      const response = await axios.get(
        `${BASE_URL}/api/v1/app/blogs/popular`,
        headerApi
      );
      popularBlog.value = response.data.data;
    } catch (err) {
      handleError(err);
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
  };
}
