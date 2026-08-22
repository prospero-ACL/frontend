import api from '../api';
import appSlice from './app.reducer';
import authSlice from './auth.reducer';
import loadingSlice from './loading.reducer';
import reportSlice from './report.reducer';

const rootReducerMapObject = {
  auth: authSlice,
  app: appSlice,
  loading: loadingSlice,
  report: reportSlice,
  [api.reducerPath]: api.reducer,
};
export default rootReducerMapObject;
