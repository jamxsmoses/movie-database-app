import "./Home.css";
import "animate.css";

function Home() {
  return (
    <>
      <div
        className="homepage animate__animated animate__fadeIn"
        style={{
          backgroundImage: `url(https://wallpapers.com/images/featured/squid-game-fvsfw2qlkey7u5o8.jpg)`,
        }}
      >
        <div className="homeMain">
          <div className="homeContent">
            <div className="contentCon">
              <div className="heroTextCont">
                <h1>Discover Your Next Favorite Movie</h1>
                <div className="pCont">
                  <p>
                    Search through a world of cinematic wonders and uncover
                    stories that captivate and inspire.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
