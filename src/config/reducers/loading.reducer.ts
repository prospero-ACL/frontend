import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type LoadingState = {
  isLoading: boolean;
};

const initialState: LoadingState = {
  isLoading: false,
};

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    setGlobalLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setGlobalLoading } = loadingSlice.actions;

export default loadingSlice.reducer;
