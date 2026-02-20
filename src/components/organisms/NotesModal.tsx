import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setRating, setNote } from '../../redux/slices/moviesSlice';
import { Button } from '../atoms/Button/Button';

interface NotesModalProps {
  id: string;
  title: string;
  onClose: () => void;
}

export const NotesModal: React.FC<NotesModalProps> = ({
  id,
  title,
  onClose,
}) => {
  const dispatch = useAppDispatch();
  const rating = useAppSelector((state) => state.movies.ratings[id] || 0);
  const noteText = useAppSelector((state) => state.movies.notes[id] || '');

  const [currentRating, setCurrentRating] = useState(rating);
  const [currentNote, setCurrentNote] = useState(noteText);
  const [error, setError] = useState('');

  const handleSave = () => {
    if (!currentNote.trim()) {
      setError('Notes cannot be empty');
      return;
    }
    dispatch(setRating({ id, rating: currentRating }));
    dispatch(setNote({ id, note: currentNote }));
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg relative">
        <h2 className="text-lg font-bold mb-4">Add Notes for {title}</h2>
        <div className="flex items-center mb-4">
          <span className="mr-2">Your Rating:</span>
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => setCurrentRating(star)}
              className={`text-2xl ${currentRating >= star ? 'text-yellow-400' : 'text-gray-300'}`}
            >
              ★
            </button>
          ))}
          <span className="ml-2 text-sm text-slate-500">
            {currentRating ? `${currentRating}/5` : 'Not rated'}
          </span>
        </div>
        <div className="mb-4">
          <textarea
            className="border rounded p-2 w-full h-40 focus:outline-none"
            placeholder="Write your thoughts about this movie..."
            value={currentNote}
            onChange={(e) => setCurrentNote(e.target.value)}
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 border rounded">
            Cancel
          </button>
          <Button
            onClick={handleSave}
            className="max-w-36 px-4 py-2 bg-gray-700 disabled:bg-gray-400 rounded text-white"
            disabled={!currentNote.length}
          >
            Save Notes
          </Button>
        </div>
      </div>
    </div>
  );
};
