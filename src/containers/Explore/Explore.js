import React, { Component } from "react";
import { Container, Menu, Segment, Input } from "semantic-ui-react";

import PaginatePost from "../Paginate/PaginatePost";
import PaginateUser from "../Paginate/PaginateUser";
import Posts from "../../components/Posts/Posts";
import Users from "../../components/Users/Users";
import { capitalize } from "../../shared/utilities";

import classes from "./Explore.module.css";

class Explore extends Component {
  state = { activeItem: "posts" };

  handleItemClick = (e, { name }) => {
    document.title = `Microblog | Explore | ${capitalize(name)}`;
    this.setState({ activeItem: name });
  };

  componentDidMount() {
    document.title = "Microblog | Explore | Posts";
  }
  render() {
    let { activeItem } = this.state;
    let rendered = null;
    if (activeItem === "posts") {
      rendered = (
        <PaginatePost component={Posts} url="/posts" perPage={10} size="mini" />
      );
    }
    if (activeItem === "users") {
      rendered = (
        <PaginateUser component={Users} url="/users" perPage={10} size="mini" />
      );
    }
    return (
      <Container className={classes.Explore}>
        <Menu attached="top" tabular>
          <Menu.Item
            name="posts"
            active={activeItem === "posts"}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name="users"
            active={activeItem === "users"}
            onClick={this.handleItemClick}
          />
        </Menu>
        <Segment attached="bottom">
          <div style={{ textAlign: "right", marginBottom: "5px" }}>
            <Input
              icon={{ name: "search", link: true }}
              placeholder={`Search ${activeItem}...`}
              disabled
            />
          </div>
          {rendered}
        </Segment>
      </Container>
    );
  }
}

export default Explore;
