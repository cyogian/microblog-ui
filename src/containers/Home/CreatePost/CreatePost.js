import React, { Component } from "react";
import { Segment, Button } from "semantic-ui-react";

import classes from "./CreatePost.module.css";
import ControlledInput from "../../../components/UI/ControlledInput/ControlledInput";
import { postCreate } from "../../../store/actions/postActions";
import { connect } from "react-redux";

class CreatePost extends Component {
  state = { postBody: "" };

  onInputChange = (e) => {
    this.setState({
      postBody: e.target.value.trimStart(),
    });
  };

  onCreate = () => {
    this.props.onCreatePost(this.state.postBody, this.props.token);
    this.setState({ postBody: "" });
  };

  render() {
    const { postBody } = this.state;
    return (
      <Segment className={classes.CreatePost}>
        <ControlledInput
          maxLength={180}
          minLength={1}
          onInput={this.onInputChange}
          value={postBody}
          placeHolder="What's Happening?"
        />
        <Button
          fluid
          positive
          content="Submit"
          disabled={postBody.length <= 0}
          onClick={this.onCreate}
        />
      </Segment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onCreatePost: (postBody, token) => dispatch(postCreate(postBody, token)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CreatePost);
