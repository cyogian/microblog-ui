import React from "react";
import { Switch, Route } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import LoginForm from "./LoginForm/LoginForm";
import Logout from "./Logout/Logout";

const Auth = (props) => {
  return (
    <Grid
      textAlign="center"
      style={{ height: "calc(100vh - 54px)" }}
      verticalAlign="middle"
    >
      <Switch>
        <Route path={`${props.match.path}/login`} component={LoginForm} />
        <Route path={`${props.match.path}/logout`} component={Logout} />
      </Switch>
    </Grid>
  );
};

export default Auth;
