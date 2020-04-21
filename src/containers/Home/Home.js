import React, { Component } from "react";
import { Container } from "semantic-ui-react";

import CreatePost from "./CreatePost/CreatePost";
import Posts from "../../components/Posts/Posts";
import PaginatePost from "../Paginate/PaginatePost";

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
        <PaginatePost
          component={Posts}
          url="/posts/followed_posts"
          perPage={10}
        />
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
