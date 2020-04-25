import React, { Component } from "react";
import PropTypes from "prop-types";
import { Pagination, Loader, Message } from "semantic-ui-react";
import { connect } from "react-redux";

import * as paginateUserActions from "../../store/actions/paginateUserActions";
import { followUnfollow } from "../../store/actions/userActions";

import classes from "./Paginate.module.css";

class Paginate extends Component {
  state = {
    url: this.props.url,
  };
  componentDidMount() {
    this.props.onResetFetch();
    this.props.onFetch(this.props.url, this.props.token, 1, this.props.perPage);
  }
  componentDidUpdate() {
    if (this.props.refresh || this.props.url !== this.state.url) {
      this.props.onFetch(
        this.props.url,
        this.props.token,
        this.props.activePage,
        this.props.perPage
      );
      this.setState({
        url: this.props.url,
      });
    }
  }
  onFollow = (userId) => {
    this.props.onFollowUnfollow(userId, "follow", this.props.token);
  };
  onUnfollow = (userId) => {
    this.props.onFollowUnfollow(userId, "unfollow", this.props.token);
  };
  onChange = (e, pageInfo) => {
    this.props.onFetch(
      this.props.url,
      this.props.token,
      pageInfo.activePage,
      this.props.perPage
    );
  };
  render() {
    const DisplayComponent = this.props.component;
    let rendered = (
      <DisplayComponent
        dataSource={this.props.dataSource}
        onFollow={this.onFollow}
        onUnfollow={this.onUnfollow}
      />
    );
    if (this.props.loading) {
      rendered = <Loader />;
    } else if (this.props.error) {
      rendered = <Message negative content={this.props.error} />;
    }
    return (
      <div className={classes.Paginate}>
        <Pagination
          totalPages={this.props.totalPages}
          activePage={this.props.activePage}
          onPageChange={this.onChange}
          ellipsisItem={null}
          boundaryRange={0}
          siblingRange={0}
          firstItem={{
            "aria-label": "First item",
            content: "1",
          }}
          prevItem={{
            "aria-label": "Previous item",
            content: "«",
          }}
          nextItem={{
            "aria-label": "Next item",
            content: "»",
          }}
          lastItem={{
            "aria-label": "Last item",
            content: this.props.totalPages,
          }}
        />
        {rendered}
      </div>
    );
  }
}

Paginate.propTypes = {
  url: PropTypes.string.isRequired,
  component: PropTypes.elementType.isRequired,
  perPage: PropTypes.number,
};

Paginate.defaultProps = {
  perPage: 10,
};

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    dataSource: state.paginateUser.dataSource,
    error: state.paginateUser.error,
    loading: state.paginateUser.loading,
    activePage: state.paginateUser.activePage,
    totalPages: state.paginateUser.totalPages,
    totalItems: state.paginateUser.totalItems,
    refresh: state.paginateUser.refresh,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetch: (url, token, page, perPage) =>
      dispatch(paginateUserActions.fetchPage(url, token, page, perPage)),
    onResetFetch: () => dispatch(paginateUserActions.fetchReset()),
    onFollowUnfollow: (userId, type, token) =>
      dispatch(followUnfollow(userId, type, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Paginate);
