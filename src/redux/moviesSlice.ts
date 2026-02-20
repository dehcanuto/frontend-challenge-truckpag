import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MoviesState } from '../types/state';

const initialState: MoviesState = {
  watched: [],
  favorites: [],
  ratings: {},
  notes: {},
};

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    toggleWatched: (state, action: PayloadAction<string>) => {
      if (state.watched.includes(action.payload)) {
        state.watched = state.watched.filter((id) => id !== action.payload);
      } else {
        state.watched.push(action.payload);
      }
    },
    toggleFavorite: (state, action: PayloadAction<string>) => {
      if (state.favorites.includes(action.payload)) {
        state.favorites = state.favorites.filter((id) => id !== action.payload);
      } else {
        state.favorites.push(action.payload);
      }
    },
    setRating: (
      state,
      action: PayloadAction<{ id: string; rating: number }>,
    ) => {
      state.ratings[action.payload.id] = action.payload.rating;
    },
    setNote: (state, action: PayloadAction<{ id: string; note: string }>) => {
      state.notes[action.payload.id] = action.payload.note;
    },
  },
});

export const { toggleWatched, toggleFavorite, setRating, setNote } =
  moviesSlice.actions;
export default moviesSlice.reducer;
