import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MoviesState {
  watched: string[];
  favorites: string[];
}

const initialState: MoviesState = {
  watched: [],
  favorites: [],
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
  },
});

export const { toggleWatched, toggleFavorite } = moviesSlice.actions;
export default moviesSlice.reducer;
