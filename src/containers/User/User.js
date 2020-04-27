import React, { Component } from "react";
import {
  Container,
  Dimmer,
  Loader,
  Button,
  Card,
  Image,
  Popup,
  Icon,
  Menu,
  Segment,
  Input,
} from "semantic-ui-react";
import { Redirect, Route, Link, Switch } from "react-router-dom";
import { connect } from "react-redux";

import * as userActions from "../../store/actions/userActions";
import classes from "./User.module.css";
import { capitalize } from "../../shared/utilities";
import PaginatePost from "../Paginate/PaginatePost";
import Posts from "../../components/Posts/Posts";
import PaginateUser from "../Paginate/PaginateUser";
import Users from "../../components/Users/Users";
import moment from "moment";
import EditProfile from "./EditProfile/EditProfile";

class User extends Component {
  state = { activeItem: "posts" };

  componentDidMount() {
    const { username } = this.props.match.params;
    document.title = `Microblog | @${username} | Posts`;
    this.props.onFetchUser(username, this.props.token);
  }
  componentDidUpdate() {
    const { username } = this.props.match.params;
    if (
      this.props.refresh ||
      (this.props.userData && username !== this.props.userData.username)
    ) {
      this.props.onFetchUser(username, this.props.token);
    }
  }

  handleItemClick = (e, { name }) => {
    document.title = `Microblog | @${
      this.props.userData.username
    } | ${capitalize(name)}`;
    this.setState({ activeItem: name });
  };
  onFollow = (userId) => {
    this.props.onFollowUnfollow(
      userId,
      "follow",
      this.props.token,
      this.state.activeItem
    );
  };
  onUnfollow = (userId) => {
    this.props.onFollowUnfollow(
      userId,
      "unfollow",
      this.props.token,
      this.state.activeItem
    );
  };
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
      const { currentUser } = this.props;
      let followButton = null;
      let editButton = null;
      if (currentUser && userData.id === currentUser.id) {
        editButton = (
          <Button
            as={Link}
            to={`/user/${currentUser.username}/edit`}
            icon="edit"
            content="Edit Profile"
            fluid
            color="purple"
          />
        );
      } else {
        if (userData.is_following) {
          followButton = (
            <Button
              content="Unfollow"
              size="mini"
              inverted
              color="red"
              compact
              floated="right"
              onClick={() => this.onUnfollow(userData.id)}
            />
          );
        } else {
          followButton = (
            <Button
              content="Follow"
              size="mini"
              primary
              compact
              floated="right"
              inverted
              onClick={() => this.onFollow(userData.id)}
            />
          );
        }
      }
      let renderedItem = null;
      const { activeItem } = this.state;
      if (activeItem === "posts") {
        renderedItem = (
          <PaginatePost
            component={Posts}
            url={`/users/${userData.id}/posts`}
            perPage={10}
            size="mini"
          />
        );
      }
      if (activeItem === "followers") {
        renderedItem = (
          <PaginateUser
            component={Users}
            url={`/users/${userData.id}/followers`}
            perPage={10}
            size="mini"
          />
        );
      }
      if (activeItem === "following") {
        renderedItem = (
          <PaginateUser
            component={Users}
            url={`/users/${userData.id}/followed`}
            perPage={10}
            size="mini"
          />
        );
      }

      rendered = (
        <>
          <Switch>
            <Route
              path={`${this.props.match.path}/edit`}
              component={EditProfile}
            />
            <Route path={this.props.match.path} exact />
            <Redirect to={this.props.match.path} />
          </Switch>
          <Card>
            <Image src={userData._links.avatar_large} wrapped />
            <Card.Content>
              <Card.Header>@{userData.username}</Card.Header>
              <Card.Meta>
                <Popup
                  content={moment(userData.last_seen).format(
                    "h:mm A · MMM D YYYY"
                  )}
                  trigger={
                    <span className="date">
                      was active {moment(userData.last_seen).fromNow()}
                    </span>
                  }
                  size="mini"
                  position="bottom left"
                  inverted
                  basic
                />
              </Card.Meta>
              <Card.Description>{userData.about_me}</Card.Description>
            </Card.Content>
            <Card.Content extra>
              <Icon name="user" />
              {userData.follower_count} followers | <Icon name="user" />
              {userData.followed_count} following
              {followButton}
              <br />
            </Card.Content>
            {editButton}
          </Card>
          <Menu attached="top" tabular>
            <Menu.Item
              name="posts"
              active={activeItem === "posts"}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name="followers"
              active={activeItem === "followers"}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name="following"
              active={activeItem === "following"}
              onClick={this.handleItemClick}
            />
          </Menu>
          <Segment attached="bottom">
            <div style={{ textAlign: "right", marginBottom: "5px" }}>
              <Input
                icon={{ name: "search", link: true }}
                placeholder={`Search ${activeItem}...`}
                disabled
              />
            </div>
            {renderedItem}
          </Segment>
        </>
      );
    }
    return <Container className={classes.User}>{rendered}</Container>;
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    currentUser: state.currentUser.userData,
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
    onFollowUnfollow: (userId, type, token) =>
      dispatch(userActions.followUnfollow(userId, type, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
