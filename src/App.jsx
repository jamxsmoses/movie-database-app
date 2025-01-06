// import React from "react";
import Navbar from "./components/Navbar";
import MovieDetails from "./components/movieDetails";
import { useState, useEffect, useRef } from "react";
import Home from "./pages/Home/Home";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Search from "./components/Search";
import MovieSearchDetails from "./components/movieSearchDetails";
import "./App.css";

export default function App() {
  const [searchText, setSearchText] = useState("");
  const [error, setError] = useState("");

  // Handle Fetch Search Function
  const [isLoading, setIsLoading] = useState(false);
  const [dataStr, setDataStr] = useState("");
  const [data, setData] = useState([]);
  const [status, setStatus] = useState(false);

  const location = useLocation();
  const previousPath = useRef(null);

  const path = window.location.pathname;

  // console.log(
  //   `previous: ${previousPath.current}, current: ${location.pathname}`
  // );

  // console.log(searchText.length);

  useEffect(() => {
    // Update the ref to the current path when location changes
    previousPath.current = location.pathname;
  }, [location]);

  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();

  const handleFocus = () => {
    setIsFocused(true);
    if (path === "/") {
      setData([]);
    }
    navigate("/search"); // Navigate to search
  };

  const handleBlur = () => {
    if (searchText.length < 1) {
      setIsFocused(false);
      navigate(`/`);
      setError("");
    }
  };

  function handleSearch(event) {
    setSearchText(event.target.value);
  }

  const fetchSearched = async () => {
    try {
      setIsLoading(true);

      if (searchText === "") {
        setIsLoading(true);
        // console.log("Yes");
        setDataStr(`Input a movie name!`);
        // console.log(dataStr);
        setIsLoading(false);
        return;
      }

      const fetchMovie = await fetch(
        `https://www.omdbapi.com/?s=${searchText}&apikey=c265bca`
      );
      const fetched = await fetchMovie.json();
      // console.log(fetched);

      if (fetched.Response === "False") {
        setIsLoading(true);
        // console.log(isLoading);
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
      // console.log(data);
      // console.log(data.length);
      // console.log(isLoading);
    } catch (error) {
      setError(`Error ${error}`);
      console.error(`Error: ${error}`);
    }
  };

  // console.log(isFocused)

  // Handle fetch Search for Individual Movies

  return (
    <div className="app">
      <Navbar
        handle={handleSearch}
        focus={handleFocus}
        blur={handleBlur}
        search={fetchSearched}
      />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route
            path="/search"
            element={
              <Search
                dataStr={dataStr}
                data={data}
                isLoading={isLoading}
                statuss={status}
                error={error}
              />
            }
          />
          <Route path="/search/:id" element={<MovieSearchDetails />} />
        </Routes>
      </div>
    </div>
  );
}
