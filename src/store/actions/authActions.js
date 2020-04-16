import axios from "../../axios";

import * as actionTypes from "./actionTypes";

const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

const authSuccess = (idToken, username) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken,
    username,
  };
};

const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error,
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("username");

  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const auth = (username, password) => {
  return (dispatch) => {
    dispatch(authStart());
    const authData = {
      username,
      password,
    };

    axios
      .post("/tokens", {}, { auth: authData })
      .then((response) => {
        const expirationDate = new Date(response.data.token_expiration);
        const expiresIn =
          (expirationDate.getTime() - new Date().getTime()) / 1000;
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("expirationDate", expirationDate);
        localStorage.setItem("username", response.data.username);
        dispatch(authSuccess(response.data.token, response.data.username));
        dispatch(checkAuthTimeout(expiresIn));
      })
      .catch((error) => {
        dispatch(authFail(error.response.data.error));
      });
  };
};

export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path,
  };
};

export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate > new Date()) {
        const username = localStorage.getItem("username");
        dispatch(authSuccess(token, username));
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      } else {
        dispatch(logout());
      }
    }
  };
};

export const authReset = () => {
  return {
    type: actionTypes.AUTH_RESET,
  };
};
