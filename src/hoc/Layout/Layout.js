import React, { Component } from "react";

import DesktopContainer from "../../containers/DesktopContainer/DesktopContainer";
import MobileContainer from "../../containers/MobileContainer/MobileContainer";

class Layout extends Component {
  render() {
    const { children } = this.props;
    return (
      <div style={{ margin: 0, padding: 0 }}>
        <DesktopContainer>{children}</DesktopContainer>
        <MobileContainer>{children}</MobileContainer>
      </div>
    );
  }
}

export default Layout;
