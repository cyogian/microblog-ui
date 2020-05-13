import * as actionTypes from "./actionTypes";
import axios from "../../axios";

export const createUserStart = () => {
  return {
    type: actionTypes.CREATE_USER_START,
  };
};

export const createUserSuccess = (data) => {
  return {
    type: actionTypes.CREATE_USER_SUCCESS,
    data,
  };
};

export const createUserFail = (error) => {
  return {
    type: actionTypes.CREATE_USER_FAIL,
    error,
  };
};

export const createUserReset = () => {
  return {
    type: actionTypes.CREATE_USER_RESET,
  };
};

export const createUser = (email) => {
  return (dispatch) => {
    dispatch(createUserStart());
    const data = {
      email,
    };
    axios
      .post("/users/create_user", data)
      .then((res) => {
        dispatch(createUserSuccess(res.data));
      })
      .catch((err) => {
        let error = "Unexpected Error";
        if (err.response) {
          error = err.response.message;
        }
        dispatch(createUserFail(error));
      });
  };
};

export const createUserVerifyStart = () => {
  return {
    type: actionTypes.CREATE_USER_VERIFY_START,
  };
};

export const createUserVerifySuccess = () => {
  return {
    type: actionTypes.CREATE_USER_VERIFY_SUCCESS,
  };
};

export const createUserVerifyFail = (error) => {
  return {
    type: actionTypes.CREATE_USER_VERIFY_FAIL,
    error,
  };
};

export const createUserVerifyReset = () => {
  return {
    type: actionTypes.CREATE_USER_VERIFY_RESET,
  };
};

export const createUserVerify = (tempId, otp, username, password) => {
  return (dispatch) => {
    const data = {
      tempId,
      otp,
      username,
      password,
    };
    dispatch(createUserVerifyStart());
    axios
      .post("/users/verify_create", data)
      .then((res) => {
        dispatch(createUserVerifySuccess());
        dispatch(createUserReset());
      })
      .catch((err) => {
        let error = "Unknown Error";
        if (err.response) {
          error = err.response.message;
        }
        dispatch(createUserVerifyFail(error));
      });
  };
};

export const createUserResendStart = () => {
  return {
    type: actionTypes.CREATE_USER_RESEND_START,
  };
};

export const createUserResendSuccess = () => {
  return {
    type: actionTypes.CREATE_USER_RESEND_SUCCESS,
  };
};

export const createUserResendFail = (error) => {
  return {
    type: actionTypes.CREATE_USER_RESEND_FAIL,
    error,
  };
};

export const createUserResendReset = () => {
  return {
    type: actionTypes.CREATE_USER_RESEND_RESET,
  };
};

export const createUserResend = (tempId) => {
  return (dispatch) => {
    const data = {
      tempId,
      resend: true,
    };
    dispatch(createUserResendStart());
    axios
      .post("/users/verify_create", data)
      .then((res) => {
        dispatch(createUserResendSuccess());
        dispatch(createUserSuccess(res.data));
      })
      .catch((err) => {
        let error = "Unknown Error";
        if (err.response) {
          error = err.response.message;
        }
        dispatch(createUserResendFail(error));
      });
  };
};
