import React, { Component } from "react";
import { Container } from "semantic-ui-react";

import CreatePost from "../../components/Posts/CreatePost/CreatePost";
import Posts from "../../components/Posts/Posts";

import classes from "./Home.module.css";

class Home extends Component {
  state = {
    posts: [
      { body: "ABC", id: 1 },
      { body: "DEF", id: 2 },
      { body: "GHI", id: 3 },
      { body: "JKL", id: 4 },
      { body: "ABC", id: 5 },
      { body: "DEF", id: 6 },
      { body: "GHI", id: 7 },
      { body: "JKL", id: 8 },
      { body: "DEF", id: 9 },
      { body: "GHI", id: 10 },
      { body: "JKL", id: 11 },
      { body: "ABC", id: 12 },
    ],
  };
  render() {
    return (
      <Container className={classes.Home}>
        <CreatePost />
        <Posts posts={this.state.posts} />
      </Container>
    );
  }
}

export default Home;
