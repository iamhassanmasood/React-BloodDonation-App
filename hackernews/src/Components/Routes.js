import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import App from "../App";
import Signin from "../Signin";
import Signup from "../Signup";
import UpData from './UpData'
import Dashboard from '../Dashboard';
import UserAppBar from './UserAppBar'
class CustomRoutes extends Component {
  render() {
    return (
      <div>
        <Router>
          <div>
            <Route exact path="/" component={App} />
            <Route exact path="/signin" component={Signin} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/logout" component={App} />
            <Route exact path="/profile/:id" component={UpData} />
            {/* <Route exact path="/bloodavailable" component={Dashboard}/> */}
            <Route exact path="/home" component={Dashboard} />
          </div>
        </Router>
      </div>
    );
  }
}

export default CustomRoutes;
