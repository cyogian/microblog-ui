import React, { Component } from "react";
import { Switch, Route, Redirect, withRouter } from "react-router";
import { connect } from "react-redux";
import { Loader } from "semantic-ui-react";

import Layout from "./hoc/Layout/Layout";
import Home from "./containers/Home/Home";
import Auth from "./containers/Auth/Auth";
import Landing from "./containers/Landing/Landing";
import Explore from "./containers/Explore/Explore";

import * as authActions from "./store/actions/authActions";

import classes from "./App.module.css";
import * as currentUserActions from "./store/actions/currentUserActions";

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
        <Route path="/" exact component={Landing} />
        <Route path="/auth" component={Auth} />
        <Redirect
          to={{
            pathname: "/auth/login",
            state: {
              from: this.props.history.location,
            },
          }}
        />
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/home" exact component={Home} />
          <Route path="/explore" exact component={Explore} />
          <Route path="/auth" component={Auth} />
          <Redirect to="/home" />
        </Switch>
      );
    }

    if (this.props.loadingApp) {
      routes = <Loader content="Loading App..." />;
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
    userData: state.currentUser.userData,
    loadingApp: state.auth.loadingApp,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignUp: () => dispatch(authActions.authCheckState()),
    getCurrentUser: (token) =>
      dispatch(currentUserActions.getCurrentUser(token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
