import { useState } from "react";

interface SearchBarProps {
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  search: string;
}



const SearchBar = ({ setSearch, search }: SearchBarProps) => {
  const [showButton, setShowButton] = useState(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setShowButton(e.target.value !== "");
  };

  const handleReset = () => {
    setSearch("");
    setShowButton(false);
  };

  return (
    <div>
      <form>
        <input
          type="text"
          placeholder="Search by title, character, or genre"
          className="fixed left-0 text-44px font-medium h-24 w-full py-5 px-5% text-zinc-400 placeholder:text-zinc-400 bg-zinc-600 focus:outline-none focus:bg-zinc-500 focus:text-zinc-100 outline-none focus:placeholder:text-zinc-100 transition-all duration-300"
          value={search}
          onChange={handleSearch}
        />
        <button
          type="reset"
          onClick={handleReset}
          className={`flex fixed h-24 right-5 items-center transition-all duration-300 ${
            showButton ? "opacity-1" : "opacity-0"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 text-zinc-100 hover:text-zinc-100 transition duration-300"
            fill="white"
            stroke="currentColor"
          >
            <path d="M17.9 16.239l8.833-9.085c.255-.266.629-.404 1.01-.404.248 0 .491.056.706.175.641.338.817 1.121.301 1.649l-9.081 9.342 9.08 9.312c.517.53.343 1.311-.313 1.657-.546.287-1.276.2-1.7-.231l-8.835-9.062-8.838 9.064c-.421.428-1.152.516-1.699.229-.655-.346-.829-1.127-.312-1.657l9.08-9.312-9.08-9.341c-.516-.529-.34-1.312.313-1.657.202-.112.445-.168.693-.168.382 0 .755.138 1.007.4l8.836 9.089z" />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
