
import Menu from "./Menu/Menu";

const MainHeader = () => {
  return (
    <nav className="fixed top-0 z-20 w-full h-40 bg-gradient-to-b from-black/75 to-transparent pointer-events-none">
      <div></div>
      <Menu />
    </nav>
  );
};

export default MainHeader;
