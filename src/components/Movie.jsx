import "./Movie.css";
import "animate.css";

export default function Movie(prop) {
  return (
    <>
      <div className="movieBox animate__animated animate__fadeIn">
        <div className="imgBox">
          <img src={`${prop.background}`} alt="Background" />
        </div>
        <div className="movieDetailsBox">
          <div>
            <h1>{prop.title}</h1>
            <p>Release Date: {prop.releaseDate}</p>
          </div>
        </div>
      </div>
    </>
  );
}
