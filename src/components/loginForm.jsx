import React, { Component } from "react";
import Input from "./common/input";

class LoginForm extends Component {
  state = {
    account: { username: "", password: "" },
    // it is easier to use object than array to find something(for array you need to use the find method and it's ugly)
    // errors["username"] vs errors.find(e => e.name === "username")
    errors: {} // this object would be populated with errors that reflect th account members(username:"type somsething")
  };

  validate = () => {
    const errors = {};
    const { account } = this.state;

    if (account.username.trim() === "")
      errors.username = "Username is required";

    if (account.password.trim() === "")
      errors.password = "Password is required";

    return Object.keys(errors).length === 0 ? null : errors;
  };
  // we have two validator: one(validate) that validate the whole form
  // and the validateProperty that validate each box(user or password individually)
  validateProperty = ({ value, name }) => {
    if (name === "username") {
      if (value.trim() === "") return "Username is required";
      // you can add more conditions like if is lass than 8 chactors
    }
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const account = { ...this.state.account };
    account[input.name] = input.value; // use this to listen to the targeted element and get the value, set then names in forms
    this.setState({ account });
  };

  handleSubmit = e => {
    e.preventDefault();

    const errors = this.validate();
    console.log(errors);
    // in the validate if everything is ok it would be null, but react doesn't like
    // so either has to be an error or an ampty object
    this.setState({ errors: errors || {} });
    if (errors) return;

    // call the server
    console.log("submitted");
  };

  render() {
    const { account, errors } = this.state;
    return (
      <div>
        <h1>Log in</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            name="username"
            value={account.username}
            label="Username"
            onChange={this.handleChange}
            error={errors.username}
          />
          <Input
            name="password"
            value={account.password}
            label="Password"
            onChange={this.handleChange}
            error={errors.password}
          />
          <button className="btn btn-primary">Login</button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
