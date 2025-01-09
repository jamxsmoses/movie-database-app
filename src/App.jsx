// import React from "react";
import Navbar from "./components/Navbar";
import { useState, useEffect, useRef } from "react";
import Home from "./pages/Home/Home";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Search from "./pages/Search/Search";
import MovieInformation from "./pages/Search/movie information/MovieInformation";
import "./App.css";
import Favorites from "./pages/Favorites/Favorites";

export default function App() {
  const darkMode = () => {
    document.querySelector("body").setAttribute("data-theme", "dark");
    localStorage.setItem("selectedTheme", "dark");
  };

  const lightMode = () => {
    document.querySelector("body").setAttribute("data-theme", "light");
    localStorage.setItem("selectedTheme", "light");
  };

  const selectedTheme = localStorage.getItem("selectedTheme");

  if (selectedTheme === "dark") {
    darkMode();
  }

  const toggleTheme = (e) => {
    if (e.target.checked) {
      darkMode();
    } else {
      lightMode();
    }
  };

  const [searchText, setSearchText] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [dataStr, setDataStr] = useState("");
  const [data, setData] = useState([]);
  const [status, setStatus] = useState(false);
  const location = useLocation();
  const previousPath = useRef(null);

  // check for current path
  const path = window.location.pathname;

  useEffect(() => {
    // Update the ref to the current path when location changes
    previousPath.current = location.pathname;
  }, [location]);

  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();

  console.log(isFocused);

  // Do this if search input is active
  const handleFocus = () => {
    setIsFocused(true);
    if (path === "/") {
      setData([]);
    }
    navigate("/search"); // Navigate to search
  };

  // Do this if search input is inactive
  const handleBlur = () => {
    if (searchText.length < 1) {
      setIsFocused(false);
      navigate(`/`);
      setError("");
    }
  };

  // handle fetch function
  function handleSearch(event) {
    setSearchText(event.target.value);
  }

  // function for fetching individual movie details
  const fetchSearched = async () => {
    try {
      setIsLoading(true);

      // if search input is empty
      if (searchText === "") {
        setDataStr(`Input a movie name!`);
        setIsLoading(false);
        return;
      }

      // fetch data
      const fetchMovie = await fetch(
        `https://www.omdbapi.com/?s=${searchText}&apikey=c265bca`
      );
      const fetched = await fetchMovie.json();

      // If search result returns nothing
      if (fetched.Response === "False") {
        setStatus(true);
        setDataStr(`No match for search: ${searchText}`);
        setIsLoading(false);
        // console.log(dataStr);
        // console.log(isLoading);
        return;
      }

      setData(fetched.Search);
      // console.log("Data Fetched");
      setStatus(false);
      // console.log(fetched);
      setIsLoading(false);
    } catch (error) {
      // If error
      setError(`Error ${error}`);
      console.error(`Error: ${error}`);
    }
  };

  const [selectedYear, setSelectedYear] = useState("");
  const [sortBy, setSortBy] = useState("");
  // Sort the release years from newest to oldest
  const filteredData = data.sort((a, b) => b.Year - a.Year);

  // filter movies with duplicate release years to be used for filtering movies
  const uniqueReleaseYears = Array.from(
    new Map(filteredData.map((item) => [item.Year, item])).values()
  );

  let filteredYear = data;

  if (sortBy === "Oldest to Newest") {
    filteredYear = filteredYear.sort((a, b) => a.Year - b.Year);
  } else if (sortBy === "Newest to Oldest") {
    filteredYear = filteredYear.sort((a, b) => b.Year - a.Year);
  } else {
    filteredYear = data;
  }

  if (selectedYear !== "") {
    filteredYear = filteredData.filter((year) => year.Year === selectedYear);
  } else {
    filteredYear = data;
  }

  // Create a favorites variable with an empty array and add to local storage

  // Check for if the variable already exist in localStorage
  if (localStorage.getItem("favorites") === null) {
    // if it doesn't exist, create it
    const favorites = [];
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }

  return (
    <>
      <div
        className="homepage animate__animated animate__fadeIn"
        style={{
          backgroundImage: `url(https://wallpapers.com/images/featured/squid-game-fvsfw2qlkey7u5o8.jpg)`,
          position: "absolute",
          top: "0",
          left: "0",
          display: `${path === "/" ? "block" : "none"}`,
        }}
      >
        <div className="homeMain"></div>
      </div>
      <div className="app">
        <Navbar
          handle={handleSearch}
          focus={handleFocus}
          blur={handleBlur}
          search={fetchSearched}
          toggle={toggleTheme}
          selectedTheme={selectedTheme}
        />
        <div className="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/search"
              element={
                <Search
                  dataStr={dataStr}
                  data={filteredYear}
                  isLoading={isLoading}
                  statuss={status}
                  error={error}
                  unique={uniqueReleaseYears}
                  setSelectedYear={setSelectedYear}
                  selectedYear={selectedYear}
                  setSortBy={setSortBy}
                  sortBy={sortBy}
                />
              }
            />
            <Route path="/search/:id" element={<MovieInformation />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </div>
      </div>
    </>
  );
}
