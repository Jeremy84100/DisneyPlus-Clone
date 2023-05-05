import emptyWatchlistIcon from "@/assets/images/empty-watchlist-icon.svg";

const Watchlist = () => {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-100">
      <img src={emptyWatchlistIcon} alt="empty watchlist icon" />
      <h2 className="pb-2 pt-8 font-semibold text-xl">Your watchlist is empty</h2>
      <p className="py-2 font-light text-sm">Content you add to your watchlist will appear here.</p>
    </div>
  );
};

export default Watchlist;
