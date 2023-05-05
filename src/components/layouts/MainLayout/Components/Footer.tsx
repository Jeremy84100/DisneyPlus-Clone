import { Link } from "react-router-dom";

import disneyLogo from "@/assets/images/disney-logo.svg";

const Footer = () => {
  return (
    <footer className=" mt-auto">
      <div className="flex flex-col items-center bg-disney-footer mt-24">
        <Link to="/">
          <img
            src={disneyLogo}
            alt="Disney+"
            className="fill-white w-20 h-18 pt-5"
          />
        </Link>
        <div className="flex justify-center flex-wrap">
          <button className="text-white text-xs font-normal px-1.5 py-px my-2.5 mx-1">
            Privacy Policy
          </button>
          <button className="text-white text-xs font-normal px-1.5 py-px my-2.5 mx-1">
            Cookies Policy
          </button>
          <button className="text-white text-xs font-normal px-1.5 py-px my-2.5 mx-1">
            UK & EU Privacy Rights
          </button>
          <button className="text-white text-xs font-normal px-1.5 py-px my-2.5 mx-1">
            About Disney+
          </button>
          <button className="text-white text-xs font-normal px-1.5 py-px my-2.5 mx-1">
            Subscriber Agreement
          </button>
          <button className="text-white text-xs font-normal px-1.5 py-px my-2.5 mx-1">
            Help
          </button>
          <button className="text-white text-xs font-normal px-1.5 py-px my-2.5 mx-1">
            Supported Devices
          </button>
          <button className="text-white text-xs font-normal px-1.5 py-px my-2.5 mx-1">
            About Us
          </button>
          <button className="text-white text-xs font-normal px-1.5 py-px my-2.5 mx-1">
            Interest-based Ads
          </button>
          <button className="text-white text-xs font-normal px-1.5 py-px my-2.5 mx-1">
            Manage Preferences
          </button>
        </div>
        <div className="text-slate-200 text-xs font-normal pt-2 pb-6">
          © Disney. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
