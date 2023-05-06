import Card from "@/components/layouts/MainLayout/Components/Card";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  genre_ids: number[];
}

const Movies = ({ movies }: { movies: Movie[] }) => {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-5xl mt-6 font-medium">Movies</h1>
      </div>
      <div className="grid grid-cols-5 gap-5">
        {movies.slice(0, 35).map((movie: Movie, index: number) => (
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
