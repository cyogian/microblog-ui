import React, { Component } from "react";

import DesktopContainer from "./DesktopContainer/DesktopContainer";
import MobileContainer from "./MobileContainer/MobileContainer";
import classes from "./Layout.module.css";

class Layout extends Component {
  render() {
    const { children } = this.props;
    return (
      <div className={classes.Layout}>
        <DesktopContainer>{children}</DesktopContainer>
        <MobileContainer>{children}</MobileContainer>
      </div>
    );
  }
}

export default Layout;
