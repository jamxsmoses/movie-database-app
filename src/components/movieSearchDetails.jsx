import "./movieSearchDetails.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function MovieSearchDetails() {
  const [isLoading, setIsLoading] = useState(false);
  const [data2, setData2] = useState();

  const [status, setStatus] = useState(false);

  const { id } = useParams();

  console.log(id);

  const fetchSearched2 = async () => {
    setIsLoading(true);

    const fetchMovie2 = await fetch(
      `https://www.omdbapi.com/?i=${id}&apikey=c265bca`
    );
    const fetched2 = await fetchMovie2.json();

    if (fetched2.Error) {
      setIsLoading(true);
      console.log(isLoading);
      setStatus(true);
      setIsLoading(false);
      console.log(isLoading);
      return;
    }

    setData2(fetched2);

    console.log("Data Fetched");
    setIsLoading(false);
    console.log(data2);
    console.log(isLoading);
  };

  useEffect(() => {
    fetchSearched2();
  });

  console.log(data2);

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
    <>
      <div
        className="mainCon"
        style={{
          backgroundImage: `url(${data2.Poster})`,
        }}
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
