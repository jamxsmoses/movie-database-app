import "./Navbar.css";
import Logo from "./Logo";
import { useLocation, Link } from "react-router-dom";

function Navbar(prop) {
  const location = useLocation();
  return (
    <div className="navbar">
      <div className="innerNav">
        <Logo />
        <div className="search">
          <input type="text" placeholder="...search" onChange={prop.handle} />
          {location.pathname === "/search" ? (
            <button>Search</button>
          ) : (
            <Link to="/search">
              <button>Search</button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
