import React, { Component } from "react";

import { dbGetUserByAltName } from "../../../services/dbService";

import { WOW } from "wowjs";

class ArtistProfilePageComponent extends Component {
  state = {
    loggedInUser: {},
    userForPage: null
  };

  componentDidMount() {
    dbGetUserByAltName(this.props.user).then(snapshot => {
      if (snapshot.docs.length !== 0) {
        this.setState({ userForPage: snapshot.docs[0].data() }, () => {
          console.log(this.state.userForPage);
        });
      } else {
        window.location = "/"; //Redirect if can't find user. Route this to a seperate page later.
      }
    });

    //Init WOW animations
    new WOW({
      live: false
    }).init();
  }

  render() {
    return (
      <div className="wow fadeIn">
        {this.state.userForPage !== null ? (
          <h1>{this.state.userForPage.userName}</h1>
        ) : null}
      </div>
    );
  }
}

export default ArtistProfilePageComponent;
