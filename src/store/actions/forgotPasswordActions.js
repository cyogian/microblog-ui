import * as actionTypes from "./actionTypes";
import axios from "../../axios";

export const forgotPasswordStart = () => {
  return {
    type: actionTypes.FORGOT_PASSWORD_START,
  };
};

export const forgotPasswordSuccess = (data) => {
  return {
    type: actionTypes.FORGOT_PASSWORD_SUCCESS,
    data,
  };
};

export const forgotPasswordFail = (error) => {
  return {
    type: actionTypes.FORGOT_PASSWORD_FAIL,
    error,
  };
};

export const forgotPasswordReset = () => {
  return {
    type: actionTypes.FORGOT_PASSWORD_RESET,
  };
};

export const forgotPassword = (email) => {
  return (dispatch) => {
    dispatch(forgotPasswordStart());
    const data = {
      email,
    };
    axios
      .post("/users/reset_password", data)
      .then((res) => {
        dispatch(forgotPasswordSuccess(res.data));
      })
      .catch((err) => {
        let error = "Unexpected Error";
        if (err.response.data) {
          error = err.response.data.message;
        }
        dispatch(forgotPasswordFail(error));
      });
  };
};

export const forgotPasswordVerifyStart = () => {
  return {
    type: actionTypes.FORGOT_PASSWORD_VERIFY_START,
  };
};

export const forgotPasswordVerifySuccess = () => {
  return {
    type: actionTypes.FORGOT_PASSWORD_VERIFY_SUCCESS,
  };
};

export const forgotPasswordVerifyFail = (error) => {
  return {
    type: actionTypes.FORGOT_PASSWORD_VERIFY_FAIL,
    error,
  };
};

export const forgotPasswordVerifyReset = () => {
  return {
    type: actionTypes.FORGOT_PASSWORD_VERIFY_RESET,
  };
};

export const forgotPasswordVerify = (tempId, otp, password) => {
  return (dispatch) => {
    const data = {
      tempId,
      otp,
      password,
    };
    dispatch(forgotPasswordVerifyStart());
    axios
      .post("/users/verify_reset", data)
      .then((res) => {
        dispatch(forgotPasswordVerifySuccess());
        dispatch(forgotPasswordReset());
      })
      .catch((err) => {
        let error = "Unknown Error";
        if (err.response.data) {
          error = err.response.data.message;
        }
        dispatch(forgotPasswordVerifyFail(error));
      });
  };
};

export const forgotPasswordResendStart = () => {
  return {
    type: actionTypes.FORGOT_PASSWORD_RESEND_START,
  };
};

export const forgotPasswordResendSuccess = () => {
  return {
    type: actionTypes.FORGOT_PASSWORD_RESEND_SUCCESS,
  };
};

export const forgotPasswordResendFail = (error) => {
  return {
    type: actionTypes.FORGOT_PASSWORD_RESEND_FAIL,
    error,
  };
};

export const forgotPasswordResendReset = () => {
  return {
    type: actionTypes.FORGOT_PASSWORD_RESEND_RESET,
  };
};

export const forgotPasswordResend = (tempId) => {
  return (dispatch) => {
    const data = {
      tempId,
      resend: true,
    };
    dispatch(forgotPasswordResendStart());
    axios
      .post("/users/verify_reset", data)
      .then((res) => {
        dispatch(forgotPasswordResendSuccess());
        dispatch(forgotPasswordSuccess(res.data));
      })
      .catch((err) => {
        let error = "Unknown Error";
        if (err.response.data) {
          error = err.response.data.message;
        }
        dispatch(forgotPasswordResendFail(error));
      });
  };
};
