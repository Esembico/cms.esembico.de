import React from "react";

export default function Select({
  label,
  value,
  options,
  identifierProperty,
  ...other
}) {
  return (
    <div className="form-group">
      <select value={value} {...other}>
        <option></option>
        {options.map((option, i) => {
          return (
            <option key={i} value={option.value}>
              {option.display}
            </option>
          );
        })}
      </select>
      <label className="control-label">{label}</label>
      <i className="bar"></i>
    </div>
  );
}
