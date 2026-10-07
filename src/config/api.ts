import { createApi } from '@reduxjs/toolkit/query/react';
import { Conversation, ConversationCreateRequest } from '@/shared/dto/chat';
import { IngestionJob, TrilogyUpload } from '@/shared/dto/document';
import { SecurityLevelResponse } from '@/shared/dto/security-level';
import { User, userSchema } from '@/shared/dto/user';
import axiosBaseQuery from './axios-config';
import { resetUser } from './reducers/auth.reducer';

const api = createApi({
  reducerPath: 'api',
  baseQuery: axiosBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['Auth', 'Docs', 'Conversations', 'SecurityLevel'],
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
    // Returns as soon as the job is queued (202); progress is read from getIngestion.
    uploadTrilogy: builder.mutation<IngestionJob, TrilogyUpload>({
      query: ({ trilogyName, books }) => {
        const formData = new FormData();
        formData.append('trilogyName', trilogyName);
        books.forEach(({ file, position }) => {
          formData.append('files', file);
          formData.append('positions', String(position));
        });
        return {
          url: '/documents',
          method: 'POST',
          data: formData,
          headers: { 'Content-Type': undefined },
        };
      },
    }),
    getIngestion: builder.query<IngestionJob, string>({
      query: (jobId) => ({
        url: `/documents/ingestions/${jobId}`,
        method: 'GET',
      }),
    }),
    getTrilogies: builder.query<Array<string>, void>({
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
    createConversation: builder.mutation<Conversation, ConversationCreateRequest>({
      query: (body) => ({
        url: '/conversations/create',
        method: 'POST',
        data: body,
      }),
      invalidatesTags: ['Conversations'],
    }),
    continueConversation: builder.mutation<
      Conversation,
      { conversationId: string; prompt: string }
    >({
      query: ({ conversationId, prompt }) => ({
        url: `/conversations/${conversationId}/continue`,
        method: 'POST',
        data: { prompt },
      }),
      invalidatesTags: ['Conversations'],
    }),
    getConversation: builder.query<Conversation, string>({
      query: (conversationId) => ({
        url: `/conversations/${conversationId}`,
        method: 'GET',
      }),
      providesTags: ['Conversations'],
    }),
    // 204 (no conversation yet) arrives as an empty body, mapped to null.
    getLatestConversation: builder.query<Conversation | null, void>({
      query: () => ({
        url: '/conversations/latest',
        method: 'GET',
      }),
      transformResponse: (data: unknown) => (data ? (data as Conversation) : null),
      providesTags: ['Conversations'],
    }),
  }),
});

export default api;
