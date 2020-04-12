import React from "react";
import { Card } from "semantic-ui-react";

import classes from "./Post.module.css";

const Post = (props) => {
  return (
    <Card fluid className={classes.Post}>
      {props.postData.body}
    </Card>
  );
};

export default Post;
