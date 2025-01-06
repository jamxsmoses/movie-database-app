// import React from "react";
import Navbar from "./components/Navbar";
import MovieDetails from "./components/movieDetails";
import { useState } from "react";
import Home from "./pages/Home/Home";
import { Routes, Route } from "react-router-dom";
import Search from "./components/search";
import MovieSearchDetails from "./components/movieSearchDetails";
import "./App.css";

export default function App() {
  const [searchText, setSearchText] = useState("");

  function handleSearch(event) {
    setSearchText(event.target.value);
  }

  return (
    <div className="app">
      <Navbar handle={handleSearch} />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/search" element={<Search string={searchText} />} />
          <Route path="/search/:id" element={<MovieSearchDetails />} />
        </Routes>
      </div>
    </div>
  );
}
