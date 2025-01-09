import "./DarkMode.css";

function DarkMode(prop) {
  // console.log(prop.toggle);
  return (
    <div className="dark_mode">
      <input
        className="dark_mode_input"
        type="checkbox"
        id="darkmode-toggle"
        onChange={prop.toggle}
        defaultChecked={prop.selectedThem === "dark"}
      />
      <label className="dark_mode_label" htmlFor="darkmode-toggle"></label>
    </div>
  );
}

export default DarkMode;
