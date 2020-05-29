import * as actionTypes from "./actionTypes";
import { setCurrentUser } from "./currentUserActions";
import axios from "../../axios";
import { refreshUser } from "./userActions";

export const editProfileStart = () => {
  return {
    type: actionTypes.EDIT_PROFILE_START,
  };
};

export const editProfileSuccess = () => {
  return {
    type: actionTypes.EDIT_PROFILE_SUCCESS,
  };
};

export const editProfileFail = (error) => {
  return { type: actionTypes.EDIT_PROFILE_FAIL, error };
};

export const editProfile = (username, about_me, token) => {
  return (dispatch) => {
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
      data = {
        username,
        about_me,
      };
    dispatch(editProfileStart());
    axios
      .put("/users", data, config)
      .then((res) => {
        dispatch(editProfileSuccess());
        dispatch(setCurrentUser(res.data));
        dispatch(refreshUser());
      })
      .catch((err) => {
        let error = "Unknown Error";
        if (err.response && err.response.data) {
          error = err.response.data.message;
        }
        dispatch(editProfileFail(error));
      });
  };
};

export const updateEmailStart = () => {
  return {
    type: actionTypes.UPDATE_EMAIL_START,
  };
};

export const updateEmailSuccess = (data) => {
  return {
    type: actionTypes.UPDATE_EMAIL_SUCCESS,
    data,
  };
};

export const updateEmailFail = (error) => {
  return {
    type: actionTypes.UPDATE_EMAIL_FAIL,
    error,
  };
};

export const updateEmailReset = () => {
  return {
    type: actionTypes.UPDATE_EMAIL_RESET,
  };
};

export const updateEmail = (email, token) => {
  return (dispatch) => {
    dispatch(updateEmailStart());
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    const data = {
      email,
    };
    axios
      .put("/users/email_update", data, config)
      .then((res) => {
        dispatch(updateEmailSuccess(res.data));
      })
      .catch((err) => {
        let error = "Unexpected Error";
        if (err.response && err.response.data) {
          error = err.response.data.message;
        }
        dispatch(updateEmailFail(error));
      });
  };
};

export const updateEmailVerifyStart = () => {
  return {
    type: actionTypes.UPDATE_EMAIL_VERIFY_START,
  };
};

export const updateEmailVerifySuccess = () => {
  return {
    type: actionTypes.UPDATE_EMAIL_VERIFY_SUCCESS,
  };
};

export const updateEmailVerifyFail = (error) => {
  return {
    type: actionTypes.UPDATE_EMAIL_VERIFY_FAIL,
    error,
  };
};

export const updateEmailVerifyReset = () => {
  return {
    type: actionTypes.UPDATE_EMAIL_VERIFY_RESET,
  };
};

export const updateEmailVerify = (tempId, otp, token) => {
  return (dispatch) => {
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    const data = {
      tempId,
      otp,
    };
    dispatch(updateEmailVerifyStart());
    axios
      .post("/users/verify_update", data, config)
      .then((res) => {
        dispatch(updateEmailVerifySuccess());
        dispatch(setCurrentUser(res.data));
        dispatch(updateEmailReset());
      })
      .catch((err) => {
        let error = "Unknown Error";
        if (err.response && err.response.data) {
          error = err.response.data.message;
        }
        dispatch(updateEmailVerifyFail(error));
      });
  };
};

export const updateEmailResendStart = () => {
  return {
    type: actionTypes.UPDATE_EMAIL_RESEND_START,
  };
};

export const updateEmailResendSuccess = () => {
  return {
    type: actionTypes.UPDATE_EMAIL_RESEND_SUCCESS,
  };
};

export const updateEmailResendFail = (error) => {
  return {
    type: actionTypes.UPDATE_EMAIL_RESEND_FAIL,
    error,
  };
};

export const updateEmailResendReset = () => {
  return {
    type: actionTypes.UPDATE_EMAIL_RESEND_RESET,
  };
};

export const updateEmailResend = (tempId, token) => {
  return (dispatch) => {
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    const data = {
      tempId,
      resend: true,
    };
    dispatch(updateEmailResendStart());
    axios
      .post("/users/verify_update", data, config)
      .then((res) => {
        dispatch(updateEmailResendSuccess());
        dispatch(updateEmailSuccess(res.data));
      })
      .catch((err) => {
        let error = "Unknown Error";
        if (err.response && err.response.data) {
          error = err.response.data.message;
        }
        dispatch(updateEmailResendFail(error));
      });
  };
};
