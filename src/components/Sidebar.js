import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import SwitchButton from "./SwitchButton";
import "../css/Sidebar.css"

export default function Sidebar() {
  const [darkTheme, setDarkTheme] = useState(true);
  useEffect(() => {
    const body = document.getElementsByTagName("body")[0];
    if (darkTheme) {
      body.classList.remove("light");
      body.classList.add("dark");
    } else {
      body.classList.remove("dark");
      body.classList.add("light");
    }
  }, [darkTheme])
  return (
    <div className="sidenav">
      <NavLink exact={true} to="/">
        Home
      </NavLink>
      <NavLink exact={true} to="/team">
        Team
      </NavLink>
      <NavLink exact={true} to="/prototypes">
        Prototypes
      </NavLink>
      <NavLink exact={true} to="/recommendations">
        Recommendations
      </NavLink>
      <NavLink exact={true} to="/pages">
        Pages
      </NavLink>
      <NavLink exact={true} to="/images">
        Images
      </NavLink>
      <div className="theme-toggle">
        <SwitchButton
          checked={darkTheme}
          onClick={(e) => setDarkTheme(e.target.checked)}
          label="Theme"
        />
      </div>
    </div>
  );
}
