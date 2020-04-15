import React from "react";
import { Feed, Popup } from "semantic-ui-react";
import { Link } from "react-router-dom";
import moment from "moment";

import classes from "./Post.module.css";

const Post = (props) => {
  const post = props.postData;
  return (
    <Feed.Event className={classes.Post}>
      <Feed.Label
        image={post.author._links.avatar}
        style={{ paddingTop: "0.5em" }}
      />
      <Feed.Content>
        <Feed.Summary>
          <Link to={`/user/${post.author.username}`}>
            @{post.author.username}
          </Link>{" "}
          posted
          <Popup
            content={moment(post.created_at).format("h:mm A · MMM D YYYY")}
            trigger={<Feed.Date>{moment(post.created_at).fromNow()}</Feed.Date>}
            size="mini"
            position="bottom left"
            inverted
            basic
          />
        </Feed.Summary>
        <Feed.Extra text>{post.body}</Feed.Extra>
      </Feed.Content>
    </Feed.Event>
  );
};

export default Post;
