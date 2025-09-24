// authApi.js
import axios from "axios";
import { ref } from "vue";

const BASE_URL = import.meta.env.VITE_API_URL;

const headerApi = {
  headers: {
    Accept: "application/json",
  },
};

// State global untuk auth (opsional, bisa diakses ulang dari komponen lain)
export const token = ref(localStorage.getItem("token") || null);
export const user = ref(null);
export const loading = ref(false);
export const error = ref(null);

const handleError = (err) => {
  if (err.response) {
    error.value = `Error ${err.response.status}: ${
      err.response.data?.message || err.response.statusText
    }`;
    return {
      status: err.response.status,
      message: err.response.data?.message || "Terjadi kesalahan server",
      data: null,
    };
  }
  if (err.request) {
    error.value = "Server tidak merespon. Coba lagi nanti.";
    return { status: 503, message: error.value, data: null };
  }
  error.value = "Terjadi kesalahan: " + err.message;
  return { status: 500, message: error.value, data: null };
};

// Fungsi Login
export const login = async (payload) => {
  loading.value = true;
  error.value = null;
  try {
    const res = await axios.post(
      `${BASE_URL}/api/v1/auth/login`,
      payload,
      headerApi
    );

    // simpan token
    if (res.data?.data?.token) {
      token.value = res.data.data.token;
      user.value = res.data.data || null;
      localStorage.setItem("token", token.value);
    }

    return res.data;
  } catch (err) {
    return handleError(err); // jangan lupa return hasil handleError
  } finally {
    loading.value = false;
  }
};

export const register = async (payload) => {
  loading.value = true;
  error.value = null;

  try {
    const res = await axios.post(
      `${BASE_URL}/api/v1/auth/register`,
      payload,
      headerApi
    );

    return res.data;
  } catch (err) {
    return handleError(err);
  } finally {
    loading.value = false;
  }
};

export const logout = () => {
  token.value = null;
  user.value = null;
  localStorage.removeItem("token");
};
