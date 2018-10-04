import React, { Component } from "react";

import "./styles/joinPageComponent.css";

import fire from "../../../config/fire";

import validator from "validator";

import $ from "jquery";

import { WOW } from "wowjs";

import { dbAddUser } from "../../services/dbService";

class JoinPageComponent extends Component {
  state = {
    userType: "",
    email: "",
    password: ""
  };

  componentDidMount() {
    //Set initial user type in state based on route param
    const { userType } = this.props.match.params;
    this.setState({ userType });

    //Init WOW animations
    new WOW({
      live: false
    }).init();
  }

  handleEmailChange = e => {
    this.setState({ email: e.target.value }, () => {
      console.log(this.state.email);

      //Reset styling if empty
      this.state.email === ""
        ? $("#email-form-group").removeClass("invalid")
        : null;
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
      ? this.createNewUser(this.state.email, this.state.password)
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

  createNewUser(email, password) {
    console.log("create new user...");
    //Create new user and sign them in.
    fire
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        fire.auth().signInWithEmailAndPassword(email, password); //Sign in with new credentials
        dbAddUser(fire.auth().currentUser, this.state.userType);
      })
      .catch(error => {
        //Handle errors here
        console.log(error);
        if (error.code === "auth/email-already-in-use") {
          $("#email-form-group").addClass("invalid");
          $("#invalid-email-text").html("Email address already in use.");
        }
      });
  }

  setUserType(userType) {
    this.setState({ userType });
  }

  render() {
    return (
      <div id="join-page-container" className="wow fadeIn">
        <div id="join-page-inner">
          {this.state.userType === "artist" ? (
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
                  <div id="invalid-email-text" className="invalid-field-text">
                    Please provide a valid email address.
                  </div>
                </div>
                <div id="password-form-group" className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    aria-describedby="password"
                    placeholder="Enter password"
                    value={this.state.password}
                    onChange={this.handlePasswordChange}
                  />
                  <div
                    id="invalid-password-text"
                    className="invalid-field-text"
                  >
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
                <div className="col" style={{ marginBottom: "2px" }}>
                  Already have an account?{" "}
                  <span
                    id="login-text"
                    onClick={() => this.setState({ userType: "login" })}
                  >
                    Log In
                  </span>
                </div>
                <div className="col">
                  Join as a Fan instead?{" "}
                  <span
                    id="click-here-text"
                    onClick={() => this.setState({ userType: "fan" })}
                  >
                    Click Here
                  </span>
                </div>
              </form>
            </div>
          ) : this.state.userType === "fan" ? (
            <div id="join-as-fan" className="col">
              <img
                id="star-logo"
                src={require("../../../assets/logo_star.svg")}
              />
              <h1>Join As Fan</h1>
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
                  <div id="invalid-email-text" className="invalid-field-text">
                    Please provide a valid email address.
                  </div>
                </div>
                <div id="password-form-group" className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    aria-describedby="password"
                    placeholder="Enter password"
                    value={this.state.password}
                    onChange={this.handlePasswordChange}
                  />
                  <div
                    id="invalid-password-text"
                    className="invalid-field-text"
                  >
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
                <div className="col" style={{ marginBottom: "2px" }}>
                  Already have an account?{" "}
                  <span
                    id="login-text"
                    onClick={() => this.setState({ userType: "login" })}
                  >
                    Log In
                  </span>
                </div>
                <div className="col">
                  Join as an Artist instead?{" "}
                  <span
                    id="click-here-text"
                    onClick={() => this.setState({ userType: "artist" })}
                  >
                    Click Here
                  </span>
                </div>
              </form>
            </div>
          ) : this.state.userType === "login" ? (
            <div id="join-as-fan" className="col">
              <img
                id="star-logo"
                src={require("../../../assets/logo_star.svg")}
              />
              <h1>Log In</h1>
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
                  <div id="invalid-email-text" className="invalid-field-text">
                    Please provide a valid email address.
                  </div>
                </div>
                <div id="password-form-group" className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    aria-describedby="password"
                    placeholder="Enter password"
                    value={this.state.password}
                    onChange={this.handlePasswordChange}
                  />
                  <div
                    id="invalid-password-text"
                    className="invalid-field-text"
                  >
                    Please provide a valid password.
                  </div>
                </div>
                <button id="signup-button" className="btn btn-primary">
                  Log In
                </button>
                <div className="col">
                  Need an account?{" "}
                  <span
                    id="click-here-text"
                    onClick={() => this.setState({ userType: "" })}
                  >
                    Create An Account
                  </span>
                </div>
              </form>
            </div>
          ) : (
            <div id="join-section-content" className="col">
              <img
                id="join-section-star-logo"
                src={require("../../../assets/logo_star.svg")}
              />
              <div className="col" style={{ fontWeight: "bold" }}>
                Join Artist's Choice
              </div>
              <div id="join-section-buttons" className="container">
                <div
                  className="row"
                  data-wow-delay="1s"
                  data-wow-duration="0.5s"
                >
                  <div
                    id="joinAsArtistButton"
                    className="col"
                    onClick={() => this.setUserType("artist")}
                  >
                    <span className="joinButtonText">Join as Artist</span>
                  </div>
                  <div
                    id="joinAsFanButton"
                    className="col"
                    onClick={() => this.setUserType("fan")}
                  >
                    <span className="joinButtonText">Join as Fan</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default JoinPageComponent;
