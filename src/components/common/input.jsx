import React from "react";

const Input = ({ name, label, error, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input {...rest} name={name} id={name} className="form-control" />

      {/* if the left side truthy the right side would appear otherwise nothing happen */}
      {error && <div className="alret alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
