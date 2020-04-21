import React from "react";
import { Feed, Popup, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import moment from "moment";

import classes from "./User.module.css";
import { connect } from "react-redux";

const User = (props) => {
  const user = props.userData;
  let followButton = null;
  if (user.username !== props.username) {
    if (user.is_following) {
      followButton = (
        <Button
          content="Unfollow"
          size="mini"
          inverted
          color="red"
          compact
          floated="right"
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
        />
      );
    }
  }
  return (
    <Feed.Event className={classes.User}>
      <Feed.Label image={user._links.avatar} style={{ paddingTop: "0.5em" }} />
      <Feed.Content>
        <Feed.Summary>
          <Link to={`/user/${user.username}`}>@{user.username}</Link> was active
          <Popup
            content={moment(user.last_seen).format("h:mm A · MMM D YYYY")}
            trigger={<Feed.Date>{moment(user.last_seen).fromNow()}</Feed.Date>}
            size="mini"
            position="bottom left"
            inverted
            basic
          />
        </Feed.Summary>
        <Feed.Meta>
          {user.follower_count} followers | {user.followed_count} following
        </Feed.Meta>
        <Feed.Extra text>{user.about_me}</Feed.Extra>
        {followButton}
      </Feed.Content>
    </Feed.Event>
  );
};

const mapStateToProps = (state) => {
  return { username: state.auth.username };
};
export default connect(mapStateToProps)(User);
