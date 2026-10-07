import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ConversationState = {
  id: string | null;
};

const initialState: ConversationState = {
  id: null,
};

const conversationSlice = createSlice({
  name: 'conversation',
  initialState,
  reducers: {
    setConversationId: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
    },
    clearConversationId: (state) => {
      state.id = null;
    },
  },
});

export const { setConversationId, clearConversationId } = conversationSlice.actions;

export default conversationSlice.reducer;
