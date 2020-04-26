import React, { Component } from "react";
import {
  Card,
  Popup,
  Button,
  Image,
  Icon,
  Segment,
  Input,
  Menu,
} from "semantic-ui-react";
import moment from "moment";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { capitalize } from "../../../shared/utilities";
import PaginatePost from "../../Paginate/PaginatePost";
import Posts from "../../../components/Posts/Posts";
import Users from "../../../components/Users/Users";
import PaginateUser from "../../Paginate/PaginateUser";

import classes from "./UserProfile.module.css";
import { followUnfollow } from "../../../store/actions/userActions";

class UserProfile extends Component {
  state = { activeItem: "posts" };

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
    const user = this.props.userData;
    const { currentUser } = this.props;
    let followButton = null;
    let editButton = null;
    if (currentUser && user.id === currentUser.id) {
      editButton = (
        <Button
          as={Link}
          to={`/user/${currentUser.username}/edit_profile`}
          icon="edit"
          content="Edit Profile"
          fluid
          color="purple"
        />
      );
    } else {
      if (user.is_following) {
        followButton = (
          <Button
            content="Unfollow"
            size="mini"
            inverted
            color="red"
            compact
            floated="right"
            onClick={() => this.onUnfollow(user.id)}
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
            onClick={() => this.onFollow(user.id)}
          />
        );
      }
    }
    let rendered = null;
    const { activeItem } = this.state;
    if (activeItem === "posts") {
      rendered = (
        <PaginatePost
          component={Posts}
          url={`/users/${user.id}/posts`}
          perPage={10}
          size="mini"
        />
      );
    }
    if (activeItem === "followers") {
      rendered = (
        <PaginateUser
          component={Users}
          url={`/users/${user.id}/followers`}
          perPage={10}
          size="mini"
        />
      );
    }
    if (activeItem === "following") {
      rendered = (
        <PaginateUser
          component={Users}
          url={`/users/${user.id}/followed`}
          perPage={10}
          size="mini"
        />
      );
    }

    return (
      <div className={classes.UserProfile}>
        <Card>
          <Image src={user._links.avatar_large} wrapped />
          <Card.Content>
            <Card.Header>@{user.username}</Card.Header>
            <Card.Meta>
              <Popup
                content={moment(user.last_seen).format("h:mm A · MMM D YYYY")}
                trigger={
                  <span className="date">
                    was active {moment(user.last_seen).fromNow()}
                  </span>
                }
                size="mini"
                position="bottom left"
                inverted
                basic
              />
            </Card.Meta>
            <Card.Description>{user.about_me}</Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Icon name="user" />
            {user.follower_count} followers | <Icon name="user" />
            {user.followed_count} following
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
          {rendered}
        </Segment>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser.userData,
    token: state.auth.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFollowUnfollow: (userId, type, token) =>
      dispatch(followUnfollow(userId, type, token)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
