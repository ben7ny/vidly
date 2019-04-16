import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { getMovies, saveMovie, getMovie } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";

class MovieForm extends Form {
  state = {
    data: { title: "", genreId: "", numberInStock: "", dailyRentalRate: "" },
    genres: [],
    errors: {}
  };
  // the genreId is just the genre(action, drama,...) not the genre obj
  schema = {
    _id: Joi.string(),
    title: Joi.string()
      .required()
      .label("Title"),
    genreId: Joi.string()
      .required()
      .label("Genre"),
    numberInStock: Joi.number()
      .required()
      .min(0)
      .max(100)
      .label("Number in Stock"),
    dailyRentalRate: Joi.number()
      .required()
      .min(0)
      .max(10)
      .label("Daily Rental Rate")
  };

  componentDidMount() {
    const genres = getGenres();
    this.setState({ genres });

    const movieId = this.props.match.params.id; // check if the movie exists
    if (movieId === "new") return; // new reprsent the entered new movie name to be checked, return if already exist

    const movie = getMovie(movieId);
    if (!movie) return this.props.history.replace("./not-found"); // if the movie does not exist it goes to not-found
    // using replace instead of push because with push and invalid id the user goes in infinate loop
    // can't cilck tha back button to get where they use be
    // the restful server are general purpose, so we have take the data and filter out what we need to use(view model)
    this.setState({ data: this.mapToViewModel(movie) });
  }

  // here we just need the genreId instead of the the whole genre obj
  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate
    };
  }

  doSubmit = () => {
    saveMovie(this.state.data);
    // redirec the user to movie page after saving a new movie
    this.props.history.push("/movies");
  };

  // renderSelect render drop dwon list
  render() {
    return (
      <div>
        <h1>Log in</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderSelect("genreId", "Genre", this.state.genres)}
          {this.renderInput("numberInStock", "Number in Stock", "number")}
          {this.renderInput("dailyRentalRate", "Rate")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default MovieForm;
