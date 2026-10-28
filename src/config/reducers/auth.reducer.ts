import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { User } from '@/shared/dto/user';
import api from '../api';

export type AuthState = {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
};

const initialState: AuthState = {
  user: null,
  isLoading: true,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isLoading = false;
    },
  },

  // Driven by api.getUserMe (dispatched once from store.ts) and api.logout.
  extraReducers: (builder) => {
    builder
      .addMatcher(api.endpoints.getUserMe.matchPending, (state) => {
        state.isLoading = true;
      })

      .addMatcher(api.endpoints.getUserMe.matchFulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.isLoading = false;
      })

      .addMatcher(api.endpoints.getUserMe.matchRejected, (state, action) => {
        // RTK Query also "rejects" a request it skipped as a duplicate; that's not a logout.
        if (action.meta.condition) return;
        authSlice.caseReducers.resetUser(state);
      })

      // On settle, not just success, so a failed POST /logout still clears the UI.
      .addMatcher(
        isAnyOf(api.endpoints.logout.matchFulfilled, api.endpoints.logout.matchRejected),
        (state) => {
          authSlice.caseReducers.resetUser(state);
        }
      );
  },
});

export const { resetUser } = authSlice.actions;

export default authSlice.reducer;
