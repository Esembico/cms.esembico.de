import React from "react";

export default function TextField({
  value,
  label,
  multiline,
  rows,
  type,
  errors,
  ...other
}) {
  const classes = [];
  if (value) {
    classes.push("has-value");
  }
  if (errors) {
    classes.push("has-errors");
  }
  return (
    <div className="form-group">
      {multiline && (
        <textarea
          className={classes.join(" ")}
          rows={rows || 3}
          value={value || ""}
          {...other}
        ></textarea>
      )}
      {!multiline && (
        <input
          className={classes.join(" ")}
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
