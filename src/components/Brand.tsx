import { Link } from "react-router-dom";
import { brands } from "@/utils/data.json";

import { Brands } from "@/types/types";

const Brand = () => {

  const brandData : Brands[] = brands;

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
    <div className="grid grid-cols-3 lg:grid-cols-6 gap-5 pb-6">
      {brandData.map((data, index) => (
        <Link
          key={index}
          className="relative mt-5 bg-gradient-to-b from-gray-disney-light from-50% to-gray-disney rounded-2lg overflow-hidden transform transition-all shadow-black shadow-2lg hover:shadow-xlb hover:shadow-black duration-300 hover:scale-105"
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
