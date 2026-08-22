import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ReportState = {
  id: string | null;
};

const initialState: ReportState = {
  id: null,
};

const reportSlice = createSlice({
  name: 'report',
  initialState,
  reducers: {
    setReportId: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
    },
    clearReportId: (state) => {
      state.id = null;
    },
  },
});

export const { setReportId, clearReportId } = reportSlice.actions;

export default reportSlice.reducer;
