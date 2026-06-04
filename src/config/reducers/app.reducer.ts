import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type AppState = {
  theme: 'light' | 'dark' | 'auto';
};

const initialState: AppState = {
  theme: 'auto',
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<'light' | 'dark' | 'auto'>) => {
      state.theme = action.payload;
    },
  },
});

export const { setTheme } = appSlice.actions;

export default appSlice.reducer;
