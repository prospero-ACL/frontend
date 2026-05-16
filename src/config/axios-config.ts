import { BaseQueryFn } from '@reduxjs/toolkit/query';
import axios, { AxiosError, AxiosRequestConfig, Method } from 'axios';

const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: undefined, // Replace with your API base URL
  headers: {
    'Content-Type': 'application/json',
    // Add any other headers or configurations you need
  },
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // You can modify the request config here, e.g., add authentication headers
    // config.headers.Authorization = `Bearer ${getToken()}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);
// api.ts

type AxiosBaseQueryArgs = {
  url: string;
  method?: Method;
  data?: AxiosRequestConfig['data'];
  params?: AxiosRequestConfig['params'];
  headers?: AxiosRequestConfig['headers'];
};

type AxiosBaseQueryError = {
  status?: number;
  data: unknown;
};

const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl?: string } = { baseUrl: '' }
  ): BaseQueryFn<AxiosBaseQueryArgs, unknown, AxiosBaseQueryError> =>
  async ({ url, method, data, params, headers }) => {
    try {
      const result = await axiosInstance({
        url: baseUrl + url,
        method,
        data,
        params,
        headers,
      });
      // result is already response.data
      // because of the interceptor
      return { data: result };
    } catch (axiosError) {
      const err = axiosError as AxiosError;

      return {
        error: {
          status: err.response?.status,
          data: err.response?.data ?? err.message,
        },
      };
    }
  };

export const axiosInstanceBootstrap = axiosInstance.create({
  withCredentials: true,
  baseURL: 'http://localhost:5173',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosBaseQuery;
