import React, { Component } from "react";
import {
  Header,
  Form,
  Image,
  Button,
  Message,
  Segment,
} from "semantic-ui-react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import * as authActions from "../../../store/actions/authActions";

import logo from "../../../assets/images/logo.png";

class LoginForm extends Component {
  state = {
    formData: {
      username: {
        value: "",
        valid: false,
        touched: false,
      },
      password: {
        value: "",
        valid: false,
        touched: false,
      },
    },
    isValid: false,
  };
  componentDidMount() {
    document.title = "Microblog | Login";
    if (this.props.authRedirectPath !== "/") {
      this.props.onSetAuthRedirectPath();
    }
    this.props.onResetAuth();
  }

  changeInputHandler = (e, field) => {
    const newFormData = { ...this.state.formData };
    const fieldData = { ...newFormData[field] };
    if (field === "username") fieldData.value = e.target.value.trim();
    else fieldData.value = e.target.value.trimStart();

    if (fieldData.value.length >= 3) fieldData.valid = true;
    else fieldData.valid = false;

    newFormData[field] = fieldData;
    let isValid = newFormData.username.valid && newFormData.password.valid;
    this.setState({
      formData: newFormData,
      isValid,
    });
  };
  focusHandler = (field) => {
    if (!this.state.formData[field].touched) {
      const newFormData = { ...this.state.formData };
      const fieldData = { ...newFormData[field] };
      fieldData.touched = true;
      newFormData[field] = fieldData;
      this.setState({
        formData: newFormData,
      });
    }
  };
  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to={this.props.authRedirectPath} />;
    }
    const formData = this.state.formData;
    return (
      <div style={{ maxWidth: 450, margin: "auto" }}>
        <Header as="h2" color="black" textAlign="center">
          <Image src={logo} /> Log-in to your account
        </Header>

        <Form size="large">
          <Segment stacked>
            {this.props.error ? (
              <Message color="red">Invalid username or password</Message>
            ) : null}
            {this.props.loading ? null : (
              <>
                <Form.Input
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="Username"
                  error={formData.username.touched && !formData.username.valid}
                  onChange={(e) => this.changeInputHandler(e, "username")}
                  onBlur={() => this.focusHandler("username")}
                  value={formData.username.value}
                />
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                  error={formData.password.touched && !formData.password.valid}
                  onChange={(e) => this.changeInputHandler(e, "password")}
                  onBlur={() => this.focusHandler("password")}
                  value={formData.password.value}
                />
              </>
            )}
            <Button
              color="google plus"
              fluid
              size="large"
              disabled={!this.state.isValid}
              onClick={() =>
                this.props.onAuth(
                  formData.username.value,
                  formData.password.value
                )
              }
              loading={this.props.loading}
            >
              Login
            </Button>
          </Segment>
        </Form>
        <Message>
          <Link to="/auth/forgot_password">Forgot password?</Link>
          <hr />
          <Link to="/auth/signup">Sign Up</Link>
        </Message>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    authRedirectPath: state.auth.authRedirectPath,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (username, password) =>
      dispatch(authActions.auth(username, password)),
    onSetAuthRedirectPath: () => dispatch(authActions.setAuthRedirectPath("/")),
    onResetAuth: () => dispatch(authActions.authReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
