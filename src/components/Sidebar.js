import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import SwitchButton from "./SwitchButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import "../css/Sidebar.css";

const links = [
  {
    to: "/",
    text: "Home",
  },
  {
    to: "/team",
    text: "Team",
  },
  {
    to: "/prototypes",
    text: "Prototypes",
  },
  {
    to: "/recommendations",
    text: "Recommendations",
  },
  {
    to: "/pages",
    text: "Pages",
  },
  {
    to: "/images",
    text: "Images",
  },
];

export default function Sidebar({ visible, setVisible }) {
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
  }, [darkTheme]);
  const closeSidebar = (e) => {
    e.preventDefault();
    setVisible(false);
  };
  return (
    <div className={`sidenav ${visible ? "show" : ""}`}>
      <div className="close-sidebar">
        <a href="#close-sidebar" onClick={closeSidebar}>
          <FontAwesomeIcon icon={faTimes} />
        </a>
      </div>
      {links.map((link) => {
        return (
          <NavLink
            className="nav-link"
            key={link.text}
            exact={true}
            to={link.to}
          >
            {link.text}
          </NavLink>
        );
      })}
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
