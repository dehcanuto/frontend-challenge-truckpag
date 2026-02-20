import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from './slices/moviesSlice';
import filtersReducer from './slices/filtersSlice';

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    filters: filtersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;