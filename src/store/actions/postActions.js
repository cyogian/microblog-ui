import axios from "../../axios";
import { refreshPosts } from "../actions/paginatePostActions";

export const postDelete = (postId, token) => {
  return (dispatch) => {
    let url = `/posts/${postId}`;
    let config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .delete(url, config)
      .then((res) => {
        dispatch(refreshPosts());
      })
      .catch((err) => {});
  };
};

export const postCreate = (postBody, token) => {
  return (dispatch) => {
    let url = `/posts`;
    let config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    let data = {
      body: postBody,
    };
    axios
      .post(url, data, config)
      .then((res) => {
        dispatch(refreshPosts());
      })
      .catch((err) => {});
  };
};
