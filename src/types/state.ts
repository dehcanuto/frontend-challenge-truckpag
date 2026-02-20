export interface MoviesState {
  watched: string[];
  favorites: string[];
  ratings: Record<string, number>;
  notes: Record<string, string>;
}
