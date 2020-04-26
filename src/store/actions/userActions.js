import axios from "../../axios";
import { refreshUsers } from "./paginateUserActions";
import * as actionTypes from "./actionTypes";

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
        dispatch(refreshUser());
      })
      .catch((err) => {});
  };
};

const fetchStart = () => {
  return {
    type: actionTypes.USER_FETCH_START,
  };
};

const fetchSuccess = (userData) => {
  return {
    type: actionTypes.USER_FETCH_SUCCESS,
    userData,
  };
};

const fetchFail = (err) => {
  return {
    type: actionTypes.USER_FETCH_FAIL,
    error: err,
  };
};

export const fetchUser = (username, token) => {
  return (dispatch) => {
    let url = "/users/by_name?username=" + username;
    let config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    dispatch(fetchStart());
    axios
      .get(url, config)
      .then((res) => {
        dispatch(fetchSuccess(res.data));
      })
      .catch((err) => {
        console.log(err);
        dispatch(fetchFail(err));
      });
  };
};

export const refreshUser = () => {
  return {
    type: actionTypes.REFRESH_USER,
  };
};

export const resetFetchUser = () => {
  return {
    type: actionTypes.USER_FETCH_RESET,
  };
};
