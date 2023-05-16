import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import Category from "@/components/layouts/MainLayout/Components/Category";

import disneyImage from "@/assets/images/brand/Disney/disney-background-image.jpg";
import disneyVideo from "@/assets/images/brand/Disney/disney-background-video.mp4";
import pixarImage from "@/assets/images/brand/Pixar/pixar-background-image.jpg";
import pixarVideo from "@/assets/images/brand/Pixar/pixar-background-video.mp4";
import marvelImage from "@/assets/images/brand/Marvel/marvel-background-image.jpg";
import marvelVideo from "@/assets/images/brand/Marvel/marvel-background-video.mp4";
import starwarsImage from "@/assets/images/brand/StarWars/star-wars-background-image.jpg";
import starwarsVideo from "@/assets/images/brand/StarWars/star-wars-background-video.mp4";
import nationalgeographicImage from "@/assets/images/brand/NationalGeographic/national-geographic-background-image.jpg";
import nationalgeographicVideo from "@/assets/images/brand/NationalGeographic/national-geographic-background-video.mp4";
import starImage from "@/assets/images/brand/Star/star-background-image.jpg";
import starVideo from "@/assets/images/brand/Star/star-background-video.mp4";

import brandBackground from "@/assets/images/brand/brand-background.png";

interface BrandData {
  image: string;
  video: string;
  title: string;
  link: string;
}

const BrandPage = ({ genres }: { genres: any }) => {
  const { brand } = useParams<{ brand: string }>();
  const [videoEnded, setVideoEnded] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = () => {
    const position = window.scrollY;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const interpolateOpacity = (position: number, power: number): number => {
    const maxOpacity = 0.2;
    const normalizedPosition =
      position /
      (window.document.documentElement.scrollHeight - window.innerHeight);
    return (
      1 -
      Math.pow(Math.min(Math.max(normalizedPosition, 0), 1), power) *
        (1 - maxOpacity)
    );
  };

  const power = 0.4;
  const rooOpacity = interpolateOpacity(scrollPosition, power);

  const handleVideoEnd = () => {
    setVideoEnded(true);
  };

  const brandData: BrandData[] = [
    {
      image: disneyImage,
      video: disneyVideo,
      title: "Disney",
      link: "/brand/disney",
    },
    {
      image: pixarImage,
      video: pixarVideo,
      title: "Pixar",
      link: "/brand/pixar",
    },
    {
      image: marvelImage,
      video: marvelVideo,
      title: "Marvel",
      link: "/brand/marvel",
    },
    {
      image: starwarsImage,
      video: starwarsVideo,
      title: "Star Wars",
      link: "/brand/starwars",
    },
    {
      image: nationalgeographicImage,
      video: nationalgeographicVideo,
      title: "National Geographic",
      link: "/brand/nationalgeographic",
    },
    {
      image: starImage,
      video: starVideo,
      title: "Star",
      link: "/brand/star",
    },
  ];

  const selectedBrand = brandData.find((b) => b.link === `/brand/${brand}`);

  return (
    <>
      {selectedBrand ? (
        <div>
          <div className="opacity-0" style={{ opacity: rooOpacity }}>
            <video
              className={`w-full fixed left-0 right-0 top-0 -z-20 inset-0 ${
                videoEnded ? "opacity-0" : "opacity-1"
              }`}
              src={selectedBrand.video}
              autoPlay
              onEnded={handleVideoEnd}
            />
            <div className="fixed left-0 top-0 w-full -z-10">
              <img
                className={`transition-opacity duration-1500 w-full h-full object-cover ${
                  videoEnded ? "opacity-1" : "opacity-0"
                }`}
                src={selectedBrand.image}
                alt={selectedBrand.title}
              />
              <Background />
            </div>
            <div className="flex items-end h-30vw min-h-170 pb-6 justify-center">
              <img className="max-w-xl w-35vw" src={brandBackground} />
            </div>
          </div>
          <Category genres={genres} />
        </div>
      ) : (
        <p>Marque introuvable.</p>
      )}
    </>
  );
};

const Background = styled.div`
  background-image: linear-gradient(
    transparent 25%,
    transparent 50%,
    rgb(26, 29, 41) 75%,
    rgb(26, 29, 41) 100%
  );
  position: absolute;
  inset: 0px;
`;

export default BrandPage;
