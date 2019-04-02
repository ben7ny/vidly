import React from "react";
// Input like: boolean
// common like reases enent on a click can be rendered in movie or someweher else(common)

const Like = props => {
  let classes = "fa fa-heart";
  if (!props.liked) classes += "-o";
  return (
    <i
      className={classes}
      onClick={props.onClick} // this onClick get an event from the DOM, it's different form the onClick in movies.jsx(can name it: onToggle)
      style={{ cursor: "pointer" }}
      aria-hidden="true"
    />
  );
};

export default Like;
