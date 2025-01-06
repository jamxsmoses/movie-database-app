import "./movieDetails.css";
import { useParams } from "react-router-dom";

export default function MovieDetails(prop) {
  const { id } = useParams();

  const movie = prop.data.find((movie) => movie.id === parseInt(id));

  //   console.log(movie.title);

  return (
    <>
      <div
        className="mainCon"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/w500/${movie.backdrop_path})`,
        }}
      >
        <div className="inner"></div>
        <div className="coverCon">
          <div className="movieDetailsBox">
            <div className="detailsCont">
              <div className="leftCon">
                <img
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt="movie"
                />
              </div>
              <div className="rightCon">
                <div className="titleCon">
                  <span>Title</span>
                  <h1 className={movie.title === undefined ? "hidden" : "h1"}>
                    {movie.title}
                  </h1>
                  <h1 className={movie.name === undefined ? "hidden" : "h1"}>
                    {movie.name}
                  </h1>
                </div>
                <div className="aboutCon">
                  <span>Plot</span>
                  <p>{movie.overview}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
