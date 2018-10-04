import React, { Component } from "react";

import fire from "../../../config/fire";

import { dbGetUser } from "../../services/dbService";

import ArtistProfilePageComponent from "./artistProfilePage/artistProfilePageComponent";
import FanProfilePageComponent from "./fanProfilePage/fanProfilePageComponent";
import FinishSignupPageComponent from "./finishSignupPage/finishSignupPageComponent";

class ProfilePageComponent extends Component {
  state = {
    userType: "",
    userName: ""
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
          });
      } else {
        console.log("no user signed in.");
      }
    });
  }

  render() {
    return (
      <div className="wow fadeIn">
        {this.state.userName === undefined ? (
          <FinishSignupPageComponent userType={this.state.userType} />
        ) : null}
      </div>
    );
  }
}

export default ProfilePageComponent;
