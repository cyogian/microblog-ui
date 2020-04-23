import React, { Component } from "react";
import PropTypes from "prop-types";
import { Pagination, Loader, Message, Modal, Button } from "semantic-ui-react";
import { connect } from "react-redux";

import * as paginatePostActions from "../../store/actions/paginatePostActions.js";
import { postDelete } from "../../store/actions/postActions";

import classes from "./Paginate.module.css";

class Paginate extends Component {
  state = {
    onModalClick: null,
    modalOpen: false,
  };
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
  onDelete = (postId) => {
    this.setState({
      onModalClick: () => {
        this.props.onDeletePost(postId, this.props.token);
        this.onCancelDelete();
      },
      modalOpen: true,
    });
  };
  onCancelDelete = () => {
    this.setState({
      onModalClick: null,
      modalOpen: false,
    });
  };

  componentDidUpdate() {
    if (this.props.refresh) {
      this.props.onFetch(
        this.props.url,
        this.props.token,
        this.props.activePage,
        this.props.perPage
      );
    }
  }
  render() {
    const DisplayComponent = this.props.component;
    let rendered = (
      <DisplayComponent
        dataSource={this.props.dataSource}
        currentUser={this.props.currentUser}
        onDelete={this.onDelete}
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
        <Modal
          size="mini"
          open={this.state.modalOpen}
          onClose={this.onCancelDelete}
        >
          <Modal.Header>Delete Post?</Modal.Header>
          <Modal.Content>
            <p>
              This can't be undone and it will be removed from your profile, the
              timeline of any account that follows you and Microblog search
              results.
            </p>
          </Modal.Content>
          <Modal.Actions>
            <Button negative onClick={this.onCancelDelete}>
              No
            </Button>
            <Button
              positive
              icon="checkmark"
              labelPosition="right"
              content="Yes"
              onClick={this.state.onModalClick}
            />
          </Modal.Actions>
        </Modal>
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
    dataSource: state.paginatePost.dataSource,
    error: state.paginatePost.error,
    loading: state.paginatePost.loading,
    activePage: state.paginatePost.activePage,
    totalPages: state.paginatePost.totalPages,
    totalItems: state.paginatePost.totalItems,
    refresh: state.paginatePost.refresh,
    currentUser: state.currentUser.userData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetch: (url, token, page, perPage) =>
      dispatch(paginatePostActions.fetchPage(url, token, page, perPage)),
    onResetFetch: () => dispatch(paginatePostActions.fetchReset()),
    onDeletePost: (postId, token) => dispatch(postDelete(postId, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Paginate);
