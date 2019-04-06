import React, { Component } from "react";
import Like from "./common/like";
import TableHeader from "./common/tableHeader";
import TableBody from "./common/tableBody";
class MoviesTable extends Component {
  // this one is using tableHeader as a child, so the movies is the parent of both of them
  // if the array does not change, does not need to be inside a state
  // for like and delete used altrnative key
  // we can pass like component as value <Like liked={movie.liked} onClick={() => onLike(movie)} />
  // but in order to work we have to pass it as function, add this.props to event lestener
  columns = [
    { path: "title", lable: "Title" },
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
    const { moviesOnPage, onDelete, onLike, onSort, sortColumn } = this.props;

    return (
      <table className="table">
        <TableHeader
          columns={this.columns}
          onSort={onSort}
          sortColumn={sortColumn}
        />
        <TableBody data={moviesOnPage} columns={this.columns} />
      </table>
    );
  }
}

export default MoviesTable;
