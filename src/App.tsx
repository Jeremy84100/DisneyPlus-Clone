import { Routes, Route } from "react-router-dom";

import MainLayout from "./components/layouts/MainLayout/MainLayout";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Watchlist from "./pages/Watchlist";
import Originals from "./pages/Originals";
import Movies from "./pages/Movies";
import Series from "./pages/Series";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/" index element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/originals" element={<Originals />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/series" element={<Series />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
