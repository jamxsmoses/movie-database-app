import { NavLink } from "react-router-dom";
import "./Logo.css";

function Logo() {
  return (
    <NavLink to="/">
      <div className="logo">
        <span className="logoMovieSpan">Movie</span>
        <span className="LogoDBSpan">DB</span>
      </div>
    </NavLink>
  );
}

export default Logo;
