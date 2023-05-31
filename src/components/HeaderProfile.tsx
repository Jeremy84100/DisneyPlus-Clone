import { useLocation, useNavigate } from "react-router-dom";
import disneyLogo from "@/assets/images/disney-logo.svg";

const HeaderProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleButtonClick = () => {
    if (location.pathname === "/select-profile") {
      navigate("/select-profile");
    } else if (location.pathname === "/select-avatar") {
      navigate("/add-profile");
    } else if (location.pathname === "/add-profile") {
      navigate("/select-profile");
    }
  };

  let buttonText = "";
  if (location.pathname === "/select-profile") {
    buttonText = "EDIT PROFILES";
  } else if (location.pathname === "/select-avatar") {
    buttonText = "SKIP";
  } else if (location.pathname === "/add-profile") {
    buttonText = "CANCEL";
  }

  return (
    <div className="fixed z-50 top-0 h-72px flex justify-between items-center px-9 w-full">
      <div className="w-20 h-12">
        <img src={disneyLogo} alt="Disney+" />
      </div>
      <button
        className="px-6 h-12 rounded tracking-widest bg-zinc-700 hover:bg-zinc-600 transition-all duration-200 ease-in-out"
        onClick={handleButtonClick}>
        {buttonText}
      </button>
    </div>
  );
};

export default HeaderProfile;
