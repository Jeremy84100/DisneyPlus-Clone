import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import styled from "styled-components";

import disneyLogo from "@/assets/images/disney-logo.svg";
import ProfileMenu from "../ProfileMenu/ProfileMenu";

import { Profile } from "@/types/types";


interface Props {
  selectedProfile: Profile;
  profiles: Profile[];
  handleSelectedProfile: (profile: Profile | undefined) => void;
}


const Menu = ({ selectedProfile, profiles, handleSelectedProfile }: Props) => {
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
          className={`flex flex-row items-center p-4 max-lg:px-3 max-lg:py-5 group ${
            item.title === "ORIGINALS" ||
            item.title === "MOVIES" ||
            item.title === "SERIES"
              ? "relative max-lg:hidden"
              : "relative"
          }`}>
          <div className="relative">
            <svg
              className={`fill-white w-6 h-6 flex items-center mbq-0.5 justify-center ${
                item.title === "WATCHLIST"
                  ? "max-lg:h-6 max-lg:w-6 mt-1"
                  : "max-lg:h-7 max-lg:w-7"
              }`}
              viewBox="0 -5 45 45">
              <path d={item.icon}></path>
            </svg>
            <span
              className={`absolute lg:hidden bottom-0 left-0 right-0 h-0.5 w-0 bg-white opacity-0 transition-all ease-in-out duration-300 group-hover:opacity-100 ${
                item.title === "WATCHLIST"
                  ? "group-hover:w-4"
                  : "group-hover:w-6"
              } `}
            />
          </div>
          <div className="mx-1 my-2 relative max-lg:hidden">
            <p className="text-sm tracking-wider p-0.5">{item.title}</p>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 rounded-full bg-white opacity-0 transition-all ease-in-out duration-300 group-hover:w-full group-hover:opacity-100" />
          </div>
        </Link>
      ))}
      <Responsive className="py-4 px-3 cursor-pointer relative lg:hidden group">
        <svg
          className="fill-white w-6 h-6"
          color="#f9f9f9"
          viewBox="0 -5 40 40">
          <path d="M19.53 28.827h-2.933a1.048 1.048 0 0 1-1.048-1.047v-2.933c0-.579.47-1.048 1.048-1.048h2.933c.578 0 1.047.47 1.047 1.048v2.933c0 .578-.469 1.047-1.047 1.047zm0-8.799h-2.933a1.048 1.048 0 0 1-1.048-1.047v-2.933c0-.579.47-1.048 1.048-1.048h2.933c.578 0 1.047.469 1.047 1.048v2.933c0 .578-.469 1.047-1.047 1.047zm0-8.8h-2.933a1.048 1.048 0 0 1-1.048-1.047V7.248c0-.578.47-1.047 1.048-1.047h2.933c.578 0 1.047.469 1.047 1.047v2.933c0 .579-.469 1.048-1.047 1.048z"></path>
        </svg>
        <span className="absolute top-14 py-1.5 pl-4 pr-9 z-10 flex flex-col bg-neutral-900 border border-neutral-700 rounded transition-all duration-300 ease-out">
          {MenuData.slice(3).map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className="flex flex-row items-center relative group/responsive">
              <svg
                className="fill-white w-7 h-7 flex items-center justify-center"
                viewBox="0 -5 45 45">
                <path d={item.icon}></path>
              </svg>
              <div className="mx-1 my-3 relative">
                <p className="text-sm tracking-widest p-0.5">{item.title}</p>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 rounded-full bg-white opacity-0 transition-all ease-in-out duration-300 group-hover/responsive:w-full group-hover/responsive:opacity-100"></span>
              </div>
            </Link>
          ))}
        </span>
      </Responsive>
      <ProfileMenu selectedProfile={selectedProfile} profiles={profiles} handleSelectedProfile={handleSelectedProfile} />
    </div>
  );
};

const Responsive = styled.span`
  &:hover {
    span {
      opacity: 1;
      visibility: visible;
    }
  }
  span {
    opacity: 0;
    visibility: hidden;
  }
`;

export default Menu;
