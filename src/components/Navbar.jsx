import "./Navbar.css";
import Logo from "./Logo/Logo";
import Favorites from "../assets/Favorites_1.png";
import DarkMode from "./DarkMode/DarkMode";
import { Link } from "react-router-dom";

function Navbar(prop) {
  return (
    <div className="navbar">
      <div className="innerNav">
        <Logo />
        <div className="search1">
          <div className="search">
            <input
              type="text"
              placeholder="...search"
              onChange={prop.handle}
              onFocus={prop.focus}
              onBlur={prop.blur}
            />

            <button onClick={prop.search}>Search</button>
          </div>
          <div className="otherCtrls">
            <Link to="/favorites">
              <img
                src={Favorites}
                alt="Favorites Icon"
                className="favorites-icon"
              />
            </Link>
            <DarkMode toggle={prop.toggle} selectedTheme={prop.selectedTheme} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
