import React from "react";
import { Feed, Popup, Dropdown, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import moment from "moment";

import classes from "./Post.module.css";

const DeleteButton = ({ attached, onDelete }) => {
  return (
    <Button
      icon="delete"
      compact
      content="Delete"
      basic
      color="red"
      attached={attached}
      size="mini"
      style={{ margin: 0 }}
      onClick={onDelete}
    />
  );
};

const Post = (props) => {
  const post = props.postData;
  let options = null;
  if (post.author.id === props.currentUserId) {
    options = (
      <Dropdown
        icon="ellipsis vertical"
        compact
        direction="left"
        style={{ height: "fit-content" }}
      >
        <Dropdown.Menu>
          <Dropdown.Item
            as={DeleteButton}
            onDelete={() => props.onDelete(post.id)}
          />
        </Dropdown.Menu>
      </Dropdown>
    );
  }
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
      {options}
    </Feed.Event>
  );
};

export default Post;
