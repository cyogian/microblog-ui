import React, { Component } from "react";
import { Container, Loader, Dimmer } from "semantic-ui-react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import * as userActions from "../../store/actions/userActions";

import classes from "./User.module.css";
import UserProfile from "./UserProfile/UserProfile";
import EditProfile from "./EditProfile/EditProfile";

class User extends Component {
  componentDidMount() {
    const { username } = this.props.match.params;
    document.title = "Microblog | " + username;
    this.props.onFetchUser(username, this.props.token);
  }
  componentDidUpdate() {
    const { username } = this.props.match.params;
    if (this.props.userData && username !== this.props.userData.username) {
      this.props.onFetchUser(username, this.props.token);
    }
  }
  render() {
    const { loading, error, userData } = this.props;
    let rendered = null;
    if (loading) {
      rendered = (
        <Dimmer active inverted>
          <Loader>Loading...</Loader>
        </Dimmer>
      );
    } else if (error) {
      this.props.onFetchReset();
      rendered = <Redirect to="/home" />;
    } else if (userData) {
      rendered = (
        <>
          <Route
            path={this.props.match.path}
            exact
            render={() => <UserProfile userData={userData} />}
          />
          <Route
            path={this.props.match.path + "/edit_profile"}
            exact
            render={() => <EditProfile userData={userData} />}
          />
        </>
      );
    }
    return <Container className={classes.User}>{rendered}</Container>;
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    userData: state.user.userData,
    loading: state.user.loading,
    error: state.user.error,
    refresh: state.user.refresh,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchUser: (username, token) => {
      dispatch(userActions.fetchUser(username, token));
    },
    onFetchReset: () => {
      dispatch(userActions.resetFetchUser());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
