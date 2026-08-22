import { createApi } from '@reduxjs/toolkit/query/react';
import { UploadDocument, Document } from '@/shared/dto/document';
import { User, userSchema } from '@/shared/dto/user';
import axiosBaseQuery from './axios-config';
import { resetUser } from './reducers/auth.reducer';

const api = createApi({
  reducerPath: 'api',
  baseQuery: axiosBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['Auth', 'Docs'],
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
      query: ({ file, userId, scope }) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('userId', userId);
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
    getUserDocuments: builder.query<Array<Document>, string>({
      query: (userId) => ({
        url: `/documents/${userId}`,
        method: 'GET',
      }),
      providesTags: ['Docs'],
    }),
  }),
});

export default api;
