import styled from "styled-components";
import { useState } from "react";
import Card from "@/components/Card";
import CardExtras from "@/components/CardExtras";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import { Media } from "@/types/types";

const MediaDetails = ({ media }: { media: Media }) => {
  const [selectedDetail, setSelectedDetail] = useState("SUGGESTED");

  const handleDetailClick = (detail: string) => {
    setSelectedDetail(detail);
  };

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
      <nav className="flex mb-5 border-b-2 border-neutral-600">
        <Details
          className="mr-10 cursor-pointer relative transition-all duration-300"
          onClick={() => handleDetailClick("SUGGESTED")}>
          <p
            className={`pb-4 tracking-widest text-xl font-medium cursor-pointer ${
              selectedDetail === "SUGGESTED" ? "text-white" : "text-gray-300"
            }`}>
            SUGGESTED
          </p>
          <div
            className={`w-full h-0.75 ${
              selectedDetail === "SUGGESTED"
                ? "opacity-1 bg-white"
                : "opacity-0 bg-gray-400"
            }  absolute bottom-0 left-0 rounded-sm`}
          />
        </Details>
        <Details
          className="mr-10 cursor-pointer relative transition-all duration-300"
          onClick={() => handleDetailClick("EXTRAS")}>
          <p
            className={`pb-4 tracking-widest text-xl font-medium cursor-pointer ${
              selectedDetail === "EXTRAS" ? "text-white" : "text-gray-300"
            }`}>
            EXTRAS
          </p>
          <div
            className={`w-full h-0.75 ${
              selectedDetail === "EXTRAS"
                ? "opacity-1 bg-white"
                : "opacity-0 bg-gray-400"
            }  absolute bottom-0 left-0 rounded-sm`}
          />
        </Details>
        <Details
          className="mr-10 cursor-pointer relative transition-all duration-300"
          onClick={() => handleDetailClick("DETAILS")}>
          <p
            className={`pb-4 tracking-widest text-xl font-medium cursor-pointer ${
              selectedDetail === "DETAILS" ? "text-white" : "text-gray-300"
            }`}>
            DETAILS
          </p>
          <div
            className={`w-full h-0.75 ${
              selectedDetail === "DETAILS"
                ? "opacity-1 bg-white"
                : "opacity-0 bg-gray-400"
            }  absolute bottom-0 left-0 rounded-sm`}
          />
        </Details>
      </nav>
      <div>
        {selectedDetail === "SUGGESTED" && (
          <Carousel {...settings}>
            {media.recommendations.slice(0, 8).map((movie) => (
              <Card key={movie.id} movie={movie} />
            ))}
          </Carousel>
        )}
        {selectedDetail === "EXTRAS" && (
          <Carousel {...settings}>
            {media.videos.map((video) => (
              <CardExtras key={video.id} video={video} />
            ))}
          </Carousel>
        )}
        {selectedDetail === "DETAILS" && (
          <div>
            <h1 className="text-2xl pb-6">{media.title}</h1>
            <div className="grid grid-row-2 lg:grid-cols-2">
              <div className="pr-0 pb-3 lg:pr-3 lg:pb-0 ">
                <p className="text-xl font-normal max-w-3xl">{media.synopsis}</p>
              </div>
              <div className="grid grid-cols-2 pl-0 pt-3 lg:pt-0 lg:pl-3">
                <div>
                  <div className="pb-2">
                    <p className="font-light text-sm text-gray-300 leading-relaxed">Duration:</p>
                    <p className="font-light text-sm leading-relaxed">{media.duration}m</p>
                  </div>
                  <div className="pb-2">
                    <p className="font-light text-sm text-gray-300 leading-relaxed">Release date:</p>
                    <p className="font-light text-sm leading-relaxed">{media.release_date}</p>
                  </div>
                  <div className="pb-2">
                    <p className="font-light text-sm text-gray-300 leading-relaxed">Genre:</p>
                    <p className="font-light text-sm leading-relaxed">{media.genres.map((genre) => genre.name).join(", ")}</p>
                  </div>
                  <div className="pb-2">
                    <p className="font-light text-sm text-gray-300 leading-relaxed">Rating:</p>
                    <p className="font-light text-sm leading-relaxed">{media.rating}</p>
                  </div>    
                </div>
                <div>
                  <div className="pb-2">
                    <p className="font-light text-sm text-gray-300 leading-relaxed">Director:</p>
                    {media.directors.slice(0, 6).map((director, index) => (
                      <p key={index} className="font-light text-sm leading-relaxed">{director}</p>
                    ))}
                  </div>
                  <div className="pb-2">
                    <p className="font-light text-sm text-gray-300 leading-relaxed">Starings: </p>
                    {media.actors.slice(0, 6).map((actor, index) => (
                      <p key={index} className="font-light text-sm leading-relaxed">{actor}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const Details = styled.div`
  &:hover div {
    opacity: 1;
    transition: opacity 0.2s;
  }
`;

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

export default MediaDetails;
