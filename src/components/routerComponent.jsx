import React, { Component } from "react";

import { BrowserRouter as Router, Route } from "react-router-dom";

import HomepageComponent from "./homepage/homepageComponent";
import JoinPageComponent from "./pages/joinPage/joinPageComponent";

class RouterComponent extends Component {
  state = {};
  render() {
    return (
      <Router>
        <div>
          <Route path="" component={HomepageComponent} exact />
          <Route path="/join" component={JoinPageComponent} exact />
          <Route path="/join/:userType" component={JoinPageComponent} />
        </div>
      </Router>
    );
  }
}

export default RouterComponent;
