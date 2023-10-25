import { configureStore } from '@reduxjs/toolkit';
import masterReducer from './master/masterSlice';

export default configureStore({
  reducer: {
    master: masterReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});