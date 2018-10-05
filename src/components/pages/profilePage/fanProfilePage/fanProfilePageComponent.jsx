import React, { Component } from "react";

import { WOW } from "wowjs";

class FanProfilePageComponent extends Component {
  state = {};

  componentDidMount() {
    //Init WOW animations
    new WOW({
      live: false
    }).init();
  }

  render() {
    return (
      <div className="wow fadeIn">
        <h1>Fan Page</h1>
      </div>
    );
  }
}

export default FanProfilePageComponent;
