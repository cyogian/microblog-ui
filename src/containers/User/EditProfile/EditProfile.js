import React, { Component } from "react";

import classes from "./EditProfile.module.css";
import { Modal } from "semantic-ui-react";

class EditProfile extends Component {
  render() {
    return (
      <Modal
        defaultOpen
        dimmer="inverted"
        className={classes.EditProfile}
        onClose={this.props.onEditClose}
        closeIcon
      >
        <Modal.Header>Edit Profile</Modal.Header>
      </Modal>
    );
  }
}

export default EditProfile;
