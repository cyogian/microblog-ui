import PropTypes from "prop-types";
import React, { Component } from "react";
import { getWidth } from "../../shared/utilities";
import { Responsive } from "semantic-ui-react";
import NavBar from "./Navbar/Navbar";

import classes from "./DesktopContainer.module.css";

class DesktopContainer extends Component {
  state = {};
  render() {
    const { children } = this.props;
    return (
      <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
        <NavBar />
        <div className={classes.Main}>{children}</div>
      </Responsive>
    );
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node,
};

export default DesktopContainer;
