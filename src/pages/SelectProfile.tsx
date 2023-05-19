import { useRef } from "react";
import CardProfile from "@/components/layouts/MainLayout/Components/CardProfile";
import { Link } from "react-router-dom";

import { Profile } from "@/types/types";

interface SelectProfilesProps {
  profiles: Profile[];
  handleSelectedProfile: (profile: Profile) => void;
}

const SelectProfiles = ({
  profiles,
  handleSelectedProfile,
}: SelectProfilesProps) => {
  const childDivRef = useRef<HTMLDivElement>(null);

  const handleOnMouseOver = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    const svgElement = e.currentTarget;
    if (childDivRef.current) {
      childDivRef.current.classList.add("border-white/75");
      childDivRef.current.classList.remove("border-transparent");
    }
    svgElement.classList.add("scale-105");
  };

  const handleOnMouseOut = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    const svgElement = e.currentTarget;
    if (childDivRef.current) {
      childDivRef.current.classList.remove("border-white/75");
      childDivRef.current.classList.add("border-transparent");
    }
    svgElement.classList.remove("scale-105");
  };

  return (
    <div className="flex flex-col justify-center text-center md:min-h-640px items-center">
      <section className="scale-90 md:scale-100">
        <h2 className="text-3xl pb-6">Who's watching?</h2>

        <ul className="flex flex-wrap justify-center max-w-4xl my-10">
          {profiles.map((p) => (
            <div className="m-5 flex flex-col items-center" key={p.name}>
              <Link
                to="/"
                className="flex flex-col items-center rounded-full"
                onClick={() => handleSelectedProfile(p)}>
                <CardProfile image={p.image} />
              </Link>
              <h3 className="text-2xl mt-6">{p.name}</h3>
            </div>
          ))}
          <div className="m-5 flex flex-col items-center">
            <Link
              to="/select-avatar"
              className="relative flex items-center justify-center h-36 w-36 transition-all duration-300 bg-neutral-500/30 hover:bg-white/30 rounded-full"
              onMouseOver={handleOnMouseOver}
              onMouseOut={handleOnMouseOut}>
              <svg className="fill-white h-12 w-12" viewBox="0 0 36 36">
                <path d="M16.469 17.219V5.5a1 1 0 0 1 1-1h.312a1 1 0 0 1 1 1v11.719H30.5a1 1 0 0 1 1 1v.312a1 1 0 0 1-1 1H18.781V31.25a1 1 0 0 1-1 1h-.312a1 1 0 0 1-1-1V19.531H4.75a1 1 0 0 1-1-1v-.312a1 1 0 0 1 1-1h11.719z"></path>
              </svg>
              <div
                ref={childDivRef}
                className="absolute border-transparent w-full h-full top-0 border-4 rounded-full box-border z-20 pointer-events-none transition-all duration-300"></div>
            </Link>
            <h3 className="text-2xl text-zinc-400 mt-6">Add profile</h3>
          </div>
        </ul>
      </section>
    </div>
  );
};

export default SelectProfiles;
