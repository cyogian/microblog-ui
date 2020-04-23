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
