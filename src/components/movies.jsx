import React, { Component } from "react";
import Like from "./common/like";
import ListGroup from "./common/listGroup";
import Pagination from "./common/pagination";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import { paginate } from "../utils/paginate";

class Movies extends Component {
  state = {
    movies: [], // has to be set to an empty array until it get filled after get the data from componentDidMount
    genres: [],
    selectedGenre: "",
    pageSize: 4,
    currentPage: 1
  };

  // the methods order is alphabetical

  componentDidMount() {
    const genres = [{ name: "All Genres" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres });
  }

  handleDelete = movie => {
    const movies = this.state.movies.filter(m => m._id !== movie._id);
    this.setState({ movies: movies });
  };

  handleItemSelect = genre => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  handleLike = movie => {
    const movies = [...this.state.movies]; //clone the whole movies array so it doesn't change
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] }; //clone the object inside the movies array so it doesn't change
    movies[index].liked = !movies[index].liked; // switch it(by default is undefined or falsy) is not in the object yet
    this.setState({ movies });
  };

  handlePageChange = page => {
    console.log(page);
    this.setState({ currentPage: page });
  };

  render() {
    const { length: count } = this.state.movies;
    const { pageSize, currentPage, movies, selectedGenre } = this.state;
    // apply the genre filter before the pagination
    const filtered =
      selectedGenre && selectedGenre._id
        ? movies.filter(m => m.genre._id === selectedGenre._id)
        : movies;
    const moviesOnPage = paginate(filtered, currentPage, pageSize); //need a new array, so use the paginate func
    if (count === 0) return <p>There is no movie</p>;
    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={this.state.genres}
            selectedItem={selectedGenre} // use names that are related to what happening and meaningful
            onItemSelect={this.handleItemSelect}
          />
        </div>
        <div className="col">
          <p>You got {filtered.length} on this page</p>
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Genre</th>
                <th>Stock</th>
                <th>Rate</th>
                <th />
                <th />
              </tr>
            </thead>
            <tbody>
              {moviesOnPage.map(movie => (
                <tr key={movie._id}>
                  <td>{movie.title}</td>
                  <td>{movie.genre.name}</td>
                  <td>{movie.numberInStock}</td>
                  <td>{movie.dailyRentalRate}</td>
                  <td>
                    <Like
                      liked={movie.liked}
                      onClick={() => this.handleLike(movie)}
                    />
                  </td>

                  <td>
                    <button
                      onClick={() => this.handleDelete(movie)}
                      className="btn btn-danger btn-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            itemsCount={filtered.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
