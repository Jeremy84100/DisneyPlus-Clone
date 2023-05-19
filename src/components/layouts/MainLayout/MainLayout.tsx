import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Movie, TVShow, Genre, Image, Profile } from "@/types/types";

import HeaderProfile from "./Components/HeaderProfile";
import Header from "./Components/Header/Header";
import Background from "./Components/Background";

import Home from "@/pages/Home";
import Search from "@/pages/Search";
import Watchlist from "@/pages/Watchlist";
import Originals from "@/pages/Originals";
import Movies from "@/pages/Movies";
import Series from "@/pages/Series";
import MediaPage from "@/pages/MediaPage";
import NotFound from "@/pages/NotFound";

import BrandPage from "@/pages/BrandPage";
import SelectProfile from "@/pages/SelectProfile";
import SelectAvatar from "@/pages/SelectAvatar";
import AddProfile from "@/pages/AddProfile";

import Footer from "./Components/Footer";

const MainLayout = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [tvShows, setTVShows] = useState<TVShow[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [profileName, setProfileName] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<Image>({
    id: 16,
    image: "public/images/profile/mickey-mouse/mickey-mouse.png",
    alt: "Mickey Mouse",
    category: "Mickey Mouse",
  });
  const [selectedProfile, setSelectedProfile] = useState<Profile>({
    id: 1,
    image: selectedImage,
    name: "",
    watchlist: [],
  });

  const handleSelectedProfile = (profile: Profile | undefined) => {
    if (profile) {
      setSelectedProfile(profile);
    }
  };

  const handleProfileName = (e: any) => {
    setProfileName(e.target.value);
  };

  const handleSelectImage = (image: Image) => {
    setSelectedImage(image);
  };

  const handleAddProfile = () => {
    setProfiles((prevProfiles) => [
      ...prevProfiles,
      {
        image: selectedImage,
        name: profileName,
        id: prevProfiles.length + 1,
        watchlist: [],
      },
    ]);
  };

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
    location.pathname === "/watchlist" ||
    location.pathname === "/select-avatar";

  const showHeader =
    location.pathname === "/select-profile" ||
    location.pathname === "/select-avatar" ||
    location.pathname === "/add-profile" ||
    location.pathname === "/not-found";

  const showFooter =
    location.pathname === "/select-profile" ||
    location.pathname === "/select-avatar" ||
    location.pathname === "/add-profile" ||
    location.pathname === "/not-found";

  const showHeaderProfile =
    location.pathname === "/select-profile" ||
    location.pathname === "/select-avatar" ||
    location.pathname === "/add-profile";

  return (
    <div className="flex flex-col min-h-screen overflow-hidden pt-72px">
      {showHeaderProfile && <HeaderProfile />}
      {!showHeader && (
        <Header
          selectedProfile={selectedProfile}
          profiles={profiles}
          handleSelectedProfile={handleSelectedProfile}
        />
      )}
      {showBackground && <Background />}
      <main className="px-5%">
        <Routes>
          <Route path="/" element={<Home genres={genres} />} />
          <Route path="/search" element={<Search />} />
          <Route
            path="/watchlist"
            element={<Watchlist selectedProfile={selectedProfile} />}
          />
          <Route path="/originals" element={<Originals genres={genres} />} />
          <Route
            path="/movies"
            element={<Movies movies={movies} genres={genres} />}
          />
          <Route
            path="/series"
            element={<Series tvShows={tvShows} genres={genres} />}
          />
          <Route path="/brand/:brand" element={<BrandPage genres={genres} />} />
          <Route
            path="/movies/:id"
            element={
              <MediaPage
                selectedProfile={selectedProfile}
                setSelectedProfile={setSelectedProfile}
              />
            }
          />
          <Route
            path="/series/:id"
            element={
              <MediaPage
                selectedProfile={selectedProfile}
                setSelectedProfile={setSelectedProfile}
              />
            }
          />

          <Route
            path="/select-profile"
            element={
              <SelectProfile
                profiles={profiles}
                handleSelectedProfile={handleSelectedProfile}
              />
            }
          />
          <Route
            path="/select-avatar"
            element={<SelectAvatar handleSelectImage={handleSelectImage} />}
          />
          <Route
            path="/add-profile"
            element={
              <AddProfile
                selectedImage={selectedImage}
                profileName={profileName}
                handleProfileName={handleProfileName}
                handleAddProfile={handleAddProfile}
              />
            }
          />
          <Route path="*" element={<Navigate to="/not-found" />} />
          <Route path="/not-found" element={<NotFound />} />
        </Routes>
      </main>
      {!showFooter && <Footer />}
    </div>
  );
};

export default MainLayout;
