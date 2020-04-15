import React from "react";
import { Menu, Icon, Button, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";

import UserDropdown from "../../../../components/Navigation/UserDropdown";
import logo from "../../../../assets/images/logo.png";
import classes from "./Navbar.module.css";

const Navbar = (props) => {
  return (
    <div className={classes.Navbar}>
      <Menu fixed="top" inverted>
        <Menu.Item onClick={props.handleToggle}>
          <Icon name="sidebar" />
        </Menu.Item>
        <Menu.Item position="right">
          {props.isAuthenticated ? (
            <UserDropdown imgUrl={props.avatar} username={props.username} />
          ) : (
            <Button
              as={Link}
              to="/auth/login"
              inverted
              icon="sign-in"
              content="Log In"
              size="small"
            />
          )}
        </Menu.Item>
        <Menu.Item as={Link} to="/" header style={{ padding: "0 1em 0 0.5em" }}>
          <Image size="mini" src={logo} alt="Microblog" />
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default Navbar;
