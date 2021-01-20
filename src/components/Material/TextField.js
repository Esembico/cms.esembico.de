import React from "react";

export default function TextField({
  value,
  label,
  multiline,
  rows,
  type,
  ...other
}) {
  return (
    <div className="form-group">
      {multiline && (
        <textarea
          className={value ? "has-value" : ""}
          rows={rows || 3}
          value={value || ""}
          {...other}
        ></textarea>
      )}
      {!multiline && (
        <input
          className={value ? "has-value" : ""}
          type={type || "text"}
          value={value || ""}
          {...other}
        />
      )}
      <label className="control-label">{label}</label>
      <i className="bar"></i>
    </div>
  );
}
