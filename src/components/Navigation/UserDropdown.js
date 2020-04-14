import React from "react";
import { Link } from "react-router-dom";
import { Dropdown, Image } from "semantic-ui-react";

import logo from "../../assets/images/logo.png";

const UserDropdown = (props) => {
  const trigger = (
    <span>
      <Image avatar src={logo} /> <strong>Cyogian</strong>
    </span>
  );
  return (
    <Dropdown item pointing="top left" trigger={trigger}>
      <Dropdown.Menu>
        <Dropdown.Item
          icon="user"
          as={Link}
          to="/users/cyogian"
          text="Profile"
          //   to={`/users/${props.currentUser.username}`}
        />
        <Dropdown.Item
          icon="sign-out"
          as={Link}
          to="/auth/logout"
          text="Logout"
        />
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default UserDropdown;
