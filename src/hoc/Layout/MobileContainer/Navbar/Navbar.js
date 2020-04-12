import React from "react";
import { Menu, Icon, Button, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";

import logo from "../../../../assets/images/logo.png";
import classes from "./Navbar.module.css";

const Navbar = (props) => {
  return (
    <div className={classes.Navbar}>
      <Menu fixed="top" inverted size="small">
        <Menu.Item onClick={props.handleToggle}>
          <Icon name="sidebar" />
        </Menu.Item>
        <Menu.Item position="right">
          <Button as="a" inverted size="tiny">
            Log in
          </Button>
        </Menu.Item>
        <Menu.Item as={Link} to="/" header style={{ padding: "0 1em 0 0.5em" }}>
          <Image size="mini" src={logo} alt="Microblog" />
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default Navbar;
