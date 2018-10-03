import React, { Component } from "react";

import "./styles/joinPageComponent.css";

import validator from "validator";

import $ from "jquery";

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
  }

  handleEmailChange = e => {
    this.setState({ email: e.target.value }, () => {
      console.log(this.state.email);
    });
  };

  handlePasswordChange = e => {
    this.setState({ password: e.target.value }, () => {
      console.log(this.state.password);
    });
  };

  validate = e => {
    e.preventDefault(); //Prevent default submit behaviour

    this.validateEmail(this.state.email) &&
    this.validatePassword(this.state.password)
      ? this.createNewUser()
      : null;
  };

  validateEmail(email) {
    if (validator.isEmail(email)) {
      $("#email-form-group").removeClass("invalid");
      return true;
    } else {
      $("#email-form-group").addClass("invalid");
    }
  }

  validatePassword(password) {
    if (password.length > 4) {
      //Check password length
      console.log("password length ok.");
      $("#password-form-group").removeClass("invalid");

      if (password.match(/[a-z]/) && password.match(/[A-Z]/)) {
        //Check that password contains uppercase and lowercase
        console.log("password has upper and lowercase.");
        $("#password-form-group").removeClass("invalid");

        if (password.match(/[0-9]/)) {
          //Check that password contains at least 1 number
          console.log("password has at least one number");
          $("#password-form-group").removeClass("invalid");
          return true;
        } else {
          $("#password-form-group").addClass("invalid");
          $("#invalid-password-text").html(
            "Password must contain at least one number."
          );
        }
      } else {
        $("#password-form-group").addClass("invalid");
        $("#invalid-password-text").html(
          "Password needs at least one uppercase and lowercase letter."
        );
      }
    } else {
      $("#password-form-group").addClass("invalid");
      $("#invalid-password-text").html(
        "Password must be at least 5 characters."
      );
    }
  }

  createNewUser() {
    console.log("create new user...");
  }

  submitForm = () => {
    console.log("process the form...");
    this.createNewUser();
  };

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
              <div id="email-form-group" className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  aria-describedby="email"
                  placeholder="Enter email"
                  value={this.state.email}
                  onChange={this.handleEmailChange}
                />
                <div className="invalid-field-text">
                  Please provide a valid email address.
                </div>
              </div>
              <div id="password-form-group" className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="text"
                  className="form-control"
                  id="password"
                  aria-describedby="password"
                  placeholder="Enter password"
                  value={this.state.password}
                  onChange={this.handlePasswordChange}
                />
                <div id="invalid-password-text" className="invalid-field-text">
                  Please provide a valid password.
                </div>
              </div>
              <button
                id="signup-button"
                className="btn btn-primary"
                onClick={this.validate}
              >
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
