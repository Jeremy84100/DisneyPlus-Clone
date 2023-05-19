export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  genre_ids: number[];
  backdrop_path: string;
  overview: string;
  genres: Genre[];
  release_year: string;
  duration: number;
  recommendations: Media[];
  videos: Video[];
  directors: string[];
  release_date: string;
  rating: number;
  actors: string[];
  synopsis: string;
}

export interface TVShow {
  id: number;
  title: string;
  poster_path: string;
  genre_ids: number[];
  backdrop_path: string;
  overview: string;
  genres: Genre[];
  release_year: string;
  duration: number;
  recommendations: Media[];
  videos: Video[];
  directors: string[];
  release_date: string;
  rating: number;
  actors: string[];
  synopsis: string;
}

export interface Video {
  id: string;
  key: string;
  name: string;
  type: string;
}

export interface Media {
  id: number;
  title: string;
  poster_path: string;
  genre_ids: number[];
  backdrop_path: string;
  overview: string;
  genres: Genre[];
  release_year: string;
  duration: number;
  recommendations: Media[];
  videos: Video[];
  directors: string[];
  release_date: string;
  rating: number;
  actors: string[];
  synopsis: string;
}

export interface Genre {
  id: number;
  name: string;
  movies?: Movie[];
  tvShows?: TVShow[];
}

export interface Image {
  id: number;
  image: string;
  alt: string;
  category: string;
}

export interface Profile {
  image: Image;
  name: string;
  id: number;
  watchlist: (Movie | TVShow)[];
}
