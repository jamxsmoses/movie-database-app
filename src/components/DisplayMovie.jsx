import { useState } from "react";
import Movie from "./movie";
import "./DisplayMovie.css";

function DisplayMovie(prop) {
  const [movieList, setMovieList] = useState([]);

  console.log(prop);

  setMovieList(prop.searchedData);
  return (
    <>
      <div className="moviesContainer">
        {movieList.map((movie) => (
          <Movie
            key={movie.id}
            background={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
            title={movie.title}
            releaseDate={movie.release_date}
          />
        ))}
      </div>
    </>
  );
}

export default DisplayMovie;
