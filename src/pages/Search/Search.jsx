import "./Search.css";
import "animate.css";
import { Link } from "react-router-dom";
// import DisplayMovie from "./DisplayMovie";

function Search(prop) {
  const data = prop.data;
  console.log(data);

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
      <div className="searchPage animate__animated animate__fadeIn">
        <div className="searchPageInner">
          <div className="loader"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="searchPage animate__animated animate__fadeIn">
      {data.length < 1 ? (
        ""
      ) : (
        <div className="filterCon">
          <div className="ryCon">
            <select onChange={(e) => prop.setSelectedYear(e.target.value)}>
              <option defaultValue value="">
                Filter
              </option>
              {prop.unique.map((year) => (
                <option key={prop.unique.indexOf(year)} value={year.Year}>
                  {year.Year}
                </option>
              ))}
            </select>
          </div>
          <span>|</span>
          <div className="ryCon">
            <select onChange={(e) => prop.setSortBy(e.target.value)}>
              <option defaultValue value="">
                Sort
              </option>
              <option value="Oldest to Newest">Oldest to Newest</option>
              <option value="Newest to Oldest">Newest to Oldest</option>
            </select>
          </div>
        </div>
      )}

      <div className="searchPageInner">
        {prop.string === "" || prop.statuss === true ? (
          <p className="p">{prop.dataStr}</p>
        ) : (
          <div className="renderedMoviesCon">
            {data.map((movie) => (
              <Link to={`/search/${movie.imdbID}`} key={movie.imdbID}>
                <div className="movieCon2 animate__animated animate__fadeInUpBig">
                  {movie.Poster === "N/A" ? (
                    <div className="img">Image Not Available</div>
                  ) : (
                    <img
                      src={movie.Poster}
                      alt="Movie Poster"
                      className="img"
                    />
                  )}
                  <div className="renderedDetailsCon">
                    <h1>{movie.Title}</h1>
                    <p>Release Year: {movie.Year}</p>
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
