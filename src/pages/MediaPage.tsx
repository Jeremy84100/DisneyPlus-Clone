import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import MediaDetails from "./MediaDetails";

interface Genre {
  id: number;
  name: string;
}

interface Video {
  id: string;
  key: string;
  name: string;
  type: string;
}

interface Media {
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

const MediaPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [media, setMedia] = useState<Media | null>(null);
  const [showDiv, setShowDiv] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const interpolateOpacity = (
    position: number,
    maxOpacity: number,
    power: number
  ): number => {
    const normalizedPosition = position / window.innerHeight;
    return 1 - Math.pow(normalizedPosition, power) * (1 - maxOpacity);
  };

  const maxOpacity = 0.2;
  const power = 0.4;
  const rooOpacity = interpolateOpacity(scrollPosition, maxOpacity, power);

  useEffect(() => {
    const fetchMedia = async () => {
      const [
        mediaResponse,
        recommendationsResponse,
        creditsResponse,
        videosResponse,
      ] = await Promise.all([
        fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=c2488b11f741864d8521bcc627cbfc91&append_to_response=videos`
        ),
        fetch(
          `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=c2488b11f741864d8521bcc627cbfc91`
        ),
        fetch(
          `https://api.themoviedb.org/3/movie/${id}/credits?api_key=c2488b11f741864d8521bcc627cbfc91`
        ),
        fetch(
          `https://api.themoviedb.org/3/movie/${id}/videos?api_key=c2488b11f741864d8521bcc627cbfc91`
        ),
      ]);

      const mediaData = await mediaResponse.json();
      const recommendationsData = await recommendationsResponse.json();
      const creditsData = await creditsResponse.json();
      const videosData = await videosResponse.json();

      const directors = creditsData.crew
        ? creditsData.crew
            .filter((member: any) => member.job === "Director")
            .map((director: any) => director.name)
        : [];

      const actors = creditsData.cast.map((actor: any) => actor.name);

      const media: Media = {
        id: mediaData.id,
        title: mediaData.title,
        backdrop_path: mediaData.backdrop_path,
        poster_path: mediaData.poster_path,
        genre_ids: mediaData.genres.map((genre: Genre) => genre.id),
        overview: mediaData.overview,
        genres: mediaData.genres,
        release_year: mediaData.release_date.split("-")[0],
        duration: mediaData.runtime,
        recommendations: recommendationsData.results,
        videos: videosData.results,
        directors: directors,
        release_date: mediaData.release_date,
        rating: mediaData.vote_average,
        actors: actors,
        synopsis: mediaData.overview,
      };

      setMedia(media);
      setShowDiv(true);
    };

    fetchMedia();
  }, [id]);

  if (!media) {
    return <div>Loading...</div>;
  }

  return (
    <article className="flex flex-col pb-14">
      <div
        className={`roo fixed -z-10 left-0 right-0 top-0 w-full transition-opacity ${
          showDiv ? "opacity-100" : "opacity-0"
        }  duration-500 ease-in-out`}
        style={{ opacity: rooOpacity }}>
        <img
          src={`https://image.tmdb.org/t/p/original/${media.backdrop_path}`}
          alt={media.title}
        />
        <Background />
      </div>
      <div className="mb-10 max-w-4xl">
        <h1 className="mt-40 mb-4 text-7xl">{media.title}</h1>
        <div className="flex flex-col">
          <p className="text-xs font-normal my-2">
            {media.release_year} • {media.duration}m
          </p>
          <p className="text-xs font-normal">
            {media.genres.map((genre) => genre.name).join(", ")}
          </p>
        </div>
        <div className="pt-8 flex items-center">
          <button className="h-14 rounded transition-all ease-in-out duration-200 bg-white hover:bg-neutral-400 active:bg-neutral-500 px-6 my-1 mr-3 flex items-center">
            <svg
              aria-hidden="true"
              aria-label="play"
              color="white"
              role="img"
              version="1.1"
              viewBox="0 0 36 36"
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8">
              <path d="M27.147 20.421L11.27 29.274A2.2 2.2 0 0 1 8 27.353V9.647a2.2 2.2 0 0 1 3.271-1.921l15.876 8.852a2.2 2.2 0 0 1 0 3.843z"></path>
            </svg>
            <p className="tracking-wider ml-3 text-black">PLAY</p>
          </button>

          <button className="my-1 py-4 mx-3 px-6 tracking-wide rounded border border-white bg-black/60 transition-all ease-in-out duration-200 hover:bg-white hover:text-black">
            TRAILER
          </button>

          <Button className="flex items-center justify-center h-11 w-11 ml-2 mr-4 rounded-full transition-all ease-out duration-400 bg-black border-2 border-white hover:bg-white">
            <span className="text-white text-2xl">+</span>
          </Button>

          <div className="flex flex-col items-center">
            <div className="relative flex flex-col items-center">
              <GroupWatch className="h-11 w-11 my-1 mx-2 bg-black rounded-full border-2 border-white transition-all ease-out duration-200 hover:bg-white">
                <svg
                  aria-label="groupWatch"
                  role="img"
                  version="1.1"
                  viewBox="0 0 36 36"
                  xmlns="http://www.w3.org/2000/svg"
                  className="fill-white">
                  <path
                    className="people"
                    d="M 23.465 19.672 C 23.496 19.83 23.97 24.967 23.798 25.96 C 23.55 27.399 21.837 28.426 18.168 28.426 C 14.634 28.426 12.829 27.189 12.483 25.715 C 12.152 24.314 12.807 19.581 12.839 19.427 C 13.638 15.502 16.851 15.295 17.961 15.287 L 18.306 15.287 C 19.343 15.287 22.646 15.664 23.465 19.672 Z M 10.313 16.315 C 10.639 16.315 11.213 16.332 11.831 16.545 C 11.416 17.263 11.105 18.086 10.915 19.016 C 10.906 19.061 10.111 24.229 10.571 26.186 C 10.574 26.198 10.582 26.206 10.585 26.218 C 10.298 26.195 10 26.152 9.689 26.073 C 6.928 25.381 5.88 24.015 5.843 23.261 C 5.787 22.101 6.11 19.77 6.136 19.645 C 6.792 16.42 9.255 16.315 10.089 16.315 Z M 25.976 16.315 C 26.863 16.321 29.223 16.498 29.864 19.645 C 29.89 19.77 30.214 22.101 30.157 23.261 C 30.122 24.015 29.073 25.381 26.312 26.074 C 26.119 26.121 25.932 26.158 25.749 26.184 C 25.945 24.628 25.427 19.459 25.387 19.262 C 25.166 18.176 24.788 17.262 24.305 16.501 C 24.87 16.331 25.386 16.315 25.688 16.315 L 25.688 16.315 Z M 25.77 10.111 C 27.203 10.111 28.366 11.301 28.366 12.77 C 28.366 14.238 27.203 15.429 25.77 15.429 C 24.336 15.429 23.171 14.238 23.171 12.77 C 23.171 11.301 24.336 10.111 25.77 10.111 Z M 10.231 10.111 C 11.666 10.111 12.829 11.301 12.829 12.77 C 12.829 14.238 11.666 15.429 10.231 15.429 C 8.798 15.429 7.636 14.238 7.636 12.77 C 7.636 11.301 8.798 10.111 10.231 10.111 Z M 18.207 7.574 C 19.99 7.574 21.436 9.053 21.436 10.878 C 21.436 12.704 19.99 14.184 18.207 14.184 C 16.422 14.184 14.976 12.704 14.976 10.878 C 14.976 9.053 16.422 7.574 18.207 7.574 Z"></path>
                </svg>
              </GroupWatch>
              <GroupWatchVisible className="GroupWatchVisible opacity-0 absolute w-64 px-6 py-2 rounded leading-relaxed text-sm font-normal mt-14 text-center bg-sky-600">
                Try GroupWatch and watch together, even when you’re apart.
              </GroupWatchVisible>
            </div>
          </div>
        </div>
        <p className="py-4 text-xl leading-relaxed font-normal">
          {media.overview}
        </p>
      </div>
      <MediaDetails media={media} />
    </article>
  );
};

const Button = styled.button`
  &:hover span {
    color: black;
  }
`;

const GroupWatch = styled.button`
  &:hover svg {
    fill: black;
  }
`;

const GroupWatchVisible = styled.div`
  opacity: 0;
  transition: opacity 0.3s ease;
  ${GroupWatch}:hover + & {
    opacity: 1;
  }
`;

const Background = styled.div`
  & {
    background-image: radial-gradient(
      farthest-side at 73% 21%,
      transparent,
      rgb(26, 29, 41)
    );
    position: absolute;
    inset: 0px;
  }
`;

export default MediaPage;
