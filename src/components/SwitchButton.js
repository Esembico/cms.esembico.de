import React from "react";
import "../css/SwitchButton.css"

export default function SwitchButton({ label, checked, onClick }) {
  return (
    <div>
      <label className="switch">
        <input defaultChecked={checked} type="checkbox" onClick={(e) => onClick(e)} />
        <span className="slider" />
      </label>
      <span className="switch-label">{label}</span>
    </div>
  );
}
