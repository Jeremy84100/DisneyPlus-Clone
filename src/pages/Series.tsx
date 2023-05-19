import Card from "@/components/layouts/MainLayout/Components/Card";
import Filters from "@/components/layouts/MainLayout/Components/Filters";
import { useState } from "react";

import { TVShow, Genre } from "@/types/types";

const Series = ({
  genres,
  tvShows,
}: {
  genres: Genre[];
  tvShows: TVShow[];
}) => {
  const [selectedGenre, setSelectedGenre] = useState<Genre>(genres[0]);

  const handleSelectedGenre = (genre: Genre) => {
    setSelectedGenre(genre);
  };

  return (
    <div>
      <div className="bg-background w-full left-0 fixed flex z-30 text-center top-72px px-5% pb-6">
        <h1 className="text-5xl mt-6 mr-6 font-medium">Series</h1>
        <Filters
          genres={genres}
          handleSelectedGenre={handleSelectedGenre}
          selectedGenre={selectedGenre}
        />
      </div>
      <div className="mt-28 grid grid-cols-2 laptopL:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 gap-5">
        {selectedGenre && selectedGenre.tvShows
          ? selectedGenre.tvShows
              .slice(0, 35)
              .map((tvShow: TVShow, index: number) => (
                <div
                  className={`col-start-${(index % 5) + 1} row-${
                    Math.floor(index / 5) + 1
                  }`}
                  key={tvShow.id}>
                  <Card tvShow={tvShow} />
                </div>
              ))
          : tvShows.slice(0, 35).map((tvShow: TVShow, index: number) => (
              <div
                className={`col-start-${(index % 5) + 1} row-${
                  Math.floor(index / 5) + 1
                }`}
                key={tvShow.id}>
                <Card tvShow={tvShow} />
              </div>
            ))}
      </div>
    </div>
  );
};

export default Series;
