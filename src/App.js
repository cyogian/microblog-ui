import React, { Component } from "react";

import Layout from "./hoc/Layout/Layout";
import Home from "./containers/Home/Home";
import { Switch, Route, Redirect } from "react-router";

import classes from "./App.module.css";

class App extends Component {
  render() {
    return (
      <div className={classes.App}>
        <Layout>
          <Switch>
            <Redirect from="/" exact to="/home" />
            <Route path="/home" exact component={Home} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
