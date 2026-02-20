import { useEffect, useState } from 'react';
import { getFilms } from '../../services/ghibli';
import { Film } from '../../types/films';
import { MovieCard } from '../molecules/MovieCard/MovieCard';
import { sortOptions } from '../../constants/sortOptions';
import { SelectTypes } from '../../types/inputs';

const Home = () => {
  const [films, setFilms] = useState<Film[]>([]);
  const [search, setSearch] = useState('');
  const [searchInDescription, setSearchInDescription] = useState(false);

  useEffect(() => {
    getFilms().then(setFilms);
  }, []);

  const filteredFilms = films.filter((film) => {
    const titleMatch = film.title.toLowerCase().includes(search.toLowerCase());
    const descriptionMatch = searchInDescription
      ? film.description.toLowerCase().includes(search.toLowerCase())
      : false;

    return titleMatch || descriptionMatch;
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
            Incluir sinopse na busca
          </label>
          <select className="border rounded px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm">
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
        {filteredFilms.map((film) => (
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
