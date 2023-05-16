import disneyLogo from "@/assets/images/brand/Disney/disney-logo.png";
import disneyVideo from "@/assets/images/brand/Disney/disney-logo-background.mp4";
import pixarLogo from "@/assets/images/brand/Pixar/pixar-logo.png";
import pixarVideo from "@/assets/images/brand/Pixar/pixar-logo-background.mp4";
import marvelLogo from "@/assets/images/brand/Marvel/marvel-logo.png";
import marvelVideo from "@/assets/images/brand/Marvel/marvel-logo-background.mp4";
import starwarsLogo from "@/assets/images/brand/StarWars/star-wars-logo.png";
import starwarsVideo from "@/assets/images/brand/StarWars/star-wars-logo-background.mp4";
import nationalgeographicLogo from "@/assets/images/brand/NationalGeographic/national-geographic-logo.png";
import nationalgeographicVideo from "@/assets/images/brand/NationalGeographic/national-geographic-logo-background.mp4";
import starLogo from "@/assets/images/brand/Star/star-logo.png";
import starVideo from "@/assets/images/brand/Star/star-logo-background.mp4";

import { Link } from "react-router-dom";

const Brand = () => {
  interface BrandData {
    logo: string;
    video: string;
    title: string;
    link: string;
  }

  const brandData: BrandData[] = [
    {
      logo: disneyLogo,
      video: disneyVideo,
      title: "Disney",
      link: "/brand/disney",
    },
    {
      logo: pixarLogo,
      video: pixarVideo,
      title: "Pixar",
      link: "/brand/pixar",
    },
    {
      logo: marvelLogo,
      video: marvelVideo,
      title: "Marvel",
      link: "/brand/marvel",
    },
    {
      logo: starwarsLogo,
      video: starwarsVideo,
      title: "Star Wars",
      link: "/brand/starwars",
    },
    {
      logo: nationalgeographicLogo,
      video: nationalgeographicVideo,
      title: "National Geographic",
      link: "/brand/nationalgeographic",
    },
    {
      logo: starLogo,
      video: starVideo,
      title: "Star",
      link: "/brand/star",
    },
  ];
  const handleOnMouseOver = (e: React.MouseEvent<HTMLVideoElement>) => {
    e.currentTarget.play();
    const sibling = e.currentTarget.nextElementSibling;
    if (sibling) {
      sibling.classList.add("border-white/75");
    }
  };

  const handleOnMouseOut = (e: React.MouseEvent<HTMLVideoElement>) => {
    const sibling = e.currentTarget.nextElementSibling;
    if (sibling) {
      sibling.classList.remove("border-white/75");
    }
  };

  return (
    <div className="grid grid-cols-3 lg:grid-cols-6 pb-6">
      {brandData.map((data, index) => (
        <Link
          key={index}
          className="relative mt-5 ml-5 bg-gradient-to-b from-gray-disney-light from-50% to-gray-disney rounded-2lg overflow-hidden transform transition-all shadow-black shadow-2lg hover:shadow-xlb hover:shadow-black duration-300 hover:scale-105"
          to={data.link}>
          <img
            className="relative z-10 inset-0 w-full h-full object-cover pointer-events-none"
            src={data.logo}
            alt={data.title}
          />
          <video
            className="absolute inset-0 w-full h-full object-cover rounded-2lg opacity-0 hover:opacity-100"
            loop
            preload="auto"
            muted
            onMouseOver={handleOnMouseOver}
            onMouseOut={handleOnMouseOut}>
            <source src={data.video} type="video/mp4" />
          </video>
          <div className="absolute top-0 w-full h-full border-3 border-border-brand rounded-2lg box-border bg-clip-border z-10 transition-all duration-300 pointer-events-none"></div>
        </Link>
      ))}
    </div>
  );
};

export default Brand;
