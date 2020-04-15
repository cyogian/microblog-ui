import React, { Component } from "react";
import { Container } from "semantic-ui-react";

import CreatePost from "../../components/Posts/CreatePost/CreatePost";
import Posts from "../../components/Posts/Posts";

import classes from "./Home.module.css";
import samplePosts from "./samplePosts";

class Home extends Component {
  state = {
    posts: { ...samplePosts },
  };
  render() {
    return (
      <Container className={classes.Home}>
        <CreatePost />
        <Posts posts={this.state.posts.items} />
      </Container>
    );
  }
}

export default Home;
