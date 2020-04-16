import React, { Component } from "react";
import { Container, Menu, Segment, Input } from "semantic-ui-react";

import classes from "./Explore.module.css";

class Explore extends Component {
  state = { activeItem: "posts" };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  componentDidMount() {
    document.title = "Microblog | Explore";
  }
  render() {
    let { activeItem } = this.state;
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
          <div style={{ textAlign: "right" }}>
            <Input
              icon={{ name: "search", link: true }}
              placeholder={`Search ${activeItem}...`}
            />
          </div>
        </Segment>
      </Container>
    );
  }
}

export default Explore;
