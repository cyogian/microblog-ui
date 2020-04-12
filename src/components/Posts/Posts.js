import React from "react";
import { Segment, Card } from "semantic-ui-react";

import Post from "./Post/Post";

import classes from "./Posts.module.css";

const Posts = (props) => {
  const cardGroup = props.posts.map((post) => (
    <Post key={post.id} postData={post} />
  ));
  return (
    <Segment className={classes.Posts}>
      <Card.Group>{cardGroup}</Card.Group>
    </Segment>
  );
};

export default Posts;
