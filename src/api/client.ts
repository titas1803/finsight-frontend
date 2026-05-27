import axios, { type InternalAxiosRequestConfig } from "axios";
import { AuthUrls } from "../constants/enums";
import { UnVerifedEmailErrorMessage } from "@/constants/errorMessages";

const baseURL = import.meta.env.FINSIGHT_API_URL;

if (!baseURL) {
  console.error("Missing FINSIGHT_API_URL environment variable.");
}

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  timeout: 15000,
});

const clearSession = () => {
  localStorage.removeItem("user");
};

let isRefreshing: boolean = false;

let pendingQueue: {
  resolve: () => void;
  reject: (err: unknown) => void;
}[] = [];

const flushQueue = (error: unknown) => {
  pendingQueue.forEach(({ resolve, reject }) => {
    if (error) reject(error);
    else resolve();
  });
  pendingQueue = [];
};

const fetchTokens = async () => {
  return await api.post(
    `/${AuthUrls.REFRESHTOKEN}`,
    {},
    {
      withCredentials: true,
    },
  );
};

type RetryConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

// Response Interceptor
api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const original = error.config as RetryConfig;

    if (
      error.response?.data.message &&
      error.response?.data.message
        .toLowerCase()
        .includes(UnVerifedEmailErrorMessage.toLowerCase())
    ) {
      return Promise.reject(error);
    }

    if (!original) {
      return Promise.reject(error);
    }

    const isAuthRoute =
      original.url?.includes(AuthUrls.LOGIN) ||
      original.url?.includes(AuthUrls.REFRESHTOKEN) ||
      original.url?.includes(AuthUrls.REGISTER) ||
      original.url?.includes(AuthUrls.LOGOUT);
    if (isAuthRoute) {
      return Promise.reject(error);
    }

    if (error.response?.status !== 401 || original._retry) {
      return Promise.reject(error);
    }

    original._retry = true;

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        pendingQueue.push({
          resolve: () => resolve(api(original)),
          reject,
        });
      });
    }

    isRefreshing = true;

    try {
      await fetchTokens();

      flushQueue(null);

      return api(original);
    } catch (refreshError) {
      flushQueue(refreshError);

      clearSession();

      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  },
);

export default api;
