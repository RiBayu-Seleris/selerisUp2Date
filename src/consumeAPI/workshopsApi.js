import axios from "axios";
import { ref } from "vue";

export const SENTRIS_BASE_URL = import.meta.env.DEV
  ? ""
  : (import.meta.env.VITE_API_URL ?? "");

const API = `${SENTRIS_BASE_URL}/api/v1/app`;
const HEADERS = { Accept: "application/json" };
const LIST_MAX_AGE_MS = 60_000;

export const sentrisWorkshops = ref(null);

let listRequest = null;
let listFetchedAt = 0;

export const loadWorkshopList = ({ fresh = false } = {}) => {
  const stale = Date.now() - listFetchedAt > LIST_MAX_AGE_MS;
  if (!listRequest || (fresh && stale)) {
    listRequest = axios
      .get(`${API}/workshops`, { headers: HEADERS })
      .then(({ data }) => {
        const list = Array.isArray(data?.data) ? data.data : [];
        sentrisWorkshops.value = list;
        listFetchedAt = Date.now();
        return list;
      })
      .catch((error) => {
        listRequest = null;
        throw error;
      });
  }
  return listRequest;
};

const detailRequests = new Map();

export const loadWorkshopDetail = (slug) => {
  if (!detailRequests.has(slug)) {
    detailRequests.set(
      slug,
      axios
        .get(`${API}/workshops/${encodeURIComponent(slug)}`, {
          headers: HEADERS,
        })
        .then(({ data }) => data?.data ?? null)
        .catch((error) => {
          if (error.response?.status === 404) return null;
          detailRequests.delete(slug);
          throw error;
        }),
    );
  }
  return detailRequests.get(slug);
};
