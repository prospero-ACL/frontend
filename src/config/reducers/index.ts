import api from '../api';
import appSlice from './app.reducer';
import authSlice from './auth.reducer';

const rootReducerMapObject = {
  auth: authSlice,
  app: appSlice,
  [api.reducerPath]: api.reducer,
};
export default rootReducerMapObject;
