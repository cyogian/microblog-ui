import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Responsive } from "semantic-ui-react";

import NavBar from "./Navbar/Navbar";
import { getWidth } from "../../../shared/utilities";

import classes from "./DesktopContainer.module.css";

class DesktopContainer extends Component {
  state = {};
  render() {
    const { children, userData } = this.props;
    let avatar = null;
    if (userData) {
      avatar = userData._links.avatar;
    }
    return (
      <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
        <NavBar
          isAuthenticated={this.props.isAuthenticated}
          avatar={avatar}
          username={this.props.username}
        />
        <div className={classes.Main}>{children}</div>
      </Responsive>
    );
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node,
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
    userData: state.user.userData,
    username: state.auth.username,
  };
};
export default connect(mapStateToProps)(DesktopContainer);
