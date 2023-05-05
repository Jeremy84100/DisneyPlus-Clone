import Header from "./Components/Header/Header";
import Background from "./Components/Background";

import Home from "../../../pages/Home";
import Search from "../../../pages/Search";
import Watchlist from "../../../pages/Watchlist";
import Originals from "../../../pages/Originals";
import Movies from "../../../pages/Movies";
import Series from "../../../pages/Series";

import { Routes, Route, useLocation } from "react-router-dom";

import Footer from "./Components/Footer";

const MainLayout = () => {
  const location = useLocation();
  const showBackground =
    location.pathname === "/" ||
    location.pathname === "/search" ||
    location.pathname === "/watchlist";

  return (
    <div className="flex flex-col min-h-screen overflow-hidden pt-72px">
      <Header />
      {showBackground && <Background />}
      <main className="px-5%">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/originals" element={<Originals />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/series" element={<Series />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
