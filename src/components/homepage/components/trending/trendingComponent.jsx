import React, { Component } from "react";

import "./styles/trendingComponent.css";

class TrendingComponent extends Component {
  state = {};
  render() {
    return (
      <div id="trending-section" className="row">
        <div id="trending-header" className="col-12 wow fadeIn">
          <img
            id="whats-trending-text"
            src={require("../../../../assets/whats_trending.svg")}
          />
        </div>
        <div id="trending-global-section" className="col-10 offset-1" />
        <div id="trending-local-section" className="col-10 offset-1" />
      </div>
    );
  }
}

export default TrendingComponent;
