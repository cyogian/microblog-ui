import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Menu, Responsive, Sidebar } from "semantic-ui-react";

import Navbar from "./Navbar/Navbar";
import NavItems from "../../../components/Navigation/NavItems";
import { getWidth } from "../../../shared/utilities";

import classes from "./MobileContainer.module.css";

class MobileContainer extends Component {
  state = {};

  handleSidebarHide = () => this.setState({ sidebarOpened: false });

  handleToggle = () => this.setState({ sidebarOpened: true });

  render() {
    const { children } = this.props;
    const { sidebarOpened } = this.state;

    return (
      <Responsive getWidth={getWidth} maxWidth={Responsive.onlyMobile.maxWidth}>
        <Navbar
          handleToggle={this.handleToggle}
          isAuthenticated={this.props.isAuthenticated}
        />
        <div className={classes.Main}>
          <Sidebar.Pushable style={{ transform: "none" }}>
            <Sidebar
              as={Menu}
              animation="overlay"
              inverted
              onHide={this.handleSidebarHide}
              vertical
              visible={sidebarOpened}
              width="thin"
              icon="labeled"
              style={{
                position: "fixed",
                top: "40px",
              }}
            >
              <NavItems />
            </Sidebar>
            <Sidebar.Pusher
              dimmed={sidebarOpened}
              style={{
                minHeight: "calc(100vh - 40px)",
              }}
            >
              {children}
            </Sidebar.Pusher>
          </Sidebar.Pushable>
        </div>
      </Responsive>
    );
  }
}

MobileContainer.propTypes = {
  children: PropTypes.node,
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};
export default connect(mapStateToProps)(MobileContainer);
