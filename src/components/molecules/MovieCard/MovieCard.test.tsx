import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';

import { MovieCard } from './MovieCard';
import { store } from '../../../redux/store';

const renderWithStore = (component: React.ReactNode) =>
  render(<Provider store={store}>{component}</Provider>);

describe('MovieCard component', () => {
  const mockFilm = {
    id: '1',
    title: 'My Neighbor Totoro',
    original_title: 'となりのトトロ',
    original_title_romanised: 'Tonari no Totoro',
    image: 'totoro.jpg',
    movie_banner: 'banner.jpg',
    director: 'Hayao Miyazaki',
    producer: 'Toru Hara',
    release_date: '1988',
    running_time: '86',
    rt_score: '93',
    description: 'A heartwarming film about forest spirits.',
    people: [],
    species: [],
    locations: [],
    vehicles: [],
    url: '',
    searchTerm: '',
  };

  it('deve renderizar o título e diretor', () => {
    renderWithStore(<MovieCard {...mockFilm} />);
    expect(screen.getByText(/My Neighbor Totoro/i)).toBeInTheDocument();
    expect(screen.getByText(/Hayao Miyazaki/i)).toBeInTheDocument();
  });

  it('deve alternar favorito ao clicar no botão de coração', () => {
    renderWithStore(<MovieCard {...mockFilm} />);
    const heartButton = screen.getByRole('button', { name: /favorite/i });
    fireEvent.click(heartButton);
    const state = store.getState().movies;
    expect(state.favorites).toContain('1');
  });

  it('deve marcar como assistido', () => {
    renderWithStore(<MovieCard {...mockFilm} />);
    const eyeButton = screen.getByRole('button', { name: /watched/i });
    fireEvent.click(eyeButton);
    const state = store.getState().movies;
    expect(state.watched).toContain('1');
  });
});
