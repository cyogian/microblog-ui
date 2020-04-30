import React, { Component } from "react";
import { Switch, Route, Redirect, withRouter } from "react-router";
import { connect } from "react-redux";
import { Loader } from "semantic-ui-react";

import Layout from "./hoc/Layout/Layout";
import Home from "./containers/Home/Home";
import Auth from "./containers/Auth/Auth";
import Landing from "./containers/Landing/Landing";
import Explore from "./containers/Explore/Explore";
import User from "./containers/User/User";

import * as authActions from "./store/actions/authActions";
import * as currentUserActions from "./store/actions/currentUserActions";

import classes from "./App.module.css";

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignUp();
  }
  componentDidUpdate() {
    if (this.props.isAuthenticated) {
      if (!this.props.userData || this.props.refresh) {
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
          <Route
            path="/user"
            exact
            render={() => (
              <Redirect to={"/user/" + this.props.userData.username} />
            )}
          />
          <Route path="/user/:username" component={User} />
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
    userData: state.currentUser.userData,
    loadingApp: state.auth.loadingApp,
    refresh: state.currentUser.refresh,
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
