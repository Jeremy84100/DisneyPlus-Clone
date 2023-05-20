import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import jsonData from "@/utils/profile.json";
import CardProfile from "@/components/layouts/MainLayout/Components/CardProfile";
import { useNavigate } from "react-router-dom";

import { Image } from "@/types/types";
interface Props {
  handleSelectImage: (image: Image) => void;
}

const SelectAvatar = ({ handleSelectImage }: Props) => {
  const navigate = useNavigate();

  const imagesByCategory: { [key: string]: Image[] } = jsonData.images.reduce(
    (acc: { [key: string]: Image[] }, image) => {
      if (!acc[image.category]) {
        acc[image.category] = [];
      }
      acc[image.category].push(image);
      return acc;
    },
    {}
  );

  const settings = {
    dots: false,
    infinite: false,
    speed: 400,
    slidesToShow: 6,
    slidesToScroll: 6,
    responsive: [
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
    ],
  };

  const handleImageClick = (image: Image) => {
    handleSelectImage(image);
    navigate("/add-profile");
  };

  return (
    <div className="pt-12">
      <h2 className="text-3xl font-medium">Choose Avatar</h2>
      <div className="pt-12">
        {Object.entries(imagesByCategory).map(([category, images]) => (
          <div key={category} className="mb-8">
            <h2 className="text-xl font-medium mb-4">{category}</h2>
            <Carousel {...settings}>
              {images.map((image) => (
                <div key={image.id} onClick={() => handleImageClick(image)}>
                  <CardProfile image={image} />
                </div>
              ))}
            </Carousel>
          </div>
        ))}
      </div>
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

  .slick-slide {
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
    margin: -10px;
  }

  .slick-slide > div {
    padding: 10px;
  }
};`;

export default SelectAvatar;
