import { Link } from "react-router-dom";

import { Profile } from "@/types/types";


interface Props {
  selectedProfile: Profile;
  profiles: Profile[];
  handleSelectedProfile: (profile: Profile | undefined) => void;
}

const ProfileMenu = ({
  selectedProfile,
  profiles,
  handleSelectedProfile,
}: Props) => {
  const ProfileMenuData = [
    {
      name: "Edit profiles",
      link: "/",
    },
    {
      name: "App settings",
      link: "/",
    },
    {
      name: "Account",
      link: "/",
    },
    {
      name: "Help",
      link: "/",
    },
    {
      name: "Log out",
      link: "/",
    },
  ];

  return (
    <div className="flex">
      <ul className="absolute pt-1 top-0 right-0 group/active px-5 hover:max-h-100@ hover:pb-5 w-60 z-10 flex flex-col hover:bg-neutral-900 border border-transparent hover:border-neutral-700 rounded transition-all duration-300">
        <li className="relative flex justify-end items-center overflow-hidden py-2 cursor-pointer">
          <p className="mx-4 font-normal hidden laptopL:block group-hover/active:block">
            {selectedProfile.name.length > 10
              ? `${selectedProfile.name.substring(0, 10)}...`
              : selectedProfile.name}
          </p>
          <div className="h-12 w-12 bg-neutral-700 rounded-full">
            <img
              src={selectedProfile.image.image}
              alt={selectedProfile.image.alt}
            />
          </div>
        </li>

        <div className="bg-neutral-800 relative h-px mb-2 hidden group-hover/active:block" />
        <div className="hidden group-hover/active:block">
          {profiles.map((item) => {
            if (item.id !== selectedProfile.id) {
              const displayName =
                item.name.length > 10
                  ? `${item.name.substring(0, 10)}...`
                  : item.name;
              return (
                <li
                  className="flex overflow-hidden items-center py-2 relative cursor-pointer group/hover"
                  key={item.id}
                  onClick={() => handleSelectedProfile(item)}>
                  <span className="h-12 w-12 bg-neutral-700 rounded-full">
                    <img src={item.image.image} alt={item.image.alt} />
                  </span>
                  <p className="ml-4 font-normal tracking-wide text-sm text-neutral-400 group-hover/hover:text-white">
                    {displayName}
                  </p>
                </li>
              );
            }
            return null;
          })}

          <li className=" flex overflow-hidden relative group/Add">
            <Link
              to="/select-avatar"
              className="relative flex justify-start w-full py-2 items-center">
              <div className="h-12 w-12 bg-neutral-800 rounded-full group-hover/Add:bg-neutral-700">
                <svg className="fill-white" viewBox="-17 -17 70 70">
                  <path d="M16.469 17.219V5.5a1 1 0 0 1 1-1h.312a1 1 0 0 1 1 1v11.719H30.5a1 1 0 0 1 1 1v.312a1 1 0 0 1-1 1H18.781V31.25a1 1 0 0 1-1 1h-.312a1 1 0 0 1-1-1V19.531H4.75a1 1 0 0 1-1-1v-.312a1 1 0 0 1 1-1h11.719z"></path>
                </svg>
              </div>
              <p className="ml-4 font-normal tracking-wide text-sm text-neutral-400">
                Add profile
              </p>
            </Link>
          </li>
          {ProfileMenuData.map((item, index) => (
            <li
              className="flex  overflow-hidden relative group/hover"
              key={index}>
              <Link
                to={item.link}
                className="relative flex justify-start py-2 w-full items-center">
                <p className="font-normal tracking-wide text-sm text-neutral-400 group-hover/hover:text-white">
                  {item.name}
                </p>
              </Link>
            </li>
          ))}
        </div>
      </ul>
    </div>
  );
};

export default ProfileMenu;
