import { createApi } from '@reduxjs/toolkit/query/react';
import { Report, ReportCreateRequest } from '@/shared/dto/chat';
import { UploadDocument, Document } from '@/shared/dto/document';
import { SecurityLevelResponse } from '@/shared/dto/security-level';
import { User, userSchema } from '@/shared/dto/user';
import axiosBaseQuery from './axios-config';
import { resetUser } from './reducers/auth.reducer';

const api = createApi({
  reducerPath: 'api',
  baseQuery: axiosBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['Auth', 'Docs', 'Reports', 'SecurityLevel'],
  endpoints: (builder) => ({
    getUserMe: builder.query<User | null, void>({
      query: () => ({
        url: '/me',
        method: 'GET',
      }),
      providesTags: ['Auth'],
      extraOptions: {
        dataSchema: userSchema,
      },
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: '/logout',
        method: 'POST',
      }),
      invalidatesTags: ['Auth'],
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } finally {
          dispatch(resetUser());
          dispatch(api.util.resetApiState());
        }
      },
    }),
    uploadUserDocument: builder.mutation<void, UploadDocument>({
      query: ({ file, scope }) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('scope', scope);
        return {
          url: '/documents',
          method: 'POST',
          data: formData,
          headers: { 'Content-Type': undefined },
        };
      },
      invalidatesTags: ['Docs'],
    }),
    getUserDocuments: builder.query<Array<Document>, void>({
      query: () => ({
        url: '/documents',
        method: 'GET',
      }),
      providesTags: ['Docs'],
    }),
    getSecurityLevel: builder.query<SecurityLevelResponse, void>({
      query: () => ({
        url: '/me/security-level',
        method: 'GET',
      }),
      providesTags: ['SecurityLevel'],
    }),
    updateSecurityLevel: builder.mutation<void, SecurityLevelResponse>({
      query: (body) => ({
        url: '/me/security-level',
        method: 'POST',
        data: body,
      }),
      invalidatesTags: ['SecurityLevel', 'Docs'],
    }),
    createReport: builder.mutation<Report, ReportCreateRequest>({
      query: (body) => ({
        url: '/conversations/create',
        method: 'POST',
        data: body,
      }),
      invalidatesTags: ['Reports'],
    }),
    continueReport: builder.mutation<Report, { reportId: string; prompt: string }>({
      query: ({ reportId, prompt }) => ({
        url: `/conversations/${reportId}/continue`,
        method: 'POST',
        data: { prompt },
      }),
      invalidatesTags: ['Reports'],
    }),
    getReport: builder.query<Report, string>({
      query: (reportId) => ({
        url: `/conversations/${reportId}`,
        method: 'GET',
      }),
      providesTags: ['Reports'],
    }),
    getDraftReport: builder.query<Report | null, void>({
      query: () => ({
        url: '/conversations/draft',
        method: 'GET',
      }),
      transformResponse: (data: unknown) => (data ? (data as Report) : null),
      providesTags: ['Reports'],
    }),
  }),
});

export default api;
