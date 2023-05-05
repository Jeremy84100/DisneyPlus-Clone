import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import disneyLogo from "@/assets/images/disney-logo.svg";

const Menu = () => {
  const [scrolled, setScrolled] = useState(false);

  const MenuData = [
    {
      title: "HOME",
      path: "/",
      icon: "M26.882 19.414v10.454h-5.974v-5.227h-5.974v5.227H8.961V19.414H5.227L17.921 6.72l12.694 12.694h-3.733z",
    },
    {
      title: "SEARCH",
      path: "/search",
      icon: "M21.866 24.337c-3.933 2.762-9.398 2.386-12.914-1.13-3.936-3.936-3.936-10.318 0-14.255 3.937-3.936 10.32-3.936 14.256 0 3.327 3.327 3.842 8.402 1.545 12.27l4.56 4.558a2 2 0 0 1 0 2.829l-.174.173a2 2 0 0 1-2.828 0l-4.445-4.445zm-5.786-1.36a6.897 6.897 0 1 0 0-13.794 6.897 6.897 0 0 0 0 13.794z",
    },
    {
      title: "WATCHLIST",
      path: "/watchlist",
      icon: "M22.85 10.1H15.9V3.15a2.9 2.9 0 0 0-5.8 0v6.95H3.15a2.9 2.9 0 0 0 0 5.8h6.95v6.95a2.9 2.9 0 0 0 5.8 0V15.9h6.95a2.9 2.9 0 1 0 0-5.8Z",
    },
    {
      title: "ORIGINALS",
      path: "/originals",
      icon: "M17.625 26.028L10.44 30l1.373-8.412L6 15.631l8.033-1.228 3.592-7.653 3.592 7.653 8.033 1.228-5.813 5.957L24.81 30z",
    },
    {
      title: "MOVIES",
      path: "/movies",
      icon: "M24.71 20.07a2.97 2.97 0 1 0-4.2-4.2 2.97 2.97 0 0 0 4.2 4.2m-12.262 0a2.97 2.97 0 1 0-4.2-4.2 2.97 2.97 0 0 0 4.2 4.2m6.173-10.31a2.969 2.969 0 1 0-4.199 4.198 2.969 2.969 0 0 0 4.199-4.198m0 12.262a2.969 2.969 0 1 0-4.199 4.198 2.969 2.969 0 0 0 4.199-4.198m-1.544-4.629a.846.846 0 1 0-1.197 1.196.846.846 0 0 0 1.197-1.196m18.06-.644c-3.33 6.913-8.165 9.928-11.635 11.24-2.57.971-4.762 1.178-5.949 1.208-.348.032-.698.053-1.052.053C10.287 29.25 5.25 24.213 5.25 18S10.287 6.75 16.5 6.75c6.214 0 11.25 5.037 11.25 11.25a11.19 11.19 0 0 1-2.493 7.054c2.832-1.612 5.844-4.382 8.138-9.143a.968.968 0 0 1 1.742.838",
    },
    {
      title: "SERIES",
      path: "/series",
      icon: "M18.84 11.965h6.722a4 4 0 0 1 4 4V26a4 4 0 0 1-4 4H10.375a4 4 0 0 1-4-4V15.965a4 4 0 0 1 4-4h6.211l-3.981-3.981a1.162 1.162 0 1 1 1.643-1.644l3.465 3.465 3.464-3.465a1.162 1.162 0 0 1 1.644 1.644l-3.982 3.981zm6.428 7.73a1.718 1.718 0 1 0 0-3.436 1.718 1.718 0 0 0 0 3.436zm0 6.011a1.718 1.718 0 1 0 0-3.435 1.718 1.718 0 0 0 0 3.435z",
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY > 0;
      setScrolled(scrollTop);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed flex items-center px-9 w-full ${
        scrolled ? "bg-black" : "bg-transparent"
      } transition-colors duration-300 ease-in-out pointer-events-auto`}>
      <Link to="/" className="mr-8 w-20 h-12">
        <img src={disneyLogo} alt="Disney+" />
      </Link>
      {MenuData.map((item, index) => (
        <Link
          key={index}
          to={item.path}
          className="flex flex-row items-center p-4 relative group">
          <span>
            <svg className="fill-white w-6 h-6" viewBox="0 -5 45 45">
              <path
                d={item.icon}
                className="flex items-center justify-center"></path>
            </svg>
          </span>
          <div className="mx-1 my-2 relative">
            <p className="text-sm tracking-wider p-0.5">{item.title}</p>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 rounded-full bg-white opacity-0 transition-all ease-in-out duration-300 group-hover:w-full group-hover:opacity-100"></span>
          </div>
        </Link>
      ))}
      <div className="menu__right">
        <a href="#"></a>
      </div>
    </div>
  );
};

export default Menu;
