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

import VerifyCreate from "./VerifyCreate/VerifyCreate";
import { isEmail, updateObject } from "../../../shared/utilities";
import axios from "../../../axios";

import { connect } from "react-redux";
import {
  createUser,
  createUserReset,
  createUserResendReset,
  createUserVerifyReset,
} from "../../../store/actions/createUserActions";
import logo from "../../../assets/images/logo.png";

class SignUpForm extends Component {
  state = {
    email: {
      value: "",
      valid: false,
      loading: false,
      error: "",
    },
  };
  componentDidMount() {
    document.title = "Microblog | Sign Up";
    this.props.onResetCreate();
    this.props.onResetVerify();
    this.props.onResetResend();
  }

  onEmailChange = (e) => {
    let value = e.target.value.trim();
    let valid = false;
    let loading = false;
    let error = "";
    if (value !== this.state.email.value && isEmail(value)) {
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
          let email = {
            value,
            valid,
            loading,
            error,
          };
          this.setState({
            email,
          });
        })
        .catch((err) => {
          this.setState({
            email: updateObject(this.state.email, {
              error: "Unexpected Error",
            }),
          });
        });
    }
    let email = {
      value,
      valid,
      loading,
      error,
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
      createUserData,
      createUserLoading,
      createUserError,
      onCreate,
    } = this.props;
    return (
      <div style={{ maxWidth: 450, margin: "auto" }}>
        <Header as="h2" color="black" textAlign="center">
          <Image src={logo} /> Create an account
        </Header>
        <Form size="large" error>
          {createUserData ? (
            <VerifyCreate />
          ) : (
            <Segment stacked>
              <Form.Input
                fluid
                icon="mail"
                iconPosition="left"
                placeholder="E-mail Address"
                type="email"
                onChange={this.onEmailChange}
                loading={email.loading}
                value={email.value}
              />
              {email.error ? (
                <Message error size="mini">
                  {email.error}
                </Message>
              ) : null}
              <Button
                onClick={() => onCreate(email.value)}
                primary
                fluid
                size="large"
                disabled={createUserLoading || !email.valid}
                loading={createUserLoading}
              >
                Go
              </Button>
              {createUserError ? (
                <Message error size="mini">
                  {createUserError}
                </Message>
              ) : null}
            </Segment>
          )}
        </Form>
        <Message>
          Already have an account? <Link to="/auth/login">Login here</Link>
        </Message>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    createUserData: state.createUser.data,
    createUserLoading: state.createUser.loading,
    createUserError: state.createUser.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCreate: (email) => dispatch(createUser(email)),
    onResetCreate: () => dispatch(createUserReset()),
    onResetResend: () => dispatch(createUserResendReset()),
    onResetVerify: () => dispatch(createUserVerifyReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);
