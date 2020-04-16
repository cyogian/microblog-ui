import React, { Component } from "react";
import { Container, Grid, Divider, Responsive } from "semantic-ui-react";
import SignUpForm from "../Auth/SignUpForm/SignUpForm";

import { getWidth } from "../../shared/utilities";
import classes from "./Landing.module.css";

class Landing extends Component {
  componentDidMount() {
    document.title = "Microblog | Join";
  }
  render() {
    const divided = getWidth() <= Responsive.onlyMobile.maxWidth;
    return (
      <Container fluid className={classes.Landing} textAlign="center">
        {divided ? (
          <SignUpForm />
        ) : (
          <>
            <Grid verticalAlign="middle" columns="2" style={{ height: "100%" }}>
              <Grid.Column
                verticalAlign="middle"
                textAlign="center"
              ></Grid.Column>
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
