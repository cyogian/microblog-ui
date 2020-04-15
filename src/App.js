import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router";
import { connect } from "react-redux";

import Layout from "./hoc/Layout/Layout";
import Home from "./containers/Home/Home";
import Auth from "./containers/Auth/Auth";

import * as authActions from "./store/actions/authActions";

import classes from "./App.module.css";
import * as userActions from "./store/actions/userActions";

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignUp();
  }
  componentDidUpdate() {
    if (this.props.isAuthenticated) {
      if (
        !this.props.userData ||
        this.props.userData.username !== this.props.username
      ) {
        this.props.getCurrentUser(this.props.token);
      }
    }
  }
  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={Auth} />
        <Redirect to="/" />
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Redirect from="/" exact to="/home" />
          <Route path="/home" exact component={Home} />
          <Route path="/auth" component={Auth} />
        </Switch>
      );
    }
    return (
      <div className={classes.App}>
        <Layout>{routes}</Layout>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
    token: state.auth.token,
    username: state.auth.username,
    userData: state.user.userData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignUp: () => dispatch(authActions.authCheckState()),
    getCurrentUser: (token) => dispatch(userActions.getCurrentUser(token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
