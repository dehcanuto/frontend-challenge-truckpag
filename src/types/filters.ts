export interface FiltersState {
  watched: boolean;
  favorites: boolean;
  withNotes: boolean;
  rating: string;
  sortValue: string;
  search: string;
  searchInDescription: boolean;
}

export type MovieFiltersState = Pick<
  FiltersState,
  'watched' | 'favorites' | 'withNotes' | 'rating'
>;

export interface MovieFiltersProps {
  filters: FiltersState;
  onFilterChange: (filters: {
    watched: boolean;
    favorites: boolean;
    withNotes: boolean;
    rating: string;
  }) => void;
}

export interface MovieFiltersProps {
  filters: FiltersState;
  onFilterChange: (filters: MovieFiltersState) => void;
}
