import { useState, useEffect } from "react";

import originals from "@/assets/images/ORIGINALS.png";
import Category from "@/components/Category";

const Originals = ({ genres }: { genres: any }) => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY > 0;
      setScrolled(scrollTop);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div>
      <div className="bg-background w-full left-0 fixed flex justify-center z-10 text-center top-72px">
        <img
          className={`mt-6 ${
            scrolled ? "h-32" : " h-48"
          } transition-all duration-500 ease-in-out`}
          src={originals}
          alt="ORIGNIALS"
        />
      </div>
      <div
        className={` ${
          scrolled ? "mt-64" : "mt-64"
        } transition-all duration-300 ease-in-out`}>
        <Category genres={genres} />
      </div>
    </div>
  );
};

export default Originals;
