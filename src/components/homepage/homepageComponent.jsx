import React, { Component } from "react";

import { Link } from "react-router-dom";

import "./styles/homepageComponent.css";

import NavbarComponent from "../navbar/navbarComponent";
import TrendingComponent from "./components/trending/trendingComponent";
import ShowsComponent from "./components/shows/showsComponent";
import FooterComponent from "../footer/footerComponent";
import UserModalComponent from "../common/userModalComponent";

import fire from "../../config/fire";
import { dbGetUser } from "../services/dbService";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import $ from "jquery";

import { WOW } from "wowjs";

class HomepageTopSection extends Component {
  state = {
    loggedInUser: null
  };

  componentDidMount() {
    //Init WOW animations
    new WOW({
      live: false
    }).init();

    fire.auth().onAuthStateChanged(() => {
      if (fire.auth().currentUser !== null) {
        //If user is logged in.
        dbGetUser(fire.auth().currentUser.uid)
          .get()
          .then(user => {
            this.setState({ loggedInUser: user.data() }, () => {
              console.log("User logged in:", this.state.loggedInUser);
            });
          });
      } else {
        console.log("no user signed in.");
        this.setState({ loggedInUser: null });
      }
    });

    this.startFlicker();
    $("#join-section-scrolling-text").innerText = "";
    this.scrollText();
  }

  startFlicker() {
    setInterval(() => {
      this.flicker();
    }, 70);
  }

  flicker() {
    const min = 0.2;
    const max = 1.0;
    $("#make-yourself-heard-img").css(
      "opacity",
      Math.random() * (max - min) + min
    );
    return;
  }

  scrollText = () => {
    let list = [
      "Discover New Music",
      "Get More Fans",
      "Build Your Brand",
      "Find Local Shows",
      "Share Your Songs",
      "Connect With Artists"
    ];
    let currentListIndex = 0;

    $("#join-section-scrolling-text").bind(
      "oanimationiteration animationiteration webkitAnimationIteration",
      function() {
        this.innerText = list[currentListIndex];
        currentListIndex < list.length - 1
          ? currentListIndex++
          : (currentListIndex = 0);
      }
    );
  };

  render() {
    return (
      <div className="container-fluid" style={{ overflow: "hidden" }}>
        <NavbarComponent />
        <div id="top-section-top" className="row">
          <div id="top-section-1" className="top-section col-xs-12 col-sm-6">
            <div id="social-icons-top" className="wow fadeIn">
              <FontAwesomeIcon
                className="social-icon"
                icon={["fab", "facebook-square"]}
              />
              <FontAwesomeIcon
                className="social-icon"
                icon={["fab", "twitter"]}
              />
              <FontAwesomeIcon
                className="social-icon"
                icon={["fab", "instagram"]}
              />
            </div>
            <img
              id="logo-star-top"
              className="wow fadeInUp"
              src={require("../../assets/logo_star.svg")}
            />
            <img
              id="logo-artists-top"
              className="wow fadeInLeft"
              src={require("../../assets/logo_ARTISTS_top.svg")}
            />
            <img
              id="logo-artists-outline"
              className="wow fadeIn"
              data-wow-delay="0.6s"
              src={require("../../assets/logo_ARTISTS_outline_split.svg")}
            />
          </div>
          <div
            id="top-section-2"
            className="top-section d-none d-sm-block col wow fadeIn"
          >
            <div id="top-section-2-nested-1" />
            <div id="top-section-2-nested-2" />
            <div id="top-section-2-nested-3" />
          </div>

          <UserModalComponent loggedInUser={this.state.loggedInUser} />
        </div>
        <div id="top-section-bot" className="row">
          <div
            id="top-section-3"
            className="top-section-bottom col-xs-12 col-sm-6 wow fadeIn"
          >
            <img
              id="logo-artists-choice"
              src={require("../../assets/logo_CHOICE.svg")}
              className="d-sm-none wow fadeIn"
            />
            <img
              id="logo-artists-bottom"
              className="wow fadeInLeft"
              src={require("../../assets/logo_ARTISTS_bottom.svg")}
            />
          </div>
          <div
            id="top-section-4"
            className="top-section-bottom d-none d-sm-block col"
          >
            <img
              id="logo-artists-choice"
              className="wow fadeInRight"
              src={require("../../assets/logo_CHOICE.svg")}
              style={{ marginTop: "5vmin" }}
            />
          </div>
        </div>
        <div id="joinButtons" className="container">
          <div
            className="row  wow zoomIn"
            data-wow-delay="1s"
            data-wow-duration="0.5s"
          >
            <Link id="joinAsArtistButton" className="col" to={"/join/artist"}>
              <span className="joinButtonText">Join as Artist</span>
            </Link>
            <Link id="joinAsFanButton" className="col" to={"/join/fan"}>
              <span className="joinButtonText">Join as Fan</span>
            </Link>
          </div>
        </div>
        <div id="myh-section" className="row">
          <div className="col-12">
            <div id="make-yourself-heard" className="col-12">
              <img
                id="make-yourself-heard-img"
                src={require("../../assets/makeYourselfHeard.svg")}
              />
              <h2>This is where artists launch careers.</h2>
            </div>
          </div>
          <div id="myh-image-gallery" className="row">
            <div id="myh-img-1" className="artist-img col-4 wow slideInLeft">
              <div id="artist-overlay-1" className="artist-overlay">
                <div id="artist-overlay-1-text" className="artist-overlay-text">
                  "Artist's Choice helped make getting our music heard as quick
                  and easy as possible."
                  <br />- Ronald Regan
                </div>
              </div>
            </div>
            <div id="myh-img-2" className=" artist-img col-8 wow slideInRight">
              <div id="artist-overlay-2" className="artist-overlay">
                <div id="artist-overlay-3-text" className="artist-overlay-text">
                  "It's important as a musician to reach out and get your music
                  on as many different platforms as possible, and Artist's
                  Choice is no exception."
                  <br />- Abraham Lincoln
                </div>
              </div>
            </div>
            <div className="col-7" style={{ padding: 0 }}>
              <div id="myh-img-3" className=" artist-img col-12 wow slideInUp">
                <div id="artist-overlay-3" className="artist-overlay">
                  <div
                    id="artist-overlay-3-text"
                    className="artist-overlay-text"
                  >
                    "Artist's Choice helped us grow our following and get
                    recognized in some amazing ways."
                    <br />- George Washington
                  </div>
                </div>
              </div>
              <div className="col-12">
                <div
                  id="myh-img-5"
                  className="artist-img col-6 wow slideInLeft"
                >
                  <div id="artist-overlay-5" className="artist-overlay">
                    <div
                      id="artist-overlay-5-text"
                      className="artist-overlay-text"
                    >
                      "You can do some pretty awesome things with the Artist's
                      Choice tools"
                      <br />- Thomas Jefferson
                    </div>
                  </div>
                </div>
                <div
                  id="myh-img-6"
                  className="artist-img col-6 wow slideInRight"
                >
                  <div id="artist-overlay-6" className="artist-overlay">
                    <div
                      id="artist-overlay-6-text"
                      className="artist-overlay-text"
                    >
                      "Artist's Choice made getting my music heard as easy as
                      possible."
                      <br />- Franklin D. Roosevelt
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div id="myh-img-4" className="artist-img col-5 wow slideInUp">
              <div id="artist-overlay-4" className="artist-overlay">
                <div id="artist-overlay-4-text" className="artist-overlay-text">
                  "If you're serious about growing your following and reaching
                  as many fans as possible, Artist's Choice is a no brainer."
                  <br />- John F. Kennedy
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="about-section" className="row">
          <div className="col-12 wow fadeIn">
            <h2>Why Artist's Choice?</h2>
          </div>
          <div id="more-section" className="col-12">
            <div
              id="more-section-header"
              className="col-12 col-sm-8 offset-sm-2 col-lg-8 offset-lg-2"
            >
              <div className="row">
                <div
                  className="col-xs-12 col-sm-6 col-xl wow fadeInUp"
                  data-wow-delay="0.25s"
                >
                  <FontAwesomeIcon
                    className="why-icon"
                    icon={["fas", "headphones"]}
                  />
                  <h2>
                    More
                    <span className="d-block d-sm-none" />
                    <br className="d-none d-sm-block" />
                    Music.
                  </h2>
                </div>
                <div
                  className="col-xs-12 col-sm-6 col-xl wow fadeInUp"
                  data-wow-delay="0.75s"
                >
                  <FontAwesomeIcon
                    className="why-icon"
                    icon={["fas", "bullhorn"]}
                  />
                  <h2>
                    More
                    <span className="d-block d-sm-none" />
                    <br className="d-none d-sm-block" />
                    Exposure.
                  </h2>
                </div>
                <div
                  className="col-xs-12 col-sm-6 col-xl wow fadeInUp"
                  data-wow-delay="1.25s"
                >
                  <FontAwesomeIcon
                    className="why-icon"
                    icon={["fas", "users"]}
                  />
                  <h2>
                    More
                    <span className="d-block d-sm-none" />
                    <br className="d-none d-sm-block" />
                    Fans.
                  </h2>
                </div>

                <div
                  className="col-xs-12 col-sm-6 col-xl wow fadeInUp"
                  data-wow-delay="1.75s"
                >
                  <FontAwesomeIcon
                    className="why-icon"
                    icon={["fas", "infinity"]}
                  />
                  <h2>
                    More
                    <span className="d-block d-sm-none" />
                    <br className="d-none d-sm-block" />
                    <span style={{ fontWeight: "900" }}>Everything.</span>
                  </h2>
                </div>
              </div>
            </div>
          </div>
          <div id="goal-section" className="col-12">
            <div id="goal-section-header" className="wow fadeIn">
              <h2>
                Artist's Choice goal is to make it as quick and easy as possible
                to share, discover, and enjoy music for both artists and fans.
              </h2>
            </div>
          </div>
          <Link id="joinButton" to={"/join"}>
            <button
              id="joinFreeButton"
              className="wow zoomIn"
              data-wow-duration="0.5s"
            >
              Join Free
            </button>
          </Link>
        </div>
        <TrendingComponent />
        <ShowsComponent />
        <div id="join-section" className="row">
          <div id="join-section-content" className="col">
            <img
              id="join-section-star-logo"
              className="wow fadeIn"
              src={require("../../assets/logo_star.svg")}
            />
            <div className="col wow fadeIn" style={{ fontWeight: "bold" }}>
              Join Artist's Choice
            </div>
            <div
              id="join-section-scrolling-text-container"
              className="col d-none d-sm-block"
            >
              <div id="join-section-scrolling-text" />
            </div>
            <div id="join-section-buttons" className="container">
              <div
                className="row  wow zoomIn"
                data-wow-delay="1s"
                data-wow-duration="0.5s"
              >
                <Link
                  id="joinAsArtistButton"
                  className="col"
                  to={"/join/artist"}
                >
                  <span className="joinButtonText">Join as Artist</span>
                </Link>
                <Link id="joinAsFanButton" className="col" to={"/join/fan"}>
                  <span className="joinButtonText">Join as Fan</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <FooterComponent />
      </div>
    );
  }
}

export default HomepageTopSection;
