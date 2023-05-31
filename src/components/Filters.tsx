import React, { useEffect, useRef, useState } from "react";

import { Movie, TVShow, Genre } from "@/types/types";

interface MovieGenre extends Genre {
  movies: Movie[];
}

interface TVShowGenre extends Genre {
  tvShows: TVShow[];
}

interface FiltersProps {
  genres: (MovieGenre | TVShowGenre | Genre)[];
  handleSelectedGenre: (genre: Genre) => void;
  selectedGenre: Genre;
}

const Filters = ({
  genres,
  handleSelectedGenre,
  selectedGenre,
}: FiltersProps) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [isDivVisible, setDivVisible] = useState(false);

  const handleOutsideClick = (event: MouseEvent) => {
    if (divRef.current && !divRef.current.contains(event.target as Node)) {
      setDivVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const toggleDivVisibility = () => {
    setDivVisible(!isDivVisible);
  };

  const handleButtonClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    toggleDivVisibility();
  };

  const handleGenreClick = (genre: MovieGenre | TVShowGenre | Genre) => {
    if ("movies" in genre || "tvShows" in genre) {
      handleSelectedGenre(genre as MovieGenre | TVShowGenre);
    } else {
      handleSelectedGenre(genre);
    }
    setDivVisible(false);
  };
  return (
    <div>
      <div
        className={`flex items-center cursor-pointer rounded-full mt-9 transition-all duration-300 ${
          isDivVisible ? "bg-gray-900" : "hover:bg-gray-900 bg-gray-700"
        } clique`}
        onClick={handleButtonClick}>
        <div>
          <h1 className="pl-4 pr-5 font-light text-sm">{selectedGenre.name}</h1>
        </div>
        <div className="flex items-center w-5 h-9 mr-3">
          <svg className="fill-white h-5 w-5">
            <g transform="scale(0.6)">
              <path d="M28.35 11.565c.578-.538 1.433-.355 1.81.325.122.21.182.463.182.72 0 .398-.15.786-.437 1.048L18.93 23.827a1.126 1.126 0 0 1-1.555 0L6.432 13.655c-.468-.438-.563-1.198-.25-1.767.377-.681 1.23-.863 1.809-.325l10.164 9.446 10.195-9.445zM17.957 22.776a.31.31 0 0 1 .391 0l-.194-.181-.197.181zM7.436 12.581c-.006.01 0 .053-.027.028a.07.07 0 0 0 .027-.028zm21.5.024z"></path>
            </g>
          </svg>
        </div>
      </div>

      {isDivVisible && (
        <div
          ref={divRef}
          className="absolute mt-3 z-10 flex flex-col bg-neutral-900 py-5 border border-neutral-800 rounded"
          onClick={(event) => event.stopPropagation()}>
          {genres.map((genre) => {
            return (
              <div
                key={genre.id}
                className="texthover flex cursor-pointer items-center transition-all duration-200 hover:bg-neutral-800 "
                onClick={() => handleGenreClick(genre)}>
                <p
                  className={`pl-3 font-medium text-xs ${
                    genre === selectedGenre ? "opacity-100" : "opacity-0"
                  }`}>
                  |
                </p>
                <h1
                  className={`text-stone-300 hover:text-white py-1 transition-all duration-200 pl-3 pr-5 font-light text-sm ${
                    genre === selectedGenre ? "font-semibold" : "font-medium"
                  }`}>
                  {genre.name.toUpperCase()}
                </h1>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Filters;
