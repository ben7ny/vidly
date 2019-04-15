import React, { Component } from "react";
import Joi from "joi-browser";
import Form from "./common/form";

// extend thid class to form, and you have to initialize the state as well
class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {}
  };
  // can't be reusable because is designed for this component
  schema = {
    username: Joi.string()
      .required()
      .label("Username"),
    password: Joi.string()
      .required()
      .label("Password")
  };

  doSubmit = () => {
    // call the server
    console.log("submitted");
  };
  // using this work on extended class as the same own class
  // in the username the type is text by default, but in the password the type is set to be password(.......)
  render() {
    return (
      <div>
        <h1>Log in</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {/* the button was add to form as reusable method) */}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
