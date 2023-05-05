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

  const fetchMedia = async (mediaType: string, withCompanies: number) => {
    const targetNumResults = 15;

    let numResultsFetched = 0;
    let media: (Movie | TVShow)[] = [];

    while (numResultsFetched < targetNumResults) {
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/${mediaType}?api_key=c2488b11f741864d8521bcc627cbfc91&language=en-US&include_adult=false&with_companies=${withCompanies}`
      );
      const data = await response.json();
      const results = data.results;

      media.push(...results);
      numResultsFetched += results.length;
    }

    return media;
  };

  const fetchAllMedia = async () => {
    const [
      disneyMovies,
      pixarMovies,
      marvelMovies,
      starWarsMovies,
      nationalGeographicMovies,
    ] = await Promise.all([
      fetchMedia("movie", 3),
      fetchMedia("movie", 2),
      fetchMedia("movie", 7505),
      fetchMedia("movie", 1),
      fetchMedia("movie", 7521),
    ]);
    const allMedia: (Movie | TVShow)[] = [
      ...disneyMovies,
      ...pixarMovies,
      ...marvelMovies,
      ...starWarsMovies,
      ...nationalGeographicMovies,
    ];
    setMovies(
      allMedia.filter((media) => media.hasOwnProperty("title")) as Movie[]
    );
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
    fetchAllMedia();
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
