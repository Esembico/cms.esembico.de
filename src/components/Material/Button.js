import React from "react";

export default function Button({ children, ...other }) {
  return (
    <div className="button-container">
      <button type="button" {...other}>
        {children}
      </button>
    </div>
  );
}
