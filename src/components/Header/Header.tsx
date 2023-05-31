import Menu from "./Menu/Menu";

import { Profile } from "@/types/types";

interface Props {
  selectedProfile: Profile;
  profiles: Profile[];
  handleSelectedProfile: (profile: Profile | undefined) => void;
}

const MainHeader = ({
  selectedProfile,
  profiles,
  handleSelectedProfile,
}: Props) => {
  return (
    <nav className="fixed top-0 z-40 w-full h-40 bg-gradient-to-b from-black/75 to-transparent pointer-events-none">
      <div></div>
      <Menu
        selectedProfile={selectedProfile}
        profiles={profiles}
        handleSelectedProfile={handleSelectedProfile}
      />
    </nav>
  );
};

export default MainHeader;
