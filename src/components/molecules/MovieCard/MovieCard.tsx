import React, { useState } from 'react';
import { FaEye, FaHeart, FaRegNoteSticky, FaStar } from 'react-icons/fa6';


import { MovieCardProps } from '../../../types/films';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { toggleFavorite, toggleWatched } from '../../../redux/moviesSlice';
import { minutesToHourLabel } from '../../../misc/format';
import { Button } from '../../atoms/Button/Button';
import { NotesModal } from '../../organisms/NotesModal';

export const MovieCard: React.FC<MovieCardProps> = ({
  id,
  title,
  release_date,
  running_time,
  rt_score,
  description,
  director,
  producer,
  image,
  searchTerm,
}) => {
  const [showNotesModal, setShowNotesModal] = useState(false);

  const dispatch = useAppDispatch();
  const watched = useAppSelector((state) => state.movies.watched);
  const favorites = useAppSelector((state) => state.movies.favorites);
  const ratings = useAppSelector((state) => state.movies.ratings);
  const notes = useAppSelector((state) => state.movies.notes);

  const isWatched = watched.includes(id);
  const isFavorite = favorites.includes(id);

  const isRated = ratings[id];
  const isNoted = notes[id];
  console.log('isRated', isRated)

  return (
    <div className="bg-white border rounded-lg shadow-md overflow-hidden flex flex-col">
      <img src={image} alt={title} className="h-72 w-full object-cover" />
      <div className="p-4 flex flex-col flex-1">
        <h2 className="text-lg font-bold mb-1">{title}</h2>
        <p className="text-sm text-gray-500 mb-2">
          {release_date} • {minutesToHourLabel(Number(running_time))}
        </p>
        <div className="flex items-center justify-between mb-2">
          <p className="flex items-center text-yellow-500 font-semibold gap-1">
            <FaStar />
            <span>{rt_score}%</span>
          </p>
          {isRated && (
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  className={star <= isRated ? 'text-yellow-500' : 'text-gray-300'}
                />
              ))}
            </div>
          )}
        </div>
        <p className="text-gray-700 text-sm mb-2">
          {searchTerm
            ? description
                .split(new RegExp(`(${searchTerm})`, 'gi'))
                .map((part, i) =>
                  part.toLowerCase() === searchTerm.toLowerCase() ? (
                    <span key={i} className="bg-yellow-200">
                      {part}
                    </span>
                  ) : (
                    part
                  ),
                )
            : description.length > 100
              ? description.substring(0, 100) + '...'
              : description}
        </p>
        <div className="flex flex-col text-gray-500 text-xs mb-4">
          <span>Director: {director}</span>
          <span>Producer: {producer}</span>
        </div>
        {isNoted && (
          <div className="p-2 bg-blue-50 text-xs mb-3 rounded-lg">
            <div className="flex items-center text-blue-600 gap-1">
              <FaRegNoteSticky />
              <span>Your Notes:</span>
            </div>
            <p className="mt-1">{notes[id]}</p>
          </div>
        )}
        <div className="mt-auto flex flex-col gap-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <Button
              onClick={() => dispatch(toggleWatched(id))}
              className={
                isWatched
                  ? 'bg-success text-dark'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }
            >
              <FaEye />
              {isWatched ? 'Watched' : 'Mark Watched'}
            </Button>
            <Button
              onClick={() => dispatch(toggleFavorite(id))}
              className={
                isFavorite
                  ? 'bg-error'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }
            >
              <FaHeart />
              {isFavorite ? 'Favorite' : 'Add Favorite'}
            </Button>
          </div>
          <Button onClick={() => setShowNotesModal(true)}
            className={
                isNoted
                  ? 'bg-warning text-dark'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }>
            <FaRegNoteSticky />
            {isNoted ? "Edit Notes" : "Add Notes"}
          </Button>
        </div>
      </div>

      {showNotesModal && (
        <NotesModal
          id={id}
          title={title}
          onClose={() => setShowNotesModal(false)}
        />
      )}
    </div>
  );
};
