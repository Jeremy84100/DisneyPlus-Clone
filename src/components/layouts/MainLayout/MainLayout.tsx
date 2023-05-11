import Header from "./Components/Header/Header";
import Background from "./Components/Background";

import Home from "@/pages/Home";
import Search from "@/pages/Search";
import Watchlist from "@/pages/Watchlist";
import Originals from "@/pages/Originals";
import Movies from "@/pages/Movies";
import Series from "@/pages/Series";

import { Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import Footer from "./Components/Footer";

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

const MainLayout = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [tvShows, setTVShows] = useState<TVShow[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  

  const fetchMedia = async (mediaType: string, withCompanies: number) => {
    const targetNumResults = 10;
    let numResultsFetched = 0;
    let pageNum = 1;
    let media: (Movie | TVShow)[] = [];

    while (numResultsFetched < targetNumResults) {
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/${mediaType}?api_key=c2488b11f741864d8521bcc627cbfc91&language=en-US&include_adult=false&with_companies=${withCompanies}&page=${pageNum}`
      );
      const data = await response.json();
      const results = data.results;

      media.push(...results);
      numResultsFetched += results.length;
      pageNum++;

      if (pageNum > data.total_pages) {
        break;
      }
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
      fetchMedia("tv", 3),
      fetchMedia("movie", 1),
      fetchMedia("tv", 2),
      fetchMedia("movie", 2),
      fetchMedia("tv", 1),
    ]);
    const allMedia: (Movie | TVShow)[] = [
      ...disneyMovies,
      ...pixarMovies,
      ...marvelMovies,
      ...starWarsMovies,
      ...nationalGeographicMovies,
    ];

    const movies: Movie[] = allMedia.filter((media) =>
      media.hasOwnProperty("title")
    ) as Movie[];
    const tvShows: TVShow[] = allMedia.filter((media) =>
      media.hasOwnProperty("name")
    ) as TVShow[];

    return { movies, tvShows };
  };

  const fetchGenres = async (movies: Movie[], tvShows: TVShow[]) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=c2488b11f741864d8521bcc627cbfc91`
    );
    const data = await response.json();
    const genreData: Genre[] = [];

    for (const genre of data.genres) {
      const genreMovies = movies.filter((movie) =>
        movie.genre_ids.includes(genre.id)
      );
      const genreTVShows = tvShows.filter((tvShow) =>
        tvShow.genre_ids.includes(genre.id)
      );
      if (genreMovies.length >= 15) {
        genreData.push({
          id: genre.id,
          name: genre.name,
          movies: genreMovies.slice(0, 15),
          tvShows: genreTVShows.slice(0, 15),
        });
      }
    }

    return genreData;
  };

  const fetchAllData = async () => {
    const { movies, tvShows } = await fetchAllMedia();
    const genreData = await fetchGenres(movies, tvShows);

    return { movies, tvShows, genreData };
  };

  useEffect(() => {
    const fetchData = async () => {
      const { movies, tvShows, genreData } = await fetchAllData();

      setGenres(genreData);
      setMovies(movies);
      setTVShows(tvShows);
    };

    fetchData();
  }, []);

  const location = useLocation();
  const showBackground =
    location.pathname === "/" ||
    location.pathname === "/search" ||
    location.pathname === "/watchlist";

  return (
    <div className="flex flex-col min-h-screen overflow-hidden pt-72px">
      <Header />
      {showBackground && <Background />}
      <main className="px-5%">
        <Routes>
          <Route path="/" element={<Home genres={genres} />} />
          <Route path="/search" element={<Search />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/originals" element={<Originals genres={genres} />} />
          <Route path="/movies" element={<Movies movies={movies} genres={genres} />} />
          <Route path="/series" element={<Series tvShows={tvShows} genres={genres} />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
