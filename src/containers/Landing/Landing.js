import React, { Component } from "react";
import {
  Container,
  Grid,
  Divider,
  Responsive,
  Header,
  Message,
  Icon,
} from "semantic-ui-react";
import SignUpForm from "../Auth/SignUpForm/SignUpForm";

import { getWidth } from "../../shared/utilities";
import classes from "./Landing.module.css";

const WelcomeContent = (
  <Container className={classes.Welcome} textAlign="center">
    <Header as="h1" content="Welcome to Microblog!" />
    <Message
      as="h3"
      color="teal"
      content="This is a microblogging website where you can post text messages which can
      be read by other users on the site. You can follow other users and expl ore
      users and posts."
    />
    <Header as="h1">
      Get started <Icon name="arrow circle right" color="red" size="mini" />
    </Header>
  </Container>
);

class Landing extends Component {
  componentDidMount() {
    document.title = "Microblog | Join";
  }
  render() {
    const divided = getWidth() <= Responsive.onlyMobile.maxWidth;
    return (
      <Container fluid className={classes.Landing} textAlign="center">
        {divided ? (
          <>
            {WelcomeContent}
            <SignUpForm />
          </>
        ) : (
          <>
            <Grid verticalAlign="middle" columns="2" style={{ height: "100%" }}>
              <Grid.Column verticalAlign="middle" textAlign="center">
                {WelcomeContent}
              </Grid.Column>
              <Grid.Column verticalAlign="middle" textAlign="center">
                <SignUpForm />
              </Grid.Column>
            </Grid>
            <Divider vertical>O</Divider>
          </>
        )}
      </Container>
    );
  }
}

export default Landing;
