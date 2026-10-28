import api from '../api';
import appSlice from './app.reducer';
import authSlice from './auth.reducer';
import conversationSlice from './conversation.reducer';
import loadingSlice from './loading.reducer';
import modalsSlice from './modals.reducer';

const rootReducerMapObject = {
  auth: authSlice,
  app: appSlice,
  loading: loadingSlice,
  modals: modalsSlice,
  conversation: conversationSlice,
  [api.reducerPath]: api.reducer,
};
export default rootReducerMapObject;
