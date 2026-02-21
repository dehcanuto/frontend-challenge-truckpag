import React from 'react';
import {
  FaChevronDown,
  FaEye,
  FaHeart,
  FaRegNoteSticky,
  FaStar,
} from 'react-icons/fa6';
import { Button } from '../atoms/Button/Button';
import { FiltersState, MovieFiltersProps } from '../../types/filters';

export const MovieFilters: React.FC<MovieFiltersProps> = ({
  filters,
  onFilterChange,
}) => {
  const { watched, favorites, withNotes, rating } = filters;
  const [showRatingDropdown, setShowRatingDropdown] = React.useState(false);

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

  const updateFilters = (newValues: Partial<FiltersState>) => {
    onFilterChange({ ...filters, ...newValues });
  };

  const ratingButtonLabel =
    rating && rating !== 'All Movies' ? rating : 'Rating';

  return (
    <div className="flex flex-col">
      <span className="text-sm font-semibold mb-2">Filters:</span>
      <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 mb-4 items-center">
        <Button
          className={`sm:max-w-36 px-3 py-1 rounded-md border text-sm ${
            watched
              ? 'bg-green-100 border-green-400 text-green-700'
              : 'border-gray-300 text-gray-600 hover:bg-gray-100'
          }`}
          onClick={() => updateFilters({ watched: !watched })}
        >
          <FaEye />
          <span className="ml-2">Watched</span>
        </Button>

        <Button
          className={`sm:max-w-36 px-3 py-1 rounded-md border text-sm ${
            favorites
              ? 'bg-red-100 border-red-400 text-red-700'
              : 'border-gray-300 text-gray-600 hover:bg-gray-100'
          }`}
          onClick={() => updateFilters({ favorites: !favorites })}
        >
          <FaHeart />
          <span className="ml-2">Favorites</span>
        </Button>

        <Button
          className={`sm:max-w-36 px-3 py-1 rounded-md border text-sm ${
            withNotes
              ? 'bg-blue-100 border-blue-400 text-blue-700'
              : 'border-gray-300 text-gray-600 hover:bg-gray-100'
          }`}
          onClick={() => updateFilters({ withNotes: !withNotes })}
        >
          <FaRegNoteSticky />
          <span className="ml-2">With Notes</span>
        </Button>

        <div className="relative">
          <Button
            className={`sm:max-w-44 px-3 py-1 rounded-md border text-sm flex items-center gap-2 ${
              ratingButtonLabel !== 'Rating'
                ? 'bg-yellow-100 border-yellow-400 text-yellow-700'
                : 'border-gray-300 text-gray-600 hover:bg-gray-100'
            }`}
            onClick={() => setShowRatingDropdown((s) => !s)}
          >
            <FaStar />
            <span className="ml-1 truncate">
              {ratingButtonLabel.replace(/[^a-zA-Z0-9\s]/g, '')}
            </span>
            <FaChevronDown className="w-3 h-3 ml-2 opacity-70" />
          </Button>

          {showRatingDropdown && (
            <div className="absolute right-0 mt-2 bg-white shadow-lg border rounded-md w-56 p-2 z-40">
              <p className="text-sm font-semibold mb-2">
                Filter by your rating
              </p>
              {ratings.map((r) => {
                const isActive = rating === r;
                return (
                  <div
                    key={r}
                    className={`flex items-center justify-between text-sm p-2 rounded-md cursor-pointer ${
                      isActive ? 'bg-gray-100 font-medium' : 'hover:bg-gray-50'
                    }`}
                    onClick={() => {
                      updateFilters({ rating: r });
                      setShowRatingDropdown(false);
                    }}
                  >
                    <div className="flex items-center text-xs gap-2">
                      <span className="flex items-center">
                        {isActive ? (
                          <span className="inline-block w-2 h-2 bg-black rounded-full mr-2" />
                        ) : (
                          <span className="inline-block w-2 h-2 border border-gray-300 rounded-full mr-2" />
                        )}
                      </span>
                      <span>{r}</span>
                    </div>
                    {isActive && (
                      <span className="text-xs text-gray-500">Selected</span>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
