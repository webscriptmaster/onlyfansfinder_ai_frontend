import axios, { InternalAxiosRequestConfig } from "axios";

import {
  getLocalAccessToken,
  getLocalRefreshToken,
  setLocalAccessToken
} from "@/lib/auth";
import { AUTHORIZATION_PREFIX } from "@/utils/constants";

const baseURL = process.env.NEXT_PUBLIC_API_URL || "";

const api = () => {
  // Create a new axios instance
  const instance = axios.create({
    baseURL,
    withCredentials: true,
    timeout: 20000,
    timeoutErrorMessage: "Timeout error occurred. Please try again later."
  });

  // Add a request interceptor
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const newConfig = { ...config };

      const accessToken = getLocalAccessToken();
      if (accessToken) {
        newConfig.headers.Authorization = `${AUTHORIZATION_PREFIX} ${accessToken}`;
      }

      return newConfig;
    },
    (error) => Promise.reject(error)
  );

  // Add a response interceptor
  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const errorConfig = error.config;

      if (error.response && errorConfig.url !== "/auth/login") {
        if (error.response.status === 401 && !errorConfig._retry) {
          errorConfig._retry = true;

          try {
            const res = await axios.post(`${baseURL}/auth/regenerate-token`, {
              refreshToken: getLocalRefreshToken()
            });
            const { accessToken } = res.data;
            setLocalAccessToken(accessToken);

            errorConfig.headers.Authorization = `${AUTHORIZATION_PREFIX} ${accessToken}`;
            return await instance(errorConfig);
          } catch (_error: any) {
            if (_error.response && _error.response.data) {
              return Promise.reject(_error.response.data);
            }
            return Promise.reject(_error);
          }
        }

        if (error.response.status === 403 && error.response.data) {
          return Promise.reject(error.response.data);
        }
      }

      return Promise.reject(error);
    }
  );

  return instance;
};

export default api;
