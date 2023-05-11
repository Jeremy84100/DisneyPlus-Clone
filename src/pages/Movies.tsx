import Card from "@/components/layouts/MainLayout/Components/Card";
import Filters from "@/components/layouts/MainLayout/Components/Filters";
import { useState } from "react";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  genre_ids: number[];
}

interface TVShow {
  id: number;
  title: string;
  poster_path: string;
  genre_ids: number[];
}

interface Genre {
  id: number;
  name: string;
  movies: Movie[];
  tvShows: TVShow[];
}

const Movies = ({ genres, movies }: { genres: Genre[]; movies: Movie[] }) => {
  const [selectedGenre, setSelectedGenre] = useState<Genre>(
    genres.find((genre) => genre.movies.length > 0) || genres[0]
  );

  const handleSelectedGenre = (genre: Genre) => {
    setSelectedGenre(genre);
  };

  return (
    <div>
      <div className="bg-background w-full left-0 fixed flex z-30 text-center top-72px px-5% pb-6">
        <h1 className="text-5xl mt-6 mr-6 font-medium">Movies</h1>
        <Filters genres={genres} handleSelectedGenre={handleSelectedGenre} />
      </div>
      <div className="mt-28 grid grid-cols-5 gap-5">
        {selectedGenre && selectedGenre.movies
          ? selectedGenre.movies
              .slice(0, 35)
              .map((movie: Movie, index: number) => (
                <div
                  className={`col-start-${(index % 5) + 1} row-${
                    Math.floor(index / 5) + 1
                  }`}
                  key={movie.id}>
                  <Card movie={movie} />
                </div>
              ))
          : movies.slice(0, 35).map((movie: Movie, index: number) => (
              <div
                className={`col-start-${(index % 5) + 1} row-${
                  Math.floor(index / 5) + 1
                }`}
                key={movie.id}>
                <Card movie={movie} />
              </div>
            ))}
      </div>
    </div>
  );
};

export default Movies;
