import React, { Component } from "react";
import { Container } from "semantic-ui-react";

import CreatePost from "./CreatePost/CreatePost";
import Posts from "../../components/Posts/Posts";
import Paginate from "../Paginate/Paginate";

import classes from "./Home.module.css";
import { connect } from "react-redux";

class Home extends Component {
  componentDidMount() {
    document.title = "Microblog | Home";
  }
  render() {
    return (
      <Container className={classes.Home}>
        <CreatePost />
        <Paginate component={Posts} url="/posts/followed_posts" perPage={8} />
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
  };
};

export default connect(mapStateToProps)(Home);
