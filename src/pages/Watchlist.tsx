import emptyWatchlistIcon from "@/assets/images/empty-watchlist-icon.svg";
import Card from "@/components/Card";

import { Profile } from "@/types/types";

interface Props {
  selectedProfile: Profile;
}

const Watchlist = ({ selectedProfile }: Props) => {
  if (selectedProfile.watchlist.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-100">
        <img src={emptyWatchlistIcon} alt="empty watchlist icon" />
        <h2 className="pb-2 pt-8 font-semibold text-xl">
          Your watchlist is empty
        </h2>
        <p className="py-2 font-light text-sm">
          Content you add to your watchlist will appear here.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-4xl pt-12 pb-6">Watchlist</h1>
      <h4 className="text-xl">My Movies & Series</h4>
      <div className=" mt-5 grid grid-cols-2 laptopL:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 gap-5">
        {selectedProfile.watchlist.map((movie) => (
          <Card key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Watchlist;
