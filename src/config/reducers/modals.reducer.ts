import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ModalName = 'login' | 'uploadTrilogy';

export type ModalsState = Record<ModalName, boolean>;

const initialState: ModalsState = {
  login: false,
  uploadTrilogy: false,
};

const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<ModalName>) => {
      state[action.payload] = true;
    },
    closeModal: (state, action: PayloadAction<ModalName>) => {
      state[action.payload] = false;
    },
  },
});

export const { openModal, closeModal } = modalsSlice.actions;

export default modalsSlice.reducer;
