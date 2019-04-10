import React from "react";
const MovieForm = ({ match, history }) => {
  return (
    <div>
      <h1>{match.params.id}</h1>
      <button
        className="btn btn-primary"
        onClick={() => history.push("/movies")} // in functional component instead of handleClick we use it as => function
      >
        Save
      </button>
    </div>
  );
};

export default MovieForm;
