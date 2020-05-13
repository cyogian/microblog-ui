import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Segment, Message, Button, List } from "semantic-ui-react";

import {
  updateObject,
  hasSmall,
  hasCapital,
  hasNumber,
} from "../../../../shared/utilities";
import axios from "../../../../axios";
import {
  createUserReset,
  createUserResend,
  createUserVerify,
  createUserResendReset,
  createUserVerifyReset,
} from "../../../../store/actions/createUserActions";
import { Redirect } from "react-router";

class VerifyCreate extends Component {
  state = {
    formData: {
      otp: {
        value: "",
        valid: false,
      },
      username: {
        value: "",
        valid: false,
        error: "",
        loading: "",
      },
      password: {
        value: "",
        valid: false,
        capital: false,
        small: false,
        number: false,
        long: false,
      },
      repeatPassword: {
        value: "",
      },
    },
    showPassword: false,
    valid: false,
  };
  componentDidMount() {
    this.props.onResetResend();
    this.props.onResetVerify();
  }
  onVerify = () => {
    const { formData } = this.state;
    this.props.onVerify(
      this.props.data.tempId,
      formData.otp.value,
      formData.username.value,
      formData.password.value
    );
  };
  checkValidity = ({ otp, username, password, repeatPassword }) => {
    return (
      otp.valid &&
      username.valid &&
      password.valid &&
      repeatPassword.value === password.value
    );
  };
  onUsernameChange = (e) => {
    let { formData } = this.state;
    let value = e.target.value.trim();
    let valid = false;
    let loading = false;
    let error = "";
    if (
      value !== formData.username.value &&
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
          let username = updateObject(formData.username, {
            value,
            valid,
            loading,
            error,
          });
          formData = updateObject(formData, {
            username,
          });
          this.setState({
            formData,
            valid: this.checkValidity(formData),
          });
        })
        .catch((err) => {
          let username = updateObject(formData.username, {
            value,
            valid,
            loading,
            error: "Unexpected Error",
          });
          formData = updateObject(formData, {
            username,
          });
          this.setState({
            formData,
            valid: this.checkValidity(formData),
          });
        });
    }
    let username = updateObject(formData.username, {
      value,
      valid,
      loading,
      error,
    });
    formData = updateObject(formData, {
      username,
    });
    this.setState({
      formData,
      valid: this.checkValidity(formData),
    });
  };
  onOTPChange = (e) => {
    let { formData } = this.state;
    let { value } = formData.otp;
    let targetValue = e.target.value.trim();
    let valid = false;
    if (
      !isNaN(targetValue) &&
      isFinite(targetValue) &&
      targetValue.length <= 6
    ) {
      value = targetValue;
      if (targetValue.length === 6) {
        valid = true;
      }
    }
    let otp = {
      value,
      valid,
    };
    formData = updateObject(formData, {
      otp,
    });
    this.setState({
      formData,
      valid: this.checkValidity(formData),
    });
  };
  onPasswordChange = (e) => {
    let value = e.target.value.trim(),
      small = false,
      capital = false,
      number = false,
      long = false;
    small = hasSmall(value);
    capital = hasCapital(value);
    number = hasNumber(value);
    long = value.length >= 8;
    let valid = small && capital && number && long;
    let password = {
      value,
      small,
      capital,
      number,
      long,
      valid,
    };
    let formData = updateObject(this.state.formData, { password });
    this.setState({
      formData,
      valid: this.checkValidity(formData),
    });
  };

  onRepeatPasswordChange = (e) => {
    let value = e.target.value.trim();
    let repeatPassword = { value };
    let formData = updateObject(this.state.formData, { repeatPassword });
    this.setState({
      formData,
      valid: this.checkValidity(formData),
    });
  };

  onResend = () => {
    this.props.onResend(this.props.data.tempId);
  };
  render() {
    const { formData, valid, showPassword } = this.state;
    const {
      verifyError,
      verifyLoading,
      resendError,
      resendLoading,
      verifySuccess,
      data,
    } = this.props;
    const { small, capital, long, number } = formData.password;
    return (
      <Segment stacked>
        <p style={{ textAlign: "left" }}>
          <Button circular icon="arrow left" onClick={this.props.onReset} />
        </p>
        {verifySuccess ? <Redirect to="/auth/login" /> : null}
        <Message>
          <p>
            A six digit OTP has been sent to your email address{" "}
            <strong>{data.email}</strong>. Enter the OTP below & fill the
            remaining form, then click on "Sign Up".
          </p>
          <p>
            <strong>Note:</strong> If you have not received the email yet, click
            on "Resend OTP".
          </p>
        </Message>
        <Form.Input
          fluid
          placeholder="OTP"
          onChange={this.onOTPChange}
          value={formData.otp.value}
        />
        <Button
          secondary
          icon="redo"
          content="Resend OTP"
          loading={resendLoading}
          disabled={verifyLoading || resendLoading}
          onClick={this.onResend}
        />
        {!resendLoading && resendError ? (
          <Message error>{resendError}</Message>
        ) : null}
        <p style={{ margin: "10px 0" }}></p>
        <Form.Input
          fluid
          icon="user"
          iconPosition="left"
          placeholder="Username"
          onChange={this.onUsernameChange}
          value={formData.username.value}
          error={
            formData.username.error
              ? formData.username.error
              : !formData.username.valid
          }
        />
        <Form.Input
          fluid
          icon="lock"
          iconPosition="left"
          placeholder="Password"
          type="password"
          onChange={this.onPasswordChange}
          value={formData.password.value}
          action={{
            icon: showPassword ? "eye slash" : "eye",
            onClick: () => this.setState({ showPassword: !showPassword }),
          }}
        />
        {showPassword ? (
          <Form.Input value={formData.password.value} disabled />
        ) : null}
        <List style={{ textAlign: "left" }}>
          <List.Item
            icon={small ? "check circle" : "check circle outline"}
            content="contains small letter"
          />
          <List.Item
            icon={capital ? "check circle" : "check circle outline"}
            content="contains capital letter"
          />
          <List.Item
            icon={number ? "check circle" : "check circle outline"}
            content="contains a digit"
          />
          <List.Item
            icon={long ? "check circle" : "check circle outline"}
            content="contains atleast 8 characters"
          />
        </List>
        <Form.Input
          fluid
          icon="lock"
          iconPosition="left"
          placeholder="Repeat Password"
          type="password"
          onChange={this.onRepeatPasswordChange}
          value={formData.repeatPassword.value}
          error={
            formData.password.valid &&
            !(formData.repeatPassword.value === formData.password.value)
          }
        />
        {showPassword ? (
          <Form.Input value={formData.repeatPassword.value} disabled />
        ) : null}
        <Button
          positive
          fluid
          content="Sign Up"
          loading={verifyLoading}
          disabled={verifyLoading || resendLoading || !valid}
          onClick={this.onVerify}
        />
        {!verifyLoading && verifyError ? (
          <Message error>{verifyError}</Message>
        ) : null}
      </Segment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    verifyLoading: state.createUserVerify.loading,
    resendLoading: state.createUserResend.loading,
    verifyError: state.createUserVerify.error,
    resendError: state.createUserResend.error,
    verifySuccess: state.createUserVerify.success,
    data: state.createUser.data,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onReset: () => dispatch(createUserReset()),
    onResend: (tempId) => dispatch(createUserResend(tempId)),
    onVerify: (tempId, otp, username, password) =>
      dispatch(createUserVerify(tempId, otp, username, password)),
    onResetResend: () => dispatch(createUserResendReset()),
    onResetVerify: () => dispatch(createUserVerifyReset()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(VerifyCreate);
