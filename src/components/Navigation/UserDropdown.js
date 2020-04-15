import React from "react";
import { Link } from "react-router-dom";
import { Dropdown, Image, Button } from "semantic-ui-react";

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
      <Image avatar src={props.imgUrl} />{" "}
      <strong style={{ textTransform: "capitalize" }}>{props.username}</strong>
    </span>
  );
  return (
    <Dropdown
      // pointing="top right"
      trigger={trigger}
    >
      <Dropdown.Menu
        style={{
          marginTop: "14px",
          borderRadius: "0 0 5px 5px",
          borderTop: "1px solid black",
        }}
      >
        <Dropdown.Item
          icon="user"
          as={Link}
          text="Profile"
          to={`/users/${props.username}`}
        />
        <Dropdown.Item as={LogoutButton} attached="bottom" />
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default UserDropdown;
