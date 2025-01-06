import "./Movie1.css";
import "animate.css";
// import { useState, useEffect } from "react";

export default function Movie1(prop) {
  //   const [objectsArray, setObjectsArray] = useState([]);

  //   useEffect(() => {
  //     if (prop) {
  //       setObjectsArray((prevArray) => [...prevArray, prop]); // Add each object to the array
  //     }
  //   }, [prop]);

  //   const props = [...prop];
  return (
    <>
      <div className="movieBox1 animate__animated animate__fadeIn">
        <img className="imgBox" src={prop.source} alt="img" />
        <div className="movieDetailsBox">
          <div>
            <h1 className={prop.title === undefined ? "hidden" : "h1"}>
              {prop.title}
            </h1>
            <h1 className={prop.name === undefined ? "hidden" : "h1"}>
              {prop.name}
            </h1>
            <p>{/* Release Date: <br></br> {prop.releaseDate} */}</p>
          </div>
        </div>
      </div>
    </>
  );
}
