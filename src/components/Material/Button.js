import React from "react";

export default function Button({ onClick, children }) {
  return (
    <div className="button-container">
      <button type="button" onClick={onClick}>
        {children}
      </button>
    </div>
  );
}
