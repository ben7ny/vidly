import React from "react";
// look at the interface { name, label, value, onChange }
// const Input = ({ name, label, value, onChange, error, type }) => {
//   return (
//     <div className="form-group">
//       <label htmlFor={name}>{label}</label>
//       <input
//         onChange={onChange}
//         value={value}
//         name={name}
//         id={name}
//         type={type}
//         className="form-control"
//       />

// you can use spread and rest operator to pass the default props(value, onChange, and type) instead of repeating

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
