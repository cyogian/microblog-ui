import React, { Component } from "react";
import {
  Header,
  Form,
  Image,
  Button,
  Message,
  Segment,
} from "semantic-ui-react";
import { Redirect } from "react-router-dom";

import VerifyReset from "./VerifyReset/VerifyReset";
import { isEmail } from "../../../shared/utilities";

import { connect } from "react-redux";
import {
  forgotPassword,
  forgotPasswordReset,
  forgotPasswordResendReset,
  forgotPasswordVerifyReset,
} from "../../../store/actions/forgotPasswordActions";

import logo from "../../../assets/images/logo.png";

class ForgotPasswordForm extends Component {
  state = {
    email: {
      value: "",
      valid: false,
    },
  };
  componentDidMount() {
    document.title = "Microblog | Sign Up";
    this.props.onResetReset();
    this.props.onResetVerify();
    this.props.onResetResend();
  }

  onEmailChange = (e) => {
    let value = e.target.value.trim();
    let valid = false;
    if (isEmail(value)) {
      valid = true;
    }
    let email = {
      value,
      valid,
    };
    this.setState({
      email,
    });
  };

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/" />;
    }
    const { email } = this.state;
    const {
      forgotPasswordData,
      forgotPasswordLoading,
      forgotPasswordError,
      onReset,
    } = this.props;
    return (
      <div style={{ maxWidth: 450, margin: "auto" }}>
        <Header as="h2" color="black" textAlign="center">
          <Image src={logo} /> Reset Password
        </Header>
        <Form size="large" error>
          {forgotPasswordData ? (
            <VerifyReset />
          ) : (
            <Segment stacked>
              <Form.Input
                fluid
                icon="mail"
                iconPosition="left"
                placeholder="E-mail Address"
                type="email"
                onChange={this.onEmailChange}
                value={email.value}
              />

              <Button
                onClick={() => onReset(email.value)}
                primary
                fluid
                size="large"
                disabled={forgotPasswordLoading || !email.valid}
                loading={forgotPasswordLoading}
              >
                Reset
              </Button>
              {forgotPasswordError ? (
                <Message error size="mini">
                  {forgotPasswordError}
                </Message>
              ) : null}
            </Segment>
          )}
        </Form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    forgotPasswordData: state.forgotPassword.data,
    forgotPasswordLoading: state.forgotPassword.loading,
    forgotPasswordError: state.forgotPassword.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onReset: (email) => dispatch(forgotPassword(email)),
    onResetReset: () => dispatch(forgotPasswordReset()),
    onResetResend: () => dispatch(forgotPasswordResendReset()),
    onResetVerify: () => dispatch(forgotPasswordVerifyReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordForm);
