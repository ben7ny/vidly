import React, { Component } from "react";
import MoviesTable from "./moviesTable";
import ListGroup from "./common/listGroup";
import Pagination from "./common/pagination";
import { getMovies, deleteMovie } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import { paginate } from "../utils/paginate";
import { Link } from "react-router-dom";
import _ from "lodash";

class Movies extends Component {
  state = {
    movies: [], // has to be set to an empty array until it get filled after get the data from componentDidMount
    genres: [],
    pageSize: 4,
    currentPage: 1,
    sortColumn: { path: "title", order: "asc" }
  };

  // the methods order is alphabetical

  componentDidMount() {
    // does not need a id because is not a real genre (no key you would have problem even when  you check at filtered)
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres });
  }

  handleDelete = movie => {
    const movies = this.state.movies.filter(m => m._id !== movie._id);
    this.setState({ movies: movies });

    deleteMovie(movie._id);
  };

  handleItemSelect = genre => {
    // whenever using filter set everything to 1 otherwise nothing would show after going back to the page
    // there is no need to initialize every property(selectedGenre), and you can add a new object to state in setState

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
    this.setState({ currentPage: page });
  };

  handleSort = sortColumn => {
    // moved it to the moviesTable
    // asc means ascending order from lodash library
    // this.setState({ sortColumn: { path, order: "asc" } });
    this.setState({ sortColumn });
  };

  render() {
    const { length: count } = this.state.movies;
    const {
      pageSize,
      currentPage,
      movies,
      selectedGenre,
      sortColumn
    } = this.state;
    // apply the genre filter before the sorting and then the pagination in this order
    const filtered =
      selectedGenre && selectedGenre._id
        ? movies.filter(m => m.genre._id === selectedGenre._id)
        : movies;
    // the second argument is array where you can store multi columns properties, and the third is the order(asc)
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const moviesOnPage = paginate(sorted, currentPage, pageSize); //need a new array, so use the paginate func
    if (count === 0) return <p>There is no movie</p>;

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            selectedItem={selectedGenre} // use names that are related to what happening and meaningful
            items={this.state.genres}
            onItemSelect={this.handleItemSelect}
          />
        </div>
        <div className="col">
          <Link
            to="movies/new"
            className="btn btn-primary"
            style={{ marginBottom: 20 }}
          >
            New Movie
          </Link>
          <p>You got {filtered.length} on this page</p>
          <MoviesTable
            moviesOnPage={moviesOnPage}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
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
