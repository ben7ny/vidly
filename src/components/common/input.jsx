import React from "react";
// look at the interface { name, label, value, onChange }
const Input = ({ name, label, value, onChange, error }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        onChange={onChange}
        value={value}
        name={name}
        id={name}
        type="text"
        className="form-control"
      />
      {/* if the left side truthy the right side would appear otherwise nothing happen */}
      {error && <div className="alret alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
