import { useEffect, useState } from 'react';
import { getFilms } from '../../services/ghibli';
import { Film } from '../../types/films';
import { MovieCard } from '../molecules/MovieCard/MovieCard';
import { sortOptions } from '../../constants/sortOptions';
import { SelectTypes } from '../../types/inputs';
import { useAppSelector } from '../../redux/hooks';
import { MovieFilters } from './MovieFilters';

const MovieList = () => {
  const [films, setFilms] = useState<Film[]>([]);
  const [search, setSearch] = useState('');
  const [searchInDescription, setSearchInDescription] = useState(false);
  const [sortValue, setSortValue] = useState('default');
  const [filters, setFilters] = useState({
    watched: false,
    favorites: false,
    withNotes: false,
    rating: 'All Movies',
  });

  const ratings = useAppSelector((state) => state.movies.ratings);
  const watchedMovies = useAppSelector((state) => state.movies.watched);
  const favoriteMovies = useAppSelector((state) => state.movies.favorites);
  const notes = useAppSelector((state) => state.movies.notes);

  useEffect(() => {
    getFilms().then(setFilms);
  }, []);

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  const clearFilters = () => {
    setSearch('');
    setSearchInDescription(false);
    setSortValue('default');
    setFilters({
      watched: false,
      favorites: false,
      withNotes: false,
      rating: 'All Movies',
    });
  };

  const textFilteredFilms = films.filter((film) => {
    const titleMatch = film.title.toLowerCase().includes(search.toLowerCase());
    const descriptionMatch = searchInDescription
      ? film.description.toLowerCase().includes(search.toLowerCase())
      : false;
    return titleMatch || descriptionMatch;
  });

  const enrichedFilms = textFilteredFilms.map((film) => ({
    ...film,
    personal_rating: ratings?.[film.id] || 0,
    watched: Boolean(watchedMovies?.includes(film.id)),
    favorite: Boolean(favoriteMovies?.includes(film.id)),
    note: notes?.[film.id] || '',
  }));

  const filteredFilms = enrichedFilms.filter((film) => {
    const { watched, favorites, withNotes, rating } = filters;

    const noFilterActive =
      !watched && !favorites && !withNotes && rating === 'All Movies';
    if (noFilterActive) return true;

    let match = false;

    if (watched && film.watched) match = true;
    if (favorites && film.favorite) match = true;
    if (withNotes && film.note.trim().length > 0) match = true;

    if (rating !== 'All Movies') {
      const ratingValue = film.personal_rating || 0;

      let ratingPass = false;
      if (rating === 'Unrated') ratingPass = ratingValue === 0;
      else if (rating === 'Any Rating ⭐') ratingPass = ratingValue > 0;
      else if (rating.match(/^[1-5]/)) {
        const target = parseInt(rating[0]);
        ratingPass = ratingValue === target;
      }

      if (watched || favorites || withNotes) {
        match = match && ratingPass;
      } else {
        match = ratingPass;
      }
    }

    return match;
  });

  const sortedFilms = [...filteredFilms].sort((a, b) => {
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
          placeholder="Search movies..."
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
        <MovieFilters filters={filters} onFilterChange={handleFilterChange} />
      </div>

      <p className="text-sm text-gray-500 mt-2">
        Showing {filteredFilms.length} of {films.length} movies
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
        {sortedFilms.length > 0 ? (
          sortedFilms.map((film) => (
            <MovieCard
              key={film.id}
              {...film}
              searchTerm={searchInDescription ? search : ''}
            />
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center text-center py-16">
            <p className="text-gray-600 text-lg font-medium mb-4">
              No movies match the selected filters.
            </p>
            <button
              onClick={clearFilters}
              className="px-4 py-2 text-sm bg-gray-900 text-white rounded-md hover:bg-blue-700 transition-all"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieList;
