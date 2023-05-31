import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CardProfile from "@/components/CardProfile";

import { Image, Profile } from "@/types/types";

interface AddProfileProps {
  selectedImage: Image;
  profileName: string;
  handleProfileName: (e: any) => void;
  handleAddProfile: (profile: Profile) => void;
}

const AddProfile = ({
  selectedImage,
  profileName,
  handleProfileName,
  handleAddProfile,
}: AddProfileProps) => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const saveProfile = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (profileName.trim().length === 0) {
      setError("This field is required");
    } else {
      setError("");
      handleAddProfile({
        image: selectedImage,
        name: profileName,
        id: 1, 
        watchlist: [],
      });
      navigate("/select-profile");
    }
  };

  return (
    <div className="pt-20 text-3xl flex justify-center">
      <form className="flex justify-center max-w-3xl w-full">
        <div className="flex flex-col w-full">
          <h2 className="mb-6 font-medium">Add profile</h2>
          <input
            type="text"
            placeholder="Profile name"
            className={`text-sm font-normal placeholder:text-neutral-400 py-4 pl-3 outline-none bg-neutral-500/30 border ${
              error ? "border-red-500" : "border-transparent"
            } rounded focus:border-neutral-500/80`}
            onChange={handleProfileName}
          />
          {error && (
            <p className="text-red-500 text-xs font-light ml-2 mt-2">{error}</p>
          )}
          <button
            className="mt-12 py-4 text-sm tracking-wide rounded bg-blue-500"
            onClick={saveProfile}>
            SAVE
          </button>
        </div>
        <div className="w-full max-w-xs">
          <div className="ml-20">
            <CardProfile image={selectedImage} />
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProfile;
