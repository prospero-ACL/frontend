import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { User } from '@/shared/dto/user';
import { axiosInstanceBootstrap } from '../axios-config';

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
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },

    resetUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(onBootStrap.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(onBootStrap.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.isLoading = false;
      })

      .addCase(onBootStrap.rejected, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.isLoading = false;
      });
  },
});

export const onBootStrap = createAsyncThunk<User, void, { rejectValue: string }>(
  'auth/onBootStrap',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstanceBootstrap.get('/api/me');

      return response.data;
    } catch (error) {
      const err = error as AxiosError;

      if (err.response?.status === 401) {
        return rejectWithValue('Unauthorized');
      }

      return rejectWithValue('Bootstrap failed');
    }
  }
);

export const { setUser, resetUser } = authSlice.actions;

export default authSlice.reducer;
