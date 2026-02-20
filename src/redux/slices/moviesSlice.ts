import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MoviesState } from '../../types/state';

const loadState = (): MoviesState => {
  try {
    const saved = localStorage.getItem('moviesData');
    return saved ? JSON.parse(saved) : { watched: [], favorites: [], notes: {}, ratings: {} };
  } catch {
    return { watched: [], favorites: [], notes: {}, ratings: {} };
  }
};

const initialState: MoviesState = loadState();

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    toggleWatched: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      if (state.watched.includes(id)) {
        state.watched = state.watched.filter((f) => f !== id);
      } else {
        state.watched.push(id);
      }
      localStorage.setItem('moviesData', JSON.stringify(state));
    },
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      if (state.favorites.includes(id)) {
        state.favorites = state.favorites.filter((f) => f !== id);
      } else {
        state.favorites.push(id);
      }
      localStorage.setItem('moviesData', JSON.stringify(state));
    },
    setNote: (state, action: PayloadAction<{ id: string; note: string }>) => {
      const { id, note } = action.payload;
      state.notes[id] = note;
      localStorage.setItem('moviesData', JSON.stringify(state));
    },
    setRating: (state, action: PayloadAction<{ id: string; rating: number }>) => {
      const { id, rating } = action.payload;
      state.ratings[id] = rating;
      localStorage.setItem('moviesData', JSON.stringify(state));
    },
  },
});

export const { toggleWatched, toggleFavorite, setNote, setRating } = moviesSlice.actions;
export default moviesSlice.reducer;