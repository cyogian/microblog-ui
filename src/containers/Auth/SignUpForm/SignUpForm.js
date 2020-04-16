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

import logo from "../../../assets/images/logo.png";

class SignUpForm extends Component {
  state = {
    formData: {
      username: {
        value: "",
      },
      email: {
        value: "",
      },
      password: {
        value: "",
      },
      repeatPassword: {
        value: "",
      },
    },
  };
  componentDidMount() {
    document.title = "Microblog | Sign Up";
  }

  changeInputHandler = (e, field) => {
    const newFormData = { ...this.state.formData };
    const fieldData = { ...newFormData[field] };
    fieldData.value = e.target.value;
    newFormData[field] = fieldData;
  };

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/" />;
    }
    const formData = this.state.formData;
    return (
      <div style={{ maxWidth: 450, margin: "auto" }}>
        <Header as="h2" color="black" textAlign="center">
          <Image src={logo} /> Create an account
        </Header>

        <Form size="large">
          <Segment stacked>
            {/* <Message color="red">{this.props.error}</Message> */}
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="Username"
              onChange={(e) => this.changeInputHandler(e, "username")}
              value={formData.username.value}
            />
            <Form.Input
              fluid
              icon="mail"
              iconPosition="left"
              placeholder="E-mail Address"
              type="email"
              onChange={(e) => this.changeInputHandler(e, "email")}
              value={formData.email.value}
            />
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="password"
              onChange={(e) => this.changeInputHandler(e, "password")}
              value={formData.password.value}
            />
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Repeat Password"
              type="password"
              onChange={(e) => this.changeInputHandler(e, "repeatPassword")}
              value={formData.repeatPassword.value}
            />

            <Button color="green" fluid size="large">
              Sign Up
            </Button>
          </Segment>
        </Form>
        <Message>
          Already have an account? <Link to="/auth/login">Login</Link>
        </Message>
      </div>
    );
  }
}

export default SignUpForm;
