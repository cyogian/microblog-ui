import React, { Component } from "react";
import { Segment } from "semantic-ui-react";

import classes from "./CreatePost.module.css";

class CreatePost extends Component {
  render() {
    return <Segment className={classes.CreatePost}>Create Post</Segment>;
  }
}

export default CreatePost;
