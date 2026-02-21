import filtersReducer, {
  setFilters,
  clearFilters,
} from '../redux/slices/filtersSlice';

describe('filtersSlice', () => {
  const initialState = {
    watched: false,
    favorites: false,
    withNotes: false,
    rating: 'All Movies',
    sortValue: 'default',
    search: '',
    searchInDescription: false,
  };

  it('deve atualizar os filtros', () => {
    const newState = filtersReducer(
      initialState,
      setFilters({ favorites: true }),
    );
    expect(newState.favorites).toBe(true);
  });

  it('deve resetar para o estado inicial', () => {
    const modified = { ...initialState, favorites: true, search: 'Totoro' };
    const state = filtersReducer(modified, clearFilters());
    expect(state).toEqual(initialState);
  });
});
