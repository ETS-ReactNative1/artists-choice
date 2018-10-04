import React, { Component } from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import HomepageComponent from "./homepage/homepageComponent";
import JoinPageComponent from "./pages/joinPage/joinPageComponent";
import ProfilePageComponent from "./pages/profilePage/profilePageComponent";

class RouterComponent extends Component {
  state = {};
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/join" component={JoinPageComponent} exact />
          <Route path="/join/:userType" component={JoinPageComponent} />
          <Route path="/finishSignup" component={ProfilePageComponent} exact />
          <Route path="/:user" component={ProfilePageComponent} />
          <Route path="" component={HomepageComponent} exact />
        </Switch>
      </Router>
    );
  }
}

export default RouterComponent;
