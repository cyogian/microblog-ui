import React from "react";
import { Link } from "react-router-dom";
import { Dropdown, Image, Button } from "semantic-ui-react";

import logo from "../../assets/images/logo.png";

export const LogoutButton = ({ attached }) => (
  <Button
    as={Link}
    to="/auth/logout"
    icon="sign-out"
    negative
    content="Logout"
    compact
    attached={attached}
  />
);

const UserDropdown = (props) => {
  const trigger = (
    <span>
      <Image avatar src={logo} /> <strong>Cyogian</strong>
    </span>
  );
  return (
    <Dropdown pointing="top left" trigger={trigger}>
      <Dropdown.Menu>
        <Dropdown.Item
          icon="user"
          as={Link}
          to="/users/cyogian"
          text="Profile"
          //   to={`/users/${props.currentUser.username}`}
        />
        <Dropdown.Item as={LogoutButton} attached="bottom" />
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default UserDropdown;
