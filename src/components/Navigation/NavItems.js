import React from "react";
import { NavLink } from "react-router-dom";
import { Menu, Icon } from "semantic-ui-react";

const NavItems = () => {
  return (
    <>
      <Menu.Item as={NavLink} to="/" exact>
        <Icon name="home" />
        Home
      </Menu.Item>
      <Menu.Item as={NavLink} to="/explore">
        <Icon name="search" />
        Explore
      </Menu.Item>
    </>
  );
};

export default NavItems;
