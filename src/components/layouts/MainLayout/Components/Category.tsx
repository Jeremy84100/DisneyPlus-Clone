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

interface Genre {
  id: number;
  name: string;
  movies: Movie[];
}

const Category = ({ genres }: { genres: any }) => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 400,
    slidesToShow: 5,
    slidesToScroll: 5,
    responsive: [
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
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
