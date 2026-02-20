import { useEffect, useState } from "react";

import { getFilms } from "../services/ghibli";
import { MovieCard } from "../components/molecules/MovieCard";
import { Film } from "../types/films";

export const Home = () => {
  const [films, setFilms] = useState<Film[]>([]);

  useEffect(() => {
    getFilms().then(setFilms);
  }, []);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {films.map((film) => <MovieCard {...film} />)}
      </div>
    </div>
  );
};
