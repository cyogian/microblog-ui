import React, { Component } from "react";
import { Modal, Form, Message } from "semantic-ui-react";

import ControlledInput from "../../../components/UI/ControlledInput/ControlledInput";
import { updateObject } from "../../../shared/utilities";
import axios from "../../../axios";
import {
  editProfile,
  updateEmail,
} from "../../../store/actions/profileActions";

import classes from "./EditProfile.module.css";
import { connect } from "react-redux";
import VerifyOTP from "./VerifyOTP/VerifyOTP";

const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

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
          error: "",
        },
        email: {
          valid: false,
          value: currentUser.email,
          loading: false,
          error: "",
        },
        about_me: {
          valid: true,
          value: currentUser.about_me || "",
        },
      },
      valid: false,
    };
  }
  componentDidUpdate(nextProps) {
    let { currentUser } = this.props;
    if (nextProps.currentUser !== currentUser) {
      this.setState({
        controls: {
          username: {
            valid: true,
            value: currentUser.username,
            loading: false,
            error: "",
          },
          email: {
            valid: false,
            value: currentUser.email,
            loading: false,
            error: "",
          },
          about_me: {
            valid: true,
            value: currentUser.about_me || "",
          },
        },
        valid: false,
      });
    }
  }

  checkValidity = (username, about_me) => {
    let valid = false;
    const { currentUser } = this.props;
    if (username.valid && about_me.valid) {
      valid = true;
    }
    if (
      username.value === currentUser.username &&
      about_me.value === currentUser.about_me
    ) {
      valid = false;
    }
    return valid;
  };
  onUsernameChange = (e) => {
    let value = e.target.value.trim();
    let valid = false;
    let loading = false;
    let error = "";
    if (
      value !== this.state.controls.username.value &&
      value !== this.props.currentUser.username &&
      value.length <= 64 &&
      value.length >= 3
    ) {
      loading = true;
      axios
        .post("/users/duplicate_check", {
          username: value,
        })
        .then((res) => {
          loading = false;
          valid = false;
          if (res.data.success) {
            valid = true;
          } else {
            valid = false;
            error = res.data.errors.username;
          }
          let username = updateObject(this.state.controls.username, {
            value,
            valid,
            loading,
            error,
          });
          this.setState({
            controls: updateObject(this.state.controls, {
              username,
            }),
            valid: this.checkValidity(username, this.state.controls.about_me),
          });
        })
        .catch((err) => {});
    }
    if (value === this.props.currentUser.username) valid = true;
    let username = updateObject(this.state.controls.username, {
      value,
      valid,
      loading,
      error,
    });
    this.setState({
      controls: updateObject(this.state.controls, {
        username,
      }),
      valid: this.checkValidity(username, this.state.controls.about_me),
    });
  };
  onEmailChange = (e) => {
    let value = e.target.value.trim();
    let valid = false;
    let loading = false;
    let error = "";
    if (
      value !== this.state.controls.email.value &&
      value !== this.props.currentUser.email &&
      value.match(mailFormat)
    ) {
      loading = true;
      axios
        .post("/users/duplicate_check", {
          email: value,
        })
        .then((res) => {
          loading = false;
          valid = false;
          if (res.data.success) {
            valid = true;
          } else {
            valid = false;
            error = res.data.errors.email;
          }
          let email = updateObject(this.state.controls.email, {
            value,
            valid,
            loading,
            error,
          });
          this.setState({
            controls: updateObject(this.state.controls, {
              email,
            }),
          });
        })
        .catch((err) => {});
    }
    let email = updateObject(this.state.controls.email, {
      value,
      valid,
      loading,
      error,
    });
    this.setState({
      controls: updateObject(this.state.controls, {
        email,
      }),
    });
  };
  onAboutChange = (e) => {
    let value = e.target.value.trimStart();
    let valid = false;
    if (value !== this.props.currentUser.about_me && value.length <= 140) {
      valid = true;
    }
    let about_me = updateObject(this.state.controls.about_me, { value, valid });
    this.setState({
      controls: updateObject(this.state.controls, {
        about_me,
      }),
      valid: this.checkValidity(this.state.controls.username, about_me),
    });
  };

  onSave = () => {
    const { username, about_me } = this.state.controls;
    this.props.onEditProfile(username.value, about_me.value, this.props.token);
  };

  onEmailSave = () => {
    const { email } = this.state.controls;
    this.props.onEmailUpdate(email.value, this.props.token);
  };

  render() {
    const { username, email, about_me } = this.state.controls;
    const { emailError, emailLoading, emailData } = this.props;
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
          {!this.props.loading && this.props.error ? (
            <Message error>{this.props.error}</Message>
          ) : null}
          <Form error={username.error ? true : false}>
            <Form.Input
              fluid
              icon="user"
              placeholder="Username"
              label="Username"
              type="text"
              value={username.value}
              loading={username.loading}
              error={!username.loading && !username.valid}
              onChange={this.onUsernameChange}
            />
            {username.error ? <Message error>{username.error}</Message> : null}
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
              onClick={this.onSave}
            >
              Save
            </Form.Button>
          </Form>
          <hr />
          <Form error={email.error || emailError ? true : false}>
            <Message color="teal">
              Changing Email requires OTP verification.
            </Message>
            <Form.Input
              fluid
              icon="mail"
              placeholder="E-mail Address"
              label="E-mail"
              type="text"
              value={email.value}
              loading={email.loading}
              error={
                !email.loading &&
                !email.valid &&
                email.value !== this.props.currentUser.email
              }
              onChange={this.onEmailChange}
            />
            {email.error ? <Message error>{email.error}</Message> : null}
            <Form.Button
              fluid
              positive
              disabled={!email.valid}
              onClick={this.onEmailSave}
              loading={emailLoading}
            >
              Change Email
            </Form.Button>
            {emailError ? <Message error>{emailError}</Message> : null}
            {emailData ? <VerifyOTP data={emailData} /> : null}
          </Form>
        </Modal.Content>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.profile.loading,
    error: state.profile.error,
    token: state.auth.token,
    emailLoading: state.updateEmail.loading,
    emailError: state.updateEmail.error,
    emailData: state.updateEmail.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onEditProfile: (username, about_me, token) => {
      dispatch(editProfile(username, about_me, token));
    },
    onEmailUpdate: (email, token) => {
      dispatch(updateEmail(email, token));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
