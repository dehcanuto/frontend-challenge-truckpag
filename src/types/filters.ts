export interface FiltersState {
  watched: boolean;
  favorites: boolean;
  withNotes: boolean;
  rating: string;
}

export interface MovieFiltersProps {
    filters: FiltersState;
    onFilterChange: (filters: {
    watched: boolean;
    favorites: boolean;
    withNotes: boolean;
    rating: string;
  }) => void;
}
