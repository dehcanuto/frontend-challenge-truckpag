import { useEffect, useState } from 'react';
import { getFilms } from '../../services/ghibli';
import { Film } from '../../types/films';
import { MovieCard } from '../molecules/MovieCard/MovieCard';
import { sortOptions } from '../../constants/sortOptions';
import { SelectTypes } from '../../types/inputs';
import { useAppSelector } from '../../redux/hooks';

const Home = () => {
  const [films, setFilms] = useState<Film[]>([]);
  const [search, setSearch] = useState('');
  const [searchInDescription, setSearchInDescription] = useState(false);
  const [sortValue, setSortValue] = useState('default');

  useEffect(() => {
    getFilms().then(setFilms);
  }, []);

  const ratings = useAppSelector((state) => state.movies.ratings);

  const filteredFilms = films.filter((film) => {
    const titleMatch = film.title.toLowerCase().includes(search.toLowerCase());
    const descriptionMatch = searchInDescription
      ? film.description.toLowerCase().includes(search.toLowerCase())
      : false;

    return titleMatch || descriptionMatch;
  });

  const filmsWithRating = filteredFilms.map((film) => ({
    ...film,
    personal_rating: ratings[film.title] || 0,
  }));

  const sortedFilms = [...filmsWithRating].sort((a, b) => {
    if (sortValue === 'default') return 0;

    let field: 'title' | 'running_time' | 'personal_rating' | 'rt_score' =
      'title';
    let direction: 'asc' | 'desc' = 'asc';

    if (sortValue.includes('-')) {
      const [f, d] = sortValue.split('-');
      switch (f) {
        case 'title':
          field = 'title';
          break;
        case 'duration':
          field = 'running_time';
          break;
        case 'rating':
          field = 'personal_rating';
          break;
        case 'score':
          field = 'rt_score';
          break;
      }
      direction = d as 'asc' | 'desc';
    }

    let aValue: string | number =
      field === 'title' ? a.title.toLowerCase() : Number(a[field] || 0);
    let bValue: string | number =
      field === 'title' ? b.title.toLowerCase() : Number(b[field] || 0);

    if (aValue < bValue) return direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return direction === 'asc' ? 1 : -1;
    return 0;
  });

  return (
    <div className="p-4">
      <div className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Filtrar filmes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded px-2 py-2 w-full rounded-lg focus:outline-none focus:ring-0"
        />
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={searchInDescription}
              onChange={() => setSearchInDescription(!searchInDescription)}
            />
            Include movie synopsis in search
          </label>
          <select
            className="border rounded px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
            value={sortValue}
            onChange={(e) => setSortValue(e.target.value)}
          >
            {sortOptions.map((option: SelectTypes) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="mb-4 flex flex-col sm:flex-row items-start sm:items-center gap-4"></div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {sortedFilms.map((film) => (
          <MovieCard
            key={film.title}
            {...film}
            searchTerm={searchInDescription ? search : ''}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
