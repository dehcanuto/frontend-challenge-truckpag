import { SelectTypes } from '../types/inputs';

export const sortOptions: SelectTypes[] = [
  { value: 'default', label: 'Default' },
  { value: 'title-asc', label: 'Title (A-Z)' },
  { value: 'title-desc', label: 'Title (Z-A)' },
  { value: 'duration-asc', label: 'Duration (Shortest)' },
  { value: 'duration-desc', label: 'Duration (Longest)' },
  { value: 'rating-desc', label: 'Your Rating (Highest)' },
  { value: 'rating-asc', label: 'Your Rating (Lowest)' },
  { value: 'score-desc', label: 'Score (Highest)' },
  { value: 'score-asc', label: 'Score (Lowest)' },
];
