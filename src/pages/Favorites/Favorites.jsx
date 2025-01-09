import "./Favorites.css";
import { Link } from "react-router-dom";

function Favorites() {
  // retrieve favorites from local storage and store in a new variable
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  console.log(favorites);

  return (
    <div className="mainFavCon">
      <div>
        <h1 className="favTitle">Favorite Movies</h1>
      </div>
      <div className="mainDiv2">
        {favorites.length > 0 ? (
          favorites.map((movie) => (
            <Link to={`/search/${movie.imdbID}`} key={movie.imdbID}>
              <div className="movieCon2 animate__animated animate__fadeInUpBig">
                {movie.Poster === "N/A" ? (
                  <div className="img">Image Not Available</div>
                ) : (
                  <img src={movie.Poster} alt="Movie Poster" className="img" />
                )}
                <div className="renderedDetailsCon">
                  <h1>{movie.Title}</h1>
                  <p>Release Year: {movie.Year}</p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div>
            <p>You have not added any movies to favorites.</p>
            <p>
              Search for a movie, preview it, then click on the heart icon to
              add to your favorite movies.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Favorites;
