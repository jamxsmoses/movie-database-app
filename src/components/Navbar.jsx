import "./Navbar.css";
import Logo from "./Logo";

function Navbar(prop) {
  // console.log(prop.search);
  return (
    <div className="navbar">
      <div className="innerNav">
        <Logo />
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
      </div>
    </div>
  );
}

export default Navbar;
