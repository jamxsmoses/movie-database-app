import "./Search.css";
import "animate.css";
import { Link } from "react-router-dom";
// import DisplayMovie from "./DisplayMovie";

function Search(prop) {
  if (prop.error) {
    return (
      <div className="searchPage">
        <div className="searchPageInner">
          <p className="p">{prop.error}</p>
        </div>
      </div>
    );
  }

  if (prop.isLoading) {
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
        {prop.string === "" || prop.statuss === true ? (
          <p className="p">{prop.dataStr}</p>
        ) : (
          <div className="renderedMoviesCon">
            {prop.data.map((movie) => (
              <Link to={`/search/${movie.imdbID}`} key={movie.imdbID}>
                <div className="movieCon2 animate__animated animate__fadeInUpBig">
                  {movie.Poster === "N/A" ? (
                    <div className="img">Image Not Available</div>
                  ) : (
                    <img src={movie.Poster} alt="Movie Poster" />
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
