import React, { Component } from "react";

import fire from "../../../config/fire";

import { dbGetUser, dbGetUserByAltName } from "../../services/dbService";

import ArtistProfilePageComponent from "./artistProfilePage/artistProfilePageComponent";
import FanProfilePageComponent from "./fanProfilePage/fanProfilePageComponent";
import FinishSignupPageComponent from "../finishSignupPage/finishSignupPageComponent";

class ProfilePageComponent extends Component {
  state = {
    loggedInUser: {},
    userForPage: {},
    isUserMatch: false
  };

  componentDidMount() {
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
      }
    });

    const { user } = this.props.match.params;
    //If no user route param
    if (user !== undefined) {
      dbGetUserByAltName(user)
        .then(snapshot => {
          if (snapshot.docs.length !== 0) {
            this.setState({ userForPage: snapshot.docs[0].data() }, () => {
              console.log("User for page:", this.state.userForPage);
            });
          }
        })
        .then(() => {
          if (
            this.state.loggedInUser.userName === this.state.userForPage.userName
          ) {
            this.setState({ isUserMatch: true }, () => {
              console.log("User match:", this.state.isUserMatch);
            });
          }
        });
    } else {
      if (
        this.state.loggedInUser.userName === this.state.userForPage.userName
      ) {
        this.setState({ isUserMatch: true }, () => {
          console.log("User match:", this.state.isUserMatch);
        });
      }
    }
  }

  render() {
    return (
      <div>
        {this.state.loggedInUser.userName === undefined &&
        this.state.isUserMatch === true ? (
          <FinishSignupPageComponent loggedInUser={this.state.loggedInUser} />
        ) : this.state.userForPage.userType === "artist" ? (
          <ArtistProfilePageComponent
            loggedInUser={this.state.loggedInUser}
            userForPage={this.state.userForPage}
            isUserMatch={this.state.isUserMatch}
          />
        ) : this.state.userForPage.userType === "fan" ? (
          <FanProfilePageComponent
            loggedInUser={this.state.loggedInUser}
            userForPage={this.state.userForPage}
            isUserMatch={this.state.isUserMatch}
          />
        ) : null}
      </div>
    );
  }
}

export default ProfilePageComponent;
