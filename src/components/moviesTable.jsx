import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "./common/table";
import Like from "./common/like";

class MoviesTable extends Component {
  // this one is using tableHeader as a child, so the movies is the parent of both of them
  // if the array does not change, does not need to be inside a state
  // for like and delete used altrnative key
  // we can pass like component as value <Like liked={movie.liked} onClick={() => onLike(movie)} />
  // but in order to work we have to pass it as function, add this.props to event lestener
  columns = [
    {
      path: "title",
      lable: "Title",
      content: movie => <Link to={`/movies/${movie._id}`}>{movie.title}</Link> // we add content to use it as link, also use $ to make the value dynamic when you use `` litral
    },
    { path: "genre.name", lable: "Genre" },
    { path: "numberInStock", lable: "Stock" },
    { path: "dailyRentalRate", lable: "Rate" },
    {
      key: "like",
      content: movie => (
        <Like liked={movie.liked} onClick={() => this.props.onLike(movie)} />
      )
    },
    {
      key: "delete",
      content: movie => (
        <button
          onClick={() => this.props.onDelete(movie)}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      )
    }
  ];

  render() {
    // it is cleaner code to have moviesTable component and keep the code neat in the movies component
    // this table is generic and can be a use for a use as example, the columns[] act as wrapper around the table
    const { moviesOnPage, onSort, sortColumn } = this.props;

    return (
      <Table
        columns={this.columns}
        data={moviesOnPage}
        onSort={onSort}
        sortColumn={sortColumn}
      />
    );
  }
}

export default MoviesTable;
