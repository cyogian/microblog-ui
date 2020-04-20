import React, { Component } from "react";
import PropTypes from "prop-types";
import { Pagination, Loader, Message } from "semantic-ui-react";
import { connect } from "react-redux";

import * as paginateActions from "../../store/actions/paginateActions";

import classes from "./Paginate.module.css";

class Paginate extends Component {
  componentDidMount() {
    this.props.onResetFetch();
    this.props.onFetch(this.props.url, this.props.token, 1, this.props.perPage);
  }
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
    let rendered = <DisplayComponent dataSource={this.props.dataSource} />;
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
    dataSource: state.paginate.dataSource,
    error: state.paginate.error,
    loading: state.paginate.loading,
    activePage: state.paginate.activePage,
    totalPages: state.paginate.totalPages,
    totalItems: state.paginate.totalItems,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetch: (url, token, page, perPage) =>
      dispatch(paginateActions.fetchPage(url, token, page, perPage)),
    onResetFetch: () => dispatch(paginateActions.fetchReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Paginate);
