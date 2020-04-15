import React from "react";
import { Segment, Feed } from "semantic-ui-react";

import Post from "./Post/Post";

import classes from "./Posts.module.css";

const Posts = (props) => {
  const feed = props.posts.map((post) => (
    <Post key={post.id} postData={post} />
  ));
  return (
    <Segment className={classes.Posts}>
      <Feed>{feed}</Feed>
    </Segment>
  );
};

export default Posts;
