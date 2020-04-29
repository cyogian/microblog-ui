import React, { Component } from "react";
import { Modal, Form, Message } from "semantic-ui-react";

import ControlledInput from "../../../components/UI/ControlledInput/ControlledInput";
import { updateObject } from "../../../shared/utilities";
import axios from "../../../axios";

import classes from "./EditProfile.module.css";

class EditProfile extends Component {
  constructor(props) {
    super(props);
    const { currentUser } = props;
    this.state = {
      controls: {
        username: {
          valid: true,
          value: currentUser.username,
          loading: false,
        },
        email: {
          valid: true,
          value: currentUser.email,
          loading: false,
        },
        about_me: {
          valid: true,
          value: currentUser.about_me,
        },
      },
      valid: false,
    };
  }
  onUsernameChange = (e) => {
    let value = e.target.value.trim();
    let valid = false;
    let loading = false;
    if (
      value !== this.props.currentUser.username &&
      value.length <= 64 &&
      value.length >= 3
    ) {
      loading = true;
    }
    this.setState({
      controls: updateObject(this.state.controls, {
        username: updateObject(this.state.controls.username, {}),
      }),
    });
  };
  onEmailChange = (e) => {
    let email = e.target.value.trim();
  };
  onAboutChange = (e) => {
    let value = e.target.value.trimStart();
    let valid = false;
    if (value !== this.props.currentUser.about_me && value.length <= 140) {
      valid = true;
    }
    this.setState({
      controls: updateObject(this.state.controls, {
        about_me: updateObject(this.state.controls.about_me, { value, valid }),
      }),
    });
  };

  render() {
    const { username, email, about_me } = this.state.controls;
    return (
      <Modal
        defaultOpen
        dimmer="inverted"
        className={classes.EditProfile}
        onClose={this.props.onEditClose}
        closeIcon
      >
        <Modal.Header>Edit Profile</Modal.Header>
        <Modal.Content>
          {this.props.error ? (
            <Message error>{this.props.error}</Message>
          ) : null}
          <Form>
            <Form.Input
              fluid
              icon="user"
              placeholder="Username"
              label="Username"
              type="text"
              value={username.value}
              loading={username.loading}
            />
            <Form.Input
              fluid
              icon="mail"
              placeholder="E-mail Address"
              label="E-mail"
              type="email"
              value={email.value}
              loading={email.loading}
            />
            <Form.Field>
              <label>About Me</label>
              <ControlledInput
                placeHolder="Tell us about yourself"
                minLength={0}
                maxLength={140}
                value={about_me.value}
                onInput={this.onAboutChange}
              />
            </Form.Field>
            <Form.Button
              fluid
              positive
              loading={this.props.loading}
              disabled={!this.state.valid}
            >
              Save
            </Form.Button>
          </Form>
        </Modal.Content>
      </Modal>
    );
  }
}

export default EditProfile;
