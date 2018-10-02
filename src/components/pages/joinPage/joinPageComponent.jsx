import React, { Component } from "react";

import "./styles/joinPageComponent.css";

class JoinPageComponent extends Component {
  state = {
    userType: "",
    email: "",
    password: ""
  };

  componentDidMount() {
    //Set initial user type in state based on route param
    const { userType } = this.props.match.params;
    this.setState({ userType }, () => {
      console.log(this.state.userType);
    });
    this.validate();
  }

  validate() {
    console.log("validating...");
  }

  render() {
    return (
      <div id="join-page-container">
        <div id="join-page-inner">
          <div id="join-as-artist" className="col">
            <img
              id="star-logo"
              src={require("../../../assets/logo_star.svg")}
            />
            <h1>Join As Artist</h1>
            <form className="artist-signup-form">
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  aria-describedby="email"
                  placeholder="Enter email"
                />
                <div className="invalid-feedback">
                  Please provide a email address.
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Enter password"
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default JoinPageComponent;
