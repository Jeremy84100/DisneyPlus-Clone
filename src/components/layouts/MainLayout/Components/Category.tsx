import { useEffect, useState } from "react";
import Card from "./Card";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  genre_ids: number[];
}

interface TVShow {
  id: number;
  name: string;
  poster_path: string;
  genre_ids: number[];
}

interface Genre {
  id: number;
  name: string;
  movies: Movie[];
  tvShows: TVShow[];
}

const Category = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);

  const fetchMovies = async () => {
    let movies: Movie[] = [];
    let page = 1;
    while (movies.length < 100) {
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=c2488b11f741864d8521bcc627cbfc91&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}`
      );
      const data = await response.json();
      movies = movies.concat(data.results);
      page++;
    }
    setMovies(movies.slice(0, 100));
  };


  useEffect(() => {
    const fetchGenres = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=c2488b11f741864d8521bcc627cbfc91`
      );
      const data = await response.json();
      const genreData: Genre[] = [];

      for (const genre of data.genres) {
        const genreMovies = movies.filter((movie) =>
          movie.genre_ids.includes(genre.id)
        );
        if (genreMovies.length >= 15) {
          genreData.push({
            id: genre.id,
            name: genre.name,
            movies: genreMovies.slice(0, 15),
            tvShows: [],
          });
        }
      }

      setGenres(genreData);
    };

    fetchGenres();
    fetchMovies();
  }, []);

  const settings = {
    dots: false,
    infinite: false,
    speed: 400,
    slidesToShow: 5,
    slidesToScroll: 5,
  };

  return (
    <div>
      {genres.map((genre: Genre) => (
        <div key={genre.id}>
          <h2 className="pb-2.5 text-lg font-medium">{genre.name}</h2>
          <Carousel {...settings} className="mb-6">
            {genre.movies.map((movie: Movie) => (
              <Card key={movie.id} movie={movie} />
            ))}
          </Carousel>
        </div>
      ))}
    </div>
  );
};

const Carousel = styled(Slider)`
  & > button {
    opacity: 0;
    height: 100%;
    width: 5vw;
    z-index: 1;
  }

  .slick-list {
    overflow: initial;
  }

  .slick-slide{
    opacity: 0.5;
  }

  .slick-active {
    opacity: 1;
  }

  .slick-next,
  .slick-prev {
    width: 6%; 
    &:before {
      content: ">";
      fill: white;
      font-size: 30px;
      display: block;
      opacity: 1;
      transform: scaleY(2);
    }
    &:hover {
      opacity: 1;
      transition: opacity 0.2s ease;
      fill-white;
    }
    transition: opacity 0.2s ease;
  }
  
  .slick-prev {
    left: -6%;
    &:before {
      content: "<";
    }
  }
  
  .slick-next {
    right: -6%;
  }

  .slick-list {
    margin:  -10px;
  }

  .slick-slide > div {
    padding: 10px;
  }
`;

export default Category;
