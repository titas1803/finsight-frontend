import axios, { type InternalAxiosRequestConfig } from "axios";
import { RoutePaths } from "../constants/routes";
import { AuthUrls } from "../constants/enums";

const api = axios.create({
  baseURL: import.meta.env.FINSIGHT_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Refresh Queuse

const clearSession = () => {
  localStorage.removeItem("user");
  window.location.href = RoutePaths.LOGIN;
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
  return await axios.post(
    `${import.meta.env.FINSIGHT_API_URL}/${AuthUrls.REFRESHTOKEN}`,
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

    if (!original) {
      return Promise.reject(error);
    }

    const isAuthRoute =
      original.url?.includes(AuthUrls.LOGIN) ||
      original.url?.includes(AuthUrls.REFRESHTOKEN) ||
      original.url?.includes(AuthUrls.REGISTER);

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
