import { useState, useEffect } from "react";
import SearchBar from "@/components/layouts/MainLayout/Components/SearchBar";
import Card from "@/components/layouts/MainLayout/Components/Card";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  genre_ids: number[];
}

const Search = () => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchMovies = async () => {
      let response;
      if (search !== "") {
        response = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=c2488b11f741864d8521bcc627cbfc91&query=${search}`
        );
      } else {
        const totalMoviesResponse = await fetch(
          "https://api.themoviedb.org/3/discover/movie?api_key=c2488b11f741864d8521bcc627cbfc91&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1"
        );
        const totalMoviesData = await totalMoviesResponse.json();
        const totalMovies = totalMoviesData.total_results;
        const randomOffset = Math.floor(Math.random() * totalMovies);
        response = await fetch(
          `https://api.themoviedb.org/3/discover/movie?api_key=c2488b11f741864d8521bcc627cbfc91&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_original_language=en&offset=${randomOffset}`
        );
      }
      const data = await response.json();
      setMovies(data.results);
    };
    fetchMovies();
  }, [search]);

  return (
    <div>
      <SearchBar setSearch={setSearch} search={search} />

      {movies.length === 0 && (
        <p className="text-2xl font-medium pt-52 text-center">{`No results found for "${search}"`}</p>
      )}
      <div className="pt-36">
        {search === "" && <p className="text-xl font-medium mb-5">Explore</p>}
        <div className="grid grid-cols-2 laptopL:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 gap-5 ">
          {movies.slice(0, 20).map((movie: Movie, index: number) => (
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
    </div>
  );
};

export default Search;
