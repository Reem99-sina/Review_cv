import axios from "axios";
// import { triggerLogout } from "../contexts/authEvents";
import { clearAuthStorage, loadToken } from "../lib/storage";

const api = axios.create();

api.interceptors.request.use(async (config) => {
  const token = await loadToken();

  const isFormData =
    typeof FormData !== "undefined" &&
    config.data &&
    config.data.constructor &&
    config.data.constructor.name === "FormData";

  config.headers = config.headers || {};

  if (token) {
    config.headers.Authorization = `Bearer ${token.toString().trim()}`;
  }

  // Only set JSON header if NOT FormData
  if (!isFormData && config.data) {
    config.headers["Content-Type"] = "application/json";
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
   
    const status = error?.response?.status;

    if (status === 401 || status === 403) {
      await clearAuthStorage();
      await triggerLogout();
      throw new Error("Unauthorized");
    }

    const message =
      error?.response?.data?.message ||error?.response?.data?.error|| "Request failed";

    return Promise.reject(new Error(message));
  }
);

export async function apiRequest(path: string, options: any = {}) {
  const response = await api.request({
    url: path,
    ...options,
    data:options?.body
  });

  return response.data;
}

let logoutFn: (() => void) | null = null;

export const setLogoutFn = (fn: () => void) => {
  logoutFn = fn;
};

export const triggerLogout = () => {
  logoutFn?.();
};