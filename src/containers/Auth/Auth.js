import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import LoginForm from "./LoginForm/LoginForm";
import Logout from "./Logout/Logout";
import SignUpForm from "./SignUpForm/SignUpForm";
import ForgotPasswordForm from "./ForgotPasswordForm/ForgotPasswordForm";
const Auth = (props) => {
  return (
    <Grid
      textAlign="center"
      style={{ height: "calc(100vh - 56px)" }}
      verticalAlign="middle"
    >
      {" "}
      <Grid.Column>
        <Switch>
          <Redirect
            from={props.match.path}
            exact
            to={`${props.match.path}/login`}
          />
          <Route path={`${props.match.path}/login`} component={LoginForm} />
          <Route path={`${props.match.path}/signup`} component={SignUpForm} />
          <Route
            path={`${props.match.path}/forgot_password`}
            component={ForgotPasswordForm}
          />
          <Route path={`${props.match.path}/logout`} component={Logout} />
          <Redirect to={`${props.match.path}/login`} />
        </Switch>
      </Grid.Column>
    </Grid>
  );
};

export default Auth;
