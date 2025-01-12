import "./MovieInformation.css";
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

function MovieInformation() {
  const [isLoading2, setIsLoading2] = useState(true);
  const [data2, setData2] = useState();

  const [status2, setStatus2] = useState(false);

  const ref = useRef("");

  console.log(status2);

  const { id } = useParams();

  useEffect(() => {
    const fetchSearched2 = async () => {
      const fetchMovie2 = await fetch(
        `https://www.omdbapi.com/?i=${id}&apikey=c265bca`
      );
      const fetched2 = await fetchMovie2.json();
      setData2(fetched2);

      if (fetched2.Error) {
        setStatus2(true);
        setIsLoading2(false);
        return;
      }

      setIsLoading2(false);
    };

    fetchSearched2();
  }, []);

  console.log(data2);

  if (isLoading2) {
    return (
      <div className="searchPage">
        <div className="searchPageInner">
          <div className="loader"></div>
        </div>
      </div>
    );
  }

  function toFav() {
    // retrieve favorites from local storage and store in a new variable
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    // check if movie exists in local storage
    if (favorites.some((movie) => movie.imdbID === id)) {
      // if it exist, delete movie
      const newFavorites = favorites.filter((movie) => movie.imdbID !== id);

      localStorage.setItem("favorites", JSON.stringify(newFavorites));
      // checkMovieExist();

      ref.current = "cls-1-white";
    } else {
      // if it doesn't, push object to array
      favorites.push(data2);
      // Add array to localStorage
      localStorage.setItem("favorites", JSON.stringify(favorites));
      ref.current = "cls-1";
      // checkMovieExist();
    }
  }

  const length = data2.Ratings.length;
  // console.log(length);

  // Retrieve favorite movies array from localStorage
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  // check if current movie exists in local storage
  function checkMovieExist() {
    if (favorites.some((movie) => movie.imdbID === id)) {
      ref.current = "cls-1";
    } else {
      ref.current = "cls-1-white";
    }
  }

  checkMovieExist();

  return (
    <>
      <div className="mainCon">
        <div className="movieDetailsBox">
          <div className="detailsCont">
            <div
              className="bgCon"
              style={{ backgroundImage: `url(${data2.Poster})` }}
            ></div>

            <div className="coverCon">
              <svg onClick={toFav} viewBox="0 0 248.47 226.19">
                <g id="Layer_2" data-name="Layer 2">
                  <g id="Layer_1-2" data-name="Layer 1">
                    <path
                      className={ref.current}
                      d="M65.89,0c23.13.62,41.64,12.1,55.4,31.85,2.32,3.33,3.2,3.81,5.76.11,12.44-18,29-29.64,51.29-31.56C201.85-1.64,220,8.55,234,26.54c19.27,24.69,17.4,51.26,5.39,78.13C231.32,122.73,218,137.1,204.33,151c-25.13,25.48-52,49.11-77.9,73.8-1.31,1.26-2.25,2.2-4.05.45-31.94-31.07-66.61-59.38-95.66-93.39C12.87,115.63,3.54,97.33.57,75.71-4.88,36,29.45-.29,65.89,0Z"
                    />
                  </g>
                </g>
              </svg>
            </div>

            <div className="mainDetailsCont">
              <div className="leftCon">
                <img src={data2.Poster} />
              </div>
              <div className="rightCon">
                <div className="titleCon">
                  <span>Title</span>
                  <h1 className="h1">{data2.Title}</h1>
                </div>
                <div className="aboutCon">
                  <span>Plot</span>
                  <p>{data2.Plot}</p>
                </div>
                <div className="aboutCon">
                  <span>Cast</span>
                  <p>{data2.Actors}</p>
                </div>
                <div className="aboutCon">
                  <span>Genre</span>
                  <p>{data2.Genre}</p>
                </div>
                <div className="aboutCon">
                  <span>Ratings</span>
                  <div className="ratingsCont">
                    {length > 1 ? (
                      data2.Ratings.map((rating) => (
                        <div key={data2.Ratings.indexOf(rating)}>
                          <p className="source">{`${rating.Source}: `}</p>
                          <span>{rating.Value}</span>
                        </div>
                      ))
                    ) : (
                      <p>No rating available</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MovieInformation;
