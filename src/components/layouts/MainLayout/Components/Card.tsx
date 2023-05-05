import { Link } from "react-router-dom";

interface Movie {
  [x: string]: any;
  id: number;
  title: string;
  poster_path: string;
  genre_ids: number[];
}

const Card = ({ movie }: { movie: Movie }) => {
  const handleOnMouseOver = (e: React.MouseEvent<HTMLImageElement>) => {
    const sibling = e.currentTarget.nextElementSibling;
    if (sibling) {
      sibling.classList.add("border-white/75", "scale-105");
      sibling.classList.remove("border-transparent");
    }
  };

  const handleOnMouseOut = (e: React.MouseEvent<HTMLImageElement>) => {
    const sibling = e.currentTarget.nextElementSibling;
    if (sibling) {
      sibling.classList.remove("border-white/75", "scale-105");
      sibling.classList.add("border-transparent");
    }
  };

  return (
    <Link to="/">
      <div className="relative">
        <img
          src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
          alt={movie.title}
          className="object-cover inset-0 w-full h-full z-10 rounded transition-all duration-300 hover:shadow-xlb hover:shadow-black shadow-3lg hover:scale-105"
          onMouseOver={handleOnMouseOver}
          onMouseOut={handleOnMouseOut}
        />
        <div className="absolute border-transparent w-full h-full top-0 border-4 rounded box-border z-20 transition-all duration-300 pointer-events-none"></div>
      </div>
    </Link>
  );
};

export default Card;
