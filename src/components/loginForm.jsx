import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./common/input";

class LoginForm extends Component {
  state = {
    account: { username: "", password: "" },
    // it is easier to use object than array to find something(for array you need to use the find method and it's ugly)
    // errors["username"] vs errors.find(e => e.name === "username")
    errors: {} // this object would be populated with errors that reflect th account members(username:"type somsething")
  };
  // schema doesn't need to be inside the state because it doesn't change
  schema = {
    username: Joi.string()
      .required()
      .label("Username"),
    password: Joi.string()
      .required()
      .label("Password")
  };

  validate = () => {
    // it stop the app by finding the first error unless you set abortEarly to false
    const options = {
      abortEarly: false
    };
    const { error } = Joi.validate(this.state.account, this.schema, options);

    if (!error) return null;

    const errors = {};

    // result.error.details is array that has path with key 0 and value of username and password
    // we take each and the message property  and along each path[0] property push them into erros obj.
    // setting key(item.path[0]) and value(item.message) to the errors object/ the first target is the username
    // most people seggust to use map() or reduce(), but you can use for of loop
    for (let item of error.details) errors[item.path[0]] = item.message;

    return errors;
    // const errors = {};
    // const { account } = this.state;

    // if (account.username.trim() === "")
    //   errors.username = "Username is required";

    // if (account.password.trim() === "")
    //   errors.password = "Password is required";

    // return Object.keys(errors).length === 0 ? null : errors;
  };

  // we have two validator: one(validate) that validate the whole form
  // and the validateProperty that validate each box(user or password individually)
  validateProperty = ({ value, name }) => {
<<<<<<< HEAD
    if (name === "username") {
      if (value.trim() === "") return "Username is required";
      // you can add more conditions like if is lass than 8 chactors
    }

    if (name === "password") {
      if (value.trim() === "") return "Password is required";
      // you can add more conditions like if is lass than 8 chactors
    }
=======
    // we can't use Joi.validate(this.state.account, this.schema), it would effect the whole form
    // and the schema start yelling for all intries errors (empty string, has to be 8 charactors, ...)/
    // jbecause our obj compere to schama is laking a lot of properties, so use sub schema
    // so we have to make a new obj, and just use the schema we already defined at the top
    // instead of hard coding username use object computed name to make it dynamic
    // do not use the option(abortEarly) from schema, it's better to show errors one by one rather all together

    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };

    const { error } = Joi.validate(obj, schema);

    return error ? error.details[0].message : null;

    // if (name === "username") {
    //   if (value.trim() === "") return "Username is required";
    //   // you can add more conditions like if is lass than 8 chactors
    // }

    // if (name === "password") {
    //   if (value.trim() === "") return "Password is required";
    //   // you can add more conditions like if is lass than 8 chactors
    // }
>>>>>>> joi_form_validation
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const account = { ...this.state.account };
    account[input.name] = input.value; // use this to listen to the targeted element and get the value, set then names in forms
    this.setState({ account, errors });
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
          {/* validate eather would return null(falsy) or an object(truthy) */}
          <button className="btn btn-primary" disabled={this.validate()}>
            Login
          </button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
