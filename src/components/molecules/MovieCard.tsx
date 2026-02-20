import React from "react";
import { Film } from "../../types/films";
import { Button } from "../atoms/Button/Index";

export const MovieCard: React.FC<Film> = ({
  title,
  release_date,
  running_time,
  rt_score,
  description,
  director,
  producer,
  image,
}) => {
  return (
    <div className="bg-white border rounded-lg shadow-md overflow-hidden flex flex-col">
      <img src={image} alt={title} className="h-72 w-full object-cover" />
      <div className="p-4 flex flex-col flex-1">
        <h2 className="text-lg font-bold mb-1">{title}</h2>
        <p className="text-sm text-gray-500 mb-2">
          {release_date} • {running_time}
        </p>
        <p className="text-yellow-500 font-semibold mb-2">{rt_score}%</p>
        <p className="text-gray-700 text-sm mb-2">
          {description.length > 100
            ? description.substring(0, 100) + "..."
            : description}
        </p>
        <div className="flex flex-col text-gray-500 text-xs mb-4">
            <span>Director: {director}</span>
            <span>Producer: {producer}</span>
        </div>
        <div className="mt-auto flex flex-col gap-2">
            <Button>Mark Watched</Button>
            <Button>Add Favorite</Button>
            <Button>Add Notes</Button>
        </div>
      </div>
    </div>
  );
};
