import React from "react";
import { Menu, Button, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";

import NavItems from "../../../../components/Navigation/NavItems";

import logo from "../../../../assets/images/logo.png";
import classes from "./Navbar.module.css";

const Navbar = (props) => {
  return (
    <div className={classes.Navbar}>
      <Menu fixed="top" inverted secondary pointing size="large">
        <Menu.Item as={Link} to="/" header style={{ padding: "0 1em" }}>
          <Image
            size="mini"
            src={logo}
            style={{ marginRight: "1em" }}
            alt="Microblog"
          />
          Microblog
        </Menu.Item>
        <NavItems />
        <Menu.Item position="right">
          <Button as="a" inverted>
            Log in
          </Button>
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default Navbar;
