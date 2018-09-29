import React, { Component } from "react";

import { BrowserRouter as Router, Route } from "react-router-dom";

import HomepageComponent from "./homepage/homepageComponent";

class RouterComponent extends Component {
  state = {};
  render() {
    return (
      <Router>
        <div>
          <Route path="" component={HomepageComponent} exact />
        </div>
      </Router>
    );
  }
}

export default RouterComponent;
