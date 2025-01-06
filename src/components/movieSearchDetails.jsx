import "./movieSearchDetails.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function MovieSearchDetails() {
  const [isLoading2, setIsLoading2] = useState(true);
  const [data2, setData2] = useState();

  const [status2, setStatus2] = useState(false);

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

  return (
    <>
      <div
        className="mainCon"
        style={{ backgroundImage: `url(${data2.Poster})` }}
      >
        <div className="inner"></div>
        <div className="coverCon">
          <div className="movieDetailsBox">
            <div className="detailsCont">
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
                    {data2.Ratings.map((rating) => (
                      <div key={data2.Ratings.indexOf(rating)}>
                        <p
                          style={{ color: "#ffbb00" }}
                        >{`${rating.Source}: `}</p>
                        <span>{rating.Value}</span>
                      </div>
                    ))}
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

export default MovieSearchDetails;
