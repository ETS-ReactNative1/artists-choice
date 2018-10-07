import React, { Component } from "react";

import "./styles/userModalComponent.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import $ from "jquery";

import fire from "../../config/fire";

class LoginModalComponent extends Component {
  state = {
    email: "",
    password: ""
  };

  componentDidMount() {}

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

  toggleLoginModal = () => {
    if ($("#login-modal").hasClass("login-modal-open")) {
      $("#login-modal").removeClass("login-modal-open");
      $("#login-modal").addClass("login-modal-close");
    } else {
      $("#login-modal").removeClass("login-modal-close");
      $("#login-modal").addClass("login-modal-open");
    }
  };

  login = e => {
    e.preventDefault();

    fire
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        console.log("User logged in:", fire.auth().currentUser);
      });
  };

  logout = e => {
    e.preventDefault();

    fire
      .auth()
      .signOut()
      .then(() => {
        console.log("User logged out.");
      });
  };

  render() {
    return (
      <div id="user-modal">
        {this.props.loggedInUser === null ? (
          <div id="user-login">
            <FontAwesomeIcon
              id="login-icon"
              icon={["fas", "user-circle"]}
              onClick={this.toggleLoginModal}
            />

            <div id="login-modal" className="login-modal-close">
              <FontAwesomeIcon id="login-caret" icon={["fas", "caret-up"]} />
              <div id="login-modal-header">User Login</div>
              <form className="login-modal-form">
                <div id="email-form-group" className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    id="email"
                    aria-describedby="email"
                    placeholder="Enter email"
                    value={this.state.email}
                    onChange={this.handleEmailChange}
                  />
                </div>
                <div id="password-form-group" className="form-group">
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    aria-describedby="password"
                    placeholder="Enter password"
                    value={this.state.password}
                    onChange={this.handlePasswordChange}
                  />
                </div>
                <button
                  id="login-button"
                  className="btn btn-primary"
                  onClick={this.login}
                >
                  Log In
                </button>
                <button
                  id="cancel-button"
                  className="btn btn-primary"
                  onClick={this.cancel}
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        ) : (
          <div id="user-login">
            <FontAwesomeIcon
              id="login-icon"
              icon={["fas", "user-circle"]}
              onClick={this.toggleLoginModal}
            />

            <div id="login-modal" className="login-modal-close">
              <FontAwesomeIcon id="login-caret" icon={["fas", "caret-up"]} />
              <div id="login-modal-header">User Info</div>
              <button
                id="logout-button"
                className="btn btn-primary"
                onClick={this.logout}
              >
                Log Out
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default LoginModalComponent;
