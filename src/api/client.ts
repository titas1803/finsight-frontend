import axios from "axios";
import { TOKENS } from "../constants/common";
import { RoutePaths } from "../constants/routes";
import { isTokenExpired } from "../utils/jwt";
import { AuthUrls } from "../constants/enums";

const api = axios.create({
  baseURL: import.meta.env.FINSIGHT_API_URL,
  headers: {
    "Content-Type": "aaplication/json",
  },
});

// Refresh Queuse

const clearSession = () => {
  localStorage.removeItem(TOKENS.ACCESS_TOKEN);
  localStorage.removeItem(TOKENS.REFRESH_TOKEN);
  localStorage.removeItem("user");
  window.location.href = RoutePaths.LOGIN;
};

let isRefreshing: boolean = false;

let pendingQueue: {
  resolve: (token: string) => void;
  reject: (err: unknown) => void;
}[] = [];

const flushQueue = (error: unknown, token: string | null = null) => {
  pendingQueue.forEach(({ resolve, reject }) => {
    if (error) reject(error);
    else if (token) resolve(token);
  });
  pendingQueue = [];
};

const fetchTokens = async (refreshToken: string) => {
  return await axios
    .post(`${import.meta.env.FINSIGHT_API_URL}/${AuthUrls.REFRESHTOKEN}`, {
      refreshToken,
    })
    .then((response) => response.data);
};

// Request Interceptor
api.interceptors.request.use(async (config) => {
  const accessToken = localStorage.getItem(TOKENS.ACCESS_TOKEN);
  const refreshToken = localStorage.getItem(TOKENS.REFRESH_TOKEN);

  if (accessToken) {
    if (isTokenExpired(accessToken, 30) && refreshToken) {
      if (!isRefreshing) {
        isRefreshing = true;

        try {
          const data = await fetchTokens(refreshToken);
          localStorage.setItem(TOKENS.ACCESS_TOKEN, data[TOKENS.ACCESS_TOKEN]);
          localStorage.setItem(
            TOKENS.REFRESH_TOKEN,
            data[TOKENS.REFRESH_TOKEN],
          );
          flushQueue(null, data[TOKENS.ACCESS_TOKEN]);
          config.headers.Authorization = `Bearer ${data[TOKENS.ACCESS_TOKEN]}`;
        } catch (err) {
          flushQueue(err);
          clearSession();
          return Promise.reject(err);
        } finally {
          isRefreshing = false;
        }
      } else {
        return new Promise((resolve, reject) => {
          pendingQueue.push({
            resolve: (token) => {
              config.headers.Authorization = `Bearer ${token}`;
              resolve(config);
            },
            reject,
          });
        });
      }
    } else {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
  }
  return config;
});

// Response Interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;

    if (error.response?.status !== 401 || original._retry) {
      return Promise.reject(error);
    }

    original._retry = true;

    if (!isRefreshing) {
      return new Promise((resolve, reject) => {
        pendingQueue.push({
          resolve: (token) => {
            if (original.headers) {
              original.headers.Authorization = `Bearer ${token}`;
            }
            resolve(api(original));
          },
          reject,
        });
      });
    }

    isRefreshing = true;

    try {
      const refreshToken = localStorage.getItem(TOKENS.REFRESH_TOKEN);

      if (!refreshToken) throw new Error("No refresh token available");

      const data = await fetchTokens(refreshToken);

      localStorage.setItem(TOKENS.ACCESS_TOKEN, data[TOKENS.ACCESS_TOKEN]);
      localStorage.setItem(TOKENS.REFRESH_TOKEN, data[TOKENS.REFRESH_TOKEN]);

      flushQueue(null, data[TOKENS.ACCESS_TOKEN]);

      if (original.headers)
        original.headers.Authorization = `Bearer ${data[TOKENS.ACCESS_TOKEN]}`;

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
