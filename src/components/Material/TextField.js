import React from "react";

export default function TextField({
  required,
  value,
  onChange,
  label,
  multiline,
  rows,
  type,
}) {
  return (
    <div className="form-group">
      {multiline && (
        <textarea
          className={value ? "has-value" : ""}
          rows={rows || 3}
          value={value}
          onChange={onChange}
          required={required}
        ></textarea>
      )}
      {!multiline && (
        <input
          className={value ? "has-value" : ""}
          type={type || "text"}
          required={required}
          value={value}
          onChange={onChange}
        />
      )}
      <label className="control-label">{label}</label>
      <i className="bar"></i>
    </div>
  );
}
