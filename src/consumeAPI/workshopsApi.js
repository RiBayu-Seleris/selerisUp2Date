import axios from "axios";
import { ref } from "vue";

export const SENTRIS_BASE_URL = import.meta.env.DEV
  ? ""
  : (import.meta.env.VITE_API_URL ?? "");

const API = `${SENTRIS_BASE_URL}/api/v1/app`;
const HEADERS = { Accept: "application/json" };
const MAX_AGE_MS = 60_000;

export const sentrisWorkshops = ref(null);

let listRequest = null;
let listFetchedAt = 0;
let listJson = "";

export const loadWorkshopList = ({ fresh = false } = {}) => {
  const stale = Date.now() - listFetchedAt > MAX_AGE_MS;
  if (!listRequest || (fresh && stale)) {
    listRequest = axios
      .get(`${API}/workshops`, { headers: HEADERS })
      .then(({ data }) => {
        const list = Array.isArray(data?.data) ? data.data : [];
        const json = JSON.stringify(list);
        if (json !== listJson) {
          listJson = json;
          sentrisWorkshops.value = list;
        }
        listFetchedAt = Date.now();
        return sentrisWorkshops.value;
      })
      .catch((error) => {
        listRequest = null;
        throw error;
      });
  }
  return listRequest;
};

const detailRequests = new Map();

export const loadWorkshopDetail = (slug, { fresh = false } = {}) => {
  const cached = detailRequests.get(slug);
  if (!cached || (fresh && Date.now() - cached.at > MAX_AGE_MS)) {
    const promise = axios
      .get(`${API}/workshops/${encodeURIComponent(slug)}`, {
        headers: HEADERS,
      })
      .then(({ data }) => data?.data ?? null)
      .catch((error) => {
        if (error.response?.status === 404) return null;
        if (detailRequests.get(slug)?.promise === promise) {
          detailRequests.delete(slug);
        }
        throw error;
      });
    detailRequests.set(slug, { promise, at: Date.now() });
  }
  return detailRequests.get(slug).promise;
};
