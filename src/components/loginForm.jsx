import React, { Component } from "react";

class LoginForm extends Component {
  state = {
    account: { username: "", password: "" }
  };
  handleChange = ({ currentTarget: input }) => {
    const account = { ...this.state.account };
    account[input.name] = input.value; // use this to listen to the targeted element and get the value, set then names in forms
    this.setState({ account });
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log("submitted");
  };

  // the for is saved in react so like className instead of for use htmlFor
  render() {
    const { account } = this.state;
    return (
      <div>
        <h1>Log in</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              onChange={this.handleChange}
              value={account.username}
              name="username"
              id="username"
              type="text"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              onChange={this.handleChange}
              value={account.password}
              name="password"
              //   autoFocus    it would work even without that true by default
              id="password"
              type="text"
              className="form-control"
            />
          </div>
          <button className="btn btn-primary">Login</button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
