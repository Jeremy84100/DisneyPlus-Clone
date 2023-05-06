import Card from "@/components/layouts/MainLayout/Components/Card";

interface TVShow {
  id: number;
  title: string;
  poster_path: string;
  genre_ids: number[];
}

const Series = ({ tvShows }: { tvShows: TVShow[] }) => {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-5xl mt-6 font-medium">Series</h1>
      </div>
      <div className="grid grid-cols-5 gap-5">
        {tvShows.slice(0, 35).map((tvShow: TVShow, index: number) => (
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
