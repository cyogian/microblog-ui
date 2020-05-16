import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Segment, Message, Button, List } from "semantic-ui-react";

import {
  updateObject,
  hasSmall,
  hasCapital,
  hasNumber,
} from "../../../../shared/utilities";
import {
  forgotPasswordReset,
  forgotPasswordResend,
  forgotPasswordVerify,
  forgotPasswordResendReset,
  forgotPasswordVerifyReset,
} from "../../../../store/actions/forgotPasswordActions";
import { Redirect } from "react-router";

class VerifyReset extends Component {
  state = {
    formData: {
      otp: {
        value: "",
        valid: false,
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
      formData.password.value
    );
  };
  checkValidity = ({ otp, password, repeatPassword }) => {
    return (
      otp.valid && password.valid && repeatPassword.value === password.value
    );
  };

  onOTPChange = (e) => {
    let { formData } = this.state;
    let { value, valid } = formData.otp;
    let targetValue = e.target.value.trim();
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
    let { formData } = this.state;
    formData = updateObject(formData, { repeatPassword });
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
          content="Reset Password"
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
    verifyLoading: state.forgotPasswordVerify.loading,
    resendLoading: state.forgotPasswordResend.loading,
    verifyError: state.forgotPasswordVerify.error,
    resendError: state.forgotPasswordResend.error,
    verifySuccess: state.forgotPasswordVerify.success,
    data: state.forgotPassword.data,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onReset: () => dispatch(forgotPasswordReset()),
    onResend: (tempId) => dispatch(forgotPasswordResend(tempId)),
    onVerify: (tempId, otp, password) =>
      dispatch(forgotPasswordVerify(tempId, otp, password)),
    onResetResend: () => dispatch(forgotPasswordResendReset()),
    onResetVerify: () => dispatch(forgotPasswordVerifyReset()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(VerifyReset);
