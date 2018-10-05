import React, { Component } from "react";

import fire from "../../../config/fire";

import { dbGetUser } from "../../services/dbService";

import ArtistProfilePageComponent from "./artistProfilePage/artistProfilePageComponent";
import FanProfilePageComponent from "./fanProfilePage/fanProfilePageComponent";
import FinishSignupPageComponent from "./finishSignupPage/finishSignupPageComponent";

class ProfilePageComponent extends Component {
  state = {
    userType: "",
    userName: "",
    loggedInUser: {},
    user: ""
  };

  componentDidMount() {
    fire.auth().onAuthStateChanged(() => {
      if (fire.auth().currentUser !== null) {
        dbGetUser(fire.auth().currentUser.uid)
          .get()
          .then(user => {
            console.log(user.data());
            this.setState({ userType: user.data().userType });
            user.data().userName !== null
              ? this.setState({ userName: user.data().userName })
              : null;
            this.setState({ loggedInUser: user.data() });
          });
      } else {
        console.log("no user signed in.");
      }
    });
    const { user } = this.props.match.params;
    this.setState({ user });
  }

  render() {
    return (
      <React.Fragment>
        {this.state.userName === undefined ? (
          <FinishSignupPageComponent userType={this.state.userType} />
        ) : this.state.userType === "artist" ? (
          <ArtistProfilePageComponent
            loggedInUser={this.state.loggedInUser}
            user={this.state.user}
          />
        ) : this.state.userType === "fan" ? (
          <FanProfilePageComponent />
        ) : null}
      </React.Fragment>
    );
  }
}

export default ProfilePageComponent;
