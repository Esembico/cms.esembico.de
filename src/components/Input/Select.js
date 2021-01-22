import React from "react";

export default function Select({
  label,
  value,
  options,
  identifierProperty,
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
      <select className={classes.join(" ")} value={value} {...other}>
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
      {errors && (
        <React.Fragment>
          {Array.isArray(errors) ? (
            <React.Fragment>
              {errors.map((error, i) => {
                return (
                  <span className="error" key={i}>
                    {error}
                  </span>
                );
              })}
            </React.Fragment>
          ) : (
            <span className="error">{errors}</span>
          )}
        </React.Fragment>
      )}
    </div>
  );
}
