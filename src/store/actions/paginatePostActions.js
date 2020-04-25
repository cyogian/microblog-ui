import * as actionTypes from "./actionTypes";
import axios from "../../axios";

const fetchStart = (activePage) => {
  return {
    type: actionTypes.POSTS_FETCH_START,
    activePage,
  };
};

const fetchSuccess = (data) => {
  return {
    type: actionTypes.POSTS_FETCH_SUCCESS,
    data,
  };
};

const fetchFail = (error) => {
  return {
    type: actionTypes.POSTS_FETCH_FAIL,
    error,
  };
};

export const fetchPage = (url, token, page = 1, perPage = 10) => {
  return (dispatch) => {
    dispatch(fetchStart(page));
    const config = {};
    if (token) {
      config.headers = {
        Authorization: `BEARER ${token}`,
      };
    }
    let apiUrl = `${url}?page=${page}&per_page=${perPage}`;
    axios
      .get(apiUrl, config)
      .then((res) => {
        dispatch(fetchSuccess(res.data));
      })
      .catch((err) => {
        dispatch(fetchFail(err));
      });
  };
};

export const fetchReset = () => {
  return {
    type: actionTypes.POSTS_FETCH_RESET,
  };
};

export const refreshPosts = () => {
  return {
    type: actionTypes.REFRESH_POSTS,
  };
};
