import moviesReducer, {
  toggleFavorite,
  toggleWatched,
  setRating,
  setNote,
  clearMovies,
} from '../redux/slices/moviesSlice';

describe('moviesSlice', () => {
  const baseState = {
    watched: [],
    favorites: [],
    notes: {},
    ratings: {},
  };

  it('deve adicionar e remover favoritos', () => {
    let state = moviesReducer(baseState, toggleFavorite('1'));
    expect(state.favorites).toContain('1');

    state = moviesReducer(state, toggleFavorite('1'));
    expect(state.favorites).not.toContain('1');
  });

  it('deve marcar e desmarcar como assistido', () => {
    let state = moviesReducer(baseState, toggleWatched('1'));
    expect(state.watched).toContain('1');

    state = moviesReducer(state, toggleWatched('1'));
    expect(state.watched).not.toContain('1');
  });

  it('deve atribuir nota corretamente', () => {
    const state = moviesReducer(baseState, setRating({ id: '1', rating: 4 }));
    expect(state.ratings['1']).toBe(4);
  });

  it('deve adicionar e atualizar anotações', () => {
    let state = moviesReducer(
      baseState,
      setNote({ id: '1', note: 'Excelente!' }),
    );
    expect(state.notes['1']).toBe('Excelente!');

    state = moviesReducer(state, setNote({ id: '1', note: 'Melhor ainda' }));
    expect(state.notes['1']).toBe('Melhor ainda');
  });

  it('deve limpar todos os dados', () => {
    const filledState = {
      watched: ['1'],
      favorites: ['2'],
      notes: { '1': 'Legal' },
      ratings: { '1': 5 },
    };
    const state = moviesReducer(filledState, clearMovies());
    expect(state).toEqual(baseState);
  });
});
