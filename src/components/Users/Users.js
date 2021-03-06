import React from "react";
import { Segment, Feed } from "semantic-ui-react";

import User from "./User/User";

import classes from "./Users.module.css";

const Users = (props) => {
  let feed = (
    <strong style={{ margin: "1em" }}>Oops, No users to display!</strong>
  );
  if (props.dataSource.length > 0) {
    feed = props.dataSource.map((user) => (
      <User
        key={user.id}
        userData={user}
        onFollow={props.onFollow}
        onUnfollow={props.onUnfollow}
      />
    ));
  }
  return (
    <Segment className={classes.Users}>
      <Feed>{feed}</Feed>
    </Segment>
  );
};

export default Users;
