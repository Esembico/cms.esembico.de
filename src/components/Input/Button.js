import React from "react";

export default function Button({ children, type, ...other }) {
  return (
    <div className="button-container">
      <button type="button" className={type || "primary"} {...other}>
        {children}
      </button>
    </div>
  );
}
