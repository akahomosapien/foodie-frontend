import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 20000,
  withCredentials: true,
});

/**
 * REQUEST INTERCEPTOR
 * Runs before every request
 */
apiClient.interceptors.request.use(
  (config) => {
    // If it's FormData, let the browser set it automatically
    if (!(config.data instanceof FormData)) {
      config.headers["Content-Type"] = "application/json";
    }

    return config;
  },
  (error) => Promise.reject(error),
);

/**
 * RESPONSE INTERCEPTOR
 * Runs after every response
 */
apiClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response?.status === 401) {
      sessionStorage.clear();

      window.location.href = "/signin";
    }
    return Promise.reject(error);
  },
);

export default apiClient;
