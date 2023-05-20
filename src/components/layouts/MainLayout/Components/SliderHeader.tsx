import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import lionKingBackground from "@/assets/images/slider-header/the-lion-king/the-lion-king-background.jpg";
import lionKingLogo from "@/assets/images/slider-header/the-lion-king/the-lion-king-logo.png";
import theRescueBackground from "@/assets/images/slider-header/the-rescue/the-rescue-background.jpg";
import theRescueLogo from "@/assets/images/slider-header/the-rescue/the-rescue-logo.png";
import spidermanBackground from "@/assets/images/slider-header/spiderman/spiderman-background.jpg";
import spidermanLogo from "@/assets/images/slider-header/spiderman/spiderman-logo.png";
import peterPanBackground from "@/assets/images/slider-header/peter-pan/peter-pan-background.jpg";
import peterPanLogo from "@/assets/images/slider-header/peter-pan/peter-pan-logo.png";
import westSideHistoryBackground from "@/assets/images/slider-header/west-side-history/west-side-history-background.jpg";
import westSideHistoryLogo from "@/assets/images/slider-header/west-side-history/west-side-history-logo.png";

const SliderHeader = () => {
  const SliderHeaderData = [
    {
      background: lionKingBackground,
      logo: lionKingLogo,
      title: "The Lion King",
      path: "/movies/420818"
    },
    {
      background: theRescueBackground,
      logo: theRescueLogo,
      title: "The Rescue",
      path: "/movies/680058"
    },
    {
      background: spidermanBackground,
      logo: spidermanLogo,
      title: "Spiderman",
      path: "/movies/429617"
    },
    {
      background: peterPanBackground,
      logo: peterPanLogo,
      title: "Peter Pan & Wendy",
      path: "/movies/420808"
    },
    {
      background: westSideHistoryBackground,
      logo: westSideHistoryLogo,
      title: "West Side Story",
      path: "/movies/511809"
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const handleSlideChange = (currentSlide: number) => {
    const logos = document.querySelectorAll(".carousel-logo");
    logos.forEach((logo) => {
      const logoElement = logo as HTMLElement;
      const slideIndexAttr = logoElement.getAttribute("data-slide-index");
      if (slideIndexAttr !== null) {
        const slideIndex = parseInt(slideIndexAttr);
        if (slideIndex === currentSlide) {
          logoElement.classList.add("opacity-1");
          logoElement.classList.remove("opacity-0");
          logoElement.classList.add("left-0");
          logoElement.classList.remove("-left-5");
        } else {
          logoElement.classList.add("opacity-0");
          logoElement.classList.remove("opacity-1");
          logoElement.classList.add("-left-5");
          logoElement.classList.remove("left-0");
        }
      }
    });
  };

  useEffect(() => {
    handleSlideChange(currentSlide);
  }, []);

  let settings = {
    dots: true,
    infinite: true,
    speed: 300,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    afterChange: (slideIndex: number) => {
      setCurrentSlide(slideIndex);
      handleSlideChange(slideIndex);
    },
  };

  const handleOnMouseOver = (e: React.MouseEvent<HTMLImageElement>) => {
    const sibling = e.currentTarget.nextElementSibling;
    if (sibling) {
      sibling.classList.add("border-white/75");
      sibling.classList.remove("border-transparent");
    }
  };

  const handleOnMouseOut = (e: React.MouseEvent<HTMLImageElement>) => {
    const sibling = e.currentTarget.nextElementSibling;
    if (sibling) {
      sibling.classList.remove("border-white/75");
      sibling.classList.add("border-transparent");
    }
  };

  return (
    <Carousel {...settings}>
      {SliderHeaderData.map((item, index) => (
        <Link to={`${item.path}`} key={index} className="relative my-6">
          <img
            src={item.background}
            alt={item.title}
            className="object-cover h-full w-full rounded shadow-3lg"
          />
          <img
            className="absolute inset-0 h-full w-full z-10 transition-all duration-700 carousel-logo opacity-0 -left-5"
            src={item.logo}
            alt={item.title}
            onMouseOver={handleOnMouseOver}
            onMouseOut={handleOnMouseOut}
            data-slide-index={index}
          />
          <div className="absolute border-transparent top-0 w-full h-full border-4 rounded box-border  z-20 transition-all duration-300 pointer-events-none" />
        </Link>
      ))}
    </Carousel>
  );
};

const Carousel = styled(Slider)`
  & > button {
    opacity: 0;
    height: 100%;
    width: 5vw;
    z-index: 1;
  }

  ul li button {
    &:before {
      color: rgb(255, 255, 255);
    }
  }

  .slick-slide{
    opacity: 0.5;
    transition: opacity 300ms ease-in-out;
    }
    
    .slick-active {
    opacity: 1;
    transition: opacity 300ms ease-in-out;
    }
  
  ul.slick-dots li.slick-active button:before {
    opacity: 1;
    color: rgb(255, 255, 255);
  }

  ul.slick-dots li button:before {
    opacity: 0.5;
    pointer-events: auto;
  }

  ul.slick-dots {
    pointer-events: none;
  }

  .slick-list {
    overflow: initial;
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
    margin: 0 -10px;
  }

  .slick-slide > div {
    padding: 0 10px;
  }

  ul.slick-dots {
    bottom: 35px;
    right: 20px;
    text-align: right;
    width: 100%;
  }

  ul.slick-dots li button:before {
    font-size: 6px;
  }

  ul.slick-dots li {
    margin: 0 0px;
  }
`;

export default SliderHeader;
