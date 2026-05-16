import { createApi } from '@reduxjs/toolkit/query/react';
import { User, userSchema } from '@/shared/dto/user';
import axiosBaseQuery from './axios-config';
import { resetUser } from './reducers/auth.reducer';

const api = createApi({
  reducerPath: 'api',
  baseQuery: axiosBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['Auth'],
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
          dispatch(resetUser());
        } catch (error) {}
      },
    }),
  }),
});

export default api;
