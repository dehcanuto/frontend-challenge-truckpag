import { useState } from 'react';
import { FaEye, FaHeart, FaRegNoteSticky, FaStar } from 'react-icons/fa6';
import { Button } from '../atoms/Button/Button';
import { MovieFiltersProps } from '../../types/filters';

export const MovieFilters = ({ filters, onFilterChange }: MovieFiltersProps) => {
  const { watched, favorites, withNotes, rating } = filters;
  const [showRatingDropdown, setShowRatingDropdown] = useState(false);

  const ratings = [
    'All Movies',
    'Any Rating ⭐',
    'Unrated',
    '5 Stars ⭐⭐⭐⭐⭐',
    '4 Stars ⭐⭐⭐⭐',
    '3 Stars ⭐⭐⭐',
    '2 Stars ⭐⭐',
    '1 Star ⭐',
  ];

  const updateFilters = (
    newValues: Partial<MovieFiltersProps['onFilterChange']>,
  ) => {
    const newState = {
      watched,
      favorites,
      withNotes,
      rating,
      ...newValues,
    };
    onFilterChange(newState);
  };

  return (
    <div className="flex flex-col">
      <span className="text-sm font-semibold mb-2">Filters:</span>
      <div className="flex flex-wrap gap-2 mb-4 items-center">
        <Button
          className={`max-w-36 px-3 py-1 rounded-md border text-sm ${
            watched
              ? 'bg-green-100 border-green-400 text-green-700'
              : 'border-gray-300 text-gray-600 hover:bg-gray-100'
          }`}
          onClick={() => updateFilters({ watched: !watched })}
        >
          <FaEye />
          Watched
        </Button>

        <Button
          className={`max-w-36 px-3 py-1 rounded-md border text-sm ${
            favorites
              ? 'bg-red-100 border-red-400 text-red-700'
              : 'border-gray-300 text-gray-600 hover:bg-gray-100'
          }`}
          onClick={() => updateFilters({ favorites: !favorites })}
        >
          <FaHeart />
          Favorites
        </Button>

        <Button
          className={`max-w-36 px-3 py-1 rounded-md border text-sm ${
            withNotes
              ? 'bg-blue-100 border-blue-400 text-blue-700'
              : 'border-gray-300 text-gray-600 hover:bg-gray-100'
          }`}
          onClick={() => updateFilters({ withNotes: !withNotes })}
        >
          <FaRegNoteSticky />
          With Notes
        </Button>

        <div className="relative">
          <Button
            className="max-w-36 px-8 py-1 rounded-md border text-sm flex items-center gap-1 border-gray-300 text-gray-600 hover:bg-gray-100"
            onClick={() => setShowRatingDropdown(!showRatingDropdown)}
          >
            <FaStar />
            Rating
          </Button>

          {showRatingDropdown && (
            <div className="absolute mt-2 bg-white shadow-lg border rounded-md w-48 p-2 z-10">
              <p className="text-sm font-semibold mb-2">
                Filter by your rating
              </p>
              {ratings.map((r) => (
                <div
                  key={r}
                  className={`text-sm p-1 rounded-md cursor-pointer ${
                    rating === r
                      ? 'bg-gray-100 font-medium'
                      : 'hover:bg-gray-50'
                  }`}
                  onClick={() => {
                    setShowRatingDropdown(false);
                    updateFilters({ rating: r });
                  }}
                >
                  {r}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
