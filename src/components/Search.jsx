import { useEffect, useState } from "react";
import "./Search.css";
import "animate.css";
import { Link } from "react-router-dom";
// import DisplayMovie from "./DisplayMovie";

function Search(prop) {
  const [isLoading, setIsLoading] = useState(false);
  const [dataStr, setDataStr] = useState("");
  const [data, setData] = useState([]);
  const [status, setStatus] = useState(false);

  const fetchSearched = async () => {
    setIsLoading(true);

    if (prop.string === "") {
      setIsLoading(true);
      console.log("Yes");
      setDataStr(`Input a movie name!`);
      console.log(dataStr);
      setIsLoading(false);
      return;
    }

    const fetchMovie = await fetch(
      `https://www.omdbapi.com/?s=${prop.string}&apikey=c265bca`
    );
    const fetched = await fetchMovie.json();
    console.log(fetched);

    if (fetched.Response === "False") {
      setIsLoading(true);
      console.log(isLoading);
      setStatus(true);
      setDataStr(`No match for search: ${prop.string}`);
      setIsLoading(false);
      console.log(dataStr);
      console.log(isLoading);
      return;
    }

    setData(fetched.Search);

    console.log("Data Fetched");
    setStatus(false);
    console.log(fetched);
    setIsLoading(false);
    console.log(data);
    console.log(data.length);
    console.log(isLoading);
  };

  useEffect(() => {
    fetchSearched();
  }, []);

  //
  console.log(status);
  if (isLoading) {
    return (
      <div className="searchPage">
        <div className="searchPageInner">
          <div className="loader"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="searchPage">
      <div className="searchPageInner">
        {prop.string === "" || status === true ? (
          <p className="p">{dataStr}</p>
        ) : (
          <div className="renderedMoviesCon">
            {data.map((movie) => (
              <Link to={`/search/${movie.imdbID}`} key={movie.imdbID}>
                <div className="movieCon2 animate__animated animate__fadeInUpBig">
                  {movie.Poster === "N/A" ? (
                    <div className="img">Image Not Available</div>
                  ) : (
                    <img src={movie.Poster} />
                  )}
                  <div className="renderedDetailsCon">
                    <h1>{movie.Title}</h1>
                    <p>Release Date: {movie.Year}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;
