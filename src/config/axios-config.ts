import { BaseQueryFn } from '@reduxjs/toolkit/query';
import axios, { AxiosError, AxiosRequestConfig, Method } from 'axios';
import z from 'zod';

const axiosInstance = axios.create({
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

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

// Endpoints opt into response validation with `extraOptions: { dataSchema }`.
type AxiosBaseQueryExtraOptions = {
  dataSchema?: z.ZodType;
};

const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl?: string } = { baseUrl: '' }
  ): BaseQueryFn<AxiosBaseQueryArgs, unknown, AxiosBaseQueryError, AxiosBaseQueryExtraOptions> =>
  async ({ url, method, data, params, headers }, _api, extraOptions) => {
    try {
      const result = await axiosInstance({
        url: baseUrl + url,
        method,
        data,
        params,
        headers,
      });

      const schema = extraOptions?.dataSchema;
      if (!schema) {
        return { data: result.data };
      }

      const parsed = schema.safeParse(result.data);
      if (!parsed.success) {
        return {
          error: {
            status: result.status,
            data: `Response failed validation: ${z.prettifyError(parsed.error)}`,
          },
        };
      }
      return { data: parsed.data };
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

export default axiosBaseQuery;
