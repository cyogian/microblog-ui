import axios from "../../axios";
import { refreshUsers } from "./paginateUserActions";

export const followUnfollow = (userId, type, token) => {
  return (dispatch) => {
    let url = `/users/${userId}/follow`;
    let config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    if (type === "unfollow") {
      url = `/users/${userId}/unfollow`;
    }
    axios
      .patch(url, {}, config)
      .then((res) => {
        dispatch(refreshUsers());
      })
      .catch((err) => {});
  };
};
