import React, { Component } from "react";

import { Link } from "react-router-dom";

import "./styles/navbarComponent.css";

import $ from "jquery";

class NavbarComponent extends Component {
  state = {};

  constructor() {
    super();
    let topNavActive = false;
  }

  componentDidMount() {
    window.addEventListener("scroll", this.toggleTopNavbar);
  }

  toggleTopNavbar = () => {
    if (window.scrollY > window.innerHeight * 0.65) {
      this.topNavActive = true;
      $("#topNavbar").addClass("showNav");
    } else if (window.scrollY < window.innerHeight * 0.65) {
      this.topNavActive = false;
      $("#topNavbar").removeClass("showNav");
    }
  };

  render() {
    return (
      <React.Fragment>
        <nav
          id="topNavbar"
          className="navbar fixed-top navbar-expand-lg navbar-light bg-light top-navbar"
        >
          <a className="navbar-brand" href="#">
            <img
              id="navbar-logo"
              src={require("../../assets/logo_star.svg")}
              alt=""
            />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarTogglerDemo02"
            aria-controls="navbarTogglerDemo02"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Discover
                </Link>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Crowd Picks
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Shows
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Charts
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Opportunities
                </a>
              </li>
            </ul>
            <form className="form-inline my-2 my-lg-0">
              <input
                className="form-control mr-sm-2"
                type="search"
                placeholder="Search"
              />
              <button className="btn btn-outline my-2 my-sm-0" type="submit">
                Search
              </button>
            </form>
          </div>
        </nav>
        <div
          id="secondaryNavbar"
          className="d-none d-sm-block wow slideInUp"
          data-wow-delay="0.5s"
        >
          <ul>
            <li>Discover</li>
            <li>Crowd Picks</li>
            <li>Shows</li>
            <li>Charts</li>
            <li>Opportunities</li>
          </ul>
        </div>
      </React.Fragment>
    );
  }
}

export default NavbarComponent;
