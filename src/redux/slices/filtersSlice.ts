import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FiltersState } from '../../types/filters';

const loadFilters = (): FiltersState => {
  try {
    const saved = localStorage.getItem('movieFilters');
    return (
      JSON.parse(saved || '{}') || {
        watched: false,
        favorites: false,
        withNotes: false,
        rating: 'All Movies',
        sortValue: 'default',
        search: '',
        searchInDescription: false,
      }
    );
  } catch {
    return {
      watched: false,
      favorites: false,
      withNotes: false,
      rating: 'All Movies',
      sortValue: 'default',
      search: '',
      searchInDescription: false,
    };
  }
};

const initialState: FiltersState = loadFilters();

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<Partial<FiltersState>>) => {
      Object.assign(state, action.payload);
      localStorage.setItem('movieFilters', JSON.stringify(state));
    },
    clearFilters: (state) => {
      state.watched = false;
      state.favorites = false;
      state.withNotes = false;
      state.rating = 'All Movies';
      state.sortValue = 'default';
      state.search = '';
      state.searchInDescription = false;
      localStorage.setItem('movieFilters', JSON.stringify(state));
    },
  },
});

export const { setFilters, clearFilters } = filtersSlice.actions;
export default filtersSlice.reducer;
