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
      <select {...other}>
        <option></option>
        {options.map((entry) => {
          return (
            <option
              selected={value[identifierProperty] === entry[identifierProperty]}
              value={entry[identifierProperty]}
            >
              {entry.id}
            </option>
          );
        })}
      </select>
      <label className="control-label">{label}</label>
      <i className="bar"></i>
    </div>
  );
}
